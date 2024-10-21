import { AlertDialogComponent } from "@/components/shared/AlertDialog/AlertDialog";
import { PopoverForm } from "@/components/shared/PopoverForm/PopoverForm";
import { newCourse } from "@/fetchers/courses";
import { fetcher } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { IAuthor, ICourse, ICourseSection } from "@/typings/course";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { CourseCard } from "../../courses/CourseCard/CourseCard";
import PreviewModal from "../PreviewModal/PreviewModal";
import { SectionForm } from "../SectionForm/SectionForm";

export const CourseForm = ({ courseId }: { courseId?: string }) => {
  const [formData, setFormData] = useState<ICourse>({
    title: "",
    description: "",
    cover_image: "",
    average_rating: 0,
    authors: [],
    total_duration: "",
    is_unlocked: true,
    sections: [],
    type: "Lecture",
    id: 0,
    course: "",
    completed: 0,
    contentCount: 0,
    no_of_reviews: 0,
  });

  const [sections, setSections] = useState<ICourseSection[]>([]);
  const [authors, setAuthors] = useState<IAuthor[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { data: course, error } = useSWR<ICourse | undefined>(
    courseId ? swrKeys.courses : null,
    fetcher
  );

  const { trigger } = useSWRMutation(
    swrKeys.courses,
    async () => {
      await newCourse({
        ...formData,
        sections,
        authors,
      });
    },
    {
      onSuccess: () => {
        mutate(swrKeys.courses);
        toast({
          title: "Course added successfully",
          status: "success",
          duration: 2000,
        });
      },
    }
  );

  useEffect(() => {
    if (course) {
      setFormData(course);
      setSections(course.sections || []);
      setAuthors(course.authors || []);
    }
  }, [course]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await trigger();
    } catch (error) {
      console.error("Error adding new course: ", error);
    }
  };

  const addSection = (section: ICourseSection) => {
    setSections((prevSections) => [...prevSections, section]);
  };

  const handleAuthorChange = (index: number, updatedAuthor: IAuthor) => {
    setAuthors((prevAuthors) => {
      const newAuthors = [...prevAuthors];
      newAuthors[index] = updatedAuthor;
      return newAuthors;
    });
  };

  const handleAuthorDelete = (index: number) => {
    setAuthors((prevAuthors) => prevAuthors.filter((_, i) => i !== index));
  };

  const addAuthor = () => {
    setAuthors([...authors, { name: "", email: "" }]);
  };

  const handleSectionEdit = (index: number, updatedSection: ICourseSection) => {
    const updatedSections = [...sections];
    updatedSections[index] = updatedSection;
    setSections(updatedSections);
  };

  const handleSectionDelete = (index: number) => {
    setSections((prevSections) => prevSections.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedSections = Array.from(sections);
    const [removed] = reorderedSections.splice(result.source.index, 1);
    reorderedSections.splice(result.destination.index, 0, removed);

    setSections(reorderedSections);
  };

  if (error) return <Box>Error loading course data</Box>;
  if (!course && courseId) return <Box>Loading...</Box>;

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      w="full"
      h={"90vh"}
      justifyContent={"space-evenly"}
    >
      <Card p={6} w="30%" maxW="800px" variant={"light"} overflow={"auto"}>
        <Stack spacing={6}>
          <Heading fontSize="2xl" color="gray.800">
            Course Details
          </Heading>
          <FormControl isRequired>
            <Input
              name="title"
              placeholder=" "
              value={formData.title}
              onChange={handleInputChange}
              borderColor="gray.300"
            />
            <FormLabel>Course Title</FormLabel>
          </FormControl>

          <FormControl isRequired>
            <Textarea
              name="description"
              placeholder=" "
              value={formData.description}
              borderRadius={24}
              onChange={handleInputChange}
              borderColor="gray.300"
            />
            <FormLabel>Course Description</FormLabel>
          </FormControl>

          <SimpleGrid columns={[1]} spacing={4}>
            <FormControl isRequired>
              <Input
                name="cover_image"
                placeholder=" "
                value={formData.cover_image}
                onChange={handleInputChange}
                borderColor="gray.300"
              />
              <FormLabel>Cover Image URL</FormLabel>
            </FormControl>
            <FormControl isRequired>
              <Input
                name="total_duration"
                placeholder=" "
                value={formData.total_duration}
                onChange={handleInputChange}
                borderColor="gray.300"
              />
              <FormLabel>Total Duration</FormLabel>
            </FormControl>
            <Select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              borderColor="gray.300"
            >
              <option value="Youth work beginner">Youth work beginner</option>
              <option value="Youth worker">Youth worker</option>
              <option value="Mentor">Mentor</option>
              <option value="Practitioner">Practitioner</option>
            </Select>
            <Select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              borderColor="gray.300"
              colorScheme="yellow"
            >
              <option value="Lecture">Lecture</option>
              <option value="Workshop">Workshop</option>
              <option value="Exam">Exam</option>
            </Select>
          </SimpleGrid>

          <Heading fontSize="lg">Authors</Heading>
          {authors.map((author, index) => (
            <Stack key={index} spacing={3}>
              <FormControl isRequired>
                <Input
                  name="name"
                  placeholder=" "
                  value={author.name}
                  onChange={(e) =>
                    handleAuthorChange(index, {
                      ...author,
                      name: e.target.value,
                    })
                  }
                  borderColor="gray.300"
                />
                <FormLabel>Author Name</FormLabel>
              </FormControl>
              <FormControl isRequired>
                <Input
                  name="email"
                  placeholder=" "
                  value={author.email}
                  onChange={(e) =>
                    handleAuthorChange(index, {
                      ...author,
                      email: e.target.value,
                    })
                  }
                  borderColor="gray.300"
                />
                <FormLabel>Author Email</FormLabel>
              </FormControl>
              <Button onClick={() => handleAuthorDelete(index)}>Delete</Button>
            </Stack>
          ))}
          <Button onClick={addAuthor}>Add Author</Button>

          <Button onClick={onOpen} isDisabled={!sections.length}>
            Preview Mode
          </Button>
          <PreviewModal
            isOpen={isOpen}
            onClose={onClose}
            selectedContent={sections[0]?.contents[0]}
            course={formData}
          />

          <Button type="submit" variant={"light"}>
            {courseId ? "Update Course" : "Create Course"}
          </Button>
        </Stack>
      </Card>
      <Card p={6} w="30%" maxW="800px" variant={"light"} overflow={"auto"}>
        <Stack spacing={6}>
          <Heading fontSize="2xl" color="gray.800">
            Sections
          </Heading>
          <SectionForm onSave={addSection} />
        </Stack>
      </Card>
      <Card
        p={6}
        w="30%"
        maxW="800px"
        variant={"light"}
        overflow={"auto"}
        gap={2}
      >
        {sections.length > 0 && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <Stack {...provided.droppableProps} ref={provided.innerRef}>
                  {sections.map((section, index) => (
                    <Draggable
                      key={section.title}
                      draggableId={section.title}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          variant={"light"}
                          ref={provided.innerRef}
                          flexDir={"row"}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Text>
                            {index + 1}. {section.title}
                          </Text>
                          <ButtonGroup>
                            <Button
                              onClick={() => handleSectionEdit(index, section)}
                            >
                              <PopoverForm />
                            </Button>
                            <AlertDialogComponent
                              buttonIcon={<DeleteIcon />}
                              alertTitle="Discard Changes?"
                              alertBody="Are you sure you want to discard all of your notes? 44 words will be deleted."
                              onConfirm={() => handleSectionDelete(index)}
                            />
                          </ButtonGroup>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        )}
        <CourseCard
          title={formData.title != "" ? formData.title : "Example Section"}
          course={formData.course ? formData.course : "Example Course"}
          cover_image={formData.cover_image}
          id={formData.id}
          authors={authors}
          no_of_reviews={formData.no_of_reviews}
          total_duration={
            formData.total_duration != "" ? formData.total_duration : "1h 30m"
          }
          type={formData.type}
          is_unlocked={true}
          link={false}
          sections={[]}
        />
      </Card>
    </Flex>
  );
};
