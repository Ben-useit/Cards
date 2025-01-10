const TextArea = ({ name }: { name: string }) => {
  return (
    <textarea
      name={name}
      className='w-full h-32 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none'
      placeholder='Type something...'
    ></textarea>
  );
};
export default TextArea;
