import type { Meta, StoryObj } from '@storybook/react-vite';
import { DiffViewer } from './DiffViewer';

const SAMPLE_DIFF = `diff --git a/src/alerts/dedup.ts b/src/alerts/dedup.ts
index 3f1a2b4..9c8d7e6 100644
--- a/src/alerts/dedup.ts
+++ b/src/alerts/dedup.ts
@@ -12,9 +12,12 @@ export interface AlertGroup {
 export function groupKey(alert: Alert): string {
-  return alert.name;
+  // Collapse per team, not per fleet: a storm on a shared dependency is
+  // handled by the inhibition rule, not by hiding real per-team pages.
+  return \`\${alert.name}:\${alert.namespace}\`;
 }
 
 export function dedupe(alerts: Alert[]): AlertGroup[] {
   const groups = new Map<string, Alert[]>();
+  const seen = new Set<string>();
   for (const a of alerts) {
     const key = groupKey(a);
@@ -30,6 +33,7 @@ export function dedupe(alerts: Alert[]): AlertGroup[] {
   return [...groups.entries()].map(([key, list]) => ({
     key,
     count: list.length,
+    namespaces: [...new Set(list.map((a) => a.namespace))],
   }));
 }
diff --git a/src/alerts/dedup.test.ts b/src/alerts/dedup.test.ts
new file mode 100644
index 0000000..1a2b3c4
--- /dev/null
+++ b/src/alerts/dedup.test.ts
@@ -0,0 +1,9 @@
+import { groupKey } from './dedup';
+
+describe('groupKey', () => {
+  it('separates namespaces', () => {
+    expect(groupKey({ name: 'HighErrorRate', namespace: 'payments' }))
+      .not.toBe(groupKey({ name: 'HighErrorRate', namespace: 'search' }));
+  });
+});
+
`;

const meta = {
  title: 'Shared/DiffViewer',
  component: DiffViewer,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DiffViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAnnotations: Story = {
  args: {
    diff: SAMPLE_DIFF,
    annotations: [
      { file: 'src/alerts/dedup.ts', line: 16, severity: 'warning', note: 'Template-literal key means a namespace containing ":" collides — consider a tuple key or an escape.', author: 'reviewer · nova-pro' },
      { file: 'src/alerts/dedup.ts', severity: 'info', note: 'The unused `seen` set looks like a leftover from an earlier approach.', author: 'reviewer · nova-pro' },
      { file: 'src/alerts/dedup.test.ts', line: 5, severity: 'info', note: 'Good: pins the collapse-per-namespace decision.', author: 'reviewer · nova-pro' },
    ],
  },
};

export const Plain: Story = {
  args: { diff: SAMPLE_DIFF },
};

export const Collapsed: Story = {
  args: { diff: SAMPLE_DIFF, defaultCollapsed: true },
};
