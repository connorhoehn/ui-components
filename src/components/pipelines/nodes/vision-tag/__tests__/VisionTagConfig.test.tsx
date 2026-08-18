import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VisionTagConfig, { DEFAULT_VISION_MODELS } from '../VisionTagConfig';
import { PipelineEditorServicesProvider } from '../../../services/PipelineEditorServicesContext';
import type { ImageVisionTagNodeData } from '../../../../../types/pipeline';

const base = (over: Partial<ImageVisionTagNodeData> = {}): ImageVisionTagNodeData => ({
  type: 'image:vision-tag',
  imageRefPath: '$.trigger.imageRef',
  ...over,
});

describe('VisionTagConfig', () => {
  it('edits the image ref path', () => {
    const onChange = vi.fn();
    render(<VisionTagConfig data={base()} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Image ref path'), {
      target: { value: '$.scatter.parentImageId' },
    });
    expect(onChange).toHaveBeenCalledWith({ imageRefPath: '$.scatter.parentImageId' });
  });

  it('says the path is required when it is blank', () => {
    render(<VisionTagConfig data={base({ imageRefPath: '  ' })} onChange={vi.fn()} />);
    expect(screen.getByText(/Required/)).toBeInTheDocument();
  });

  it('adds a candidate tag through the shared TagEditor', () => {
    const onChange = vi.fn();
    render(<VisionTagConfig data={base({ candidateTags: ['dog'] })} onChange={onChange} />);
    const input = screen.getByPlaceholderText('Add candidate tag…');
    fireEvent.change(input, { target: { value: 'cat' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith({ candidateTags: ['dog', 'cat'] });
  });

  it('preserves the case of a candidate tag', () => {
    // Candidate tags are a controlled vocabulary handed to the model, so
    // "Golden Retriever" has to survive as written — TagEditor lowercases by
    // default and must be told not to here.
    const onChange = vi.fn();
    render(<VisionTagConfig data={base({ candidateTags: [] })} onChange={onChange} />);
    const input = screen.getByPlaceholderText('Add candidate tag…');
    fireEvent.change(input, { target: { value: 'Golden Retriever' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith({ candidateTags: ['Golden Retriever'] });
  });

  it('offers the default vision models with no host wiring', () => {
    render(<VisionTagConfig data={base()} onChange={vi.fn()} />);
    const options = [...(screen.getByLabelText('Model') as HTMLSelectElement).options];
    expect(options.map((o) => o.value)).toEqual(DEFAULT_VISION_MODELS.map((m) => m.value));
  });

  it('lets a host supply its own vision models', () => {
    render(
      <PipelineEditorServicesProvider
        services={{ getImageUrl: () => '', modelOptions: { 'image:vision': [{ value: 'llava' }] } }}
      >
        <VisionTagConfig data={base()} onChange={vi.fn()} />
      </PipelineEditorServicesProvider>,
    );
    const options = [...(screen.getByLabelText('Model') as HTMLSelectElement).options];
    expect(options.map((o) => o.value)).toEqual(['llava']);
  });

  it('warns that the system prompt is not interpolated', () => {
    // The executor passes systemPrompt through verbatim
    // (visionHandlerFactory buildSystemPrompt), so a {{context.*}} token here
    // reaches the model as literal text. The panel used to import a
    // ContextVariablePicker for this field and never render it.
    render(<VisionTagConfig data={base()} onChange={vi.fn()} />);
    expect(screen.getByText(/NOT substituted/)).toBeInTheDocument();
  });
});
