import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CookbookPicker } from '../CookbookPicker';
import { matchesCookbookQuery, filterCookbooks, documentTypeCookbooks } from '../index';

describe('matchesCookbookQuery', () => {
  it('matches on name, tag, category and description', () => {
    const retro = documentTypeCookbooks.find((c) => c.id === 'sprint-retro')!;
    expect(matchesCookbookQuery(retro, 'retro')).toBe(true);      // name + tag
    expect(matchesCookbookQuery(retro, 'AGILE')).toBe(true);      // tag, case-insensitive
    expect(matchesCookbookQuery(retro, 'engineering')).toBe(true); // category
    expect(matchesCookbookQuery(retro, 'went well')).toBe(true);   // description
    expect(matchesCookbookQuery(retro, 'invoice')).toBe(false);
  });

  it('an empty query matches everything — a blank box is not a filter', () => {
    expect(filterCookbooks('')).toHaveLength(documentTypeCookbooks.length);
    expect(filterCookbooks('   ')).toHaveLength(documentTypeCookbooks.length);
  });

  it('the word people actually type finds the right template', () => {
    // None of these three words appear in the matching template's NAME.
    expect(filterCookbooks('postmortem').map((c) => c.id)).toContain('incident-report');
    expect(filterCookbooks('hiring').map((c) => c.id)).toContain('job-posting');
    expect(filterCookbooks('nda').map((c) => c.id)).toContain('contract');
  });
});

describe('CookbookPicker', () => {
  it('renders every cookbook and picks one on click', () => {
    const onPick = vi.fn();
    render(<CookbookPicker onPick={onPick} />);
    expect(screen.getByTestId('cookbooks-grid')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cookbook-use-meeting-notes'));
    expect(onPick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'meeting-notes' }),
    );
  });

  it('Enter in the search box takes the top match', () => {
    const onPick = vi.fn();
    render(<CookbookPicker onPick={onPick} />);
    const search = screen.getByTestId('cookbooks-search');
    fireEvent.change(search, { target: { value: 'retro' } });
    fireEvent.keyDown(search, { key: 'Enter' });
    expect(onPick).toHaveBeenCalledWith(expect.objectContaining({ id: 'sprint-retro' }));
  });

  it('filters by category pill', () => {
    render(<CookbookPicker onPick={vi.fn()} />);
    fireEvent.click(screen.getByTestId('cookbook-cat-finance'));
    expect(screen.getByTestId('cookbook-card-invoice')).toBeInTheDocument();
    expect(screen.queryByTestId('cookbook-card-sprint-retro')).toBeNull();
  });

  // Two pickers on one screen (the Document Types page renders one inline while
  // the Cookbooks modal renders another) would make every `cookbooks-*`
  // selector in the existing specs match twice.
  it('takes its testids from the caller so two mounts do not collide', () => {
    render(
      <>
        <CookbookPicker onPick={vi.fn()} />
        <CookbookPicker onPick={vi.fn()} idPrefix="type-starters" cardPrefix="type-starter" />
      </>,
    );
    expect(screen.getByTestId('cookbooks-grid')).toBeInTheDocument();
    expect(screen.getByTestId('type-starters-grid')).toBeInTheDocument();
    expect(screen.getByTestId('cookbook-card-invoice')).toBeInTheDocument();
    expect(screen.getByTestId('type-starter-card-invoice')).toBeInTheDocument();
  });

  it('disables every action while an install is in flight', () => {
    const onPick = vi.fn();
    render(<CookbookPicker onPick={onPick} busy />);
    const btn = screen.getByTestId('cookbook-use-meeting-notes');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onPick).not.toHaveBeenCalled();
  });

  it('says so when nothing matches', () => {
    render(<CookbookPicker onPick={vi.fn()} />);
    fireEvent.change(screen.getByTestId('cookbooks-search'), {
      target: { value: 'zzzzzz' },
    });
    expect(screen.getByTestId('cookbooks-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('cookbooks-grid')).toBeNull();
  });
});
