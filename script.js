const statsValueData = document.querySelectorAll(".userStatData");
const statsTypeData = document.querySelectorAll(".userTypeData");
const getOptiButton = document.querySelector("#getOptiButton");
const displayOpti = document.querySelector("#displayOpti");

const testDmgBtn = document.querySelector("#getOptiButtonDmg");
const testBlcBtn = document.querySelector("#getOptiButtonBlc");
const testSupBtn = document.querySelector("#getOptiButtonSup");
const testNkrBtn = document.querySelector("#getOptiButtonNkr");

let statsValue = [];
let statsType = [];

function testDmg() {
    statsValue = [10, 21, 7, 5];
    statsType = ['speed', 'attackPercent', 'criDamagePercent', 'criRate'];
}

function testBlc() {
    statsValue = [10, 14, 14, 7];
    statsType = ['speed', 'attackPercent', 'hpPercent', 'accuracyPercent'];
}

function testSup() {
    statsValue = [10, 21, 7, 7];
    statsType = ['speed', 'hpPercent', 'defensePercent', 'accuracyPercent'];
}

function testNkr() {
    statsValue = [5, 7, 15, 14];
    statsType = ['speed', 'attackPercent', 'criRate', 'criDamagePercent'];
}

let Rune = { };

function Stat(value, type) {
    this.value = value,
    this.type = type
}

function Template(id, coeffs) {
    this.id = id,
    this.coeffs = coeffs
}

const coeffsTemplateDamage = [
    new Stat(1.2, 'speed'),
    new Stat(0.8, 'hpPercent'),
    new Stat(0.8, 'defensePercent'), 
    new Stat(1.3, 'attackPercent'),    
    new Stat(1, 'criRate'),
    new Stat(1, 'criDamagePercent'),
    new Stat(0.7, 'accuracyPercent'),
    new Stat(1, 'resistance'),
    new Stat(1, 'hpFlat'),
    new Stat(1.05, 'attackFlat'),
    new Stat(1, 'defenseFlat')
];
const templateDamage = new Template('templateDamage', coeffsTemplateDamage);

const coeffsTemplateBalanced = [
    new Stat(1.1, 'speed'),
    new Stat(1.2, 'hpPercent'),
    new Stat(1.2, 'defensePercent'), 
    new Stat(1.2, 'attackPercent'),    
    new Stat(0.7, 'criRate'),
    new Stat(0.7, 'criDamagePercent'),
    new Stat(1, 'accuracyPercent'),
    new Stat(1, 'resistance'),
    new Stat(1, 'hpFlat'),
    new Stat(1, 'attackFlat'),
    new Stat(1, 'defenseFlat')
];
const templateBalanced = new Template('templateBalanced', coeffsTemplateBalanced);

const coeffsTemplateSupport = [
    new Stat(1.2, 'speed'),
    new Stat(1.3, 'hpPercent'),
    new Stat(1.3, 'defensePercent'), 
    new Stat(0.7, 'attackPercent'),    
    new Stat(0.7, 'criRate'),
    new Stat(0.7, 'criDamagePercent'),
    new Stat(1.2, 'accuracyPercent'),
    new Stat(1, 'resistance'),
    new Stat(1.05, 'hpFlat'),
    new Stat(0.95, 'attackFlat'),
    new Stat(1.05, 'defenseFlat')
];
const templateSupport = new Template('templateSupport', coeffsTemplateSupport);

const coeffsTemplateNuker = [
    new Stat(1, 'speed'),
    new Stat(0.7, 'hpPercent'),
    new Stat(0.7, 'defensePercent'), 
    new Stat(1.1, 'attackPercent'),    
    new Stat(1.3, 'criRate'),
    new Stat(1.2, 'criDamagePercent'),
    new Stat(0.8, 'accuracyPercent'),
    new Stat(1, 'resistance'),
    new Stat(1, 'hpFlat'),
    new Stat(1.05, 'attackFlat'),
    new Stat(1, 'defenseFlat')
];
const templateNuker = new Template('templateNuker', coeffsTemplateNuker);

const coeffsTemplateNeutral = [
    new Stat(1, 'speed'),
    new Stat(1, 'hpPercent'),
    new Stat(1, 'defensePercent'), 
    new Stat(1, 'attackPercent'),    
    new Stat(1, 'criRate'),
    new Stat(1, 'criDamagePercent'),
    new Stat(1, 'accuracyPercent'),
    new Stat(1, 'resistance'),
    new Stat(1, 'hpFlat'),
    new Stat(1, 'attackFlat'),
    new Stat(1, 'defenseFlat')
];
const templateNeutral = new Template('templateNeutral', coeffsTemplateNeutral);

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
        return 8;
    }
    if (type.match == 'resistance') {
        return 12;
    }
    if (type.match == 'hpFlat') {
        return 10;
    } 
    if (type.match == 'attackFlat' || type.match == 'defenseFlat') {
        return 7;
    }
    return 6;
}

function setHits(rune) {
    rune.stats.forEach(stat => {
        if (stat.type.match(/Flat/)) {
            if (stat.type.match(/hp/)) {
                stat.value = (stat.value / 100);
            } else {
                stat.value = stat.value / 7;
            }
        }
        stat.hits = stat.value / hitsCalc(stat.type);
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

function setOpti(rune, ...template) {
    let opti = [ ];
    template.forEach(template => {
        let totalHits = 0;
        rune.stats.forEach(stat => {
            totalHits += (stat.hits * templateCalc(stat.type, template.coeffs))
        })
        switch (template.id) {
            case 'templateDamage': 
                opti.push(new Stat(totalHits, 'Damage'));
                break;
            case 'templateBalanced':
                opti.push(new Stat(totalHits, 'Balanced'));
                break;
            case 'templateSupport':
                opti.push(new Stat(totalHits, 'Support'));
                break;
            case 'templateNuker':
                opti.push(new Stat(totalHits, 'Nuker'));
                break;  
            case 'templateNeutral':
                opti.push(new Stat(totalHits, 'Neutral'));
                break;             
        }
        rune.opti = opti; 
    })
}

function getEfficiency(rune) {
    let efficiency = [ ];
    rune.opti.forEach(opti => {
        efficiency.push(new Stat((100 - ((10 - opti.value)*7)).toFixed(2), opti.type));
    })
    let totalHits = 0;
    rune.stats.forEach(stat => {
        totalHits += stat.hits;
    })
    rune.efficiency = efficiency;
    let nonOptiEfficiency = (100 - ((10 - totalHits)*7)).toFixed(2)
    rune.nonOpti = [totalHits, nonOptiEfficiency];
}

function showOpti() {
    Rune.efficiency.forEach(effic => {
        let runeOpti = document.createElement("div");
        runeOpti.innerHTML = effic.type + ' : ' + effic.value;
        displayOpti.appendChild(runeOpti);
    });
}

function getOpti() {
    //getStats();
    setRune(Rune, statsValue, statsType);
    setHits(Rune);
    setOpti(Rune, templateDamage, templateBalanced, templateSupport, templateNuker, templateNeutral);
    getEfficiency(Rune);
    console.log(Rune);
    showOpti();
}

getOptiButton.onclick = getOpti;
testDmgBtn.onclick = testDmg;
testBlcBtn.onclick = testBlc;
testSupBtn.onclick = testSup;
testNkrBtn.onclick = testNkr;
