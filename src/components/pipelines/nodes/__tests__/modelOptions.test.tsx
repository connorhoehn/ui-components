// Model lists are a HOST property, not a library constant.
//
// The editor has to ship *some* list to be usable out of the box, but a
// hardcoded one is wrong the moment a host runs a different deployment, or the
// provider ships a new tier. So the defaults are a fallback and the host
// replaces any group through `modelOptions` on the editor services seam.
//
// These panels also had no test coverage at all before this file, which is how
// both of them ended up hand-rolling their controls.

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../../services/PipelineEditorServicesContext';
import GenerateConfig, { DEFAULT_GENERATE_MODELS } from '../generate/GenerateConfig';
import LLMConfig, { DEFAULT_MODELS_BY_PROVIDER } from '../llm/LLMConfig';
import type { ImageGenerateNodeData, LLMNodeData } from '../../../../types/pipeline';

const gen = (over: Partial<ImageGenerateNodeData> = {}): ImageGenerateNodeData => ({
  type: 'image:generate',
  prompt: 'a cat',
  ...over,
});

const llm = (over: Partial<LLMNodeData> = {}): LLMNodeData => ({
  type: 'llm',
  provider: 'anthropic',
  model: 'claude-sonnet-4-6',
  systemPrompt: '',
  userPromptTemplate: '',
  streaming: false,
  ...over,
});

const noop = () => '';

const withServices = (services: PipelineEditorServices, ui: React.ReactNode) =>
  render(
    <PipelineEditorServicesProvider services={services}>
      {ui}
    </PipelineEditorServicesProvider>,
  );

// Queried by accessible name rather than getByLabelText: LLMConfig's Provider
// and Model are `required`, and ConfigField puts an aria-hidden "●" in the
// label, which getByLabelText matches on (raw textContent) but the accessible
// name correctly drops. Before the labels were wired these resolved through an
// aria-label that merely restated the visible label.
const optionValues = (label: string) =>
  within(screen.getByRole('combobox', { name: label }))
    .queryAllByRole('option')
    .map((o) => (o as HTMLOptionElement).value);

describe('image:generate model options', () => {
  it('offers the shipped defaults with no host wiring', () => {
    render(<GenerateConfig data={gen()} onChange={vi.fn()} />);
    expect(optionValues('Model')).toEqual(
      DEFAULT_GENERATE_MODELS.map((m) => m.value),
    );
  });

  it('lets a host replace the list entirely', () => {
    withServices(
      {
        getImageUrl: noop,
        modelOptions: {
          'image:generate': [
            { value: 'sd-xl', label: 'Stable Diffusion XL' },
            { value: 'flux-1' },
          ],
        },
      },
      <GenerateConfig data={gen()} onChange={vi.fn()} />,
    );
    expect(optionValues('Model')).toEqual(['sd-xl', 'flux-1']);
    expect(screen.getByText('Stable Diffusion XL')).toBeInTheDocument();
  });

  it('falls back to the value when a host omits the label', () => {
    withServices(
      { getImageUrl: noop, modelOptions: { 'image:generate': [{ value: 'flux-1' }] } },
      <GenerateConfig data={gen()} onChange={vi.fn()} />,
    );
    expect(screen.getByText('flux-1')).toBeInTheDocument();
  });

  it('honours an explicitly empty host list rather than restoring defaults', () => {
    // "This host runs no image models" is a real answer, not "unset".
    withServices(
      { getImageUrl: noop, modelOptions: { 'image:generate': [] } },
      <GenerateConfig data={gen()} onChange={vi.fn()} />,
    );
    expect(optionValues('Model')).toEqual([]);
    expect(screen.getByText('This host declares no image models.')).toBeInTheDocument();
  });

  it('defaults the selection to the first offered model, not a hardcoded id', () => {
    // With a host-supplied list, a hardcoded default may not be in it — the
    // select would then render with no matching option.
    withServices(
      { getImageUrl: noop, modelOptions: { 'image:generate': [{ value: 'flux-1' }] } },
      <GenerateConfig data={gen()} onChange={vi.fn()} />,
    );
    expect((screen.getByLabelText('Model') as HTMLSelectElement).value).toBe('flux-1');
  });

  it('ignores model options aimed at another group', () => {
    withServices(
      { getImageUrl: noop, modelOptions: { 'llm:anthropic': [{ value: 'nope' }] } },
      <GenerateConfig data={gen()} onChange={vi.fn()} />,
    );
    expect(optionValues('Model')).toEqual(
      DEFAULT_GENERATE_MODELS.map((m) => m.value),
    );
  });
});

describe('llm model options', () => {
  it('offers the selected provider’s defaults with no host wiring', () => {
    render(<LLMConfig data={llm()} onChange={vi.fn()} />);
    expect(optionValues('Model')).toEqual(DEFAULT_MODELS_BY_PROVIDER.anthropic);
  });

  it('lets a host replace one provider without restating the others', () => {
    withServices(
      { getImageUrl: noop, modelOptions: { 'llm:bedrock': [{ value: 'custom-1' }] } },
      <LLMConfig data={llm({ provider: 'anthropic' })} onChange={vi.fn()} />,
    );
    // anthropic untouched...
    expect(optionValues('Model')).toEqual(DEFAULT_MODELS_BY_PROVIDER.anthropic);
  });

  it('uses the host list for the provider being switched TO', () => {
    // The switch decides whether the current model survives, so it has to read
    // the incoming provider's list — not the one currently rendered.
    const onChange = vi.fn();
    withServices(
      { getImageUrl: noop, modelOptions: { 'llm:bedrock': [{ value: 'custom-1' }] } },
      <LLMConfig data={llm({ provider: 'anthropic' })} onChange={onChange} />,
    );

    fireEvent.change(screen.getByRole('combobox', { name: 'Provider' }), {
      target: { value: 'bedrock' },
    });

    expect(onChange).toHaveBeenCalledWith({ provider: 'bedrock', model: 'custom-1' });
  });

  it('keeps the current model when it is valid for the new provider', () => {
    const onChange = vi.fn();
    render(<LLMConfig data={llm({ model: 'claude-opus-4-7' })} onChange={onChange} />);

    fireEvent.change(screen.getByRole('combobox', { name: 'Provider' }), {
      target: { value: 'bedrock' },
    });

    expect(onChange).toHaveBeenCalledWith({
      provider: 'bedrock',
      model: 'claude-opus-4-7',
    });
  });

  it('resets to the first option when the current model is not valid', () => {
    const onChange = vi.fn();
    render(<LLMConfig data={llm({ model: 'claude-opus-4-7' })} onChange={onChange} />);

    fireEvent.change(screen.getByRole('combobox', { name: 'Provider' }), {
      target: { value: 'claude-code' },
    });

    expect(onChange).toHaveBeenCalledWith({
      provider: 'claude-code',
      model: DEFAULT_MODELS_BY_PROVIDER['claude-code'][0],
    });
  });
});
