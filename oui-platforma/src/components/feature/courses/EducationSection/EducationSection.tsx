"use client";
import { Hero } from "@/components/core/Hero/Hero";
import { ICourse } from "@/typings/course";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { CourseCard } from "../CourseCard/CourseCard";

export const EducationSection = ({ courses }: { courses: Array<ICourse> }) => {
  const [unlockedCourses, setUnlockedCourses] = useState(
    courses
      .filter((course) => course.type === "Lecture")
      .map((course, index) => ({
        ...course,
        isUnlocked: index < 1,
      }))
  );

  const handleCourseCompletion = (courseId: string) => {
    const courseIndex = unlockedCourses.findIndex(
      (course) => course.id === courseId
    );

    if (courseIndex >= 0 && courseIndex < unlockedCourses.length - 1) {
      const newUnlockedCourses = [...unlockedCourses];
      newUnlockedCourses[courseIndex + 1].isUnlocked = true;
      setUnlockedCourses(newUnlockedCourses);
    }
  };

  return (
    <Flex direction="column" justifyContent="center" pb={8}>
      <Hero
        headingText="Education"
        subheadingText="Unlock Your Potential"
        bodyText="Explore a wide range of educational resources to boost your knowledge and skills."
        img_url="https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} p={4}>
        {unlockedCourses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            link={true}
            onComplete={() => handleCourseCompletion(course.id)}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};
