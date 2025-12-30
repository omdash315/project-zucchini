import { Baloo_2, Inria_Sans } from "next/font/google";
import localFont from "next/font/local";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baloo",
});
const inriaSans = Inria_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inria",
});
const berryFields = localFont({
  src: "./custom/berryfield.woff",
  variable: "--font-berry",
});

export const fonts = `${baloo.variable} ${inriaSans.variable} ${berryFields.variable}`;
