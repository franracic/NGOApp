// import { deleteReview } from "@/fetchers/reviews";
// import { swrKeys } from "@/fetchers/swrKeys";
// import {
//   Button,
//   Modal,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { mutate } from "swr";
// import useSWRMutation from "swr/mutation";

// export const DeleteModal = ({
//   review_id,
//   show_id,
// }: {
//   review_id: string;
//   show_id: string;
// }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const { trigger } = useSWRMutation(
//     swrKeys.deleteReview(review_id),
//     async () => {
//       await deleteReview(review_id);
//     },
//     {
//       onSuccess: () => {
//         mutate(swrKeys.listReviews(show_id));
//         onClose();
//       },
//     }
//   );

//   const handleSubmit = async () => {
//     try {
//       await trigger();
//     } catch (error) {
//       console.error("Error deleting review:", error);
//     }
//   };

//   return (
//     <>
//       <Button
//         onClick={onOpen}
//         size={"xs"}
//         color={"purpleLight"}
//         ml="auto"
//         w={"100%"}
//         name="delete"
//       >
//         Delete
//       </Button>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent bgColor={"purpleDark"} color={"black"}>
//           <ModalHeader data-testid="delete-modal">Delete review?</ModalHeader>
//           <ModalCloseButton />

//           <ModalFooter>
//             <Button colorScheme="red" mr={3} onClick={handleSubmit}>
//               Delete
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };
