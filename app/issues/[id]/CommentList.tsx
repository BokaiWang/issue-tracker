import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Text } from "@radix-ui/themes";
import React, { FC } from "react";
import Markdown from "react-markdown";

interface Props {
  issueId: number;
}

const CommentList: FC<Props> = async ({ issueId }) => {
  const comments = await prisma.comment.findMany({
    where: { issueId },
    include: {
      user: true,
    },
  });
  if (!comments) {
    return null;
  }
  return (
    <>
      {comments.map((comment) => (
        <Card key={comment.id} mt="4">
          <Flex align="center" gap="3">
            <Avatar
              src={comment.user.image!}
              fallback="?"
              size="2"
              radius="full"
            />
            <Text>{comment.user.name}</Text>
            <Text>{comment.createdAt.toLocaleTimeString()}</Text>
            <Text>
              {comment.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Flex>
          <Markdown>{comment.description}</Markdown>
        </Card>
      ))}
    </>
  );
};

export default CommentList;
