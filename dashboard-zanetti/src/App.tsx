import "./app.css";
import MainLayout from "@/layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <div>
        <div className="flex flex-row items-center md:items-start">
          <h3 className="font-bold text-2xl text-[#3A0CA3] text-center md:text-left">
            Olá
          </h3>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
