import BarChart from '@/components/BarChart';
import { getStatusSummary, getStatusSummaryReverse } from '@/actions/card';
import { ArrowRight, Layers, FileStack } from 'lucide-react';
import Flag from 'react-world-flags';

const StatisticPage = async () => {
  const {
    statusData: statusDataFront,
    language,
    total,
    stock,
  } = await getStatusSummary();
  const { statusData: statusDataReverse } = await getStatusSummaryReverse();

  return (
    <div className='text-center m-6'>
      <div className='flex justify-center space-x-4'>
        <FileStack size={40} className='inline' />
        <span className='text-2xl'>{total}</span>
        <Layers size={40} className='inline' />
        <span className='text-2xl'>{stock}</span>
      </div>
      <div className='m-6'>
        <Flag
          code={language?.firstLanguage}
          fallback='--'
          style={{ display: 'inline', padding: '2px', height: '20px' }}
        />
        <ArrowRight size={20} className='inline' />
        <Flag
          code={language?.secondLanguage}
          fallback='--'
          style={{ display: 'inline', padding: '2px', height: '20px' }}
        />
      </div>
      <BarChart statusData={statusDataFront} />

      <div className='m-6'>
        <Flag
          code={language?.secondLanguage}
          fallback='--'
          style={{ display: 'inline', padding: '2px', height: '20px' }}
        />
        <ArrowRight size={20} className='inline' />
        <Flag
          code={language?.firstLanguage}
          fallback='--'
          style={{ display: 'inline', padding: '2px', height: '20px' }}
        />
      </div>
      <BarChart statusData={statusDataReverse} />
    </div>
  );
};
export default StatisticPage;
