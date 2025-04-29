import CreateUser from '../features/user/CreateUser';

function Home() {
  return (
    <div className='hero bg-base-200 min-h-full'>
      <div className='hero-content text-center'>
        <div className='max-w-2xl sm:max-w-xl'>
          <h1 className='text-4xl/10 font-bold md:text-5xl/16'>
            Are you looking for a healthy option?
          </h1>
          <p className='py-6'>
            That’s cute... But no. We only serve happiness—glazed, frosted, and
            unapologetically rich. Our mission?{' '}
            <span className='italic'>
              To make you question your life choices after every bite.{' '}
            </span>
            (And maybe take a nap... Or cry... Either way, you’ll be back.)
          </p>
          <CreateUser />
        </div>
      </div>
    </div>
  );
}

export default Home;
