/** Presentation vocabulary of the document lifecycle API, not an authorization table. */
export type DocumentLifecycleStatus = 'draft' | 'in_review' | 'changes_requested' | 'approved' | 'finalized';
export type LifecycleAction = 'submit_for_review' | 'withdraw' | 'approve' | 'request_changes' | 'revise' | 'reopen' | 'finalize';
export type LifecycleFailureKind = 'forbidden' | 'invalid' | 'conflict' | 'network' | 'busy' | 'unknown';
export interface LegacyFinalClaim {
  unreconciled: true;
  serverStatus: DocumentLifecycleStatus;
}
