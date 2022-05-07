const statsValueData = document.querySelectorAll(".userStatData");
const statsTypeData = document.querySelectorAll(".userTypeData");
const setStatsButton = document.querySelector("#setStatsButton");
const getOptiButton = document.querySelector("#getOptiButton");


let statsValue = [10, 21, 10, 7];
let statsType = ['speed', 'attackPercent', 'criRate', 'criDamage'];
let Rune = { };

function Stat(value, type) {
    this.value = value,
    this.type = type
}

function Template(id, coeffs) {
    this.id = id,
    this.coeffs = coeffs
}

const coeffsTemplateAttack = [new Stat(1.20, 'speed'), 
new Stat(1.30, 'attackPercent'),
new Stat(1.10, 'criRate'),
new Stat(1.10, 'criDamage'),
new Stat(1.05, 'attackFlat'),
new Stat(0.80, 'defensePercent'),
new Stat(1, 'resistance'),
new Stat(0.70, 'accuracy'),
new Stat(1, 'hpFlat'),
new Stat(1, 'hpPercent'),
new Stat(1, 'defenseFlat')];

const templateAttack = new Template('templateAttack', coeffsTemplateAttack)

function getStats() {
    statsValueData.forEach(e => {statsValue.push(parseInt(e.value, 10))});
    statsTypeData.forEach(e => {statsType.push(e.value)});
}

function setRune(rune, value, type) {
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

function templateCalc(runeStatsType, templateCoeffs) {
    let coeffValue = 0;
    templateCoeffs.forEach(coeff => {
        if (coeff.type == runeStatsType) {
            coeffValue = coeff.value;
        }
    })
    return coeffValue;
}

function setTemplate(rune, template) {
    rune.stats.forEach(stat => {
        let coeffValue = templateCalc(stat.type, template.coeffs);
        let coeffHits = (stat.hits * coeffValue);
        stat.coeffHits = coeffHits;
    });
}

function setRuneTotalHits(rune) {
    let totalHits = 0;
    rune.stats.forEach(stat => {
        totalHits += stat.coeffHits;
    })
    rune.totalHits = totalHits;
}

function getOpti() {
    setRune(Rune, statsValue, statsType);
    setHits(Rune);
    setTemplate(Rune, templateAttack);
    setRuneTotalHits(Rune);
    console.log(Rune);
}

setStatsButton.onclick = getStats;
getOptiButton.onclick = getOpti;
