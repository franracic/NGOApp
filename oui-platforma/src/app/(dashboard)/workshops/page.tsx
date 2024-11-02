import { WorkshopSection } from "@/components/feature/courses/WorkshopsSection/WorkShopsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workshops - Educational Sessions",
  description: "Browse through our workshops and educational sessions.",
};

export default function Page() {
  return <WorkshopSection />;
}
