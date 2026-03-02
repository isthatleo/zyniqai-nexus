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
      className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 flex-shrink-0"
      title={`Theme: ${theme}`}
    >
      {theme === "light" && <Sun size={15} />}
      {theme === "dark" && <Moon size={15} />}
      {theme === "system" && <Monitor size={15} />}
    </button>
  );
};

export default ThemeToggle;
