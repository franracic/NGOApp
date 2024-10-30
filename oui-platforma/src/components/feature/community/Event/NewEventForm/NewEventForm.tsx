import { IEvent } from "@/typings/course";
import { Button, Card, Input, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";

export const NewEventForm = ({
  addEvent,
}: {
  addEvent: (event: Partial<IEvent>) => void;
}) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    if (!name.trim() || !date.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and date are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);

    const newEvent: Partial<IEvent> = {
      name,
      date,
      description,
      tags,
    };
    addEvent(newEvent);
    setName("");
    setDate("");
    setDescription("");
    setTagsInput("");
  };

  return (
    <Card variant={"light"} w={"full"}>
      <Input
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        mb={4}
      />
      <Input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        mb={4}
      />
      <Textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mb={4}
      />
      <Input
        placeholder="Tags (comma separated)"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        mb={4}
      />
      <Button onClick={handleSubmit} variant="light">
        Create Event
      </Button>
    </Card>
  );
};
