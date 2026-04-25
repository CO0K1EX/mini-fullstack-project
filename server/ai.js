const docs = [
    "React управляет UI",
    "Redux хранит состояние",
    "Event loop обрабатывает асинхронность"
];

function searchDocs(q) {
    return docs.filter(d => d.toLowerCase().includes(q.toLowerCase()));
}

module.exports = { searchDocs };