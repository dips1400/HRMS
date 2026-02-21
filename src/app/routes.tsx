import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layouts/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { EmployeeList } from "./pages/employees/EmployeeList";
import { EmployeeProfile } from "./pages/employees/EmployeeProfile";
import { AddEmployee } from "./pages/employees/AddEmployee";
import { Attendance } from "./pages/attendance/Attendance";
import { LeaveManagement } from "./pages/leave/LeaveManagement";
import { PayrollDashboard } from "./pages/payroll/PayrollDashboard";
import { SalarySlips } from "./pages/payroll/SalarySlips";
import { Recruitment } from "./pages/recruitment/Recruitment";
import { JobPostings } from "./pages/recruitment/JobPostings";
import { Performance } from "./pages/performance/Performance";
import { Training } from "./pages/training/Training";
import { Transfers } from "./pages/transfers/Transfers";
import { Retirement } from "./pages/retirement/Retirement";
import { Reports } from "./pages/reports/Reports";
import { Documents } from "./pages/documents/Documents";
import { Grievances } from "./pages/grievances/Grievances";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "employees", Component: EmployeeList },
      { path: "employees/add", Component: AddEmployee },
      { path: "employees/:id", Component: EmployeeProfile },
      { path: "attendance", Component: Attendance },
      { path: "leave", Component: LeaveManagement },
      { path: "payroll", Component: PayrollDashboard },
      { path: "payroll/salary-slips", Component: SalarySlips },
      { path: "recruitment", Component: Recruitment },
      { path: "recruitment/jobs", Component: JobPostings },
      { path: "performance", Component: Performance },
      { path: "training", Component: Training },
      { path: "transfers", Component: Transfers },
      { path: "retirement", Component: Retirement },
      { path: "reports", Component: Reports },
      { path: "documents", Component: Documents },
      { path: "grievances", Component: Grievances },
      { path: "settings", Component: Settings },
    ],
  },
]);
