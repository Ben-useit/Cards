const InputField = ({
  type,
  name,
  defaultValue,
  placeholder,
  defaultChecked,
  value,
}: {
  type: string;
  name: string;
  defaultValue?: string | null | undefined;
  placeholder?: string | null | undefined;
  defaultChecked?: boolean;
  value?: string | null | undefined;
}) => {
  return (
    <input
      type={type}
      name={name}
      defaultChecked={defaultChecked || false}
      defaultValue={defaultValue || undefined}
      placeholder={placeholder || undefined}
      value={value || undefined}
      className='border rounded-md bg-slate-100'
    />
  );
};
export default InputField;
