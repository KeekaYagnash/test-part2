import React, { useState } from "react";
import {
  Breadcrumbs,
  Typography,
  Box,
  Grid,
  Divider,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import Paragraph from "../../../components/ui/Paragraph";
import CloseIcon from "@mui/icons-material/Close";
import ManageAdvisorPermisions from "./ManageAdvisorPermisions";

const advisors = [
  {
    id: "001",
    firstName: "Phil",
    lastName: "Maitisa",
    email: "phil@rock.com",
    role: "Advisor",
    startDate: "12/08/2020",
    endDate: "-",
    status: "Active",
    licenseNo: "TRC-12234254332",
  },
  {
    id: "002",
    firstName: "Kgomotso",
    lastName: "Dungeni",
    email: "kgomotso@rock.com",
    role: "Advisor",
    startDate: "22/02/2021",
    endDate: "-",
    status: "Active",
    licenseNo: "TRC-12789908763",
  },
  {
    id: "003",
    firstName: "Yagnash",
    lastName: "Keeka",
    email: "yagi@rock.com",
    role: "Advisor",
    startDate: "02/04/2022",
    endDate: "-",
    status: "Active",
    licenseNo: "TRC-1298643563",
  },
  {
    id: "004",
    firstName: "Nhlakanipho",
    lastName: "Mjiyakho",
    email: "mjiji@rock.com",
    role: "Advisor",
    startDate: "20/06/2021",
    endDate: "-",
    status: "Active",
    licenseNo: "TRC-1906543543",
  },
  {
    id: "005",
    firstName: "Hannes",
    lastName: "Swanepoel",
    email: "hanness@rock.com",
    role: "Advisor",
    startDate: "01/02/2023",
    endDate: "-",
    status: "Active",
    licenseNo: "TRC-12762354763",
  },
  {
    id: "006",
    firstName: "Glen",
    lastName: "Maino",
    email: "glen@rock.com",
    role: "Advisor",
    startDate: "22/02/2021",
    endDate: "15/03/2024",
    status: "Resigned",
    licenseNo: "TRC-1276876543",
  },
  {
    id: "007",
    firstName: "Xolani",
    lastName: "Zulu",
    email: "zulu@rock.com",
    role: "Advisor",
    startDate: "22/02/2021",
    endDate: "31/06/2022",
    status: "Resigned",
    licenseNo: "TRC-1277778653",
  },
];

function ManageAdvisor() {
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

  const id = new URLSearchParams(window.location.search).get("id");
  let index = -1;
  for (let i = 0; i < advisors.length; i++) {
    if (advisors[i].id === id) {
      index = i;
      break;
    }
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Breadcrumb />
        <br />

        <Grid container spacing={3}>
          {/* Employee details (overview) section */}
          <Grid item xs={12}>
            <Typography
              color="primary"
              fontFamily="Geologica"
              fontWeight="normal"
            >
              {"Advisor details "}
            </Typography>
            <div style={{ width: "100%" }}>
              <Divider />
              {isLoading ? <LinearProgress /> : null}
            </div>
            <Grid container sx={{ padding: "15px", overflow: "hidden" }}>
              <Grid container sm={12} md={7} sx={{ paddingY: "6px" }}>
                {" "}
                {/* Advisor First Name */}
                <Grid item xs={5}>
                  <Paragraph text="First Name" fontWeight="bold" />
                </Grid>
                <Grid item xs={7}>
                  <Paragraph
                    text={advisors[index].firstName}
                    fontWeight="normal"
                  />
                </Grid>
              </Grid>
              <Grid container sm={12} md={7} sx={{ paddingY: "6px" }}>
                {" "}
                {/* Advisor Last Name */}
                <Grid item xs={5}>
                  <Paragraph text={"Last Name"} fontWeight="bold" />
                </Grid>
                <Grid item xs={7}>
                  <Paragraph
                    text={advisors[index].lastName}
                    fontWeight="normal"
                  />
                </Grid>
              </Grid>
              <Grid container sm={12} md={7} sx={{ paddingY: "6px" }}>
                {" "}
                {/* Advisor Email */}
                <Grid item xs={5}>
                  <Paragraph text="Email Address" fontWeight="bold" />
                </Grid>
                <Grid item xs={7}>
                  <Paragraph text={advisors[index].email} fontWeight="normal" />
                </Grid>
              </Grid>
              <Grid container sm={12} md={7} sx={{ paddingY: "6px" }}>
                {/* Advisor License ID */}
                <Grid item xs={5}>
                  <Paragraph text="Licence ID" fontWeight="bold" />
                </Grid>
                <Grid item xs={7}>
                  <Paragraph
                    text={advisors[index].licenseNo}
                    fontWeight="normal"
                  />
                </Grid>
              </Grid>
              <Grid container sm={12} md={7} sx={{ paddingY: "6px" }}>
                <Grid item xs={5}>
                  <Paragraph text="Role" fontWeight="bold" />
                </Grid>
                <Grid item xs={7}>
                  <Paragraph text={advisors[index].role} fontWeight="normal" />
                </Grid>
              </Grid>
              <Grid container sm={12} md={7} sx={{ paddingY: "6px" }}>
                <Grid item xs={5}>
                  <Paragraph text="Start Date" fontWeight="bold" />
                </Grid>
                <Grid item xs={7}>
                  <Paragraph
                    text={advisors[index].startDate}
                    fontWeight="normal"
                  />
                </Grid>
              </Grid>

              <Grid container sm={12} md={7} sx={{ paddingY: "6px" }}>
                <Grid item xs={5}>
                  <Paragraph text="End Date" fontWeight="bold" />
                </Grid>
                <Grid item xs={7}>
                  <Paragraph
                    text={advisors[index].endDate}
                    fontWeight="normal"
                  />
                </Grid>
              </Grid>

              <Grid container sm={12} md={7} sx={{ paddingY: "6px" }}>
                <Grid item xs={5}>
                  <Paragraph text="Status" fontWeight="bold" />
                </Grid>
                <Grid item xs={7}>
                  <Paragraph
                    text={advisors[index].status}
                    fontWeight="normal"
                  />
                </Grid>
              </Grid>

              <Grid container sm={12} md={7} sx={{ paddingY: "20px" }}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#A9832D", marginTop: "10px" }}
                    onClick={handleClickOpen}
                  >
                    Advisor Status
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* add advisor modal dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "#A9832D", fontWeight: "bold" }}>
          Manage Advisor Status
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
            Offboard Advisors by changing their status.
            <br />
            Only Advisors with the status <strong>"ACTIVE"</strong> will be
            given access to the platform.
          </DialogContentText>
          <br />
          <ManageAdvisorPermisions advisor={advisors[index]} />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// bread crumps
function Breadcrumb() {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          className="breadCrumbsLink"
          color="inherit"
          to="/advisors"
        >
          Advisors
        </Link>
        <Typography color="primary" fontFamily="Geologica" fontWeight="normal">
          Manage Advisor
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

export default ManageAdvisor;
