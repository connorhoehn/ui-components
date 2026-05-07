import { ModalDemo } from './ModalDemo';
import { ToastDemo } from './ToastDemo';
import { BannerDemo } from './BannerDemo';
import { ChartDemo } from './ChartDemo';
import { FormControlsDemo } from './FormControlsDemo';

export default function SharedComponentsDemo() {
  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Shared Components</h2>
      <p style={{ color: '#64748b', fontSize: 14, marginBottom: 32 }}>
        Reusable UI primitives used across all domain modules.
      </p>

      <ModalDemo />
      <ToastDemo />
      <BannerDemo />
      <ChartDemo />
      <FormControlsDemo />
    </div>
  );
}
