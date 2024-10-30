import { fetcher } from "@/fetchers/fetcher";
import { newEvent } from "@/fetchers/networking";
import { swrKeys } from "@/fetchers/swrKeys";
import { IEvent, IUser } from "@/typings/course";
import { SimpleGrid, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { EventDetails } from "../EventDetails/EventDetails";
import { NewEventForm } from "../NewEventForm/NewEventForm";

export const EventList = () => {
  const {
    data: events,
    error,
    mutate,
  } = useSWR(swrKeys.events, fetcher<IEvent[]>);
  const { data: currentUser } = useSWR(swrKeys.currentUser, fetcher<IUser>);
  const toast = useToast();

  const { trigger } = useSWRMutation(
    swrKeys.events,
    async (url, { arg: newEventData }: { arg: Partial<IEvent> }) => {
      await newEvent(newEventData);
    }
  );

  if (error) return <Text>Error loading events</Text>;
  if (!events) return <Spinner />;

  const addEvent = async (newEventData: Partial<IEvent>) => {
    try {
      await trigger(newEventData);
      mutate();
      toast({
        title: "Event Created",
        description: "Your event has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={8}>
      {(currentUser?.role === "admin" || currentUser?.role === "mentor") && (
        <NewEventForm addEvent={addEvent} />
      )}
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} w={"full"}>
        {events.map((event) => (
          <EventDetails key={event.id} event={event} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};
