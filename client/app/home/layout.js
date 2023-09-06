
import MiNavbar from '../../components/miNavbar'

export default function RootLayout({ children }) {
  return (
    <div>
      <MiNavbar /> 
      {children}
    </div>
  );
}

