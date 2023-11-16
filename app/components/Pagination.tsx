"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination: FC<Props> = ({ itemCount, pageSize, currentPage }) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  if (pageCount <= 1) {
    return null;
  }
  return (
    <Flex align="center" gap="3">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => onChangePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => onChangePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        variant="soft"
        color="gray"
        disabled={currentPage === pageCount}
        onClick={() => onChangePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
