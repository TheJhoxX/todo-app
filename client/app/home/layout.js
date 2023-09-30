
import MiNavbar from "@/components/MiNavbar";  
export default function RootLayout({ children }) {
  return (
    <div>
      <MiNavbar /> 
      {children}
    </div>
  );
}

