import { useEffect, useState } from 'react';
import { IoMoon, IoSunny } from 'react-icons/io5';

function DarkModeToggler() {
  // Set initial theme based on localStorage or default to 'light'
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
  );

  // Update theme state based on checkbox status
  const toggleTheme = (e) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  // Sync theme with localStorage and apply it to the HTML root element
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <label
      htmlFor='theme-toggler'
      className='bg-neutral swap swap-rotate text-neutral-content w-12 rounded-full'
    >
      <input
        type='checkbox'
        id='theme-toggler'
        onChange={toggleTheme}
        checked={theme === 'dark'}
        aria-label='Toggle dark mode'
      />
      <IoSunny className='swap-off text-xl' />
      <IoMoon className='swap-on text-xl' />
    </label>
  );
}

export default DarkModeToggler;
