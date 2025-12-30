import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalHeader,
  LegalContent,
  LegalSectionTitle,
  LegalParagraph,
  LegalList,
  LegalInfoBox,
  LegalContactBox,
} from "../../../components/legal";

export const metadata: Metadata = {
  title: "Code of Conduct | Nitrutsav 2026",
  description:
    "Code of Conduct for Nitrutsav 2026 - Learn about our community guidelines and expected behavior.",
};

export default function CodeOfConductPage() {
  return (
    <LegalPageLayout>
      <LegalHeader title="Code of Conduct" />

      <LegalContent>
        <LegalParagraph className="mt-10">
          This Code of Conduct outlines our expectations for all participants at Nitrutsav 2026. We
          are committed to providing a welcoming, safe, and inclusive environment for everyone.
        </LegalParagraph>

        <LegalSectionTitle>Expected Behavior</LegalSectionTitle>
        <LegalParagraph className="mb-4">All participants are expected to:</LegalParagraph>
        <LegalList
          className="space-y-3"
          items={[
            "Be respectful and considerate of others",
            "Communicate openly and thoughtfully with fellow participants",
            "Respect the boundaries and personal space of others",
            "Be collaborative and supportive",
            "Alert event organizers if you notice violations of this Code of Conduct",
            "Follow all venue rules and regulations",
            "Respect the cultural and artistic performances",
          ]}
        />

        <LegalSectionTitle>Unacceptable Behavior</LegalSectionTitle>
        <LegalParagraph className="mb-4">
          The following behaviors are considered unacceptable:
        </LegalParagraph>
        <LegalList
          className="space-y-3"
          items={[
            "Harassment, intimidation, or discrimination in any form",
            "Physical or verbal abuse",
            "Unwelcome sexual attention or advances",
            "Disruptive behavior during events or performances",
            "Damage to venue property or equipment",
            "Possession or use of illegal substances",
            "Violation of photography or recording policies",
            "Any behavior that creates an unsafe environment",
          ]}
        />

        <LegalSectionTitle>Consequences</LegalSectionTitle>
        <LegalParagraph>
          Participants who engage in unacceptable behavior may be asked to stop immediately. If the
          behavior continues, organizers reserve the right to take appropriate action, including:
        </LegalParagraph>
        <LegalList
          className="space-y-3"
          items={[
            "Warning the participant",
            "Expulsion from the event without refund",
            "Reporting to appropriate authorities if necessary",
            "Banning from future Nitrutsav events",
          ]}
        />

        <LegalSectionTitle>Reporting</LegalSectionTitle>
        <LegalParagraph>
          If you experience or witness unacceptable behavior, or have any concerns, please report it
          immediately to event organizers. You can contact us at:
        </LegalParagraph>
        <LegalContactBox
          email="team@nitrutsav.in"
          contacts={[
            {
              group: "Convenors",
              people: [
                { label: "Convenor", name: "Sidheswar Mahananda", phone: "6371872187" },
                { label: "Convenor", name: "Shiba Nanda Sethy", phone: "7682866577" },
              ],
            },
            {
              group: "Organizing Team",
              people: [{ label: "Organizer", name: "Debadutta Nayak", phone: "7855034580" }],
            },
          ]}
        />

        <LegalSectionTitle>Safety and Security</LegalSectionTitle>
        <LegalParagraph>
          Your safety is our priority. Event organizers and security personnel will be present
          throughout the venue. In case of emergency, please contact the nearest organizer or
          security personnel immediately.
        </LegalParagraph>

        <LegalSectionTitle>Photography and Recording</LegalSectionTitle>
        <LegalParagraph>
          Photography and video recording may be permitted in designated areas. Please respect
          performers' and participants' rights. Professional photography or recording for commercial
          purposes requires prior permission from organizers.
        </LegalParagraph>

        <LegalSectionTitle>Acknowledgment</LegalSectionTitle>
        <LegalParagraph>
          By participating in Nitrutsav 2026, you acknowledge that you have read and agree to abide
          by this Code of Conduct. We appreciate your cooperation in making Nitrutsav 2026 a safe,
          welcoming, and enjoyable experience for everyone.
        </LegalParagraph>

        <LegalInfoBox title="Remember:">
          Nitrutsav 2026 is a celebration of culture, creativity, and community. Let's work together
          to create an inclusive and memorable experience for all participants.
        </LegalInfoBox>
      </LegalContent>
    </LegalPageLayout>
  );
}
