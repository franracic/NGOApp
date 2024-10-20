"use client";

import { WorkshopSection } from "@/components/feature/courses/WorkshopsSection/WorkShopsSection";
import { mockCourses } from "@/components/feature/mock/mockCourses";
import { Spinner, VStack } from "@chakra-ui/react";

export default function Page() {
  if (!mockCourses) {
    return (
      <VStack py={16}>
        <Spinner size="xl" />
      </VStack>
    );
  }
  return <WorkshopSection />;
}
