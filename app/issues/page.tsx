import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { FC } from "react";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage: FC<Props> = async ({ searchParams }) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const assignedToUserId = searchParams?.assignee
    ? searchParams.assignee
    : undefined;

  const where = { status, assignedToUserId };

  const orderByParams = searchParams?.orderBy?.split(":");
  const orderBy =
    orderByParams && columnNames.includes(orderByParams[0] as keyof Issue)
      ? { [orderByParams[0]]: orderByParams[1] }
      : undefined;

  const pageSize = searchParams.pageSize ? parseInt(searchParams.pageSize) : 10;
  const page = parseInt(searchParams.page) || 1;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      assignedToUser: {
        select: {
          name: true,
        },
      },
    },
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracke - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
