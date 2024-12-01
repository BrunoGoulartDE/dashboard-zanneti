import { BiSolidArrowFromRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface InfoBarProps {
  pageTitle: string;
  pageDescription: string;
}

const InfoBar: React.FC<InfoBarProps> = ({ pageTitle, pageDescription }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full justify-end">
      <BiSolidArrowFromRight
        className="text-xl mb-2 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <h2 className="text-xl font-bold">{pageTitle}</h2>
      <span className="text-sm">{pageDescription}</span>
    </div>
  );
};

export default InfoBar;
