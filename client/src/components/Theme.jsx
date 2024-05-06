import { useState, useEffect } from "react";
const App = () => {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="app h-screen bg-white dark:bg-black flex justify-center items-center">
      <button className="bg-green-200 p-4 rounded-3xl" onClick={toggleTheme}>
        Dark Mode
      </button>
    </div>
  );
};

export default App;
