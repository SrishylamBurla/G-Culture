// src/layouts/AdminLayout.jsx

import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout({ menuOpen }) {
  const [scrollDir, setScrollDir] = useState("up");

  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  /* =========================================================
     SCROLL DIRECTION
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // Always show nav at the very top
        if (currentY <= 10) {
          setScrollDir("up");
        } else if (currentY > lastYRef.current + 8) {
          setScrollDir("down");
        } else if (currentY < lastYRef.current - 8) {
          setScrollDir("up");
        }

        lastYRef.current = currentY;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
  ========================================================= */

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  /* =========================================================
     MOBILE NAV ANIMATION
  ========================================================= */

  const mobileNavVisible = scrollDir === "up";

  return (
    <div className="min-h-screen bg-[#f7f7f8] pt-[9.75rem] md:pt-[5.8rem]">
      {/* =====================================================
          ADMIN SHELL
      ====================================================== */}

      <div className="flex min-h-[calc(100vh-9.75rem)] w-full">
        {/* ===================================================
            DESKTOP SIDEBAR
        ==================================================== */}

        <aside
          className="
            hidden
            w-[240px]
            shrink-0
            border-r
            border-gray-200
            bg-white
            lg:block
          "
        >
          <div className="sticky top-0 h-[calc(100vh-9.75rem)] overflow-y-auto">
            <AdminSidebar />
          </div>
        </aside>

        {/* ===================================================
            MAIN AREA
        ==================================================== */}

        <div className="flex min-w-0 flex-1 flex-col">
          {/* =================================================
              MOBILE ADMIN NAV
          ================================================== */}

          <div className="block lg:hidden">
            <div
              className={`
                fixed
                left-0
                top-[5.5rem]
                z-[1000]
                w-full
                overflow-hidden
                transition-all
                duration-300
                ease-out
                ${
                  mobileNavVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 opacity-0 pointer-events-none"
                }
              `}
            >
              <div
                className="
                  flex
                  min-w-max
                  items-center
                  gap-1
                  overflow-x-auto
                  border-b
                  border-white/10
                  bg-[rgba(0,0,0,0.72)]
                  px-3
                  py-3
                  shadow-lg
                  backdrop-blur-xl
                  sm:px-4
                "
              >
                <MobileAdminLink
                  to="/admin/dashboard"
                  label="Dashboard"
                />

                <MobileAdminLink
                  to="/admin/products"
                  label="Products"
                />

                <MobileAdminLink
                  to="/admin/orders"
                  label="Orders"
                />

                <MobileAdminLink
                  to="/admin/users"
                  label="Users"
                />
              </div>
            </div>
          </div>

          {/* =================================================
              PAGE CONTENT
          ================================================== */}

          <main className="min-w-0 flex-1">
            <div className="min-h-full w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   MOBILE ADMIN LINK
============================================================= */

function MobileAdminLink({ to, label }) {
  const { pathname } = useLocation();

  const active =
    pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      className={`
        whitespace-nowrap
        rounded-lg
        px-3.5
        py-2
        text-[14px]
        font-bold
        transition-all
        duration-200
        ${
          active
            ? "bg-white text-gray-900 shadow-sm"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      {label}
    </Link>
  );
}