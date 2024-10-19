"use client";
import { mockCourses } from "@/components/feature/mock/mockCourses";
import { ICourseContent } from "@/typings/course";
import { Box, Card, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCompletedVideos } from "../../courses/CompletedVideosContext/CompletedVideosContext";
import { ContentRenderer } from "../ContentRenderer/ContentRenderer";
import { CourseContentSidebar } from "../CourseContentSidebar/CourseContentSidebar";
import { FeedbackModal } from "../FeedbackModal/FeedbackModal";
import { TabbedMenu } from "../TabbedMenu/TabbedMenu";

export const CoursePage = ({ course = mockCourses[0] }) => {
  const courseSections = course.sections;
  const { completedVideos, addCompletedVideo } = useCompletedVideos();
  const [selectedContent, setSelectedContent] = useState<ICourseContent | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const [unlockedCourses, setUnlockedCourses] = useState(
    courseSections.map((section, index) => ({
      ...section,
      isUnlocked: index === 0,
    }))
  );

  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized) {
      const firstIncompleteContent = courseSections
        .flatMap((section) => section.contents)
        .find((content) => !completedVideos.has(content.title));

      if (firstIncompleteContent) {
        setSelectedContent(firstIncompleteContent);
      } else {
        setSelectedContent(courseSections[0].contents[0]);
      }

      setHasInitialized(true);
    }
  }, [hasInitialized, completedVideos, courseSections]);

  useEffect(() => {
    localStorage.setItem(
      "completedVideos",
      JSON.stringify(Array.from(completedVideos))
    );
  }, [completedVideos]);

  const handleContentCompletion = (contentTitle: string) => {
    addCompletedVideo(contentTitle);
    checkAndUnlockNextSection();
    setIsFeedbackOpen(true);
  };

  const checkAndUnlockNextSection = () => {
    const completedSections = unlockedCourses.filter((section) =>
      section.contents.every((content) => completedVideos.has(content.title))
    );

    const nextSectionIndex = completedSections.length;
    if (nextSectionIndex < unlockedCourses.length) {
      const updatedCourses = [...unlockedCourses];
      updatedCourses[nextSectionIndex].isUnlocked = true;
      setUnlockedCourses(updatedCourses);
    }
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    localStorage.setItem("activeTab", index.toString());
  };

  const handleNextContent = () => {
    setIsFeedbackOpen(false);
    const currentContentIndex = courseSections
      .flatMap((section) => section.contents)
      .findIndex((content) => content.title === selectedContent?.title);
    const nextContentIndex = currentContentIndex + 1;
    const nextContent = courseSections
      .flatMap((section) => section.contents)
      .find((_, index) => index === nextContentIndex);
    if (nextContent) {
      setSelectedContent(nextContent);
    }
  };

  if (!selectedContent) {
    return null;
  }

  return (
    <Flex direction="column" px={{ base: 4, md: 8 }} overflow="auto">
      <Flex flex="1" direction={{ base: "column", md: "row" }} gap={8}>
        <Box flex="2" py={{ base: 4, md: 8 }}>
          <Card variant={"light"} p={5}>
            <ContentRenderer
              content={selectedContent}
              onContentComplete={handleContentCompletion}
            />
          </Card>
          <TabbedMenu
            course={course}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </Box>
        <CourseContentSidebar
          courseSections={unlockedCourses}
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
          completedVideos={completedVideos}
        />
      </Flex>
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onNext={handleNextContent}
      />
    </Flex>
  );
};
