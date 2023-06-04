import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const generateStars = (rating) => {
    const roundedRating = Math.round(rating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < roundedRating) {
            stars.push(
                <i key={i}>
                    <StarIcon />
                </i>);
        } else {
            stars.push(
                <i key={i}>
                    <StarBorderIcon />
                </i>);
        }
    }

    return stars;
};

export default generateStars;
