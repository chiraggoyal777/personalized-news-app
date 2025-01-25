import { Link } from "react-router-dom";
import Container from "./Container";
import SearchBar from "../features/SearchBar";
import { APP_TITLE } from "../lib/constants";

export default function Header() {
  return (
    <header className="sticky left-0 top-0 z-10 w-full bg-primary px-2 py-4 text-white md:py-3">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-between">
          <h1 className="text-center text-2xl font-bold md:text-left">
            <Link to="/">{APP_TITLE}</Link>
          </h1>

          <div className="w-full md:w-auto">
            <SearchBar />
          </div>
        </div>
      </Container>
    </header>
  );
}
