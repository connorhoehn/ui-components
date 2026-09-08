import type { FieldTypeDefinition } from '../registry';

const definition: FieldTypeDefinition = {
  type: 'text',
  label: 'Text',
  icon: '🔤',
  description: 'Single-line plain text — a name, a status, a reference',
  rendererKeys: {
    editor: ['text:editor'],
    ack:    ['text:ack'],
    reader: ['text:reader'],
  },
  rendererLabels: {
    'text:editor': 'Text Field',
    'text:ack':    'Text Value',
    'text:reader': 'Text Value',
  },
};

export default definition;
