// import { updateReview } from "@/fetchers/reviews";
// import { swrKeys } from "@/fetchers/swrKeys";
// import {
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { mutate } from "swr";
// import useSWRMutation from "swr/mutation";
// import { ReviewStarsInput } from "../../ReviewStars/ReviewStarsInput";

// interface IEditModal {
//   isOpen: boolean;
//   onClose: () => void;
//   comment: string;
//   review_id: string;
//   rating: number;
//   show_id: string;
// }

// interface IUpdateReview {
//   comment: string;
//   rating: number;
//   review_id: string;
// }

// export const EditModal = ({
//   isOpen,
//   onClose,
//   comment,
//   review_id,
//   rating,
//   show_id,
// }: IEditModal) => {
//   const [editedComment, setEditedComment] = useState(comment);
//   const [newRating, setNewRating] = useState(rating);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEditedComment(event.target.value);
//   };

//   const { trigger } = useSWRMutation(
//     swrKeys.deleteReview(review_id),
//     async () => {
//       await changeReview({
//         comment: editedComment,
//         rating: newRating,
//         review_id,
//       });
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
//       console.error("Error editing review:", error);
//     }
//   };

//   const changeReview = async ({
//     comment,
//     rating,
//     review_id,
//   }: IUpdateReview) => {
//     try {
//       await updateReview(comment, rating, review_id);
//       mutate(swrKeys.listReviews(show_id));
//     } catch (error) {
//       console.error("Error updating review:", error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent bgColor={"purpleDark"} color={"black"}>
//         <ModalHeader data-testid="edit-modal">Edit Review</ModalHeader>
//         <ModalCloseButton />

//         <ModalBody pb={6}>
//           <FormControl>
//             <FormLabel>Comment</FormLabel>
//             <Input
//               placeholder="First name"
//               value={editedComment}
//               onChange={handleChange}
//               data-testid="edit-comment"
//             />
//           </FormControl>

//           <FormControl mt={4}>
//             <FormLabel>New rating</FormLabel>
//             <ReviewStarsInput
//               label="rating"
//               value={newRating}
//               onChange={setNewRating}
//             />
//           </FormControl>
//         </ModalBody>

//         <ModalFooter>
//           <Button mr={3} onClick={handleSubmit}>
//             Change
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };
