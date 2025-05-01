import { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  getCart,
  getTotalCartQuantity,
} from '../features/cart/cartSlice';
import CartItem from '../features/cart/components/CartItem';
import Button from '../components/ui/Button';
import LinkButton from '../components/ui/LinkButton';
import Loader from '../components/ui/Loader';

const EmptyCart = lazy(() => import('../features/cart/EmptyCart'));

function Cart() {
  const cart = useSelector(getCart);
  const numOfCartItem = useSelector(getTotalCartQuantity);
  const dispatch = useDispatch();

  if (!cart.length)
    return (
      <Suspense fallback={<Loader />}>
        <EmptyCart />
      </Suspense>
    );
  return (
    <div className='bg-base-200 min-h-screen px-4 py-8 sm:py-8 md:px-8'>
      <div className='m-auto max-w-4xl'>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-between'>
            <h1 className='flex items-center gap-2 text-xl font-medium md:text-2xl'>
              Cart
              <span className='text-sm'> ({numOfCartItem} items)</span>
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
                  {cart.map((cartItem) => (
                    <CartItem item={cartItem} key={cartItem.id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='space-y-3 sm:space-y-0 sm:space-x-3'>
            <Button type='primary' to='/order/new'>
              Proceed to Checkout
            </Button>
            <Button type='secondary' onClick={() => dispatch(clearCart())}>
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
