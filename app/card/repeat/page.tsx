import FlipCard from '@/components/FlipCard';

const RepeatPage = () => {
  return (
    <div>
      <FlipCard redirectTo='/card/repeat' repeat={true} />
    </div>
  );
};
export default RepeatPage;
