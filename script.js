const statsValueData = document.querySelectorAll(".userStatData");
const statsTypeData = document.querySelectorAll(".userTypeData");
const setStatsButton = document.querySelector("#setStatsButton");
const getOptiButton = document.querySelector("#getOptiButton");


let statsValue = [10, 21, 7, 5];
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

const coeffsTemplateDamage = [
    new Stat(1.2, 'speed'),
    new Stat(1, 'hpPercent'),
    new Stat(0.8, 'defensePercent'), 
    new Stat(1.3, 'attackPercent'),    
    new Stat(1.1, 'criRate'),
    new Stat(1.1, 'criDamage'),
    new Stat(0.7, 'accuracy'),
    new Stat(1, 'resistance'),
    new Stat(1, 'hpFlat'),
    new Stat(1.05, 'attackFlat'),
    new Stat(1, 'defenseFlat')
];
const templateDamage = new Template('templateDamage', coeffsTemplateDamage);

const coeffsTemplateBalanced = [
    new Stat(1.3, 'speed'),
    new Stat(1.1, 'hpPercent'),
    new Stat(1.1, 'defensePercent'), 
    new Stat(1.1, 'attackPercent'),    
    new Stat(0.8, 'criRate'),
    new Stat(0.8, 'criDamage'),
    new Stat(0.8, 'accuracy'),
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
    new Stat(0.8, 'attackPercent'),    
    new Stat(0.7, 'criRate'),
    new Stat(0.7, 'criDamage'),
    new Stat(1, 'accuracy'),
    new Stat(1, 'resistance'),
    new Stat(1.05, 'hpFlat'),
    new Stat(0.95, 'attackFlat'),
    new Stat(1.05, 'defenseFlat')
];

const templateSupport = new Template('templateSupport', coeffsTemplateSupport);

const coeffsTemplateNuker = [
    new Stat(1.2, 'speed'),
    new Stat(1, 'hpPercent'),
    new Stat(0.8, 'defensePercent'), 
    new Stat(1.1, 'attackPercent'),    
    new Stat(1.3, 'criRate'),
    new Stat(1.3, 'criDamage'),
    new Stat(1, 'accuracy'),
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

function setTemplate(rune, ...template) {
    template.forEach(template => {
        let totalHits = 0;
        rune.stats.forEach(stat => {
            //totalHits += (stat.hits * templateCalc(stat.type, template.coeffs);
            let coeffValue = templateCalc(stat.type, template.coeffs);
            let coeffHits = (stat.hits * coeffValue);
            totalHits += coeffHits;
        });
        switch (template.id) {
            case 'templateDamage': 
                rune.damageHits = totalHits;
                break;
            case 'templateBalanced':
                rune.balancedHits = totalHits;
                break;
            case 'templateSupport':
                rune.supportHits = totalHits;
                break;
            case 'templateNuker':
                rune.nukerHits = totalHits;                
        }
    })
}

function getOpti() {
    setRune(Rune, statsValue, statsType);
    setHits(Rune);
    setTemplate(Rune, templateDamage, templateBalanced, templateSupport, templateNuker);
    console.log(Rune);
}

setStatsButton.onclick = getStats;
getOptiButton.onclick = getOpti;
