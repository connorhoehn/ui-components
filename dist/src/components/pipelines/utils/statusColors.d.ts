import { RunStatus, ErrorCategory } from '../../../types/pipeline';
import { ChipTone } from '../../shared/Chip';
export declare function statusChipVariant(status: RunStatus): {
    label: string;
    tone: ChipTone;
};
export declare function errorCategoryTone(cat: ErrorCategory): ChipTone;
//# sourceMappingURL=statusColors.d.ts.map