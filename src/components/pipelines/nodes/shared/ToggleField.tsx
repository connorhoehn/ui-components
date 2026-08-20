// src/components/pipelines/nodes/shared/ToggleField.tsx
//
// A boolean setting in a node config panel: control on the left, label beside
// it, help underneath.
//
// ConfigField stacks its label above the control, which is right for a text or
// number field and wrong for a toggle — so every panel that needed one dropped
// out of the ConfigField pattern and hand-rolled a `<label><input
// type="checkbox">` pair instead, eight times across seven panels, each with
// its own `accent-primary w-3.5 h-3.5` styling. This gives them the shape they
// actually wanted, built on the library's own <Switch>.

import Switch from '../../../shared/Switch';

export interface ToggleFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  help?: string;
  disabled?: boolean;
  'data-testid'?: string;
}

export default function ToggleField({
  label,
  checked,
  onChange,
  help,
  disabled,
  'data-testid': testId,
}: ToggleFieldProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Switch
          size="sm"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-label={label}
          data-testid={testId}
        />
        <span className="text-xs font-semibold text-text-secondary">{label}</span>
      </div>
      {help && <div className="text-[11px] text-text-tertiary mt-0.5">{help}</div>}
    </div>
  );
}
