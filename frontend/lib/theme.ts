import { createTheme, MantineColorsTuple } from '@mantine/core';

// Custom color palette
const brand: MantineColorsTuple = [
  '#f0f9ff',
  '#e0f2fe',
  '#bae6fd',
  '#7dd3fc',
  '#38bdf8',
  '#0ea5e9',
  '#0284c7',
  '#0369a1',
  '#075985',
  '#0c4a6e',
];

const success: MantineColorsTuple = [
  '#f0fdf4',
  '#dcfce7',
  '#bbf7d0',
  '#86efac',
  '#4ade80',
  '#22c55e',
  '#16a34a',
  '#15803d',
  '#166534',
  '#14532d',
];

const warning: MantineColorsTuple = [
  '#fffbeb',
  '#fef3c7',
  '#fde68a',
  '#fcd34d',
  '#fbbf24',
  '#f59e0b',
  '#d97706',
  '#b45309',
  '#92400e',
  '#78350f',
];

const error: MantineColorsTuple = [
  '#fef2f2',
  '#fee2e2',
  '#fecaca',
  '#fca5a5',
  '#f87171',
  '#ef4444',
  '#dc2626',
  '#b91c1c',
  '#991b1b',
  '#7f1d1d',
];

export const theme = createTheme({
  // Color scheme
  primaryColor: 'brand',
  colors: {
    brand,
    success,
    warning,
    error,
  },

  // Typography
  fontFamily: 'Inter, system-ui, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Menlo, Monaco, monospace',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.25rem', lineHeight: '2.5rem' },
      h2: { fontSize: '1.875rem', lineHeight: '2.25rem' },
      h3: { fontSize: '1.5rem', lineHeight: '2rem' },
      h4: { fontSize: '1.25rem', lineHeight: '1.75rem' },
      h5: { fontSize: '1.125rem', lineHeight: '1.75rem' },
      h6: { fontSize: '1rem', lineHeight: '1.5rem' },
    },
  },

  // Spacing
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  // Border radius
  radius: {
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },

  // Shadows
  shadows: {
    xs: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  // Component-specific overrides
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },

    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
        withBorder: true,
      },
      styles: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            shadow: 'md',
          },
        },
      },
    },

    Input: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        input: {
          transition: 'all 0.2s ease',
          '&:focus': {
            borderColor: 'var(--mantine-color-brand-5)',
            boxShadow: '0 0 0 2px var(--mantine-color-brand-1)',
          },
        },
      },
    },

    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },

    Textarea: {
      defaultProps: {
        radius: 'md',
      },
    },

    Select: {
      defaultProps: {
        radius: 'md',
      },
    },

    MultiSelect: {
      defaultProps: {
        radius: 'md',
      },
    },

    Modal: {
      defaultProps: {
        radius: 'lg',
        shadow: 'xl',
      },
      styles: {
        content: {
          backgroundColor: 'var(--mantine-color-body)',
        },
      },
    },

    Paper: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
      },
    },

    Notification: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          borderLeft: '4px solid var(--mantine-color-brand-5)',
        },
      },
    },

    Badge: {
      defaultProps: {
        radius: 'md',
      },
    },

    Tabs: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        tab: {
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'var(--mantine-color-gray-0)',
          },
          '&[data-active]': {
            borderColor: 'var(--mantine-color-brand-5)',
          },
        },
      },
    },

    Table: {
      styles: {
        th: {
          fontWeight: 600,
          color: 'var(--mantine-color-dimmed)',
          borderBottom: '2px solid var(--mantine-color-gray-2)',
        },
        td: {
          borderBottom: '1px solid var(--mantine-color-gray-1)',
        },
      },
    },

    Progress: {
      defaultProps: {
        radius: 'xl',
      },
      styles: {
        root: {
          backgroundColor: 'var(--mantine-color-gray-1)',
        },
      },
    },

    Slider: {
      defaultProps: {
        radius: 'xl',
      },
      styles: {
        track: {
          backgroundColor: 'var(--mantine-color-gray-2)',
        },
        bar: {
          backgroundColor: 'var(--mantine-color-brand-5)',
        },
        thumb: {
          borderColor: 'var(--mantine-color-brand-5)',
          backgroundColor: 'white',
          boxShadow: 'var(--mantine-shadow-sm)',
        },
      },
    },

    Switch: {
      styles: {
        track: {
          cursor: 'pointer',
        },
      },
    },

    Checkbox: {
      styles: {
        input: {
          cursor: 'pointer',
        },
        label: {
          cursor: 'pointer',
        },
      },
    },

    Radio: {
      styles: {
        radio: {
          cursor: 'pointer',
        },
        label: {
          cursor: 'pointer',
        },
      },
    },
  },

  // Global styles
  globalStyles: (theme) => ({
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },

    body: {
      backgroundColor: theme.colors.gray[0],
      color: theme.colors.dark[7],
      lineHeight: theme.lineHeight,
    },

    '.mantine-focus-auto': {
      '&:focus': {
        outline: `2px solid ${theme.colors.brand[5]}`,
        outlineOffset: '2px',
      },
    },
  }),

  // Other theme properties
  other: {
    // Custom properties that can be accessed via theme.other
    transitions: {
      default: 'all 0.2s ease',
      slow: 'all 0.3s ease',
      fast: 'all 0.1s ease',
    },
    breakpoints: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
});
