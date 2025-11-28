import React from "react";
import { Avatar } from "../atoms/Avatar";
import { Paragraph } from "../atoms/Paragraph";

interface AvatarWithNameProps {
  src: string;
  name: string;
}

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({ src, name }) => (
  <div className="flex flex-col items-center gap-2">
    <Avatar src={src} size={56} />
    <Paragraph className="font-medium text-center">{name}</Paragraph>
  </div>
);