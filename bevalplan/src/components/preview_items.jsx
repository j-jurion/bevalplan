import data from "../assets/data.jsx";

const preview_items = {
    titles: [],
    options: []
};

data.forEach(item => {
    preview_items.titles.push(item.title);
    preview_items.options.push(...item.options);
});

export default preview_items;
