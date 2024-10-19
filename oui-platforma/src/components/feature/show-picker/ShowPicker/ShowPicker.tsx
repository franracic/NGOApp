// import {
//   Button,
//   Flex,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { PickerContextProvider } from "./components/PickerContextProvider";
// import { PickerFooter } from "./components/PickerFooter";
// import { PickerProgress } from "./components/PickerProgress";
// import { PickerStep } from "./components/PickerStep";

// export const ShowPicker = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <PickerContextProvider>
//       <Button onClick={onOpen} variant={"dark"} alignSelf={"baseline"}>
//         Show finder
//       </Button>
//       <Modal
//         isOpen={isOpen}
//         onClose={onClose}
//         size={{
//           base: "full",
//           md: "3xl",
//         }}
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalCloseButton />
//           <ModalHeader>Pick a show</ModalHeader>
//           <ModalBody>
//             <PickerStep />
//           </ModalBody>
//           <ModalFooter>
//             <Flex direction="column" width="100%" gap={3}>
//               <PickerFooter />
//               <PickerProgress />
//             </Flex>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </PickerContextProvider>
//   );
// };
