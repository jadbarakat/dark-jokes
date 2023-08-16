import { AppThemeProvider } from "./src/context/AppThemeContext";
import { DarkJokesApp } from "./src/DarkJokesApp";

export default function App() {
  return (
    <AppThemeProvider>
      <DarkJokesApp />
    </AppThemeProvider>
  );
}
