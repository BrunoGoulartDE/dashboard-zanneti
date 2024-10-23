import logo from "@/assets/logo.png";
import avatar from "../../../Content/img/avatar.svg";
import { useState } from "react";
import Perfil from "../Perfil/Perfil";

interface HeaderProps {
  title: string;
  username: string;
}

function Header({ title, username }: HeaderProps) {
  const [isOpenPerfilDetails, setIsOpenPerfilDetails] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-b-gray-300">
      <div className="flex items-center gap-4 w-full">
        <img src={logo} alt="logo Genesis X" className="w-40" />
        <h2 className="sm:text-xl font-bold text-text font-alt">{title}</h2>
      </div>
      <div className="flex items-center gap-4 justify-end w-full">
        <div
          className="flex items-center gap-2 cursor-pointer relative"
          onClick={() => setIsOpenPerfilDetails(!isOpenPerfilDetails)}
        >
          <img src={avatar} alt="user image" className="w-14" />
          <span className="max-lg:hidden">{username}</span>
          {isOpenPerfilDetails && <Perfil name={username} />}
        </div>
      </div>
    </div>
  );
}

export default Header;
