import { useState } from 'react';
import { PageHeader, ExampleBlock } from '../../../shared';
import { AuditPage } from '@connorhoehnslalom/ui-components/identity';
import { mockAuditRecords } from '../mock-data';

export default function AuditDemo() {
  const [records, setRecords] = useState(mockAuditRecords);

  return (
    <div>
      <PageHeader
        title="Audit Log"
        description="Searchable, filterable audit trail for identity operations. Displays timestamped events with actor, action type, and target details. Supports event replay."
        importPath="import { AuditPage } from '@connorhoehnslalom/ui-components/identity'"
      />

      <ExampleBlock
        id="audit-log"
        title="Default"
        description="Audit log with filter controls and event table."
        code={`<AuditPage
  records={auditRecords}
  totalRecords={records.length}
  onQuery={async (params) => { ... }}
  onViewEntity={(type, id) => { ... }}
  onReplay={async (entityId, atTime) => { ... }}
/>`}
      >
        <AuditPage
          records={records}
          totalRecords={records.length}
          onQuery={async (params) => {
            await new Promise((r) => setTimeout(r, 400));
            let filtered = [...mockAuditRecords];
            if (params.entityType) {
              filtered = filtered.filter((r) => r.entityType === params.entityType);
            }
            if (params.entityId) {
              filtered = filtered.filter((r) => r.entityId.includes(params.entityId!));
            }
            setRecords(filtered);
          }}
          onViewEntity={(type, id) => console.log('[AuditDemo] View entity:', type, id)}
          onReplay={async (entityId, atTime) => {
            await new Promise((r) => setTimeout(r, 600));
            return { entityId, snapshot: { status: 'CONFIRMED', email: 'example@test.com' }, atTime };
          }}
        />
      </ExampleBlock>
    </div>
  );
}
