'use client';
export const SubmitButton = ({ isPending }: { isPending: boolean }) => {
  return (
    <button
      type='submit'
      disabled={isPending}
      className={`w-1/2 my-2 p-4 ${
        isPending ? 'bg-gray-200' : 'bg-green-600'
      } text-white rounded-lg shadow-lg hover:bg-green-700 text-lg font-bold flex items-center justify-center space-x-2`}
    >
      {/* {isPending && !canceled ? '...processing' : submitButtonLabel} */}
      Submit
    </button>
  );
};
export default SubmitButton;
