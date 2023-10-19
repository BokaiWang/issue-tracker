import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React, { FC } from "react";

interface Props {
  params: { id: string };
}

const IssueDetailsPage: FC<Props> = async ({ params }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  } else {
    return (
      <div>
        <Heading>{issue.title}</Heading>
        <Flex my="2" gap="3">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card>
          <p>{issue.description}</p>
        </Card>
      </div>
    );
  }
};

export default IssueDetailsPage;
