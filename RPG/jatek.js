  
let stats = {
    "life": 100,
    "ninjutsu": 5,
    "genjutsu": 0,
    "taijutsu": 10,
    "fuinjutsu": 0 
}

let available_points = 0;

let lvl = 0;

let lvl_description = [
    ["Akademista vagy!", "profile_lvl0.jpg"],
    ["Genin vagy!","profile_lvl1.jpg"],
    ["Chunin vagy!","profile_lvl2.jpg"],
    ["Jounin vagy!", "profile_lvl3.jpg"],
    ["Te vagy a Hokage!", "profile_lvl4.jpg"],
];

let profile_stats = {
    "pics": document.getElementById("profile_pics"),
    "description": document.getElementById("description"),
    "life": document.getElementById("profile_life"),
    "ninjutsu": document.getElementById("profile_ninjutsu"),
    "genjutsu": document.getElementById("profile_genjutsu"),
    "taijutsu": document.getElementById("profile_taijutsu"),
    "fuinjutsu": document.getElementById("profile_fuinjutsu"),
    "next_level": document.getElementById("next_lvl")
}

function refreshProfileStats(){
    profile_stats.pics.src = "pics/"+lvl_description[lvl][1]
    profile_stats.life.innerHTML = stats.life;
    profile_stats.ninjutsu.innerHTML = stats.ninjutsu;
    profile_stats.genjutsu.innerHTML = stats.genjutsu;
    profile_stats.taijutsu.innerHTML = stats.taijutsu;
    profile_stats.fuinjutsu.innerHTML = stats.fuinjutsu;
    profile_stats.description.innerHTML = lvl_description[lvl][0]
    profile_stats.next_level.innerHTML = 2;
    display_addBtns();
}

refreshProfileStats();

function update_ninjutsu(){
    if(available_points > 0){
        available_points--;
        stats.ninjutsu += 5;
        refreshProfileStats();
    }
}
function update_genjutsu(){
    if(available_points > 0){
        available_points--;
        stats.genjutsu += 5;
        refreshProfileStats();
    }
}
function update_taijutsu(){
    if(available_points > 0){
        available_points--;
        stats.taijutsu += 5;
        refreshProfileStats();
    }
}
function update_fuinjutsu(){
    if(available_points > 0){
        available_points--;
        stats.fuinjutsu += 5;
        refreshProfileStats();
    }
}

function display_addBtns(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function lvl_up(){
    if(lvl < lvl_description.length - 1){
        available_points += 5;
        lvl++;
        refreshProfileStats();
    }
}


let story = document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function kuldetes(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.taijutsu;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
        fight("Ninja", 5, 100);
        refreshProfileStats();
    }else{
        story.innerHTML += "Tapasztalatot szerezt??l! (+1)<br>";
        stats.fuinjutsu += 1;
        
    }
}

function fight(e_name, e_damage, e_life){
    story.innerHTML += "K??ldet??s sor??n megt??madott t??ged egy " + e_name + "!<br>";

    let counter = 0;
    let enemy_attack = true;

    do {
        counter++;
        if(enemy_attack){
            // ellenf??l t??mad
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 - stats.taijutsu;
            if(sebzes_eselye <= 0) sebzes_eselye = 1;

            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Ellenfeled r??d ront! (-  " +e_damage+" ??let)<br>";
                stats.life -= e_damage;
                refreshProfileStats();
            }else{
                story.innerHTML += "Sikeresen kiv??dted az ellenfeled t??mad??s??t!<br>";
            }
            
        }else{
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 + stats.genjutsu;
            if(sebzes_eselye >= 100) sebzes_eselye = 99;
            if(szazalek >= sebzes_eselye){
                story.innerHTML += "Megt??madtad ellenfeled! ("+e_name+" -"+stats.ninjutsu+" ??let)<br>";
                e_life -= stats.ninjutsu;
                story.innerHTML += e_name + "-nek " + e_life + " ??lete maradt!";
                refreshProfileStats();
            }else{
                story.innerHTML += "Ellenfeled sikeresen kiv??dte a csap??sodat!<br>";
            }
        }

        enemy_attack = !enemy_attack;
        
    } while (counter <=  10);
}