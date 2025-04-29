import MenuItemCard from '../features/menu/MenuItemCard';
import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../services/apiBakery';

function Menu() {
  const menu = useLoaderData();

  return (
    <div className='bg-base-200 min-h-screen sm:px-4 sm:py-8 md:px-8'>
      <div className='max-container'>
        {/* <h1 className=''>Menu</h1> */}
        <ul className='grid grid-cols-1 sm:gap-4 lg:grid-cols-2 lg:gap-6'>
          {menu.map((menuItem) => (
            <MenuItemCard item={menuItem} key={menuItem.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
