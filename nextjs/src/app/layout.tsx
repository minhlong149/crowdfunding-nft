import EtherProviders from "@/components/EtherProviders";
import Navigation from "@/components/Header/Navigation";

import "@/app/pico.scss"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EtherProviders>
          <main className="container">
            <Navigation />
            {props.children}
          </main>
        </EtherProviders>
      </body>
    </html>
  );
}
