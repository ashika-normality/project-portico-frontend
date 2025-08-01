import Footer from "../components/Footer"
import TopBar from "../components/TopBar";


export default function InstructorLayout({children}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
        <div className="flex-grow m-0 p-0">
          {children}
        </div>
      <Footer />
    </div>
  );
}
