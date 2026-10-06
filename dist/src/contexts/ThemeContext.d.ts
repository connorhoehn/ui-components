type Theme = 'light' | 'dark';
interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}
export declare function ColorSchemeProvider({ children }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function useColorScheme(): ThemeContextValue;
export {};
//# sourceMappingURL=ThemeContext.d.ts.map