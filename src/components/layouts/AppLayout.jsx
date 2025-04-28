import React from 'react';
import HeaderNav from './HeaderNav';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <>
      <HeaderNav />
      <Outlet />
    </>
  );
}

export default AppLayout;
