
export default function TilesCard({ data }) {
    return (
        <div className="card-body">
            <h5 className="card-title">{data.title}</h5>
            {data.options.map(option => (
                <div className="icon-toggle-container mb-3" key={option.id}>
                    <input type="checkbox" id={option.id} className="icon-toggle-input" />
                    <label htmlFor={option.id} className="icon-toggle-label d-flex flex-column align-items-center justify-content-center p-2">
                        <img src={option.image} className="icoontje" alt={option.alt} /> <span className="text-icoontje mt-1">{option.label}</span>
                    </label>
                </div>
            ))}

        </div>
    );
};
