import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface AlertDialogComponentProps {
  buttonText?: string;
  buttonIcon?: ReactNode;
  alertTitle: string;
  alertBody: string;
  onConfirm: () => void;
}

export function AlertDialogComponent({
  buttonText,
  buttonIcon,
  alertTitle,
  alertBody,
  onConfirm,
}: AlertDialogComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      {(buttonText?.length ?? 0) > 0 ? (
        <Button
          onClick={onOpen}
          leftIcon={(buttonIcon as React.ReactElement) || undefined}
        >
          {buttonText}
        </Button>
      ) : (
        <IconButton
          aria-label="Open alert dialog"
          onClick={onOpen}
          icon={buttonIcon as React.ReactElement}
        />
      )}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{alertTitle}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{alertBody}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
