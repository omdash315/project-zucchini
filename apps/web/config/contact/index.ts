export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  phone: string;
  image?: string; // Optional for now
}

export const contactsFirstRow: ContactPerson[] = [
  {
    id: "sidheshwar",
    name: "Sidheshwar Mahananda",
    role: "(Convenor-NITRUTSAV)",
    phone: "+91-8267862398",
  },
  {
    id: "shiba",
    name: "Shiba Nanda Sethy",
    role: "(Convenor-NITRUTSAV)",
    phone: "+91-8267862398",
  },
];

export const contactsSecondRow: ContactPerson[] = [
  {
    id: "debadutta",
    name: "Debadutta Nayak",
    role: "(Organizing Team-NITRUTSAV)",
    phone: "+91-7855034580",
  },
];
