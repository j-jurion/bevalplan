import React from "react";

const PreviewTile = React.forwardRef(function PreviewTile(
    { option, style = {}, ...props },
    ref
) {
    return (
        <div ref={ref} style={style} {...props}>
            <img src={option.image} alt={option.alt} />
            <span>{option.label}</span>
        </div>
    );
});

export default PreviewTile;
