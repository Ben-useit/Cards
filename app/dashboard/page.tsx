import BarChart from '@/components/BarChart';
import { getStatusSummary } from '@/utils/actions';

const DashbordPage = async () => {
  const statusData = await getStatusSummary();
  const total = Object.values(statusData).reduce((p, n) => {
    return p + n;
  });
  return (
    <div className='text-center'>
      <h2>Cards: {total}</h2>
      <BarChart statusData={statusData} />
    </div>
  );
};
export default DashbordPage;
