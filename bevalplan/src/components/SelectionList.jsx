import { Typography, Box, Grid } from "@mui/material";
import PlanTile from "./PlanTile";

const SelectionList = () => {
    const items = [
        { title: 'Janine & Peter', description: 'Eerste kindje', image: '../images/female-male.png' },
        { title: 'Uitgerekende datum', description: '1 januari 2025', image: '../images/calendar.png' },
        { title: 'Geslacht', description: 'Onbekend', image: '../images/gender.png' },
        { title: 'Verloskundige', description: 'St. Anna', image: '../images/practice.png' },
    ];

    return (
         <Box sx={{ minWidth: 0, maxWidth: 400 }} >
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {items.map((item, idx) => (
                    <Grid key={idx} size={{ xs: 2, sm: 4, md: 6 }} >
                        <PlanTile title={item.title} description={item.description} image={item.image} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SelectionList;
