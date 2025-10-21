import Tile from "./Tile";

export default function TilesCard({ data }) {
    return (
        <div className="card-body">
            <h5 className="card-title">{data.title.label}</h5>
            {data.options.map(option => (
                <Tile key={option.id} option={option} />
            ))}

        </div>
    );
};
