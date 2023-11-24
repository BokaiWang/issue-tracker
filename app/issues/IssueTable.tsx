import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import React, { FC, useState } from "react";
import { IssueStatusBadge, Link } from "../components";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

interface Column {
  label: string;
  value: keyof Issue;
  className?: string;
}

const IssueTable: FC<Props> = ({ searchParams, issues }) => {
  const orderByParams = searchParams?.orderBy?.split(":");
  const getNextOrderDirection = (column: Column) => {
    if (!orderByParams) {
      return "asc";
    } else {
      if (column.value !== orderByParams[0]) {
        return "asc";
      } else {
        if (orderByParams[1] === "asc") {
          return "desc";
        } else {
          return "asc";
        }
      }
    }
  };
  const getArrowDirection = (column: Column) => {
    if (orderByParams) {
      if (orderByParams[0] === column.value) {
        return orderByParams[1] === "asc" ? (
          <ArrowUpIcon className="inline" />
        ) : (
          <ArrowDownIcon className="inline" />
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column?.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: getNextOrderDirection(column)
                      ? `${column.value}:${getNextOrderDirection(column)}`
                      : null,
                  },
                }}
              >
                {column.label}
              </NextLink>
              {getArrowDirection(column)}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: Column[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created At",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
