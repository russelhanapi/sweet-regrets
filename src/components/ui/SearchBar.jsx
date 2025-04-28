import { IoSearch } from 'react-icons/io5';

function SearchBar() {
  return (
    <form>
      <div className='w-full'>
        <label className='input w-full'>
          <IoSearch />
          <input
            type='search'
            required
            placeholder='Enter order tracking number'
          />
        </label>
      </div>
    </form>
  );
}

export default SearchBar;
