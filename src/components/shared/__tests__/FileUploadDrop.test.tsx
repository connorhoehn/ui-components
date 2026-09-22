import { render, screen, fireEvent } from '@testing-library/react';
import { FileUploadDrop } from '../FileUploadDrop';

function makeFile(name: string, size: number, type: string): File {
  const file = new File(['x'.repeat(size)], name, { type });
  return file;
}

describe('FileUploadDrop', () => {
  it('renders with default label', () => {
    render(<FileUploadDrop onFiles={vi.fn()} />);
    expect(screen.getByLabelText('File upload drop zone')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<FileUploadDrop onFiles={vi.fn()} label="Upload your files here" />);
    expect(screen.getByLabelText('Upload your files here')).toBeInTheDocument();
  });

  it('applies aria-disabled when disabled', () => {
    render(<FileUploadDrop onFiles={vi.fn()} disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('calls onFiles with valid files on drop', () => {
    const onFiles = vi.fn();
    render(<FileUploadDrop onFiles={onFiles} />);
    const zone = screen.getByRole('button');
    const file = makeFile('test.txt', 100, 'text/plain');
    fireEvent.drop(zone, {
      dataTransfer: { files: [file] },
    });
    expect(onFiles).toHaveBeenCalledWith([file]);
  });

  it('shows error when file exceeds maxSize', () => {
    const onFiles = vi.fn();
    render(<FileUploadDrop onFiles={onFiles} maxSize={50} />);
    const zone = screen.getByRole('button');
    const file = makeFile('big.txt', 200, 'text/plain');
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFiles).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows error when file type does not match accept', () => {
    const onFiles = vi.fn();
    render(<FileUploadDrop onFiles={onFiles} accept="image/*" />);
    const zone = screen.getByRole('button');
    const file = makeFile('doc.pdf', 100, 'application/pdf');
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFiles).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('accepts file matching accept type', () => {
    const onFiles = vi.fn();
    render(<FileUploadDrop onFiles={onFiles} accept="image/*" />);
    const zone = screen.getByRole('button');
    const file = makeFile('photo.jpg', 100, 'image/jpeg');
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFiles).toHaveBeenCalledWith([file]);
  });

  it('shows error when multiple files dropped and multiple=false', () => {
    const onFiles = vi.fn();
    render(<FileUploadDrop onFiles={onFiles} multiple={false} />);
    const zone = screen.getByRole('button');
    const files = [makeFile('a.txt', 10, 'text/plain'), makeFile('b.txt', 10, 'text/plain')];
    fireEvent.drop(zone, { dataTransfer: { files } });
    expect(onFiles).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('dismisses error banner', () => {
    render(<FileUploadDrop onFiles={vi.fn()} maxSize={1} />);
    const zone = screen.getByRole('button');
    const file = makeFile('big.txt', 100, 'text/plain');
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(screen.getByRole('alert')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Dismiss'));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('calls onError callback on validation failure', () => {
    const onError = vi.fn();
    render(<FileUploadDrop onFiles={vi.fn()} maxSize={1} onError={onError} />);
    const zone = screen.getByRole('button');
    const file = makeFile('big.txt', 100, 'text/plain');
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('does not call onFiles when disabled and file dropped', () => {
    const onFiles = vi.fn();
    render(<FileUploadDrop onFiles={onFiles} disabled />);
    const zone = screen.getByRole('button');
    const file = makeFile('test.txt', 10, 'text/plain');
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFiles).not.toHaveBeenCalled();
  });
});

// The input is aria-hidden with tabIndex -1 and no testid of its own, and
// there is no cross-browser way to drive a real file picker — so a spec that
// must fire a `change` at it had nothing to select. That blocked adoption
// outright for a host whose existing spec did exactly that.
describe('FileUploadDrop inputTestId', () => {
  it('puts the testid on the hidden file input', () => {
    render(<FileUploadDrop onFiles={() => {}} inputTestId="file-upload-input" />);
    const input = screen.getByTestId('file-upload-input') as HTMLInputElement;
    expect(input.tagName).toBe('INPUT');
    expect(input.type).toBe('file');
  });

  it('leaves the input unlabelled by default', () => {
    const { container } = render(<FileUploadDrop onFiles={() => {}} />);
    expect(container.querySelector('input[type="file"]')).not.toHaveAttribute('data-testid');
  });

  it('is addressable and drivable: a change on it reports the files', () => {
    const onFiles = vi.fn();
    render(<FileUploadDrop onFiles={onFiles} inputTestId="file-upload-input" />);
    const input = screen.getByTestId('file-upload-input') as HTMLInputElement;
    const file = new File(['hello'], 'notes.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(onFiles).toHaveBeenCalledWith([file]);
  });

  it('keeps the zone testid separate from the input one', () => {
    render(
      <FileUploadDrop onFiles={() => {}} data-testid="zone" inputTestId="file-upload-input" />,
    );
    expect(screen.getByTestId('zone')).not.toBe(screen.getByTestId('file-upload-input'));
  });

  it('forwards accept and multiple to the input', () => {
    render(
      <FileUploadDrop onFiles={() => {}} accept="image/*,.pdf" multiple inputTestId="i" />,
    );
    const input = screen.getByTestId('i') as HTMLInputElement;
    expect(input).toHaveAttribute('accept', 'image/*,.pdf');
    expect(input.multiple).toBe(true);
  });

  it('passes extra attributes through but never the ones it owns', () => {
    render(
      <FileUploadDrop
        onFiles={() => {}}
        accept="image/*"
        inputTestId="i"
        inputProps={{ name: 'attachment', 'aria-hidden': undefined }}
      />,
    );
    const input = screen.getByTestId('i') as HTMLInputElement;
    expect(input).toHaveAttribute('name', 'attachment');
    expect(input).toHaveAttribute('accept', 'image/*');
    expect(input.type).toBe('file');
  });
});

