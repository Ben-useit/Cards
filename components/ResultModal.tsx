import Link from 'next/link';
import { HiOutlineHandThumbUp, HiOutlineHandThumbDown } from 'react-icons/hi2';

const ResultModal = ({
  correctAnswers,
  falseAnswers,
}: {
  correctAnswers: number;
  falseAnswers: number;
}) => {
  return (
    <div
      className='relative z-10'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div
        className='fixed inset-0 bg-gray-500/75 transition-opacity'
        aria-hidden='true'
      ></div>

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-fit items-end justify-center p-4 text-center mt-10'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all'>
            <div className='bg-white px-4 pb-4 pt-5'>
              <div className='flex justify-center items-center'>
                <div className='mt-3 text-center '>
                  <h3 className='text-2xl' id='modal-title'>
                    Result
                  </h3>
                  <div className='grid grid-cols-2 mt-2 '>
                    <div className='mx-auto p-4'>
                      <HiOutlineHandThumbUp color='green' size={60} />
                    </div>
                    <div className='mx-auto  p-4'>
                      <HiOutlineHandThumbDown color='red' size={60} />
                    </div>
                    <div className='text-4xl mx-auto'>{correctAnswers}</div>
                    <div className='text-4xl mx-auto'>{falseAnswers}</div>
                  </div>
                  <div className='mt-6 mb-4 w-[400px]'>
                    <button
                      type='button'
                      className='w-24 border text-2-xl rounded-md p-2 bg-yellow-300'
                    >
                      <Link href='/'>Continue</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResultModal;
