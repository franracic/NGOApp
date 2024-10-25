import { completeContent, completeCourse } from "@/fetchers/courses";
import { swrKeys } from "@/fetchers/swrKeys";
import { ICourse, ICourseContent } from "@/typings/course";
import { Box, Button, Card, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { ContentRenderer } from "../ContentRenderer/ContentRenderer";
import { CourseContentSidebar } from "../CourseContentSidebar/CourseContentSidebar";
import { FeedbackModal } from "../FeedbackModal/FeedbackModal";
import { TabbedMenu } from "../TabbedMenu/TabbedMenu";

interface CoursePageProps {
  course: ICourse | null;
  courseError: any;
}

export const CoursePage: React.FC<CoursePageProps> = ({
  course,
  courseError,
}) => {
  const [selectedContent, setSelectedContent] = useState<ICourseContent | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isContentCompleted, setIsContentCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (course && course.sections) {
      const firstIncompleteContent = course.sections
        .flatMap((section) => section.contents)
        .find((content) => !content.is_completed);
      setSelectedContent(
        firstIncompleteContent || course.sections[0].contents[0] || null
      );
      setIsContentCompleted(false);
    }
  }, [course]);

  const { trigger: triggerCompleteContent } = useSWRMutation(
    swrKeys.completeContent(selectedContent?.id || -1),
    async () => {
      if (selectedContent) {
        await completeContent(selectedContent.id);
      }
    },
    {
      onSuccess: () => {
        mutate(swrKeys.courses);
        setIsContentCompleted(true);
      },
      onError: (error) => {
        console.error("Error marking content as completed:", error);
      },
    }
  );

  const { trigger: triggerCompleteCourse } = useSWRMutation(
    swrKeys.completeCourse(course?.id || -1),
    async () => {
      if (course) {
        await completeCourse(course.id);
      }
    },
    {
      onSuccess: () => {
        mutate(`${swrKeys.courses}${course?.id}/`);
        mutate(swrKeys.lectures);
      },
      onError: (error) => {
        console.error("Error marking course as completed:", error);
      },
    }
  );

  const isAllContentCompleted = () => {
    if (course && course.sections) {
      const allContents = course.sections.flatMap(
        (section) => section.contents
      );
      return allContents.every((content) => content.is_completed);
    }
    return false;
  };

  const handleContentCompletion = () => {
    triggerCompleteContent();
  };

  const handleNextContent = () => {
    if (course && selectedContent) {
      const allContents = course.sections.flatMap(
        (section) => section.contents
      );
      const currentIndex = allContents.findIndex(
        (content) => content.id === selectedContent?.id
      );
      const nextContent = allContents[currentIndex + 1];

      if (nextContent && !nextContent.is_completed) {
        setSelectedContent(nextContent);
        setIsContentCompleted(false);
      } else {
        if (!isAllContentCompleted()) {
          const firstIncompleteContent = course.sections
            .flatMap((section) => section.contents)
            .find((content) => !content.is_completed);
          setSelectedContent(
            firstIncompleteContent || course.sections[0].contents[0] || null
          );
          setIsContentCompleted(false);
        }
      }
      if (isAllContentCompleted()) {
        triggerCompleteCourse();
        setIsFeedbackOpen(true);
      }
    }
  };

  if (!course) return <div>Loading course...</div>;
  if (courseError) return <div>Failed to load course.</div>;
  if (!selectedContent) return <div>No content available.</div>;

  return (
    <Flex direction="column" px={{ base: 4, md: 8 }} overflow="auto">
      <Flex flex="1" direction={{ base: "column", md: "row" }} gap={8}>
        <Box flex="2" py={{ base: 4, md: 8 }}>
          <Card variant={"light"} p={5}>
            <ContentRenderer
              content={selectedContent}
              onContentComplete={handleContentCompletion}
            />
            {isContentCompleted && (
              <Button mt={4} onClick={handleNextContent}>
                Next
              </Button>
            )}
          </Card>
          <TabbedMenu
            course={course}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </Box>
        <CourseContentSidebar
          courseSections={course.sections}
          selectedContent={selectedContent}
          setSelectedContent={setSelectedContent}
        />
      </Flex>
      <FeedbackModal
        isOpen={isFeedbackOpen}
        courseId={course.id}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </Flex>
  );
};
