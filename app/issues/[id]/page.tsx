import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Button, Card, Flex, Grid, Heading, Text, Box } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React, { FC } from "react";
import Markdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

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
      <Grid columns={{ initial: "1", md: "2" }} gap="3">
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex my="2" gap="3">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className="prose" mt="4">
            <Markdown>{issue.description}</Markdown>
          </Card>
        </Box>
        <Box>
          <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
        </Box>
      </Grid>
    );
  }
};

export default IssueDetailsPage;
