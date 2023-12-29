'use client';

import { getImages } from "@/actions/pdfActions";
import Header from "@/components/header";
import ImageViewer from "@/components/image-viewer";
import Loading from "@/components/loading";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ViewPdf = () => {
    const {currentPdf} = useUser();
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
         <ImageViewer initialImages={images}/>
       </div>
     );
}
 
export default ViewPdf;