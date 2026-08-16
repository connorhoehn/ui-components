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
    <div className="p-8 max-w-225 mx-auto my-0">
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
        <div className="bg-[#1e293b] rounded-md overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] font-mono text-[13px] leading-[1.6] flex"
        >
          <div className="w-10 py-3 px-2 text-right text-[#64748b] border-r border-[#334155] select-none shrink-0 text-[12px] leading-[1.6]"
          >
            {'1\n2\n3\n4\n5\n6\n7\n8'.split('\n').map((n, i) => (
              <div key={i}>{n}</div>
            ))}
          </div>
          <div className="py-3 px-4 text-border flex-[1] whitespace-pre">
            <div><span className="text-[#93c5fd]">function</span> <span className="text-[#fbbf24]">fibonacci</span>(n) {'{'}</div>
            <div>  <span className="text-[#93c5fd]">if</span> (n {'<='} 1) <span className="text-[#93c5fd]">return</span> n;</div>
            <div>  <span className="text-[#93c5fd]">return</span> fibonacci(n - 1) + fibonacci(n - 2);</div>
            <div>{'}'}</div>
            <div>&nbsp;</div>
            <div><span className="text-[#93c5fd]">const</span> result = fibonacci(10);</div>
            <div>console.<span className="text-[#fbbf24]">log</span>(<span className="text-[#4ade80]">"fib(10) ="</span>, result);</div>
            <div className="text-[#64748b]">// Output: fib(10) = 55</div>
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
        <div className="relative">
          <div className="absolute top-2 right-2 bg-text-secondary text-border text-[10px] font-semibold py-[2px] px-2 rounded uppercase tracking-[0.05em] z-[1]"
          >
            read-only
          </div>
          <div className="bg-[#1e293b] rounded-md overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] font-mono text-[13px] leading-[1.6] flex opacity-85"
          >
            <div className="w-10 py-3 px-2 text-right text-[#64748b] border-r border-[#334155] select-none shrink-0 text-[12px] leading-[1.6]"
            >
              {'1\n2\n3\n4'.split('\n').map((n, i) => (
                <div key={i}>{n}</div>
              ))}
            </div>
            <div className="py-3 px-4 text-border flex-[1] whitespace-pre">
              <div className="text-[#64748b]">// This editor is read-only</div>
              <div><span className="text-[#93c5fd]">const</span> API_URL = <span className="text-[#4ade80]">"https://api.example.com/v2"</span>;</div>
              <div><span className="text-[#93c5fd]">const</span> TIMEOUT = <span className="text-[#fb923c]">5000</span>;</div>
              <div><span className="text-[#93c5fd]">export default</span> {'{ API_URL, TIMEOUT }'};</div>
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
          <div className="flex flex-wrap gap-1 mb-2">
            {['user.name', 'order.id', 'order.delivery_date', 'company.name'].map((v) => (
              <span className="inline-block py-[2px] px-2 text-[11px] font-mono bg-[#eef2ff] text-[#4338ca] border border-[#c7d2fe] rounded cursor-pointer"
                key={v}
              >
                {v}
              </span>
            ))}
          </div>
          <div className="bg-[#1e293b] rounded-md overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] font-mono text-[13px] leading-[1.6] flex"
          >
            <div className="w-10 py-3 px-2 text-right text-[#64748b] border-r border-[#334155] select-none shrink-0 text-[12px] leading-[1.6]"
            >
              {'1\n2\n3\n4\n5\n6'.split('\n').map((n, i) => (
                <div key={i}>{n}</div>
              ))}
            </div>
            <div className="py-3 px-4 text-border flex-[1] whitespace-pre">
              <div>Hello <span className="bg-[#fbbf2433] text-[#fbbf24] py-[1px] px-1 rounded-[3px]">{'{{ user.name }}'}</span>,</div>
              <div>&nbsp;</div>
              <div>Your order #<span className="bg-[#fbbf2433] text-[#fbbf24] py-[1px] px-1 rounded-[3px]">{'{{ order.id }}'}</span> has been shipped.</div>
              <div>Estimated delivery: <span className="bg-[#fbbf2433] text-[#fbbf24] py-[1px] px-1 rounded-[3px]">{'{{ order.delivery_date }}'}</span></div>
              <div>&nbsp;</div>
              <div>Thanks, <span className="bg-[#fbbf2433] text-[#fbbf24] py-[1px] px-1 rounded-[3px]">{'{{ company.name }}'}</span></div>
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
        <div className="flex flex-wrap items-center gap-[6px] bg-surface border border-border rounded-md py-2 px-[10px] min-h-10"
        >
          {['react', 'typescript', 'vite'].map((tag) => (
            <span className="inline-flex items-center gap-1 bg-[#dbeafe] text-[#1e40af] rounded-[999px] py-[3px] px-[10px] text-[12px] font-medium"
              key={tag}
            >
              {tag}
              <span className="cursor-pointer ml-[2px] text-[14px] leading-[1] text-[#3b82f6]"
              >
                &times;
              </span>
            </span>
          ))}
          <input className="border-0 outline-none text-[13px] flex-[1] min-w-30 bg-transparent text-[#64748b]"
            type="text"
            placeholder="Type and press Enter..."
            readOnly
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
        <div className="relative">
          <div className="flex flex-wrap items-center gap-[6px] bg-surface border border-[#3b82f6] rounded-md py-2 px-[10px] min-h-10 shadow-[0_0_0_1px_#3b82f6]"
          >
            {['frontend'].map((tag) => (
              <span className="inline-flex items-center gap-1 bg-[#dbeafe] text-[#1e40af] rounded-[999px] py-[3px] px-[10px] text-[12px] font-medium"
                key={tag}
              >
                {tag}
                <span className="cursor-pointer ml-[2px] text-[14px] leading-[1] text-[#3b82f6]"
                >
                  &times;
                </span>
              </span>
            ))}
            <input className="border-0 outline-none text-[13px] flex-[1] min-w-30 bg-transparent text-[#334155]"
              type="text"
              placeholder="Type or pick a suggestion..."
              readOnly
            />
          </div>
          {/* Suggestions dropdown */}
          <div className="absolute top-[100%] left-0 mt-1 bg-surface border border-border rounded-md shadow-[0_6px_18px_rgba(15,23,42,0.10)] p-2 flex flex-wrap gap-[6px] max-w-80 z-[10]"
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
        <div className="grid grid-cols-[repeat(5,_40px)] gap-[6px]"
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
            <div className={`w-10 h-10 flex items-center justify-center text-[20px] rounded-md cursor-pointer transition-[border-color] ${selected ? 'border-2 border-[#3b82f6] bg-info-bg' : 'border border-border bg-surface'}`}
              key={i}
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
        <div className="max-w-90">
          {/* Search input */}
          <div className="bg-surface border border-[#3b82f6] rounded-md py-2 px-[10px] text-[13px] text-[#334155] shadow-[0_0_0_1px_#3b82f6] mb-1"
          >
            <span className="text-text-tertiary">Search team members...</span>
          </div>
          {/* Dropdown list */}
          <div className="bg-surface border border-border rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden"
          >
            {[
              { initials: 'AJ', name: 'Alice Johnson', email: 'alice@company.com', color: '#7c3aed', active: true },
              { initials: 'BK', name: 'Bob Kim', email: 'bob.kim@company.com', color: '#059669', active: false },
              { initials: 'CS', name: 'Carol Smith', email: 'carol.s@company.com', color: '#dc2626', active: false },
              { initials: 'DM', name: 'David Martinez', email: 'd.martinez@company.com', color: '#2563eb', active: false },
              { initials: 'EW', name: 'Emma Wilson', email: 'emma.w@company.com', color: '#d97706', active: false },
            ].map((user) => (
              <div className={`flex items-center gap-[10px] py-2 px-3 cursor-pointer border-b border-surface-hover ${user.active ? 'bg-surface-hover' : 'bg-transparent'}`}
                key={user.initials}
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
                <div className="flex-[1] min-w-0">
                  <div className="text-[13px] font-medium text-text-primary">
                    {user.name}
                  </div>
                  <div className="text-[11px] text-text-tertiary">
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
