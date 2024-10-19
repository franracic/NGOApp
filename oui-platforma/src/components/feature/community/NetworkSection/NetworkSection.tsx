"use client";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { DiscussionList } from "../Discussion/DiscussionList/DiscussionList";
import { EventList } from "../Event/EventList/EventList";
import { GroupList } from "../Group/GroupList/GroupList";

export const NetworkSection = () => {
  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Tabs isFitted colorScheme="yellow">
        <TabList mb="1em">
          <Tab>Discussions</Tab>
          <Tab>Groups</Tab>
          <Tab>Events</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DiscussionList />
          </TabPanel>
          <TabPanel>
            <GroupList />
          </TabPanel>
          <TabPanel>
            <EventList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
