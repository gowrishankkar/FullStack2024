import React, { useState } from "react";
import { Chip, Stack } from "@mui/material";
import { usePaginationContext } from "../contexts/PaginationContext";

function Categories(props) {
  const { categories, setCurrCategory, currCategory } = props;
  const [selected, setSelected] = useState("All categories");
  const { setPageNum } = usePaginationContext();
  const handleChange = (e) => {
    setSelected(e.target.textContent);
    setCurrCategory(e.target.textContent);
    setPageNum(1);
  };

  let updatedCategories = ["All categories", ...categories];

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1,
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      {updatedCategories.map((category) => (
        <Chip
          key={category}
          label={category}
          clickable
          onClick={handleChange}
          sx={{
            borderRadius: "999px",
            fontWeight: 500,
            px: 1,
            py: 1.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "0.9rem",
            backgroundColor: currCategory === category ? "#6C4EFF" : "#f5f5f5",
            color: currCategory === category ? "#fff" : "#333",
            "&:hover": {
              backgroundColor:
                currCategory === category ? "#5a3ed1" : "#e5e5e5",
            },
          }}
        />
      ))}
    </Stack>
  );
}

export default Categories;
