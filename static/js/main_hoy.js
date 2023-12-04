// Test du chargement des probas:
/*
let xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");
xhr.open("GET", "/static/resultat.json", false); // Notez-le "false" pour le mode synchrone
xhr.send();

let resultat;

if (xhr.status === 200) {
  resultat = JSON.parse(xhr.responseText);
  // Je peux maintenant utiliser myJSONData dans le reste du code
} else {
  console.error('Erreur de chargement du fichier JSON resultat');
}
*/
let xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");
xhr.open("GET", "/static/resultat_hoy_complet.json", false); // Notez-le "false" pour le mode synchrone
xhr.send();

let resultat;

if (xhr.status === 200) {
  resultat = JSON.parse(xhr.responseText);
  // Je peux maintenant utiliser myJSONData dans le reste du code
} else {
  console.error('Erreur de chargement du fichier JSON resultat');
}

////////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function() {
    // Sélectionnez l'élément h1 par son ID
    let monTitre = document.getElementById("mon-titre");
    // Modifiez le contenu du titre
    monTitre.textContent = "Probabilités de tirage";
});

// Sélectionne le conteneur des boutons des équipes
let boutonContainer = document.getElementById("bouton-container"); // contient tous les boutons et titres de
// sections en bas de page
let buttonTeamContainer = document.createElement("div")
buttonTeamContainer.id = "team-button"
boutonContainer.appendChild(buttonTeamContainer)
let nameSection = document.createElement("p")
nameSection.id = "section-team-button"
nameSection.textContent = "Draw teams: "
buttonTeamContainer.appendChild(nameSection)

// Nom des équipes en un morceau plus pratique à manipuler
let Winners = [];
let Runners_up = []
// Liste des équipes comme elles sont écrites dans le fichier resultat.json
//let runners_resultat = ['Copenhague', 'PSV', 'Naples', 'Inter', 'Lazio', 'PSG', 'Leipzig', 'Porto']
//let winners_resultat = ['Bayern', 'Arsenal', 'R Madrid', 'R Sociedad', 'Atl Madrid', 'Dortmund', 'Man City', 'Barcelone']
let runners_resultat = ['FC Copenhague', 'PSV', 'Naples', 'Inter', 'Lazio', 'PSG', 'Leipzig', 'Porto']
let winners_resultat = ['Bayern', 'Arsenal', 'Real Madrid', 'Real Sociedad', 'Atletico Madrid', 'Dortmund', 'Manchester City', 'Barcelone']
let affichage_winners = false  // pour savoir quel type de boutons est affiché

runners_resultat.forEach(function(name){
    Runners_up.push(changeSpaceby_(name))
})
winners_resultat.forEach(function (name){
    Winners.push(changeSpaceby_(name))
})
const default_cell_match = "........."

// Crée et ajoute les boutons au conteneur
let boutons_winners = []    // Ce sont les boutons qui sont toujours affichés sur le site
let boutons_runner = []     // cad les équipes qui n'ont pas été choisies
let chosen_team = []   // Crée la liste des équipes choisies qui sert pour l'instant pour le undo

// Initialise tous les boutons et affiche dans un premier temps les winners
let taille_boucle = Math.max(Winners.length,Runners_up.length)
for(let i=0; i<taille_boucle;i++){
    if(i<Winners.length){
        let bouton = document.createElement("button");
        bouton.textContent = change_bySpace(Winners[i]);
        bouton.className = "winner";
        buttonTeamContainer.appendChild(bouton);
        boutons_winners.push(bouton);
        bouton.style.display="none";
    }
    if(i<Runners_up.length){
        let bouton = document.createElement("button");
        bouton.textContent = change_bySpace(Runners_up[i]);
        bouton.className = "runner_up";
        buttonTeamContainer.appendChild(bouton);
        boutons_runner.push(bouton);
    }
}

// Fonction qui fait disparaître les boutons
function disappear_bouton(bouton){
    bouton.style.display = "none";
}

// Fonction qui change uppercase par espace
function change_bySpace(word){
    const new_word = word.replace(/_/g, ' ');
    return new_word;
}

function changeSpaceby_(word){
    const new_word = word.replace(/\s/g,'_')
    return new_word
}

// Fonction qui change la valeur de la cellule
function change_proba(cell,index,index2){
    if(cell){
        let nombre = resultat[index][index2]
        nombre = 100*nombre
        cell.textContent = String(nombre.toFixed(2))+"%"
    }else{
        console.log("erreur dans change proba")
    }
}

function verif_zero(){
    for(let i=0;i<Winners.length;i++){
        for(let j=0;j<Runners_up.length;j++){
            let id = Runners_up[i]+" "+Winners[j]
            let cell = document.getElementById(id)
            let content = cell.textContent
            let number = parseFloat(content.slice(0,-1))
            if(number===0){ // on grise ma cellule si la valeur est 0
                cell.style.backgroundColor = "rgb(182,182,182)"
            }
        }
    }
    let max_index;  // vérifie s'il y a des matchs et affichent
    // les cases correspondantes en bleu en écrivant match
    if(chosen_team.length%2===0){max_index=chosen_team.length}
    else{max_index=chosen_team.length-1}
    for(let i=0;i<max_index/2;i++){
        let id = changeSpaceby_(chosen_team[2*i].textContent)+" "+changeSpaceby_(chosen_team[2*i+1].textContent)
        let cell = document.getElementById(id)
        cell.style.backgroundColor = "#50f3db"
        cell.textContent= "Match"
    }
}

function change_graphism(){
    without_graphism()
    // Illumine la ligne en jaune
    if(chosen_team.length%2===1){
        let last_team = chosen_team[chosen_team.length-1]
        let selecteur = "."+changeSpaceby_(last_team.textContent)
        let colorChange = document.querySelectorAll(selecteur)
        colorChange.forEach(function (element){
            element.style.backgroundColor = "rgba(255,255,112,0.93)"
        })
        if(chosen_team.length>1){
            for(let i=0; i<chosen_team.length-1;i++){
                let bouton = chosen_team[i]
                let selecteur = "."+changeSpaceby_(bouton.textContent)
                //console.log(selecteur)
                let colorChange = document.querySelectorAll(selecteur)
                let j=0
                colorChange.forEach(function (element){
                    if(j>0){
                        //console.log(element)
                        element.style.backgroundColor = "transparent"
                        element.textContent = "0.00%"
                    }else{
                        element.style.backgroundColor = "transparent"
                    }
                    j++
                })
            }
        }
    }else{
        for(let j=0;j<chosen_team.length;j++){
            let bouton = chosen_team[j]
            let selecteur = "."+changeSpaceby_(bouton.textContent)
            let colorChange = document.querySelectorAll(selecteur)
            let i=0
            colorChange.forEach(function (element){
                if(i>0){
                    element.style.backgroundColor = "transparent"
                    element.textContent = "0.00%"
                }else{
                    element.style.backgroundColor = "transparent"
                }
                i++
            })
        }
    }
}

// test reini graphiquement le tableau
function without_graphism(){
    for(let i=0;i<Winners.length;i++) {
        for (let j = 0; j < Runners_up.length; j++) {
            let id = Runners_up[i] + " " + Winners[j]
            let cell = document.getElementById(id)
            cell.style.backgroundColor = "transparent"
        }
    }
}

function remove(list,elt_to_delete){
    let index = list.indexOf(elt_to_delete)
    list.splice(index, 1)
}
function remove_from_list(){ // Utilise les variables globales
    let runner = []
    let winner = []
    let max_index;
    runners_resultat.forEach(function(name){    // On copie les listes
        runner.push(name)
    })
    winners_resultat.forEach(function(name){
        winner.push(name)
    })
    if(chosen_team.length%2 === 1){max_index = chosen_team.length-1}
    else{max_index = chosen_team.length}
    for(let i=0;i<max_index;i++) {
        let name = change_bySpace(chosen_team[i].textContent) // Normalement la liste sera déjà bien organisé
        if (runner.includes(name)) {
            remove(runner, name)
        } else if (winner.includes(name)) {
            remove(winner, name)
        }else{console.log("on est dans le else avec: "+name)}
    }
    let index = "('" + runner[0] + "'"
    for(let i=1;i<runner.length-1;i++){
        index += ", '"+ runner[i]+"'"
    }
    index+= ", '"+runner[runner.length-1] +"'), ("
    index += "'"+winner[0]+"'"
    for(let i=1;i<winner.length-1;i++){
        index += ", '"+ winner[i]+"'"
    }
    index+= ", '"+winner[winner.length-1] +"')"
    return index
}

function give_index2(winner,runner){ // Utilise des variables globales
    let index2 = change_bySpace(runner)+", "+change_bySpace(winner);
    if(affichage_winners){
        index2+=", "+change_bySpace(chosen_team[chosen_team.length-1].textContent)
    }
    return index2
}
function change_all(){
    for(let i=0;i<Winners.length;i++){
        for(let j=0;j<Runners_up.length;j++){
            let id = Runners_up[i]+" "+Winners[j]
            let cell = document.getElementById(id)
            //console.log(cell.id)
            let index = remove_from_list()
            //console.log(index)
            let index2 = give_index2(Winners[j],Runners_up[i])
            //console.log(index2)
            change_proba(cell,index,index2)
        }
    }
}

// Tableau où vont être affiché les matchs
let tableMatch = document.getElementById("match-table")
for(let i=0;i<Winners.length;i++){
    let new_line = document.createElement("th")
    for (let j = 0; j < 3; j++) {
        if (j === 1) {
            let new_cell = document.createElement("td")
            new_cell.textContent = " VS "
            new_cell.className = "cell-center"
            new_line.appendChild(new_cell)
        } else {
            let new_cell = document.createElement("td")
            new_cell.textContent = default_cell_match
            // id pour récupérer ensuite la cellule et en modifier le contenu
            new_cell.id = String(i) + "_" + String(j)
            new_cell.className = "cell-match-table"
            new_line.appendChild(new_cell)
        }
    }
    new_line.className = "line-match-table"
    tableMatch.appendChild(new_line)
}

// Fonction qui ajoute les équipes au tableau et change les boutons affichés
function add_team_to_list_match(bouton){
    //  Change les boutons
    let list=[]
    let other_list=[]
    if(boutons_winners.includes(bouton)){  // if affichage_winners
        list = boutons_winners
        other_list = boutons_runner    // Peut aussi se faire avec affichage_winners dans la condition
    }else{
        list = boutons_runner
        other_list = boutons_winners
    }
    let index = list.indexOf(bouton)
    list.splice(index, 1)     // On enlève l'équipe des équipes à proposer
    affichage_winners = !affichage_winners  // on affiche les autres équipes
    list.forEach(function(button){  // Je fais disparaître toutes les autres boutons
        disappear_bouton(button)
    })
    other_list.forEach(function(button){
        // Si la proba du texte de ce button avec le dernier choisi: bouton est de 0 alors on n'affiche pas le button
        // car le match ne peut pas avoir lieu et donc pas de calcul de proba, sinon il y a un pb
        if(affichage_winners) {  // on vérifie que le bouton est un runner, dans ce cas on peut pas afficher tous les winners
            let cellule = document.getElementById(changeSpaceby_(bouton.textContent)+" "+changeSpaceby_(button.textContent))
            //console.log(changeSpaceby_(bouton.textContent)+" "+changeSpaceby_(button.textContent))
            //console.log(cellule)
            let proba = parseFloat(cellule.textContent)
            if(proba !== 0){
                button.style.display="block"
            }
        }
        else{button.style.display="block"}
    })
    chosen_team.push(bouton)    // Rajoute l'équipe dans les équipes choisies
    // J'actualise toutes les probas
    if(chosen_team.length<Runners_up.length+Winners.length-3) {
        change_all()
    }
    change_graphism()
    // Ajoute la liste des matchs en fonction des clics de l'utilisateur
    let number = chosen_team.length
    let i = 1+(-1)**(number%2)
    let j = Math.floor((number-1)/2)
    let cell = document.getElementById(String(j)+"_"+String(i))
    cell.textContent=bouton.textContent
    verif_zero()
}
// Fait disparaître les boutons quand on clique dessus et les ajoute à liste des matchs
for(let i=0; i<boutons_winners.length; i++) {
    boutons_winners[i].addEventListener("click", function (event) {
        if(affichage_winners) {
            let bouton = event.target
            disappear_bouton(bouton)
            add_team_to_list_match(bouton)
            affichage_winners = false
        }
    });
} // Même utilité pour cette boucle
for(let i=0; i<boutons_runner.length; i++) {
    boutons_runner[i].addEventListener("click", function (event) {
        if(!affichage_winners) {
            let bouton = event.target
            disappear_bouton(bouton)
            add_team_to_list_match(bouton)
            affichage_winners = true
        }
    })
}

// Contient le nom de la section et le conteneur des boutons
let optionsContainer = document.createElement("div")
optionsContainer.id="options-container"
boutonContainer.appendChild(optionsContainer)
// Section qui contient les boutons des options
let optionsButtonContainer = document.createElement("div")
optionsButtonContainer.id="options_boutons"
optionsContainer.appendChild(optionsButtonContainer)
// bouton undo inclu dans le conteneur de boutons des options
let undo_button = document.createElement("button")
undo_button.id="undo"
undo_button.textContent="Undo"
optionsButtonContainer.appendChild(undo_button)
// Section qui contient le titre du optionsContainer
let undoSection = document.createElement("p")
undoSection.id ="undo-name-section"
undoSection.textContent="Options: "
optionsContainer.appendChild(undoSection)
// Touche pour revenir en arrière, enlever la dernière équipe ajoutée
undo_button.addEventListener("click", function(event){
    if(chosen_team.length !== 0){
        let last_team_chosen = chosen_team.pop()
        let selecteur = "."+changeSpaceby_(last_team_chosen.textContent)
        let colorChange = document.querySelectorAll(selecteur)
        // Pour enlever le surlignage
        colorChange.forEach(function (element){
            let chosen_team_text = []
            chosen_team.forEach(function(button){
                chosen_team_text.push(changeSpaceby_(button.textContent))
            })
            if(element.classList.length === 3) {
                let team_test = "defaut"
                if (element.classList[1] === last_team_chosen.textContent) {
                    team_test = element.classList[2]
                } else {
                    team_test = element.classList[1]
                }
                if (!(chosen_team_text.includes(team_test))) {
                    element.style.backgroundColor = "transparent"
                }
            }else if(element.classList.length===2){element.style.backgroundColor = "transparent"}
        })
        //last_team_chosen.style.display = "block"    // on affiche de nouveau l'équipe
        if(affichage_winners){
            boutons_runner.push(last_team_chosen)   // on la remet dans la liste des boutons affichés correspondante
        }else{
            boutons_winners.push(last_team_chosen)
        }
        affichage_winners = !affichage_winners      // on rebascule sur l'affichage des autres teams
        boutons_winners.forEach(function(bouton){   // on change les modes d'affichage des boutons
            if(affichage_winners){
                // il faut que je rajoute une condition ici
                // test si (proba(chosen_team[last],bouton) !== 0): on affiche le bouton sinon on le fait
                let runner = chosen_team[chosen_team.length-1].textContent
                let id = changeSpaceby_(runner)+" "+changeSpaceby_(bouton.textContent)
                let cell = document.getElementById(id)
                //console.log(cell.id)
                let index = remove_from_list()
                //console.log(index)
                let index2 = give_index2(changeSpaceby_(bouton.textContent),changeSpaceby_(runner))
                //console.log(index2)
                if(cell){
                    let nombre = resultat[index][index2]
                    if(nombre!==0){
                        bouton.style.display="block"
                    }
                }
                else{console.log("la cellule n'existe pas")}
            }else{
                disappear_bouton(bouton)
            }
        })
        boutons_runner.forEach(function(bouton){
            if(!affichage_winners){
                bouton.style.display="block"
            }else{
                disappear_bouton(bouton)
            }
        })
        let number = chosen_team.length + 1     // On enlève les équipes du tableau
        let i = 1+(-1)**(number%2)
        let j = Math.floor((number-1)/2)
        let cell = document.getElementById(String(j)+"_"+String(i))
        cell.textContent= default_cell_match
        change_all()
        change_graphism()
        verif_zero()
    }
})

// ------------------------- Test du bouton restart -------------------- //
let restart_button = document.createElement("button")
restart_button.id = "restart-button"
restart_button.textContent = "Restart"
optionsButtonContainer.appendChild(restart_button)
restart_button.addEventListener("click",function(event){
    while(chosen_team.length>0){
        undo_button.click()
    }
})

// Rempli le tableau des probas
// Rempli la première ligne avec les équipes
let table = document.getElementById("proba-table")
let team_line = document.createElement("tr")
let vide = document.createElement("th")
team_line.appendChild(vide)
Winners.forEach(function(name){
    let team = document.createElement("th")
    team.textContent = change_bySpace(name)
    team.className = "team-cell " + name  // ajoute une classe pour que la cellule s'illumine quand équipe sélectionnée
    team_line.appendChild(team)
})
team_line.className = "team-line"
table.appendChild(team_line)
// Rempli le reste du tableau par les probas initiales
for(let i=0; i<Runners_up.length; i++){
    let line = document.createElement("tr")
    for(let j=0;j<Winners.length+1;j++){
        if(j===0) {
            let team = document.createElement("td")
            team.textContent = change_bySpace(Runners_up[i])
            team.className = "cell-team " + Runners_up[i] // ajoute une classe pour que la cellule s'illumine quand équipe sélectionnée
            line.appendChild(team)
        }else{
            let cell = document.createElement("td")
            // cell.textContent = String(i)+String(j)   // ce que je faisais avant de mettre les probas
            // code pour l'id des cellules de proba: runners_up en premier, puis winner séparé par un espace
            cell.id =  Runners_up[i]+" "+ Winners[j-1]
            cell.className = "proba-cell " + Winners[j-1] +" "+ Runners_up[i] // ajoute une classe pour que la cellule s'illumine quand équipe sélectionnée
            //change_proba(cell,"('Liverpool', 'Brugge', 'Inter', 'Frankfurt', 'AC Milan', 'Leipzig', 'Dortmund', 'PSG'), ('Napoli', 'Porto', 'Bayern', 'Tottenham', 'Chelsea', 'Real Madrid', 'Manchester City', 'Benfica')",change_bySpace(Runners_up[i])+", "+change_bySpace(Winners[j-1]))
            cell.textContent="..."
            line.appendChild(cell)
        }
    }
    line.className = "proba-line"
    table.appendChild(line)
}
let match_table=document.getElementById("match-table")
match_table.style.transform = "scale(0.9)"
change_all()
verif_zero()

