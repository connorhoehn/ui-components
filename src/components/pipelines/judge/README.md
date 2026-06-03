# `<JudgmentResultViewer>` — LLM-as-judge result composites

Visualization for `pipeline.judge.*` events produced by the platform-api
JudgeStepHandler (`llm:judge` step type). Mirrors the `vision/` surface
shape so the activity stream can fold both kinds of step output through
one component.

## Surface

| Export                       | Role                                            |
| ---------------------------- | ----------------------------------------------- |
| `<JudgmentResultViewer>`     | Top-level: verdict + criteria + metadata footer |
| `<VerdictPanel>`             | Header card alone (overall score + verdict)     |
| `<CriteriaPanel>`            | Per-criterion rows alone                        |
| `useJudgmentResults(opts)`   | Folds events into records — same shape as `useVisionResults` |
| `<ScoreBarGauge>` (`shared`) | Generic 0..1 gauge — also reusable elsewhere    |

## Wire contract

Subscribes to four signal events (declared in `event-catalog` wave 3):

- `pipeline.judge.started`         (running)
- `pipeline.judge.scored`          (scored — carries the full JudgmentResult)
- `pipeline.judge.failed`          (failed — reason + error + usage/cost)
- `pipeline.judge.budget-exceeded` (skipped — cap hit before the call)

## Usage

```tsx
import {
  JudgmentResultViewer,
  useJudgmentResults,
} from '@connorhoehn/ui-components';

function RunJudgments({ runId }: { runId: string }) {
  const records = useJudgmentResults({ runId });
  return (
    <div>
      {records.map((r) =>
        r.status === 'scored' && r.result ? (
          <JudgmentResultViewer key={r.stepId} result={r.result} />
        ) : null,
      )}
    </div>
  );
}
```

Standalone:

```tsx
<JudgmentResultViewer result={judgmentResultFromYourBackend} showRawText />
```

## Design

- All composites use Tailwind v4 design tokens from `src/styles.css @theme`
  (`text-text-primary`, `bg-surface`, `border-border`, etc.) — no
  hand-coded color literals or inline `style={{...}}` blocks.
- Verdict chips include label prefixes ("PASS · pass", "FAIL · fail")
  alongside the color signal so color-blind users see the same outcome.
- `<ScoreBarGauge>` uses `role="meter"` with `aria-valuenow / -valuemin /
  -valuemax` for SR-driven workflows.
- Failure modes degrade gracefully: missing `confidence`, missing
  `rawModelText`, missing `cacheReadTokens` all render as omitted
  sections rather than broken UI.
