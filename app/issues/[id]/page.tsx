import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { FC } from "react";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface Props {
  params: { id: string };
}

const IssueDetailsPage: FC<Props> = async ({ params }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
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
              <EditButton issueId={issue.id} />
              <DeleteButton issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>
    );
  }
};

export default IssueDetailsPage;
