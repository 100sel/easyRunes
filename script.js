const statsValueData = document.querySelectorAll(".userStatData");
const statsTypeData = document.querySelectorAll(".userTypeData");
const getOptiButton = document.querySelector("#getOptiButton");
const displayOpti = document.querySelector("#displayOpti");

//runeDamage
let statsValue = [10, 21, 7, 5];
let statsType = ['speed', 'attackPercent', 'criDamagePercent', 'criRate'];
//runeBalanced
//let statsValue = [10, 14, 14, 7];
//let statsType = ['speed', 'attackPercent', 'hpPercent', 'accuracy'];
//runeSupport
//let statsValue = [10, 21, 7, 7];
//let statsType = ['speed', 'hpPercent', 'defensePercent', 'accuracy'];
//runeNuker
//let statsValue = [10, 7, 10, 14];
//let statsType = ['speed', 'attackPercent', 'criRate', 'criDamage'];

//let statsValue = [ ];
//let statsType = [ ];
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
    new Stat(1.3, 'speed'),
    new Stat(1, 'hpPercent'),
    new Stat(1, 'defensePercent'), 
    new Stat(1, 'attackPercent'),    
    new Stat(0.7, 'criRate'),
    new Stat(0.7, 'criDamagePercent'),
    new Stat(0.8, 'accuracyPercent'),
    new Stat(1, 'resistance'),
    new Stat(1, 'hpFlat'),
    new Stat(1, 'attackFlat'),
    new Stat(1, 'defenseFlat')
];
const templateBalanced = new Template('templateBalanced', coeffsTemplateBalanced);

const coeffsTemplateSupport = [
    new Stat(1.1, 'speed'),
    new Stat(1.3, 'hpPercent'),
    new Stat(1.2, 'defensePercent'), 
    new Stat(0.7, 'attackPercent'),    
    new Stat(0.7, 'criRate'),
    new Stat(0.7, 'criDamagePercent'),
    new Stat(1, 'accuracyPercent'),
    new Stat(1, 'resistance'),
    new Stat(1.05, 'hpFlat'),
    new Stat(0.95, 'attackFlat'),
    new Stat(1.05, 'defenseFlat')
];

const templateSupport = new Template('templateSupport', coeffsTemplateSupport);

const coeffsTemplateNuker = [
    new Stat(1.1, 'speed'),
    new Stat(0.7, 'hpPercent'),
    new Stat(0.7, 'defensePercent'), 
    new Stat(1.1, 'attackPercent'),    
    new Stat(1.2, 'criRate'),
    new Stat(1.2, 'criDamagePercent'),
    new Stat(0.8, 'accuracyPercent'),
    new Stat(1, 'resistance'),
    new Stat(1, 'hpFlat'),
    new Stat(1.05, 'attackFlat'),
    new Stat(1, 'defenseFlat')
];

const templateNuker = new Template('templateNuker', coeffsTemplateNuker);

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
        stat.hits = Math.round((stat.value / hitsCalc(stat.type) * 100) / 10);
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

function setTemplate(rune, ...template) {
    let opti = [ ];
    template.forEach(template => {
        let totalHits = 0;
        rune.stats.forEach(stat => {
            totalHits += (stat.hits * templateCalc(stat.type, template.coeffs));
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
        }
        rune.efficiency = opti; 
    })
}

function showOpti() {
    Rune.efficiency.forEach(opti => {
        let runeOpti = document.createElement("div");
        runeOpti.innerHTML = opti.type + ' : ' + opti.value.toFixed(2);
        displayOpti.appendChild(runeOpti);
    });
}

function getOpti() {
    //getStats();
    setRune(Rune, statsValue, statsType);
    setHits(Rune);
    setTemplate(Rune, templateDamage, templateBalanced, templateSupport, templateNuker);
    showOpti();
}

getOptiButton.onclick = getOpti;
