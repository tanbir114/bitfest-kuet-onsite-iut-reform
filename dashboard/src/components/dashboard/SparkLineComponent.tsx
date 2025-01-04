import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useAppSelector } from '../../redux/hook';
import { useGetImproveByAuthorQuery } from '../../redux/features/improvement/improveApi';
import { processDataSparkLine } from '../../utils/graphDataProcess';

export default function SparkLineComponent() {
    const user = useAppSelector((state) => state.auth.user);
    const userId = user?.id || '';

    const { data: contributions } = useGetImproveByAuthorQuery(userId);
    const { pData, xLabels } = processDataSparkLine(contributions?.data || []);
    return (
        <BarChart
            width={500}
            height={300}
            series={[
                {
                    data: pData,
                    label: 'Montly Contribution',
                    id: 'pvId',
                    stack: 'total',
                },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
            className="bg-gray-100"
        />
    );
}
