import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";

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

  return <IssueSummary open={open} closed={closed} inProgress={inProgess} />;
}
