// A one-item group whose label repeats the item renders the same words twice in
// a row in the nav ("Social & Chat" as a header, "Social & Chat" as the link).
// Eight groups in the demo nav were shaped that way after the IA restructure.
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DocsSidebar } from '../DocsSidebar';

const renderLink = ({ to }: { to: string }, props: Record<string, unknown>) =>
  <a href={to} {...props}>{props.children as never}</a>;

function sidebar(groups: unknown) {
  return render(
    <DocsSidebar
      sections={[{ id: 's', label: 'Workflows', groups } as never]}
      activeHref="/x"
      renderLink={renderLink as never}
    />,
  );
}

describe('DocsSidebar redundant group headers', () => {
  it('drops the header when a single item repeats it', () => {
    sidebar([{ id: 'g', label: 'Social & Chat', items: [
      { id: 'i', label: 'Social & Chat', to: '/social' },
    ] }]);
    expect(screen.getAllByText('Social & Chat')).toHaveLength(1);
  });

  it('keeps the header when the group has several items', () => {
    sidebar([{ id: 'g', label: 'Primitives', items: [
      { id: 'a', label: 'Primitives', to: '/p' },
      { id: 'b', label: 'Buttons', to: '/b' },
    ] }]);
    expect(screen.getAllByText('Primitives')).toHaveLength(2);
  });

  it('keeps the header when the single item differs', () => {
    sidebar([{ id: 'g', label: 'Data', items: [
      { id: 'a', label: 'Ingest Dashboard', to: '/i' },
    ] }]);
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Ingest Dashboard')).toBeInTheDocument();
  });
});
