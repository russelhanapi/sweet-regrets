import React from 'react';
import HeaderNav from './HeaderNav';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      <HeaderNav />
      <main className='overflow-y-auto'>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
