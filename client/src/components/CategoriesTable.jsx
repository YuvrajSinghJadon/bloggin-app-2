import { useNavigate } from "react-router-dom";
import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material/";

const categories = [
  "Food & Drink",
  "Travel & Adventure",
  "Technology & Gadgets",
  "Fashion & Style",
  "Sports & Fitness",
  "Nature & Wildlife",
  "Art & Creativity",
  "Music & Entertainment",
  "Health & Wellness",
  "Home & Decor",
  "Books & Literature",
  "Science & Space",
  "Cars & Vehicles",
  "Business & Finance",
  "Education & Learning",
];

export default function StickyHeadTable() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = () => {
    navigate("/post");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440, position: "sticky", top: 0 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ paddingX: 2, paddingY: 1 }}
                  onClick={handleChangePage}
                >
                  CREATE-BLOG
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index} hover role="checkbox">
                <TableCell>{category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
