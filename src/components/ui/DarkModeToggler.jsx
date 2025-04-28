import { IoMoon, IoSunny } from 'react-icons/io5';

function DarkModeToggler() {
  return (
    <label className='bg-neutral swap swap-rotate text-neutral-content w-12 rounded-full'>
      <input type='checkbox' />
      <IoSunny className='swap-off text-xl' />
      <IoMoon className='swap-on text-xl' />
    </label>
  );
}

export default DarkModeToggler;
