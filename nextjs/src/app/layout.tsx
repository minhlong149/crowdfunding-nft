import Header from "@/components/Header";
import EtherProviders from "@/components/EtherProviders";

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
