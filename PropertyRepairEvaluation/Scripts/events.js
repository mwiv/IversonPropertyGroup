//ADD LISTNERS FOR CHECK BOXES
function checkListeners(key){
    //        console.log(key);
    var inputs = document.getElementsByName(key + "-repair-deg");
    //    console.log(inputs);

    for(var j = 0; j < inputs.length; j++) {
        //        console.log(inputs[j]);
        var input = inputs[j];

        input.onchange = function(e) {
            //            console.log(this.value);
            //            console.log(this.type);
            //HORIZANTAL
            if((this.type == "checkbox" && this.checked) || (this.type == "tel" && this.value != null)) { //OIF THIS INPUT IS CHECKED OR HAS A VALUE
//                console.log(key + " " + this.value);
                //REMOVE NON INTEGER NUMBERS
                if(this.type == "tel") {
                    this.value = this.value.replace(/\D/g,'');
                }
                //UNCHECK OR EMPTY OTHER INPUTS
                for(var k = 0; k < inputs.length; k++) {
                    if(inputs[k].value != this.value){
                        if(inputs[k].type == "checkbox")  {  
                            inputs[k].checked = false;
                        }
                        else inputs[k].value = null;
                    }
                }

                //CHANGE VALUE IN TOTAL COLUMN
                var total_output = document.getElementById(key + "-repair-cost");
                total_output.innerHTML = "$" + getRepairValue(key, this.value);
                if(this.className.indexOf("-child-input") >= 0) {
                    var parent_total_id = this.className.substring(0, this.className.indexOf("-")) + "-repair-cost";
                    document.getElementById(parent_total_id).innerHTML = "$0";
                }

                calcTotal(false);
            }
            else {
//                console.log(key);
                var total_output = document.getElementById(key + "-repair-cost");
                total_output.innerHTML = "$0";
                calcTotal(false);
            }

            //VERTICAL - CHILD

            if(this.className == null || this.className.indexOf("-child-input") < 0) {
                var child_class_name = this.name.substring(0, this.name.indexOf("-")) + "-child-input";
                var child_inputs = document.getElementsByClassName(child_class_name);
                //                console.log(this);
                //IF PARENT CHECKED
                if(this.checked){
                    //                    console.log("checked");

                    Array.prototype.forEach.call(child_inputs, function(item, index) {

                        item.checked = (item.type == "checkbox" && item.checked)? false:false;
                        item.value = (item.type == "tel" && item.value != null) ? null:null;
                        item.disabled = true;
                        

                        var total_output = document.getElementById(item.name.replaceAll("deg", "cost"));
                        total_output.innerHTML = "$0";
                    });
                }
                else {
                    var checkbox_count = 0;
                    Array.prototype.forEach.call(child_inputs, function(item, index) {
                        //RESTORE CHECKBOX VALUE
                        if(item.type == "checkbox") {
                            item.value = (checkbox_count % 2 == 0)? "none": "full";
                            checkbox_count++;
                        }
                        item.disabled = false;
                    });
                }
            }
        }

    }}

//TELL IF EVALUATION IS COMPLETE
function evalComplete(){
    var totalCells = document.getElementsByClassName("repair-cost");
    for(var i = 0; i < totalCells.length; i++) {
        if(totalCells[i].innerHTML == "$") return false;
    }
    var propertyDetails = document.getElementsByClassName("property-details");
    for(var i = 0; i < propertyDetails.length; i++) {
        if(propertyDetails[i].id == "investor" && propertyDetails[i].value == "") return false;
        else if(propertyDetails[i].id == "address" && propertyDetails[i].value == "") return false;
    }
    return true;
}
