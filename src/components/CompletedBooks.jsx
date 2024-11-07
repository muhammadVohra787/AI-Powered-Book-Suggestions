import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export const CompletedBooks = ({ readItems, handleMarkAsRead }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(readItems);
  }, [readItems]);

  const handleDelete = (rBook) => {
    const updatedList = Object.values(list).filter(
      (book) => book.title !== rBook.title
    );
    setList(updatedList);
  };
  return (
    <>
      <h2>Completed Books: </h2>
      <Grid container spacing={0}>
        {Object.values(list).map((rBook) => (
          <Grid
            item
            xs={12}
            sm={8}
            md={4}
            key={rBook.id}
            style={{
              padding: "10px",
              alignContent: "center",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: "20px",
                borderRadius: "10px",
              }}
            >
              <Tooltip title={"Remove"}>
                <IconButton
                  onClick={() => {
                    console.log(rBook);

                    handleMarkAsRead(rBook.allInfo);
                  }}
                >
                  <CloseIcon style={{ fontSize: 20, color: "#3f51b5" }} />{" "}
                </IconButton>
              </Tooltip>
              <Typography variant="p">
                {rBook.title.slice(0, 35)}
                {rBook.title.length > 35 ? "..." : ""}
              </Typography>

              <img
                width={200}
                height={280}
                src={rBook?.thumb}
                alt="  Image not found for this book"
                style={{
                  display: "block",
                  margin: "auto",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              />
              <Typography variant="body2">Author: {rBook?.author}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
