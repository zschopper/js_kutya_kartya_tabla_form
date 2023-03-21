window.addEventListener("load", init);

let lista = [
    { nev: "Füge", kor: 5, nem: "kan", kep: "https://placedog.net/500/500/230"},
    { nev: "Fickó", kor: 4, nem: "kan", kep: "https://placedog.net/500/500/150"},
    { nev: "Lola", kor: 1, nem: "szuka", kep: "https://placedog.net/500/500/80"},
    { nev: "Atticus", kor: 5, nem: "kan", kep: "https://placedog.net/500/500/250"},
    { nev: "Bingó", kor: 6, nem: "kan", kep: "https://placedog.net/500/500/120"},
    { nev: "Milka", kor: 2, nem: "szuka", kep: "https://placedog.net/500/500/97"},
    { nev: "Brutus", kor: 3, nem: "kan", kep: "https://placedog.net/500/500/210"},
    { nev: "Pamacs", kor: 1, nem: "szuka", kep: "https://placedog.net/500/500/182"},
    { nev: "Póker", kor: 2, nem: "kan", kep: "https://placedog.net/500/500/236"},
]

let kartyakElement;
let tablaElement;
let counter = 0;

function init(event) {
    console.log("init");

    kartyakElement = document.querySelector("#cards")
    tablaElement = document.querySelector("#table table tbody")
    kirajzol_mind();
}

function torol_click(idx, nev) {
    if(confirm(`Valóban törlöd ${nev} kutyát?`)) {
        document.querySelector('#card-' + idx).remove();
        document.querySelector('#row-' + idx).remove();
    }
}

function kirajzol_mind() {
    for (const kutya of lista) {
        kirajzol(kutya);
    }
}

function kirajzol(kutya) {
    kartyat_hozzaad(kutya, kartyakElement);
    tablasort_hozzaad(kutya, tablaElement);
    counter++;
}

function kartyat_hozzaad(kutya, szuloElem) {
    let divElem = document.createElement('div');
    divElem.id = `card-${counter}`;
    let nemIkon = "";
    if (kutya['nem'] == "szuka") {
        nemIkon = "fa-solid fa-venus"
        // <i class="fa-solid fa-venus"></i>

    } else if (kutya['nem'] == "kan") {
        nemIkon = "fa-solid fa-mars"
        // <i class="fa-solid fa-mars"></i>
    }

    divElem.innerHTML =
        `<div class="nev"><label>Név:</label> <span class="value">${kutya['nev']}</span></div>` +
        `<div class="kor"><label>Kor:</label> <span class="value">${kutya['kor']}</span></div>` +
        `<div class="nem"><label>Nem:</label> <span class="value"><i class="${nemIkon}"></i> ${kutya['nem']}</span></div>` +
        `<div><img src="${kutya['kep']}" alt="${kutya['nev']} képe"></div>` +
        `<div><button value="töröl" onclick="torol_click(${counter}, '${kutya['nev']}');">Töröl</button></div>`;

    szuloElem.appendChild(divElem);
}

function tablasort_hozzaad(kutya, szuloElem) {
    let trElem = document.createElement('tr');
    trElem.id = `row-${counter}`;
    if (kutya['nem'] == "szuka") {
        nemIkon = "fa-solid fa-venus"
    } else if (kutya['nem'] == "kan") {
        nemIkon = "fa-solid fa-mars"
    }
    trElem.innerHTML =
        `<td><img src="${kutya['kep']}" alt="${kutya['nev']} képe"></td>` +
        `<td class="nev">${kutya['nev']}</td>` +
        `<td class="kor">${kutya['kor']}</td>` +
        `<td class="nem"><i class="${nemIkon}"></i>  ${kutya['nem']}</td>` +
        `<td><button value="töröl" onclick="torol_click(${counter}, '${kutya['nev']}');">Töröl</button></td>`;

    szuloElem.appendChild(trElem);
}

function form_bekuld(event) {
    let nevElem = document.querySelector("#field-nev");
    let korElem = document.querySelector("#field-kor");
    let nemElem = document.querySelector("#field-nem");
    let kepElem = document.querySelector("#field-kep");

    let nev = nevElem.value;
    let kor = korElem.value;
    let nem = nemElem.value;
    let kep = kepElem.value;

    if (nev.trim() == "") {
        alert("A név nem lehet üres!")
        nevElem.focus();
    } else if (kor.trim() == "") {
        alert("A kor nem lehet üres!")
        korElem.focus();
    } else     if (nem.trim() == "") {
        alert("A nem nem lehet üres!")
        nemElem.focus();
    }

}
