import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoPerson } from 'react-icons/io5';
import { writeFullName } from '../user/userSlice';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';

function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    dispatch(writeFullName(fullName));
    navigate('/menu');
  }

  return (
    <div className='w-full px-4 py-4 sm:px-8'>
      <p className='text-accent mb-5 font-medium'>
        So, who's life are we gonna ruin today?
      </p>
      <form
        className='flex flex-col items-center justify-center gap-4 sm:flex-row'
        onSubmit={handleSubmit}
      >
        <div className='w-full'>
          <InputField
            name='fullName'
            icon={<IoPerson />}
            placeholder='Enter full name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        {fullName !== '' && <Button type='primary'>Get Started</Button>}
      </form>
    </div>
  );
}

export default CreateUser;
