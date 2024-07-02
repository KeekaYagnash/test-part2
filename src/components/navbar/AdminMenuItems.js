import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import { CloudUpload } from "@mui/icons-material";

export const AdminMenuItems = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: "Dashboard",
    route: "dashboard",
  },
  {
    id: 1,
    icon: <CloudUpload />,
    label: "Upload",
    route: "upload",
  },
  {
    id: 2,
    icon: <MonetizationOnIcon />,
    label: "Commissions",
    route: "commissions",
  },
  {
    id: 3,
    icon: <PeopleIcon />,
    label: "Advisors",
    route: "advisors",
  },
  {
    id: 4,
    icon: <PersonIcon />,
    label: "Profile",
    route: "profile",
  },
  {
    id: 5,
    icon: <LogoutIcon />,
    label: "Logout",
    route: "logout",
  },
];
