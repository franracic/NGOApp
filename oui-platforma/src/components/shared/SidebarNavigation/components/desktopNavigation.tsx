"use client";
import { swrKeys } from "@/fetchers/swrKeys";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import {
  MdAccountCircle,
  MdExitToApp,
  MdHelp,
  MdQuestionAnswer,
} from "react-icons/md";
import { mutate } from "swr";
import { NavigationMenu } from "./NavigationMenu";

export const ProfileMenu = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
    localStorage.removeItem("auth-header");
    mutate(swrKeys.currentUser, null, {
      revalidate: false,
    });
  };
  return (
    <Menu>
      <MenuButton as={Button} p={2} w="100%">
        <Avatar size="sm" name="Fran Racic" bg="yellowDark" />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem as={NextLink} href="/profile">
            <MdAccountCircle />
            <Text ml={2}>My Account</Text>
          </MenuItem>
          <MenuItem onClick={handleLogout} color="red">
            <MdExitToApp />
            <Text ml={2}>Logout</Text>
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>
            <MdHelp />
            <Text ml={2}>Docs</Text>
          </MenuItem>
          <MenuItem>
            <MdQuestionAnswer />
            <Text ml={2}>FAQ</Text>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export const DesktopNavigation = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <VStack
      flexGrow={1}
      alignItems="flex-start"
      justifyContent="space-between"
      w="full"
    >
      <NavigationMenu isOpen={isOpen} />
      <ProfileMenu />
    </VStack>
  );
};
