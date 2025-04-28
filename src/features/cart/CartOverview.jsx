import Button from '../../components/ui/Button';

function CartOverview() {
  return (
    <div className='bg-neutral text-neutral-content/75'>
      <div className='max-container mx-auto flex items-center justify-between px-6 py-4 text-sm font-semibold tracking-wide'>
        <p className='flex flex-col sm:flex-row sm:items-center sm:space-x-6'>
          <span>3 items</span>
          <span>$30.00</span>
        </p>
        <Button to='/cart' type='secondary' isFullWidth={false}>
          Open Cart
        </Button>
      </div>
    </div>
  );
}

export default CartOverview;
