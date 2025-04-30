import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import CartOverview from '../../features/cart/CartOverview';
import Loader from '../ui/Loader';
import HeaderNav from './HeaderNav';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      {isLoading && <Loader />}
      <HeaderNav />
      <main className='overflow-y-auto'>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
