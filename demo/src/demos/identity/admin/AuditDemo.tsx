import { useState } from 'react';
import { AuditPage } from '@connorhoehn/ui-components/identity';
import { mockAuditRecords } from '../mock-data';

export default function AuditDemo() {
  const [records, setRecords] = useState(mockAuditRecords);

  return (
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
  );
}
