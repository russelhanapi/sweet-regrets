import { useSelector } from 'react-redux';
import SearchOrder from '../../features/order/components/SearchOrder';
import UserAvatar from '../../features/user/UserAvatar';
import ResponsiveLogo from '../ui/ResponsiveLogo';
import DarkModeToggler from '../ui/DarkModeToggler';

function HeaderNav() {
  const userLoggedIn = useSelector((state) => state.user.fullName);
  return (
    <header className='border-b-base-300 border-b-2'>
      <nav className='navbar bg-base-100 max-container flex items-center gap-6 md:justify-between'>
        <ResponsiveLogo />
        <div className='flex grow gap-3 md:w-96 md:flex-none'>
          <div className='grow'>
            <SearchOrder />
          </div>
          {userLoggedIn && <UserAvatar fullName={userLoggedIn} />}
          <DarkModeToggler />
        </div>
      </nav>
    </header>
  );
}

export default HeaderNav;
