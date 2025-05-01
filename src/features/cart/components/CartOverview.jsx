import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalCartQuantity } from '../cartSlice';
import { formatCurrency } from '../../../utils/helpers';
import Button from '../../../components/ui/Button';

function CartOverview() {
  const numOfCartItem = useSelector(getTotalCartQuantity);
  const subtotal = useSelector(getTotalCartPrice);

  if (!numOfCartItem) return null;
  return (
    <div className='bg-neutral text-neutral-content'>
      <div className='max-container mx-auto flex items-center justify-between px-6 py-4 text-sm font-semibold tracking-wide'>
        <p className='flex flex-col sm:flex-row sm:items-center sm:space-x-6'>
          <span>{numOfCartItem} items</span>
          <span>{formatCurrency(subtotal)}</span>
        </p>
        <Button to='/cart' type='secondary' isFullWidth={false}>
          Open Cart
        </Button>
      </div>
    </div>
  );
}

export default CartOverview;
