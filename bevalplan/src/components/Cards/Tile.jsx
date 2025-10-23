export default function Tile({ option }) {
    function handleClick() {
        // Do something when the tile is clicked
        console.log(`Tile with id ${option.id} clicked`);
    }
    return (
        <div className="icon-toggle-container mb-3" onClick={handleClick}>
            <input type="checkbox" id={option.id} className="icon-toggle-input" />
            <label htmlFor={option.id} className="icon-toggle-label d-flex flex-column align-items-center justify-content-center p-2">
                <img src={option.image} className="icoontje" alt={option.alt} /> 
                <span className="text-icoontje mt-1">{option.label}</span>
            </label>
        </div>
    );
};
