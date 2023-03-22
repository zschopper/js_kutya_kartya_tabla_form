window.addEventListener("load", init);

let lista = [
    { nev: "Füge", kor: 5, nem: "kan", kep: "https://placedog.net/500/500/230" },
    { nev: "Fickó", kor: 4, nem: "kan", kep: "https://placedog.net/500/500/150" },
    { nev: "Lola", kor: 1, nem: "szuka", kep: "https://placedog.net/500/500/80" },
    { nev: "Atticus", kor: 5, nem: "kan", kep: "https://placedog.net/500/500/250" },
    { nev: "Bingó", kor: 6, nem: "kan", kep: "https://placedog.net/500/500/120" },
    { nev: "Milka", kor: 2, nem: "szuka", kep: "https://placedog.net/500/500/97" },
    { nev: "Brutus", kor: 3, nem: "kan", kep: "https://placedog.net/500/500/210" },
    { nev: "Pamacs", kor: 1, nem: "szuka", kep: "https://placedog.net/500/500/182" },
    { nev: "Póker", kor: 2, nem: "kan", kep: "https://placedog.net/500/500/236" },
]

const SORT_ASC_CLASS = "fa-sort-up";
const SORT_DESC_CLASS = "fa-sort-down";

let kartyakElement;
let tablaElement;
let counter = 0;
let sortCol = -1;
let sortDir = 0;

function init(event) {
    console.log("init");

    kartyakElement = document.querySelector("#cards")
    tablaElement = document.querySelector("#table table tbody")
    kirajzol_mind();
    for (const th of document.querySelectorAll("table thead th")) {
        th.addEventListener("click", th_click);
    }
}

function torol_click(idx, nev) {
    if (confirm(`Valóban törlöd ${nev} kutyát?`)) {
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
    } else if (kutya['nem'] == "kan") {
        nemIkon = "fa-solid fa-mars"
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
    let nemSzukaElem = document.querySelector("#field-nem-szuka");
    let nemKanElem = document.querySelector("#field-nem-kan");
    let kepElem = document.querySelector("#field-kep");

    let nev = nevElem.value;
    let kor = korElem.value;
    let nem = "";
    let kep = kepElem.value;

    if (nev.trim() == "") {
        alert("A név nem lehet üres!");
        nevElem.focus();
    } else if (kor.trim() == "") {
        alert("A kor nem lehet üres!");
        korElem.focus();
    } else if (!nemSzukaElem.checked && !nemKanElem.checked) {
        alert("A kutya nemét ki kell választani!");
        nemSzukaElem.focus();
    } else {
        if (nemSzukaElem.checked) {
            nem = "szuka";
        } else if (nemKanElem.checked) {
            nem = "kan";
        }

        let szam = 0;
        if (kep.trim() == "") {
            szam = parseInt(Math.random() * 1000);
        } else if (/^\d+$/.test(kep)) {
            szam = parseInt(kep);
        }
        if (szam > 0) {
            kep = "https://placedog.net/500/500/" + szam;
        }
        let kutya = { nev: nev, kor: kor, nem: nem, kep: kep };
        lista.push(kutya);
        kirajzol(kutya);
    }
}

function th_click(event) {
    let parent = event.target.parentNode;
    let target = event.target;
    // hányadik oszlopra kattintottunk (0-tól számolódik)
    let idx = Array.prototype.indexOf.call(parent.children, event.target);

    // csak "név", "kor" és a "nem" rendezhető
    if (![1, 2, 3].includes(idx)) {
        return;
    }

    if (sortCol >= 0) { // már rendeztünk korábban, töröljük a rendezést jelző osztályt
        let elem = parent.children[sortCol].querySelector("i")
        elem.classList.remove(SORT_ASC_CLASS);
        elem.classList.remove(SORT_DESC_CLASS);
    }


    if (idx == sortCol) { // ha már a rendezett oszlopra kattintunk, csak a rendezés irányát változtatjuk
        sortDir *= -1;
    } else { // rendezés másik oszlopra
        sortCol = idx;
        sortDir = 1;
    }

    let elem = target.querySelector("i") // az <th>-n belüli <i> elem osztályai jelzik a rendezést
    if (sortDir == 1) {
        elem.classList.add(SORT_ASC_CLASS);
        elem.classList.remove(SORT_DESC_CLASS);
    } else {
        elem.classList.remove(SORT_ASC_CLASS);
        elem.classList.add(SORT_DESC_CLASS);
    }

    console.log({ idx: idx, col: sortCol, dir: sortDir });

    let rows = Array.prototype.slice.call(document.querySelectorAll("tbody tr"), 0);
    let tbody = document.querySelector("tbody");
    for (const row of rows.sort(sor_osszehasonlitas)) {
        tbody.appendChild(row);
    }
}

function sor_osszehasonlitas(r1, r2) {
    let v1 = r1.childNodes[sortCol].textContent;
    let v2 = r2.childNodes[sortCol].textContent;

    switch (sortCol) {
        case 1: // név
            return v1.localeCompare(v2) * sortDir;
        case 2: // kor
            return (parseInt(v1) - parseInt(v2)) * sortDir;
        case 3: // nem
            return v1.localeCompare(v2) * -1 * sortDir;
    }
    return 1;
}
