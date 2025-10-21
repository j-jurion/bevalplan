import { Drawer, Typography } from "@mui/material";
import MostImportant from "./MostImportant";
import SelectionList from "./SelectionList";

const SelectionDrawer = () => {
  return (
    <Drawer open={true} variant="permanent">
      <MostImportant/>
      <SelectionList/>
    </Drawer>
  );
};

export default SelectionDrawer;
