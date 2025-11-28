import React from "react";
import { Card } from "../atoms/Card";
import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import Image from "next/image"

interface MissionCardProps {
  img: string;
  title: string;
  text: string;
}
export const MissionCard: React.FC<MissionCardProps> = ({ img, title, text }) => (  
  <Card className="bg-red-600 text-amber-50">
    <Image 
        src={img} 
        alt={title} 
        width={300}
        height={200}
        className="w-full rounded-xl mb-3 object-cover" />
    <Heading level={3} className="text-lg text-center py-2">{title}</Heading>
    <Paragraph variant="white">{text}</Paragraph>
  </Card>
);