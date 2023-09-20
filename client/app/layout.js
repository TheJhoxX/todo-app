import "../styles/globals.css";
import { Providers } from "./Providers";

export const metadata = {
  title: "todo-app",
  description: "todo-app fullstack desarrollada por TheJhoxX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-screeen overflow-scroll">
      <body className="dark h-full">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
