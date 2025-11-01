export default function PreviewTitle({ title }) {
    return (
        <h5 style={{
            position: "absolute",
            left: title.position.x,
            top: title.position.y,
            }}
        >
            {title.label}
        </h5>
    );
};
