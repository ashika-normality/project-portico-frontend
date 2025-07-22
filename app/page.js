import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";

export default function Home() {
  return (
    <div className="">
      <Toaster position="bottom-right"/>
      <TopBar />
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-primary font-bold text-2xl">Finished Pages</h1>
        <a href="/instructor/login" className="hover:text-primary">Login</a>
        <a href="/instructor/signup " className="hover:text-primary">Signup</a>
        <a href="/instructor/profile " className="hover:text-primary">Profile</a>
      </div>
      <Footer />
    </div>
  );
}
