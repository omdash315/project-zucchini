import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalHeader,
  LegalContent,
  LegalSectionTitle,
  LegalSubSectionTitle,
  LegalSmallTitle,
  LegalParagraph,
  LegalList,
  LegalEmailLink,
} from "../../../components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Nitrutsav 2026",
  description:
    "Privacy Policy for Nitrutsav 2026 - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout>
      <LegalHeader title="Privacy Policy" />

      <LegalContent>
        <LegalParagraph className="mt-10">
          This Privacy Policy describes our policies and procedures on the collection, use, and
          disclosure of your information when you use the Service and tells you about your privacy
          rights and how the law protects you. We use Your Personal data to provide and improve the
          Service. By using the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.
        </LegalParagraph>

        <LegalSectionTitle>Interpretation and Definitions</LegalSectionTitle>

        <LegalSubSectionTitle>Interpretation</LegalSubSectionTitle>
        <LegalParagraph>
          The words of which the initial letter is capitalised have meanings defined under the
          following conditions. The following definitions shall have the same meaning regardless of
          whether they appear in singular or in plural.
        </LegalParagraph>

        <LegalSubSectionTitle>Definitions</LegalSubSectionTitle>
        <LegalParagraph className="mb-4">For the purposes of this Privacy Policy:</LegalParagraph>
        <LegalList
          className="space-y-3"
          items={[
            <>
              <strong>Account</strong> means a unique account created for You to access our Service
              or parts of our Service.
            </>,
            <>
              <strong>Affiliate</strong> means an entity that controls, is controlled by or is under
              common control with a party, where "control" means ownership of 50% or more of the
              shares, equity interest or other securities entitled to vote for election of directors
              or other managing authority.
            </>,
            <>
              <strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in
              this Agreement) refers to Nitrutsav.
            </>,
            <>
              <strong>Cookies</strong> are small files that are placed on Your computer, mobile
              device or any other device by a website, containing the details of Your browsing
              history on that website among its many uses.
            </>,
            <>
              <strong>Country</strong> refers to: Orissa, India
            </>,
            <>
              <strong>Device</strong> means any device that can access the Service such as a
              computer, a cell phone or a digital tablet.
            </>,
            <>
              <strong>Personal Data</strong> is any information that relates to an identified or
              identifiable individual.
            </>,
            <>
              <strong>Service</strong> refers to the Website.
            </>,
            <>
              <strong>Service Provider</strong> means any natural or legal person who processes the
              data on behalf of the Company.
            </>,
            <>
              <strong>Usage Data</strong> refers to data collected automatically, either generated
              by the use of the Service or from the Service infrastructure itself.
            </>,
            <>
              <strong>Website</strong> refers to the official website of Nitrutsav.
            </>,
            <>
              <strong>You</strong> means the individual accessing or using the Service, or the
              company, or other legal entity on behalf of which such individual is accessing or
              using the Service, as applicable.
            </>,
          ]}
        />

        <LegalSectionTitle>Collecting and Using Your Personal Data</LegalSectionTitle>

        <LegalSubSectionTitle>Types of Data Collected</LegalSubSectionTitle>

        <LegalSmallTitle>Personal Data</LegalSmallTitle>
        <LegalParagraph className="mb-4">
          While using Our Service, We may ask You to provide Us with certain personally identifiable
          information that can be used to contact or identify You. Personally identifiable
          information may include, but is not limited to:
        </LegalParagraph>
        <LegalList
          items={[
            "Email address",
            "First name and last name",
            "Phone number",
            "Address, State, Province, ZIP/Postal code, City",
            "Usage Data",
          ]}
        />

        <LegalSmallTitle>Usage Data</LegalSmallTitle>
        <LegalParagraph>
          Usage Data is collected automatically when using the Service. Usage Data may include
          information such as Your Device's Internet Protocol address (e.g. IP address), browser
          type, browser version, the pages of our Service that You visit, the time and date of Your
          visit, the time spent on those pages, unique device identifiers and other diagnostic data.
        </LegalParagraph>

        <LegalSubSectionTitle>Use of Your Personal Data</LegalSubSectionTitle>
        <LegalParagraph className="mb-4">
          The Company may use Personal Data for the following purposes:
        </LegalParagraph>
        <LegalList
          className="space-y-3"
          items={[
            "To provide and maintain our Service, including to monitor the usage of our Service.",
            "To manage Your Account: to manage Your registration as a user of the Service.",
            "For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.",
            "To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.",
            "To provide You with news, special offers and general information about other goods, services and events which we offer.",
            "To manage Your requests: To attend and manage Your requests to Us.",
          ]}
        />

        <LegalSectionTitle>Security of Your Personal Data</LegalSectionTitle>
        <LegalParagraph>
          We prioritize the security of your data, employing commercially acceptable methods for
          protection. However, please note that no method of internet transmission or electronic
          storage can guarantee absolute security. While we take steps to protect your information,
          we cannot ensure it will be fully secure.
        </LegalParagraph>

        <LegalSectionTitle>Children's Privacy</LegalSectionTitle>
        <LegalParagraph>
          Our Service is not directed to anyone under the age of 13. We do not knowingly collect
          personally identifiable information from anyone under this age. If you are a parent or
          guardian and discover that your child has provided us with Personal Data, please contact
          us.
        </LegalParagraph>

        <LegalSectionTitle>Changes to This Privacy Policy</LegalSectionTitle>
        <LegalParagraph>
          We may periodically update our Privacy Policy. We will notify you of changes by posting
          the new Privacy Policy on this page and sending you an email and/or a prominent notice on
          our Service before the change becomes effective. The "Last updated" date at the top of
          this Privacy Policy will also be revised.
        </LegalParagraph>

        <LegalSectionTitle>Contact Us</LegalSectionTitle>
        <LegalParagraph>
          If you have any questions about this Privacy Policy, please contact us by email at{" "}
          <LegalEmailLink email="team@nitrutsav.in" />
        </LegalParagraph>
      </LegalContent>
    </LegalPageLayout>
  );
}
