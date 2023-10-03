import {completeIconSet} from '../dist/icons/build/complete-icon-set';

function buildIconCard(icon) {
    const iconCard = document.createElement('div');
    iconCard.classList.add('icon-card');
    iconCard.appendChild(buildSVGElement(icon));
    iconCard.appendChild(document.createTextNode(icon.name.split("_").join(" ")));
    return iconCard;
}

function buildSVGElement(icon) {
    const div = document.createElement('DIV');
    div.innerHTML = icon.data;
    if (!div.childNodes[0].getAttribute("viewBox")) {
        div.childNodes[0].setAttribute("viewBox", "0 0 400 400");
    }
    for (const e of div.childNodes[0].childNodes) {

        for (const e_child of e.childNodes) {
            try {
                if (!e_child.getAttribute("class")) continue;
            } catch {
                continue;
            }
            var classList = e_child.getAttribute("class").split(" ")
            const idx = classList.indexOf("st0");
            if (idx > -1) classList.splice(idx, 1);
            const idx2 = classList.indexOf("st1");
            if (idx2 > -1) classList.splice(idx2, 1);
            e_child.setAttribute("class", classList.join(" "));
        }

        if (!e.getAttribute("class")) continue;
        var classList = e.getAttribute("class").split(" ")
        const idx = classList.indexOf("st0");
        if (idx > -1) classList.splice(idx, 1);
        const idx2 = classList.indexOf("st1");
        if (idx2 > -1) classList.splice(idx2, 1);
        e.setAttribute("class", classList.join(" "));
    }
    return (
        div.querySelector('svg') ||
        this.document.createElementNS('http://www.w3.org/2000/svg', 'path')
    );
}

function buildIconList(iconSet) {
    const iconList = document.querySelector('.icon-list');
    iconList.innerHTML = '';
    iconSet.forEach(icon => iconList.appendChild(buildIconCard(icon)));
}

const searchField = document.querySelector('input');
searchField.addEventListener('keydown', function (event) {
    const newIconSet = completeIconSet.filter(icon => icon.name.includes(searchField.value));
    buildIconList(newIconSet);
});

buildIconList(completeIconSet);

