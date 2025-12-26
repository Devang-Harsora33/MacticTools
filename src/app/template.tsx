import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mactic Tools",
  description: "Explore our range of quality products at Mactic Tools",
  icons: {
    icon: "/icon.png",
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return children;
}
