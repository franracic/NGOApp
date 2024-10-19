import { IDiscussion } from "@/typings/course";
import { Button, Card, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export const NewDiscussionForm = ({
  addDiscussion,
}: {
  addDiscussion: (discussion: IDiscussion) => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const newDiscussion: IDiscussion = {
      id: Math.random(), // Use a proper ID generator in a real app
      title,
      author: "Current User", // Replace with actual user data
      content,
      timestamp: new Date(),
    };
    addDiscussion(newDiscussion);
    setTitle("");
    setContent("");
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
        placeholder="Discussion Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        mb={4}
        variant={"dark"}
      />
      <Button onClick={handleSubmit} variant="light">
        Start Discussion
      </Button>
    </Card>
  );
};
