import React, { useRef, useEffect, useState } from "react"; // <-- Importeer useState en useEffect
import GridDragField from "./GridDragField";
import { DndContext } from "@dnd-kit/core";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Preview() {
    // Refs voor de elementen die we nodig hebben:
    const a4DocumentRef = useRef(null); // Voor de A4 afmetingen
    const a4WrapperRef = useRef(null); // Om de schaal op toe te passen
    const previewColumnRef = useRef(null); // Voor de beschikbare ruimte
    
    // State om de schaalfactor op te slaan
    const [scale, setScale] = useState(1);

    // --- LOGICA VOOR SCALEN ---
    const adjustScale = () => {
        // Zorg ervoor dat de refs bestaan en de elementen gerenderd zijn
        if (!previewColumnRef.current || !a4DocumentRef.current) return;

        // Binnenafmetingen van de container (preview-column). Trek de padding af (vaak 20px aan elke kant = 40px)
        const padding = 40; 
        const availableWidth = previewColumnRef.current.clientWidth - padding;
        const availableHeight = previewColumnRef.current.clientHeight - padding;

        // Ongeschaalde afmetingen van het A4 document (afgeleid van de CSS mm-waarden)
        const originalWidth = a4DocumentRef.current.offsetWidth;
        const originalHeight = a4DocumentRef.current.offsetHeight;
        
        if (originalWidth === 0 || originalHeight === 0) return; 

        // Bereken de schaalverkleining
        const scaleFactorW = availableWidth / originalWidth;
        const scaleFactorH = availableHeight / originalHeight;

        // Gebruik de kleinste factor om te zorgen dat de pagina VOLLEDIG past (en nooit groter is dan 1)
        const newScale = Math.min(1, scaleFactorW, scaleFactorH);
        
        setScale(newScale);
    };

    useEffect(() => {
        // Voer de schaalaanpassing uit na de eerste render
        adjustScale();

        // Luister naar het vensterformaat
        window.addEventListener('resize', adjustScale);

        // Opruimen: verwijder de listener wanneer de component unmount
        return () => {
            window.removeEventListener('resize', adjustScale);
        };
    }, []); // Lege array zorgt voor eenmalige setup en cleanup

    // --- LOGICA VOOR PDF GENERATIE ---
    const handleDownloadPDF = async () => {
        // BELANGRIJK: ZET DE SCHAAL TIJDELIJK OP 1 VOOR EEN HOGE RESOLUTIE SCREENSHOT
        // We willen html2canvas de ongeschaalde (originele) afmetingen laten 'zien'
        
        // 1. Schakel de scaling uit
        a4WrapperRef.current.style.transform = 'scale(1)';

        const element = a4DocumentRef.current;
        // 2. Maak een hoge resolutie canvas van de ongeschaalde A4
        const canvas = await html2canvas(element, { 
             scale: 3, // Gebruik een hogere schaal (bijv. 3) voor scherpe tekst
             logging: false
        });
        
        // 3. Herstel de scaling direct na het screenshot
        a4WrapperRef.current.style.transform = `scale(${scale})`;


        // --- PDF GENERATIE ---
        const imgData = canvas.toDataURL("image/jpeg", 1.0); // Gebruik JPEG voor kleinere bestanden

        // De A4 afmetingen in pt (1pt = 1/72 inch). A4 Landscape is ca. 842pt x 595pt
        const pdfWidth = 842; 
        const pdfHeight = 595;

        // Creëer de PDF met de correcte A4 landscape afmetingen
        const pdf = new jsPDF('l', 'pt', 'a4'); 
        
        // Bereken de verhouding van de canvasafbeelding om in de A4 te passen
        const imgCanvasWidth = canvas.width;
        const imgCanvasHeight = canvas.height;

        const ratio = Math.min(pdfWidth / imgCanvasWidth, pdfHeight / imgCanvasHeight);
        
        const finalWidth = imgCanvasWidth * ratio;
        const finalHeight = imgCanvasHeight * ratio;
        
        // Centreer de afbeelding op de PDF pagina
        const xOffset = (pdfWidth - finalWidth) / 2;
        const yOffset = (pdfHeight - finalHeight) / 2;

        pdf.addImage(imgData, "JPEG", xOffset, yOffset, finalWidth, finalHeight);
        pdf.save("geboorteplan.pdf");
    };

    return (
        <div className="col-12 col-lg-8 preview-column" ref={previewColumnRef}> {/* Ref to get available space */}
            <div className="a4-wrapper" ref={a4WrapperRef} style={{ transform: `scale(${scale})` }}> {/* Ref and state for scaling */}
                <div className="a4-document p-5 shadow" ref={a4DocumentRef}> {/* Ref to get original A4 dimensions */}
                    <GridDragField />
                </div>
            </div>
            
            <button
                onClick={handleDownloadPDF}
                className="btn btn-bp mt-3"
                style={{ padding: "0.75rem 2rem", fontSize: "1.1rem", borderRadius: "0.5rem" }}
            >
                Download PDF
            </button>
        </div>
    );
}