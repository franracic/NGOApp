import { DiscussionDetails } from "@/components/feature/community/Discussion/DiscussionDetails/DiscussionDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discussion Details",
  description: "Explore detailed information about the discussion topic.",
};

export default function Page() {
  return <DiscussionDetails />;
}
