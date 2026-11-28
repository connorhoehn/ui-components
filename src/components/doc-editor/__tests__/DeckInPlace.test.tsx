// Editing in place looks like the slide (2.551.0): the editor takes the
// region's painted text style, the emphasis bar is one compact row outside the
// edited box and inside the stage, the graphic picker draws host SVG artwork
// with a placement row that fits, and PresentationEditor reports decorations.

import { useState } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { DeckSpec } from '../presentation/deckSpec';
import type { DeckCatalogueItem } from '../presentation/IconPicker';
import { GraphicPicker } from '../presentation/GraphicPicker';
import { DEFAULT_SLIDE_SIZE, deckFontStack, emphasisBarPlacement, SlideRegionsOverlay, type SlideRegion, type SlideRegionBox } from '../presentation/SlideRegionsOverlay';
import { PresentationEditor } from '../presentation/PresentationEditor';

const GRAPHICS: DeckCatalogueItem[] = [
  { name: 'blob', label: 'Blob', category: 'shape', keywords: ['organic'] },
  { name: 'dots', label: 'Dots', category: 'pattern', keywords: ['grid'] },
];
const ART = (name: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M0 0h10" data-art="${name}"/></svg>`;

const TITLE_STYLE = {
  fontFamily: 'Gelasio', officeFamily: 'Georgia', fontSize: 40, fontWeight: 700, color: '#1A2B3C', align: 'center' as const,
  lineHeight: 48, letterSpacing: 0.5, background: '#F5F1EA',
};

describe('deckFontStack', () => {
  it('maps the engine families to their office twins and a close fallback', () => {
    expect(deckFontStack('Carlito')).toMatch(/^"Carlito", "Calibri",.*sans-serif$/);
    expect(deckFontStack('Liberation Sans')).toMatch(/^"Liberation Sans", Arial,/);
    expect(deckFontStack('Gelasio')).toMatch(/^"Gelasio", Georgia,.*serif$/);
    expect(deckFontStack('Inter";x', 'Arial')).toBe('"Interx", "Arial", sans-serif');
  });
});

describe('the in-place editor takes the slide text style', () => {
  it('applies family, size, weight, colour, alignment, line pitch and backdrop from region.text', () => {
    const regions: SlideRegion[] = [{ path: 'title', kind: 'runs', box: { x: 60, y: 120, w: 600, h: 60 }, value: 'Plan', text: { ...TITLE_STYLE, uppercase: true, italic: true } }];
    render(<SlideRegionsOverlay regions={regions} onEdit={() => undefined} />);
    fireEvent.click(screen.getByRole('button', { name: 'Slide title' }));
    const editor = screen.getByRole('textbox', { name: 'Slide title' });
    expect(editor).toHaveAttribute('data-styled', 'slide');
    expect(editor.style.getPropertyValue('--region-font')).toBe(deckFontStack('Gelasio'));
    expect(editor.style.getPropertyValue('--region-color')).toBe('#1A2B3C');
    expect(editor.style.getPropertyValue('--region-lh')).toBe('1.2');
    expect(editor.style.getPropertyValue('--region-ls')).toBe('0.5px');
    expect(editor.style.getPropertyValue('--region-bg')).toBe('#F5F1EA');
    for (const c of ['font-bold', 'text-center', 'uppercase', 'italic', '[font-family:var(--region-font)]', '[background-color:var(--region-bg)]']) expect(editor.className).toContain(c);
    // No white box: no surface background, no drop shadow.
    expect(editor.className).not.toContain('bg-surface');
    expect(editor.className).toContain('shadow-none');
    // The size is slide units on the foreignObject, so it scales with the stage.
    expect(editor.parentElement).toHaveAttribute('font-size', '40');
  });

  it('is transparent over a photograph and keeps the old look without region.text', () => {
    const regions: SlideRegion[] = [
      { path: 'title', kind: 'text', box: { x: 60, y: 120, w: 600, h: 60 }, value: 'Over a photo', text: { ...TITLE_STYLE, background: undefined } },
      { path: 'eyebrow', kind: 'text', box: { x: 60, y: 60, w: 200, h: 20 }, value: 'Q3', fontSize: 12 },
    ];
    render(<SlideRegionsOverlay regions={regions} onEdit={() => undefined} />);
    fireEvent.click(screen.getByRole('button', { name: 'Slide title' }));
    expect(screen.getByRole('textbox', { name: 'Slide title' }).style.getPropertyValue('--region-bg')).toBe('transparent');
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Slide title' }), { key: 'Escape' });
    fireEvent.click(screen.getByRole('button', { name: 'Eyebrow' }));
    const plain = screen.getByRole('textbox', { name: 'Eyebrow' });
    expect(plain).not.toHaveAttribute('data-styled');
    expect(plain.className).toContain('bg-surface');
    expect(plain.parentElement).toHaveAttribute('font-size', '12');
  });
});

describe('the emphasis bar', () => {
  const { width, height } = DEFAULT_SLIDE_SIZE;
  /** The bar's edge on the edited box's side, in slide units, from its placement. */
  const clear = (box: SlideRegionBox) => {
    const p = emphasisBarPlacement(box);
    const edge = (p.top / 100) * height;
    return p.side === 'above' ? edge <= box.y + 0.01 : edge >= box.y + box.h - 0.01;
  };

  it('sits above the box, or below it near the top, and never over it', () => {
    expect(emphasisBarPlacement({ x: 60, y: 120, w: 600, h: 60 }).side).toBe('above');
    expect(emphasisBarPlacement({ x: 60, y: 10, w: 600, h: 60 }).side).toBe('below');
    for (const box of [{ x: 60, y: 120, w: 600, h: 60 }, { x: 60, y: 4, w: 840, h: 80 }, { x: 700, y: 460, w: 200, h: 60 }]) {
      expect(clear(box)).toBe(true);
    }
  });

  it('anchors to the box edge nearer the stage centre so it stays inside the stage', () => {
    const left = emphasisBarPlacement({ x: 60, y: 120, w: 300, h: 60 });
    expect(left).toMatchObject({ anchor: 'left', left: (60 / width) * 100 });
    const right = emphasisBarPlacement({ x: 700, y: 120, w: 240, h: 60 });
    expect(right).toMatchObject({ anchor: 'right' });
    expect(right.right).toBeCloseTo((20 / width) * 100, 2);
  });

  it('renders one compact row of labelled icon buttons outside the SVG, placed by stage percentages', () => {
    const regions: SlideRegion[] = [{ path: 'title', kind: 'runs', box: { x: 60, y: 120, w: 600, h: 60 }, value: 'Plan', text: TITLE_STYLE }];
    render(<div className="relative"><SlideRegionsOverlay regions={regions} onEdit={() => undefined} /></div>);
    fireEvent.click(screen.getByRole('button', { name: 'Slide title' }));
    const bar = screen.getByTestId('slide-regions-emphasis-bar');
    expect(screen.getByTestId('slide-regions').contains(bar)).toBe(false);
    expect(bar).toHaveAttribute('data-side', 'above');
    expect(bar.className).toContain('flex-nowrap');
    const top = parseFloat(bar.style.getPropertyValue('--bar-top'));
    expect((top / 100) * height).toBeLessThanOrEqual(120);
    const toolbar = within(bar).getByRole('toolbar', { name: 'Slide title: emphasis' });
    expect(toolbar.className).toContain('flex-nowrap');
    expect(within(toolbar).queryByText('Highlight')).toBeNull(); // icons, not words
    for (const name of ['Highlight', 'Accent', 'Bold', 'Underline', 'Outline', 'Gradient', 'Plain']) {
      expect(within(toolbar).getByRole('button', { name })).toBeInTheDocument();
    }
  });
});

describe('GraphicPicker artwork and placement', () => {
  it('draws host SVG strings in the tiles', () => {
    render(<GraphicPicker items={GRAPHICS} graphicSvg={ART} value={{ graphic: 'blob' }} onChange={() => undefined} />);
    expect(screen.getByTestId('graphic-picker-art-blob').querySelector('svg path[data-art="blob"]')).not.toBeNull();
    expect(screen.getByTestId('graphic-picker-art-dots').querySelector('svg')).not.toBeNull();
  });

  it('puts placement on its own row as a grid that fills the pane', () => {
    render(<GraphicPicker items={GRAPHICS} value={{ graphic: 'blob' }} onChange={() => undefined} />);
    const row = screen.getByTestId('graphic-picker-placement');
    expect(row.className).toContain('flex-col');
    const group = within(row).getByRole('radiogroup', { name: 'Placement' });
    expect(group.className).toContain('grid-cols-2');
    expect(within(group).getByRole('radio', { name: 'Beside the title' })).toBeInTheDocument();
  });
});

describe('PresentationEditor onDecorationChange', () => {
  const SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"></svg>';
  const spec: DeckSpec = { title: 'Plan', slides: [{ id: 's1', layout: 'bullets', title: 'Bets', bullets: ['One'], sources: [{ documentId: 'd1', title: 'Notes' }] }] };

  function Harness({ onDecorationChange, onSpec }: { onDecorationChange: (...args: unknown[]) => void; onSpec: (s: DeckSpec) => void }) {
    const [current, setCurrent] = useState(spec);
    return (
      <PresentationEditor
        spec={current}
        onChange={(next) => { setCurrent(next); onSpec(next); }}
        preview={{ slides: [{ id: 's1', svg: SVG }] }}
        onRequestPreview={() => undefined}
        onSaveRevision={async () => undefined}
        revisions={[{ id: 'r1', label: 'v1' }]}
        activeRevisionId="r1"
        onSelectRevision={() => undefined}
        sources={[]}
        slideRegions={{ s1: [{ path: 'decoration', kind: 'graphic', box: { x: 800, y: 20, w: 120, h: 120 } }] }}
        graphics={{ items: GRAPHICS, graphicSvg: ART }}
        onDecorationChange={onDecorationChange}
        data-testid="pe"
      />
    );
  }

  it('fires from the side pane graphic row and from the stage graphic picker', () => {
    const onDecorationChange = vi.fn();
    const onSpec = vi.fn();
    render(<Harness onDecorationChange={onDecorationChange} onSpec={onSpec} />);
    fireEvent.click(screen.getByTestId('pe-decoration-toggle'));
    fireEvent.click(screen.getByTestId('pe-decoration-picker-blob'));
    expect(onDecorationChange).toHaveBeenLastCalledWith('s1', { graphic: 'blob' });
    expect((onSpec.mock.calls.at(-1)![0] as DeckSpec).slides[0]!.decoration).toEqual({ graphic: 'blob' });
    fireEvent.click(screen.getByTestId('pe-decoration-picker-placement-corner'));
    expect(onDecorationChange).toHaveBeenLastCalledWith('s1', { graphic: 'blob', placement: 'corner' });
    fireEvent.click(screen.getByTestId('pe-decoration-picker-none'));
    expect(onDecorationChange).toHaveBeenLastCalledWith('s1', 'none');

    fireEvent.click(screen.getByRole('button', { name: 'Slide graphic' }));
    fireEvent.click(screen.getByTestId('pe-graphic-picker-default'));
    expect(onDecorationChange).toHaveBeenLastCalledWith('s1', undefined);
    expect((onSpec.mock.calls.at(-1)![0] as DeckSpec).slides[0]!.decoration).toBeUndefined();
  });
});
