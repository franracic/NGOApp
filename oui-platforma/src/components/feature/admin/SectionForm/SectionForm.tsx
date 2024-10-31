// // components/SectionForm.tsx
// import { ICourseContent, ICourseSection } from "@/typings/course";
// import {
//   Alert,
//   AlertIcon,
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   Input,
//   Stack,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { AddContentModal } from "../AddContentModal/AddContentModal";

// export const SectionForm = ({
//   onSave,
// }: {
//   onSave: (section: ICourseSection) => void;
// }) => {
//   const [sectionData, setSectionData] = useState<ICourseSection>({
//     title: "",
//     contents: [],
//   });

//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const handleInputChange: React.ChangeEventHandler<
//     HTMLInputElement | HTMLTextAreaElement
//   > = (e) => {
//     const { name, value } = e.target;
//     setSectionData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validateContent = (content: ICourseContent, index: number) => {
//     const urlPattern = new RegExp(
//       "^(https?:\\/\\/)?" + // protocol
//         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))" + // domain name and extension
//         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//         "(\\#[-a-z\\d_]*)?$",
//       "i"
//     );

//     let validationErrors: { [key: string]: string } = {};
//     if (!content.title) {
//       validationErrors[`content-${index}-title`] = "Content title is required.";
//     }
//     if (!content.description) {
//       validationErrors[`content-${index}-description`] =
//         "Content description is required.";
//     }
//     if (
//       content.type === "video" &&
//       (!content.url || !urlPattern.test(content.url))
//     ) {
//       validationErrors[`content-${index}-url`] =
//         "A valid Video URL is required.";
//     }
//     if (
//       content.type === "quiz" &&
//       (!content.quizData || content.quizData.length === 0)
//     ) {
//       validationErrors[`content-${index}-quizData`] =
//         "Quiz must have at least one question.";
//     }
//     return validationErrors;
//   };

//   const validate = () => {
//     let validationErrors: { [key: string]: string } = {};
//     if (!sectionData.title) {
//       validationErrors.title = "Section title is required.";
//     }
//     sectionData.contents.forEach((content, index) => {
//       validationErrors = {
//         ...validationErrors,
//         ...validateContent(content, index),
//       };
//     });
//     setErrors(validationErrors);
//     return Object.keys(validationErrors).length === 0;
//   };

//   const addContent = (newContent: ICourseContent) => {
//     setSectionData((prevData) => ({
//       ...prevData,
//       contents: [...prevData.contents, newContent],
//     }));
//   };

//   const editContent = (index: number, updatedContent: ICourseContent) => {
//     const newContents = [...sectionData.contents];
//     newContents[index] = updatedContent;
//     setSectionData((prevData) => ({
//       ...prevData,
//       contents: newContents,
//     }));
//   };

//   const removeContent = (index: number) => {
//     setSectionData((prevData) => ({
//       ...prevData,
//       contents: prevData.contents.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSave = () => {
//     if (validate()) {
//       onSave(sectionData);
//       setSectionData({ title: "", contents: [] });
//       setShowSuccessMessage(true);
//       setTimeout(() => setShowSuccessMessage(false), 3000); // Hide success message after 3 seconds
//     }
//   };

//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const reorderedContents = Array.from(sectionData.contents);
//     const [removed] = reorderedContents.splice(result.source.index, 1);
//     reorderedContents.splice(result.destination.index, 0, removed);

//     setSectionData((prevData) => ({
//       ...prevData,
//       contents: reorderedContents,
//     }));
//   };

//   return (
//     <Box mb={4}>
//       {showSuccessMessage && (
//         <Alert status="success" mb={4}>
//           <AlertIcon />
//           Section saved successfully!
//         </Alert>
//       )}
//       <Stack spacing={4}>
//         <FormControl isInvalid={!!errors.title} isRequired>
//           <Input
//             name="title"
//             placeholder=" "
//             value={sectionData.title}
//             onChange={handleInputChange}
//             mb={4}
//             borderColor="gray.300"
//           />
//           <FormLabel>Section Title</FormLabel>
//           <FormErrorMessage>{errors.title}</FormErrorMessage>
//         </FormControl>

//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="contents">
//             {(provided) => (
//               <Stack
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 spacing={4}
//                 mb={4}
//               >
//                 {sectionData.contents.map((content, index) => (
//                   <Draggable
//                     key={index}
//                     draggableId={`content-${index}`}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <Stack
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         spacing={4}
//                         mb={4}
//                         borderWidth="1px"
//                         p={4}
//                         rounded="md"
//                         bg="white"
//                       >
//                         <Flex justify="space-between">
//                           <Box>
//                             <Box fontWeight="bold" mb={2}>
//                               {content.title}
//                             </Box>
//                             <Box mb={2}>{content.description}</Box>
//                             <Box>{content.type}</Box>
//                           </Box>
//                           <Flex align="center">
//                             <AddContentModal
//                               onAddContent={(updatedContent) =>
//                                 editContent(index, updatedContent)
//                               }
//                               initialContent={content}
//                               isEditMode={true}
//                             />
//                             <Button
//                               variant="ghost"
//                               colorScheme="red"
//                               onClick={() => removeContent(index)}
//                             >
//                               Remove
//                             </Button>
//                           </Flex>
//                         </Flex>
//                       </Stack>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </Stack>
//             )}
//           </Droppable>
//         </DragDropContext>

//         <AddContentModal onAddContent={addContent} />

//         <Button variant={"dark"} onClick={handleSave}>
//           Save Section
//         </Button>
//       </Stack>
//     </Box>
//   );
// };
