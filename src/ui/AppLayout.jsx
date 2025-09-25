import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import BottomNavbar from "./BottomNavbar";

function AppLayout() {
  const location = useLocation();
  const navRequired = location.pathname !== "/project-setup";

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 h-screen grid grid-rows-[auto_1fr_auto] font-poppins font-regular">
      {navRequired && <Header />}
      <main className="text-2xl overflow-scroll h-full">
        {/* <Container> */}
        <Outlet />
        {/* </Container> */}
      </main>
      {navRequired && <BottomNavbar />}
    </div>
  );
}

export default AppLayout;
