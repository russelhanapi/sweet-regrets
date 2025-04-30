function Loader() {
  return (
    <div className='bg-base-300/50 absolute inset-0 z-10 flex items-center justify-center opacity-100 backdrop-blur-sm transition-opacity duration-300'>
      <span className='loading loading-spinner loading-xl'></span>
    </div>
  );
}

export default Loader;
