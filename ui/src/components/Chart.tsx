import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import useSWR from 'swr';
import dayjs from 'dayjs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
export default function Chart() {
    const { data: unsortedData } = useSWR('/api/data')
    const tests = unsortedData && unsortedData.tests.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

    const labels = tests.map(test => dayjs(test.timestamp).format('hh:mm'));

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Download Speeds',
                data: tests ? tests.map(test => test.download.bandwidth / 125000) : [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                fill: true,
                label: 'Upload Speeds',
                data: tests ? tests.map(test => test.upload.bandwidth / 125000) : [],
                borderColor: 'rgb(100, 122, 235)',
                backgroundColor: 'rgba(100, 122, 235, 0.5)',
            },
        ],
    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
    };

    return <Line options={options} data={data} />;
}
