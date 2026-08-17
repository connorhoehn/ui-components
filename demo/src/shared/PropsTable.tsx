interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  componentName: string;
  props: PropDef[];
}

const TH = 'text-left px-3.5 py-2.5 bg-surface-hover font-semibold border-b border-border text-text-primary';
const TD_BASE = 'px-3.5 py-2.5 border-b border-border';
const TD_NAME = `${TD_BASE} font-mono font-bold`;
const TD_TYPE = `${TD_BASE} font-mono text-accent-fg`;
const TD_DEFAULT = `${TD_BASE} font-mono text-neutral`;
const TD_DESC = `${TD_BASE} text-text-primary`;

export function PropsTable({ componentName, props }: PropsTableProps) {
  return (
    <div className="mb-8 w-full overflow-x-auto">
      <h3 className="text-lg font-semibold mb-3 text-text-primary">
        {componentName} Props
      </h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className={TH}>Name</th>
            <th className={TH}>Type</th>
            <th className={TH}>Default</th>
            <th className={TH}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr key={prop.name} className={i % 2 === 0 ? 'bg-white' : 'bg-surface-panel'}>
              <td className={TD_NAME}>
                {prop.name}
                {prop.required && (
                  <span className="text-danger-fg ml-1">*</span>
                )}
              </td>
              <td className={TD_TYPE}>{prop.type}</td>
              <td className={TD_DEFAULT}>{prop.default ?? '-'}</td>
              <td className={TD_DESC}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
