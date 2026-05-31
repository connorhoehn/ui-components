import { buildNavCommands } from '../build-nav-commands';
import type { NavigationTree } from '../types';

const tree: NavigationTree = [
  {
    id: 'get-started',
    label: 'Get Started',
    basePath: '/get-started',
    groups: [
      {
        id: 'gs-main',
        label: '',
        items: [
          { id: 'introduction', label: 'Introduction', path: '/get-started/introduction' },
        ],
      },
    ],
  },
  {
    id: 'foundations',
    label: 'Foundations',
    basePath: '/components',
    groups: [
      {
        id: 'foundations-buttons',
        label: 'Primitives',
        items: [
          { id: 'buttons', label: 'Buttons', path: '/components/buttons' },
        ],
      },
    ],
  },
  {
    id: 'reference',
    label: 'Reference',
    basePath: '/hooks',
    groups: [
      {
        id: 'hooks-core',
        label: 'Hooks — Core',
        path: '/hooks',
        items: [
          { id: 'use-websocket', label: 'useWebSocket', path: '/hooks/useWebSocket' },
        ],
      },
    ],
  },
];

describe('buildNavCommands', () => {
  it('produces one command per leaf nav item plus one for each group with a direct path', () => {
    const commands = buildNavCommands(tree, () => undefined);

    // 3 items + 1 group-with-path = 4 commands.
    expect(commands).toHaveLength(4);
    expect(commands.map((c) => c.id)).toEqual([
      'nav-get-started-gs-main-introduction',
      'nav-foundations-foundations-buttons-buttons',
      'nav-reference-hooks-core',
      'nav-reference-hooks-core-use-websocket',
    ]);
  });

  it('navigates to the item path when the command is run', () => {
    const navigate = vi.fn();
    const [introCmd, , , wsCmd] = buildNavCommands(tree, navigate);

    introCmd.run();
    expect(navigate).toHaveBeenLastCalledWith('/get-started/introduction');

    wsCmd.run();
    expect(navigate).toHaveBeenLastCalledWith('/hooks/useWebSocket');
  });

  it('groups commands by the section label', () => {
    const commands = buildNavCommands(tree, () => undefined);
    expect(commands.map((c) => c.group)).toEqual([
      'Get Started',
      'Foundations',
      'Reference',
      'Reference',
    ]);
  });

  it('derives keywords from section + group + item identifiers', () => {
    const [, buttonsCmd] = buildNavCommands(tree, () => undefined);
    expect(buttonsCmd.keywords).toContain('Foundations');
    expect(buttonsCmd.keywords).toContain('Primitives');
    expect(buttonsCmd.keywords).toContain('Buttons');
    // Strip the leading slash so a query like "components/buttons" matches.
    expect(buttonsCmd.keywords).toContain('components/buttons');
  });

  it('skips falsy keywords (empty group labels, etc.)', () => {
    const [introCmd] = buildNavCommands(tree, () => undefined);
    // 'gs-main' has label: '' — that empty string should not leak in.
    expect(introCmd.keywords).not.toContain('');
    expect(introCmd.keywords?.every((k) => k.length > 0)).toBe(true);
  });

  it('builds a stable hint of "Section · Group" (or just Section when group has no label)', () => {
    const [introCmd, buttonsCmd] = buildNavCommands(tree, () => undefined);
    expect(introCmd.hint).toBe('Get Started');
    expect(buttonsCmd.hint).toBe('Foundations · Primitives');
  });
});
