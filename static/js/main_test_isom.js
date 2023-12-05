// Test du chargement des probas:

// Remplacez le chemin par le chemin absolu vers votre fichier JSON
const url = "static/isom.json";
let xhr = new XMLHttpRequest();
xhr.overrideMimeType("application/json");
xhr.open("GET", url, false); // Notez-le "false" pour le mode synchrone
xhr.send();

let resultat;

if (xhr.status === 200) {
  resultat = JSON.parse(xhr.responseText);
  // Je peux maintenant utiliser myJSONData dans le reste du code
    console.log(resultat["(4275158523, 2813304703)"]["0, 4, 1"])
} else {
  console.error('Erreur de chargement du fichier JSON resultat');
}
////////////////////////////////////////////////////////////////////////////////////////////////////
/* Fonction qui fait l'appel à la base de donnée pour charger la base de donnée et renvoie un dictionnaire
de proba ou remplit elle même le tableau */

function fill_all2(){
    let result = G_init.isom()
    let q=result.q
    let permC=result.permCol
    let permR=result.permRow
    let proba_number;
    console.log("avant le if : ",q)
    if(chosen_team.length%2===0 && chosen_team.length>0){
        let index_runner = G_init.index_name(change_bySpace(chosen_team[chosen_team.length-2].textContent))//,permR)
        let index_winner = G_init.index_name(change_bySpace(chosen_team[chosen_team.length-1].textContent))//,permC)
        G_init.remove_2t(index_runner, index_winner)
        result = G_init.isom()
        q=result.q
        permC=result.permCol
        permR=result.permRow
        console.log("q quand nombre paire: ",q)
        for(let i=0;i<Winners.length;i++){
            for (let j = 0; j < Runners_up.length; j++) {
                let id = Runners_up[i] + " " + Winners[j]
                let cell = document.getElementById(id)
                proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR))+", "+G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC)]
                cell.textContent = String(proba_number)+"%"
            }
        }
    }else if(chosen_team.length%2===1) {
        //console.log(chosen_team[chosen_team.length-1].textContent)
        let team_cond = String(G_init.index_eq_runner(G_init.index_name(chosen_team[chosen_team.length-1].textContent), permR))
        for (let i = 0; i < Winners.length; i++) {
            for (let j = 0; j < Runners_up.length; j++) {
                let id = Runners_up[i] + " " + Winners[j]
                let cell = document.getElementById(id)
                proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR)) + ", " + G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC) + ", " +team_cond]
                cell.textContent = String(proba_number) + "%"
            }
        }
    }else{
        for(let i=0;i<Winners.length;i++) {
            for (let j = 0; j < Runners_up.length; j++) {
                let id = Runners_up[i] + " " + Winners[j]
                let cell = document.getElementById(id)
                proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR))+", "+G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC)]
                cell.textContent = String(proba_number)+"%"
            }
        }
    }
    fill_Nan()
    verif_zero()
    change_graphism()
}

function fill_all(){
    fetch(url)
        .then(response=>response.json())
        .then (resultat=> {
            let result = G_init.isom()
            let q=result.q
            let permC=result.permCol
            let permR=result.permRow
            let proba_number;
            console.log("avant le if : ",q)
            if(chosen_team.length%2===0 && chosen_team.length>0){
                let index_runner = G_init.index_name(change_bySpace(chosen_team[chosen_team.length-2].textContent))//,permR)
                let index_winner = G_init.index_name(change_bySpace(chosen_team[chosen_team.length-1].textContent))//,permC)
                G_init.remove_2t(index_runner, index_winner)
                result = G_init.isom()
                q=result.q
                permC=result.permCol
                permR=result.permRow
                console.log("q quand nombre paire: ",q)
                for(let i=0;i<Winners.length;i++){
                    for (let j = 0; j < Runners_up.length; j++) {
                        let id = Runners_up[i] + " " + Winners[j]
                        let cell = document.getElementById(id)
                        proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR))+", "+G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC)]
                        cell.textContent = String(proba_number)+"%"
                    }
                }
            }else if(chosen_team.length%2===1) {
                //console.log(chosen_team[chosen_team.length-1].textContent)
                let team_cond = String(G_init.index_eq_runner(G_init.index_name(chosen_team[chosen_team.length-1].textContent), permR))
                for (let i = 0; i < Winners.length; i++) {
                    for (let j = 0; j < Runners_up.length; j++) {
                        let id = Runners_up[i] + " " + Winners[j]
                        let cell = document.getElementById(id)
                        proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR)) + ", " + G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC) + ", " +team_cond]
                        cell.textContent = String(proba_number) + "%"
                    }
                }
            }else{
                for(let i=0;i<Winners.length;i++) {
                    for (let j = 0; j < Runners_up.length; j++) {
                        let id = Runners_up[i] + " " + Winners[j]
                        let cell = document.getElementById(id)
                        proba_number = resultat[q][String(G_init.index_eq_runner(G_init.index_name(change_bySpace(Runners_up[i])), permR))+", "+G_init.index_eq_winner(G_init.index_name(change_bySpace(Winners[j])), permC)]
                        cell.textContent = String(proba_number)+"%"
                    }
                }
            }
            fill_Nan()
            verif_zero()
            change_graphism()
        })
}

////////////////////////////////////////////////////////////////////////////////////////////////////
/*      Fonctions pour lire la base de données      */
class Team {
    constructor(name, country, group, set) {
        this._name = name;
        this._country = country;
        this._group = group;
        this._set = set;
    }

    name() {
        return this._name;
    }

    country() {
        return this._country;
    }

    group() {
        return this._group;
    }

    set() {
        return this._set;
    }
}

class GraphBipartite {
    constructor(features) {
        if (features.length === 0) {
            this.matrix = [];
            this._length = 0;
            this._teams = [];
            this.teams_runners_up = [];
            this.teams_winners = [];
        } else {
            this.matrix = features[0];
            this._length = features[3];
            this._teams = features[4];
            this.teams_runners_up = features[1];
            this.teams_winners = features[2];
        }
        this.last_runner_drawn = " ";
    }
    set_teams(teams){
        self._teams = teams;
    }
    runners_up() {
        return this.teams_runners_up;
    }

    winners() {
        return this.teams_winners;
    }

    length() {
        return this._length;
    }

    teams() {
        return this._teams;
    }

    set_length(num) {
        this._length = num;
    }

    copy_graph() {
        // pour créer un autre graph avec les mÃªmes composants
        const matrix2 = this.matrix.map(line => line.slice());
        const runners_up2 = this.runners_up().slice();
        const winners2 = this.winners().slice();
        const length = this.length();
        const teams2 = this.teams().slice();
        const new_graph = new GraphBipartite([matrix2, runners_up2, winners2, length, teams2]);
        return new_graph;
    }

    add_team(team) {
        // pour mettre les équipes au début
        if (team.set() === "runner up") {
            this.teams_runners_up.push(team.name());
            for (let i = 0; i < this.winners().length; i++) {
                const winner = this.winners()[i];
                if (
                    this.teams()[this.index_teams(winner)].country() !== team.country() &&
                    this.teams()[this.index_teams(winner)].group() !== team.group()
                ) {
                    this.matrix[i].push(1);
                } else {
                    this.matrix[i].push(0);
                }
            }
        } else {
            this.teams_winners.push(team.name());
            this.matrix.push([]);
            for (let i = 0; i < this.runners_up().length; i++) {
                const runner = this.runners_up()[i];
                if (
                    this.teams()[this.index_teams(runner)].country() !== team.country() &&
                    this.teams()[this.index_teams(runner)].group() !== team.group()
                ) {
                    this.matrix[this.matrix.length - 1].push(1);
                } else {
                    this.matrix[this.matrix.length - 1].push(0);
                }
            }
        }
        this.set_length(this.length() + 1);
        this._teams.push(team);
    }

    index_teams(name) {
        for (let i = 0; i < this.teams().length; i++) {
            if (name === this.teams()[i].name()) {
                return i;
            }
        }
        console.log("error in index_teams");
    }


    index_runner(runner) {
        for (let k = 0; k < this.runners_up().length; k++) {
            if (this.runners_up()[k] === runner) {
                return k;
            }
        }
    }

    index_winner(winner) {
        for (let k = 0; k < this.winners().length; k++) {
            if (this.winners()[k] === winner) {
                return k;
            }
        }
    }

    index_name(name) {
        for (let k = 0; k < this.runners_up().length; k++) {
            if (this.runners_up()[k] === name) {
                return k;
            }
        }
        for (let k = 0; k < this.winners().length; k++) {
            if (this.winners()[k] === name) {
                return k;
            }
        }
    }

    remove_2t(i_0, j_0) {
        // enlever 2 clubs du graphe
        if (j_0 >= this.winners().length) {
            console.log("erreur dans remove_2t");
        }
        this.matrix.splice(j_0, 1);
        for (let k = 0; k < this.matrix.length; k++) {
            this.matrix[k].splice(i_0, 1);
        }
        this.teams_runners_up.splice(i_0, 1);
        this.teams_winners.splice(j_0, 1);
        this.set_length(this.length() - 2);
        this.last_runner_drawn = i_0;
    }

    sort_rows(matrix, permutation) {
        // tri les lignes en fonction du score de chacune
        let scores = [];
        let perm = [...permutation];
        for (let i = 0; i < matrix.length; i++) {
            // calcul du score pour chaque ligne et tri
            let sum = 0;
            for (let j = 0; j < matrix[0].length; j++) {
                sum += matrix[i][j] * Math.pow(2, j);
            }
            scores.push(sum);
            let currentElement = scores[i];
            let currentPerm = perm[i];
            let k = i - 1;
            while (k >= 0 && scores[k] > currentElement) {
                scores[k + 1] = scores[k];
                perm[k + 1] = perm[k];
                k -= 1;
            }
            scores[k + 1] = currentElement;
            perm[k + 1] = currentPerm;
        }

        let res = [];
        for (let i = 0; i < matrix.length; i++) {
            for (let k = 0; k < matrix.length; k++) {
                if (perm[i] === permutation[k]) {
                    res.push(matrix[k]);
                }
            }
        }

        // renvoie la matrice triÃ©e et les permutations
        return { matrix: res, permutation: perm };
    }

    sort_col(matrix, permutation) {
        // pareil avec les colonnes
        const scores = [];
        const perm = [...permutation];
        for (let j = 0; j < matrix[0].length; j++) {
            let sum = 0;
            for (let i = 0; i < matrix.length; i++) {
                sum += matrix[i][j] * Math.pow(2, i);
            }
            scores.push(sum);
            let currentElement = scores[j];
            let currentPerm = perm[j];
            let k = j - 1;
            while (k >= 0 && scores[k] > currentElement) {
                scores[k + 1] = scores[k];
                perm[k + 1] = perm[k];
                k -= 1;
            }
            scores[k + 1] = currentElement;
            perm[k + 1] = currentPerm;
        }


        const res = [];
        for (let i = 0; i < matrix.length; i++) {
            res.push([]);
        }

        for (let j = 0; j < perm.length; j++) {
            for (let k = 0; k < permutation.length; k++) {
                if (perm[j] === permutation[k]) {
                    for (let i = 0; i < res.length; i++) {
                        res[i].push(matrix[i][k]);
                    }
                }
            }
        }
        return { matrix: res, permutation: perm };
    }

    index_eq_runner(runner, permutationCols) {
        let trueInd = runner;
        let ind = runner;
        for (let i = 0; i < permutationCols.length; i++) {
            for (let j = 0; j < permutationCols[i].length; j++) {
                if (trueInd === permutationCols[i][j]) {
                    ind = j;
                }
            }
        }
        return ind;
    }

    index_eq_winner(winner, permutationRows) {
        let trueInd = winner;
        let ind = winner;
        for (let i = 0; i < permutationRows.length; i++) {
            for (let j = 0; j < permutationRows[i].length; j++) {
                if (trueInd === permutationRows[i][j]) {
                    ind = j;
                }
            }
        }
        return ind;
    }

    isom() {
        // calcule la matrice de l'isomorphisme
        // avec les fonctions de tri
        let permutationRows = [[...Array(this.matrix.length).keys()]];
        let permutationCols = [[...Array(this.matrix.length).keys()]];
        let end = false;
        let mat1 = this.matrix.map(row => [...row]);

        while (!end) {
            let rows = [...permutationRows[permutationRows.length - 1]];
            let cols = [...permutationCols[permutationCols.length - 1]];
            let { matrix: mat2, permutation: permRows } = this.sort_rows(mat1, permutationRows[permutationRows.length - 1]);
            let { matrix: mat3, permutation: permCols } = this.sort_col(mat2, permutationCols[permutationCols.length - 1]);

            permutationRows.push(permRows);
            permutationCols.push(permCols);

            mat1 = mat3.map(row => [...row]);

            end = true;

            for (let i = 0; i < rows.length; i++) {
                if (rows[i] !== permutationRows[permutationRows.length - 1][i]) {
                    end = false;
                }
            }

            for (let i = 0; i < cols.length; i++) {
                if (cols[i] !== permutationCols[permutationCols.length - 1][i]) {
                    end = false;
                }
            }
        }

        // renvoie la matrice et toutes les permutations
        let binaryString = '';
        for (let row of mat1) {
            for (let element of row) {
                binaryString += element.toString();
            }
        }
        let q;
        if(binaryString.length<=32){
            q=String(parseInt(binaryString,2))
        }else{
            q="("+String(parseInt(binaryString.slice(0,32),2))+", "+String(parseInt(binaryString.slice(32,binaryString.length),2))+")"
        }
        return {'q': q, "permCol":permutationRows, "permRow":permutationCols };
    }

    mat(data) {
        const { q, permutationRows, permutationCols } = this.isom();
        const table = [];

        for (let i = 0; i < this.winners().length + 1; i++) {
            table.push([]);
        }

        table[0].push(" ");

        for (let line = 1; line < this.winners().length + 1; line++) {
            table[line].push(this.winners()[line - 1]);
        }

        for (let col = 1; col < this.runners_up().length + 1; col++) {
            table[0].push(this.runners_up()[col - 1]);
        }

        const key1 = `${q}`;
        const runners = this.runners_up();
        const winners = this.winners();

        for (let i = 0; i < winners.length; i++) {
            for (let j = 0; j < runners.length; j++) {
                const runner = this.index_eq_runner(i, permutationCols);
                const winner = this.index_eq_winner(j, permutationRows);
                const draw = this.index_eq_runner(this.last_runner_drawn, permutationCols);

                if (this.length() % 2 === 0) {
                    const key2 = `${runner}, ${winner}`;
                    if (key1 in data && key2 in data[key1]) {
                        table[j + 1].push(data[key1][key2]);
                    } else {
                        console.log(`not, ${key1}, ${key2}`);
                    }
                } else {
                    const key2 = `${runner}, ${winner}, ${draw}`;
                    if (key1 in data && key2 in data[key1]) {
                        table[j + 1].push(data[key1][key2]);
                    }
                }
            }
        }
        const matrix = table.map(row => row.map(element => element));
        return matrix;
    }
}

// le binaire doit être en format string
function binaire_to_deci(binaire){
    let deci = 0;
    let puissance = 0
    let digit;
    for(let i=0;i<binaire.length;i++){
        digit = binaire[i]
        puissance = 2**(binaire.length-i-1)
        deci += parseInt(digit)*puissance
    }
    return deci
}

G_init = new GraphBipartite([])
team_1 = new Team("Napoli", "it", "A", "winner");
team_2 = new Team("Liverpool", "en", "A", "runner up");
team_3 = new Team("Porto", "pt", "B", "winner");
team_4 = new Team("Brugge", "be", "B", "runner up");
team_5 = new Team("Bayern", "de", "C", "winner");
team_6 = new Team("Inter", "it", "C", "runner up");
team_7 = new Team("Tottenham", "en", "D", "winner");
team_8 = new Team("Frankfurt", "de", "D", "runner up");
team_9 = new Team("Chelsea", "en", "E", "winner");
team_10 = new Team("AC Milan", "it", "E", "runner up");
team_11 = new Team("Real Madrid", "es", "F", "winner");
team_12 = new Team("Leipzig", "de", "F", "runner up");
team_13 = new Team("Manchester City", "en", "G", "winner");
team_14 = new Team("Dortmund", "de", "G", "runner up");
team_15 = new Team("Benfica", "pt", "H", "winner");
team_16 = new Team("PSG", "fr", "H", "runner up");

teams = [];

teams.push(team_1);
teams.push(team_2);
teams.push(team_3);
teams.push(team_4);
teams.push(team_5);
teams.push(team_6);
teams.push(team_7);
teams.push(team_8);
teams.push(team_9);
teams.push(team_10);
teams.push(team_11);
teams.push(team_12);
teams.push(team_13);
teams.push(team_14);
teams.push(team_15);
teams.push(team_16);

teams.forEach(element => {
    G_init.add_team(element)
});

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
let Winners = ["Napoli", "Porto", "Bayern", "Tottenham", "Chelsea", "Real_Madrid", "Manchester_City", "Benfica"];
let Runners_up = ["Liverpool", "Brugge", "Inter", "Frankfurt", "AC_Milan", "Leipzig", "Dortmund", "PSG"]
// Liste des équipes comme elles sont écrites dans le fichier resultat.json
let runners_resultat = ['Liverpool', 'Brugge', 'Inter', 'Frankfurt', 'AC Milan', 'Leipzig', 'Dortmund', 'PSG']
let winners_resultat = ['Napoli', 'Porto', 'Bayern', 'Tottenham', 'Chelsea', 'Real Madrid', 'Manchester City', 'Benfica']
let affichage_winners = false  // pour savoir quel type de boutons est affiché
let affichage_heatmap = false

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
            if(number===0){ // on grise la cellule si la valeur est 0
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
        cell.style.backgroundColor = "#75ACDA"//"#50f3db"
        //cell.textContent= "Match"
        cell.textContent = "✔️"
    }
}
// Quand un match est décidé il n'y a plus de probas pour les équipes dans ce match, il y a donc des erreurs
// et cela affiche des Nan, donc s'il y a un match par les probas 0
// On rajoute un truc pour mettre en valeur quand il ya un match sur: 100%
function fill_Nan(){
    for(let i=0;i<Winners.length;i++) {
        for (let j = 0; j < Runners_up.length; j++) {
            let id = Runners_up[i] + " " + Winners[j]
            let cell = document.getElementById(id)
            let number = parseFloat(cell.textContent.slice(0, -1))
            if(number===100){
                cell.style.backgroundColor = "#FFFB00"
            }
        }
    }
    if(chosen_team.length%2===1){
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
                        element.textContent = "-"
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
                    element.textContent = "-"
                }else{
                    element.style.backgroundColor = "transparent"
                }
                i++
            })
        }
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
    }
    fill_Nan()
}

// test reini graphiquement le tableau
function without_graphism(){
    for(let i=0;i<Winners.length;i++) {
        for (let j = 0; j < Runners_up.length; j++) {
            let id = Runners_up[i] + " " + Winners[j]
            let cell = document.getElementById(id)
            cell.style.backgroundColor = "transparent"
            cell.style.color = "black"
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

function heatmap(){
    without_graphism()
    fill_Nan()
    console.log("on est dans la fonction heatmap")
    let team_cells = document.querySelectorAll(".cell-team")
    team_cells.forEach(function(cell){
        cell.style.backgroundColor = "transparent"
    })
    for(let i=0;i<Winners.length;i++) {
        for (let j = 0; j < Runners_up.length; j++) {
            let id = Runners_up[i] + " " + Winners[j]
            let cell = document.getElementById(id)
            let number = 100-parseFloat(cell.textContent.slice(0, -1))
            let couleur = "hsl(0,100%,"+String(number)+"%)"
            cell.style.background = couleur
            if(100-number>33){
                cell.style.color="white"
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
        cell.style.backgroundColor = "#75ACDA"//"#50f3db"
        //cell.textContent= "Match"
        cell.textContent = "✔️"
    }
    if(chosen_team.length%2===1){
        let last_team = chosen_team[chosen_team.length-1].textContent
        let line = document.getElementById(changeSpaceby_(last_team))
        line.style.border = "2px solid #fd5007"
        line.style.boxSizing = 'border-box'
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
        //change_all()
        //fill_all()
        fill_all2()
    }
    // Ajoute la liste des matchs en fonction des clics de l'utilisateur
    let number = chosen_team.length
    let i = 1+(-1)**(number%2)
    let j = Math.floor((number-1)/2)
    let cell = document.getElementById(String(j)+"_"+String(i))
    cell.textContent=bouton.textContent
    if(affichage_heatmap){
        heatmap()
    }else{
        change_graphism()
        verif_zero()
    }
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
    if (chosen_team.length !== 0) {
        let last_team_chosen = chosen_team.pop()
        console.log("équipe qu'on undo: ",last_team_chosen.textContent)
        G_init.matrix = []
        G_init.set_length(0)
        G_init.set_teams([])
        G_init.teams_winners = []
        G_init.teams_runners_up = []
        teams.forEach(element => {
            G_init.add_team(element)
        });
        if(chosen_team.length%2===0){
            for(let i = 0; i < Math.floor(chosen_team.length / 2)-1; i++) {
            console.log(i)
            console.log(Math.floor(chosen_team.length/2))
            console.log("equipe qu'on enlève dans le if: ", chosen_team[2*i],";",chosen_team[2*i+1])
            G_init.remove_2t(G_init.index_name(chosen_team[2 * i].textContent), G_init.index_name(chosen_team[2 * i + 1].textContent))
            }
        }else{
            for(let i = 0; i < Math.floor(chosen_team.length / 2); i++) {
                console.log(i)
                console.log(Math.floor(chosen_team.length / 2))
                console.log("equipe qu'on enlève dans le else: ", chosen_team[2 * i], ";", chosen_team[2 * i + 1])
                G_init.remove_2t(G_init.index_name(chosen_team[2 * i].textContent), G_init.index_name(chosen_team[2 * i + 1].textContent))
            }
        }
        let selecteur = "." + changeSpaceby_(last_team_chosen.textContent)
        let colorChange = document.querySelectorAll(selecteur)
        // Pour enlever le surlignage
        colorChange.forEach(function (element) {
            let chosen_team_text = []
            chosen_team.forEach(function (button) {
                chosen_team_text.push(changeSpaceby_(button.textContent))
            })
            if (element.classList.length === 3) {
                let team_test = "defaut"
                if (element.classList[1] === last_team_chosen.textContent) {
                    team_test = element.classList[2]
                } else {
                    team_test = element.classList[1]
                }
                if (!(chosen_team_text.includes(team_test))) {
                    element.style.backgroundColor = "transparent"
                }
            } else if (element.classList.length === 2) {
                element.style.backgroundColor = "transparent"
            }
        })
        //last_team_chosen.style.display = "block"    // on affiche de nouveau l'équipe
        if (affichage_winners) {
            boutons_runner.push(last_team_chosen)   // on la remet dans la liste des boutons affichés correspondante
        } else {
            boutons_winners.push(last_team_chosen)
        }
        affichage_winners = !affichage_winners      // on rebascule sur l'affichage des autres teams
        boutons_winners.forEach(function (bouton) {   // on change les modes d'affichage des boutons
            if (affichage_winners) {
                // il faut que je rajoute une condition ici
                // test si (proba(chosen_team[last],bouton) !== 0): on affiche le bouton sinon on le fait
                let runner = chosen_team[chosen_team.length - 1].textContent
                let id = changeSpaceby_(runner) + " " + changeSpaceby_(bouton.textContent)
                let cell = document.getElementById(id)
                //console.log(cell.id)
                let index = remove_from_list()
                //console.log(index)
                let index2 = give_index2(changeSpaceby_(bouton.textContent), changeSpaceby_(runner))
                //console.log(index2)
                if (cell) {
                    let nombre = Number(cell.textContent.slice(0, -1));// = resultat[index][index2]
                    if (nombre !== 0) {
                        bouton.style.display = "block"
                    }
                } else {
                    console.log("la cellule n'existe pas")
                }
            } else {
                disappear_bouton(bouton)
            }
        })
        boutons_runner.forEach(function (bouton) {
            if (!affichage_winners) {
                bouton.style.display = "block"
            } else {
                disappear_bouton(bouton)
            }
        })
        let number = chosen_team.length + 1     // On enlève les équipes du tableau
        let i = 1 + (-1) ** (number % 2)
        let j = Math.floor((number - 1) / 2)
        let cell = document.getElementById(String(j) + "_" + String(i))
        cell.textContent = default_cell_match
        //change_all()
        //fill_all()
        fill_all2()
        if (affichage_heatmap) {
            heatmap()
        } else {
            change_graphism()
            verif_zero()
        }
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

let heatmap_button = document.createElement("button")
heatmap_button.id="heatmap-button"
heatmap_button.textContent="Heatmap"
optionsButtonContainer.appendChild(heatmap_button)
heatmap_button.addEventListener("click",function(){
    if(!affichage_heatmap){
        heatmap()
        affichage_heatmap=!affichage_heatmap
    }
    else{
        change_graphism()
        verif_zero()
        affichage_heatmap=!affichage_heatmap
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
            cell.textContent = "..."
            // code pour l'id des cellules de proba: runners_up en premier, puis winner séparé par un espace
            cell.id =  Runners_up[i]+" "+ Winners[j-1]
            cell.className = "proba-cell " + Winners[j-1] +" "+ Runners_up[i] // ajoute une classe pour que la cellule s'illumine quand équipe sélectionnée
            //change_proba(cell,"('Liverpool', 'Brugge', 'Inter', 'Frankfurt', 'AC Milan', 'Leipzig', 'Dortmund', 'PSG'), ('Napoli', 'Porto', 'Bayern', 'Tottenham', 'Chelsea', 'Real Madrid', 'Manchester City', 'Benfica')",change_bySpace(Runners_up[i])+", "+change_bySpace(Winners[j-1]))
            line.appendChild(cell)
        }
    }
    line.className = "proba-line"
    table.appendChild(line)
}
//fill_all()
fill_all2()
verif_zero()

