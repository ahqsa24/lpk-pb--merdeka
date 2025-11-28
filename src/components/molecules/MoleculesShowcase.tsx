import React from "react";
import { AvatarWithName } from "./AvatarWithName";
import { CardWithImage } from "./CardWithImage";
import { FormField } from "./FormField";
import { StatBox } from "./StatBox";
import { TabGroup } from "./TabGroup";
import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";

export const MoleculesShowcase = () => (
  <div className="w-full space-y-8">
    <Heading level={2} className="text-3xl font-bold">Molecules</Heading>

    {/* AvatarWithName Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">AvatarWithName</Heading>
      <div className="flex gap-8 flex-wrap">
        <AvatarWithName
          src="https://via.placeholder.com/56"
          name="John Doe"
        />
        <AvatarWithName
          src="https://via.placeholder.com/56"
          name="Jane Smith"
        />
      </div>
    </div>

    {/* CardWithImage Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">CardWithImage</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardWithImage
          img="https://via.placeholder.com/300x200"
          title="Sample Card"
          text="This is a card with an image component"
        />
        <CardWithImage
          img="https://via.placeholder.com/300x200"
          title="Another Card"
          text="You can use this for product listings or feature highlights"
        />
      </div>
    </div>

    {/* FormField Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">FormField</Heading>
      <div className="max-w-md">
        <FormField
          label="Username"
          id="username"
          placeholder="Enter your username"
        />
        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
        <FormField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
    </div>

    {/* StatBox Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">StatBox</Heading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox number="1000+" label="Users" />
        <StatBox number="500+" label="Projects" />
        <StatBox number="250+" label="Reviews" />
        <StatBox number="100+" label="Partners" />
      </div>
    </div>

    {/* TabGroup Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">TabGroup</Heading>
      <TabGroup
        tabs={[
          {
            id: "leaderboard",
            label: "Leaderboard",
            content: (
              <div className="space-y-4">
                <Heading level={3}>Leaderboard Peserta</Heading>
                <Paragraph>
                  Daftar peserta dengan skor tertinggi dalam program pelatihan.
                </Paragraph>
                <div className="space-y-2">
                  <p>🥇 Ahmad Rizki - 950 poin</p>
                  <p>🥈 Siti Nurhaliza - 920 poin</p>
                  <p>🥉 Budi Santoso - 890 poin</p>
                </div>
              </div>
            ),
          },
          {
            id: "testimoni",
            label: "Testimoni",
            content: (
              <div className="space-y-4">
                <Heading level={3}>Testimoni Peserta</Heading>
                <Paragraph>
                  Cerita sukses dari peserta yang telah menyelesaikan program
                  pelatihan kami.
                </Paragraph>
                <div className="space-y-2">
                  <p>
                    Program ini sangat bermanfaat untuk meningkatkan skill saya!
                  </p>
                  <p>- Peserta Program Web Development</p>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  </div>
);
