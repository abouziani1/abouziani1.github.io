/*
CONFIGURACIÓN: edita únicamente esta lista para añadir o cambiar materias y enlaces.
Cada tema enlaza a una página que ya existe. No hay editor ni almacenamiento en el navegador.
Usa rutas relativas (ej. "./biologia/genetica/index.html") o URLs completas.
*/
const MATERIAS = [
    {
        id: "Bio y Geo",
        nombre: "Biología y Geología ",
        descripcion:
            "",
        icono: "molecule",
        etiquetas: [
            ["Composición materia", ""],
            ["Agua y sales minerales", "cyan"],
            ["Célula", "violet"],
            ["Bioquímica", "pink"],
        ],
        temas: [
            { nombre: "Composición de la materia", url: "#", etiqueta: "Bioquímica" },
            { nombre: "Agua y sales minerales", url: "Páginas/Agua y sales minerales.html", etiqueta: "Bioquímica" },
            { nombre: "", url: "#", etiqueta: "" },
            { nombre: "", url: "#", etiqueta: "" },
        ]
    },
    {
        id: "Bio +",
        nombre: "Biología +",
        descripcion:
            "",
        icono: "molecule",
        etiquetas: [
            ["Biología", "cyan"],
            ["Química", ""],
            ["Física", "violet"],
            ["Salud", "pink"],
        ],
        temas: [
            { nombre: "Glúcidos", url: "Páginas/Glúcidos.html", etiqueta: "Bioquímica" },
            { nombre: "Lípidos", url: "#", etiqueta: "Bioquímica" },
            { nombre: "Proteínas", url: "#", etiqueta: "Bioquímica" },
            { nombre: "Ácidos nucleicos", url: "#", etiqueta: "Bioquímica" },
            { nombre: "Evolución", url: "#", etiqueta: "Bioquímica" },
            { nombre: "", url: "#", etiqueta: "" },
        ],
    },
    {
        id: "Química",
        nombre: "Química",
        descripcion:
            "",
        icono: "cube",
        etiquetas: [
            ["Programación", ""],
            ["Redes", "cyan"],
            ["Sistemas", "violet"],
        ],
        temas: [
            { nombre: "Tabla periódica", url: "Páginas/Tabla periódica.html", etiqueta: "Química" },
            { nombre: "Propiedades periódicas", url: "Páginas/Propiedades periódicas.html", etiqueta: "Química" },
            { nombre: "", url: "#", etiqueta: "" },
            { nombre: "", url: "#", etiqueta: "" },
        ],
    },
    {
        id: "otros",
        nombre: "Otros",
        descripcion:
            "Proyectos personales, herramientas, lecturas y otros recursos de aprendizaje.",
        icono: "grid",
        etiquetas: [
            ["Proyectos", ""],
            ["Planificación", "cyan"],
            ["Notas", "violet"],
            ["Herramientas", "pink"],
        ],
        temas: [
            { nombre: "", url: "#", etiqueta: "" },
            { nombre: "", url: "#", etiqueta: "" },
            { nombre: "", url: "#", etiqueta: "" },
            { nombre: "", url: "#", etiqueta: "" },
        ],
    },
];

const iconos = {
    cube: `<path d="m38 7 30 17v35L38 76 8 59V24L38 7Z"/><path d="m38 24 15 9v18L38 60 23 51V33l15-9Z"/><path d="m8 24 30 18 30-18M38 42v34M23 33l30 18M53 33 23 51"/>`,
    molecule: `<path d="m20 28 19-11 19 12v22L39 62 20 51Z"/><path d="m20 28 19 11 19-10M39 39v23M20 51l19-12"/><circle cx="20" cy="28" r="4"/><circle cx="39" cy="17" r="4"/><circle cx="58" cy="29" r="4"/><circle cx="58" cy="51" r="4"/><circle cx="39" cy="62" r="4"/><circle cx="20" cy="51" r="4"/>`,
    code: `<path d="m38 7 30 17v35L38 76 8 59V24L38 7Z"/><path d="m29 33-10 10 10 10M47 33l10 10-10 10M42 29l-8 29"/>`,
    temple: `<path d="m8 25 30-18 30 18H8Z"/><path d="M13 31h50M17 31v29M29 31v29M41 31v29M53 31v29M12 60h52M8 67h60M14 72h48"/>`,
    chat: `<path d="M38 9C21 9 8 21 8 37c0 8 4 15 10 20l-3 12 14-5c3 1 6 2 9 2 17 0 30-13 30-29S55 9 38 9Z"/><path d="M24 31h28M24 41h21"/>`,
    grid: `<path d="m38 7 30 17v35L38 76 8 59V24L38 7Z"/><rect x="25" y="28" width="9" height="9" rx="1"/><rect x="42" y="28" width="9" height="9" rx="1"/><rect x="25" y="45" width="9" height="9" rx="1"/><rect x="42" y="45" width="9" height="9" rx="1"/>`,
};
const esc = (value) =>
    String(value).replace(
        /[&<>"']/g,
        (c) =>
        ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        }[c])
    );
function render() {
    const root = document.getElementById("subjects");
    const topicCount = MATERIAS.reduce((sum, m) => sum + m.temas.length, 0);
    document.getElementById("subjectCount").textContent = MATERIAS.length;
    document.getElementById("topicCount").textContent = topicCount;
    root.innerHTML = "";
    MATERIAS.forEach((materia, index) => {
        const section = document.createElement("section");
        section.className = "section reveal";
        section.id = materia.id;
        const tags = (materia.etiquetas || [])
            .map(
                ([label, color]) =>
                    `<span class="chip ${color || ""}">${esc(label)}</span>`
            )
            .join("");
        const temas = materia.temas
            .map((tema, i) => {
                const url = tema.url || "#";
                const valid = url !== "#";
                const target = valid
                    ? `href="${esc(url)}" target="_blank" rel="noopener noreferrer"`
                    : `href="#${materia.id
                    }" data-placeholder="true" aria-label="${esc(
                        tema.nombre
                    )}: añade su URL en el código"`;
                return `<a class="topic" ${target}><span class="topicno">${String(
                    i + 1
                ).padStart(2, "0")}</span><span class="topicname">${esc(
                    tema.nombre
                )}</span><span class="arrow" aria-hidden="true">↗</span></a>`;
            })
            .join("");
        section.innerHTML = `<div class="sectionhead"><div class="headleft"><div class="number">${String(
            index + 1
        ).padStart(2, "0")}</div><div><h2>${esc(
            materia.nombre
        )}</h2><div class="desc">${esc(
            materia.descripcion || "Accede a tus páginas de estudio."
        )}</div></div></div><div class="chips">${tags}</div></div><div class="card"><svg class="subjecticon" viewBox="0 0 76 82" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconos[materia.icono] || iconos.grid
            }</svg><div class="topics">${temas ||
            '<p class="empty">No hay temas configurados en esta materia.</p>'
            }</div></div>`;
        root.appendChild(section);
    });
    const observer =
        "IntersectionObserver" in window
            ? new IntersectionObserver(
                (entries) =>
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("visible");
                            observer.unobserve(entry.target);
                        }
                    }),
                { threshold: 0.08 }
            )
            : null;
    document
        .querySelectorAll(".reveal")
        .forEach((el) =>
            observer ? observer.observe(el) : el.classList.add("visible")
        );
    filterTopics(document.getElementById("search").value);
}
function filterTopics(query) {
    const q = query.trim().toLocaleLowerCase("es");
    document.querySelectorAll(".section").forEach((section) => {
        let found = 0;
        section.querySelectorAll(".topic").forEach((topic) => {
            const matches =
                !q ||
                topic
                    .querySelector(".topicname")
                    .textContent.toLocaleLowerCase("es")
                    .includes(q);
            topic.classList.toggle("hidden", !matches);
            if (matches) found++;
        });
        section.classList.toggle("hidden", !!q && found === 0);
    });
}
function updateProgress() {
    const max = document.documentElement.scrollHeight - innerHeight;
    const value = max > 0 ? Math.round((scrollY / max) * 100) : 0;
    document.getElementById("progress").style.width = value + "%";
    document.getElementById(
        "progresslabel"
    ).textContent = `Progreso de lectura ${value}%`;
}
function updateNav() {
    let current = "inicio";
    MATERIAS.forEach((m) => {
        const el = document.getElementById(m.id);
        if (el && el.getBoundingClientRect().top < 160) current = m.id;
    });
    document
        .querySelectorAll(".navlinks a")
        .forEach((a) =>
            a.classList.toggle(
                "active",
                a.getAttribute("href") === "#" + current
            )
        );
}
document
    .getElementById("search")
    .addEventListener("input", (event) => filterTopics(event.target.value));
document.addEventListener("click", (event) => {
    const link = event.target.closest('[data-placeholder="true"]');
    if (link) {
        event.preventDefault();
    }
});
window.addEventListener(
    "scroll",
    () => {
        updateProgress();
        updateNav();
    },
    { passive: true }
);
window.addEventListener("resize", updateProgress);
render();
updateProgress();