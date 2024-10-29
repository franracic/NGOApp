// src/components/navigation/NavigationMenu.tsx

"use client";

import {
  markNotificationAsRead,
  useNotifications,
} from "@/fetchers/notification";
import { INotification } from "@/typings/course";
import { Link as ChakraLink } from "@chakra-ui/next-js";
import {
  Badge,
  Box,
  Button,
  Flex,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
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
  key: string;
}

const SIDEBAR_ITEMS: Array<ISidebarItem> = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <MdHome />,
    key: "dashboard",
  },
  {
    label: "Materials",
    href: "/materials",
    icon: <MdImportContacts />,
    key: "materials",
  },
  {
    label: "Education",
    href: "/education",
    icon: <MdSchool />,
    key: "education",
  },
  {
    label: "Workshops",
    href: "/workshops",
    icon: <MdWork />,
    key: "workshops",
  },
  {
    label: "Inspiration",
    href: "/inspiration",
    icon: <MdLightbulbOutline />,
    key: "inspiration",
  },
  {
    label: "Peer to Peer",
    href: "/peer-to-peer",
    icon: <MdInsertEmoticon />,
    key: "peer_to_peer",
  },
  {
    label: "Mentorship",
    href: "/mentorship",
    icon: <FaHandshakeAngle />,
    key: "mentorship",
  },
  {
    label: "Networking",
    href: "/networking",
    icon: <MdGroup />,
    key: "networking",
  },
  { label: "Admin", href: "/new-course", icon: <MdEdit />, key: "admin" },
];

interface NavigationMenuProps {
  isOpen: boolean;
  onSelect?: () => void;
}

export const NavigationMenu = ({ isOpen, onSelect }: NavigationMenuProps) => {
  const pathname = usePathname();
  const { data: notifications } = useNotifications();

  const notificationsByMenuItem = notifications?.reduce((acc, notification) => {
    const key = notification.related_menu_item;
    if (key) {
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(notification);
    }
    return acc;
  }, {} as { [key: string]: INotification[] });

  return (
    <VStack spacing={1} alignItems="stretch">
      {SIDEBAR_ITEMS.map(({ label, href, icon, key }) => {
        const isActive = pathname === href;

        const itemNotifications = notificationsByMenuItem?.[key] || [];

        const hasUnreadNotifications = itemNotifications.some(
          (n) => !n.is_read
        );

        const tooltipContent =
          itemNotifications.length > 0 ? (
            <Box maxW="200px">
              <Text fontWeight="bold" mb={2}>
                Notifications
              </Text>
              <VStack align="start" spacing={1}>
                {itemNotifications.slice(0, 5).map((notification) => (
                  <Text key={notification.id} fontSize="sm">
                    {notification.message}
                  </Text>
                ))}
                {itemNotifications.length > 5 && (
                  <Text fontSize="xs" color="gray.500">
                    and {itemNotifications.length - 5} more...
                  </Text>
                )}
              </VStack>
            </Box>
          ) : (
            label
          );

        return (
          <ChakraLink key={href} as={NextLink} href={href} passHref>
            <Tooltip
              label={tooltipContent}
              placement="right"
              aria-label={`Tooltip for ${label}`}
              hasArrow
              bg="gray.700"
              color="white"
              openDelay={500}
              closeOnClick={false}
            >
              <Button
                as="a"
                variant={"navigation"}
                isActive={isActive}
                onClick={() => {
                  if (onSelect) onSelect();
                  if (itemNotifications.length > 0) {
                    itemNotifications.forEach((notification) => {
                      if (!notification.is_read) {
                        markNotificationAsRead(notification.id);
                      }
                    });
                  }
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
                <Flex align="center">
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
                </Flex>
                {hasUnreadNotifications && (
                  <Badge
                    colorScheme="red"
                    position="absolute"
                    top="0px"
                    left="0px"
                    borderRadius="full"
                    fontSize="0.7em"
                    variant={"solid"}
                  >
                    {itemNotifications.length}
                  </Badge>
                )}
              </Button>
            </Tooltip>
          </ChakraLink>
        );
      })}
    </VStack>
  );
};
