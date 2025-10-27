"use client";

import { usePathname } from "next/navigation";
import Head from "next/head";

export default function DynamicHead() {
  const pathname = usePathname();
  const page = pathname?.split("/").filter(Boolean).pop() || "Home";

  const formattedPageName =
    page.charAt(0).toUpperCase() + page.slice(1).toLowerCase();

  return (
    <Head>
      <title>{`Bombay Blokes | ${formattedPageName}`}</title>
      <meta
        name="description"
        content="Integrated Digital Solutions in Mumbai | Marketing Agency in Mumbai - Bombay Blokes"
      />
    </Head>
  );
}
