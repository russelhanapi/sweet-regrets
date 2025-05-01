import { IoSearch } from 'react-icons/io5';
import InputField from '../../../components/ui/InputField';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='w-full'>
        <InputField
          type='search'
          name='search'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<IoSearch />}
          placeholder='Enter order tracking #'
        />
      </div>
    </form>
  );
}

export default SearchOrder;
