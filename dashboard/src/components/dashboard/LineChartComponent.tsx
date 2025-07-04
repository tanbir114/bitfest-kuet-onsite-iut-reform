import {
    LineChart,
    AnimatedLine,
    AnimatedLineProps,
} from '@mui/x-charts/LineChart';
import { useChartId, useDrawingArea, useXScale } from '@mui/x-charts/hooks';
import { SxProps, Theme } from '@mui/system';
import { Fragment } from 'react/jsx-runtime';

interface CustomAnimatedLineProps extends AnimatedLineProps {
    limit?: number;
    sxBefore?: SxProps<Theme>;
    sxAfter?: SxProps<Theme>;
}

function CustomAnimatedLine(props: CustomAnimatedLineProps) {
    const { limit, sxBefore, sxAfter, ...other } = props;
    const { top, bottom, height, left, width } = useDrawingArea();
    const scale = useXScale();
    const chartId = useChartId();

    if (limit === undefined) {
        return <AnimatedLine {...other} />;
    }

    const limitPosition = scale(limit); // Convert value to x coordinate.

    if (limitPosition === undefined) {
        return <AnimatedLine {...other} />;
    }

    const clipIdleft = `${chartId}-${props.ownerState.id}-line-limit-${limit}-1`;
    const clipIdRight = `${chartId}-${props.ownerState.id}-line-limit-${limit}-2`;
    return (
        <Fragment>
            {/* Clip to show the line before the limit */}
            <clipPath id={clipIdleft}>
                <rect
                    x={left}
                    y={0}
                    width={limitPosition - left}
                    height={top + height + bottom}
                />
            </clipPath>
            {/* Clip to show the line after the limit */}
            <clipPath id={clipIdRight}>
                <rect
                    x={limitPosition}
                    y={0}
                    width={left + width - limitPosition}
                    height={top + height + bottom}
                />
            </clipPath>
            <g clipPath={`url(#${clipIdleft})`}>
                <AnimatedLine {...other} sx={sxBefore} />
            </g>
            <g clipPath={`url(#${clipIdRight})`}>
                <AnimatedLine {...other} sx={sxAfter} />
            </g>
        </Fragment>
    );
}

const LineChartComponent = () => {
    return (
        <LineChart
            series={[
                {
                    type: 'line',
                    data: [1, 2, 3, 4, 1, 2, 3, 4, 5],
                    valueFormatter: (v, i) =>
                        `${v}${i.dataIndex > 5 ? ' (estimated)' : ''}`,
                },
            ]}
            xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8] }]}
            height={300}
            width={500}
            slots={{ line: CustomAnimatedLine }}
            slotProps={{
                line: {
                    limit: 5,
                    sxAfter: { strokeDasharray: '10 5' },
                } as any,
            }}
            className="bg-gray-100"
        />
    );
};

export default LineChartComponent;
