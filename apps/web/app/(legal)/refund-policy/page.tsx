import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalHeader,
  LegalContent,
  LegalSectionTitle,
  LegalParagraph,
  LegalInfoBox,
  LegalHighlightBox,
  LegalEmailLink,
} from "../../../components/legal";

export const metadata: Metadata = {
  title: "Refund Policy | Nitrutsav 2026",
  description:
    "Refund Policy for Nitrutsav 2026 - Learn about our registration fees and refund terms.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout>
      <LegalHeader title="Refund Policy" />

      <LegalContent>
        <LegalParagraph className="mt-10">
          At Nitrutsav 2026, we are committed to providing an enriching experience for all
          participants. Please review our refund policy carefully:
        </LegalParagraph>

        <LegalSectionTitle>Pricing</LegalSectionTitle>
        <LegalParagraph>
          The registration fees for Nitrutsav 2026 apply to all students from outside NIT Rourkela.
          This fee grants access to all events, workshops, and exhibitions during the fest. For
          students of NIT Rourkela, registration is completely free.
        </LegalParagraph>
        <LegalParagraph>
          Registration covers participation in most events, though some workshops may require
          additional fees for materials. We encourage all students to register early to secure their
          spot, as registrations may close once we reach capacity.
        </LegalParagraph>

        <LegalSectionTitle>No Refunds on Registrations and Payments</LegalSectionTitle>
        <LegalParagraph>
          Once registration or payment is completed, refunds will not be issued under any
          circumstances. This applies to all ticket types, event passes, and additional purchases
          made through our website.
        </LegalParagraph>
        <LegalInfoBox>
          We highly recommend double-checking your availability before confirming your registration.
        </LegalInfoBox>

        <LegalSectionTitle>Event Cancellation by Organizers</LegalSectionTitle>
        <LegalParagraph>
          Refunds will only be issued if Nitrutsav 2026 is canceled by the organizers. In such a
          case, all registered participants will receive a full refund through the original payment
          method, processed within 14 days of the cancellation announcement.
        </LegalParagraph>

        <LegalSectionTitle>Force Majeure</LegalSectionTitle>
        <LegalParagraph>
          In the event of unforeseen circumstances such as natural disasters, government
          restrictions, or other events beyond our control, Nitrutsav 2026 organizers will make
          every effort to reschedule. However, refunds will not be issued under these conditions.
          Refunds will only be processed if Nitrutsav 2026 is officially canceled by the organizers.
        </LegalParagraph>

        <LegalSectionTitle>Contact for Help</LegalSectionTitle>
        <LegalParagraph>
          If you have any questions or need assistance with your registration, please feel free to
          reach out to our support team at <LegalEmailLink email="team@nitrutsav.in" />. We are here
          to help with any queries related to registration, event details, or technical issues. Our
          team will respond within 24-48 hours to ensure you have all the information you need to
          enjoy Nitrutsav 2026 to the fullest.
        </LegalParagraph>

        <LegalHighlightBox>
          By registering for Nitrutsav 2026, you agree to abide by our refund policy.
        </LegalHighlightBox>
      </LegalContent>
    </LegalPageLayout>
  );
}
