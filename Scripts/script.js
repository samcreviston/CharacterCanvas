const classOutputElement = document.getElementById('class_output');
const raceOutputElement = document.getElementById('race_output');
var createButtonGenerated = false;

// async getClassStats Function using fetch()
const getClassStats = async () => {
    var classFilter = document.querySelector('#class_filter').value;
    const classResponse = await fetch("https://www.dnd5eapi.co/api/classes/" + classFilter);
    return await classResponse.json();
}

// async getRaceStats Function using fetch()
const getRaceStats = async() => {
    var raceFilter = document.querySelector('#race_filter').value;
    const raceResponse = await fetch("https://www.dnd5eapi.co/api/races/" + raceFilter);
    return await raceResponse.json();
}

function displayClass(characterClass) {
    const classHtml = `
    <p>Class Name: ${characterClass.name}</p>
    <p>Hit Die: ${characterClass.hit_die}</p>
    <p>Proficiencies: ${characterClass.proficiencies.map(prof => prof.name).join(', ')}</p>
    `;
    classOutputElement.innerHTML = classHtml;
}

function displayRace(raceStats) {
    var abilityArray = [];
    var languageArray = [];
    var traitsArray = [];

    raceStats.ability_bonuses.forEach(ability => {
        if (abilityArray == "") {
        abilityArray += ability.ability_score.name + " +" + ability.bonus;
        }
        else
        abilityArray += ", " + ability.ability_score.name + " +" + ability.bonus;
    });

    raceStats.languages.forEach(language => {
        if (languageArray == "") {
            languageArray += language.name;
        }
        else
        languageArray += ", " + language.name;
    });
    
    raceStats.traits.forEach(trait => {
        if (traitsArray == "") {
            traitsArray += trait.name;
        }
        else
        traitsArray += ", " + trait.name;
    });


    const raceHtml = `
    <p>Race Name: ${raceStats.name}</p>
    <p>Speed: ${raceStats.speed}</p>
    <p>Size: ${raceStats.size}</p>
    <p>Ability Stats: ${abilityArray}</p>
    <p>Language(s): ${languageArray}</p>
    <p>Traits: ${traitsArray}</p>

    `;
    raceOutputElement.innerHTML = raceHtml;
}

/*
function presentOptions() {
    const classFilter = document.getElementById('class_filter').value;
    const raceFilter = document.getElementById('race_filter').value;
    const otherOptionsDiv = document.getElementById('other_options');

    if (classFilter !== "" && raceFilter !== "") {
        // Clear any existing content in the div
        otherOptionsDiv.innerHTML = '';

        // Get the character class JSON data
        const characterClass = getClassStats();

       characterClass.starting_equipment_options.from.options.forEach(options => {
            var equipmentSelect = document.createElement('select');

            options.option.forEach(option => {
                var equipmentOption = document.createElement('option');
                equipmentSelect.textContent = option.of.name;
                equipmentSelect.appendChild(equipmentOption);
            })
       });

       otherOptionsDiv.appendChild(equipmentSelect);
    }
}
*/

function reset() {
    classOutputElement.innerHTML = '';
    raceOutputElement.innerHTML = '';
}

function presentCreateButton() {
    const classFilter = document.getElementById('class_filter');
    const raceFilter = document.getElementById('race_filter');
    var createButtonElement = document.getElementById('create_button');
    var buttonElement = document.createElement('button');
    buttonElement.textContent = "Generate Character";
    buttonElement.id = "create_button";

    if (classFilter.value != "" && raceFilter.value != "" && createButtonGenerated !== true) {
        createButtonElement.appendChild(buttonElement); 
        createButtonGenerated = true;
    }
}

document.getElementById('create_button').addEventListener('click', async () => {
    reset();
    const classStats = await getClassStats();
    displayClass(classStats);
    const raceStats = await getRaceStats();
    displayRace(raceStats);
});

//passive listeners to trigger the 'present' functions
document.querySelector('#race_filter').addEventListener('change', () => presentCreateButton());
document.querySelector('#class_filter').addEventListener('change', () => presentCreateButton());

/*
document.querySelector('#race_filter').addEventListener('change', async () => {
    const classStats = await getClassStats();
    presentOptions(classStats)});
document.querySelector('#class_filter').addEventListener('change', async () => {
    const classStats = await getClassStats();
    presentOptions(classStats)});
*/