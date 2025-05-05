import { IoWarningOutline } from 'react-icons/io5';

function InputField({
  name,
  icon,
  placeholder,
  type = 'text',
  value,
  onChange,
  register,
  validation,
  errors,
  disabled,
}) {
  const hasError = Boolean(errors?.[name]);

  return (
    <div className='w-full'>
      <label
        htmlFor={name}
        className={`input w-full ${
          hasError ? 'border-error focus-within:ring-error' : ''
        }`}
      >
        {icon}
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...(register && name
            ? register(name, validation)
            : {
                name,
                value,
                onChange,
              })}
          disabled={disabled}
        />
      </label>

      {hasError && (
        <div className='text-error-content border-error bg-error/12 mt-2 flex items-center gap-2 rounded-lg border-l-4 p-2 text-sm'>
          <IoWarningOutline className='text-error' />
          <span className='text-neutral dark:text-neutral-content'>
            {errors[name]?.message}
          </span>
        </div>
      )}
    </div>
  );
}

export default InputField;
