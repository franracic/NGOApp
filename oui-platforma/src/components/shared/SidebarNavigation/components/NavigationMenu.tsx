"use client";

import { Link as ChakraLink } from "@chakra-ui/next-js";
import { Box, Button, Tooltip, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { FaHandshakeAngle } from "react-icons/fa6";
import {
  MdEdit,
  MdGroup,
  MdHome,
  MdImportContacts,
  MdInsertEmoticon,
  MdLightbulbOutline,
  MdSchool,
  MdWork,
} from "react-icons/md";

interface ISidebarItem {
  label: string;
  href: string;
  containsNotification?: boolean;
  icon: JSX.Element;
}

const SIDEBAR_ITEMS: Array<ISidebarItem> = [
  { label: "Dashboard", href: "/dashboard", icon: <MdHome /> },
  { label: "Materials", href: "/materials", icon: <MdImportContacts /> },
  { label: "Education", href: "/education", icon: <MdSchool /> },
  { label: "Workshops", href: "/workshops", icon: <MdWork /> },
  { label: "Inspiration", href: "/inspiration", icon: <MdLightbulbOutline /> },
  { label: "Peer to Peer", href: "/peer-to-peer", icon: <MdInsertEmoticon /> },
  { label: "Mentorship", href: "/mentorship", icon: <FaHandshakeAngle /> },
  { label: "Networking", href: "/networking", icon: <MdGroup /> },
  { label: "Admin", href: "/new-course", icon: <MdEdit /> },
];

interface NavigationMenuProps {
  isOpen: boolean;
  onSelect?: () => void;
}

export const NavigationMenu = ({ isOpen, onSelect }: NavigationMenuProps) => {
  const pathname = usePathname();

  return (
    <VStack spacing={1} alignItems="stretch">
      {SIDEBAR_ITEMS.map(({ label, href, containsNotification, icon }) => {
        const isActive = pathname === href;

        return (
          <ChakraLink key={href} as={NextLink} href={href} passHref>
            <Tooltip
              label={label}
              placement="right"
              isDisabled={isOpen}
              aria-label={`Tooltip for ${label}`}
            >
              <Button
                as="a"
                variant={"navigation"}
                isActive={isActive}
                onClick={() => {
                  if (onSelect) onSelect();
                }}
                justifyContent={isOpen ? "flex-start" : "center"}
                position="relative"
                gap={2}
                w="full"
                p={2}
                pl={isOpen ? 3 : 2}
                color={isActive ? "black" : "gray.500"}
                borderLeft={isActive ? "4px solid" : "none"}
                borderColor={isActive ? "yellowDark" : "transparent"}
                _hover={{ bg: "yellowDark", color: "white" }}
                _active={{
                  pl: isOpen ? 2 : 1,
                  borderLeft: "4px solid",
                  borderColor: "yellowDark",
                }}
              >
                {icon}
                {isOpen && (
                  <Box
                    as="span"
                    ml={4}
                    whiteSpace="nowrap"
                    transition="opacity 0.4s"
                  >
                    {label}
                  </Box>
                )}
              </Button>
            </Tooltip>
          </ChakraLink>
        );
      })}
    </VStack>
  );
};
