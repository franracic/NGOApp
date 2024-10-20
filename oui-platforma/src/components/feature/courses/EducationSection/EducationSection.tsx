import { Hero } from "@/components/core/Hero/Hero";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { ICourse } from "@/typings/course";
import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { CourseCard } from "../CourseCard/CourseCard";

export const EducationSection = () => {
  const {
    data: lectures,
    error: lecturesError,
    isLoading: isLecturesLoading,
  } = useSWR(swrKeys.lectures, fetcher<ICourse[]>);

  const [inProgressLectures, setInProgressLectures] = useState<ICourse[]>([]);
  const [completedLectures, setCompletedLectures] = useState<ICourse[]>([]);

  useEffect(() => {
    if (lectures) {
      const inProgress = lectures.filter((course) => !course.completed);
      const completed = lectures.filter((course) => course.completed);

      setInProgressLectures(inProgress);
      setCompletedLectures(completed);
    }
  }, [lectures]);

  if (isLecturesLoading) return <div>Loading lectures...</div>;
  if (lecturesError) return <div>Failed to load lectures.</div>;

  return (
    <Flex direction="column" justifyContent="center" pb={8}>
      <Hero
        headingText="Education"
        subheadingText="Unlock Your Potential"
        bodyText="Explore a wide range of educational resources to boost your knowledge and skills."
        img_url="https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      {inProgressLectures.length > 0 && (
        <Box p={4}>
          <Heading size="lg" mb={4}>
            In-progress Lectures
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
            Completed Lectures
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
