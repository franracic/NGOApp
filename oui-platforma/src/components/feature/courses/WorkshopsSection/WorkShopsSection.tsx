import { Hero } from "@/components/core/Hero/Hero";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { ICourse } from "@/typings/course";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import useSWR from "swr";
import { CourseCard } from "../CourseCard/CourseCard";

export const WorkshopSection = () => {
  const { data: workshops, error: workshopsError } = useSWR(
    swrKeys.workshops,
    fetcher<ICourse[]>
  );
  const { data: exams, error: examsError } = useSWR(
    swrKeys.exams,
    fetcher<ICourse[]>
  );
  console.log(swrKeys.workshops, swrKeys.exams);

  if (workshopsError || examsError) return <div>Failed to load lectures.</div>;
  if (!workshops && !exams) return <div>Loading lectures...</div>;
  const inProgressLectures = [
    ...(workshops?.filter((course) => !course.is_completed) || []),
    ...(exams?.filter((course) => !course.is_completed) || []),
  ];
  const completedLectures = [
    ...(workshops?.filter((course) => course.is_completed) || []),
    ...(exams?.filter((course) => course.is_completed) || []),
  ];

  return (
    <Flex direction="column" justifyContent="center" pb={8}>
      <Hero
        headingText="Workshops"
        subheadingText="Hands-on Learning"
        bodyText="Join interactive workshops to gain practical experience and enhance your skills."
        img_url="https://images.unsplash.com/photo-1659301254614-8d6a9d46f26a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      {inProgressLectures.length > 0 && (
        <Box p={4}>
          <Heading size="lg" mb={4}>
            In-progress Workshops
          </Heading>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {inProgressLectures.map((course) => (
              <CourseCard key={course.id} {...course} link={true} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {completedLectures.length > 0 && (
        <Box p={4} mt={8}>
          <Heading size="lg" mb={4}>
            Completed Workshops
          </Heading>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
            {completedLectures.map((course) => (
              <CourseCard key={course.id} {...course} link={false} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Flex>
  );
};
