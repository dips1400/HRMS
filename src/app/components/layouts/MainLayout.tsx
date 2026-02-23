import { Outlet, Link, useLocation } from "react-router"
import {
  LayoutDashboard,
  Users,
  Clock,
  CalendarDays,
  Wallet,
  Briefcase,
  TrendingUp,
  GraduationCap,
  ArrowRightLeft,
  UserCheck,
  FileText,
  MessageSquare,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Calculator,
} from "lucide-react"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Attendance", href: "/attendance", icon: Clock },
  { name: "Leave Management", href: "/leave", icon: CalendarDays },
  { name: "Payroll", href: "/payroll", icon: Wallet },
  { name: "Pay Scale & Calculations", href: "/payscale", icon: Calculator },
  { name: "Recruitment", href: "/recruitment", icon: Briefcase },
  { name: "Performance", href: "/performance", icon: TrendingUp },
  { name: "Training", href: "/training", icon: GraduationCap },
  { name: "Transfers", href: "/transfers", icon: ArrowRightLeft },
  { name: "Retirement", href: "/retirement", icon: UserCheck },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Grievances", href: "/grievances", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function MainLayout() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Government HRMS
              </h1>
              <p className="text-xs text-gray-500">
                Human Resource Management System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-[73px] left-0 z-30 h-[calc(100vh-73px)] 
            bg-white border-r border-gray-200 overflow-y-auto
            transition-transform duration-200 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            w-64
          `}
        >
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                    transition-colors
                    ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6 min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
