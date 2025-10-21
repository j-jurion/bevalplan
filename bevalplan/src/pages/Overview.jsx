import { Typography } from '@mui/material';
import FormDrawer from '../components/FormDrawer.jsx';
import PlanView from '../components/GridDragField.jsx';
import Preview from '../components/Preview.jsx';

const Overview = () => (
    <div className="container-fluid d-block d-lg-flex p-0 app-container">
        <FormDrawer />
        <Preview />
    </div>
);

export default Overview;
