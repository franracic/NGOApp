// import { IReview } from "@/typings/show";
// import { HamburgerIcon } from "@chakra-ui/icons";
// import {
//   Avatar,
//   Box,
//   Button,
//   Flex,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuList,
//   Text,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { ReviewStarsValue } from "../ReviewStars/ReviewStarsValue";
// import { DeleteModal } from "./DeleteModal/DeleteModal";
// import { EditModal } from "./EditModal/EditModal";

// export const ReviewItem = ({ rating, comment, user, id, show_id }: IReview) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   let uid = "";
//   const authHeaderString = localStorage.getItem("auth-header");
//   if (authHeaderString) {
//     const authHeader = JSON.parse(authHeaderString);
//     uid = authHeader.uid;
//   }

//   return (
//     <Box
//       display={"flex"}
//       alignItems={"center"}
//       bg={"yellowLight"}
//       borderRadius={"lg"}
//       padding={4}
//       marginY={2}
//     >
//       <Avatar src={user.avatar} />
//       <Box padding={4}>
//         <Text fontSize={"sm"} color={"gray.400"}>
//           {user.email}
//         </Text>
//         <ReviewStarsValue value={rating} />
//       </Box>
//       <Text fontSize={"lg"} pl={5}>
//         {comment}
//       </Text>
//       {uid === user.email && (
//         <>
//           <Flex direction="column" ml={"auto"} gap={4}>
//             <Menu>
//               <MenuButton
//                 as={IconButton}
//                 aria-label="Options"
//                 icon={<HamburgerIcon />}
//                 variant="transparent"
//               />
//               <MenuList>
//                 <Button
//                   onClick={onOpen}
//                   size={"xs"}
//                   ml="auto"
//                   w={"100%"}
//                   mb={2}
//                   name="edit"
//                   color={"purpleLight"}
//                 >
//                   Edit
//                 </Button>

//                 <DeleteModal review_id={id} show_id={show_id} />
//               </MenuList>
//             </Menu>
//           </Flex>
//           <EditModal
//             isOpen={isOpen}
//             onClose={onClose}
//             comment={comment}
//             review_id={id}
//             rating={rating}
//             show_id={show_id}
//           />
//         </>
//       )}
//     </Box>
//   );
// };
