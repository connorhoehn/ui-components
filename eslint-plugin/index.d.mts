// Types for `@connorhoehn/ui-components/eslint-plugin`, so an
// `eslint.config.ts` can import it without an ambient declaration. Kept
// structural on purpose: naming `eslint`'s own types would make this file fail
// to resolve for consumers who type-check without eslint's types installed.

export interface UiComponentsRule {
  meta: Record<string, unknown>;
  create(context: unknown): Record<string, (node: unknown) => void>;
}

export interface UiComponentsFlatConfig {
  name: string;
  files: string[];
  ignores: string[];
  plugins: Record<string, unknown>;
  languageOptions?: Record<string, unknown>;
  rules: Record<string, 'error' | 'warn' | 'off'>;
}

export type UiComponentsRuleName =
  | 'no-raw-controls'
  | 'no-inline-style'
  | 'no-arbitrary-token-values'
  | 'button-explicit-variant'
  | 'no-hand-rolled-separators';

declare const plugin: {
  meta: { name: string; version: string };
  rules: Record<UiComponentsRuleName, UiComponentsRule>;
  configs: { recommended: UiComponentsFlatConfig[] };
};

export declare const rules: Record<UiComponentsRuleName, UiComponentsRule>;
export declare const COMPONENT_FILES: string[];
export declare const PAGE_FILES: string[];
export declare const TEST_FILES: string[];
export default plugin;
