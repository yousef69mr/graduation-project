import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export const LandmarkCard = (props) => {
    const { landmark } = props
    return (
        <Box className="text-color" sx={{ maxWidth: '25%' }}>
            <Typography className="text-color">{landmark?.title}</Typography>
        </Box>
    )
}