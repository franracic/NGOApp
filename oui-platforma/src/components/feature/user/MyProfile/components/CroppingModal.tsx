import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { Dispatch, useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./Cropping";

interface ICroppingModalProps {
  imageSrc: string | null;
  setUser: (croppedImage: File) => Promise<void>;
  isCropping: boolean;
  setIsCropping: Dispatch<React.SetStateAction<boolean>>;
}

export const CroppingModal = ({
  imageSrc,
  setUser,
  isCropping,
  setIsCropping,
}: ICroppingModalProps) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      const croppedImageFile = new File([croppedImageBlob], "avatar.jpg", {
        type: "image/jpeg",
      });

      await setUser(croppedImageFile);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imageSrc, setUser]);
  return (
    <Modal isOpen={isCropping} onClose={() => setIsCropping(false)} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crop Your New Avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {imageSrc && (
            <Box position="relative" width="100%" height="400px">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
          )}
          <Box mt={4}>
            <Text>Zoom:</Text>
            <Slider
              aria-label="zoom-slider"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              colorScheme="yellow"
              onChange={(val) => setZoom(val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={showCroppedImage} variant={"light"} mr={3}>
            Save
          </Button>
          <Button colorScheme="red" onClick={() => setIsCropping(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
