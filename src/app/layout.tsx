import "./globals.css";
import type { Metadata } from "next";
import styled from "styled-components";
import StyledComponentsRegistry from "./registry";
import { SessionProvider } from "next-auth/react";
import Providers from "./components/Providers";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "WithPT",
  description: "Generated by withPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
