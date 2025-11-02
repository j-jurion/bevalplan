// A4 Landscape afmetingen in pixels (dit is de basisgrootte VOORDAT we schalen)
const A4_WIDTH_MM = 297;
const A4_HEIGHT_MM = 210;

// Schatting van de MM naar Pixels verhouding (bijv. 3.7795 px/mm voor 96dpi)
// We gebruiken de werkelijke elementgrootte na de eerste render.
const a4Document = document.querySelector('.a4-document');
const a4Wrapper = document.querySelector('.a4-wrapper');
const previewColumn = document.querySelector('.preview-column');

function adjustScale() {
    // 1. Haal de beschikbare ruimte op (inclusief padding van 20px aan elke kant)
    const availableWidth = previewColumn.clientWidth - 40; // 20px left + 20px right
    const availableHeight = previewColumn.clientHeight - 40; // 20px top + 20px bottom

    // 2. Haal de ongeschaalde A4-afmetingen op (in pixels, zoals gedefinieerd door CSS)
    const originalWidth = a4Document.offsetWidth;
    const originalHeight = a4Document.offsetHeight;

    if (originalWidth === 0 || originalHeight === 0) return; // Voorkom delen door nul

    // 3. Bereken de benodigde schaalverkleining
    // Hoeveel moet de breedte krimpen?
    const scaleFactorW = availableWidth / originalWidth;
    // Hoeveel moet de hoogte krimpen?
    const scaleFactorH = availableHeight / originalHeight;

    // 4. Gebruik de kleinste factor om te zorgen dat de pagina VOLLEDIG past
    const scaleFactor = Math.min(scaleFactorW, scaleFactorH);

    // 5. Pas de schaal toe op de wrapper
    if (scaleFactor < 1) {
        a4Wrapper.style.transform = `scale(${scaleFactor})`;
        
        // Zorg dat de geschaalde A4 gecentreerd blijft
        // Dit compenseert de transform-origin: top left
        const xOffset = (originalWidth * scaleFactor - originalWidth) / 2;
        const yOffset = (originalHeight * scaleFactor - originalHeight) / 2;
        
        // Let op: Dit vereist mogelijk meer complexe CSS-centrering, maar voor nu volstaat 
        // de 'justify-content: center' op de 'preview-column' in combinatie met de wrapper.
        // De 'transform' wordt puur gebruikt voor scaling.
        
    } else {
        // Als de kolom groot genoeg is, niet schalen
        a4Wrapper.style.transform = 'scale(1)';
    }
}

// 6. Roep de functie aan bij laden en bij het veranderen van het venster
window.addEventListener('load', adjustScale);
window.addEventListener('resize', adjustScale);