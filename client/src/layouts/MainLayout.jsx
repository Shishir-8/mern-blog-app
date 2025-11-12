import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";


export default function MainLayout() {
  return (
    <div className="min-h-screen">
        <Navbar />
        <main className="pt-20">
            <Outlet />
        </main>
    </div>
  )
}
