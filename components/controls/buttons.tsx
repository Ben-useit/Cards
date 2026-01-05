'use client';

import Loading from '../Loading';

export const StandardButton = ({
  label,
  isPending,
  onClickAction,
}: {
  label?: string;
  isPending: boolean;
  onClickAction: () => void;
}) => {
  return (
    <button
      type='button'
      disabled={isPending}
      onClick={() => onClickAction()}
      className={`w-1/2 my-2 p-4 ${
        !isPending && 'hover:bg-gray-700'
      } text-white rounded-lg shadow-lg bg-gray-600  text-lg font-bold flex items-center justify-center space-x-2`}
    >
      {/* {isPending && !canceled ? '...processing' : submitButtonLabel} */}
      {label || 'Close'}
    </button>
  );
};

export const SubmitButton = ({
  label,
  isPending,
  style,
}: {
  label?: string;
  isPending: boolean;
  style?: string;
}) => {
  return (
    <button
      type='submit'
      disabled={isPending}
      className={`w-1/2 my-2 p-4 ${
        isPending ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'
      } text-white rounded-lg shadow-lg  text-lg font-bold flex items-center justify-center space-x-2 ${style}`}
    >
      {/* {isPending && !canceled ? '...processing' : submitButtonLabel} */}
      {isPending ? <Loading /> : label || 'Submit'}
    </button>
  );
};
