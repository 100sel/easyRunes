const statsValueData = document.querySelectorAll(".userStatData");
const statsTypeData = document.querySelectorAll(".userTypeData");
const setStatsButton = document.querySelector("#setStatsButton");

let statsValue = [];
let statsType = [];
let Rune = { };

function Stat(value, type) {
    this.value = value,
    this.type = type
}

function getStats() {
    statsValueData.forEach(e => {statsValue.push(parseInt(e.value, 10))});
    statsTypeData.forEach(e => {statsType.push(e.value)});
}

function setRuneStats() {
    let runeStats = []
    for (i=0; i<statsValue.length; i++) {
        runeStats.push(new Stat(statsValue[i], statsType[i]));
    }
    Rune.stats = runeStats;
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

function setHits() {
    Rune.stats.forEach(stat => {
        stat.hits = Math.round((stat.value / hitsCalc(stat.type)) * 10) / 10;
    })
}

function getRune() {
    getStats();
    setRuneStats();
    setHits();
    console.log(Rune);
}

setStatsButton.onclick = getRune;

