const LoginForm = ({
  formAction,
}: {
  formAction: (payload: FormData) => void;
}) => {
  return (
    <div className='absolute z-20 flex top-[70%] right-1/4 w-96'>
      <div className='flex flex-col md:flex-row px-6'>
        {/* Login Form */}
        <div className='flex-1 flex'>
          <form
            action={formAction}
            className='bg-[#c0bcff] bg-opacity-30 backdrop-blur-md p-8 rounded-lg shadow-md space-y-4'
          >
            {status && <div className='text-blueColor'>{status}</div>}
            <input
              type='text'
              placeholder='Username'
              name='username'
              className='w-full px-4 py-2 rounded bg-white bg-opacity-70 focus:outline-none'
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              className='w-full px-4 py-2 rounded bg-white bg-opacity-70 focus:outline-none'
            />
            <button
              type='submit'
              // disabled={pending}
              className='w-full py-2 bg-white text-black font-semibold rounded opacity-80 hover:opacity-100'
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
