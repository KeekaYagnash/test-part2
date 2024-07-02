import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Paragraph from "../../../components/ui/Paragraph";
import TableComponent from "../../../components/table/Table";
import AdvisorsTableConfig from "./AdvistorTableConfig";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import CloseIcon from "@mui/icons-material/Close";
import AddAdvisor from "./AddAdvisor";

const advisors = [
  {
    id: "001",
    firstName: "Phil",
    lastName: "Maitisa",
    email: "phil@rock.com",
    role: "Advisor",
    view: (
      <Link to={"/advisors/advisor?id=001"}>
        <LaunchIcon sx={{ color: "#0BADDE" }} />
      </Link>
    ),
  },
  {
    id: "002",
    firstName: "Kgomotso",
    lastName: "Dungeni",
    email: "kgomotso@rock.com",
    role: "Advisor",
    view: (
      <Link to={"/advisors/advisor?id=002"}>
        <LaunchIcon sx={{ color: "#0BADDE" }} />
      </Link>
    ),
  },
  {
    id: "003",
    firstName: "Yagnash",
    lastName: "Keeka",
    email: "yagi@rock.com",
    role: "Advisor",
    view: (
      <Link to={"/advisors/advisor?id=003"}>
        <LaunchIcon sx={{ color: "#0BADDE" }} />
      </Link>
    ),
  },
  {
    id: "004",
    firstName: "Nhlakanipho",
    lastName: "Mjiyakho",
    email: "mjiji@rock.com",
    role: "Advisor",
    view: (
      <Link to={"/advisors/advisor?id=004"}>
        <LaunchIcon sx={{ color: "#0BADDE" }} />
      </Link>
    ),
  },
  {
    id: "005",
    firstName: "Hannes",
    lastName: "Swanepoel",
    email: "hanness@rock.com",
    role: "Advisor",
    view: (
      <Link to={"/advisors/advisor?id=005"}>
        <LaunchIcon sx={{ color: "#0BADDE" }} />
      </Link>
    ),
  },
  {
    id: "006",
    firstName: "Glen",
    lastName: "Maino",
    email: "glen@rock.com",
    role: "Advisor",
    view: (
      <Link to={"/advisors/advisor?id=006"}>
        <LaunchIcon sx={{ color: "#0BADDE" }} />
      </Link>
    ),
  },
  {
    id: "007",
    firstName: "Xolani",
    lastName: "Zulu",
    email: "zulu@rock.com",
    role: "Advisor",
    view: (
      <Link to={"/advisors/advisor?id=007"}>
        <LaunchIcon sx={{ color: "#0BADDE" }} />
      </Link>
    ),
  },
];

function Advisors() {
  const [rowsData, setRowsData] = useState(advisors);
  const [isLoading, setISLoading] = useState(false);

  // add advisor modal start
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // add advisor modal ends

  return (
    <>
      <Box sx={{ marginLeft: "auto", marginRight: "auto" }}>
        <Box sx={{ paddingX: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Geologica",
              fontWeight: "bold",
              paddingBottom: "3px",
              color: "#2196f3",
            }}
          >
            Advisors
          </Typography>
          <Paragraph
            text={"Manage Advisors and their permissions"}
            fontWeight={"normal"}
          />
        </Box>
        <Divider />
        <Box sx={{ padding: 1 }}>
          <Box sx={{ textAlign: "right", padding: 3 }}>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              sx={{ backgroundColor: "#A9832D", color: "#fff", px: 3 }}
            >
              Add Advisor
            </Button>
          </Box>
          <Box>
            <TableComponent
              columnsData={AdvisorsTableConfig.columnsData}
              rowsData={rowsData}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>

      {/* add advisor modal dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#A9832D", fontWeight: "bold" }}>
          Add New Advisor
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            padding: 2,
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider />
        <DialogContent>
          <DialogContentText>
            Provide the new advisor's details to onboard them on the platform.
          </DialogContentText>
          <br />
          <AddAdvisor />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Advisors;
