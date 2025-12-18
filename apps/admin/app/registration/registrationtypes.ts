export type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  registeredAt: string;
  paymentStatus: "paid" | "pending" | "failed";
};
