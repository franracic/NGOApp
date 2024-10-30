"use client";
import { IDiscussion } from "@/typings/course";
import { Button, Card, Input, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";

export const NewDiscussionForm = ({
  addDiscussion,
}: {
  addDiscussion: (discussion: Partial<IDiscussion>) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newDiscussion: Partial<IDiscussion> = {
      title,
      description,
    };
    addDiscussion(newDiscussion);
    setTitle("");
  };

  return (
    <Card variant={"light"} w={"full"}>
      <Input
        placeholder="Discussion Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb={4}
      />
      <Textarea
        placeholder="Discussion description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mb={4}
        variant={"dark"}
      />
      <Button onClick={handleSubmit} variant="light">
        Start Discussion
      </Button>
    </Card>
  );
};
