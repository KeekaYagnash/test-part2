import React, { useState } from "react";
import Heading from "../../../components/ui/Heading";
import TableConfig from "./TableConfig";
import CommissionAdminView from "./CommissionsAdminView";
import { Box, Divider } from "@mui/material";
import Paragraph from "../../../components/ui/Paragraph";
import TableComponent from "../../../components/table/Table";

function Commissions() {
  const [isLoading, setISLoading] = useState(false);
  return (
    <div>
      <Heading text={"Commission MasterSheet"} />
      <div>
        <Paragraph text={"Commission Overview For All The Advisors"} />
        <Divider />
      </div>
      <Box sx={{ width: "100%", marginTop: 4 }}>
        <TableComponent
          columnsData={TableConfig.columnsData}
          rowsData={CommissionAdminView.rowData}
          isLoading={isLoading}
        />
      </Box>
    </div>
  );
}

export default Commissions;
