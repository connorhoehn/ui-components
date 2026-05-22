import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider preset="light">
        <div style={{ padding: '1.5rem', fontFamily: 'inherit' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
