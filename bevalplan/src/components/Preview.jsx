import GridDragField from "./GridDragField";

export default function Preview() {
return (
    <div className="col-12 col-lg-8 preview-column">
        <div className="a4-wrapper">
            <div className="a4-document p-5 shadow">
                <h2 id="liveNaamTitel" className="text-center mb-5">Geboorteplan Naam + Naam Partner</h2>
                <GridDragField />
            </div>
        </div>
    </div>
    );
};
