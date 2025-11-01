export default function Tile({ option, setData }) {
    function handleClick() {
        setData(prevData =>
            prevData.map(data => ({
                ...data,
                options: data.options.map(opt =>
                    opt.id === option.id
                        ? { ...opt, hidden: !opt.hidden }
                        : opt
                )
            }))
        );
        console.log("Toggled hidden for:", option.id);
    }
    return (
        <div className="icon-toggle-container mb-3" onClick={handleClick}>
            {option.hidden ? 
            <div className="icon-toggle-label d-flex flex-column align-items-center justify-content-center p-2">
                <img src={option.image} className="icoontje" alt={option.alt} /> 
                <span className="text-icoontje mt-1">{option.label}</span>
            </div>
            : (
                <div
                    className="icon-toggle-label icon-toggle-label-show d-flex flex-column align-items-center justify-content-center p-2 visible-label"
                >
                    <img src={option.image} className="icoontje" alt={option.alt} />
                    <span className="text-icoontje mt-1">{option.label}</span>
                </div>
            )}
        </div>
    );
};
