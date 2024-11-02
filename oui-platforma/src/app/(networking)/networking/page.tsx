import { NetworkSection } from "@/components/feature/community/NetworkSection/NetworkSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Networking - Community Connections",
  description: "Engage with the community and build connections.",
};

export default function Page() {
  return <NetworkSection />;
}
