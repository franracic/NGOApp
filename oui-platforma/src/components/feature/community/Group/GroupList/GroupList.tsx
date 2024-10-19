import { mockUserList } from "@/components/feature/Course/courseMock/usersMock";
import { IGroup } from "@/typings/course";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { GroupDetails } from "../GroupDetails/GroupDetails";
import { NewGroupForm } from "../NewGroupForm/NewGroupForm";

const mockGroups: IGroup[] = [
  {
    id: 1,
    name: "STEAM Educators Network",
    description:
      "A group for educators passionate about integrating STEAM principles into the classroom.",
    members: 120,
    memberList: mockUserList, // Assuming mockUserList is a list of users with interests in STEAM
    level: 5,
  },
  {
    id: 2,
    name: "Growth Mindset Advocates",
    description:
      "Join discussions on fostering a growth mindset in educational settings.",
    members: 80,
    memberList: mockUserList, // Assuming generateMockUsers is a function that generates users interested in growth mindset
    level: 4,
  },
  {
    id: 3,
    name: "Experiential Learning Practitioners",
    description:
      "A community for educators focused on hands-on, experiential learning strategies.",
    members: 150,
    memberList: mockUserList, // Assuming generateMockUsers generates users with a focus on experiential learning
    level: 6,
  },
  {
    id: 4,
    name: "Arts in Education",
    description:
      "Discuss and share strategies for integrating the arts into education, especially within STEAM frameworks.",
    members: 90,
    memberList: mockUserList, // Generate users interested in arts and education
    level: 5,
  },
  {
    id: 5,
    name: "Project-Based Learning Experts",
    description:
      "Collaborate with others on project-based learning techniques and best practices.",
    members: 70,
    memberList: mockUserList, // Generate users who are experts in project-based learning
    level: 4,
  },
];

export const GroupList = () => {
  const [groups, setGroups] = useState<IGroup[]>(mockGroups);

  const addGroup = (newGroup: IGroup) => {
    setGroups([newGroup, ...groups]);
  };

  return (
    <VStack spacing={8}>
      <NewGroupForm addGroup={addGroup} />
      {groups.map((group) => (
        <GroupDetails key={group.id} group={group} />
      ))}
    </VStack>
  );
};
