import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import axios from "axios";

const BasicModal = ({ isOpen, closeModal, handleSubmit, webhooksData }) => {
  const [formData, setFormData] = useState(webhooksData);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    try {
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
      console.log(response.data);
      handleSubmit((prevData) => [...prevData, response.data]);
      setFormData(response.data);
    } catch (err) {
      console.log("Error posting data", err.response || err);
      setError(err.response?.data?.errors || "Failed to load data");
    }
  };

  // if (formData.url.trim() && formData.status.trim()) {
  //   handleSubmit(formData);
  // } else {
  //   alert("Please fill all fields!");
  // }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          color: "#333",
          borderBottom: "1px solid #ddd",
        }}
      >
        Add New Webhook
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "16px", mt: 2 }}
        >
          <TextField
            label="URL"
            name="url"
            fullWidth
            margin="dense"
            variant="outlined"
            value={formData.webhook_url}
            onChange={handleChange}
            sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              variant="outlined"
              sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
            >
              <MenuItem value="Enable">Enable</MenuItem>
              <MenuItem value="Disable">Disable</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Button
          onClick={closeModal}
          color="secondary"
          sx={{
            padding: "8px 16px",
            fontWeight: "bold",
            color: "#ff1744",
            border: "1px solid #ff1744",
            "&:hover": { backgroundColor: "#ffe6e6" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          color="primary"
          sx={{
            padding: "8px 16px",
            fontWeight: "bold",
            color: "#1976d2",
            border: "1px solid #1976d2",
            "&:hover": { backgroundColor: "#e3f2fd" },
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BasicModal;

// unnessesary data
//  {/* Add Webhooks Button
//       <Button variant="contained" color="primary" onClick={handleOpenModal}>
//         Add Webhook
//       </Button> */}

//       {/* Table */}
//       {/* <StyledTableContainer component={Paper} className="w-full m-auto p-6 mt-4">
//         <StyledTable className="">
//           <StyledTableHead className="w-full">
//             <StyledTableRow className="bg-blue-500">
//               {["Url", "Status", "Created", "Last Update", "Actions"].map((headCell) => (
//                 <StyledTableHeadCell key={headCell} className="bg-[#1E90FF]">
//                   <TableSortLabel>{headCell}</TableSortLabel>
//                 </StyledTableHeadCell>
//               ))}
//             </StyledTableRow>
//           </StyledTableHead>
//           <TableBody className=" w-[50%] m-5 p-4">
//             <AnimatePresence>
//               {tableData.map((row) => (
//                 <motion.tr
//                   key={row.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 >
//                   <TableCell className="w-[40%] m-10 p-10">
//                     <a
//                       href={row.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 underline"
//                     >
//                       {row.url}
//                     </a>
//                   </TableCell>
//                   <TableCell className="text-[#23ba3d]">{row.status}</TableCell>
//                   <TableCell>{row.created}</TableCell>
//                   <TableCell>{row.lastupdate}</TableCell>
//                   <TableCell>
//                     {/* You can add edit or delete buttons here */}
//                   {/* </TableCell> */}
//                 {/* </motion.tr> */}
//               {/* ))} */}
//             {/* </AnimatePresence> */}
//           {/* </TableBody> */}
//         {/* </StyledTable> */}
//       {/* </StyledTableContainer> */} */
//       {/* } */}
