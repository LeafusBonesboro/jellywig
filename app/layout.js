import "./globals.css";
import Providers from "./providers";
import TopBar from "./components/TopBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
