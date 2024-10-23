import { ChevronDown } from "lucide-react";
import { BiHome, BiStore, BiUserPlus } from "react-icons/bi";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../Button";

export function Sidebar() {
  const location = useLocation();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isActiveStudents, setIsActiveStudents] = useState(false);
  const [isActiveAcademy, setIsActiveAcademy] = useState(false);

  return (
    <div className="h=[calc(100vh-73px)]">
      <aside
        className="h-full w-12 transition-all duration-500 data-[close=false]:w-[210px] "
        data-close={!isOpenSidebar}
      >
        <ul className="h-full pt-2 relative">
          {/* item-single */}
          <li
            className="list-none py-2.5 hover:bg-[#B984DB] cursor-pointer data-[selected=true]:bg-[#ffffff] overflow-hidden"
            data-selected={location.pathname === "/"}
          >
            <a href="/" className="flex no-underline text-black items-center">
              <BiHome className="min-w-[48px] h-4" />
              <span
                className="font-semibold text-sm transition-all delay-100 opacity-0 data-[close=false]:block data-[close=false]:!opacity-100"
                data-close={!isOpenSidebar}
              >
                Início
              </span>
            </a>
          </li>

          {/* item-multiple */}
          <li
            className="group overflow-hidden cursor-pointer hover:bg-[#B984DB] data-[selected=true]:bg-[#ffffff]"
            data-active={isActiveStudents}
            data-selected={location.pathname.includes("/academy")}
          >
            <button
              className="py-2.5 flex items-center justify-between text-black w-full hover:bg-[#B984DB] bg-[#ffffff]"
              onClick={() => setIsActiveAcademy(!isActiveAcademy)}
            >
              <a
                href="/academy"
                className="flex items-center"
                data-selected={location.pathname.includes("academy/classes")}
              >
                <BiStore className="min-w-[33px] h-4 text-center" />
                <span
                  className="font-semibold transition-all text-sm delay-100 opacity-0 data-[close=false]:block data-[close=false]:!opacity-100"
                  data-close={!isOpenSidebar}
                >
                  Academia
                </span>
              </a>
              <ChevronDown
                className="min-w-[48px] h-6 transition-all duration-300 opacity-0 data-[close=false]:block data-[close=false]:!opacity-100 data-[active=true]:rotate-[180deg]"
                data-close={!isOpenSidebar}
                data-active={!isActiveAcademy}
              />
            </button>

            {/* submenu */}
            <ul
              className="hidden data-[active=true]:block pb-1 pr-2 pl-16  bg-[#ffffff] data-[close=true]:absolute data-[close=true]:z-50 data-[close=true]:left-[100%] data-[close=true]:!-mt-14 data-[close=true]:py-2 data-[close=true]:px-5 data-[close=true]:min-w-max data-[close=true]:rounded-r-md data-[close=true]:hidden data-[close=true]:opacity-0 data-[close=true]:group-hover:block data-[close=true]:group-hover:opacity-100"
              data-close={!isOpenSidebar}
              data-active={!isActiveAcademy}
            >
              <li>
                <h3
                  className="text-black text-lg mt-2 mb-1 font-semibold hidden data-[close=true]:block"
                  data-close={!isOpenSidebar}
                >
                  Academia
                </h3>
              </li>
              <li>
                <a
                  href="/academy/classes"
                  className="text-black text-sm py-3 block whitespace-nowrap opacity-60 transition-opacity hover:opacity-100 data-[selected=true]:opacity-100"
                  data-selected={location.pathname.includes("academy/classes")}
                >
                  Turmas
                </a>
              </li>
              <li>
                <a
                  href="/profile/plans"
                  className="text-black text-sm py-3 block whitespace-nowrap opacity-60 transition-opacity hover:opacity-100 data-[selected=true]:opacity-100"
                  data-selected={location.pathname.includes("profile/plans")}
                >
                  Planos
                </a>
              </li>
              <li>
                <a
                  href="/profile/gym"
                  className="text-black text-sm py-3 block whitespace-nowrap opacity-60 transition-opacity hover:opacity-100 data-[selected=true]:opacity-100"
                  data-selected={location.pathname.includes("/profile/gym")}
                >
                  Perfil
                </a>
              </li>
            </ul>
          </li>

          {/* item-multiple */}
          <li
            className="group overflow-hidden cursor-pointer hover:bg-[#ffffff] data-[selected=true]:bg-[#ffffff]"
            data-active={isActiveStudents}
            data-selected={location.pathname.includes("/students")}
          >
            <button
              className="py-2.5 flex items-center justify-between text-black w-full hover:bg-[#B984DB] bg-[#ffffff]"
              onClick={() => setIsActiveStudents(!isActiveStudents)}
            >
              <a href="/students" className="flex items-center">
                <BiUserPlus className="min-w-[35px] h-4" />
                <span
                  className="font-semibold transition-all text-sm delay-100 opacity-0 data-[close=false]:block data-[close=false]:!opacity-100"
                  data-close={!isOpenSidebar}
                >
                  Alunos
                </span>
              </a>
              <ChevronDown
                className="min-w-[48px] h-6 transition-all duration-300 opacity-0 data-[close=false]:block data-[close=false]:!opacity-100 data-[active=true]:rotate-[180deg]"
                data-close={!isOpenSidebar}
                data-active={isActiveStudents}
              />
            </button>

            {/* submenu */}
            <ul
              className="hidden data-[active=true]:block pb-1 pr-2 pl-16 bg-[#ffffff] data-[close=true]:absolute data-[close=true]:z-50 data-[close=true]:left-[100%] data-[close=true]:!-mt-14 data-[close=true]:py-2 data-[close=true]:px-5 data-[close=true]:min-w-max data-[close=true]:rounded-r-md data-[close=true]:hidden data-[close=true]:opacity-0 data-[close=true]:group-hover:block data-[close=true]:group-hover:opacity-100"
              data-close={!isOpenSidebar}
              data-active={isActiveStudents}
            >
              <li className="">
                <h3
                  className="text-black text-lg mt-2 mb-1 font-semibold hidden data-[close=true]:block"
                  data-close={!isOpenSidebar}
                >
                  Alunos
                </h3>
              </li>
              <li>
                <a
                  href="/students"
                  className="text-black text-sm py-3 block whitespace-nowrap opacity-60 transition-opacity hover:opacity-100 data-[selected=true]:opacity-100"
                  data-selected={location.pathname.includes("/students")}
                >
                  Alunos
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
      <Button
        icon="ChevronRight"
        size="icon"
        className={`bg-blue !text-secondary-blue border-spacing-1.5 border-secondary-blue absolute bottom-4 left-8 transition-all duration-500 ${
          isOpenSidebar ? "left-48 rotate-[180deg]" : ""
        }`}
        onClick={() => {
          setIsOpenSidebar(!isOpenSidebar);
          setIsActiveStudents(false);
        }}
      />
    </div>
  );
}
