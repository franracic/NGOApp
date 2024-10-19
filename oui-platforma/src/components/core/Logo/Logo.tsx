import { ComponentProps } from "react";

import { Image } from "@chakra-ui/next-js";

interface LogoImageProps
  extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {}

export const LogoImage = (props: LogoImageProps) => {
  return (
    <Image
      src={"https://oui.hr/wp-content/uploads/2021/01/logoOUI..png"}
      alt="Logo"
      height={50}
      width={50}
      {...props}
    />
  );
};
