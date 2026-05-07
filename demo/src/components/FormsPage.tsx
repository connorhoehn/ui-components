import { ExampleBlock, PropsTable, PageHeader, useRegisterToc } from '../shared';
import type { TocItem } from '../shared';

const tocItems: TocItem[] = [
  { id: 'code-editor-basic', label: 'CodeEditor Basic', level: 2 },
  { id: 'code-editor-readonly', label: 'CodeEditor Read-Only', level: 2 },
  { id: 'code-editor-templates', label: 'CodeEditor Templates', level: 2 },
  { id: 'tag-editor', label: 'TagEditor', level: 2 },
  { id: 'tag-editor-suggestions', label: 'TagEditor Suggestions', level: 2 },
  { id: 'icon-picker', label: 'IconPicker', level: 2 },
  { id: 'user-picker', label: 'UserPicker', level: 2 },
  { id: 'props-code-editor', label: 'CodeEditor Props', level: 2 },
  { id: 'props-tag-editor', label: 'TagEditor Props', level: 2 },
  { id: 'props-icon-picker', label: 'IconPicker Props', level: 2 },
  { id: 'props-user-picker', label: 'UserPicker Props', level: 2 },
];

export default function FormsPage() {
  useRegisterToc(tocItems);

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: '0 auto' }}>
      <PageHeader
        title="Forms & Inputs"
        description="Specialized form controls for code editing, tagging, icon selection, and user picking. These components handle complex input patterns with built-in validation, suggestions, and keyboard navigation."
        importPath="import { CodeEditor, TagEditor, IconPicker, UserPicker } from '@acme/ui-components'"
      />

      {/* CodeEditor Basic */}
      <ExampleBlock
        id="code-editor-basic"
        title="CodeEditor Basic"
        description="A styled code editing area with line numbers, monospace font, dark theme, and tab-to-indent support. Automatically grows with content."
        code={`import { CodeEditor } from '@acme/ui-components';

const [code, setCode] = useState(\`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}\`);

<CodeEditor
  language="javascript"
  value={code}
  onChange={setCode}
  placeholder="Write some code..."
  lineNumbers
  minLines={5}
/>`}
      >
        <div
          style={{
            background: '#1e293b',
            borderRadius: 6,
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
            fontFamily: "'SF Mono', Menlo, monospace",
            fontSize: 13,
            lineHeight: 1.6,
            display: 'flex',
          }}
        >
          <div
            style={{
              width: 40,
              padding: '12px 8px',
              textAlign: 'right',
              color: '#64748b',
              borderRight: '1px solid #334155',
              userSelect: 'none',
              flexShrink: 0,
              fontSize: 12,
              lineHeight: 1.6,
            }}
          >
            {'1\n2\n3\n4\n5\n6\n7\n8'.split('\n').map((n, i) => (
              <div key={i}>{n}</div>
            ))}
          </div>
          <div style={{ padding: '12px 16px', color: '#e2e8f0', flex: 1, whiteSpace: 'pre' }}>
            <div><span style={{ color: '#93c5fd' }}>function</span> <span style={{ color: '#fbbf24' }}>fibonacci</span>(n) {'{'}</div>
            <div>  <span style={{ color: '#93c5fd' }}>if</span> (n {'<='} 1) <span style={{ color: '#93c5fd' }}>return</span> n;</div>
            <div>  <span style={{ color: '#93c5fd' }}>return</span> fibonacci(n - 1) + fibonacci(n - 2);</div>
            <div>{'}'}</div>
            <div>&nbsp;</div>
            <div><span style={{ color: '#93c5fd' }}>const</span> result = fibonacci(10);</div>
            <div>console.<span style={{ color: '#fbbf24' }}>log</span>(<span style={{ color: '#4ade80' }}>"fib(10) ="</span>, result);</div>
            <div style={{ color: '#64748b' }}>// Output: fib(10) = 55</div>
          </div>
        </div>
      </ExampleBlock>

      {/* CodeEditor Read-Only */}
      <ExampleBlock
        id="code-editor-readonly"
        title="CodeEditor Read-Only"
        description="A read-only code display with a badge indicator. Useful for showing configuration snippets or generated code that users should not modify."
        code={`<CodeEditor
  language="javascript"
  value={configCode}
  onChange={() => {}}
  readOnly
  lineNumbers
  minLines={3}
/>`}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: '#475569',
              color: '#e2e8f0',
              fontSize: 10,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 4,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              zIndex: 1,
            }}
          >
            read-only
          </div>
          <div
            style={{
              background: '#1e293b',
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
              fontFamily: "'SF Mono', Menlo, monospace",
              fontSize: 13,
              lineHeight: 1.6,
              display: 'flex',
              opacity: 0.85,
            }}
          >
            <div
              style={{
                width: 40,
                padding: '12px 8px',
                textAlign: 'right',
                color: '#64748b',
                borderRight: '1px solid #334155',
                userSelect: 'none',
                flexShrink: 0,
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              {'1\n2\n3\n4'.split('\n').map((n, i) => (
                <div key={i}>{n}</div>
              ))}
            </div>
            <div style={{ padding: '12px 16px', color: '#e2e8f0', flex: 1, whiteSpace: 'pre' }}>
              <div style={{ color: '#64748b' }}>// This editor is read-only</div>
              <div><span style={{ color: '#93c5fd' }}>const</span> API_URL = <span style={{ color: '#4ade80' }}>"https://api.example.com/v2"</span>;</div>
              <div><span style={{ color: '#93c5fd' }}>const</span> TIMEOUT = <span style={{ color: '#fb923c' }}>5000</span>;</div>
              <div><span style={{ color: '#93c5fd' }}>export default</span> {'{ API_URL, TIMEOUT }'};</div>
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* CodeEditor with Template Variables */}
      <ExampleBlock
        id="code-editor-templates"
        title="CodeEditor with Template Variables"
        description="Code editor with highlighted template variable placeholders. Variables are rendered as clickable pills above the editor and appear as highlighted spans within the code."
        code={`<CodeEditor
  language="template"
  value={templateCode}
  onChange={setTemplateCode}
  variables={['user.name', 'order.id', 'order.delivery_date', 'company.name']}
  lineNumbers
  minLines={6}
/>`}
      >
        <div>
          {/* Variable pills row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
            {['user.name', 'order.id', 'order.delivery_date', 'company.name'].map((v) => (
              <span
                key={v}
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  fontSize: 11,
                  fontFamily: "'SF Mono', Menlo, monospace",
                  background: '#eef2ff',
                  color: '#4338ca',
                  border: '1px solid #c7d2fe',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                {v}
              </span>
            ))}
          </div>
          <div
            style={{
              background: '#1e293b',
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
              fontFamily: "'SF Mono', Menlo, monospace",
              fontSize: 13,
              lineHeight: 1.6,
              display: 'flex',
            }}
          >
            <div
              style={{
                width: 40,
                padding: '12px 8px',
                textAlign: 'right',
                color: '#64748b',
                borderRight: '1px solid #334155',
                userSelect: 'none',
                flexShrink: 0,
                fontSize: 12,
                lineHeight: 1.6,
              }}
            >
              {'1\n2\n3\n4\n5\n6'.split('\n').map((n, i) => (
                <div key={i}>{n}</div>
              ))}
            </div>
            <div style={{ padding: '12px 16px', color: '#e2e8f0', flex: 1, whiteSpace: 'pre' }}>
              <div>Hello <span style={{ background: '#fbbf2433', color: '#fbbf24', padding: '1px 4px', borderRadius: 3 }}>{'{{ user.name }}'}</span>,</div>
              <div>&nbsp;</div>
              <div>Your order #<span style={{ background: '#fbbf2433', color: '#fbbf24', padding: '1px 4px', borderRadius: 3 }}>{'{{ order.id }}'}</span> has been shipped.</div>
              <div>Estimated delivery: <span style={{ background: '#fbbf2433', color: '#fbbf24', padding: '1px 4px', borderRadius: 3 }}>{'{{ order.delivery_date }}'}</span></div>
              <div>&nbsp;</div>
              <div>Thanks, <span style={{ background: '#fbbf2433', color: '#fbbf24', padding: '1px 4px', borderRadius: 3 }}>{'{{ company.name }}'}</span></div>
            </div>
          </div>
        </div>
      </ExampleBlock>

      {/* TagEditor */}
      <ExampleBlock
        id="tag-editor"
        title="TagEditor"
        description="An input area with existing tags shown as removable chips. Press Enter to add a new tag, click the X to remove one. Backspace removes the last tag when the input is empty."
        code={`import { TagEditor } from '@acme/ui-components';

const [tags, setTags] = useState(['react', 'typescript', 'vite']);

<TagEditor
  tags={tags}
  onAdd={(tag) => setTags([...tags, tag])}
  onRemove={(tag) => setTags(tags.filter(t => t !== tag))}
  placeholder="Type and press Enter..."
  maxTags={10}
/>`}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 6,
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 6,
            padding: '8px 10px',
            minHeight: 40,
          }}
        >
          {['react', 'typescript', 'vite'].map((tag) => (
            <span
              key={tag}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: '#dbeafe',
                color: '#1e40af',
                borderRadius: 999,
                padding: '3px 10px',
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {tag}
              <span
                style={{
                  cursor: 'pointer',
                  marginLeft: 2,
                  fontSize: 14,
                  lineHeight: 1,
                  color: '#3b82f6',
                }}
              >
                &times;
              </span>
            </span>
          ))}
          <input
            type="text"
            placeholder="Type and press Enter..."
            readOnly
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 13,
              flex: 1,
              minWidth: 120,
              background: 'transparent',
              color: '#64748b',
            }}
          />
        </div>
      </ExampleBlock>

      {/* TagEditor with Suggestions */}
      <ExampleBlock
        id="tag-editor-suggestions"
        title="TagEditor with Suggestions"
        description="TagEditor with an autocomplete dropdown. Suggestions filter as the user types and exclude already-selected tags."
        code={`<TagEditor
  tags={tags}
  onAdd={(tag) => setTags([...tags, tag])}
  onRemove={(tag) => setTags(tags.filter(t => t !== tag))}
  suggestions={['frontend', 'backend', 'devops', 'design', 'testing', 'mobile']}
  placeholder="Type or pick a suggestion..."
/>`}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 6,
              background: '#ffffff',
              border: '1px solid #3b82f6',
              borderRadius: 6,
              padding: '8px 10px',
              minHeight: 40,
              boxShadow: '0 0 0 1px #3b82f6',
            }}
          >
            {['frontend'].map((tag) => (
              <span
                key={tag}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  background: '#dbeafe',
                  color: '#1e40af',
                  borderRadius: 999,
                  padding: '3px 10px',
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {tag}
                <span
                  style={{
                    cursor: 'pointer',
                    marginLeft: 2,
                    fontSize: 14,
                    lineHeight: 1,
                    color: '#3b82f6',
                  }}
                >
                  &times;
                </span>
              </span>
            ))}
            <input
              type="text"
              placeholder="Type or pick a suggestion..."
              readOnly
              style={{
                border: 'none',
                outline: 'none',
                fontSize: 13,
                flex: 1,
                minWidth: 120,
                background: 'transparent',
                color: '#334155',
              }}
            />
          </div>
          {/* Suggestions dropdown */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: 4,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 6,
              boxShadow: '0 6px 18px rgba(15,23,42,0.10)',
              padding: 8,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              maxWidth: 320,
              zIndex: 10,
            }}
          >
            {['backend', 'devops', 'design', 'testing', 'mobile', 'cloud'].map((s) => (
              <span
                key={s}
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  fontSize: 12,
                  background: '#f8fafc',
                  color: '#475569',
                  border: '1px dashed #cbd5e1',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                + {s}
              </span>
            ))}
          </div>
        </div>
      </ExampleBlock>

      {/* IconPicker */}
      <ExampleBlock
        id="icon-picker"
        title="IconPicker"
        description="A grid-based icon selector with curated options. One icon is highlighted as the current selection. Supports custom emoji entry."
        code={`import { IconPicker } from '@acme/ui-components';

const [icon, setIcon] = useState('rocket');

<IconPicker
  value={icon}
  onChange={setIcon}
  icons={defaultIcons}
  columns={5}
/>`}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 40px)',
            gap: 6,
          }}
        >
          {[
            { emoji: '\u{1F680}', selected: true },
            { emoji: '\u{1F3AF}', selected: false },
            { emoji: '\u{1F4CA}', selected: false },
            { emoji: '\u{2699}\u{FE0F}', selected: false },
            { emoji: '\u{1F50D}', selected: false },
            { emoji: '\u{1F4DD}', selected: false },
            { emoji: '\u{26A1}', selected: false },
            { emoji: '\u{1F9E0}', selected: false },
            { emoji: '\u{1F4E8}', selected: false },
            { emoji: '\u{1F512}', selected: false },
            { emoji: '\u{1F517}', selected: false },
            { emoji: '\u{1F4A1}', selected: false },
            { emoji: '\u{1F9EA}', selected: false },
            { emoji: '\u{1F30D}', selected: false },
            { emoji: '\u{1F4C1}', selected: false },
            { emoji: '\u{1F514}', selected: false },
            { emoji: '\u{1F6E1}\u{FE0F}', selected: false },
            { emoji: '\u{1F5FA}', selected: false },
            { emoji: '\u{1F4CB}', selected: false },
            { emoji: '\u{1F527}', selected: false },
          ].map(({ emoji, selected }, i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                borderRadius: 6,
                border: selected ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                background: selected ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </ExampleBlock>

      {/* UserPicker */}
      <ExampleBlock
        id="user-picker"
        title="UserPicker"
        description="A searchable dropdown for selecting users. Displays avatars with initials, full names, and email addresses. Supports multi-select and keyboard navigation."
        code={`import { UserPicker } from '@acme/ui-components';

const [selected, setSelected] = useState<string[]>([]);

<UserPicker
  users={teamMembers}
  value={selected}
  onChange={setSelected}
  multiple
  searchable
  placeholder="Search team members..."
/>`}
      >
        <div style={{ maxWidth: 360 }}>
          {/* Search input */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #3b82f6',
              borderRadius: 6,
              padding: '8px 10px',
              fontSize: 13,
              color: '#334155',
              boxShadow: '0 0 0 1px #3b82f6',
              marginBottom: 4,
            }}
          >
            <span style={{ color: '#94a3b8' }}>Search team members...</span>
          </div>
          {/* Dropdown list */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 6,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}
          >
            {[
              { initials: 'AJ', name: 'Alice Johnson', email: 'alice@company.com', color: '#7c3aed', active: true },
              { initials: 'BK', name: 'Bob Kim', email: 'bob.kim@company.com', color: '#059669', active: false },
              { initials: 'CS', name: 'Carol Smith', email: 'carol.s@company.com', color: '#dc2626', active: false },
              { initials: 'DM', name: 'David Martinez', email: 'd.martinez@company.com', color: '#2563eb', active: false },
              { initials: 'EW', name: 'Emma Wilson', email: 'emma.w@company.com', color: '#d97706', active: false },
            ].map((user) => (
              <div
                key={user.initials}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  background: user.active ? '#f1f5f9' : 'transparent',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: user.color,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {user.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#0f172a' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>
                    {user.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ExampleBlock>

      {/* Props Tables */}
      <div id="props-code-editor">
        <PropsTable
          componentName="CodeEditor"
          props={[
            { name: 'language', type: "'javascript' | 'jsonpath' | 'template' | 'plain'", default: "'plain'", description: 'Syntax language hint for highlighting and editor behavior' },
            { name: 'value', type: 'string', required: true, description: 'The current code content' },
            { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called when the user edits the code' },
            { name: 'readOnly', type: 'boolean', default: 'false', description: 'Disables editing and shows a read-only badge' },
            { name: 'placeholder', type: 'string', description: 'Placeholder text shown when the editor is empty' },
            { name: 'lineNumbers', type: 'boolean', default: 'true', description: 'Whether to display the line number gutter' },
            { name: 'theme', type: "'dark' | 'light'", default: "'dark'", description: 'Color theme for the editor background and syntax' },
          ]}
        />
      </div>

      <div id="props-tag-editor">
        <PropsTable
          componentName="TagEditor"
          props={[
            { name: 'tags', type: 'string[]', required: true, description: 'Array of current tag values' },
            { name: 'onAdd', type: '(tag: string) => void', required: true, description: 'Called when a new tag is added via Enter or suggestion click' },
            { name: 'onRemove', type: '(tag: string) => void', required: true, description: 'Called when a tag chip is dismissed' },
            { name: 'suggestions', type: 'string[]', description: 'Optional list of autocomplete suggestions' },
            { name: 'placeholder', type: 'string', default: "'add tag...'", description: 'Placeholder for the input field' },
            { name: 'maxTags', type: 'number', description: 'Maximum number of tags allowed' },
          ]}
        />
      </div>

      <div id="props-icon-picker">
        <PropsTable
          componentName="IconPicker"
          props={[
            { name: 'value', type: 'string', required: true, description: 'Currently selected icon (emoji string)' },
            { name: 'onChange', type: '(icon: string) => void', required: true, description: 'Called when a new icon is selected' },
            { name: 'icons', type: 'string[]', description: 'Array of emoji options to display in the grid' },
            { name: 'columns', type: 'number', default: '8', description: 'Number of columns in the icon grid layout' },
          ]}
        />
      </div>

      <div id="props-user-picker">
        <PropsTable
          componentName="UserPicker"
          props={[
            { name: 'users', type: 'User[]', required: true, description: 'Array of user objects with id, name, email, and avatar' },
            { name: 'value', type: 'string | string[]', required: true, description: 'Selected user ID(s)' },
            { name: 'onChange', type: '(value: string | string[]) => void', required: true, description: 'Called when selection changes' },
            { name: 'multiple', type: 'boolean', default: 'false', description: 'Enable multi-select mode' },
            { name: 'searchable', type: 'boolean', default: 'true', description: 'Show a search input for filtering users' },
            { name: 'placeholder', type: 'string', default: "'Search users...'", description: 'Placeholder text for the search input' },
          ]}
        />
      </div>
    </div>
  );
}
