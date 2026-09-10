// RecordingChip — whether this call is being recorded, as one small chip.
//
// Recording is a DECISION people should be able to see, and it has two
// visible states that mean different things:
//
//   armed  — the call WILL be recorded, but nothing is being written yet. A
//            DM records only once both people are in it; a room that has
//            recording switched on records from the first publisher. Shown
//            neutral and still, so it reads as a promise, not an alarm.
//   active — bytes are being written right now. Red and pulsing, because
//            this is the state someone might want to react to.
//
// Neither → renders nothing. The absence of the chip is itself the statement
// "this call is not being recorded", which is why a consumer must not paint
// its own REC pill beside this one.
//
// Extracted from HangoutRoomHeader so the embedded call panel and the
// floating call widget say the same thing in the same way; three copies of a
// red dot had already drifted (one was inline CSS, one lived only in the
// floating branch and was missing in the docked one).

import Chip from '../shared/Chip';

export interface RecordingChipState {
  /** Recording is on for this call — it will record, or is recording. */
  armed: boolean;
  /** Bytes are being written right now. Implies armed. */
  active: boolean;
}

export interface RecordingChipProps extends RecordingChipState {
  /** Overrides the default hover copy for each state. */
  titles?: Partial<Record<'armed' | 'active', string>>;
  className?: string;
  'data-testid'?: string;
}

export const RECORDING_CHIP_TITLES = {
  active: 'Recording — saved to /recordings when the call ends',
  armed: 'Recording armed — will start once the call is under way',
} as const;

export function RecordingChip({
  armed,
  active,
  titles,
  className,
  'data-testid': testId = 'recording-chip',
}: RecordingChipProps) {
  if (!armed && !active) return null;
  return (
    <Chip
      tone={active ? 'danger' : 'neutral'}
      size="xs"
      uppercase
      dot={active ? 'pulse' : 'static'}
      title={active ? (titles?.active ?? RECORDING_CHIP_TITLES.active) : (titles?.armed ?? RECORDING_CHIP_TITLES.armed)}
      className={className}
      data-testid={testId}
      aria-label={active ? 'Recording' : 'Recording armed'}
    >
      Rec
    </Chip>
  );
}

export default RecordingChip;
