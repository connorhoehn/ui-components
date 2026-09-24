import type { RunStatus } from '../../../types/pipeline';
import type { ErrorCategory } from '../../../types/pipeline';
import type { ChipTone } from '../../shared/Chip';

export function statusChipVariant(
  status: RunStatus,
): { label: string; tone: ChipTone } {
  switch (status) {
    case 'completed':           return { label: 'Completed',        tone: 'success'  };
    case 'rejected':            return { label: 'Rejected',         tone: 'danger'   };
    case 'failed':              return { label: 'Failed',           tone: 'danger'   };
    case 'cancelled':           return { label: 'Cancelled',        tone: 'neutral'  };
    case 'awaiting_approval':   return { label: 'Awaiting approval', tone: 'warning' };
    case 'running':             return { label: 'Running',          tone: 'info'     };
    case 'pending':             return { label: 'Pending',          tone: 'neutral'  };
    case 'paused_at_breakpoint': return { label: 'Paused',          tone: 'warning'  };
    case 'stuck':               return { label: 'Stuck',            tone: 'warning'  };
    default:                    return { label: status,             tone: 'neutral'  };
  }
}

export function errorCategoryTone(cat: ErrorCategory): ChipTone {
  switch (cat) {
    case 'LLMError':         return 'danger';
    case 'TimeoutError':     return 'caution';
    case 'NetworkError':     return 'warning';
    case 'ValidationError':  return 'warning';
    case 'RegistryConflict': return 'purple';
    case 'Refused':          return 'caution';
    case 'ModelAuth':        return 'caution';
    case 'UnknownError':     return 'neutral';
    default:                 return 'neutral';
  }
}
