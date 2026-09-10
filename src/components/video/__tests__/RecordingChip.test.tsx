import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { RecordingChip, RECORDING_CHIP_TITLES } from '../RecordingChip';
import { EmbeddedCallPanel } from '../EmbeddedCallPanel';

afterEach(cleanup);

describe('RecordingChip', () => {
  // The absence of the chip IS the "not recorded" statement.
  it('renders nothing when the call neither records nor will', () => {
    render(<RecordingChip armed={false} active={false} />);
    expect(screen.queryByTestId('recording-chip')).not.toBeInTheDocument();
  });

  it('is a still, neutral promise while armed', () => {
    render(<RecordingChip armed active={false} />);
    const chip = screen.getByTestId('recording-chip');
    expect(chip).toHaveAttribute('title', RECORDING_CHIP_TITLES.armed);
    expect(chip).toHaveAttribute('aria-label', 'Recording armed');
    expect(chip.querySelector('.animate-ping')).toBeNull();
  });

  it('turns red and pulses once bytes are being written', () => {
    render(<RecordingChip armed active />);
    const chip = screen.getByTestId('recording-chip');
    expect(chip).toHaveAttribute('title', RECORDING_CHIP_TITLES.active);
    expect(chip).toHaveAttribute('aria-label', 'Recording');
    expect(chip.querySelector('.animate-ping')).not.toBeNull();
  });

  it('lets a consumer say when the armed recording will start', () => {
    render(<RecordingChip armed active={false} titles={{ armed: 'will start when Bob answers' }} />);
    expect(screen.getByTestId('recording-chip')).toHaveAttribute('title', 'will start when Bob answers');
  });
});

describe('EmbeddedCallPanel — recording', () => {
  it('shows the chip in the title row when the call records', () => {
    render(<EmbeddedCallPanel title="Alice & Bob" recording={{ armed: true, active: true }}><div /></EmbeddedCallPanel>);
    expect(screen.getByTestId('embedded-call-panel-recording')).toHaveAttribute('aria-label', 'Recording');
  });

  it('shows nothing about recording when the host says nothing', () => {
    render(<EmbeddedCallPanel title="Alice & Bob"><div /></EmbeddedCallPanel>);
    expect(screen.queryByTestId('embedded-call-panel-recording')).not.toBeInTheDocument();
  });

  it('shows nothing when recording is off for the call', () => {
    render(<EmbeddedCallPanel title="Alice & Bob" recording={{ armed: false, active: false }}><div /></EmbeddedCallPanel>);
    expect(screen.queryByTestId('embedded-call-panel-recording')).not.toBeInTheDocument();
  });
});
