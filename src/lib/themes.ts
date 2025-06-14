export const themes = {
  dark: {
    background: '#000000',
    surface: '#111111',
    border: '#333333',
    borderLight: '#555555',
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
      muted: '#888888',
    },
    squares: {
      background: '#000000',
      border: '#333333',
      hoverFill: '#444444',
    },
    glass: {
      background: 'rgba(32, 32, 32, 0.95)',
      backgroundDark: 'rgba(20, 20, 20, 0.98)',
      border: 'rgba(255, 255, 255, 0.1)',
      backdropBlur: 'backdrop-blur-md',
      cardBackground: 'rgba(255, 255, 255, 0.08)',
      cardHover: 'rgba(255, 255, 255, 0.12)',
    },
    button: {
      background: 'transparent',
      backgroundHover: 'rgba(255, 255, 255, 0.08)',
      backgroundActive: 'rgba(255, 255, 255, 0.15)',
      backgroundSelected: '#0078d4',
      border: 'rgba(255, 255, 255, 0.1)',
      borderActive: 'rgba(0, 120, 212, 0.3)',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
    gradient: {
      radial:
        'radial-gradient(circle at 50% 50%, rgba(17, 17, 17, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)',
    },
    // Steam-specific theme colors
    steam: {
      // Main Steam color scheme
      background: '#1b2838',
      header: '#171a21',
      sidebar: '#1a2940',
      sidebarHover: '#273b54',
      content: '#1b2838',
      card: '#16202d',
      cardHover: '#1c3a5d',
      divider: '#2d4a67',
      highlight: '#66c0f4', // Steam blue
      green: '#5c7e10', // Steam green
      accent: '#1a9fff', // Light blue accent
      buttonGradientStart: '#75b022',
      buttonGradientEnd: '#588a1b',
      navSelected: '#66c0f4',
      inputBg: '#2a3f5a',
      itemBg: '#16202d',
      itemHover: '#1f3c5d',
      featuredGradient: 'linear-gradient(to right, #1b2838, #2a475e)',
      textPrimary: '#c7d5e0',
      textSecondary: '#8f98a0',
      priceBg: '#344654',
    },
    // Slack-specific theme colors
    slack: {
      background: '#1a1d21',
      sidebarBackground: '#19171D',
      sidebarText: '#D1D2D3',
      sidebarHover: '#27242C',
      sidebarActive: '#1164A3',
      contentBackground: '#1a1d21',
      messageBackground: '#222529',
      messageHover: '#2C2D30',
      divider: '#383838',
      textPrimary: '#D1D2D3',
      textSecondary: '#ABABAD',
      accent: '#8A268C', // Slack purple
      mentionBadge: '#E01E5A',
      buttonPrimary: '#007a5a', // Slack green
      welcomeBackground: '#222529',
      threadBackground: '#222529',
      searchBackground: '#222529',
      channelActiveBackground: '#1164A3',
      notification: '#cd3e3e',
    },
  },
  light: {
    background: '#ffffff',
    surface: '#f8f9fa',
    border: '#e5e5e5',
    borderLight: '#d1d5db',
    text: {
      primary: '#111111',
      secondary: '#4b5563',
      muted: '#9ca3af',
    },
    squares: {
      background: '#ffffff',
      border: '#e5e5e5',
      hoverFill: '#f3f4f6',
    },
    glass: {
      background: 'rgba(248, 248, 248, 0.95)',
      backgroundDark: 'rgba(225, 225, 225, 0.98)',
      border: 'rgba(17, 17, 17, 0.1)',
      backdropBlur: 'backdrop-blur-md',
      cardBackground: 'rgba(0, 0, 0, 0.08)',
      cardHover: 'rgba(0, 0, 0, 0.12)',
    },
    button: {
      background: 'transparent',
      backgroundHover: 'rgba(0, 0, 0, 0.08)',
      backgroundActive: 'rgba(0, 0, 0, 0.15)',
      backgroundSelected: '#0078d4',
      border: 'rgba(17, 17, 17, 0.1)',
      borderActive: 'rgba(0, 120, 212, 0.3)',
    },
    divider: 'rgba(17, 17, 17, 0.1)',
    gradient: {
      radial:
        'radial-gradient(circle at 50% 50%, rgba(248, 249, 250, 0.4) 0%, rgba(229, 229, 229, 0.8) 100%)',
    },
    // Steam-specific theme colors (same as dark mode for consistent Steam look)
    steam: {
      // Main Steam color scheme
      background: '#1b2838',
      header: '#171a21',
      sidebar: '#1a2940',
      sidebarHover: '#273b54',
      content: '#1b2838',
      card: '#16202d',
      cardHover: '#1c3a5d',
      divider: '#2d4a67',
      highlight: '#66c0f4', // Steam blue
      green: '#5c7e10', // Steam green
      accent: '#1a9fff', // Light blue accent
      buttonGradientStart: '#75b022',
      buttonGradientEnd: '#588a1b',
      navSelected: '#66c0f4',
      inputBg: '#2a3f5a',
      itemBg: '#16202d',
      itemHover: '#1f3c5d',
      featuredGradient: 'linear-gradient(to right, #1b2838, #2a475e)',
      textPrimary: '#c7d5e0',
      textSecondary: '#8f98a0',
      priceBg: '#344654',
    },
    // Slack-specific theme colors for light mode
    slack: {
      background: '#FFFFFF',
      sidebarBackground: '#4A154B',
      sidebarText: '#FFFFFF',
      sidebarHover: '#611F69',
      sidebarActive: '#1264A3',
      contentBackground: '#FFFFFF',
      messageBackground: '#F8F8F8',
      messageHover: '#F0F0F0',
      divider: '#E0E0E0',
      textPrimary: '#1D1C1D',
      textSecondary: '#616061',
      accent: '#8A268C',
      mentionBadge: '#E01E5A',
      buttonPrimary: '#007a5a',
      welcomeBackground: '#F8F8F8',
      threadBackground: '#F8F8F8',
      searchBackground: '#FFFFFF',
      channelActiveBackground: '#1264A3',
      notification: '#E01E5A',
    },
  },
} as const;

export type Theme = keyof typeof themes;
export type ThemeColors = typeof themes.dark;
