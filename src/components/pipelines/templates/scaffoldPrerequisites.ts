import type { DocumentTypePrerequisite } from './index';

const API_BASE = '/api';

interface ScaffoldResult {
  createdTypes: string[];
  errors: string[];
}

export async function scaffoldPrerequisites(
  prerequisites: { documentTypes?: DocumentTypePrerequisite[] } | undefined,
): Promise<ScaffoldResult> {
  const result: ScaffoldResult = { createdTypes: [], errors: [] };
  if (!prerequisites?.documentTypes?.length) return result;

  for (const typeDef of prerequisites.documentTypes) {
    try {
      const existing = await findExistingType(typeDef.name);
      if (existing) {
        result.createdTypes.push(existing.typeId);
        continue;
      }

      const created = await createDocumentType(typeDef);
      result.createdTypes.push(created.typeId);
    } catch (err) {
      result.errors.push(
        `Failed to scaffold "${typeDef.name}": ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  return result;
}

async function findExistingType(name: string): Promise<{ typeId: string } | null> {
  try {
    const res = await fetch(`${API_BASE}/document-types`, { credentials: 'same-origin' });
    if (!res.ok) return null;
    const data = await res.json() as { items?: Array<{ typeId: string; name: string }> };
    const match = data.items?.find(
      (t) => t.name.toLowerCase() === name.toLowerCase(),
    );
    return match ? { typeId: match.typeId } : null;
  } catch {
    return null;
  }
}

async function createDocumentType(
  typeDef: DocumentTypePrerequisite,
): Promise<{ typeId: string }> {
  const fields = typeDef.fields.map((f, i) => ({
    fieldId: crypto.randomUUID(),
    name: f.name,
    fieldType: f.fieldType,
    widget: defaultWidget(f.fieldType),
    cardinality: 1,
    required: f.required ?? false,
    helpText: '',
    options: f.options,
    order: i,
  }));

  const res = await fetch(`${API_BASE}/document-types`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({
      name: typeDef.name,
      description: `Auto-created for pipeline template`,
      icon: typeDef.icon,
      fields,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const data = await res.json() as { typeId: string };
  return data;
}

function defaultWidget(fieldType: string): string {
  switch (fieldType) {
    case 'long_text': return 'textarea';
    case 'number': return 'number_input';
    case 'date': return 'date_picker';
    case 'boolean': return 'checkbox';
    case 'enum': return 'select';
    default: return 'text_field';
  }
}
