import React from "react";

interface Official {
  name: string;
  title: string;
  department?: string;
  designation?: string;
  email?: string;
  society?: string;
}

const officials: Official[] = [
  {
    name: "Prof. K. Umamaheshwar Rao",
    title: "Director",
    email: "director@nitrkl.ac.in",
  },
  {
    name: "Niranjan Panda",
    title: "Dean SW",
    email: "dean-sw@nitrkl.ac.in",
  },
  {
    name: "Rajeev Kumar Panda",
    title: "President SAC",
    designation: "Professor",
    email: "rkpanda@nitrkl.ac.in",
  },
  {
    name: "Prateek Khatri",
    title: "Vice President",
    society: "Student Activity Centre (LC)",
    designation: "Assistant Professor",
    department: "Chemical Engineering",
    email: "khatrip@nitrkl.ac.in",
  },
  {
    name: "Adyasha Swayamsiddha Amanta",
    title: "Vice President",
    society: "Student Activity Centre (LC)",
    designation: "Assistant Professor Grade II-A",
    department: "Civil Engineering",
    email: "amantaa@nitrkl.ac.in",
  },
];

const instituteInfo = {
  name: "NATIONAL INSTITUTE OF TECHNOLOGY ROURKELA",
  location: `SRICCE OFFICE NIT ROURKELA, NATIONAL INSTITUTE
OF TECHNOLOGY,ROURKELA, SECTOR-02, ROURKELA, Sundargarh, Odisha, 769008`,
};

interface OfficialCardProps {
  official: Official;
}

function OfficialCard({ official }: OfficialCardProps) {
  return (
    <div className="gradient-border rounded-lg p-6 sm:p-8 w-full max-w-sm ">
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{official.name}</h3>
        {official.designation && (
          <p className="text-sm sm:text-base text-white mb-1">{official.designation}</p>
        )}
        {/* {official.department && (
          <p className="text-xs sm:text-sm text-white mb-2">{official.department}</p>
        )} */}
        <p className="text-base sm:text-lg font-semibold text-white mb-2">{official.title}</p>
        {official.society && (
          <p className="text-sm sm:text-base text-white mb-3 italic">{official.society}</p>
        )}
        {official.email && (
          <a
            href={`mailto:${official.email}`}
            className="text-sm text-white/80 hover:text-white break-all"
          >
            {official.email}
          </a>
        )}
      </div>
    </div>
  );
}

function InstituteInfoCard() {
  return (
    <div className="gradient-border rounded-lg p-6 sm:p-8 w-full max-w-xl">
      <div className="text-center">
        <h2 className=" text-left text-white/80">Legal Name:</h2>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 uppercase">
          {instituteInfo.name}
        </h3>
        <h2 className="text-left text-white/80">Legal Address:</h2>
        <p className="text-base sm:text-lg text-white font-semibold uppercase">
          {instituteInfo.location}
        </p>
      </div>
    </div>
  );
}

export default function InstituteOfficials() {
  const director = officials[0]!;
  const deanAndPresident = [officials[1]!, officials[2]!];
  const vicePresidents = [officials[3]!, officials[4]!];

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 font-inria">
      <div className="flex flex-col items-center justify-center gap-8 sm:gap-10 lg:gap-12">
        {/* Director Row */}
        <div className="flex justify-center w-full">
          <OfficialCard official={director} />
        </div>

        {/* Dean and President Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 w-full max-w-4xl">
          {deanAndPresident.map((official, index) => (
            <OfficialCard key={index} official={official} />
          ))}
        </div>

        {/* Vice Presidents Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 w-full max-w-4xl">
          {vicePresidents.map((official, index) => (
            <OfficialCard key={index} official={official} />
          ))}
        </div>

        {/* Institute Info */}
        <InstituteInfoCard />
      </div>
    </section>
  );
}
