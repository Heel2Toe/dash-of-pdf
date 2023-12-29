"use client";
import { CldUploadWidget } from 'next-cloudinary'
import Button from "./ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { uploadPdf } from "@/actions/pdfActions";

const PdfUploader = ({}) => {

    const router = useRouter();
    const {email, refetchPdfs} = useUser();

    const handleUpload = async (url : string) => {
        try{
         const result = await uploadPdf(email, url);
         if(result == 'ok'){
           router.push('/dash');
           toast.success('Pdf Uploaded');
           refetchPdfs();
         }
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