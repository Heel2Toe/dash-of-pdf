"use client";

import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import Header from "./header";
import { redirect } from "next/navigation";
import Loading from "./loading";
import PdfCard from "./pdf-card";
import toast from "react-hot-toast";
import axios from "axios";

export interface PdfProps {
  pdfId: string;
  pdfName: string;
  url: string;
}

const PdfList = () => {
  const { uid, randomVar } = useUser();
  const [pdfs, setPdfs] = useState<PdfProps[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!uid){
       toast.error('Unauthenticated');
       redirect("/");
    }

    const retrievePdfs = async () => {
      try {
        const myPdfs = await axios.get(`/api/getPdfs/${uid}`);
        setPdfs(myPdfs.data);
      } catch (err) {
        toast.error('Something went wrong');

      } finally {
        setMounted(true);
      }
    };
    
    retrievePdfs();

  }, [randomVar]);

  if (!mounted) {
    return <Loading />;
  }

  return (
    <div className="h-full w-full p-5 mt-2">
      <Header
        heading={`Your Pdfs(${pdfs.length})`}
        desc="View or edit existing pdfs to make a brand new one."
      />

      <div className="w-full relative grid gap-x-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
        {pdfs.length > 0 &&
          pdfs.map((pdf, index) => (
            <PdfCard
              key={index}
              pdfId={pdf.pdfId}
              pdfName={pdf.pdfName}
              url={pdf.url}
            />
          ))}
      </div>
    </div>
  );
};

export default PdfList;
