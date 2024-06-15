import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useRouter } from 'next/router';
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";

const now = new Date();

const columns = [
  {
    accessorKey: "product_id",
    header: "Product ID",
  },
  {
    accessorKey: "date",
    header: "Date",
    Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
  },
  {
    accessorKey: "bale_no",
    header: "Bale No",
  },
  {
    accessorKey: "rfd_white",
    header: "RFD White",
  },
  {
    accessorKey: "order_no",
    header: "Order No",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "no_of_pcs",
    header: "Count",
  },
  {
    accessorKey: "construction",
    header: "Construction",
  },
  {
    accessorKey: "width",
    header: "Width",
  },
  {
    accessorKey: "weave",
    header: "Weave",
  },
  {
    accessorKey: "colour",
    header: "Colour",
  },
  {
    accessorKey: "no_of_pcs",
    header: "No of Pieces",
  },
  {
    accessorKey: "pcs_mtr",
    header: "Pieces Meter",
  },
  {
    accessorKey: "meter",
    header: "Meter",
  },
  {
    accessorKey: "dispatch_meter",
    header: "Dispatch Meter",
  },
  {
    accessorKey: "available_meter",
    header: "Available Meter",
  },
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/Product/allProduct");
        const result = await response.json();
        setData(result || []); // Ensure data is an array
        console.log(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleAddProduct = () => {
    router.push("/addProduct");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Products | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Products</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleAddProduct}
                >
                  Add
                </Button>
              </div>
            </Stack>

            <MantineReactTable
              columns={columns}
              data={data}
              onPageChange={handlePageChange}
              onPageSizeChange={handleRowsPerPageChange}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
