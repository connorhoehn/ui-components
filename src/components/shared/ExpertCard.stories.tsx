import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExpertCard } from './ExpertCard';

const meta = {
  title: 'Shared/ExpertCard',
  component: ExpertCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof ExpertCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullEvidence: Story = {
  args: {
    name: 'Priya Raman',
    title: 'Staff Engineer',
    subtitle: 'Platform',
    matchedSkills: [
      { name: 'Kubernetes', strength: 0.9 },
      { name: 'EKS', strength: 0.5 },
    ],
    otherSkills: ['Terraform', 'Go', 'Aurora', 'Redis', 'Kafka'],
    contexts: ['Cluster autoscaling', 'Service mesh rollout'],
    evidence: [
      { id: 'd1', title: 'ADR-041: Multi-cluster ingress', source: 'adr' },
      { id: 'd2', title: 'Postmortem: control-plane throttling', source: 'pm' },
      { id: 'd3', title: 'Runbook: node-pool upgrades', source: 'wiki' },
    ],
    onAsk: () => {},
  },
};

export const SparseMatch: Story = {
  args: {
    name: 'Jon Alvarez',
    title: 'Engineer',
    matchedSkills: [{ name: 'Kubernetes', strength: 0.3 }],
    onAsk: () => {},
    askLabel: 'Ask',
  },
};

export const NoAction: Story = {
  args: {
    name: 'Dana Whitfield',
    title: 'Principal Engineer',
    subtitle: 'Infrastructure',
    matchedSkills: [{ name: 'Networking', strength: 0.8 }],
    contexts: ['IPv6 migration'],
  },
};
