export interface ProposedField {
    name: string;
    sectionType: string;
    required: boolean;
}
export interface DocTypeProposalRow {
    proposalId: string;
    sourceId: string;
    signature: string;
    sampleIngestIds: string[];
    proposedName: string;
    proposedDescription: string;
    proposedFields: ProposedField[];
    reasoning: string;
    status: 'pending' | 'promoted' | 'rejected';
    createdAt: string;
}
export interface UseDocTypeProposalsResult {
    proposals: DocTypeProposalRow[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    promote: (proposalId: string) => Promise<void>;
    reject: (proposalId: string) => Promise<void>;
}
export declare function useDocTypeProposals(): UseDocTypeProposalsResult;
export default useDocTypeProposals;
//# sourceMappingURL=useDocTypeProposals.d.ts.map