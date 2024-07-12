import React from "react";
import { AreaChart, getFilteredChartTooltipPayload } from "@mantine/charts";
import { Paper, Text } from "@mantine/core";

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" w={170} withBorder shadow="md" radius="sm">
      <Text fw={500} mb={5} fz="lg">
        {label}
      </Text>
      {getFilteredChartTooltipPayload(payload).map((item: any) => (
        <Text
          key={item.name}
          c={item.color}
          fz="sm"
          className="flex justify-between"
        >
          {item.name} <p>{item.value}</p>
        </Text>
      ))}
    </Paper>
  );
}

type statisticProps = {
  articleViewsWithDate:
    | {
        views: number;
        ups: number;
        date: string;
      }[]
    | null;
};

const StatisticChart: React.FC<statisticProps> = ({ articleViewsWithDate }) => {
  if (!articleViewsWithDate) return;
  return (
    <AreaChart
      h={300}
      data={articleViewsWithDate}
      dataKey="date"
      strokeDasharray="2 2"
      tickLine="xy"
      curveType="linear"
      connectNulls
      tooltipAnimationDuration={300}
      tooltipProps={{
        content: ({ label, payload }) => (
          <ChartTooltip label={label} payload={payload} />
        ),
      }}
      series={[
        { name: "views", color: "red" },
        { name: "ups", color: "blue" },
      ]}
    />
  );
};

export default StatisticChart;
