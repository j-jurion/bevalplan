import { useRef } from "react";
import GridDragField from "./GridDragField";
import { DndContext } from "@dnd-kit/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Preview() {
    const containerRef = useRef();

    const handleDownloadPDF = async () => {
        const element = containerRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("bevalplan.pdf");
    };
    return (
        <div>
            <div className="col-12 col-lg-8 preview-column">
                <div className="a4-wrapper">
                    <div className="a4-document p-5 shadow" ref={containerRef}>
                        <GridDragField />
                    </div>
                </div>
            </div>
            <button
                onClick={handleDownloadPDF}
                className="btn btn-primary mt-3"
                style={{ padding: "0.75rem 2rem", fontSize: "1.1rem", borderRadius: "0.5rem" }}
            >
                Maak PDF
            </button>
        </div>
    );
};
