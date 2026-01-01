import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalHeader,
  LegalContent,
  LegalSectionTitle,
  LegalParagraph,
  LegalList,
  LegalNote,
  LegalEmailLink,
} from "../../../components/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions | Nitrutsav 2026",
  description:
    "Terms and Conditions for Nitrutsav 2026 - Read our terms of service and usage policies.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout>
      <LegalHeader title="Terms and Conditions" />

      <LegalContent>
        <LegalSectionTitle className="mt-0">Welcome to Nitrutsav 2026!</LegalSectionTitle>
        <LegalParagraph>
          The website linked gives you the outline of our protocols. If you agree to the set of
          terms and conditions, you are welcomed as an entrant and will be redirected to proceed
          further.
        </LegalParagraph>

        <LegalSectionTitle>Licence</LegalSectionTitle>
        <LegalParagraph className="mb-4">
          Unless otherwise stated, Nitrutsav and/or its licensors own the intellectual property
          rights for all material on Nitrutsav 2026. All intellectual property rights are reserved.
          You may access this from Nitrutsav 2026 for your personal use subject to restrictions set
          in these terms and conditions.
        </LegalParagraph>
        <LegalParagraph className="mb-4">You must not:</LegalParagraph>
        <LegalList
          items={[
            "Copy or republish material from Nitrutsav 2026",
            "Sell, rent, or sub-license material from Nitrutsav 2026",
            "Reproduce, duplicate or copy material from Nitrutsav 2026",
            "Redistribute content from Nitrutsav 2026",
          ]}
        />
        <LegalParagraph>This Agreement shall begin on the date hereof.</LegalParagraph>

        <LegalSectionTitle>Eligibility</LegalSectionTitle>
        <LegalParagraph>
          Students from recognized educational institutions across India are eligible to participate
          in Nitrutsav 2026. However, students from blacklisted institutions (e.g., Siksha O
          Anusandhan (SOA) University, including all its affiliated colleges, and Institute of
          Technical Education and Research (ITER)) are strictly prohibited from registering or
          participating in the fest.
        </LegalParagraph>
        <LegalNote>
          If a student from a banned institution registers, their registration will be canceled, and
          no refund will be provided.
        </LegalNote>

        <LegalSectionTitle>Disclaimer</LegalSectionTitle>
        <LegalParagraph className="mb-4">
          To the maximum permitted visitors conduct, nothing in this disclaimer will:
        </LegalParagraph>
        <LegalList
          items={[
            "Limit or exclude our or your liability for death or personal injury.",
            "Limit or exclude our or your liability for fraud or fraudulent misrepresentation.",
            "Limit any of our or your liabilities in any way that is not permitted under applicable law.",
            "Exclude any of our or your liabilities that may not be excluded under applicable law.",
          ]}
        />

        <LegalParagraph className="mb-4">
          The limitations and prohibitions of liability set in this section and elsewhere in this
          disclaimer:
        </LegalParagraph>
        <LegalList
          items={[
            "Are subject to the preceding paragraph.",
            "Govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.",
          ]}
        />

        <LegalParagraph>
          As the website can be accessed by all verified visitors, we shall not uphold any liability
          for any damage.
        </LegalParagraph>

        <LegalSectionTitle>Contact Us</LegalSectionTitle>
        <LegalParagraph>
          If you have any questions about these Terms and Conditions, please contact us by email at{" "}
          <LegalEmailLink email="team@nitrutsav.in" />
        </LegalParagraph>
      </LegalContent>
    </LegalPageLayout>
  );
}
