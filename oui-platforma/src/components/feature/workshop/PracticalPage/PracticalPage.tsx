// import { mockCourses } from "@/components/feature/mock/mockCourses";
// import { ICourseContent, ICourseSection } from "@/typings/course";
// import { Box, Flex } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { CourseContentSidebar } from "../../Course/CourseContentSidebar/CourseContentSidebar";
// import { FeedbackModal } from "../../Course/FeedbackModal/FeedbackModal";
// import { TabbedMenu } from "../../Course/TabbedMenu/TabbedMenu";
// import { mockPracticalCourse } from "../../Course/courseMock/practicalMock";
// import { useCompletedVideos } from "../../courses/CompletedVideosContext/CompletedVideosContext";
// import { PracticalContentRenderer } from "../PracticalContentRenderer/PracticalContentRenderer";
// const courseSections: ICourseSection[] = mockPracticalCourse;

// export const PracticalPage = ({ course = mockCourses[0] }) => {
//   const { completedVideos, addCompletedVideo } = useCompletedVideos();
//   const [selectedContent, setSelectedContent] = useState<ICourseContent | null>(
//     null
//   );
//   const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
//   const [unlockedCourses, setUnlockedCourses] = useState(
//     courseSections.map((section, index) => ({
//       ...section,
//       isUnlocked: index === 0,
//     }))
//   );

//   const [hasInitialized, setHasInitialized] = useState(false);

//   useEffect(() => {
//     if (!hasInitialized) {
//       const firstIncompleteContent = courseSections
//         .flatMap((section) => section.contents)
//         .find((content) => !completedVideos.has(content.title));

//       if (firstIncompleteContent) {
//         setSelectedContent(firstIncompleteContent);
//       } else {
//         setSelectedContent(courseSections[0].contents[0]);
//       }

//       setHasInitialized(true);
//     }
//   }, [hasInitialized, completedVideos]);

//   useEffect(() => {
//     localStorage.setItem(
//       "completedVideos",
//       JSON.stringify(Array.from(completedVideos))
//     );
//   }, [completedVideos]);

//   const handleContentCompletion = (contentTitle: string) => {
//     addCompletedVideo(contentTitle);
//     checkAndUnlockNextSection();
//     setIsFeedbackOpen(true);
//   };

//   const checkAndUnlockNextSection = () => {
//     const completedSections = unlockedCourses.filter((section) =>
//       section.contents.every((content) => completedVideos.has(content.title))
//     );

//     const nextSectionIndex = completedSections.length;
//     if (nextSectionIndex < unlockedCourses.length) {
//       const updatedCourses = [...unlockedCourses];
//       updatedCourses[nextSectionIndex].isUnlocked = true;
//       setUnlockedCourses(updatedCourses);
//     }
//   };

//   const handleTabChange = (index: number) => {
//     setActiveTab(index);
//     localStorage.setItem("activeTab", index.toString());
//   };

//   const handleNextContent = () => {
//     setIsFeedbackOpen(false);
//     const currentContentIndex = courseSections
//       .flatMap((section) => section.contents)
//       .findIndex((content) => content.title === selectedContent?.title);
//     const nextContentIndex = currentContentIndex + 1;
//     const nextContent = courseSections
//       .flatMap((section) => section.contents)
//       .find((_, index) => index === nextContentIndex);
//     if (nextContent) {
//       setSelectedContent(nextContent);
//     }
//   };

//   if (!selectedContent) {
//     return null;
//   }

//   return (
//     <Flex
//       h="100vh"
//       direction="column"
//       px={{ base: 4, md: 8 }}
//       py={{ base: 4, md: 8 }}
//       overflow="auto"
//     >
//       <Flex flex="1" direction={{ base: "column", md: "row" }} gap={8}>
//         <Box flex="2" p={4}>
//           <PracticalContentRenderer
//             content={selectedContent}
//             onContentComplete={handleContentCompletion}
//           />
//           <TabbedMenu
//             course={course}
//             activeTab={activeTab}
//             onTabChange={handleTabChange}
//           />
//         </Box>
//         <CourseContentSidebar
//           courseSections={unlockedCourses}
//           selectedContent={selectedContent}
//           setSelectedContent={setSelectedContent}
//           completedVideos={completedVideos}
//         />
//       </Flex>
//       <FeedbackModal
//         isOpen={isFeedbackOpen}
//         onClose={() => setIsFeedbackOpen(false)}
//         onNext={handleNextContent}
//       />
//     </Flex>
//   );
// };
