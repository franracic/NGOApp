import { IUser } from "@/typings/course";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { UserCard } from "../UserCard/UserCard";

export const UserList = ({
  users,
  onClick = () => {},
  onMessageClick,
}: {
  users: IUser[];
  onClick?: (userId: number) => void;
  onMessageClick?: (userId: number) => void;
}) => {
  if (!Array.isArray(users) || users.length === 0) {
    return <div data-testid="placeholder">No users match your filters</div>;
  }
  return (
    <SimpleGrid columns={[2, 2, 3, 4, 5]} spacing="4">
      {users.map((user) => (
        <Box key={user.id} onClick={() => onClick(user.id)}>
          <UserCard user={user} onMessageClick={onMessageClick} />
        </Box>
      ))}
    </SimpleGrid>
  );
};
