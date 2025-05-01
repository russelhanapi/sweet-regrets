import { useSelector } from 'react-redux';
import { formatCurrency } from '../../../utils/helpers';
import { getQuantityByID } from '../cartSlice';
import UpdateItemQuantity from '../components/UpdateItemQuantity';
import DeleteItem from '../components/DeleteItem';

function CartItem({ item }) {
  const { id, name, totalPrice } = item;
  const currentItemQuantity = useSelector(getQuantityByID(id));

  return (
    <tr className='hover:bg-secondary/35'>
      <th>{name}</th>
      <td className='text-center'>
        <UpdateItemQuantity
          itemId={id}
          currentItemQuantity={currentItemQuantity}
        />
      </td>
      <td className='text-center'>{formatCurrency(totalPrice)}</td>
      <td className='text-center'>
        <DeleteItem itemId={id} />
      </td>
    </tr>
  );
}

export default CartItem;
