import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";
import { FC } from "react";
import CommentEditor from "./CommentEditor";
import CommentList from "./CommentList";

interface Props {
  issue: Issue;
}

const IssueDetails: FC<Props> = ({ issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex my="2" gap="3">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <Markdown>{issue.description}</Markdown>
      </Card>
      <Heading as="h2" mt="4">
        Comments
      </Heading>
      <CommentEditor issue={issue} />
      <CommentList issueId={issue.id} />
    </>
  );
};

export default IssueDetails;
