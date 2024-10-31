// import { ICourse, ICourseContent } from "@/typings/course";
// import {
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalHeader,
//   ModalOverlay,
// } from "@chakra-ui/react";
// import React from "react";
// import { CoursePage } from "../../Course/CoursePage/CoursePage";

// interface PreviewModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedContent: ICourseContent | null;
//   course: ICourse;
// }

// const PreviewModal: React.FC<PreviewModalProps> = ({
//   isOpen,
//   onClose,
//   course,
// }) => {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
//       <ModalOverlay />
//       <ModalContent maxWidth="90%">
//         <ModalHeader>Preview Mode</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <CoursePage course={course} />
//         </ModalBody>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default PreviewModal;
