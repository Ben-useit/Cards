import BarChart from '@/components/BarChart';
import { getStatusSummary } from '@/utils/actions';

const DashbordPage = async () => {
  const statusData = await getStatusSummary();
  const total = Object.values(statusData).reduce((p, n) => {
    return p + n;
  });
  const countInStock = statusData['-1'] || 0;
  const s = countInStock === 1 ? '' : 's';
  delete statusData['-1'];

  return (
    <div className='text-center'>
      <h2>Cards: {total}</h2>
      <BarChart statusData={statusData} />
      <div className='mt-4 text-xl'>
        {countInStock > 0 ? (
          <p>
            {countInStock} card{s} in stock
          </p>
        ) : (
          <p>No cards in stock</p>
        )}
      </div>
    </div>
  );
};
export default DashbordPage;
