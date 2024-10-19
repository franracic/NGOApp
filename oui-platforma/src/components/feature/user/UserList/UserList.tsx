import { IUser } from "@/typings/course";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { UserCard } from "../UserCard/UserCard";

export const UserList = ({
  users,
  onClick,
  onMessageClick,
  cardHeight,
  cardRefs,
}: {
  users: IUser[];
  onClick: (number: number) => void;
  onMessageClick: (string: string) => void;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  cardHeight: string;
}) => {
  if (!Array.isArray(users) || users.length === 0) {
    return <div data-testid="placeholder">No users match your filters</div>;
  }
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="4">
      {users.map((user, index) => (
        <Box
          key={user.email}
          onClick={() => onClick(index)}
          ref={(el: HTMLDivElement | null) => {
            cardRefs.current[index] = el;
          }}
          height={cardHeight}
        >
          <UserCard user={user} onMessageClick={onMessageClick} />
        </Box>
      ))}
    </SimpleGrid>
  );
};
