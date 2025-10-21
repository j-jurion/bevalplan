import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

const MostImportant = () => {
    return (
        <div>
            <Typography variant="h6" component="div" gutterBottom>
                Dit is voor mij het belangrijkste
            </Typography>
            <TextField
                id="outlined-basic"
                label="Belangrijkste"
                variant="outlined"
                fullWidth
                className="mt-4"
                placeholder="Typ hier wat voor jou het belangrijkste is..." 
            />

        </div>
    );
};

export default MostImportant;
