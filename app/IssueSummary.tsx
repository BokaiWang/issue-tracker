import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import NavLink from "next/link";
import React, { FC } from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary: FC<Props> = ({ open, inProgress, closed }) => {
  const statusSections: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="3">
      {statusSections.map((section) => (
        <Card key={section.label} className="flex-1">
          <Flex direction="column">
            <NavLink
              className="text-sm font-medium"
              href={`/issues?status=${section.status}`}
            >
              {section.label}
            </NavLink>
            <Text size="5" className="font-bold">
              {section.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
