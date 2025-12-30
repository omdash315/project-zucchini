import type { Metadata } from "next";
import ContactSection from "@/components/about/contact";
import DummyAbout from "@/components/about/dummy-about";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About | Nitrutsav 2026",
  description:
    "Learn about Nitrutsav 2026, NIT Rourkela's premier literary and cultural festival celebrating creativity, innovation, and cultural heritage.",
};

export default function AboutPage() {
  return (
    <main className="about-bg-image min-h-screen">
      {/* <AboutSection /> */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="min-h-screen flex flex-col justify-center items-center">
          <div className="w-full">
            <SectionHeading title="ABOUT US " className="text-center" containerClassName="mb-20" />
            <DummyAbout />
          </div>
        </div>
        <div className="min-h-screen flex flex-col justify-center items-center">
          <div className="w-full">
            {" "}
            <SectionHeading
              title="CONTACT US "
              className="text-center"
              containerClassName="mb-20"
            />
            <ContactSection />
          </div>
        </div>

        <div className="mt-20">d</div>
      </div>
    </main>
  );
}
