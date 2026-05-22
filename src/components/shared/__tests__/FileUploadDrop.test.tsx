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
