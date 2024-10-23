import { ChevronDown, Home, Pill, Stethoscope } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../Button";

export function Sidebar() {
  const location = useLocation();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isActiveLab, setIsActiveLab] = useState(false);
  const [isActiveClinic, setIsActiveClinic] = useState(false);

  return (
    <div className="h=[calc(100vh-73px)]">
      <aside
        className="h-full w-12 transition-all duration-500 data-[close=false]:w-[210px]"
        data-close={!isOpenSidebar}
      >
        <ul className="bg-[#0093e7] h-full pt-2 relative">
          {/* item-single */}
          {/* ao clicar nesse, redireciona direto para a tela */}
          <li
            className="list-none py-2.5 hover:bg-[#253d50] cursor-pointer data-[selected=true]:bg-[#253d50] overflow-hidden"
            data-selected={location.pathname === "/"}
          >
            <a href="/" className="flex no-underline text-white items-center">
              <Home className="min-w-[48px] h-4" />
              <span
                className="font-semibold text-sm transition-all delay-100 opacity-0 data-[close=false]:block data-[close=false]:!opacity-100"
                data-close={!isOpenSidebar}
              >
                Home
              </span>
            </a>
          </li>

          {/* item-multiple */}
          {/* ao clicar nesse, abre o submenu, e ao clicar em um elemento do submenu, redireciona para a tela */}
          <li
            className="group overflow-hidden cursor-pointer hover:bg-[#253d50] data-[selected=true]:bg-[#253d50]"
            data-active={isActiveLab}
            data-selected={location.pathname.includes("/clinica")}
          >
            <button
              className="py-2.5 flex items-center justify-between text-white w-full"
              onClick={() => setIsActiveClinic(!isActiveClinic)}
            >
              <a href="/clinica" className="flex items-center">
                <Stethoscope className="min-w-[48px] h-4" />
                <span
                  className="font-semibold transition-all text-sm delay-100 opacity-0 data-[close=false]:block data-[close=false]:!opacity-100"
                  data-close={!isOpenSidebar}
                >
                  Clínica
                </span>
              </a>
              <ChevronDown
                className="min-w-[48px] h-6 transition-all duration-300 opacity-0 data-[close=false]:block data-[close=false]:!opacity-100 data-[active=true]:rotate-[180deg]"
                data-close={!isOpenSidebar}
                data-active={isActiveClinic}
              />
            </button>

            {/* submenu */}
            <ul
              className="hidden data-[active=true]:block pb-1 pr-2 pl-16 bg-[#253d50] data-[close=true]:absolute data-[close=true]:z-50 data-[close=true]:left-[100%] data-[close=true]:!-mt-14 data-[close=true]:py-2 data-[close=true]:px-5 data-[close=true]:min-w-max data-[close=true]:rounded-r-md data-[close=true]:hidden data-[close=true]:opacity-0 data-[close=true]:group-hover:block data-[close=true]:group-hover:opacity-100"
              data-close={!isOpenSidebar}
              data-active={isActiveClinic}
            >
              <li>
                <h3
                  className="text-white text-lg mt-2 mb-1 font-semibold hidden data-[close=true]:block"
                  data-close={!isOpenSidebar}
                >
                  Clínica
                </h3>
              </li>
              <li>
                <a
                  href="/clinica/odontologia"
                  className="text-white text-sm py-3 block whitespace-nowrap opacity-60 transition-opacity hover:opacity-100 data-[selected=true]:opacity-100"
                  data-selected={location.pathname.includes(
                    "/clinica/odontologia"
                  )}
                >
                  Odontologia
                </a>
              </li>
            </ul>
          </li>

          {/* item-multiple */}
          {/* ao clicar nesse, abre o submenu, e ao clicar em um elemento do submenu, redireciona para a tela */}
          <li
            className="group overflow-hidden cursor-pointer hover:bg-[#253d50] data-[selected=true]:bg-[#253d50]"
            data-active={isActiveLab}
            data-selected={location.pathname.includes("/laboratorio")}
          >
            <button
              className="py-2.5 flex items-center justify-between text-white w-full"
              onClick={() => setIsActiveLab(!isActiveLab)}
            >
              <a href="/laboratorio" className="flex items-center">
                <Pill className="min-w-[48px] h-4" />
                <span
                  className="font-semibold transition-all text-sm delay-100 opacity-0 data-[close=false]:block data-[close=false]:!opacity-100"
                  data-close={!isOpenSidebar}
                >
                  Laboratório
                </span>
              </a>
              <ChevronDown
                className="min-w-[48px] h-6 transition-all duration-300 opacity-0 data-[close=false]:block data-[close=false]:!opacity-100 data-[active=true]:rotate-[180deg]"
                data-close={!isOpenSidebar}
                data-active={isActiveLab}
              />
            </button>

            {/* submenu */}
            <ul
              className="hidden data-[active=true]:block pb-1 pr-2 pl-16 bg-[#253d50] data-[close=true]:absolute data-[close=true]:z-50 data-[close=true]:left-[100%] data-[close=true]:!-mt-14 data-[close=true]:py-2 data-[close=true]:px-5 data-[close=true]:min-w-max data-[close=true]:rounded-r-md data-[close=true]:hidden data-[close=true]:opacity-0 data-[close=true]:group-hover:block data-[close=true]:group-hover:opacity-100"
              data-close={!isOpenSidebar}
              data-active={isActiveLab}
            >
              <li className="">
                <h3
                  className="text-white text-lg mt-2 mb-1 font-semibold hidden data-[close=true]:block"
                  data-close={!isOpenSidebar}
                >
                  Laboratório
                </h3>
              </li>
              <li>
                <a
                  href="/laboratorio/mapa-coleta"
                  className="text-white text-sm py-3 block whitespace-nowrap opacity-60 transition-opacity hover:opacity-100 data-[selected=true]:opacity-100"
                  data-selected={location.pathname.includes(
                    "/laboratorio/mapa-coleta"
                  )}
                >
                  Mapa de coleta
                </a>
              </li>
              <li>
                <a
                  href="/laboratorio/mapa-resultado"
                  className="text-white text-sm py-3 block whitespace-nowrap opacity-60 transition-opacity hover:opacity-100 data-[selected=true]:opacity-100"
                  data-selected={location.pathname.includes(
                    "/laboratorio/mapa-resultado"
                  )}
                >
                  Mapa de resultado
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      <Button
        icon="ChevronRight"
        size="icon"
        className={`!bg-white !text-secondary-blue border-spacing-1.5 border-secondary-blue absolute bottom-4 left-8 transition-all duration-500 ${
          isOpenSidebar ? "left-48 rotate-[180deg]" : ""
        }`}
        onClick={() => {
          setIsOpenSidebar(!isOpenSidebar);
          setIsActiveLab(false);
        }}
      />
    </div>
  );
}
