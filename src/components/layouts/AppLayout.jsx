import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import CartOverview from '../../features/cart/CartOverview';
import Loader from '../ui/Loader';
import HeaderNav from './HeaderNav';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '12px 22px',
            borderRadius: 'var(--radius-box)',
          },
        }}
      />
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
