/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Loading from "@/components/shared/Loading/Loading";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";

const ClassAndFaculty = () => {

  const [loading, setLoading] = useState(false);
  const [classRoutine, setClassRoutine] = useState<any>([]);

  const fetchClassRoutine = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "classRoutine"));
      const classRoutineData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ✅ Include document ID
        ...doc.data(),
      }));

      setClassRoutine(classRoutineData);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching cafeteria data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassRoutine();
  }, []);

  return (
    <div className="max-w-2xl mx-auto rounded-lg pb-24">
      {
        loading ? <Loading /> :
          <div className="">
            {
              classRoutine?.map((schedule: any, index: number) => (
                <Image
                  key={index}
                  src={schedule.image}
                  alt={`Class Routine ${index + 1}`}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              ))
            }
          </div>
      }


    </div>
  );
};

export default ClassAndFaculty;
