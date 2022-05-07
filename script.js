
const statsValueData = document.querySelectorAll(".userStatData");
const statsTypeData = document.querySelectorAll(".userTypeData");
const setStatsButton = document.querySelector("#setStatsButton");

function setStats() {

    let statsValue = [];
    let statsType = [];
    statsValueData.forEach(e => {statsValue.push(e.value)});
    statsTypeData.forEach(e => {statsType.push(e.value)});

    let rune = [];
    function Stat(value, type) {
        this.value = value,
        this.type = type
    }
    for (i=0; i<statsValue.length; i++) {
        rune.push(new Stat(statsValue[i], statsType[i]));
    }
    console.log(rune);
}

setStatsButton.onclick = setStats;

