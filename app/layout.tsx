"use client";
import React from "react";
import "./globals.css";

const config: ThemeTokens = {
  colors: {
    primary: "#0070f3",
    primaryContent: "#ffffff",
    secondary: "#1f2937",
    secondaryContent: "#a00909",
    tertiary: "#6b7280",
    info: "#2094f3",
    success: "#009485",
    warning: "#ff9900",
    error: "#ff5724",
    background: "#ffffff",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeBuilder theme={config}>
      <html lang="en">
        {/*
              <head /> will contain the components returned by the nearest parent
              head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
            */}
        <head />
        <body>{children}</body>
      </html>
    </ThemeBuilder>
  );
}

// Configuration expected by the package for building the ui for the user
interface ThemeTokens {
  colors: {
    primary: string;
    primaryContent: string;
    secondary: string;
    secondaryContent: string;
    tertiary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    background: string;
  };
}

// Good'ol context, meant to hold all of the config set by the user
const ThemeContext = React.createContext<ThemeTokens | null>(null);


// Component Wrapping the App.tsx to provide the theme
interface ThemeBuilderProps {
  theme: ThemeTokens;
  children: React.ReactNode;
}

const ThemeBuilder: React.FC<ThemeBuilderProps> = ({ theme, children }) => {
  React.useEffect(() => {
    // In a client-side app, all of this logic would be needed to build style/theme tokens for the app using simply JS
    // But in a case of SSR, we'd need to essentially build a logic that would run on a server-side and then inject on the html manually. We can define some helpers for this approach
    const root = document.documentElement;

    // For testing purposes, we'll set the theme colors as CSS variables for now only
    // Ideally, we could build our variables in a recursive manner like this:
    // colors.primary = var(--colors-primary)
    // fonts.body = var(--fonts-body)
    // etc.
    Object.entries(theme.colors).forEach(([name, value]) => {
      root.style.setProperty(`--${name}`, value);
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
