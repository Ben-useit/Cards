const InputField = ({
  type,
  name,
  defaultValue,
}: {
  type: string;
  name: string;
  defaultValue?: string;
}) => {
  return (
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      className='border rounded-md bg-slate-100'
    />
  );
};
export default InputField;
