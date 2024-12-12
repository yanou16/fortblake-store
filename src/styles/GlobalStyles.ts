import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#1A1A1A',     // Noir profond pour le texte principal
    secondary: '#2A2A2A',   // Noir légèrement plus clair pour les éléments secondaires
    accent: '#FF4B2B',      // Orange vif pour les accents et CTA
    background: '#FFFFFF',  // Fond blanc pur
    backgroundAlt: '#F8F8F8', // Fond alternatif très légèrement gris
    text: '#1A1A1A',        // Texte principal
    textLight: '#666666',   // Texte secondaire
    border: '#E5E5E5',      // Bordures légères
    success: '#4CAF50',     // Vert pour les succès
    error: '#F44336',       // Rouge pour les erreurs
    warning: '#FFC107'      // Jaune pour les avertissements
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)'
  }
};

const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: ${theme.colors.primary};
    --color-secondary: ${theme.colors.secondary};
    --color-accent: ${theme.colors.accent};
    --color-background: ${theme.colors.background};
    --color-background-alt: ${theme.colors.backgroundAlt};
    --color-text: ${theme.colors.text};
    --color-text-light: ${theme.colors.textLight};
    --color-border: ${theme.colors.border};
    --color-success: ${theme.colors.success};
    --color-error: ${theme.colors.error};
    --color-warning: ${theme.colors.warning};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-background);
    color: var(--color-text);
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-accent);
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);
    }
  }
`;

export default GlobalStyles;
