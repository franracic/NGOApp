"use client";

import { LogoImage } from "@/components/core/Logo/Logo";
import { Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { DesktopNavigation } from "./components/desktopNavigation";

export const SidebarNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMouseEnter = () => {
    if (window.innerWidth >= 800) {
      onOpen();
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 800) {
      onClose();
    }
  };

  return (
    <Flex
      as="aside"
      direction="column"
      alignItems="flex-start"
      justifyContent="space-between"
      bgColor="white"
      pr={{
        base: 0,
        md: isOpen ? 4 : 1,
      }}
      w={{
        base: 0,
        md: isOpen ? "200px" : "50px",
      }}
      transition="width 0.3s ease-in-out, padding-right 0.3s ease-in-out"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      h="100vh"
      borderRight={{
        base: "none",
        md: "1px solid #e2e8f0",
      }}
      overflow="hidden"
      display={{
        base: "none",
        md: "flex",
      }}
    >
      <Stack
        spacing={16}
        justifyContent="space-between"
        flexGrow={1}
        direction="column"
      >
        <Flex h="65px" alignItems="flex-end">
          <LogoImage
            margin="auto"
            marginBottom={0}
            mt={25}
            transition="all 0.3s ease-in-out"
            boxSize={isOpen ? "50px" : "30px"}
          />
        </Flex>
        <DesktopNavigation isOpen={isOpen} />
      </Stack>
    </Flex>
  );
};
