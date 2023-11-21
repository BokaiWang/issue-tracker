"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, XAxis, YAxis, BarChart, Bar } from "recharts";
import React, { FC } from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart: FC<Props> = ({ open, inProgress, closed }) => {
  const data: { label: string; value: number }[] = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" style={{ fill: "var(--accent-9)" }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
