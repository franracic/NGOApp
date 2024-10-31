// // components/QuizSection.tsx
// import { IQuizQuestion } from "@/typings/course";
// import { DragHandleIcon } from "@chakra-ui/icons";
// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormErrorMessage,
//   FormLabel,
//   IconButton,
//   Input,
//   Select,
//   Stack,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// export const QuizSection = ({
//   quizData,
//   onChange,
// }: {
//   quizData: IQuizQuestion[];
//   onChange: (updatedQuizData: IQuizQuestion[]) => void;
// }) => {
//   const [questions, setQuestions] = useState<IQuizQuestion[]>(quizData || []);
//   const [errors, setErrors] = useState<{
//     [key: number]: { question?: string; options?: string };
//   }>({});

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         type: "multiple-choice",
//         question: "",
//         options: [""],
//         correctAnswer: "",
//       },
//     ]);
//   };

//   const updateQuestion = (
//     index: number,
//     key: keyof IQuizQuestion,
//     value: any
//   ) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index] = {
//       ...updatedQuestions[index],
//       [key]: value,
//     };
//     setQuestions(updatedQuestions);
//     validateQuestion(index, updatedQuestions[index]);
//     onChange(updatedQuestions);
//   };

//   const validateQuestion = (index: number, question: IQuizQuestion) => {
//     const newErrors: { question?: string; options?: string } = {};
//     if (!question.question) {
//       newErrors.question = "Question text is required.";
//     }
//     if (question.type === "multiple-choice" && question.options.length < 2) {
//       newErrors.options =
//         "Multiple choice questions must have at least two options.";
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, [index]: newErrors }));
//   };

//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;

//     const updatedQuestions = Array.from(questions);
//     if (result.type === "QUESTION") {
//       const [movedQuestion] = updatedQuestions.splice(result.source.index, 1);
//       updatedQuestions.splice(result.destination.index, 0, movedQuestion);
//     } else if (result.type === "OPTION") {
//       const { source, destination } = result;
//       const questionIndex = source.droppableId.split("-")[1];
//       const updatedOptions = Array.from(
//         updatedQuestions[questionIndex].options
//       );
//       const [movedOption] = updatedOptions.splice(source.index, 1);
//       updatedOptions.splice(destination.index, 0, movedOption);
//       updatedQuestions[questionIndex].options = updatedOptions;
//     }

//     setQuestions(updatedQuestions);
//     onChange(updatedQuestions);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="questions" type="QUESTION">
//         {(provided) => (
//           <Stack
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             spacing={4}
//           >
//             {questions.map((question, qIndex) => (
//               <Draggable
//                 key={`question-${qIndex}`}
//                 draggableId={`question-${qIndex}`}
//                 index={qIndex}
//               >
//                 {(provided, snapshot) => (
//                   <Box
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     p={4}
//                     borderWidth="1px"
//                     rounded="lg"
//                     mb={4}
//                     bg={snapshot.isDragging ? "blue.50" : "white"}
//                     boxShadow={snapshot.isDragging ? "md" : "none"}
//                     _hover={{ boxShadow: "lg" }}
//                   >
//                     <Flex justifyContent="space-between" alignItems="center">
//                       <FormControl isInvalid={!!errors[qIndex]?.question}>
//                         <Input
//                           placeholder=" "
//                           value={question.question}
//                           onChange={(e) =>
//                             updateQuestion(qIndex, "question", e.target.value)
//                           }
//                           mb={4}
//                         />
//                         <FormLabel>Question</FormLabel>
//                         <FormErrorMessage>
//                           {errors[qIndex]?.question}
//                         </FormErrorMessage>
//                       </FormControl>
//                       <IconButton
//                         aria-label="Drag"
//                         icon={<DragHandleIcon />}
//                         {...provided.dragHandleProps}
//                         variant="ghost"
//                         cursor="grab"
//                         size="sm"
//                       />
//                     </Flex>

//                     <Select
//                       value={question.type}
//                       onChange={(e) =>
//                         updateQuestion(qIndex, "type", e.target.value)
//                       }
//                       mb={4}
//                     >
//                       <option value="multiple-choice">Multiple Choice</option>
//                       <option value="true-false">True/False</option>
//                     </Select>

//                     <Droppable droppableId={`options-${qIndex}`} type="OPTION">
//                       {(provided) => (
//                         <Stack
//                           {...provided.droppableProps}
//                           ref={provided.innerRef}
//                           spacing={2}
//                         >
//                           {question.type === "multiple-choice" &&
//                             question.options.map((option, oIndex) => (
//                               <Draggable
//                                 key={`option-${qIndex}-${oIndex}`}
//                                 draggableId={`option-${qIndex}-${oIndex}`}
//                                 index={oIndex}
//                               >
//                                 {(provided, snapshot) => (
//                                   <FormControl
//                                     ref={provided.innerRef}
//                                     {...provided.draggableProps}
//                                     {...provided.dragHandleProps}
//                                     isInvalid={!!errors[qIndex]?.options}
//                                     mb={2}
//                                     bg={
//                                       snapshot.isDragging ? "blue.50" : "white"
//                                     }
//                                     _hover={{ boxShadow: "sm" }}
//                                     borderRadius="md"
//                                   >
//                                     <Flex alignItems="center">
//                                       <Input
//                                         placeholder={`Option ${oIndex + 1}`}
//                                         value={option}
//                                         onChange={(e) => {
//                                           const updatedOptions = [
//                                             ...question.options,
//                                           ];
//                                           updatedOptions[oIndex] =
//                                             e.target.value;
//                                           updateQuestion(
//                                             qIndex,
//                                             "options",
//                                             updatedOptions
//                                           );
//                                         }}
//                                         flex="1"
//                                         mr={2}
//                                       />
//                                       <Button
//                                         size="sm"
//                                         colorScheme="red"
//                                         onClick={() => {
//                                           const updatedOptions =
//                                             question.options.filter(
//                                               (_, i) => i !== oIndex
//                                             );
//                                           updateQuestion(
//                                             qIndex,
//                                             "options",
//                                             updatedOptions
//                                           );
//                                         }}
//                                       >
//                                         Remove
//                                       </Button>
//                                     </Flex>
//                                     {oIndex === question.options.length - 1 && (
//                                       <FormErrorMessage>
//                                         {errors[qIndex]?.options}
//                                       </FormErrorMessage>
//                                     )}
//                                   </FormControl>
//                                 )}
//                               </Draggable>
//                             ))}
//                           {provided.placeholder}
//                         </Stack>
//                       )}
//                     </Droppable>

//                     {question.type === "multiple-choice" && (
//                       <Button
//                         size="sm"
//                         onClick={() =>
//                           updateQuestion(qIndex, "options", [
//                             ...question.options,
//                             "",
//                           ])
//                         }
//                         mt={4}
//                       >
//                         Add Option
//                       </Button>
//                     )}
//                     <Input
//                       placeholder="Correct Answer"
//                       value={question.correctAnswer}
//                       onChange={(e) =>
//                         updateQuestion(qIndex, "correctAnswer", e.target.value)
//                       }
//                       mt={4}
//                     />
//                   </Box>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </Stack>
//         )}
//       </Droppable>
//       <Button colorScheme="teal" onClick={addQuestion}>
//         Add Question
//       </Button>
//     </DragDropContext>
//   );
// };
