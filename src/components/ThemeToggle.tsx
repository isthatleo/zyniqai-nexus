import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  return (
    <button
      onClick={cycle}
      className="relative w-9 h-9 rounded-lg border border-border/50 bg-muted/30 backdrop-blur-sm flex items-center justify-center hover:border-primary/40 hover:bg-muted/50 transition-all duration-300"
      title={`Theme: ${theme}`}
    >
      {theme === "light" && <Sun size={16} className="text-foreground" />}
      {theme === "dark" && <Moon size={16} className="text-foreground" />}
      {theme === "system" && <Monitor size={16} className="text-foreground" />}
    </button>
  );
};

export default ThemeToggle;
