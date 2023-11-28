"use client";
import { Button, Callout, Section } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import React, { FC, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { commentSchema } from "../../validationSchemas";
import { z } from "zod";
import { Issue } from "@prisma/client";
import { ErrorMessage, Spinner } from "@/app/components";
import { useRouter } from "next/navigation";

interface Props {
  issue: Issue;
}

type CommentSchema = z.infer<typeof commentSchema>;

const CommentEditor: FC<Props> = ({ issue }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
  });

  const onSubmit: SubmitHandler<CommentSchema> = async (data, event) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/comments", { ...data, issueId: issue.id });
      setIsSubmitting(false);
      reset();
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred.");
    }
  };
  return (
    <Section size="1">
      {error && (
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>An unexpected error occurred.</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <SimpleMDE placeholder="Leave a comment..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Leave a comment {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Section>
  );
};

export default CommentEditor;
