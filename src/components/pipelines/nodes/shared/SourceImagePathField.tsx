// src/components/pipelines/nodes/shared/SourceImagePathField.tsx
//
// "Which image does this step operate on?" — the JSONPath field that thirteen
// image node config panels each rendered for themselves, along with their own
// copy of the upstream-ref suggestion pills.
//
// Each copy carried its own class-string constant, and those had already
// diverged: some rendered the path monospaced and some did not, so the same
// field looked different depending on which node you selected. Extracting it
// makes the field one thing with one appearance, and gives the panels a single
// place to fix a bug in.
//
// The value is deliberately `undefined` rather than `''` when blank: an empty
// string reads downstream as "configured, to nothing", where absent correctly
// means "default to the image produced upstream".

import { ConfigField, SamplePills } from '.';
import { Input } from '../../../forms/Input';
import { useUpstreamImageRefs } from '../../context/useUpstreamContext';

export interface SourceImagePathFieldProps {
  value: string | undefined;
  onChange: (next: string | undefined) => void;
  /** Node being edited; drives the real upstream image-ref suggestions. */
  nodeId?: string;
  label?: string;
  help?: string;
  placeholder?: string;
}

export default function SourceImagePathField({
  value,
  onChange,
  nodeId,
  label = 'Source image path',
  help = 'Optional. Defaults to the image produced upstream.',
  placeholder = '$.trigger.imageRef',
}: SourceImagePathFieldProps) {
  const imageRefOptions = useUpstreamImageRefs(nodeId ?? null);

  return (
    <ConfigField label={label} help={help}>
      <Input
        size="sm"
        mono
        spellCheck={false}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value.trim() || undefined)}
        placeholder={placeholder}
        aria-label={label}
      />
      <SamplePills
        samples={imageRefOptions.map((o) => o.path)}
        onSelect={onChange}
        aria-label="Upstream image refs"
      />
    </ConfigField>
  );
}
