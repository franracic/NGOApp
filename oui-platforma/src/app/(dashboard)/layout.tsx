import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { SidebarNavigation } from "@/components/shared/SidebarNavigation/SidebarNavigation";
import { MobileNavigation } from "@/components/shared/SidebarNavigation/components/mobileNavigation";
import { Box, Flex, Hide, Show } from "@chakra-ui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthRedirect to="/login" condition="loggedOut" />
      <Flex h="100vh" overflow="hidden" position="relative">
        <Hide below="md">
          <SidebarNavigation />
        </Hide>
        <Show below="md">
          <MobileNavigation />
        </Show>
        <Box flex="1" overflowY="auto" w="100vw">
          <main>{children}</main>
        </Box>
      </Flex>
    </>
  );
}
