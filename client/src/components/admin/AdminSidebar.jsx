// src/components/admin/AdminSidebar.jsx

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  ChevronRight,
  Store,
  ShieldCheck,
} from "lucide-react";

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
  ];

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <aside className="sticky top-0 flex h-screen w-[230px] shrink-0 flex-col border-r border-white/[0.06] bg-[#090a0c] text-white">

      {/* =====================================================
          BRAND
      ====================================================== */}

      <div className="border-b border-white/[0.06] px-5 py-5">

        <Link
          to="/admin/dashboard"
          className="group flex items-center gap-3"
        >

          {/* Logo */}

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-[1.03]">
            <Store
              size={19}
              strokeWidth={1.8}
            />
          </div>

          {/* Brand */}

          <div className="min-w-0">

            <h1 className="truncate text-sm font-semibold tracking-tight text-white">
              G-Culture
            </h1>

            <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/35">
              Admin Panel
            </p>

          </div>

        </Link>

      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <div className="flex-1 overflow-y-auto px-3 py-6">

        {/* Section Label */}

        <div className="mb-3 px-2">

          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
            Management
          </p>

        </div>

        <nav className="space-y-1">

          {menu.map((item) => {
            const Icon = item.icon;
            const active = isActive(
              item.path
            );

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  group relative flex items-center gap-3
                  rounded-xl px-3 py-2.5
                  transition-all duration-200
                  ${
                    active
                      ? "bg-white/[0.09] text-white"
                      : "text-white/45 hover:bg-white/[0.05] hover:text-white/90"
                  }
                `}
              >

                {/* Active indicator */}

                {active && (
                  <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-white" />
                )}

                {/* Icon */}

                <span
                  className={`
                    flex h-8 w-8 shrink-0 items-center justify-center
                    rounded-lg transition-all duration-200
                    ${
                      active
                        ? "bg-white text-black"
                        : "bg-white/[0.04] text-white/40 group-hover:bg-white/[0.08] group-hover:text-white"
                    }
                  `}
                >
                  <Icon
                    size={15}
                    strokeWidth={
                      active ? 2 : 1.7
                    }
                  />
                </span>

                {/* Name */}

                <span className="flex-1 text-[11px] font-medium">
                  {item.name}
                </span>

                {/* Arrow */}

                <ChevronRight
                  size={13}
                  strokeWidth={1.6}
                  className={`
                    transition-all duration-200
                    ${
                      active
                        ? "translate-x-0 text-white/50"
                        : "-translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-white/25"
                    }
                  `}
                />

              </Link>
            );
          })}

        </nav>

        {/* ===================================================
            STORE SECTION
        ==================================================== */}

        <div className="mt-8">

          <p className="mb-3 px-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
            Store
          </p>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">

            <div className="flex items-start gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldCheck
                  size={15}
                  strokeWidth={1.7}
                />
              </div>

              <div className="min-w-0">

                <p className="text-[10px] font-semibold text-white/75">
                  Store Status
                </p>

                <div className="mt-1.5 flex items-center gap-1.5">

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />

                  <span className="text-[9px] text-white/35">
                    Online
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="border-t border-white/[0.06] p-4">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/25">
              G-Culture
            </p>

            <p className="mt-1 text-[9px] text-white/20">
              Administration
            </p>

          </div>

          <span className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[8px] font-medium text-white/25">
            ADMIN
          </span>

        </div>

      </div>

    </aside>
  );
}