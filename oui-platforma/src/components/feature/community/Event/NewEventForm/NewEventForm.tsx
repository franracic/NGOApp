import { IEvent } from "@/typings/course";
import { Button, Card, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export const NewEventForm = ({
  addEvent,
}: {
  addEvent: (event: IEvent) => void;
}) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const newEvent: IEvent = {
      id: Math.random(), // Use a proper ID generator in a real app
      name,
      date: new Date(date),
      description,
      attendees: 0,
      level: 10,
    };
    addEvent(newEvent);
    setName("");
    setDate("");
    setDescription("");
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
        type="date"
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
      <Button onClick={handleSubmit} variant="light">
        Create Event
      </Button>
    </Card>
  );
};
