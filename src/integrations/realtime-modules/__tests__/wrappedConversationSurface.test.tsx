import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import {
  WrappedConversationSurface,
  capabilityNamesFor,
  CONVERSATION_CAPABILITY_NAMES,
} from '../WrappedConversationSurface';

afterEach(cleanup);

const tabNames = () => screen.queryAllByRole('tab').map((t) => t.textContent);

const allProvisioned = Object.fromEntries(
  Object.values(CONVERSATION_CAPABILITY_NAMES).map((n) => [n, true]),
);

describe('capabilityNamesFor', () => {
  it('names only the views the host declared', () => {
    expect(capabilityNamesFor(['chat', 'files'])).toEqual(['conversation.files']);
  });

  // `chat` is the transcript; there is nothing to ask the gateway about.
  it('never asks about chat', () => {
    expect(capabilityNamesFor(['chat'])).toEqual([]);
  });

  it('honours a host whose CRDs are named differently', () => {
    expect(capabilityNamesFor(['files'], { files: 'acme.attachments' })).toEqual(['acme.attachments']);
  });
});

describe('effective = declared ∩ provisioned', () => {
  it('offers a view only when both halves agree', () => {
    render(
      <WrappedConversationSurface
        name="Hank"
        declare={['chat', 'files', 'documents']}
        capabilities={{ 'conversation.files': true, 'conversation.documents': false }}
      />,
    );
    expect(tabNames()).toEqual(['Chat', 'Files']);
  });

  // Provisioned-only: a product that ships chat-only must not grow tabs the
  // day an operator turns something on server-side.
  it('will not add a view the host never declared', () => {
    render(
      <WrappedConversationSurface name="Hank" declare={['chat']} capabilities={allProvisioned} />,
    );
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
  });

  // Declared-only: a Documents tab against a gateway with no document service
  // is empty forever, which reads as broken rather than absent.
  it('will not show a declared view the gateway does not provision', () => {
    render(
      <WrappedConversationSurface
        name="Hank"
        declare={['chat', 'documents']}
        capabilities={{}}
      />,
    );
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
  });

  it('remaps names for a host whose CRDs differ', () => {
    render(
      <WrappedConversationSurface
        name="Hank"
        declare={['chat', 'files']}
        capabilityNames={{ files: 'acme.attachments' }}
        capabilities={{ 'acme.attachments': true }}
      />,
    );
    expect(tabNames()).toEqual(['Chat', 'Files']);
  });
});

describe('when there is no capability service', () => {
  // Treating "nothing to ask" as "nothing enabled" would leave a bare
  // transcript on every deployment without a capability service.
  it('lets the host declaration stand on its own', () => {
    render(<WrappedConversationSurface name="Hank" declare={['chat', 'files', 'calls']} />);
    expect(tabNames()).toEqual(['Chat', 'Files', 'Calls']);
  });
});

describe('the transcript', () => {
  // Unresolved names report false, by design. Gating chat on that would blank
  // the transcript for the moment capabilities are loading.
  it('survives a capability map that says nothing is enabled', () => {
    render(
      <WrappedConversationSurface name="Hank" capabilities={{}}>
        <p>transcript</p>
      </WrappedConversationSurface>,
    );
    expect(screen.getByText('transcript')).toBeInTheDocument();
  });

  it('is still there when the host declares chat only', () => {
    render(
      <WrappedConversationSurface name="Hank" declare={['chat']} capabilities={allProvisioned}>
        <p>transcript</p>
      </WrappedConversationSurface>,
    );
    expect(screen.getByText('transcript')).toBeInTheDocument();
  });
});

describe('everything else passes straight through', () => {
  it('keeps the page-level heading through the runtime wrapper', () => {
    render(<WrappedConversationSurface name="#general" headingLevel={1} declare={['chat']} />);
    expect(screen.getByRole('heading', { level: 1, name: '#general' })).toHaveClass('text-xl');
    expect(screen.queryByRole('heading', { level: 2, name: '#general' })).not.toBeInTheDocument();
  });

  it('forwards the rows each view renders', () => {
    render(
      <WrappedConversationSurface
        name="Hank"
        declare={['chat', 'pins']}
        capabilities={{ 'conversation.pins': true }}
        view="pins"
        pins={[{ messageId: 'm1', author: 'Hank', preview: 'the upload path' }]}
      />,
    );
    expect(screen.getByText('the upload path')).toBeInTheDocument();
  });
});

describe('when the capability query fails', () => {
  // The hook reports unresolved names as false, so a momentarily 500ing
  // gateway is indistinguishable from one that provisions nothing. Gating on
  // that loses every view with no explanation until the gateway recovers.
  it('keeps the declared views rather than silently losing them', () => {
    render(
      <WrappedConversationSurface
        name="Hank"
        declare={['chat', 'files', 'documents']}
        capabilities={{}}
        capabilitiesError={new Error('HTTP 500')}
      />,
    );
    // Files are listed inside Documents when both are on.
    expect(tabNames()).toEqual(['Chat', 'Documents']);
  });

  // A recovered query is authoritative again.
  it('goes back to the gate once the query succeeds', () => {
    const { rerender } = render(
      <WrappedConversationSurface
        name="Hank"
        declare={['chat', 'files', 'documents']}
        capabilities={{}}
        capabilitiesError={new Error('HTTP 500')}
      />,
    );
    rerender(
      <WrappedConversationSurface
        name="Hank"
        declare={['chat', 'files', 'documents']}
        capabilities={{ 'conversation.files': true, 'conversation.documents': false }}
      />,
    );
    expect(tabNames()).toEqual(['Chat', 'Files']);
  });
});
