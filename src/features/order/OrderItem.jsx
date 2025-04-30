import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item }) {
  const {
    menu: { name: itemName },
    quantity,
    total_price: totalPrice,
  } = item;

  return (
    <tr>
      <td>{itemName}</td>
      <td className='text-center'>{quantity}</td>
      <td className='text-right'>{formatCurrency(totalPrice)}</td>
    </tr>
  );
}

export default OrderItem;
