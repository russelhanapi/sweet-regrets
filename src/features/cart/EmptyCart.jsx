import LinkButton from '../../components/ui/LinkButton';

function EmptyCart() {
  return (
    <div className='bg-base-200 min-h-full px-4 py-8 sm:py-8 md:px-8'>
      <div className='flex flex-col gap-6'>
        <LinkButton to='/menu'>Back to Menu</LinkButton>
        <h1 className='mb-4 text-2xl/10 font-medium sm:text-4xl/16'>
          Your cart is empty...
          <br /> That's suspicious... 👀
        </h1>
      </div>
    </div>
  );
}

export default EmptyCart;
