import { useRouteError } from 'react-router-dom';
import LinkButton from '../components/ui/LinkButton';

function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className='bg-secondary text-secondary-content min-h-screen px-4 py-8 sm:py-8 md:px-8'>
      <h1 className='mb-4 text-2xl font-medium sm:text-4xl'>
        Oops! That didn’t work 😅
      </h1>
      <p className='mb-4'>
        {error.status} {error.data}
      </p>
      <LinkButton to='-1'>Go Back</LinkButton>
    </div>
  );
}

export default Error;
