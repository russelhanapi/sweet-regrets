import { IoAddOutline, IoRemoveOutline, IoTrash } from 'react-icons/io5';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';

function CartItem({ item }) {
  const { id, name, quantity, totalPrice } = item;
  return (
    <tr className='hover:bg-secondary/35'>
      <th>{name}</th>
      <td className='text-center'>
        <div className='flex items-center justify-center gap-2'>
          <Button type='secondary' isSmall={true} isFullWidth={false}>
            <IoAddOutline />
          </Button>
          <p className='font-medium'>{quantity}</p>
          <Button type='secondary' isSmall={true} isFullWidth={false}>
            <IoRemoveOutline />
          </Button>
        </div>
      </td>
      <td className='text-center'>{formatCurrency(totalPrice)}</td>
      <td className='text-center'>
        <DeleteItem itemId={id} />
      </td>
    </tr>
  );
}

export default CartItem;
