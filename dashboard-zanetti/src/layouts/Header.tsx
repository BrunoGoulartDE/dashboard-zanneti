import logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import Perfil from "../components/Perfil/Perfil";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { kBaseUrl } from "../shared/constants";
import { ChevronDownIcon } from "lucide-react";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const [isOpenPerfilDetails, setIsOpenPerfilDetails] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(logo);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(`${kBaseUrl}/AcademyDashboard`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(response.data.data.name || "Username");
        setAvatar(response.data.data.avatar || logo);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/signin", { replace: true });
        } else {
          console.error("Erro ao buscar dados do dashboard:", error);
        }
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="w-full flex items-center justify-between px-4 py-1 border-b  border-b-gray-300">
      <div className="flex items-center gap-4 w-full">
        <img src={logo} alt="logo tatame" className="w-30" />
        <h2 className="sm:text-sm font-bold text-text font-alt">{title}</h2>
      </div>
      <div className="flex items-center gap-4 justify-end w-full">
        <div
          className="flex items-center gap-2 cursor-pointer relative"
          onClick={() => setIsOpenPerfilDetails(!isOpenPerfilDetails)}
        >
          <img src={avatar} alt="user image" className="w-14 rounded-full" />
          <span className="max-lg:hidden font-bold text-[#3A0CA3]">
            Olá, {userName}
          </span>
          <ChevronDownIcon className="text-[#3A0CA3]"></ChevronDownIcon>
          {isOpenPerfilDetails && <Perfil name={userName} avatar={avatar} />}
        </div>
      </div>
    </div>
  );
}

export default Header;
