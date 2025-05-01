import { IoCart } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getQuantityByID } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from '../cart/components/DeleteItem';
import UpdateItemQuantity from '../cart/components/UpdateItemQuantity';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

function MenuItemCard({ item }) {
  const {
    id,
    name,
    description,
    calories,
    price,
    image_url: imageUrl,
    category,
    available,
  } = item;

  const dispatch = useDispatch();
  const currentItemQuantity = useSelector(getQuantityByID(id));
  const isInCart = currentItemQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      id,
      name,
      quantity: 1,
      price,
      totalPrice: price,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li
      className={`card bg-base-100 ${available ? 'hover:bg-secondary/35' : ''} border-base-300 w-full rounded-none border-b-2 sm:rounded-[var(--radius-box)] sm:border-t-2 sm:border-r-2 sm:border-l-2`}
    >
      <div
        className={`card-body flex gap-4 sm:flex-row ${!available ? 'opacity-70 grayscale' : ''}`}
      >
        <div
          className='border-base-300 h-50 w-full rounded-sm border-2 bg-cover bg-center sm:h-full sm:w-24 sm:rounded-2xl'
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        <div className='grow'>
          <div className='flex justify-between'>
            <h2 className='card-title'>{name}</h2>
            <Badge>{category}</Badge>
          </div>
          <p className='mt-1'>{description}</p>
          <div className='mt-2 flex items-center justify-between'>
            {available ? (
              <p className='text-accent grow font-medium'>
                {formatCurrency(price)}{' '}
                <span className='text-base-300 mx-2'>|</span> {calories} kcal
              </p>
            ) : (
              <p className='text-xs font-medium uppercase sm:text-base'>
                Unavailable
              </p>
            )}

            <div className='card-actions items-center justify-end'>
              {isInCart && (
                <>
                  <UpdateItemQuantity
                    itemId={id}
                    currentItemQuantity={currentItemQuantity}
                  />
                  <DeleteItem itemId={id} />
                </>
              )}

              {available && !isInCart && (
                <Button
                  type='primary'
                  isSmall={true}
                  isFullWidth={false}
                  onClick={handleAddToCart}
                >
                  <IoCart />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItemCard;
