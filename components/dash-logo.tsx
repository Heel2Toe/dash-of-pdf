import classNames from "classnames";
import { usePathname } from "next/navigation";

interface LogoProps {
  onClick: () => void;
}

const DashLogo: React.FC<LogoProps> = ({ onClick }) => {
  const pathName = usePathname();

  return (
    <div
      onClick={onClick}
      className={classNames(
        `flex items-center text-xs sm:text-sm p-2 border rounded-md cursor-pointer transition`,
        pathName == "/dash" && "border-red-600"
      )}
    >
      <h2>Dashboard </h2>
      <img src="/images/pdfLogo.png" alt="" className="h-3 w-3 sm:h-5 sm:w-5" />
    </div>
  );
};

export default DashLogo;
