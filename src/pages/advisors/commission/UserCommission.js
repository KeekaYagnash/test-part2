import { React, useEffect, useState } from "react";
import Heading from "../../../components/ui/Heading";
import TableConfig from "./AdvisersCommissionTableConfig";
import { adviserCommissionData } from "./CommissionAdviserView";
import Paragraph from "../../../components/ui/Paragraph";
import { Box, Divider } from "@mui/material";
import TableComponent from "../../../components/table/Table";

const fetchAdviserCommissionData = async (adviserId) => {
  const dataForAdviser = adviserCommissionData.filter(
    (a) => a.Adviser === adviserId
  );

  // if (1 + 1 === 2 ) throw { error: "Test error" };
  // return Promise.resolve(dataForAdviser);
  return new Promise((resolve) =>
    setTimeout(() => resolve(dataForAdviser), 2500)
  );
};

function UserCommission() {
  const adviserId = "John Smith";
  const pageTitle = `My Commission`;
  const pageParagraph = `Commission data for adviser ${adviserId}`;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commissionData, setAdviserCommissionData] = useState([]);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const fetPageDataResult = await fetchAdviserCommissionData(adviserId);

        setAdviserCommissionData(fetPageDataResult);
        setIsLoading(false);
      } catch (fetchDataError) {
        console.error(fetchDataError);

        setError(fetchDataError);
        setIsLoading(false);
      }
    };

    fetchPageData();
  }, [adviserId]);

  return (
    <div>
      <Heading text={pageTitle} />
      <Paragraph text={pageParagraph} />
      <Divider sx={{ mt: 0.5, mb: 3 }} />

      {error ? (
        <>
          <div>An error occurred</div>
          <div>{JSON.stringify(error)}</div>
        </>
      ) : (
        <Box>
          <TableComponent
            columnsData={TableConfig.columnsData}
            rowsData={commissionData}
            isLoading={isLoading}
          />
        </Box>
      )}
    </div>
  );
}

export default UserCommission;
