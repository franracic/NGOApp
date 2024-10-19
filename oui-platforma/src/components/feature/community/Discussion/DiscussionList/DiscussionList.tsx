import { IDiscussion } from "@/typings/course";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { DiscussionPost } from "../DiscussionPost/DiscussionPost";
import { NewDiscussionForm } from "../NewDiscussionForm/NewDiscussionForm";

const mockDiscussions: IDiscussion[] = [
  {
    id: 1,
    title: "Integrating Arts into STEAM Curriculum",
    author: "Dr. Emily Carter",
    content:
      "What are the best strategies for integrating arts into a STEAM curriculum? I'd love to hear about successful approaches and resources that have worked for you.",
    timestamp: new Date(),
  },
  {
    id: 2,
    title: "Fostering a Growth Mindset in Students",
    author: "Dr. Laura White",
    content:
      "How do you encourage a growth mindset in your students? Are there specific activities or discussions that have been particularly effective?",
    timestamp: new Date(),
  },
  {
    id: 3,
    title: "Technology in Experiential Learning",
    author: "Michael Lee",
    content:
      "I'm curious about how others are using technology to enhance experiential learning. What tools and platforms do you find most effective?",
    timestamp: new Date(),
  },
  {
    id: 4,
    title: "Project-Based Learning Best Practices",
    author: "Sarah Thompson",
    content:
      "Let's discuss best practices for implementing project-based learning in the classroom. What challenges have you faced, and how did you overcome them?",
    timestamp: new Date(),
  },
  {
    id: 5,
    title: "Measuring Success in STEAM Education",
    author: "Robert Brown",
    content:
      "What metrics or assessment tools do you use to measure the success of your STEAM programs? How do you ensure that all students are benefiting?",
    timestamp: new Date(),
  },
];

export const DiscussionList = () => {
  const [discussions, setDiscussions] =
    useState<IDiscussion[]>(mockDiscussions);

  const addDiscussion = (newDiscussion: IDiscussion) => {
    setDiscussions([newDiscussion, ...discussions]);
  };

  return (
    <VStack spacing={8}>
      <NewDiscussionForm addDiscussion={addDiscussion} />
      {discussions.map((discussion) => (
        <DiscussionPost key={discussion.id} discussion={discussion} />
      ))}
    </VStack>
  );
};
