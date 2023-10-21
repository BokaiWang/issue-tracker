import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FC } from "react";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";

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
          <IssueDetails issue={issue} />
        </Box>
        <Box>
          <EditButton issueId={issue.id} />
        </Box>
      </Grid>
    );
  }
};

export default IssueDetailsPage;
