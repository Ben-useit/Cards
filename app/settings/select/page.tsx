import NothingToDo from '@/components/NothingToDo';
import { getLanguages } from '@/utils/actions';

const LanguageSelectPage = async () => {
  const languages = await getLanguages();

  if (languages.length === 0) return <NothingToDo />;

  return (
    <div>
      <form>
        <p className='text-2xl mb-2'>Please select your language pair:</p>
        {languages.map((item) => {
          return (
            <div className='mx-auto md:w-1/2' key={item.id}>
              <input
                type='radio'
                id={item.id}
                name='lang'
                //checked={item.selected}
              />
              <label htmlFor='age1' className='mx-4 text-xl'>
                {item.firstLanguage} - {item.secondLanguage}
              </label>
            </div>
          );
        })}
        <button
          type='submit'
          className='m-4 text-xl bg-blueColor text-white rounded-md px-4 py-1'
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default LanguageSelectPage;
