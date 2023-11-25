import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FC, cache } from "react";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { Metadata } from "next";
import StatusSelect from "./StatusSelect";

interface Props {
  params: { id: string };
}

const fetchIssue = cache(
  async (issueId: number) =>
    await prisma.issue.findUnique({
      where: { id: issueId },
    })
);

const IssueDetailsPage: FC<Props> = async ({ params }) => {
  const issue = await fetchIssue(parseInt(params.id));
  const session = await getServerSession(authOptions);

  if (!issue) {
    notFound();
  } else {
    return (
      <Grid columns={{ initial: "1", sm: "5" }} gap="3">
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>
        {session && (
          <Box>
            <Flex direction="column" gap="3">
              <AssigneeSelect issue={issue} />
              <StatusSelect issue={issue} />
              <EditButton issueId={issue.id} />
              <DeleteButton issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    );
  }
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: issue?.title,
    description: `Details of Issue ${issue?.id}`,
  };
};

export default IssueDetailsPage;
