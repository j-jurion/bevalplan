export default function ParentsCard() {
    return (
        <div className="card-body">
            <div className="mb-3">
                <label htmlFor="naamInput" className="form-label">Geboorteplan van:</label>
                <input type="text" className="form-control" id="naamInput" placeholder="Naam + evt. Naam partner" />
            </div>
            
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="koppel" />
                <label className="form-check-label" htmlFor="koppel">
                    Toon koppel
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="koppelKind" />
                <label className="form-check-label" htmlFor="koppelKind">
                    Toon kind
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="zorgverlener" />
                <label className="form-check-label" htmlFor="zorgverlener">
                    Toon doula/verloskundige/vroedvrouw
                </label>
            </div>
        </div>
    );
};
