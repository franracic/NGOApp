// "use client";
// import {
//   Badge,
//   Box,
//   Card,
//   CardBody,
//   Link,
//   Text,
//   VStack,
// } from "@chakra-ui/react";
// import { useContext, useEffect, useState } from "react";
// import { ReviewContext } from "../ReviewContext/ReviewContext";
// import { ReviewItem } from "../ReviewItem/ReviewItem";

// const getShow = async (showId: string) => {
//   const response = await fetch(`/api/shows/${showId}`);
//   return response.json();
// };

// export const RecentReviews = () => {
//   let email = "";
//   const authHeaderString = localStorage.getItem("auth-header");
//   if (authHeaderString) {
//     const authHeader = JSON.parse(authHeaderString);
//     email = authHeader.email;
//   }

//   const { newReviews } = useContext(ReviewContext);
//   const [showData, setShowData] = useState<{ [key: string]: any }>({});

//   useEffect(() => {
//     const fetchShowData = async () => {
//       const data: { [key: string]: any } = {};
//       for (const review of newReviews) {
//         if (!data[review.show_id]) {
//           const showResponse = await getShow(review.show_id);
//           data[review.show_id] = showResponse?.show;
//         }
//       }
//       setShowData(data);
//     };

//     fetchShowData();
//   }, [newReviews]);

//   return (
//     <>
//       <Card p={8}>
//         <CardBody>
//           <VStack spacing={0}>
//             <Text>Email:</Text>
//             <Text fontWeight={700}>{email}</Text>
//             <Text mt={10}>Notifications:</Text>

//             {newReviews.length > 0 ? (
//               <>
//                 <Text mt={10}>Recent Reviews:</Text>
//                 <Box width={"100%"}>
//                   {newReviews.map((review, index) => {
//                     const show = showData[review.show_id];
//                     return (
//                       <Box key={index}>
//                         <Link href={`/courses/${show?.id}`}>
//                           <Text>{show?.title}</Text>
//                         </Link>
//                         <ReviewItem
//                           {...review}
//                           user={{
//                             email: "",
//                             avatar: show?.image_url ?? "",
//                             username: show?.title,
//                           }}
//                         />
//                       </Box>
//                     );
//                   })}
//                 </Box>
//               </>
//             ) : (
//               <Badge colorScheme="red">No new Notifications</Badge>
//             )}
//           </VStack>
//         </CardBody>
//       </Card>
//     </>
//   );
// };
