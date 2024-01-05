import { ToastContainer } from "react-toastify";
import Login from "./login/page";

export default function Home() {
  return (
    <main>
      <Login></Login>
      <ToastContainer />
    </main>
  );
}
