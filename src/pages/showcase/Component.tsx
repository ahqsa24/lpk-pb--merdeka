import { AtomsShowcase } from "@/components/atoms/AtomsShowcase";
import { MoleculesShowcase } from "@/components/molecules/MoleculesShowcase";
import { OrganismsShowcase } from "@/components/organisms/OrganismsShowcase";
import { TemplateShowcase } from "@/components/template/TemplateShowcase";
import { Heading } from "@/components/atoms/Heading";

export default function ShowcasePage() {
  return (
    <main className="flex w-full flex-col items-center py-12">
      <div className="w-full max-w-7xl px-6 md:px-16 space-y-12">

        <div className="w-full">
          <Heading level={1} className="text-4xl font-bold mb-2">
            Component Showcase
          </Heading>
        </div>

        {/* Atoms Showcase */}
        <section className="w-full border-t pt-8">
          <AtomsShowcase />
        </section>

        {/* Molecules Showcase */}
        <section className="w-full border-t pt-8">
          <MoleculesShowcase />
        </section>

        {/* Organisms Showcase */}
        <section className="w-full border-t pt-8">
          <OrganismsShowcase />
        </section>

        {/* Templates */}
        <section className="w-full border-t pt-8 pb-8">
          <TemplateShowcase />
        </section>
      </div>
    </main>
  );
}
