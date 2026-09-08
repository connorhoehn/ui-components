import type { FieldTypeDefinition } from '../registry';

const definition: FieldTypeDefinition = {
  type: 'boolean',
  label: 'Yes / No',
  icon: '✅',
  description: 'A yes/no answer that can also be left unanswered',
  rendererKeys: {
    editor: ['boolean:editor'],
    ack:    ['boolean:ack'],
    reader: ['boolean:reader'],
  },
  rendererLabels: {
    'boolean:editor': 'Yes / No Toggle',
    'boolean:ack':    'Yes / No Value',
    'boolean:reader': 'Yes / No Value',
  },
};

export default definition;
