import MenuItemCard from '../features/menu/MenuItemCard';

function Menu() {
  return (
    <div className='bg-base-200 min-h-screen sm:px-4 sm:py-8 md:px-8'>
      <div className='max-container'>
        {/* <h1 className=''>Menu</h1> */}
        <ul className='grid grid-cols-1 sm:gap-4 lg:grid-cols-2 lg:gap-6'>
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
        </ul>
      </div>
    </div>
  );
}

export default Menu;
