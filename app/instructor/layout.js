import Footer from "../components/Footer"
import TopBar from "../components/TopBar";


export default function InstructorLayout({children}) {
  return (
    <div className="bg-background">
      <TopBar />
        {children}
      <Footer />
    </div>
  );
}
