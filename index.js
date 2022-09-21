





/*puissance 4*/
var icon = ["😕","🙄","😯","😮","😲","☹","😠","😤","😡","🤬","🤯","😪","😥","🥱","😫","😝","😜","☹","😭","😢","🤪","😳","😵","👀","🙀","😿","🥺","😷","😈","👿","👹","👺","🥶","🥵","😜"];
var icon_next = 0;
var table=document.querySelectorAll(".circle");
var choose=document.querySelectorAll(".choose");
var tab = [];
var ColoneIndice = [];
var curentValue = "rouge";
var initialValue = "vide";
var gagne = false;
var couleurGagnant;
onload=help;
function help(){
    document.querySelector(".howToPlay").style.display = "block";
    document.querySelector(".howToPlay").style.animation = "descend 1s forwards"    
}
//-----------------------------Les Fonctions--------------------------------------------------
function getColoneIndice(){
    for(var i=0 ; i<6 ; i++){
        for(var j=i ; j<=35 ; j+=6){
            ColoneIndice[j]=i+1;
        }
    }
}
getColoneIndice();
function verifierSiGagne(){
    //verifier dans toutes les positions
    for(var i=36 ; i>=0; i--){
        //horizontale
        if((ColoneIndice[i]>=4)&&(tab[i]!="vide")){
            var count=0;
            for(var j=i;j>i-4;j--){
                if(tab[j]==tab[i])count++;
                else break;
                if(count>=4){
                    gagne=true;
                    couleurGagnant=tab[i];
                    break;
                }
            }
        }
        //verticale
        if((i<17)&&(tab[i]!="vide")){
            var count=0;
            for(var j=i;j<i+(6*4);j+=6){
                if(tab[i]===tab[j])count++;
                else break;
                if(count>=4){
                    gagne=true;
                    couleurGagnant=tab[i];
                    break;
                }
            }
        }
        //croise de la forme '/'
        if((ColoneIndice[i]>=4)&&(tab[i]!="vide")){
            var count=0;
            for(var j=i;j<i+(5*4);j+=5){
                if(tab[i]===tab[j])count++;
                else break;
                if(count>=4){
                    gagne=true;
                    couleurGagnant=tab[i];
                    break;
                }
            }
        }
        //croise de la forme '\'
        if((ColoneIndice[i]<=3)&&(tab[i]!="vide")){
            var count=0;
            for(var j=i;j<i+(7*4);j+=7){
                if(tab[i]===tab[j])count++;
                else break;
                if(count>=4){
                    gagne=true;
                    couleurGagnant=tab[i];
                    break;
                }
            }
        }
    }
    //action a faire si gagne
    if(gagne){
        document.querySelector(".gagne").style.animation = "descend 2s forwards";
        document.querySelector("p.textGangant span").innerHTML = couleurGagnant;

        if(couleurGagnant=="rouge")document.querySelector(".couleurGagnant").style.backgroundColor = "red";
        else document.querySelector(".couleurGagnant").style.backgroundColor = "yellow";
        
        document.querySelector(".restartGame").addEventListener("click",()=>{
            initialise();affiche();
            document.querySelector(".gagne").style.animation = "monte .5s forwards";
        });
        
        document.querySelector(".quit").addEventListener("click",()=>{
            started=false;
            document.querySelector(".reset").style.opacity = ".5";
            initialise();affiche();
            document.querySelector(".gagne").style.animation = "monte .5s forwards";
        });
        
        document.querySelector(".continue").addEventListener("click",()=>{
            document.querySelector(".gagne").style.animation = "monte .5s forwards";
        });
    }
}
function verifierSiPlein(){
    count=0;
    for(var i=0 ; i<36 ; i++){
        if(tab[i]!="vide"){
            count++;
        }else break;
    }
    if(count==36){
        document.querySelector(".plein").style.animation = "descend 1s forwards"
    }
}
function affiche(){
    for(var i=0 ; i<36 ; i++){
        if(tab[i]==="rouge"){
            table[i].style.backgroundColor = "red";
        }else if(tab[i]==="jaune"){
            table[i].style.backgroundColor = "yellow";
        }else if(tab[i]==="vide"){
            table[i].style.backgroundColor = "white";
        }else{
            alert("couleur inconnus!!!");
        }
    }   
}
function initialise(){
    for(var i=0 ; i<36 ; i++){
        tab[i]=initialValue;
    }
    gagne=false;
    couleurGagnant="";
}
function jouer(){
    choose.forEach((element,indice) => {
        element.onclick = function(){
           //-------------------------------------JOUE------------------------------------------
            for(var i=36 ; i>=0; i--){
                if((ColoneIndice[i]==indice+1)&&(!gagne)&&(started)){
                    if(tab[i]=="vide"){
                        tab[i]=curentValue;
                        curentValue=(curentValue==="rouge")?"jaune":"rouge"
                        break;
                    }
                }
            }
            affiche();
            //---------------------------------VERIFIER SI GAGNE OU PLEIN---------------------------------
            verifierSiGagne();
            verifierSiPlein();
        }
    });
}
initialise();
affiche();
//-----------------------------Les Fonctions--------------------------------------------------

//--------------------------------gestion des menus du bas--------------------------------
            //----------------------CHOISIR SANS DEMARRER---------------------------------
            choose.forEach((element,indice) => {
                element.addEventListener('click',()=>{
                    if((!started)){
                        document.querySelector(".error .icon").innerHTML = icon[icon_next];
                        document.querySelector(".error").style.animation = "descend 1s forwards"
                        icon_next++;
                        if(icon_next==icon.length)icon_next=0;
                    }
                    affiche();
                });
            });
            //----------------------CHOISIR SANS DEMARRER---------------------------------
var started = false;
document.querySelector(".reset").style.opacity = ".5";
document.querySelector(".reset").addEventListener("click",()=>{
    if(started===true){   
        initialise();affiche();
    }
});
document.querySelector(".start").addEventListener("click",()=>{
    started=true;
    document.querySelector(".reset").style.opacity = "1";
    jouer();
});
document.querySelector(".leave").addEventListener("click",()=>{
    started=false;
    document.querySelector(".reset").style.opacity = ".5";
    initialise();affiche();
});
document.querySelector(".help").addEventListener("click",()=>{
    document.querySelector(".howToPlay").style.display = "block";
    document.querySelector(".howToPlay").style.animation = "descend 1s forwards"
});
//-----------------------------gestion des menus du bas--------------------------------