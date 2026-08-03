import React from "react";
import Route from "./Route";

type PreviewProps = {
  department: string;
  initialQuestions: unknown[];
  initialCustomFields: unknown[];
};

export default function Preview({
  department,
  initialQuestions,
  initialCustomFields,
}: PreviewProps) {
  return (
    <Route
      department={department}
      initialQuestions={initialQuestions}
      initialCustomFields={initialCustomFields}
    />
  );
}
