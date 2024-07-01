import { HiMiniSun, HiMiniMoon } from "react-icons/hi2";
import { SiYoutube, SiGithub } from "react-icons/si";
import { useTheme } from "./useTheme";

export function Navbar() {
  return (
    <header className="sticky-top bg-body border-bottom">
      <div className="container-fluid d-flex justify-content-between align-items-center p-3">
        <a className="navbar-brand fw-bold" href="/">
          @m6oss/schema-form
        </a>
        <nav className="d-flex align-items-center">
          <ThemeToggle />
          <a
            href="https://www.youtube.com/@m6io"
            target="_blank"
            className="btn btn-link text-body p-2"
            aria-label="YouTube"
          >
            <SiYoutube className="h-100 w-100" />
          </a>
          <a
            href="https://github.com/m6io/schema-form"
            target="_blank"
            className="btn btn-link text-body p-2"
            aria-label="GitHub"
          >
            <SiGithub className="h-100 w-100" />
          </a>
        </nav>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      className="btn btn-link text-body p-2"
      onClick={() => toggleDarkMode()}
      aria-label="Toggle Theme"
    >
      {isDarkMode ? (
        <HiMiniMoon className="h-100 w-100" />
      ) : (
        <HiMiniSun className="h-100 w-100" />
      )}
    </button>
  );
}
