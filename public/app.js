// state (почти Redux)
const state = {
    count: localStorage.getItem("count") || 0
};

function render() {
    document.getElementById("counter").innerText = state.count;
}

render();

// API слой
const api = {
    getLogs: () => fetch('/api/logs').then(r => r.json()),
    addLog: (msg) => fetch('/api/logs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: msg})
    }),
    search: (q) => fetch('/api/search?q=' + q).then(r => r.json())
};

// Действия
async function addLog() {
    state.count++;
    localStorage.setItem("count", state.count);

    await api.addLog("Log " + state.count);
    loadLogs();
    render();
}

// Загрузка
async function loadLogs() {
    const logs = await api.getLogs() || [];
    const el = document.getElementById("logs");
    el.innerHTML = "";

    if (!Array.isArray(logs) || logs.length === 0) {
        el.innerHTML = "<div class='card'>Нет логов</div>";
        return;
    };

    logs.forEach((l, index) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerText = l.message;

        div.style.opacity = 0;
        div.style.transform = "translateY(10px)";

        el.appendChild(div);

        setTimeout(() => {
            div.style.opacity = 1;
            div.style.transform = "translateY(0)";
        }, index * 100);
    });
}

// AI поиск
async function search() {
    const q = document.getElementById("q").value;
    const res = await api.search(q);

    const el = document.getElementById("results");
    el.innerHTML = "";

    if (!Array.isArray(res) || res.length === 0) {
        el.innerHTML = "<div class='card'>Нечего не найдено</div>";
        return;
    }

    res.forEach((r, index) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerText = r;
        
        div.style.opacity = 0;
        div.style.transform = "translateY(10px)";
        
        el.appendChild(div);

        setTimeout(() => {
            div.style.opacity = 1;
            div.style.transform = "translateY(0)";
        }, index * 100);
    });
}

let countLoop = 0;

// event chain
function event1() {
    console.log("event1");
    event2();
}

function event2() {
    if (countLoop++ > 5) return;
    console.log("event2");
    event3();
}

function event3() {
    console.log("event3");
    event2();
}

// event loop
setTimeout(() => console.log("async"), 0);
console.log("sync");

loadLogs();