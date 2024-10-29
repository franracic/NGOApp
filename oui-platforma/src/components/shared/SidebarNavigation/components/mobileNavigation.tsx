"use client";

import { LogoImage } from "@/components/core/Logo/Logo";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { NavigationMenu } from "./NavigationMenu";
import { ProfileMenu } from "./desktopNavigation";

export const MobileNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = () => {
    onClose();
  };

  return (
    <>
      <Box position="relative" h="100vh">
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          position="absolute"
          top="1rem"
          left="1rem"
          bg={"rgba(255, 255, 255, 0.8)"}
          zIndex="overlay"
          variant="ghost"
        />
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <LogoImage />
          </DrawerHeader>
          <DrawerBody>
            <VStack alignItems="flex-start" spacing={4}>
              <NavigationMenu isOpen={true} onSelect={handleSelect} />
              <ProfileMenu />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
