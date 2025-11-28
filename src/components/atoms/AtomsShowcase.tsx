import React from "react";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import { Card } from "./Card";
import { Heading } from "./Heading";
import { Input } from "./Input";
import { Label } from "./Label";
import { Paragraph } from "./Paragraph";
import { TabButton } from "./TabButton";

export const AtomsShowcase = () => (
  <div className="w-full space-y-8">
    <Heading level={2} className="text-3xl font-bold">Atoms</Heading>

    {/* Button Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">Button</Heading>
      <div className="flex gap-4 flex-wrap">
        <Button>Daftar Sekarang</Button>
      </div>
    </div>

    {/* Avatar Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">Avatar</Heading>
      <div className="flex gap-4 flex-wrap">
        <Avatar src="https://via.placeholder.com/150" />
      </div>
    </div>

    {/* Card Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">Card</Heading>
      <div className="flex gap-4 flex-wrap">
        <Card>
          <Paragraph>This is a card component</Paragraph>
        </Card>
      </div>
    </div>

    {/* Input & Label Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">Input & Label</Heading>
      <div className="flex flex-col gap-4 max-w-md">
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" placeholder="Enter your password" />
        </div>
      </div>
    </div>

    {/* Paragraph Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">Paragraph</Heading>
      <Paragraph>
        This is a paragraph component. You can use it to display text content
        with default styling and formatting.
      </Paragraph>
    </div>

    {/* Heading Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">Heading</Heading>
      <div className="space-y-4">
        <Heading level={1}>Heading Level 1</Heading>
        <Heading level={2}>Heading Level 2</Heading>
        <Heading level={3}>Heading Level 3</Heading>
      </div>
    </div>

    {/* TabButton Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">TabButton</Heading>
      <div className="flex gap-4 flex-wrap">
        <TabButton label="Leaderboard" isActive={true} onClick={() => {}} />
        <TabButton label="Testimoni" isActive={false} onClick={() => {}} />
      </div>
    </div>
  </div>
);
