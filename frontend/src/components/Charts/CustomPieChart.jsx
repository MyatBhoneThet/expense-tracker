import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
    Tooltip,
    Label
} from 'recharts';

import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';


const CustomPieChart = ({
    data,
    label,
    colors,
    totalAmount,
}) => {
    return <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
                data={data}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
            >
                {data.map((entry,index) => (
                    <Cell key={`cell-${index}`}   fill={colors[index % colors.length]} />
                ))}
                {/* Custom center label */}
                <Label
                    value={label}
                    position="center"
                    fill="#444"
                    fontSize={14}
                    dy={-20}
                />
                <Label
                    value={totalAmount}
                    position="center"
                    fill="#222"
                    fontSize={24}
                    fontWeight={600}
                    dy={10}
                />
            </Pie>
            <Tooltip content ={<CustomTooltip />} />
            
            <Legend content ={<CustomLegend />} />
        </PieChart>
    </ResponsiveContainer>;
};

export default CustomPieChart;
