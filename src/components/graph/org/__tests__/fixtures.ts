import type { GraphDepartment, GraphPerson, GraphRelationship } from '../types';

export const departments: GraphDepartment[] = [
  { id: 'd-plat', name: 'Platform Engineering', color: '#3b82f6' },
  { id: 'd-data', name: 'Data Platform', color: '#8b5cf6' },
  { id: 'd-sec', name: 'Security', color: '#ef4444' },
];

export const people: GraphPerson[] = [
  { id: 'p-1', name: 'Vera Green', title: 'Staff Engineer', department: 'Platform Engineering', skills: ['Kubernetes', 'Go'], influenceScore: 0.9, presence: 'office' },
  { id: 'p-2', name: 'Nora Chang', title: 'Engineer', department: 'Platform Engineering', skills: ['Kubernetes', 'Terraform'], influenceScore: 0.5, presence: 'wfh' },
  { id: 'p-3', name: 'Hiro Tanaka', title: 'Data Engineer', department: 'Data Platform', skills: ['Spark', 'Rust'], influenceScore: 0.4, presence: 'vacation' },
  { id: 'p-4', name: 'Aisha Bello', title: 'Security Lead', department: 'Security', skills: ['Zero Trust', 'Go'], influenceScore: 0.7 },
];

export const relationships: GraphRelationship[] = [
  { source: 'p-2', target: 'p-1', type: 'reports_to', strength: 1 },
  { source: 'p-1', target: 'p-3', type: 'collaborates', strength: 0.6 },
  { source: 'p-1', target: 'p-2', type: 'mentors', strength: 0.8 },
  { source: 'p-3', target: 'p-4', type: 'expert_in_common', strength: 0.3 },
];
