import { useEffect, useState } from 'react';
import { IoMoon, IoSunny } from 'react-icons/io5';

function DarkModeToggler() {
  // Initialize theme state based on localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  // Toggle theme and update localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Apply theme to the HTML element
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <label className='bg-neutral swap swap-rotate text-neutral-content w-12 rounded-full'>
      <input type='checkbox' onClick={toggleTheme} />
      <IoSunny className='swap-off text-xl' />
      <IoMoon className='swap-on text-xl' />
    </label>
  );
}

export default DarkModeToggler;
