import { InspirationSection } from "@/components/feature/inspiration/InspirationSection/InspirationSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inspiration - Ideas and Insights",
  description: "Explore a collection of inspiring ideas and insights.",
};

export default function Inspiration() {
  return <InspirationSection />;
}
