import { ContactPerson } from "@/config/contact";

interface ContactCardProps {
  contact: ContactPerson;
}

export function ContactCard({ contact }: ContactCardProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-auto">
      {/* <div
        className="flex justify-center items-center h-[10rem] w-[10rem] sm:h-[12rem] sm:w-[12rem] lg:h-[14rem] lg:w-[14rem] mb-4 sm:mb-6 rounded-full p-1"
        style={{
          background:
            "linear-gradient(73deg, #FFFABE, #E7581F, #8D2357, #055A44, #FB229E, #9906BE, #FFF)",
        }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
          {contact.image && (
            <Image
              src={contact.image}
              alt={contact.name}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div> */}
      <div className="flex flex-col justify-center items-center text-center gap-1">
        <h1 className="text-white font-semibold text-base sm:text-lg lg:text-xl">{contact.name}</h1>
        <h2 className="text-white/80 text-sm sm:text-base lg:text-lg">{contact.role}</h2>
        <h2 className="text-white font-semibold text-base sm:text-lg lg:text-xl">
          {contact.phone}
        </h2>
      </div>
    </div>
  );
}
