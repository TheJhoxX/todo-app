import "../styles/globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "todo-app",
  description: "todo-app fullstack desarrollada por TheJhoxX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full">
      <body className="dark h-full">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
