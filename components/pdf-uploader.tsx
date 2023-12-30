"use client";
import { CldUploadWidget } from 'next-cloudinary'
import Button from "./ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import axios from 'axios';

const PdfUploader = () => {

    const router = useRouter();
    const {uid, refetchPdfs} = useUser();

    const handleUpload = async (url : string) => {
        try{
         const result = await axios.post(`/api/uploadPdf`,{uid, url});
         toast(result.data);       
         refetchPdfs();
        }
        catch(err){
          toast.error('Something went wrong');
          console.log('PDF_UPLOAD', err);
          throw err        
        }
      } 


    const onUpload = (result: any) => {
        handleUpload(result.info.secure_url)
    }
    
    return(
        <div>
            <CldUploadWidget  onUpload={onUpload} uploadPreset="nhhv8ias">
              {({ open }) => {
                const onClick = () => {
                    open();
                }
                return (
                    <Button
                    variant="secondary"
                    onClick={onClick}
                    >
                        Upload Pdf
                    </Button>
                )
              }}
            </CldUploadWidget>
        </div>
    )
}

export default PdfUploader