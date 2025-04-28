import { brandLogoMobile, brandLogoWeb } from '../../assets/images';
import { Link } from 'react-router-dom';

function ResponsiveLogo() {
  return (
    <div>
      <Link to='/'>
        <picture>
          {/* For larger screens (768px and up) */}
          <source media='(min-width: 768px)' srcSet={brandLogoWeb} />
          {/* Fallback for smaller screens (under 768px) */}
          <img src={brandLogoMobile} alt='Brand Logo' className='h-12' />
        </picture>
      </Link>
    </div>
  );
}

export default ResponsiveLogo;
