import { H1, H2, H3, P } from "@repo/ui/core/typography";
import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  children: ReactNode;
}

export function LegalPageLayout({ children }: LegalPageLayoutProps) {
  return <div className="min-h-screen">{children}</div>;
}

interface LegalHeaderProps {
  title: string;
  subtitle?: string;
}

export function LegalHeader({
  title,
  subtitle = "Last updated: 15th December, 2025",
}: LegalHeaderProps) {
  return (
    <section className="pt-16 px-6">
      <div className="max-w-4xl mx-auto">
        <H1 className="text-4xl mb-4">{title}</H1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}

interface LegalContentProps {
  children: ReactNode;
}

export function LegalContent({ children }: LegalContentProps) {
  return (
    <section className="pb-12 px-6">
      <div className="max-w-4xl mx-auto prose prose-slate">{children}</div>
    </section>
  );
}

interface LegalSectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function LegalSectionTitle({ children, className = "" }: LegalSectionTitleProps) {
  return <H2 className={`mt-12 mb-6 ${className}`}>{children}</H2>;
}

interface LegalSubSectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function LegalSubSectionTitle({ children, className = "" }: LegalSubSectionTitleProps) {
  return <H3 className={`mt-8 mb-4 ${className}`}>{children}</H3>;
}

interface LegalSmallTitleProps {
  children: ReactNode;
  className?: string;
}

export function LegalSmallTitle({ children, className = "" }: LegalSmallTitleProps) {
  return <h4 className={`text-lg font-bold mt-6 mb-3 ${className}`}>{children}</h4>;
}

interface LegalParagraphProps {
  children: ReactNode;
  className?: string;
}

export function LegalParagraph({ children, className = "" }: LegalParagraphProps) {
  return <P className={`leading-relaxed mb-6 ${className}`}>{children}</P>;
}

interface LegalListProps {
  items: ReactNode[];
  className?: string;
}

export function LegalList({ items, className = "" }: LegalListProps) {
  return (
    <ul className={`list-disc pl-6 space-y-2 mb-6 ${className}`}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

interface LegalNoteProps {
  title?: string;
  children: ReactNode;
}

export function LegalNote({ title = "Note:", children }: LegalNoteProps) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
      <p className="text-amber-900 font-semibold">{title}</p>
      <p className="text-amber-800">{children}</p>
    </div>
  );
}

interface LegalInfoBoxProps {
  title?: string;
  children: ReactNode;
}

export function LegalInfoBox({ title = "Important:", children }: LegalInfoBoxProps) {
  return (
    <div className="bg-black border-l-4 border-white p-4 mb-6">
      <p className="text-white font-semibold">{title}</p>
      <p className="text-white">{children}</p>
    </div>
  );
}

interface LegalHighlightBoxProps {
  title?: string;
  children: ReactNode;
}

export function LegalHighlightBox({ title, children }: LegalHighlightBoxProps) {
  return (
    <div className=" border border-slate-300 rounded-lg p-6 mt-8">
      {title && <p className="font-semibold mb-2">{title}</p>}
      <p className="font-semibold">{children}</p>
    </div>
  );
}

interface ContactInfo {
  label: string;
  name: string;
  phone?: string;
}

interface LegalContactBoxProps {
  email?: string;
  contacts?: {
    group: string;
    people: ContactInfo[];
  }[];
}

export function LegalContactBox({ email, contacts }: LegalContactBoxProps) {
  return (
    <div className="border border-slate-200 rounded-lg p-6 mb-6">
      {email && (
        <p className="mb-2">
          <strong>Email:</strong>{" "}
          <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-700 font-semibold">
            {email}
          </a>
        </p>
      )}
      {contacts?.map((group, groupIndex) => (
        <div key={groupIndex}>
          <p className="mb-2">
            <strong>{group.group}:</strong>
          </p>
          <ul className="list-none pl-4 space-y-1 mb-2">
            {group.people.map((person, personIndex) => (
              <li key={personIndex}>
                {person.name}:{" "}
                {person.phone && (
                  <a href={`tel:${person.phone}`} className="text-blue-600 hover:text-blue-700">
                    {person.phone}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

interface LegalEmailLinkProps {
  email: string;
}

export function LegalEmailLink({ email }: LegalEmailLinkProps) {
  return (
    <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-700 font-semibold">
      {email}
    </a>
  );
}
