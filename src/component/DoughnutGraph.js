import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {
    DoughnutController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

Chart.register(DoughnutController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DoughnutGraph = ({ income, expense }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');


        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }


        chartInstanceRef.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Income', 'Expense'],
                datasets: [
                    {
                        data: [income, expense],
                        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                cutout: '70%',
            },
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [income, expense]);

    return <div style={{ width: '350px', height: '250px' }}>
        <canvas ref={chartRef} />;</div>
};

export default DoughnutGraph;
