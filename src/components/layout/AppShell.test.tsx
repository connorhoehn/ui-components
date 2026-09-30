import { render, screen } from '@testing-library/react';
import { AppShell } from './AppShell';

describe('AppShell', () => {
  it('renders header and children', () => {
    render(
      <AppShell header={<div>My Header</div>}>
        <main>Page content</main>
      </AppShell>,
    );
    expect(screen.getByText('My Header')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders sidebar slot when provided', () => {
    render(
      <AppShell header={<div>H</div>} sidebar={<nav>Sidebar nav</nav>}>
        <div>Content</div>
      </AppShell>,
    );
    expect(screen.getByText('Sidebar nav')).toBeInTheDocument();
  });

  it('does not render sidebar aside when not provided', () => {
    render(
      <AppShell header={<div>H</div>}>
        <div>Content</div>
      </AppShell>,
    );
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  });

  it('renders loading overlay when loading=true', () => {
    render(
      <AppShell header={<div>H</div>} loading>
        <div>Content</div>
      </AppShell>,
    );
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders custom loading content', () => {
    render(
      <AppShell header={<div>H</div>} loading={<div>Custom spinner</div>}>
        <div>Content</div>
      </AppShell>,
    );
    expect(screen.getByText('Custom spinner')).toBeInTheDocument();
  });

  it('renders apiDegraded slot', () => {
    render(
      <AppShell header={<div>H</div>} apiDegraded={<div>API down</div>}>
        <div>Content</div>
      </AppShell>,
    );
    expect(screen.getByText('API down')).toBeInTheDocument();
  });

  it('does not show loading overlay when loading=false', () => {
    render(
      <AppShell header={<div>H</div>} loading={false}>
        <div>Content</div>
      </AppShell>,
    );
    expect(screen.queryByRole('status', { name: 'Loading' })).not.toBeInTheDocument();
  });

  it('renders commandPalette slot when provided', () => {
    render(
      <AppShell
        header={<div>H</div>}
        commandPalette={<div data-testid="cmd-palette">palette here</div>}
      >
        <div>Content</div>
      </AppShell>,
    );
    expect(screen.getByTestId('cmd-palette')).toBeInTheDocument();
  });

  it('main can shrink below its content (min-w-0) so a long line never widens the page', () => {
    const { container } = render(
      <AppShell header={<div>H</div>}>
        <div>Content</div>
      </AppShell>,
    );
    const main = container.querySelector('main');
    expect(main?.className).toContain('min-w-0');
    expect(main?.className).toContain('flex-1');
  });
});
