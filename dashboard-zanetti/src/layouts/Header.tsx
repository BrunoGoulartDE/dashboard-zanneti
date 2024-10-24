import logo from "../assets/logo_1.svg";
import { useState } from "react";
import Perfil from "../components/Perfil/Perfil";

import { ChevronDownIcon } from "lucide-react";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  const [isOpenPerfilDetails, setIsOpenPerfilDetails] = useState(false);

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
          <img
            src={"srcassetslogo.svg"}
            alt="user image"
            className="w-14 rounded-full"
          />
          <span className="max-lg:hidden font-bold text-[#3A0CA3]">
            Olá, Leuri
          </span>
          <ChevronDownIcon className="text-[#3A0CA3]"></ChevronDownIcon>
          {isOpenPerfilDetails && <Perfil name={"Leuri"} avatar={"avatar"} />}
        </div>
      </div>
    </div>
  );
}

export default Header;
