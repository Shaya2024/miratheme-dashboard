import {
  BookOpen,
  Briefcase,
  Calendar,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  ShoppingCart,
  Package,
  PieChart,
  Sliders,
  Users,
} from "lucide-react";

const pagesSection = [
  {
    href: "/dashboard",
    icon: Sliders,
    title: "Census",
    children: [
      {
        href: "/dashboard/census/admissions-1",
        title: "Admissions 1",
      },
      {
        href: "/dashboard/census/admissions-2",
        title: "Admissions 2",
      },
    ],
  },
  {
    href: "/dashboard",
    icon: Layout,
    title: "IL Staffing",
    children: [
      {
        href: "/dashboard/il-staffing/daily-overview",
        title: "Daily Overview",
      },
      {
        href: "/dashboard/il-staffing/requirements",
        title: "Requirements",
      },
      {
        href: "/dashboard/il-staffing/trend",
        title: "Trend",
      },
      {
        href: "/dashboard/il-staffing/rn-coverage",
        title: "RN Coverage",
      },
      {
        href: "/pages/blank",
        title: "Blank Page",
      },
    ],
  },
  {
    href: "/projects",
    icon: Briefcase,
    title: "Dashboard 3",
    badge: "8",
  },
  {
    href: "/orders",
    icon: ShoppingCart,
    title: "Orders",
  },
  {
    href: "/products",
    icon: Package,
    title: "Products",
  },
  {
    href: "/invoices",
    icon: CreditCard,
    title: "Invoices",
    children: [
      {
        href: "/invoices",
        title: "List",
      },
      {
        href: "/invoices/detail",
        title: "Detail",
      },
    ],
  },
  {
    href: "/tasks",
    icon: CheckSquare,
    title: "Tasks",
    badge: "17",
  },
  {
    href: "/calendar",
    icon: Calendar,
    title: "Calendar",
  },
  {
    href: "/auth",
    icon: Users,
    title: "Auth",
    children: [
      {
        href: "/auth/sign-in",
        title: "Sign In",
      },
      {
        href: "/auth-cover/sign-in",
        title: "Sign In Cover",
      },
      {
        href: "/auth/sign-up",
        title: "Sign Up",
      },
      {
        href: "/auth-cover/sign-up",
        title: "Sign Up Cover",
      },
      {
        href: "/auth/reset-password",
        title: "Reset Password",
      },
      {
        href: "/auth-cover/reset-password",
        title: "Reset Password Cover",
      },
      {
        href: "/error/404",
        title: "404 Page",
      },
      {
        href: "/error/500",
        title: "500 Page",
      },
    ],
  },
  ,
];

const elementsSection = [
  {
    href: "/components",
    icon: Grid,
    title: "Components",
    children: [
      {
        href: "/components/alerts",
        title: "Alerts",
      },
      {
        href: "/components/accordion",
        title: "Accordion",
      },
      {
        href: "/components/avatars",
        title: "Avatars",
      },
      {
        href: "/components/badges",
        title: "Badges",
      },
      {
        href: "/components/buttons",
        title: "Buttons",
      },
      {
        href: "/components/cards",
        title: "Cards",
      },
      {
        href: "/components/chips",
        title: "Chips",
      },
      {
        href: "/components/dialogs",
        title: "Dialogs",
      },
      {
        href: "/components/lists",
        title: "Lists",
      },
      {
        href: "/components/menus",
        title: "Menus",
      },
      {
        href: "/components/pagination",
        title: "Pagination",
      },
      {
        href: "/components/progress",
        title: "Progress",
      },
      {
        href: "/components/snackbars",
        title: "Snackbars",
      },
      {
        href: "/components/tooltips",
        title: "Tooltips",
      },
    ],
  },
  {
    href: "/charts",
    icon: PieChart,
    title: "Charts",
    children: [
      {
        href: "/charts/chartjs",
        title: "Chart.js",
      },
      {
        href: "/charts/apexcharts",
        title: "ApexCharts",
      },
    ],
  },
  {
    href: "/forms",
    icon: CheckSquare,
    title: "Forms",
    children: [
      {
        href: "/forms/pickers",
        title: "Pickers",
      },
      {
        href: "/forms/selection-controls",
        title: "Selection Controls",
      },
      {
        href: "/forms/selects",
        title: "Selects",
      },
      {
        href: "/forms/text-fields",
        title: "Text Fields",
      },
      {
        href: "/forms/editors",
        title: "Editors",
      },
      {
        href: "/forms/formik",
        title: "Formik",
      },
    ],
  },
  {
    href: "/tables",
    icon: List,
    title: "Tables",
    children: [
      {
        href: "/tables/simple-table",
        title: "Simple Table",
      },
      {
        href: "/tables/advanced-table",
        title: "Advanced Table",
      },
      {
        href: "/tables/data-grid",
        title: "Data Grid",
      },
    ],
  },
  {
    href: "/icons",
    icon: Heart,
    title: "Icons",
    children: [
      {
        href: "/icons/material-icons",
        title: "Material Icons",
      },
      {
        href: "/icons/lucide-icons",
        title: "Lucide Icons",
      },
    ],
  },
  {
    href: "/maps",
    icon: Map,
    title: "Maps",
    children: [
      {
        href: "/maps/vector-maps",
        title: "Vector Maps",
      },
    ],
  },
];

const docsSection = [
  {
    href: "/documentation/welcome",
    icon: BookOpen,
    title: "Documentation",
  },
  {
    href: "/changelog",
    icon: List,
    title: "Changelog",
    badge: "v6.0.0",
  },
];

const navItems = [
  {
    title: "Dashboards",
    pages: pagesSection,
  },
  {
    title: "Elements",
    pages: elementsSection,
  },
  {
    title: "Mira Pro",
    pages: docsSection,
  },
];

export default navItems;
