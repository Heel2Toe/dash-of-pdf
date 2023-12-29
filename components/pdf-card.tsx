import { useUser } from "@/hooks/useUser";
import { PdfProps } from "./pdf-list";
import Button from "./ui/button";
import { useRouter } from "next/navigation";

const PdfCard: React.FC<PdfProps> = ({ pdfId, pdfName, url }) => {
  const { updateUser } = useUser();
  const router = useRouter();

  const editPdf = (url: string) => {
    updateUser({ currentPdf: url });
    router.push("/dash/viewPdf");
  };

  return (
    <div
      className="relative h-32 w-40 p-4 flex flex-col items-center justify-center space-y-2 hover:border-red-600 
                 hover:-translate-y-2 transition duration-500  border shadow-sm rounded-md"
    >
      <p className="text-xs">{pdfName}</p>
      <div className="flex items-center justify-around w-full">
        <img src="./images/pdfLogo.png" alt="" className="h-10 w-10" />
        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => router.push(url)}
            variant="primary"
            className="text-xs"
          >
            View Pdf
          </Button>
          <Button
            onClick={() => editPdf(url)}
            variant="secondary"
            className="text-xs"
          >
            Edit Pdf
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PdfCard;
