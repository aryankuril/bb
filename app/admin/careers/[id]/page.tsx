"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CareerForm from "../../components/CareerForm";

export default function EditCareerPage() {
  const { id } = useParams();
  const [career, setCareer] = useState<any>(null);

  useEffect(() => {
    const fetchCareer = async () => {
      const ref = doc(db, "careers", id as string);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setCareer({ id: snap.id, ...snap.data() });
      }
    };
    fetchCareer();
  }, [id]);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Edit Career</h3>
      {career ? (
        <CareerForm existingCareer={career} />
      ) : (
        <p>Loading career...</p>
      )}
    </div>
  );
}
