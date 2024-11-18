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

const BasicModal = ({ isOpen, closeModal, handleSubmit }) => {
  const [formData, setFormData] = useState({
    url: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    if (formData.url.trim() && formData.status.trim()) {
      handleSubmit(formData);
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      maxWidth="sm" // Makes the modal larger
      fullWidth // Takes the full width allowed by maxWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px", // Rounded corners
          padding: "20px", // Inner padding
          backgroundColor: "#f9f9f9", // Light background color
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Shadow effect
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", mt: 2 }}>
          <TextField
            label="URL"
            name="url"
            fullWidth
            margin="dense"
            variant="outlined"
            value={formData.url}
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