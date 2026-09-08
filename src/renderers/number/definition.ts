import type { FieldTypeDefinition } from '../registry';

const definition: FieldTypeDefinition = {
  type: 'number',
  label: 'Number',
  icon: '🔢',
  description: 'A numeric value (amount, score, points, percentage)',
  rendererKeys: {
    editor: ['number:editor'],
    ack:    ['number:ack'],
    reader: ['number:reader'],
  },
  rendererLabels: {
    'number:editor': 'Number Field',
    'number:ack':    'Number Value',
    'number:reader': 'Number Value',
  },
};

export default definition;
