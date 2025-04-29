import { Link } from 'react-router-dom';
import CartItem from '../features/cart/CartItem';
import Button from '../components/ui/Button';
import LinkButton from '../components/ui/LinkButton';

function Cart() {
  return (
    <div className='bg-base-200 min-h-screen px-4 py-8 sm:py-8 md:px-8'>
      <div className='m-auto max-w-4xl'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-between'>
            <h1 className='flex items-center gap-2 text-xl font-medium md:text-2xl'>
              Cart
              <span className='text-sm'> (6 items)</span>
            </h1>
            <LinkButton to='/menu'>Back to Menu</LinkButton>
          </div>
          <div className='secondary sm:rounded-xl sm:border sm:border-s sm:p-4'>
            <div className='flex flex-col gap-4'>
              <table className='table-xs sm:table-sm md:table-md table'>
                <thead>
                  <tr>
                    <th className='text-left'>Item</th>
                    <th className='text-center'>QTY</th>
                    <th className='text-center'>Price</th>
                    <th className='text-right'></th>
                  </tr>
                </thead>
                <tbody>
                  <CartItem />
                  <CartItem />
                  <CartItem />
                </tbody>
              </table>
            </div>
          </div>
          <div className='space-y-3 sm:space-y-0 sm:space-x-3'>
            <Button type='primary' to='/order/new'>
              Proceed to Checkout
            </Button>
            <Button type='secondary'>Clear Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
