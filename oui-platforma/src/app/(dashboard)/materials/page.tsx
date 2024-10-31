import { ResourceLayout } from "@/components/feature/resources/ResourceLayout/ResourceLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Materials - Resources and Guides",
  description: "Find a collection of useful resources and guides.",
};

export default function Materials() {
  return <ResourceLayout />;
}
