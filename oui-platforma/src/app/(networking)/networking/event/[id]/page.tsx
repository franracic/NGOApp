import { EventInfo } from "@/components/feature/community/Event/EventInfo/EventInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Details",
  description: "View detailed information about the selected event.",
};

export default function EventID() {
  return <EventInfo />;
}
