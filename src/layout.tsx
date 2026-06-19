import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
}