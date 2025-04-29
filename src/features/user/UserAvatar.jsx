function UserAvatar({ fullName }) {
  const initial = fullName[0].toUpperCase();

  return (
    <div className='avatar avatar-placeholder'>
      <div className='bg-primary text-neutral-content w-10 rounded-full'>
        <span className='text-neutral-content text-xl'>{initial}</span>
      </div>
    </div>
  );
}

export default UserAvatar;
