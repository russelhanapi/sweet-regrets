import { Link } from 'react-router-dom';

function Button({
  children,
  type,
  to,
  isFullWidth = true,
  isSmall = false,
  onClick,
  disabled,
}) {
  const base = 'btn';
  const fullWidth = isFullWidth ? 'w-full sm:w-auto' : '';
  const small = isSmall ? 'btn-sm text-sm' : '';

  const style = {
    primary: base + ' btn-primary',
    secondary: base + ' btn-secondary',
    neutral: base + ' btn-neutral',
  };

  const className = `${style[type]} ${fullWidth} ${small}`;

  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button className={className} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}
export default Button;
