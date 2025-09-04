export const theme = {
  colors: {
    bg: '#050505',
    card: '#2b2327',
    text: '#e6edf3',
    subtext: '#9aa4b2',
    primary: '#89bca6',
    danger: '#ef4444',
    divider: '#232723',
    chip: '#323949',
  },
  radius: {md: 12, lg: 16},
  spacing: (n: number) => n * 8,
} as const;

export type AppTheme = typeof theme;
