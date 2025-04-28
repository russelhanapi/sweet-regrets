import React from 'react';

function Badge({ children }) {
  return (
    <div className='badge badge-outline badge-accent badge-md uppercase'>
      {children}
    </div>
  );
}

export default Badge;
