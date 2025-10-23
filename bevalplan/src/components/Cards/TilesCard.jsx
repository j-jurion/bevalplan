import Tile from "./Tile";

export default function TilesCard({ item }) {
    return (
        <div className="card-body">
            <h5 className="card-title">{item.title.label}</h5>
            {item.options.map(option => (
                <Tile key={option.id} option={option} />
            ))}

        </div>
    );
};
