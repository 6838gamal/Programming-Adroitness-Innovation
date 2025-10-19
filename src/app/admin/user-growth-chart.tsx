"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartData = [
  { month: 'January', users: 186 },
  { month: 'February', users: 305 },
  { month: 'March', users: 237 },
  { month: 'April', users: 173 },
  { month: 'May', users: 209 },
  { month: 'June', users: 214 },
];

const chartConfig = {
    users: {
        label: "New Users",
        color: "hsl(var(--chart-1))",
    },
};

export function UserGrowthChart() {
    return (
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="users" fill="var(--color-users)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
