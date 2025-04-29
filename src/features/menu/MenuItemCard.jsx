import {
  IoAddOutline,
  IoCart,
  IoRemoveOutline,
  IoTrash,
} from 'react-icons/io5';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

function MenuItemCard({ item }) {
  const {
    name,
    description,
    calories,
    price,
    image_url: imageUrl,
    category,
    available,
  } = item;

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
            backgroundImage: `url(https://bakewithshivesh.com/wp-content/uploads/2020/09/IMG-8129-1-scaled.jpg)`,
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
                {price} <span className='text-base-300 mx-2'>|</span> {calories}{' '}
                kcal
              </p>
            ) : (
              <p className='text-xs font-medium uppercase sm:text-base'>
                Unavailable
              </p>
            )}

            <div className='card-actions items-center justify-end'>
              <div className='flex items-center justify-center gap-2'>
                {/* <Button type='secondary' isSmall={true} isFullWidth={false}>
                  <IoAddOutline />
                </Button>
                <p className='font-medium'>1</p>
                <Button type='secondary' isSmall={true} isFullWidth={false}>
                  <IoRemoveOutline />
                </Button>*/}
              </div>
              {/* <Button type='neutral' isSmall={true} isFullWidth={false}>
                <IoTrash />
              </Button> */}
              {available && (
                <Button type='primary' isSmall={true} isFullWidth={false}>
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
