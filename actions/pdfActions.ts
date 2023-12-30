import axios from "axios";
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


export const getPdf = async(images: string[]) => {
   
  try{
    const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/imagesToPdf`,
    {dataUrls: images}, {responseType: 'blob'});
    if(result.status == 200){
      
      const blob = new Blob([result.data], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'download.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
      toast.success('PDF Generated');
    }
  }
  catch(err){
    toast.error('Something went wrong');
    console.log('GET_PDF',err);
    
  }
}

