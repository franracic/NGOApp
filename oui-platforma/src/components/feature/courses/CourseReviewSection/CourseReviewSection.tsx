// "use client";
// import { INewReview, IReview } from "@/typings/show";
// import { Heading, Stack, VStack } from "@chakra-ui/react";
// import { ReviewList } from "../../review/ReviewList/ReviewList";
// import { ReviewForm } from "../ReviewForm/ReviewForm";

// interface IShowReviewSection {
//   reviews: IReview[];
//   addShowReview: (review: INewReview) => any;
//   id: string;
// }

// export const CourseReviewSection = ({
//   reviews,
//   addShowReview,
//   id,
// }: IShowReviewSection) => {
//   return (
//     <Stack
//       direction={{
//         base: "column",
//         md: "row",
//       }}
//       alignItems="stretch"
//       spacing={{
//         base: 4,
//         md: 24,
//       }}
//     >
//       <Heading size="lg">Reviews</Heading>
//       <VStack flexGrow={1} alignItems="stretch" spacing={16}>
//         <ReviewForm addShowReview={addShowReview} id={id} />
//         <ReviewList reviews={reviews} show_id={id} />
//       </VStack>
//     </Stack>
//   );
// };
