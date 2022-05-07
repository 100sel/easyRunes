const statsValueData = document.querySelectorAll(".userStatData");
const statsTypeData = document.querySelectorAll(".userTypeData");
const setStatsButton = document.querySelector("#setStatsButton");
const getOptiButton = document.querySelector("#getOptiButton");

let statsValue = [];
let statsType = [];
let Rune = { };

function Stat(value, type) {
    this.value = value,
    this.type = type
}

function Template(id, coeffs) {
    this.id = id,
    this.coeffs = coeffs
}

const templateAttack = new Template('templateAttack', coeffsTemplateAttack)

function setRune(value, type) {
    let runeStats = []
    for (i=0; i<value.length; i++) {
        runeStats.push(new Stat(value[i], type[i]));
    }
    rune.stats = runeStats;
}

function hitsCalc(type) { 
    if (type.match(/Percent/)) {
        return 7;
    } 
    if (type.match(/Flat/)) {
        return 500;
    } 
    if (type.match == 'resistance') {
        return 14;
    }
    return 5;
}

function setHits(rune) {
    rune.stats.forEach(stat => {
        stat.hits = Math.round((stat.value / hitsCalc(stat.type) * 10) / 10)
    })
}

function templateCalc(type, coeffs) {
    coeffs.forEach(coeff => {
        if (type == coeff.type) {
            return coeff.value;
        }
    })
}

function setTemplate(rune, template) {
    totalHits = 0;
    rune.forEach(stat => {
        totalHits += stat.value * templateCalc(stat.type, template.coeffs);
    })
    rune.hits = totalHits;
}

function getStats() {
    statsValueData.forEach(e => {statsValue.push(parseInt(e.value, 10))});
    statsTypeData.forEach(e => {statsType.push(e.value)});
}

function getOpti() {
    setHits(rune);
    setTemplate(rune.stats, templateAttack);
    console.log(rune.hits);
    return rune.hits
}

setStatsButton.onclick = getStats;
getOptiButton.onclick = getOpti;
