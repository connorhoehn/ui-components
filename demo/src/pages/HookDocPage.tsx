import { Link, useParams } from 'react-router';
import { EmptyState } from '@connorhoehnslalom/ui-components/shared';
import { HookDoc } from '../hooks-registry/HookDoc';
import {
  getHookDoc,
  hookDocs,
  HOOK_GROUP_LABEL,
  type HookGroup,
} from '../hooks-registry/hook-docs';

const LEGACY_CATEGORY_TO_GROUP: Record<string, HookGroup> = {
  connection: 'connection',
  ui: 'ui',
  documents: 'documents',
  collaboration: 'realtime',
};

function HookGroupOverview({ group }: { group: HookGroup }) {
  const groupDocs = hookDocs.filter((d) => d.group === group);
  return (
    <article className="flex flex-col gap-6 max-w-3xl">
      <header className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Hook group
        </span>
        <h1 className="text-2xl font-bold text-slate-900 m-0">
          {HOOK_GROUP_LABEL[group]} hooks
        </h1>
        <p className="text-sm text-slate-600 m-0">
          {groupDocs.length} hook{groupDocs.length === 1 ? '' : 's'} in this group.
        </p>
      </header>
      <ul className="flex flex-col gap-3 m-0 p-0 list-none">
        {groupDocs.map((doc) => (
          <li
            key={doc.name}
            className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 hover:shadow-sm transition-all"
          >
            <Link to={`/hooks/${doc.name}`} className="no-underline block">
              <h3 className="text-base font-semibold text-slate-900 m-0 font-mono">
                {doc.name}
              </h3>
              <p className="text-sm text-slate-600 m-0 mt-1">{doc.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function HookDocPage() {
  const { hookName } = useParams<{ hookName: string }>();
  if (!hookName) return null;

  const doc = getHookDoc(hookName);
  if (doc) return <HookDoc doc={doc} />;

  const legacyGroup = LEGACY_CATEGORY_TO_GROUP[hookName];
  if (legacyGroup) return <HookGroupOverview group={legacyGroup} />;

  return (
    <div className="max-w-2xl">
      <EmptyState
        title={`No docs for "${hookName}" yet`}
        description="This hook isn't in the documentation registry. Browse the full hooks index below."
        actions={[{ label: 'Hooks index', href: '/hooks', variant: 'primary' }]}
      />
    </div>
  );
}
