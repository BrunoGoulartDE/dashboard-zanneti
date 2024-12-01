import logo from "../../assets/logo.svg";
import { Button } from "@/components/ui/button";

function Perfil({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="absolute -right-4 z-50 bg-white top-20 shadow-lg rounded-md px-3 py-2 w-80 animate-height-down">
      <div className="flex items-center gap-2">
        <img src={avatar || logo} alt="user image" className="w-16" />
        <p className="font-bold text-sm text-black">{name}</p>
      </div>
      <div className="mt-3 space-y-2">
        <Button className="bg-color">Meus dados</Button>

        <p className="font-medium text-red-600 hover:text-red-700 cursor-pointer">
          Sair
        </p>
      </div>
    </div>
  );
}

export default Perfil;
