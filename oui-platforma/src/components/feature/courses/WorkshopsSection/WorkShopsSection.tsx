import { Hero } from "@/components/core/Hero/Hero";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { ICourse } from "@/typings/course";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { CourseCard } from "../CourseCard/CourseCard";

export const WorkshopSection = () => {
  const {
    data: workshops,
    error: workshopsError,
    isLoading: isWorkshopsLoading,
  } = useSWR(swrKeys.workshops, fetcher<ICourse[]>);

  const [inProgressWorkshops, setInProgressWorkshops] = useState<ICourse[]>([]);
  const [completedWorkshops, setCompletedWorkshops] = useState<ICourse[]>([]);

  useEffect(() => {
    if (workshops) {
      const inProgress = workshops.filter((course) => !course.completed);
      const completed = workshops.filter((course) => course.completed);

      setInProgressWorkshops(inProgress);
      setCompletedWorkshops(completed);
    }
  }, [workshops]);

  if (isWorkshopsLoading) return <div>Loading workshops...</div>;
  if (workshopsError) return <div>Failed to load workshops.</div>;

  return (
    <Flex direction="column" justifyContent="center" pb={8}>
      <Hero
        headingText="Workshops"
        subheadingText="Hands-on Learning"
        bodyText="Join interactive workshops to gain practical experience and enhance your skills."
        img_url="https://images.unsplash.com/photo-1659301254614-8d6a9d46f26a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      {inProgressWorkshops.length > 0 && (
        <Box p={4}>
          <Heading size="lg" mb={4}>
            In-progress Workshops
          </Heading>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {inProgressWorkshops.map((course) => (
              <CourseCard key={course.id} {...course} link={true} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {completedWorkshops.length > 0 && (
        <Box p={4} mt={8}>
          <Heading size="lg" mb={4}>
            Completed Workshops
          </Heading>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {completedWorkshops.map((course) => (
              <CourseCard key={course.id} {...course} link={false} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Flex>
  );
};
