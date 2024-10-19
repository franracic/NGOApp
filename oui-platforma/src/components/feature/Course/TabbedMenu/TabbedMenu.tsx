import { ICourse, IUser } from "@/typings/course";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { DiscussionBoard } from "../DiscussionBoard/DiscussionBoard";
import { NotesSection } from "../NotesSection/NotesSection";
import { OverviewSection } from "../OverviewSection.tsx/OverviewSection";
import { ResourcesSection } from "../ResourcesSection/ResourcesSection";

interface TabbedMenuProps {
  course: ICourse;
  activeTab: number;
  onTabChange: (index: number) => void;
}

const currentUser: IUser = {
  email: "user@example.com",
  avatar: "https://i.pravatar.cc/300?img=1",
  username: "John Doe",
  name: "John Doe",
  id: 1,
  jobTitle: "Software Engineer",
  city: "New York",
  country: "USA",
  level: 4,
};

export const TabbedMenu: React.FC<TabbedMenuProps> = ({
  course,
  activeTab,
  onTabChange,
}) => {
  return (
    <Box mt={8} overflow={"auto"} p={4}>
      <Tabs
        variant="soft-rounded"
        colorScheme="yellow"
        index={activeTab}
        onChange={onTabChange}
      >
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Resources</Tab>
          <Tab>Notes</Tab>
          <Tab>Discussion</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <OverviewSection course={course} />
          </TabPanel>
          <TabPanel>
            <ResourcesSection />
          </TabPanel>
          <TabPanel>
            <NotesSection videoTitle={course.title} />
          </TabPanel>
          <TabPanel>
            <DiscussionBoard currentUser={currentUser} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
