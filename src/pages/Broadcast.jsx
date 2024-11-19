import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useMemo } from "react";
import BasicModal from "../components/Modal";
import { color, motion } from "framer-motion";
import axios from "axios";

// Table Needed Items

import { styled } from "@mui/material/styles";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
  TableSortLabel,
  Button,
  Paper,
  Grid,
  IconButton,
  TablePagination,
} from "@mui/material";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import {
  faArrowLeft,
  faPenSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Search as SearchIcon,
  GetApp as GetAppIcon,
} from "@mui/icons-material";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  overflowX: "auto",
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 600,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableHeadCell,
  StyledTableRow,
  StyledTextField,
  StyledButton,
};

function Broadcast() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [webhooksData, setWebhooksData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("dateTime");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const handleAddBroadcast = (newData) => {
  //   setWebhooksData((prev) => [
  //     ...prev,
  //     {
  //       ...newData,
  //       id: Date.now(),
  //       created: new Date().toISOString(),
  //       lastupdate: new Date().toISOString(),
  //       webhook_url: newData.webhook_url,
  //       status: newData.status,
  //     },
  //   ]);
  //   handleCloseModal();
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    setWebhooksData((prevData) => prevData.filter((row) => row.id !== id));
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(
  //         "http://service1.nuke.co.in/api/webhook",
  //         {
  //           headers: {
  //             Authorization:
  //               "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDIxMzQ0M2I4NjBiNTRlZWRlMjhjY2VlMGZmZWVkYWRiZWMzNmRjN2E5OThlZWIyZDExYTlkNDZmZWE0NTFlNzVlN2ZlYjZmZDYxNzg1OGEiLCJpYXQiOjE3MzE0ODc5MTAuODU4MjQ0LCJuYmYiOjE3MzE0ODc5MTAuODU4MjUxLCJleHAiOjE3NjMwMjM5MTAuODQ5OTM1LCJzdWIiOiI2OSIsInNjb3BlcyI6W119.g78aoi0_Kr-7MDl0Bu6eNVmUh2MJsOPwCn5NrEwvSuINeUH9rKCjIPDk7GP-du6ivym-WfjCg2RJmCu_YuIPzkRcRZJTvHe9da6zIeE8DZKqFzxZ1HCHe4P68NlWmRkiVfe8Rwvaxz8sgl4QK9VfAnS9cH8qNjth0r87lH7DtR9b1QvY_QpcgllR0HyMDjBaH7KUJzL10oTiOhMpYIJzUj_qqKhNs9P13FUMLsCgu193tU89Ir2ti3QPm4AA-GJX9SP5yAHRdhCw_5SnaX9BxWP2NDLejts_klQDFb1LZ8tWFKfh8wIllUrPeexQGj0ewPeBLyn64PK4DfSnpGXVxQnWypctvbH4ouWVHMt2vY0V6j5QWIjIe_KCR3229CwEfnC3ULRZVClYRHszfs_B5Jl4nmhO-5lgZ9LRbiMERk5pn7i8Y9DOjToirtCJJPef4l11fdGBk_fru1LKCs1i2h16wehQW1GbwZWSo3SKLkq9elmw6lyJLyrAX3mJgVjs4jv9YpAfk0eShKUIqE3i8TlIvLwZIOrradpSBDbqBD9YUzMadPqwfMU_2afYCbMtS24jNqdWZf6A102LOAbL4N8zINQfoNmsQScje2_NzCtybTveuhZDmHe6FVDVBgGtMjsXbAxMKvbItxrlwYdHVKDRkwD0ERWbiWoK3p7qQU0",
  //           },
  //         }
  //       );
  //       setData(response.data);
  //       console.log(response.data);
  //       console.log(data);
  //     } catch (error) {
  //       console.log("Something went wrong");
  //     }
  //   };
  //   fetchData();
  // }, []);

  const fetchWebhooksData = async () => {
    try {
      // Temporary mock API response
      const response = await axios.post(
        "http://service1.nuke.co.in/api/webhook-logs",
        {
          action: "read",
          username: "rahul1011",
        },
        {
          headers: {
            // Directly use the token here
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDIxMzQ0M2I4NjBiNTRlZWRlMjhjY2VlMGZmZWVkYWRiZWMzNmRjN2E5OThlZWIyZDExYTlkNDZmZWE0NTFlNzVlN2ZlYjZmZDYxNzg1OGEiLCJpYXQiOjE3MzE0ODc5MTAuODU4MjQ0LCJuYmYiOjE3MzE0ODc5MTAuODU4MjUxLCJleHAiOjE3NjMwMjM5MTAuODQ5OTM1LCJzdWIiOiI2OSIsInNjb3BlcyI6W119.g78aoi0_Kr-7MDl0Bu6eNVmUh2MJsOPwCn5NrEwvSuINeUH9rKCjIPDk7GP-du6ivym-WfjCg2RJmCu_YuIPzkRcRZJTvHe9da6zIeE8DZKqFzxZ1HCHe4P68NlWmRkiVfe8Rwvaxz8sgl4QK9VfAnS9cH8qNjth0r87lH7DtR9b1QvY_QpcgllR0HyMDjBaH7KUJzL10oTiOhMpYIJzUj_qqKhNs9P13FUMLsCgu193tU89Ir2ti3QPm4AA-GJX9SP5yAHRdhCw_5SnaX9BxWP2NDLejts_klQDFb1LZ8tWFKfh8wIllUrPeexQGj0ewPeBLyn64PK4DfSnpGXVxQnWypctvbH4ouWVHMt2vY0V6j5QWIjIe_KCR3229CwEfnC3ULRZVClYRHszfs_B5Jl4nmhO-5lgZ9LRbiMERk5pn7i8Y9DOjToirtCJJPef4l11fdGBk_fru1LKCs1i2h16wehQW1GbwZWSo3SKLkq9elmw6lyJLyrAX3mJgVjs4jv9YpAfk0eShKUIqE3i8TlIvLwZIOrradpSBDbqBD9YUzMadPqwfMU_2afYCbMtS24jNqdWZf6A102LOAbL4N8zINQfoNmsQScje2_NzCtybTveuhZDmHe6FVDVBgGtMjsXbAxMKvbItxrlwYdHVKDRkwD0ERWbiWoK3p7qQU0`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.data);

      setWebhooksData(response.data.data);
      console.log(webhooksData)
      // // Process the mock response as you would the real data
      // const data = response.map((item) => {
      //   // const { date, time } = parseDateTimeFromDte(item.dte || "");
      //   return {
      //     id: item.id,
      //     webhook_url: item.webhook_url,
      //     status: item.status,
      //     created: item.created,
      //     lastupdate: item.lastupdate,
      //   };
      // });
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };

  const filteredData =  webhooksData;


  useEffect(() => {
    fetchWebhooksData();
  }, []);

  return (
    <>
      {/* Header with Back Button and Heading */}
      <div className="bg-white p-6 m-3.5 shadow-md mb-5 rounded-xl">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-[#1E90FF] font-bold py-2 px-4 rounded-full hover:bg-indigo-100 transition duration-300 flex items-center"
            aria-label="Go back"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>

          <h1 className="text-2xl md:text-3xl font-bold  text-center">
            Webhooks
          </h1>

          <button
            className="bg-white text-[#1E90FF] py-2 px-6 rounded-full cursor-pointer font-bold hover:bg-indigo-100 transition duration-300"
            onClick={handleOpenModal}
            aria-label="Start a new broadcast"
          >
            Add Webhooks →
          </button>
        </div>
      </div>

      {/* main component */}

      {/* Table Section */}
      <Grid container spacing={2} className="flex justify-end items-end">
        <Grid item xs={4} sm={3}>
          <StyledTextField
            variant="outlined"
            size="small"
            placeholder="Search"
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        {/* <Grid item xs={6} sm={3}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Filter"
              >
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
        {/* <Grid item xs={6} sm={3} container justifyContent="flex-end">
          <StyledButton
            variant="outlined"
            color="primary"
            startIcon={<GetAppIcon />}
            onClick={handleDownloadCSV}
          >
            Download CSV
          </StyledButton>
          </Grid> */}
      </Grid>

      <StyledTableContainer
        component={Paper}
        className="px-8 rounded overflow-hidden"
      >
        <StyledTable className=" rounded overflow-hidden border-8 ">
          <StyledTableHead className="rounded overflow-hidden">
            <StyledTableRow className="bg-blue-500">
              {["Url", "Status", "Created", "Last Update", "Actions"].map(
                (headCell) => (
                  <StyledTableHeadCell key={headCell} className="bg-[#1E90FF]">
                    <TableSortLabel
                      active={orderBy === headCell}
                      direction={orderBy === headCell ? order : "asc"}
                      onClick={() => handleRequestSort(headCell)}
                    >
                      {headCell}
                    </TableSortLabel>
                  </StyledTableHeadCell>
                )
              )}
            </StyledTableRow>
          </StyledTableHead>
          <TableBody className="m-6 p-6">
            <AnimatePresence>
              {(rowsPerPage > 0
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredData
              ).map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TableCell className="w-[40%] m-10 p-10">
                    <a
                      href={row.webhook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#1E90FF",
                        textDecoration: "underline",
                      }}
                    >
                      {row.webhook_url}
                    </a>
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#23ba3d",
                      WebkitTextFillColor: "#23ba3d !important",
                    }}
                  >
                    {row.response}
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>
                    {/* Add icon when available */}
                    <button>
                      <FontAwesomeIcon
                        icon={faPenSquare}
                        style={{ fontSize: "20px", color: "#FFD43B" }}
                      />
                    </button>
                    <button
                      className="ml-2"
                      onClick={() => handleDelete(row.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ fontSize: "20px", color: "#d10000" }}
                      />
                    </button>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </StyledTable>
      </StyledTableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {isModalOpen && (
        <BasicModal
          isOpen={isModalOpen}
          webhooksData={webhooksData}
          closeModal={handleCloseModal}
          handleSubmit={handleAddBroadcast}
        />
        // <Modal isModalOpen={isModalOpen} closeModal={closeModal} user={user} height="80vh">
        //   {<NewBroadcastVoice
        //      closeModal={closeModal}
        //    isModalOpen={isModalOpen}
        //    user={user}/>
        // }
        // </Modal>
      )}
    </>
  );
}

export default Broadcast;

// unnesesarry data
// const handleDownloadCSV = () => {
//   const headers = [
//     "Url",
//     "Status",
//     "Created",
//     "Last Update",
//     "Actions",
//   ];
//   const csvContent = [
//     headers.join(","),
//     ...filteredData.map((row) =>
//       [
//         row.url,
//          row.status,
//          row.created,
//           row.lastupdate,
//       ].join(",")
//     ),
//   ].join("\n");

//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const link = document.createElement("a");
//   if (link.download !== undefined) {
//     const url = URL.createObjectURL(blob);
//     link.setAttribute("href", url);
//     link.setAttribute("download", `broadcast_list_${Date.now()}.csv`);
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
// };
