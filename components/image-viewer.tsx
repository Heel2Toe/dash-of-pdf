import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import PdfImage from "./pdf-image";
import Button from "./ui/button";
import { getPdf } from "@/actions/pdfActions";
import toast from "react-hot-toast";

const ImageViewer = ({ initialImages }: { initialImages: string[] }) => {
  const [images, setImages] = useState(initialImages);

const downloadPdf = async() => {
  
  try{
    await getPdf(images);
  }
  catch(err){
    console.log('DOWNLOAD_PDF', err);
    
  }
}

 const onDelete = (image: string) => {
   if(images.length == 1){
    toast.error('Pdf must have at least one page')
    return;
   }
   setImages(images.filter((img)=>img != image))
 }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newImages = Array.from(images);
    const [removed] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, removed);  
    setImages(newImages);
  };

  return (
    <div className="flex flex-col">
      <Button 
         variant="secondary" 
         className="self-center mt-3 sm:self-end sm:mt-0 mr-2"
         onClick={downloadPdf}
         >
          Download Pdf
       </Button>


      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists" type="list" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex p-5 gap-5 w-full mt-8 overflow-x-scroll"
            >
              {images.map((image, index) => (
                <Draggable key={index} draggableId={`item-${index}`} index={index}>
                  {(provided) => (
                    <div
                     className="custom-scroll"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PdfImage onClick={()=>onDelete(image)} image={image} index={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageViewer;
