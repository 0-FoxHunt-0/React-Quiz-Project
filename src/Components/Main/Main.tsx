import { ReactNode } from "react";
import "./Main.css";

interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps): JSX.Element {
  return <main className="Main main">{children}</main>;
}

export default Main;
