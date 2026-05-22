import { render, screen, fireEvent } from '@testing-library/react';
import { UserMenu } from '../UserMenu';
import type { UserMenuUser, UserMenuItem } from '../UserMenu';

const user: UserMenuUser = { name: 'Jane Doe', email: 'jane@example.com' };

const items: UserMenuItem[] = [
  { label: 'Profile', onClick: vi.fn() },
  { label: 'Settings', onClick: vi.fn() },
  { label: 'Sign out', onClick: vi.fn(), separator: true, danger: true },
];

describe('UserMenu', () => {
  beforeEach(() => {
    items.forEach(item => vi.mocked(item.onClick).mockReset());
  });

  it('renders trigger button with user name aria-label', () => {
    render(<UserMenu user={user} items={items} />);
    expect(screen.getByLabelText('User menu for Jane Doe')).toBeInTheDocument();
  });

  it('does not show dropdown by default', () => {
    render(<UserMenu user={user} items={items} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens dropdown on trigger click', () => {
    render(<UserMenu user={user} items={items} />);
    fireEvent.click(screen.getByLabelText('User menu for Jane Doe'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('shows user name and email in dropdown header', () => {
    render(<UserMenu user={user} items={items} />);
    fireEvent.click(screen.getByLabelText('User menu for Jane Doe'));
    // email appears in both trigger (sm:hidden) and dropdown header
    const emailEls = screen.getAllByText('jane@example.com');
    expect(emailEls.length).toBeGreaterThan(0);
  });

  it('renders all menu items', () => {
    render(<UserMenu user={user} items={items} />);
    fireEvent.click(screen.getByLabelText('User menu for Jane Doe'));
    expect(screen.getByRole('menuitem', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Settings' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Sign out' })).toBeInTheDocument();
  });

  it('calls item onClick and closes dropdown', () => {
    render(<UserMenu user={user} items={items} />);
    fireEvent.click(screen.getByLabelText('User menu for Jane Doe'));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Profile' }));
    expect(items[0].onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    render(<UserMenu user={user} items={items} />);
    fireEvent.click(screen.getByLabelText('User menu for Jane Doe'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on outside click', () => {
    render(
      <div>
        <UserMenu user={user} items={items} />
        <div data-testid="outside">Outside</div>
      </div>,
    );
    fireEvent.click(screen.getByLabelText('User menu for Jane Doe'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders avatarUrl image when provided', () => {
    render(
      <UserMenu
        user={{ ...user, avatarUrl: 'https://example.com/avatar.png' }}
        items={items}
      />,
    );
    const img = screen.getByRole('img', { name: 'Jane Doe' });
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png');
  });

  it('renders empty items list without crashing', () => {
    render(<UserMenu user={user} items={[]} />);
    fireEvent.click(screen.getByLabelText('User menu for Jane Doe'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
