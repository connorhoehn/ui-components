// The parser is the load-bearing half of DiffViewer: line numbers, file
// status, and rename detection must match what git actually emits, or every
// pinned annotation lands on the wrong line.

import { describe, it, expect } from 'vitest';
import { parseUnifiedDiff } from '../DiffViewer';

const DIFF = `diff --git a/src/a.ts b/src/a.ts
index 111..222 100644
--- a/src/a.ts
+++ b/src/a.ts
@@ -10,4 +10,5 @@ header
 ctx1
-removed
+added one
+added two
 ctx2
diff --git a/old/name.ts b/new/name.ts
similarity index 90%
rename from old/name.ts
rename to new/name.ts
index 333..444 100644
--- a/old/name.ts
+++ b/new/name.ts
@@ -1,2 +1,2 @@
-x
+y
diff --git a/fresh.ts b/fresh.ts
new file mode 100644
index 000..555
--- /dev/null
+++ b/fresh.ts
@@ -0,0 +1,2 @@
+line1
+line2
`;

describe('parseUnifiedDiff', () => {
  const files = parseUnifiedDiff(DIFF);

  it('splits files and reads status', () => {
    expect(files.map((f) => f.path)).toEqual(['src/a.ts', 'new/name.ts', 'fresh.ts']);
    expect(files[1]!.status).toBe('renamed');
    expect(files[1]!.oldPath).toBe('old/name.ts');
    expect(files[2]!.status).toBe('added');
  });

  it('numbers both sides from the hunk header', () => {
    const a = files[0]!;
    const byText = Object.fromEntries(a.lines.map((l) => [l.text, l]));
    expect(byText['ctx1']).toMatchObject({ oldNo: 10, newNo: 10 });
    expect(byText['removed']).toMatchObject({ oldNo: 11, newNo: null });
    expect(byText['added one']).toMatchObject({ oldNo: null, newNo: 11 });
    expect(byText['added two']).toMatchObject({ oldNo: null, newNo: 12 });
    expect(byText['ctx2']).toMatchObject({ oldNo: 12, newNo: 13 });
  });

  it('counts adds and dels per file', () => {
    expect(files[0]).toMatchObject({ adds: 2, dels: 1 });
    expect(files[2]).toMatchObject({ adds: 2, dels: 0 });
  });
});
