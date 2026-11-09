import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SubjectFrame, SubjectHero, SUBJECT_FRAME_MAX_FACTS } from '../SubjectFrame';

const tabs = { items: [{ id: 'details', label: 'Details' }, { id: 'versions', label: 'Versions' }, { id: 'activity', label: 'Activity' }], value: 'details', onValueChange: () => {} };

describe('SubjectFrame', () => {
  it('draws the inspector shape in order: title, tabs, hero, facts, disclosures', () => {
    render(
      <SubjectFrame
        title="Toby — Concept 03"
        subtitle="Character concept"
        tabs={tabs}
        hero={{ kind: 'image', src: 'data:image/png;base64,AA==', alt: 'Toby', label: 'Concept 03' }}
        facts={[{ label: 'Status', value: 'In review' }, { label: 'Role', value: 'Lead' }]}
        disclosures={[{ id: 'notes', title: 'Design notes', children: 'Round glasses.' }, { id: 'tags', title: 'Tags', count: 3, children: 'kid' }]}
      />,
    );
    const frame = screen.getByRole('region', { name: 'Toby — Concept 03' });
    expect(frame).toHaveAttribute('data-subject-frame');
    const parts = [...frame.querySelectorAll('[data-subject-part]')].map((el) => el.getAttribute('data-subject-part'));
    expect(parts).toEqual(['title', 'tabs', 'hero', 'facts', 'disclosures']);
    expect(frame).toHaveTextContent('Character concept');
    expect(screen.getByRole('tab', { name: 'Versions' })).toBeInTheDocument();
    expect(frame.querySelector('[data-image-compare-frame]')).toHaveAttribute('data-image-fit', 'contain');
    expect(frame.querySelector('[data-subject-hero]')).toHaveAttribute('data-subject-state', 'image');
    expect(frame.querySelector('[data-subject-part="facts"]')).toHaveAttribute('data-subject-facts', '2');
    expect(frame).toHaveTextContent('Design notes');
    expect(frame.querySelector('[data-empty-state]')).toBeNull();
  });

  it('draws at most eight facts and warns about the rest', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const facts = Array.from({ length: 10 }, (_, i) => ({ label: `Fact ${i}`, value: String(i) }));
    render(<SubjectFrame title="Toby" facts={facts} />);
    expect(screen.getAllByTestId('subject-frame-facts-item')).toHaveLength(SUBJECT_FRAME_MAX_FACTS);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('at most 8'));
    warn.mockRestore();
  });

  it('a placeholder is the same frame with words, never an EmptyState', () => {
    render(<SubjectFrame title="Mina" hero={{ kind: 'placeholder', text: 'No picture yet' }} />);
    const hero = screen.getByTestId('subject-frame-hero');
    expect(hero).toHaveAttribute('data-subject-state', 'placeholder');
    expect(hero.querySelector('[data-gallery-status="placeholder"]')).not.toBeNull();
    expect(screen.getByRole('img', { name: 'Current: No picture yet' })).toBeInTheDocument();
  });

  it('children replace the details body for another tab', () => {
    render(<SubjectFrame title="Toby" tabs={{ ...tabs, value: 'versions' }} hero={{ kind: 'placeholder', text: 'x' }}>Version list</SubjectFrame>);
    expect(screen.getByText('Version list')).toBeInTheDocument();
    expect(screen.queryByTestId('subject-frame-hero')).toBeNull();
  });

  it('a summary-row action does not toggle its disclosure', async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<SubjectFrame title="Toby" disclosures={[{ id: 'assets', title: 'Assets', count: 3, action: <button type="button" onClick={onAdd}>Add</button>, children: 'rows' }]} />);
    const details = screen.getByTestId('subject-frame-disclosure-assets').closest('details') ?? screen.getByTestId('subject-frame-disclosure-assets');
    await user.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAdd).toHaveBeenCalledOnce();
    expect((details as HTMLDetailsElement).open).toBeFalsy();
  });
});

describe('SubjectHero', () => {
  it('running and custom content render as given, with trailing actions', () => {
    const { rerender } = render(<SubjectHero content={{ kind: 'running', content: <p>Drawing Mina · step 2 of 3</p> }} actions={<button type="button">Open run</button>} />);
    expect(screen.getByTestId('subject-hero')).toHaveAttribute('data-subject-state', 'running');
    expect(screen.getByTestId('subject-hero-actions')).toHaveTextContent('Open run');
    rerender(<SubjectHero content={{ kind: 'custom', content: <p>model</p> }} />);
    expect(screen.getByTestId('subject-hero')).toHaveAttribute('data-subject-state', 'custom');
  });
});
