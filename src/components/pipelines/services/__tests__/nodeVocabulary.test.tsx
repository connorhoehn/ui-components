// The vendor-neutrality contract.
//
// Which backend stands behind a node type is a property of the HOST's
// deployment, not of this library. Two things follow, and both are asserted
// here because both are easy to regress by "just" writing the vendor's name
// into a label:
//
//   1. Out of the box, no config panel names a vendor or a product.
//   2. A host that IS running a specific backend can supply its own wording
//      through `nodeVocabulary` and get the vendor-accurate UI it wants.

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  PipelineEditorServicesProvider,
  type PipelineEditorServices,
} from '../PipelineEditorServicesContext';
import KnowledgeBaseConfig from '../../nodes/knowledge-base/KnowledgeBaseConfig';
import GraphQueryConfig from '../../nodes/graph-query/GraphQueryConfig';
import MemoryConfig from '../../nodes/memory/MemoryConfig';
import type {
  KnowledgeBaseNodeData,
  GraphQueryNodeData,
  MemoryNodeData,
} from '../../../../types/pipeline';

const kb: KnowledgeBaseNodeData = {
  type: 'knowledge-base',
  knowledgeBaseId: 'kb-1',
  queryTemplate: 'q',
  topK: 5,
};

const gq: GraphQueryNodeData = {
  type: 'graph-query',
  graphId: 'g1',
  query: 'MATCH (n) RETURN n',
};

const mem: MemoryNodeData = {
  type: 'memory',
  mode: 'read',
  scope: 'session',
  namespace: 'ns',
  keyExpression: 'k',
};

const withServices = (
  services: PipelineEditorServices,
  ui: React.ReactNode,
) =>
  render(
    <PipelineEditorServicesProvider services={services}>
      {ui}
    </PipelineEditorServicesProvider>,
  );

const noop = () => '';

describe('vendor neutrality', () => {
  const VENDOR_TERMS = [
    'Bedrock', 'Neptune', 'AgentCore', 'DynamoDB', 'openCypher',
    'Titan', 'Amazon', 'AWS',
  ];

  const PANELS: Array<[string, string]> = [
    ['knowledge-base/KnowledgeBaseConfig.tsx', 'knowledge base'],
    ['graph-query/GraphQueryConfig.tsx', 'graph query'],
    ['memory/MemoryConfig.tsx', 'memory'],
  ];

  it.each(PANELS)('%s names no vendor in its user-visible copy', (file) => {
    const source = readFileSync(
      join(__dirname, '..', '..', 'nodes', file),
      'utf8',
    );
    // Strip comments — the explanation of WHY the seam exists is allowed to
    // name an example vendor; the rendered UI is not.
    const code = source
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split('\n')
      .filter((line) => !line.trim().startsWith('//'))
      .join('\n');

    for (const term of VENDOR_TERMS) {
      expect(code).not.toContain(term);
    }
  });

  it('renders neutral copy when the host declares no vocabulary', () => {
    withServices(
      { getImageUrl: noop },
      <KnowledgeBaseConfig data={kb} onChange={vi.fn()} />,
    );
    expect(screen.getByText('Knowledge base ID')).toBeInTheDocument();
    expect(screen.getByText('The knowledge base to retrieve from.')).toBeInTheDocument();
  });

  it('renders neutral copy with no services provider at all', () => {
    // Panels must stay renderable in a test, a story, or a standalone view.
    render(<GraphQueryConfig data={gq} onChange={vi.fn()} />);
    expect(screen.getByText('Graph query')).toBeInTheDocument();
  });
});

describe('nodeVocabulary host override', () => {
  it('lets a host relabel a field', () => {
    withServices(
      {
        getImageUrl: noop,
        nodeVocabulary: {
          'knowledge-base': { labels: { knowledgeBaseId: 'Bedrock KB ID' } },
        },
      },
      <KnowledgeBaseConfig data={kb} onChange={vi.fn()} />,
    );
    expect(screen.getByText('Bedrock KB ID')).toBeInTheDocument();
    expect(screen.queryByText('Knowledge base ID')).toBeNull();
  });

  it('lets a host replace help text', () => {
    withServices(
      {
        getImageUrl: noop,
        nodeVocabulary: {
          'graph-query': { help: { graphId: 'The Neptune cluster to query.' } },
        },
      },
      <GraphQueryConfig data={gq} onChange={vi.fn()} />,
    );
    expect(screen.getByText('The Neptune cluster to query.')).toBeInTheDocument();
  });

  it('lets a host replace a placeholder', () => {
    withServices(
      {
        getImageUrl: noop,
        nodeVocabulary: {
          'graph-query': { placeholders: { graphId: 'neptune-prod' } },
        },
      },
      <GraphQueryConfig data={gq} onChange={vi.fn()} />,
    );
    expect(screen.getByLabelText('Graph ID')).toHaveAttribute(
      'placeholder',
      'neptune-prod',
    );
  });

  it('falls back per field, not per node type', () => {
    // Overriding one field must not blank out its neighbours.
    withServices(
      {
        getImageUrl: noop,
        nodeVocabulary: { 'knowledge-base': { labels: { topK: 'Passages' } } },
      },
      <KnowledgeBaseConfig data={kb} onChange={vi.fn()} />,
    );
    expect(screen.getByText('Passages')).toBeInTheDocument();
    expect(screen.getByText('Knowledge base ID')).toBeInTheDocument();
  });

  it('ignores vocabulary aimed at a different node type', () => {
    withServices(
      {
        getImageUrl: noop,
        nodeVocabulary: { 'graph-query': { labels: { graphId: 'WRONG' } } },
      },
      <MemoryConfig data={mem} onChange={vi.fn()} />,
    );
    expect(screen.queryByText('WRONG')).toBeNull();
    expect(screen.getByText('Namespace')).toBeInTheDocument();
  });
});
