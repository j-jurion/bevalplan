import GridDragField from "./GridDragField";

export default function Preview() {
return (
    <div className="col-12 col-lg-8 preview-column">
        <div className="a4-wrapper">
            <div className="a4-document p-5 shadow">
                <GridDragField />
            </div>
        </div>
    </div>
    );
};
