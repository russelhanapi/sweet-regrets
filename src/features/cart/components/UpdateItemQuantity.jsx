import { useDispatch } from 'react-redux';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import { increaseItemQuantity, decreaseItemQuantity } from '../cartSlice';
import Button from '../../../components/ui/Button';

function UpdateItemQuantity({ itemId, currentItemQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className='flex items-center justify-center gap-2'>
      <Button
        type='secondary'
        isSmall={true}
        isFullWidth={false}
        onClick={() => dispatch(increaseItemQuantity(itemId))}
      >
        <IoAddOutline />
      </Button>
      <p className='font-medium'>{currentItemQuantity}</p>
      <Button
        type='secondary'
        isSmall={true}
        isFullWidth={false}
        onClick={() => dispatch(decreaseItemQuantity(itemId))}
      >
        <IoRemoveOutline />
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
