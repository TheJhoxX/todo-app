import "../styles/globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "todo-app",
  description: "todo-app fullstack desarrollada por TheJhoxX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full overflow-scroll">
      <body className="dark min-h-full">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
