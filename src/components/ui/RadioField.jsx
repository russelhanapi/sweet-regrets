function RadioField({ name, value, register }) {
  return (
    <label className='flex items-center gap-2'>
      <input
        type='radio'
        {...(register && name && register(name))}
        value={value}
        className='accent-accent'
      />
      <span>{value.replace(value[0], value[0].toUpperCase())}</span>
    </label>
  );
}

export default RadioField;
