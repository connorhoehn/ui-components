import type { FieldTypeDefinition } from '../registry';

const definition: FieldTypeDefinition = {
  type: 'date',
  label: 'Date',
  icon: '📅',
  description: 'A single calendar date (due date, start date, target date)',
  rendererKeys: {
    editor: ['date:editor'],
    ack:    ['date:ack'],
    reader: ['date:reader'],
  },
  rendererLabels: {
    'date:editor': 'Date Picker',
    'date:ack':    'Date Value',
    'date:reader': 'Date Value',
  },
};

export default definition;
