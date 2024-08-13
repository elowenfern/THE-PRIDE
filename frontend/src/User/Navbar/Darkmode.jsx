import React from 'react'

function Darkmode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

  // Load the theme from localStorage or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Update localStorage and apply the theme class to the document body
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Toggle the theme state
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <button
              onClick={toggleTheme}
              className="bg-secondary text-white py-2 px-4 rounded-full"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
    </div>
  )
}

export default Darkmode
