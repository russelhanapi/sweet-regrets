import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const className = 'link text-primary text-sm md:text-base';

  if (to === '-1')
    return (
      <Link to={() => navigate(-1)} className={className}>
        {children}
      </Link>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
