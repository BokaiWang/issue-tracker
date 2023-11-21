import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  const inProgess = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} closed={closed} inProgress={inProgess} />
        <IssueChart open={open} closed={closed} inProgress={inProgess} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
