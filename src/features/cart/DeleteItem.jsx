import { IoTrash } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { deleteItem } from './cartSlice';
import Button from '../../components/ui/Button';

function DeleteItem({ itemId }) {
  const dispatch = useDispatch();

  return (
    <Button
      type='neutral'
      isSmall={true}
      isFullWidth={false}
      onClick={() => dispatch(deleteItem(itemId))}
    >
      <IoTrash />
    </Button>
  );
}

export default DeleteItem;
