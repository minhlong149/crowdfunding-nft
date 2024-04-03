import Header from "@/components/Header";
import EtherProviders from "@/components/EtherProviders";

import "@/app/pico.scss"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EtherProviders>
          <header>
            <Header />
          </header>
          <main>{props.children}</main>
        </EtherProviders>
      </body>
    </html>
  );
}
