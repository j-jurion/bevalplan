import CardWrapper from "./CardWrapper";
import ParentsCard from "./Cards/ParentsCard.jsx";
import EssentialsCard from "./Cards/EssentialsCard.jsx";
import TilesCard from "./Cards/TilesCard.jsx";
import data from "../assets/data.jsx";


export default function FormDrawer() {
  return (
    <div className="col-12 col-lg-4 p-4 form-column">
      <h1 className="mb-4">Maak mijn geboorteplan</h1>
      <CardWrapper cardBody={<ParentsCard />} />
      <CardWrapper cardBody={<EssentialsCard />} />
      {data.map((item, idx) => (
        <CardWrapper key={idx} cardBody={<TilesCard data={item} />} />
      ))}
    </div>
  );
};
