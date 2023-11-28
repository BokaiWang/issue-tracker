"use client";
import { Button, Section } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import React from "react";

const CommentEditor = () => {
  return (
    <Section size='1'>
      <SimpleMDE placeholder="Leave a comment..." />
      <Button onClick={() => console.log("clicked!")}>Leave a comment</Button>
    </Section>
  );
};

export default CommentEditor;
