import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="h-full bg-gray-100">
        <div className="m-auto">{children}</div>
      </main>
      <Footer />
    </>
  );
}
