const InputField = ({
  type,
  name,
  defaultValue,
  placeholder,
}: {
  type: string;
  name: string;
  defaultValue?: string | null | undefined;
  placeholder?: string | null | undefined;
}) => {
  return (
    <input
      type={type}
      name={name}
      defaultValue={defaultValue || ''}
      placeholder={placeholder || ''}
      className='border rounded-md bg-slate-100'
    />
  );
};
export default InputField;
