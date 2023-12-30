'use client';

import { getImages } from "@/actions/pdfActions";
import Header from "@/components/header";
import ImageViewer from "@/components/image-viewer";
import Loading from "@/components/loading";
import Button from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ViewPdf = () => {
    const {currentPdf} = useUser();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(()=>{
      if(!currentPdf){
        redirect('/dash');
      }
      const retrieveImages = async () => {
        try{
          const retrievedImages = await getImages(currentPdf);
          setImages(retrievedImages);
        }
        catch(err){
           console.log('RETRIEVE_IMAGES', err);
        }
        finally{
          setMounted(true);
        }
      }
      retrieveImages();
    },[]);
    
    if(!mounted){
      return <Loading/>
    }

    return ( 
       <div className="p-4">
         <Header 
         heading={`Pdf pages(${images.length})`}
         desc="Drag and drop pages to rearrange and click on delete to remove unwanted pages"
         />
         {images.length > 0 ? <ImageViewer initialImages={images}/> : 
          <div className="flex space-y-4 flex-col w-full items-center justify-center mt-20 text-xs text-gray-600">
            <p className="text-red-600">Something went wrong</p>
            <Button variant="primary" onClick={()=>router.push('/dash')}>Go home</Button>
          </div>}
       </div>
     );
}
 
export default ViewPdf;