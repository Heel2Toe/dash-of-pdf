import { db } from "@/firebase";
import getPdfInfo from "@/utils/get-pdf-info";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { uid, url } = await req.json();
    if (!uid) {
      return new NextResponse("uid required", { status: 400 });
    }
    if (!url) {
      return new NextResponse("url required", { status: 400 });
    }
    const q = query(collection(db, "userpdfs"), where("uid", "==", uid));
    const queryResult = await getDocs(q);
    const myDoc = queryResult.docs[0];
    const { pdfId, pdfName } = getPdfInfo(url);

    if (!queryResult.empty) {
      const docId = myDoc.id;
      const existingPdfs = myDoc.data().pdfs;
      const docRef = doc(db, "userpdfs", docId);

      if (!existingPdfs.includes(url)) {
        await updateDoc(docRef, {
          pdfs: arrayUnion({ pdfId, pdfName, url }),
        });
        return new NextResponse("Pdf Uploaded", { status: 200 });
      } else {
        return new NextResponse("Pdf Already exists", { status: 200 });
      }
    }
  } catch (err) {
    console.log("[UPLOAD_PDF]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
