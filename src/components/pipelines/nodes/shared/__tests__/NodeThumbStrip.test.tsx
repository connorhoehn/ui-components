// src/components/pipelines/nodes/shared/__tests__/NodeThumbStrip.test.tsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NodeThumbStrip, { type NodeThumbStripImage } from '../NodeThumbStrip';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../../services/PipelineEditorServicesContext';

const stubServices: PipelineEditorServices = {
  getImageUrl: (id) => `/test/${id}`,
};

function imgs(n: number): NodeThumbStripImage[] {
  return Array.from({ length: n }, (_, i) => ({
    imageId: `img_${i}`,
    alt: `Result ${i}`,
  }));
}

function renderStrip(ui: React.ReactElement) {
  return render(
    <PipelineEditorServicesProvider services={stubServices}>
      {ui}
    </PipelineEditorServicesProvider>,
  );
}

describe('NodeThumbStrip', () => {
  it('renders nothing for an empty image list', () => {
    renderStrip(<NodeThumbStrip images={[]} />);
    expect(screen.queryByTestId('node-thumb-strip')).not.toBeInTheDocument();
  });

  it('renders one tile per image when count <= max, no overflow tile', () => {
    renderStrip(<NodeThumbStrip images={imgs(4)} />);
    for (let i = 0; i < 4; i++) {
      expect(screen.getByTestId(`node-thumb-strip-thumb-${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId('node-thumb-strip-overflow')).not.toBeInTheDocument();
  });

  it('resolves thumb src via useImageUrl', () => {
    renderStrip(<NodeThumbStrip images={imgs(2)} />);
    const img = screen
      .getByTestId('node-thumb-strip-thumb-1')
      .querySelector('img') as HTMLImageElement;
    expect(img.src).toContain('/test/img_1');
  });

  it('overflow math: 6 images / max 4 → 3 thumbs + "+3" tile', () => {
    renderStrip(<NodeThumbStrip images={imgs(6)} />);
    expect(screen.getByTestId('node-thumb-strip-thumb-2')).toBeInTheDocument();
    expect(screen.queryByTestId('node-thumb-strip-thumb-3')).not.toBeInTheDocument();
    expect(screen.getByTestId('node-thumb-strip-overflow').textContent).toBe('+3');
  });

  it('overflow math respects a custom max (5 images / max 2 → 1 thumb + "+4")', () => {
    renderStrip(<NodeThumbStrip images={imgs(5)} max={2} />);
    expect(screen.getByTestId('node-thumb-strip-thumb-0')).toBeInTheDocument();
    expect(screen.queryByTestId('node-thumb-strip-thumb-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('node-thumb-strip-overflow').textContent).toBe('+4');
  });

  it('clicking a thumb opens the lightbox at that index over ALL images', () => {
    renderStrip(<NodeThumbStrip images={imgs(6)} />);
    fireEvent.click(screen.getByTestId('node-thumb-strip-thumb-1'));

    const lightbox = screen.getByTestId('image-lightbox');
    expect(lightbox).toBeInTheDocument();
    expect(screen.getByTestId('image-lightbox-counter').textContent).toBe('2 / 6');
    const img = screen.getByTestId('image-lightbox-img') as HTMLImageElement;
    expect(img.src).toContain('/test/img_1');
  });

  it('clicking the +N tile opens the lightbox at the first overflow index', () => {
    renderStrip(<NodeThumbStrip images={imgs(6)} />);
    fireEvent.click(screen.getByTestId('node-thumb-strip-overflow'));
    // 3 visible thumbs (0..2); "+N" stands in for index 3 onward.
    expect(screen.getByTestId('image-lightbox-counter').textContent).toBe('4 / 6');
  });

  it('lightbox navigation crosses into overflowed images and closes cleanly', () => {
    renderStrip(<NodeThumbStrip images={imgs(6)} />);
    fireEvent.click(screen.getByTestId('node-thumb-strip-thumb-2'));
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByTestId('image-lightbox-counter').textContent).toBe('4 / 6');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByTestId('image-lightbox')).not.toBeInTheDocument();
  });

  it('stops propagation on mousedown and click so React Flow does not select the node', () => {
    const onMouseDown = vi.fn();
    const onClick = vi.fn();
    renderStrip(
      <div onMouseDown={onMouseDown} onClick={onClick}>
        <NodeThumbStrip images={imgs(6)} />
      </div>,
    );

    fireEvent.mouseDown(screen.getByTestId('node-thumb-strip-thumb-0'));
    fireEvent.click(screen.getByTestId('node-thumb-strip-thumb-0'));
    fireEvent.mouseDown(screen.getByTestId('node-thumb-strip-overflow'));
    fireEvent.click(screen.getByTestId('node-thumb-strip-overflow'));

    expect(onMouseDown).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('honors a custom data-testid', () => {
    renderStrip(<NodeThumbStrip images={imgs(2)} data-testid="gen-thumbs" />);
    expect(screen.getByTestId('gen-thumbs')).toBeInTheDocument();
    expect(screen.getByTestId('gen-thumbs-thumb-0')).toBeInTheDocument();
  });
});
