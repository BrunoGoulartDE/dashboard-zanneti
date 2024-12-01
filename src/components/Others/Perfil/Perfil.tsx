import avatar from "../../../Content/img/avatar.svg";

function Perfil({ name }: { name: string }) {
  return (
    <div
      className={`absolute -right-4 z-50 bg-white top-20 shadow-lg rounded-md px-3 py-2 w-80 animate-height-down`}
    >
      <div className="flex items-center gap-2">
        <img src={avatar} alt="user image" className="w-16" />
        <p className="text-sm">{name}</p>
      </div>
      <div className="mt-3 space-y-2">
        <p>Meus dados</p>
        <p className="font-medium text-red-600 hover:text-red-700 cursor-pointer">
          Sair
        </p>
      </div>
    </div>
  );
}

export default Perfil;
