// Leaf and section rendering for page specs. Each leaf kind maps to exactly
// one library component; nothing here draws its own visuals.
//
// The `data-spec-leaf="<kind>"` marker goes on the leaf component itself when
// it forwards attributes (Button, Text, Stack); otherwise on a `display:
// contents` wrapper that takes no box, so it never changes the layout of the
// row or column the leaf sits in.
import { useId, useState, type ReactNode } from 'react';
import { Button } from '../../ui/Button';
import { PageSection } from '../../ui/PageSection';
import { SectionStack } from '../../ui/SectionStack';
import { Stack } from '../../ui/Stack';
import { ToolbarGroup } from '../Toolbar';
import { DropdownMenu } from '../DropdownMenu';
import { DataTable } from '../DataTable';
import StatCard from '../StatCard';
import { KPIGrid } from '../KPIGrid';
import { StatStrip } from '../StatStrip';
import { KeyValue } from '../KeyValue';
import { StatusPill } from '../StatusPill';
import { Badge } from '../Badge';
import { Text } from '../Text';
import { MetaLine } from '../MetaLine';
import EmptyState from '../EmptyState';
import Banner from '../Banner';
import { GroupedList } from '../GroupedList';
import { ActionRowList } from '../../work/ActionRowList';
import { TabPanel, Tabs } from '../Tabs';
import { TrendSparkline } from '../TrendSparkline';
import { WorkActivityList } from '../../work/WorkActivityList';
import SearchInput from '../SearchInput';
import FormField from '../FormField';
import Switch from '../Switch';
import { Input } from '../../forms/Input';
import { Select } from '../../forms/Select';
import { Textarea } from '../../forms/Textarea';
import { NumberInput } from '../../forms/NumberInput';
import { Checkbox } from '../../forms/Checkbox';
import { isBuiltinLeafKind, useRegisteredLeaf } from './registry';
import type {
  BuiltinLeafSpec, ButtonLeaf, FormFieldSpec, LeafList, LeafSpec, SectionList, SectionSpec, TabsLeaf,
} from './types';

/** A box-less wrapper that carries the leaf marker for a component that does not forward attributes. */
function Marker({ kind, children, ...rest }: { kind: string; children: ReactNode; 'data-page-spec-custom'?: string }) {
  return <div className="contents" data-ui-part="" data-spec-leaf={kind} {...rest}>{children}</div>;
}

function renderButton(leaf: ButtonLeaf, key?: string | number) {
  const { kind, label, ...props } = leaf;
  return <Button key={key} {...props} data-spec-leaf={kind}>{label}</Button>;
}

function FormFieldView({ field }: { field: FormFieldSpec }) {
  const { label, hint, error, required, disabled, 'data-testid': testId } = field;
  const inline = field.control === 'checkbox' || field.control === 'toggle';
  return (
    <FormField label={label} {...(hint ? { hint } : {})} {...(error ? { error } : {})} {...(required ? { required } : {})}
      layout={inline ? 'inline' : 'stacked'} {...(testId ? { 'data-testid': testId } : {})}>
      {(wiring) => {
        switch (field.control) {
          case 'input':
            return <Input {...wiring} value={field.value} onChange={(e) => field.onChange(e.target.value)}
              {...(field.type ? { type: field.type } : {})} placeholder={field.placeholder} name={field.name} disabled={disabled} />;
          case 'textarea':
            return <Textarea {...wiring} value={field.value} onChange={(e) => field.onChange(e.target.value)}
              {...(field.rows ? { rows: field.rows } : {})} placeholder={field.placeholder} name={field.name} disabled={disabled} />;
          case 'select':
            return <Select {...wiring} value={field.value} onChange={(e) => field.onChange(e.target.value)} options={field.options}
              {...(field.placeholder ? { placeholder: field.placeholder } : {})} {...(field.searchable ? { searchable: true } : {})}
              name={field.name} disabled={disabled} />;
          case 'number':
            return <NumberInput {...wiring} value={field.value} onChange={field.onChange} min={field.min} max={field.max}
              step={field.step} unit={field.unit} placeholder={field.placeholder} name={field.name} disabled={disabled} />;
          case 'checkbox':
            return <Checkbox id={wiring.id} aria-labelledby={wiring.labelId} aria-describedby={wiring['aria-describedby']}
              checked={field.checked} onChange={(checked) => field.onChange(checked)} disabled={disabled} />;
          case 'toggle':
            return <Switch aria-labelledby={wiring.labelId} checked={field.checked} onChange={field.onChange} disabled={disabled} />;
        }
      }}
    </FormField>
  );
}

function TabsView({ leaf }: { leaf: TabsLeaf }) {
  const idPrefix = useId();
  const first = leaf.items.find((t) => !t.disabled)?.id ?? leaf.items[0]?.id ?? '';
  const [internal, setInternal] = useState(first);
  const requested = leaf.value ?? internal;
  const current = leaf.items.some((t) => t.id === requested) ? requested : first;
  return (
    <Marker kind="tabs">
      <Tabs
        items={leaf.items.map(({ id, label, badge, disabled }) => ({ id, label, ...(badge != null ? { badge } : {}), ...(disabled ? { disabled } : {}) }))}
        value={current}
        onValueChange={(id) => { if (leaf.value == null) setInternal(id); leaf.onValueChange?.(id); }}
        idPrefix={idPrefix}
        variant={leaf.variant ?? 'underline'}
        size={leaf.size ?? 'sm'}
        aria-label={leaf.label}
      />
      {leaf.items.map((tab) => (
        <TabPanel key={tab.id} id={tab.id} when={current} idPrefix={idPrefix} className="flex min-w-0 flex-col gap-3 pt-3">
          {renderLeaves(tab.content)}
        </TabPanel>
      ))}
    </Marker>
  );
}

const warned = new Set<string>();

function BuiltinLeaf({ leaf }: { leaf: BuiltinLeafSpec }): ReactNode {
  switch (leaf.kind) {
    case 'button':
      return renderButton(leaf);
    case 'button-group':
      return (
        <Marker kind={leaf.kind}>
          <ToolbarGroup {...(leaf.label ? { 'aria-label': leaf.label } : {})}>
            {leaf.items.map((item, i) => <SpecLeaf key={i} leaf={item} />)}
          </ToolbarGroup>
        </Marker>
      );
    case 'menu': {
      const { kind, trigger, ...props } = leaf;
      return <Marker kind={kind}><DropdownMenu {...props} trigger={trigger} /></Marker>;
    }
    case 'table': {
      const { kind, ...props } = leaf;
      return <Marker kind={kind}><DataTable striped {...props} /></Marker>;
    }
    case 'stats': {
      const { kind, items, ...grid } = leaf;
      return (
        <Marker kind={kind}>
          <KPIGrid {...grid}>{items.map((item, i) => <StatCard key={i} {...item} />)}</KPIGrid>
        </Marker>
      );
    }
    case 'stat-strip': {
      const { kind, ...props } = leaf;
      return <Marker kind={kind}><StatStrip {...props} /></Marker>;
    }
    case 'key-values': {
      const { kind, ...props } = leaf;
      return <Marker kind={kind}><KeyValue {...props} /></Marker>;
    }
    case 'status': {
      const { kind, ...props } = leaf;
      return <Marker kind={kind}><StatusPill {...props} /></Marker>;
    }
    case 'badge': {
      const { kind, ...props } = leaf;
      return <Marker kind={kind}><Badge {...props} /></Marker>;
    }
    case 'text': {
      const { kind, text, ...props } = leaf;
      return <Text {...props} data-spec-leaf={kind}>{text}</Text>;
    }
    case 'meta': {
      const { kind, items, ...props } = leaf;
      return <Marker kind={kind}><MetaLine {...props} items={[...items]} /></Marker>;
    }
    case 'empty': {
      const { kind, description, action, 'data-testid': testId, ...props } = leaf;
      return (
        <Marker kind={kind}>
          <EmptyState {...props} {...(description != null ? { description } : {})}
            {...(action ? { action: renderButton(action) } : {})} {...(testId ? { testId } : {})} />
        </Marker>
      );
    }
    case 'banner': {
      const { kind, message, action, ...props } = leaf;
      return <Marker kind={kind}><Banner {...props} {...(action ? { action: renderButton(action) } : {})}>{message}</Banner></Marker>;
    }
    case 'list': {
      if (leaf.variant === 'grouped') {
        const { kind, variant: _v, ...props } = leaf;
        return <Marker kind={kind}><GroupedList {...props} /></Marker>;
      }
      const { kind, variant: _v, footer, ...props } = leaf;
      return <Marker kind={kind}><ActionRowList {...props} {...(footer ? { footer: renderButton(footer) } : {})} /></Marker>;
    }
    case 'form':
      return (
        <Stack gap="md" data-spec-leaf={leaf.kind}>
          {leaf.fields.map((field, i) => field ? <FormFieldView key={field.id ?? field.label ?? i} field={field} /> : null)}
        </Stack>
      );
    case 'tabs':
      return <TabsView leaf={leaf} />;
    case 'chart': {
      const { kind, type: _t, label, ...props } = leaf;
      return <Marker kind={kind}><TrendSparkline {...props} ariaLabel={label} /></Marker>;
    }
    case 'activity': {
      const { kind, ...props } = leaf;
      return <Marker kind={kind}><WorkActivityList {...props} /></Marker>;
    }
    case 'search': {
      const { kind, ...props } = leaf;
      return <Marker kind={kind}><SearchInput {...props} /></Marker>;
    }
    case 'custom':
      return <Marker kind={leaf.kind} data-page-spec-custom={leaf.reason}>{leaf.render()}</Marker>;
  }
}

function RegisteredLeaf({ leaf }: { leaf: { kind: string } }): ReactNode {
  const Component = useRegisteredLeaf(leaf.kind) as unknown as ((props: Record<string, unknown>) => ReactNode) | undefined;
  if (!Component) {
    if (!warned.has(leaf.kind)) {
      warned.add(leaf.kind);
      console.error(`PageFromSpec: no component for leaf kind "${leaf.kind}". Register it with registerLeafKind or PageSpecProvider.`);
    }
    return null;
  }
  return <Component {...leaf} data-spec-leaf={leaf.kind} />;
}

/** Renders one leaf as its library (or registered) component. */
export function SpecLeaf({ leaf }: { leaf: LeafSpec }): ReactNode {
  return isBuiltinLeafKind(leaf.kind)
    ? <BuiltinLeaf leaf={leaf as BuiltinLeafSpec} />
    : <RegisteredLeaf leaf={leaf} />;
}

/** One leaf as an element, for composing a spec leaf into JSX. */
export function renderLeaf(leaf: LeafSpec, key?: string | number): ReactNode {
  return <SpecLeaf key={key} leaf={leaf} />;
}

/** A leaf list as siblings; `null` when the list renders nothing (so a template's slot stays absent). */
export function renderLeaves(list: LeafList | null | undefined): ReactNode {
  const leaves = (list ?? []).filter((l): l is LeafSpec => !!l);
  if (leaves.length === 0) return null;
  return <>{leaves.map((leaf, i) => <SpecLeaf key={i} leaf={leaf} />)}</>;
}

export interface RenderSectionOptions {
  /** The heading size for sections that do not set one. Default `md`. */
  size?: 'md' | 'sm';
}

/** One section: a `PageSection` when titled, else its leaves in a `Stack` (a `SectionStack` when `divided`). */
export function renderSection(section: SectionSpec, options: RenderSectionOptions = {}, key?: string | number): ReactNode {
  const body = renderLeaves(section.body);
  if (!section.title) {
    return section.divided
      ? <SectionStack key={key} density="compact">{body}</SectionStack>
      : <Stack key={key} gap="md">{body}</Stack>;
  }
  const actions = renderLeaves(section.actions);
  return (
    <PageSection key={key} title={section.title} size={section.size ?? options.size ?? 'md'}
      {...(section.description ? { description: section.description } : {})}
      {...(section.count != null ? { count: section.count } : {})}
      {...(section.empty ? { empty: section.empty } : {})}
      {...(actions != null ? { actions } : {})}
      {...(section.divided ? { divided: true } : {})}
      {...(section.id ? { 'data-testid': `spec-section-${section.id}` } : {})}>
      {body}
    </PageSection>
  );
}

/** Sections in a `SectionStack`, a hairline between each. `null` when there are none. */
export function renderSections(list: SectionList | null | undefined, options: RenderSectionOptions = {}): ReactNode {
  const sections = (list ?? []).filter((s): s is SectionSpec => !!s);
  if (sections.length === 0) return null;
  return (
    <SectionStack>
      {sections.map((section, i) => renderSection(section, options, section.id ?? i))}
    </SectionStack>
  );
}
