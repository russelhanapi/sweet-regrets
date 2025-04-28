import React from 'react';
import { Link } from 'react-router-dom';

function Button({ children, type, to }) {
  const base = 'btn';

  const style = {
    primary: base + ' btn-primary w-full sm:w-auto',
    secondary: base + ' btn-secondary w-full sm:w-auto',
    smallPrimary:
      base + ' btn-small btn-primary btn btn-sm btn-primary text-sm',
    smallSecondary:
      base + ' btn-small btn-secondary btn btn-sm btn-secondary text-sm',
    smallNeutral:
      base + ' btn-small btn-neutral btn btn-sm btn-neutral text-sm',
  };

  if (to)
    return (
      <Link to={to} className={style[type]}>
        {children}
      </Link>
    );

  return <button className={style[type]}>{children}</button>;
}

export default Button;
