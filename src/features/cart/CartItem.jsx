import { IoAddOutline, IoRemoveOutline, IoTrash } from 'react-icons/io5';
import Button from '../../components/ui/Button';

function CartItem() {
  return (
    <tr className='hover:bg-secondary/35'>
      <th>#ITEMNAME# #ITEMNAME#</th>
      <td className='text-center'>
        <div className='flex items-center justify-center gap-2'>
          <Button type='secondary' isSmall={true} isFullWidth={false}>
            <IoAddOutline />
          </Button>
          <p className='font-medium'>1</p>
          <Button type='secondary' isSmall={true} isFullWidth={false}>
            <IoRemoveOutline />
          </Button>
        </div>
      </td>
      <td className='text-center'>#TOTALPRICE#</td>
      <td className='text-center'>
        <Button type='neutral' isSmall={true} isFullWidth={false}>
          <IoTrash />
        </Button>
      </td>
    </tr>
  );
}

export default CartItem;
