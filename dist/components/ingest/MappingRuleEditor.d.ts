import type { MappingRule } from '../../types/ingest';
export interface MappingRuleEditorProps {
    rules: MappingRule[];
    onChange: (rules: MappingRule[]) => void;
    /**
     * Render the rule table without any mutating controls. Additive.
     *
     * A caller that has nowhere to put an edit — `SourceDetailPage` outside its
     * edit mode passes `onChange={() => {}}` — still got the full Edit / Delete /
     * reorder / Add Rule toolbar. Every one of those calls `onChange`, so the
     * operator could open a rule, retype its target type, press Save, and watch
     * the row snap back to its old value with no error and no explanation. The
     * preview box stays: it is a read-only dry run and is useful here.
     */
    readOnly?: boolean;
}
export default function MappingRuleEditor({ rules, onChange, readOnly }: MappingRuleEditorProps): import("react").JSX.Element;
//# sourceMappingURL=MappingRuleEditor.d.ts.map