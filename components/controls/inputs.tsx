'use client';

export const InputField = ({
  name,
  placeholder,
  style,
  defaultValue,
  readOnly,
  type,
}: {
  name: string;
  placeholder?: string;
  style?: string;
  defaultValue?: string;
  readOnly?: boolean;
  type?: 'text' | 'password' | 'number';
}) => {
  return (
    <input
      type={type || 'text'}
      name={name}
      readOnly={readOnly}
      disabled={readOnly}
      defaultValue={defaultValue}
      placeholder={placeholder}
      //value={formData.frontPronunciation || ''}
      className={`border h-rounded-md bg-slate-100 pl-3 w-full mt-4 ${
        style ? style : 'h-18.5'
      }`}
      //   onChange={(e) =>
      //     setFormData({
      //       ...formData,
      //       frontPronunciation: e.target.value,
      //     })
      //   }
    />
  );
};
export const RadioField = ({
  name,
  value,
  defaultChecked,
  placeholder,
}: {
  name: string;
  value: string;
  defaultChecked: boolean;
  placeholder?: string;
}) => {
  return (
    <input
      type='radio'
      name={name}
      value={value}
      placeholder={placeholder}
      defaultChecked={defaultChecked}
      className={`border rounded-md bg-slate-100 pl-3 w-full h-9 mt-4`}
    />
  );
};
export default InputField;
