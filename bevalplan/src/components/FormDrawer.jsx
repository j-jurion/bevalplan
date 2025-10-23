import CardWrapper from "./CardWrapper";
import ParentsCard from "./Cards/ParentsCard.jsx";
import EssentialsCard from "./Cards/EssentialsCard.jsx";
import TilesCard from "./Cards/TilesCard.jsx";
import React, { useState, useContext } from "react";
import { MyContext } from "../context/MyContext.jsx";


export default function FormDrawer() {
  const { data, setData, items, setItems } = useContext(MyContext);
  return (
    <div className="col-12 col-lg-4 p-4 form-column">
      <h1 className="mb-4">Maak mijn geboorteplan</h1>
      <CardWrapper cardBody={<ParentsCard />} />
      <CardWrapper cardBody={<EssentialsCard />} />
      {data.map((item, idx) => (
        <CardWrapper key={idx} cardBody={<TilesCard item={item} />} />
      ))}
    </div>
  );
};
