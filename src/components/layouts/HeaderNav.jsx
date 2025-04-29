import ResponsiveLogo from '../ui/ResponsiveLogo';
import SearchOrder from '../../features/order/SearchOrder';
import Avatar from '../ui/Avatar';
import DarkModeToggler from '../ui/DarkModeToggler';

function HeaderNav() {
  return (
    <header className='border-b-base-300 border-b-2'>
      <nav className='navbar bg-base-100 max-container flex items-center gap-6 md:justify-between'>
        <ResponsiveLogo />
        <div className='flex grow gap-3 md:w-96 md:flex-none'>
          <div className='grow'>
            <SearchOrder />
          </div>
          <Avatar />
          <DarkModeToggler />
        </div>
      </nav>
    </header>
  );
}

export default HeaderNav;
