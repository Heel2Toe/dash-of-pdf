import { db } from "@/firebase";
import getPdfInfo from "@/utils/get-pdf-info";
import axios from "axios";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";



export const getImages = async (url: string) => {
  try {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/pdfToImages`, {
      headers: {
        "pdf-url": url,
      },
    });
    return result.data.dataUrls;
  } catch (err) {
    toast.error('Something went wrong')
    console.log("GET_IMAGES", err);
  }
};



export const uploadPdf = async (
  email: string,
  url: string
) => {
  try {
    const q = query(collection(db, "userpdfs"), where("email", "==", email));
    const queryResult = await getDocs(q);
    const myDoc = queryResult.docs[0];
    const {pdfId, pdfName} = getPdfInfo(url);

    if (!queryResult.empty) {
      const docId = myDoc.id;
      const existingPdfs = myDoc.data().pdfs;
      const docRef = doc(db, "userpdfs", docId);

      if (!existingPdfs.includes(url)) {
        await updateDoc(docRef, {
          pdfs: arrayUnion({pdfId, pdfName, url}),
        });
        return "ok";
      } else {
        toast.error("Pdf already exists");
        throw Error("Pdf already exists");
      }
    } else {
      toast.error("Invalid user email");
      throw Error("Invalid user email");
    }
  } catch (err) {
    console.log("UPLOAD_PDF", err);
    return "error";
  }
};



export const getPdf = async(images: string[]) => {
   
  try{
    const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/imagesToPdf`,
    {dataUrls: images}, {responseType: 'blob'});
    if(result.status == 200){
      
      const blob = new Blob([result.data], { type: 'application/pdf' });

      const blobUrl = URL.createObjectURL(blob);

      window.location.href = blobUrl;

      URL.revokeObjectURL(blobUrl);
      toast.success('PDF Generated');
    }
  }
  catch(err){
    toast.error('Something went wrong');
    console.log('GET_PDF',err);
    
  }
}


export const displayPdfs = async(email: string) => {

  try{
    const q = query(collection(db, 'userpdfs'), where('email', '==', email));
    const queryResult = await getDocs(q);
    if(queryResult.empty){
      return [];
    }
    const pdfs = queryResult.docs[0].data().pdfs;
    return pdfs;
  }
  catch(err){
    console.log('DISPLAY_PDFS', err);
    toast.error('Something went wrong');
  }
}
