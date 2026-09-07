// "Take me to that" on both shapes.
//
// The failure this locks down was invisible: a legacy document renders
// `#section-<id>` elements, a canvas renders none and files its comments under
// an EMPTY section id, so every navigation became `getElementById('section-')`
// → null → nothing happened. The row still highlighted on hover. The click did
// nothing, forever, with no error.

import { afterEach, describe, expect, it } from 'vitest';
import { findDocumentTarget, scrollToDocumentTarget } from '../canvas/scrollToDocumentTarget';

function mount(html: string): HTMLElement {
  const root = document.createElement('div');
  root.innerHTML = html;
  document.body.appendChild(root);
  return root;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('findDocumentTarget', () => {
  it('finds a section on a legacy document', () => {
    mount('<div id="section-sec-goals">Goals</div>');
    const el = findDocumentTarget({ sectionId: 'sec-goals', commentId: 'c1' });
    expect(el?.id).toBe('section-sec-goals');
  });

  // The canvas case: `sectionId` is empty by construction, so the comment id is
  // the only landmark there is.
  it('finds the comment highlight on a page-shaped document', () => {
    mount('<p>text <span data-comment-id="c-42">anchored</span> more</p>');
    const el = findDocumentTarget({ sectionId: '', commentId: 'c-42' });
    expect(el?.getAttribute('data-comment-id')).toBe('c-42');
  });

  it('falls through to the comment when the section element is not on the page', () => {
    // A converted document keeps its section IDs on old comments but renders no
    // section elements — so the section id is present and useless.
    mount('<span data-comment-id="c-9">anchored</span>');
    const el = findDocumentTarget({ sectionId: 'sec-gone', commentId: 'c-9' });
    expect(el?.getAttribute('data-comment-id')).toBe('c-9');
  });

  it('returns null when there is nowhere to go, instead of pretending', () => {
    mount('<div>nothing here</div>');
    expect(findDocumentTarget({ sectionId: '', commentId: '' })).toBeNull();
    expect(findDocumentTarget({ sectionId: 'missing' })).toBeNull();
  });

  it('does not break on an id containing selector punctuation', () => {
    mount('<div id=\'section-a"b\'>odd</div>');
    expect(findDocumentTarget({ sectionId: 'a"b' })).not.toBeNull();
  });

  it('can be scoped to a root, so one document does not answer for another', () => {
    const a = mount('<div id="section-s1">A</div>');
    mount('<div id="section-s2">B</div>');
    expect(findDocumentTarget({ sectionId: 's2' }, a)).toBeNull();
    expect(findDocumentTarget({ sectionId: 's1' }, a)?.textContent).toBe('A');
  });
});

describe('scrollToDocumentTarget', () => {
  it('reports success on both shapes and failure on neither', () => {
    const legacy = mount('<div id="section-s1"></div>');
    expect(scrollToDocumentTarget({ sectionId: 's1' })).toBe(true);
    legacy.remove();

    mount('<span data-comment-id="c1"></span>');
    // The exact call My Items makes on a canvas: no section, a comment.
    expect(scrollToDocumentTarget({ sectionId: '', commentId: 'c1' })).toBe(true);

    expect(scrollToDocumentTarget({ sectionId: '', commentId: 'nope' })).toBe(false);
  });

  it('flashes the target it found', () => {
    mount('<span data-comment-id="c1"></span>');
    scrollToDocumentTarget({ sectionId: '', commentId: 'c1' });
    const el = document.querySelector<HTMLElement>('[data-comment-id="c1"]')!;
    expect(el.style.boxShadow).not.toBe('');
  });
});
