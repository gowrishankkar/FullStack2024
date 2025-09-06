import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Rating,
} from "@mui/material";

export default function Review({ review }) {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        borderRadius: 3,
        boxShadow: 3,
        mb: 2,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar sx={{ mr: 2 }}>{review.user.charAt(0).toUpperCase()}</Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {review.user}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(review.date).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Rating value={review.rating} readOnly size="small" />

        <Typography variant="body2" mt={1}>
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}
