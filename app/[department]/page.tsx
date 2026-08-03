import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Preview from "./Preview";
import { getCalculatorDepartment } from "@/lib/server-data";

type PageProps = {
  params: Promise<{ department?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { department } = await params;

  if (!department) {
    notFound();
  }

  const data = await getCalculatorDepartment(department);

  if (!data) {
    notFound();
  }

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
  const { department } = await params;

  if (!department) {
    notFound();
  }

  const data = await getCalculatorDepartment(department);

  if (!data) {
    notFound();
  }

  return (
    <Preview
      department={department}
      initialQuestions={data.questions}
      initialCustomFields={data.customFields}
    />
  );
}
