import React from 'react';
import { IoPerson } from 'react-icons/io5';

function Home() {
  return (
    <div className='hero bg-base-200 min-h-screen'>
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
          <div className='w-full px-4 py-4 sm:px-8'>
            <p className='text-accent mb-5 font-medium'>
              So, who's life are we gonna ruin today?
            </p>
            <form className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <div className='w-full'>
                <label className='input w-full'>
                  <IoPerson />
                  <input type='search' required placeholder='Enter full name' />
                </label>
              </div>

              <button className='btn btn-primary w-full sm:w-auto'>
                Get Started
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
