import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Bargraph = ({ income, expense }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');


        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }


        chartInstanceRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expense'],
                datasets: [
                    {
                        label: 'Amount',
                        backgroundColor: ['#c6aedc', '#add8e6'],
                        data: [income, expense],
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [income, expense]);

    return <div style={{ width: '500px', height: '250px' }}>
        <canvas ref={chartRef} />;
    </div>
};

export default Bargraph;
