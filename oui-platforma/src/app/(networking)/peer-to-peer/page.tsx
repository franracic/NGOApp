import { PTPSection } from "@/components/feature/network/PTPSection/PTPSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peer-to-Peer Network",
  description: "Connect and collaborate with peers in the network.",
};

export default function PeerToPeer() {
  return <PTPSection />;
}
