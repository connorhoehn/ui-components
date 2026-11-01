import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import '../src/styles.css';

function PreviewTheme({ theme, children }: { theme: 'light' | 'dark'; children: React.ReactNode }) {
  React.useEffect(() => {
    const previous = document.body.dataset.theme;
    const background = document.body.style.backgroundColor;
    // The CSS theme includes the complete semantic palette; the provider's
    // token overrides alone cover only its older ThemeTokens interface.
    document.body.dataset.theme = theme;
    document.body.style.backgroundColor = 'var(--color-workspace)';
    return () => {
      if (previous == null) delete document.body.dataset.theme;
      else document.body.dataset.theme = previous;
      document.body.style.backgroundColor = background;
    };
  }, [theme]);
  return <ThemeProvider preset={theme}>{children}</ThemeProvider>;
}

const preview: Preview = {
  initialGlobals: { theme: 'light' },
  globalTypes: {
    theme: {
      description: 'Component theme',
      toolbar: { title: 'Theme', icon: 'circlehollow', items: ['light', 'dark'], dynamicTitle: true },
    },
  },
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
    (Story, context) => (
      <PreviewTheme theme={context.globals.theme === 'dark' ? 'dark' : 'light'}>
        <div style={{ padding: '1.5rem', fontFamily: 'inherit' }}>
          <Story />
        </div>
      </PreviewTheme>
    ),
  ],
};

export default preview;
