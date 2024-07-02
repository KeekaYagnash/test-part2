import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

export const AdvisorMenuItems = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: "Dashboard",
    route: "home",
  },
  {
    id: 1,
    icon: <CalculateIcon />,
    label: "Commission",
    route: "my-commission",
  },
  {
    id: 2,
    icon: <QueryStatsIcon />,
    label: "Analytics",
    route: "analytics",
  },
  {
    id: 3,
    icon: <PersonIcon />,
    label: "Profile",
    route: "profile",
  },
  {
    id: 4,
    icon: <LogoutIcon />,
    label: "Logout",
    route: "logout",
  },
];
