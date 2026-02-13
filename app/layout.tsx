import Header from '../src/components/Header/Header';
import Footer from '../src/components/Footer/Footer';
import TanStackProvider from '../src/components/TanStackProvider/TanStackProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
