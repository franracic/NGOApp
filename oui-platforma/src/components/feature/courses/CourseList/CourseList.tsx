"use client";
import { ICourse } from "@/typings/course";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { CourseCard } from "../CourseCard/CourseCard";

interface CourseListProps {
  courses?: Array<ICourse>;
  maxCourses?: number;
  loading: boolean;
}

export const CourseList = ({ courses = [], maxCourses, loading }: CourseListProps) => {
  const displayedCourses = maxCourses ? courses.slice(0, maxCourses) : courses;

  return (
    <Flex direction="column" justifyContent="center">
      <SimpleGrid columns={[1, 2, 3]} spacing="6">
        {loading
          ? Array.from({ length: maxCourses || 3 }).map((_, index) => (
              <CourseCard key={index} loading />
            ))
          : displayedCourses.map((course) => (
              <CourseCard key={course.title} {...course} link={true} />
            ))}
      </SimpleGrid>
    </Flex>
  );
};
