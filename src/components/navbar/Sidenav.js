import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Grid, Menu, MenuItem, Typography } from "@mui/material";
import LogoWhite from "../Logo/LogoWhite";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import LogoutIcon from "@mui/icons-material/Logout";
import Paragraph from "../ui/Paragraph";

const drawerWidth = 240;

function Sidenav({ menuItems }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = useNavigate();

  // Create a URLSearchParams object with the current URL's query string
  const urlPathObj = new URL(window.location.href);
  const urlPath = urlPathObj.href;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            onClick={() => navigate(item.route)}
            sx={{
              backgroundColor: urlPath.includes(item.route) ? "#A9832D" : "",
            }}
          >
            <ListItemButton>
              <ListItemIcon
                sx={{
                  color: urlPath.includes(item.route) ? "#fff" : "#fff",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: urlPath.includes(item.route) ? "#fff" : "#fff",
                }}
                primary={item.label}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // nav bar with account and profile icons
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("profile")}>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        My Account
      </MenuItem>
      <MenuItem onClick={() => navigate("support")}>
        <ListItemIcon>
          <ContactSupportIcon />
        </ListItemIcon>
        Contact Support
      </MenuItem>
      <MenuItem onClick={() => navigate("legal")}>
        <ListItemIcon>
          <PrivacyTipIcon />
        </ListItemIcon>
        Legal Terms
      </MenuItem>
      <MenuItem onClick={() => navigate("signout")}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => navigate("profile")}>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        My Account
      </MenuItem>
      <MenuItem onClick={() => navigate("support")}>
        <ListItemIcon>
          <ContactSupportIcon />
        </ListItemIcon>
        Contact Support
      </MenuItem>
      <MenuItem onClick={() => navigate("legal")}>
        <ListItemIcon>
          <PrivacyTipIcon />
        </ListItemIcon>
        Legal Terms
      </MenuItem>
      <MenuItem onClick={() => navigate("logout")}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      id="sideNav"
      sx={{ display: "flex", flex: "100%", overflow: "hidden" }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#181C24",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography
              sx={{
                color: "white",
                marginRight: "15px",
                marginTop: "12px",
              }}
            >
              {/* Loged in User name */}
              Logged in as {localStorage.getItem("email")}
            </Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#181C24",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#181C24",
            },
          }}
          open
        >
          <Box sx={{ width: "130px", height: "auto", paddingLeft: "10px" }}>
            <Link sx={{ p: 0 }} to={"/dashboard"}>
              <LogoWhite width={130} />
            </Link>
          </Box>
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: "auto",
          height: "100vh",
          background: "#f6f9ff",
          width: {
            xs: "100vw",
            sm: `calc(100vw - ${drawerWidth}px)`,
          },
        }}
      >
        <Toolbar />
        <Outlet />
        <br />
      </Box>
    </Box>
  );
}

export default Sidenav;
