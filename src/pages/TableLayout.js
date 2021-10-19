import React from "react";
import { Badge, Divider, Typography, Box, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import DataTable from "../components/DataTable";

const TableLayout = () => {
  const { products, currentCategory, totalNumberOfProducts } = useSelector(
    (state) => state.products
  );

  return (
    <>
      {currentCategory ? (
        <>
          <Box>
            <Typography variant="h5" component="div">
              {currentCategory}
              <Badge
                sx={{ marginLeft: 3 }}
                badgeContent={
                  products?.filter((item) => item.seller === currentCategory)
                    .length
                }
                max={
                  products?.filter((item) => item.seller === currentCategory)
                    .length
                }
                color="secondary"
              ></Badge>
            </Typography>
          </Box>

          <Divider sx={{ marginBottom: 3, marginTop: 3 }} />
        </>
      ) : (
        <>
          {totalNumberOfProducts ? (
            <Typography variant="h6" sx={{ marginBottom: 3 }} component="div">
              All products ({totalNumberOfProducts}) are showing
            </Typography>
          ) : (
            <>
              <Typography
                align="center"
                variant="h6"
                sx={{ marginBottom: 3 }}
                component="div"
              >
                Data's Loading...
              </Typography>
              <LinearProgress />
            </>
          )}
        </>
      )}

      <DataTable />
    </>
  );
};

export default TableLayout;
