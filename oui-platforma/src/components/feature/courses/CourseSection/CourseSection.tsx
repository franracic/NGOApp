// "use client";

// import { ICourse } from "@/typings/course";
// import { INewReview, IReview } from "@/typings/show";
// import { Container, VStack } from "@chakra-ui/react";
// import { CourseDetails } from "../CourseDetails/CourseDetail";
// import { CourseReviewSection } from "../CourseReviewSection/CourseReviewSection";

// export default function CourseSection({
//   course,
//   reviews,
//   addCourseReview,
// }: {
//   course: ICourse;
//   reviews: IReview[];
//   addCourseReview: (review: INewReview) => void;
// }) {
//   const average_rating =
//     reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
//   return (
//     <Container maxW="100%" padding={8} p={0}>
//       <VStack alignItems="stretch" spacing={24}>
//         <CourseDetails {...course} average_rating={average_rating} />
//         <CourseReviewSection
//           reviews={reviews}
//           addShowReview={addCourseReview}
//           id={course.id}
//         />
//       </VStack>
//     </Container>
//   );
// }
