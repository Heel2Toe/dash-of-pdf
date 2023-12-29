import { DeleteIcon } from "lucide-react";

interface PdfImageProps {
  image: string;
  index: number;
  onClick: () => void;
}

const PdfImage: React.FC<PdfImageProps> = ({ image, index, onClick }) => {
  return (
    <div
      className="relative  w-64 pb-3 border rounded-lg flex flex-col items-center hover:border-green-600 
                hover:-translate-y-1 transition duration-500 cursor-pointer"
    >
      <img src={image} alt="" className=" h-72 w-64 rounded-t-lg" />
      <p className="text-gray-500 text-sm mt-2">Page {index + 1}</p>
      <button className="absolute bottom-3 right-2">
        <DeleteIcon
          onClick={onClick}
          className="text-gray-500 hover:text-red-600 transition-colors duration-500"
        />
      </button>
    </div>
  );
};

export default PdfImage;
