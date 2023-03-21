window.addEventListener("load", init);

let lista = [
    { nev: "Füge", kor: 5, nem: "kan", kep: "https://placedog.net/230"},
    { nev: "Fickó", kor: 4, nem: "kan", kep: "https://placedog.net/150"},
    { nev: "Lola", kor: 1, nem: "szuka", kep: "https://placedog.net/80"},
    { nev: "Atticus", kor: 5, nem: "kan", kep: "https://placedog.net/250"},
    { nev: "Bingó", kor: 6, nem: "kan", kep: "https://placedog.net/120"},
    { nev: "Milka", kor: 2, nem: "szuka", kep: "https://placedog.net/97"},
    { nev: "Brutus", kor: 3, nem: "kan", kep: "https://placedog.net/210"},
    { nev: "Pamacs", kor: 1, nem: "szuka", kep: "https://placedog.net/182"},
    { nev: "Póker", kor: 2, nem: "kan", kep: "https://placedog.net/236"},
]

let kartyakElement;
let tablaElement;

function init(event) {
    console.log("init");

    kartyakElement = document.querySelector("#cards")
    tablaElement = document.querySelector("#table table tbody")
    kirajzol_mind();
}

function kirajzol_mind() {
    for (const kutya of lista) {
        kirajzol(kutya);
    }
}

function kirajzol(kutya) {
    kartyat_hozzaad(kutya, kartyakElement);
    tablasort_hozzaad(kutya, tablaElement);
}

function kartyat_hozzaad(kutya, szuloElem) {
    let divElem = document.createElement('div');
    divElem.innerHTML =
    `<div class="nev"><label>Név:</label> <span class="value">${kutya['nev']}</span></div>` +
    `<div class="kor"><label>Kor:</label> <span class="value">${kutya['kor']}</span></div>` +
    `<div class="nem"><label>Nem:</label> <span class="value">${kutya['nem']}</span></div>` +
    `<div><img src="${kutya['kep']}" alt="${kutya['nev']} képe"></div>` +
    '<div><button value="töröl">Töröl</button></div>';
    szuloElem.appendChild(divElem);
}

function tablasort_hozzaad(kutya, szuloElem) {
    let trElem = document.createElement('tr');
    trElem.innerHTML =

    `<td><img src="${kutya['kep']}" alt="${kutya['nev']} képe"></td>` +
`<td class="nev">${kutya['nev']}</td>` +
`<td class="kor">${kutya['kor']}</td>` +
`<td class="nem">${kutya['nem']}</td>` +
'<td><button value="töröl">Töröl</button></td>';
szuloElem.appendChild(trElem);
}