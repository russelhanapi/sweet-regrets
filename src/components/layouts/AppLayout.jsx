import { Suspense } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import CartOverview from '../../features/cart/components/CartOverview';
import Loader from '../ui/Loader';
import HeaderNav from './HeaderNav';
import HotToast from '../ui/HotToast';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      <HotToast />
      {isLoading && <Loader />}
      <HeaderNav />
      <main className='overflow-y-auto'>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
