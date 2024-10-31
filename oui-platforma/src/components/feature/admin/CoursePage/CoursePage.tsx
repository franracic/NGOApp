// "use client";
// import { ICourseSection } from "@/typings/course";
// import { Box } from "@chakra-ui/react";
// import { useState } from "react";
// import { CourseForm } from "../CourseForm/CourseForm";

// export const CoursePage = ({ courseId }: { courseId?: string }) => {
//   const [sections, setSections] = useState<ICourseSection[]>([]);

//   const addSection = (section: ICourseSection) => {
//     setSections([...sections, section]);
//   };

//   return (
//     <Box
//       position="relative"
//       h="100vh"
//       w="full"
//       rounded="2xl"
//       bg="gray.100"
//       p={6}
//     >
//       <Box mb={4}>
//         <CourseForm courseId={courseId} />
//       </Box>
//     </Box>
//   );
// };
