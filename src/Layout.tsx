import { Toaster } from "react-hot-toast";
import Container from "./components/Container";
import Header from "./components/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <Toaster position="bottom-left" />
    </>
  );
}

export default Layout;
