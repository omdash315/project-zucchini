import { contactsFirstRow, contactsSecondRow } from "@/config/contact";
import { ContactCard } from "./contact-card";

export default function ContactSection() {
  return (
    <section className="flex flex-col gap-8 sm:gap-12 lg:gap-16 items-center justify-center w-full font-inria">
      {/* Contact Cards Container */}
      <div className="flex flex-col justify-center items-center gap-12 sm:gap-16 lg:gap-20 w-full">
        {/* First Row - Two Cards */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-16 md:gap-24 lg:gap-32 xl:gap-40 w-full">
          {contactsFirstRow.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>

        {/* Second Row - Third Card */}
        {contactsSecondRow.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </section>
  );
}
