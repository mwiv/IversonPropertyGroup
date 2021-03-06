//*********************************************************LOAD SCRIPTS********************************************************************************
var scripts = [new Script("../CommonScripts/Repair.js", null),
               new Script("../CommonScripts/Tooltip.js", 
                          function() {
                   addTooltipStyles(); 
                   tooltipEvents("submit-but", "submit-tooltip", 
                                 function() {return getRepairArray().length <= 0}, 
                                 function() {return getRepairArray().length > 0},
                                 function() {showVerificationPopup();});}),

               new Script("Scripts/events.js", function() {allEvents();}), 
               new Script("Scripts/scripts.js", function() {window.onmessage = function(e) {switch(e.data) {case "hide": hideVerificationPopup();}}
                                                           })];

window.onload = function(){
    addScripts();
}

//ADD ALL SCRIPTS FROM ARRAY
function addScripts() {
    for(var i = 0; i < scripts.length; i++) {
        var script = document.createElement("script"); 
        //        script.src = path + scripts[i].URL; 
        script.src = scripts[i].URL;
        script.onload = scripts[i].onload;

        document.head.appendChild(script);
    }
}

//SCRIPT OBJECT
function Script(URL, onload){
    this.URL = URL;
    this.onload = onload;
}
