import MainLayout from "@/layouts/MainLayout";

import InfoBar from "@/layouts/InfoBar";

const GerenciarAluno = () => {
  return (
    <MainLayout>
      <div>
        <div className="flex flex-col w-full justify-end">
          <InfoBar
            pageTitle="Gerenciar alunos"
            pageDescription={`Gerencie seus alunos`}
          ></InfoBar>
        </div>
      </div>
    </MainLayout>
  );
};

export default GerenciarAluno;
