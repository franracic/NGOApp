import { IEvent } from "@/typings/course";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { EventDetails } from "../EventDetails/EventDetails";
import { NewEventForm } from "../NewEventForm/NewEventForm";

export const mockEvents: IEvent[] = [
  {
    id: 1,
    name: "STEAM Education Webinar",
    date: new Date(),
    description:
      "An introductory webinar on integrating STEAM education into the classroom, with a focus on creative approaches.",
    attendees: 150,
    level: 7,
  },
  {
    id: 2,
    name: "Growth Mindset Workshop",
    date: new Date(),
    description:
      "A hands-on workshop focused on developing a growth mindset among students, with practical strategies and activities.",
    attendees: 80,
    level: 5,
  },
  {
    id: 3,
    name: "Experiential Learning Conference",
    date: new Date(),
    description:
      "Join educators and thought leaders to explore the latest trends and best practices in experiential learning.",
    attendees: 200,
    level: 8,
  },
  {
    id: 4,
    name: "Arts Integration in STEAM",
    date: new Date(),
    description:
      "A workshop dedicated to incorporating arts into STEM education to create a holistic STEAM curriculum.",
    attendees: 120,
    level: 6,
  },
  {
    id: 5,
    name: "Project-Based Learning Bootcamp",
    date: new Date(),
    description:
      "An intensive bootcamp where educators can learn to implement project-based learning effectively in their classrooms.",
    attendees: 60,
    level: 7,
  },
];

export const EventList = () => {
  const [events, setEvents] = useState<IEvent[]>(mockEvents);

  const addEvent = (newEvent: IEvent) => {
    setEvents([newEvent, ...events]);
  };

  return (
    <VStack spacing={8}>
      <NewEventForm addEvent={addEvent} />
      {events.map((event) => (
        <EventDetails key={event.id} event={event} />
      ))}
    </VStack>
  );
};
