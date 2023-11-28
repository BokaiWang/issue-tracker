import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Section } from "@radix-ui/themes";

const IssueDetailsLoadingPage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex my="2" gap="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
      <Section size="1">
        <Flex direction="column" gap="3">
          <Skeleton width="8rem" />
          <Skeleton count={5} />
        </Flex>
      </Section>
    </Box>
  );
};

export default IssueDetailsLoadingPage;
