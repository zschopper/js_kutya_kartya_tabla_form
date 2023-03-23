window.addEventListener("load", init);

let lista = [
    { nev: "Füge", kor: 5, nem: "kan", kep: "https://placedog.net/500/500/230" },
    { nev: "Fickó", kor: 4, nem: "kan", kep: "https://placedog.net/500/500/150" },
    { nev: "Lola", kor: 1, nem: "szuka", kep: "https://placedog.net/500/500/80" },
    { nev: "Atticus", kor: 12, nem: "kan", kep: "https://placedog.net/500/500/250" },
    { nev: "Bingó", kor: 6, nem: "kan", kep: "https://placedog.net/500/500/120" },
    { nev: "Milka", kor: 2, nem: "szuka", kep: "https://placedog.net/500/500/97" },
    { nev: "Brutus", kor: 8, nem: "kan", kep: "https://placedog.net/500/500/210" },
    { nev: "Pamacs", kor: 7, nem: "szuka", kep: "https://placedog.net/500/500/182" },
    { nev: "Póker", kor: 2, nem: "kan", kep: "https://placedog.net/500/500/236" },
]

const SORT_ASC_CLASS = "fa-sort-up";
const SORT_DESC_CLASS = "fa-sort-down";

let kartyakElement;
let tablaElement;

// A számláló (counter) minden kutya hozzáadásánál növekszik,
// egyedi sorszámot generálva az tábla sornak/kártyának.
let counter = 0;

// A rendezés oszlop-indexe. -1, ha nincs rendezés.
let sortCol = -1;

// rendezés iránya: 1 ha növekvő a sorrend, -1 ha csökkenő
let sortDir = 0;

function init(event) {
    console.log("init");

    kartyakElement = document.querySelector("#cards")
    tablaElement = document.querySelector("#table table tbody")
    kirajzolMindent();
    for (const th of document.querySelectorAll("table thead th")) {
        th.addEventListener("click", thClick);
    }
}

function torolClick(idx, nev) {
    if (confirm(`Valóban törlöd ${nev} kutyát?`)) {
        document.querySelector('#card-' + idx).remove();
        document.querySelector('#row-' + idx).remove();
    }
}

function kirajzolMindent() {
    for (const kutya of lista) {
        kirajzol(kutya);
    }
}

function kirajzol(kutya) {
    kartyatHozzaad(kutya, kartyakElement);
    tablaSortHozzaad(kutya, tablaElement);
    counter++;
}

function kartyatHozzaad(kutya, szuloElem) {
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
        `<div><button value="töröl" onclick="torolClick(${counter}, '${kutya['nev']}');">Töröl</button></div>`;

    szuloElem.appendChild(divElem);
}

function tablaSortHozzaad(kutya, szuloElem) {
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
        `<td><button value="töröl" onclick="torolClick(${counter}, '${kutya['nev']}');">Töröl</button></td>`;

    szuloElem.appendChild(trElem);
}

function formBekuld(event) {
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
        // lista.push(kutya);
        kirajzol(kutya);
    }
}

/**
 * Tábla fejlécre kattintást kezelő esemény.
 *
 * @param {Event} event
 *
 */
function thClick(event) {
    let target = event.target;
    let parent = target.parentNode;

    // hányadik oszlopra kattintottunk (0-tól számolódik)
    let idx = Array.prototype.indexOf.call(parent.children, target);

    // Csak "név", "kor" és a "nem" rendezhető.
    // Ha másik oszlop küldte az eseményt, simán befejezzük a futást,
    // nem változtatunk semmit.

    if (![1, 2, 3].includes(idx)) {
        return;
    }

    if (sortCol >= 0) {
        // Már rendeztünk korábban, tehát törölni kell a rendezést jelző osztályt
        // az EREDETI oszlop <i> tag-jéről
        let elem = parent.children[sortCol].querySelector("i")
        elem.classList.remove(SORT_ASC_CLASS);
        elem.classList.remove(SORT_DESC_CLASS);
    }

    if (idx == sortCol) {
        // ha a már rendezett oszlopra kattintunk, a rendezés irányát megfordítjuk
        sortDir *= -1;
    } else {
        // ha nem rendezett oszlopra kattintottunk, a rendezési beállításokat tartalmazó
        // változókat átállítjuk a másik oszlopra
        sortCol = idx;
        sortDir = 1;
    }

    // Itt az ÚJONNAN beállított rendezés szerint átállítjuk a rendezettség jelző nyilakat.
    let elem = target.querySelector("i")
    if (sortDir == 1) {
        elem.classList.add(SORT_ASC_CLASS);
        elem.classList.remove(SORT_DESC_CLASS);
    } else {
        elem.classList.remove(SORT_ASC_CLASS);
        elem.classList.add(SORT_DESC_CLASS);
    }
    rendez();
}

function rendez() {
    // a táblázat törzsében lévő sorokat (tr) rendezzük, és adjuk újra hozzá
    // rendezetten a tbody-hoz, ezzel rendezetts lesz a táblázat.
    let tbody = document.querySelector("tbody");
    // betesszük a tbody gyerekeit (a sorokat - tr elemek)) egy tömbbe

    let rows = Array.from(tbody.childNodes);

    // a rendezett elemeket újra a tbody-hoz adjuk, mivel egy elem nem lehet két helyen,
    // ezzel eltávolítódik a régi, az újak viszont sorrendben lesznek.
    rows.sort((r1, r2) => {
        // v1 és v2 az összehasonlítandó cellák egyszerű szöveges tartalma (textContent)
        let v1 = r1.childNodes[sortCol].textContent;
        let v2 = r2.childNodes[sortCol].textContent;

        switch (sortCol) {
            case 1: // név - szövegként rendezzük
                return v1.localeCompare(v2) * sortDir;
            case 2: // kor - számként rendezzük
                return (parseInt(v1) - parseInt(v2)) * sortDir;
            case 3: // nem - szövegként, de fordítottan rendezzük (szuka előre)
                return v1.localeCompare(v2) * -1 * sortDir;
            default:
                // mivel fent kezeljük, hogy csak az 1-3 oszlopokat rendezhetik,
                // ezért ide elvileg nem futhat a vezérlés, de önvédelemként jó,
                // ha nem hagyunk nyilvánvaló lyukat. Egy fv. MINDIG térjen vissza
                // valami eredménnyel.
                return 1;
        }

    }).map((row) => {tbody.appendChild(row)});
}
