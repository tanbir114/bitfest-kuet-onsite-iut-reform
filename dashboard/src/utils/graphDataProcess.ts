export function processDataSparkLine(data: any) {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const monthCounts: any = {};
    data.forEach((item: any) => {
        const updatedAt = new Date(item.updatedAt);
        const month = monthNames[updatedAt.getMonth()];
        monthCounts[month] = (monthCounts[month] || 0) + 1;
    });

    const xLabels = Object.keys(monthCounts);
    const pData = xLabels.map((month) => monthCounts[month]);

    return { pData, xLabels };
}
