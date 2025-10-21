import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const PlanTile = (props) => {

    const { idx,title, description, image } = props;

    return (
        <Card key={idx} sx={{ width: 200, borderRadius: 2, boxShadow: 2 }}>
            <CardMedia
                component="img"
                height="120"
                image={image}
                alt={title}
            />
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PlanTile;
