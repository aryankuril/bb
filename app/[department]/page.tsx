import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Preview from "./Preview";
import { adminDB } from "@/lib/firebase-admin";

type PageProps = {
  params: { department?: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const department = params.department;

  if (!department) {
    notFound();
  }

  const snap = await adminDB
    .collection("calculatorDepartments")
    .doc(department)
    .get();

  if (!snap.exists) {
    notFound();
  }

  const data = snap.data()!;

  return {
    title:
      data.metaTitle ??
      "Get a Free Digital Marketing Cost Calculator | Bombay Blokes",
    description:
      data.metaDescription ??
      "Plan your digital marketing budget with our easy-to-use cost calculator.",
    openGraph: {
      title:
        data.metaTitle ??
        "Get a Free Digital Marketing Cost Calculator | Bombay Blokes",
      description:
        data.metaDescription ??
        "Plan your digital marketing budget with our easy-to-use cost calculator.",
      type: "website",
    },
  };
}

export default async function DepartmentPage({ params }: PageProps) {
  const department = params.department;

  if (!department) {
    notFound();
  }

  const snap = await adminDB
    .collection("calculatorDepartments")
    .doc(department)
    .get();

  if (!snap.exists) {
    notFound(); // ✅ THIS triggers the real 404 page
  }

  return <Preview />;
}
