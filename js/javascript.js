/*
    Tere Kwong
    11/22/2021

    javascript for the index.html

    Sources referenced: w3schools

*/



function createTable() {
    //gets the values from the form and sets them to variables
    var x = document.getElementById("frm1");
    var scol = parseInt(x.elements[0].value);
    var lcol = parseInt(x.elements[1].value);
    var srow = parseInt(x.elements[2].value);
    var lrow = parseInt(x.elements[3].value);

    /*var scol = x.elements[0].value;
    var lcol = x.elements[1].value;
    var srow = x.elements[2].value;
    var lrow = x.elements[3].value;*/
/*
    if ((scol < -50 || scol > 50) || (lcol < -50 || lcol > 50) || (srow < -50 || srow > 50) || (lrow < -50 || lrow > 50)){
        document.getElementById("error").innerHTML = "Invalid Inputs. -50 <= Value <= 50";
        return;
    }
    else if (scol == "" || lcol == "" || srow == "" || lrow == ""){
        document.getElementById("error").innerHTML = "Invalid Input. Can't be empty";
        return;
    }
*/
    //creates empty table to reset each time
    var table = document.createElement("table");
    var div1 = document.getElementById("div1");
    div1.innerHTML ="";

    //condition to generate a table
    //if (((scol >= -50 && scol <= 50) && (lcol >= -50 && lcol <= 50) && (srow >= -50 && srow <= 50) && (lrow >= -50 && lrow <= 50)) && (scol != "" && lcol != "" && srow != "" && lrow != "") && ((scol <= lcol) && (srow <= lrow))) {
        document.getElementById("error").innerHTML = "";
        var table = document.createElement("table");
        /*table.border = 1;*/

        var columnCount = lcol - scol;
        
        var row = table.insertRow(-1);
        /*
        var emptyCell = document.createElement("th");
        row.appendChild(emptyCell);
        */
        var cell = row.insertCell(-1);
        cell.innerHTML = "";
        
        //creates the first row of headers
        for (var i = scol; i <= lcol; i++){
            var headerCell = document.createElement("th");
            headerCell.innerHTML = i;
            row.appendChild(headerCell);
        }

        //creates the first row cell and fills the row with values
        for (var j = srow; j <= lrow; j++){
            row = table.insertRow(-1);
            var headerCell = document.createElement("th");
            headerCell.innerHTML = j;
            row.appendChild(headerCell);
           /*
            var cell = row.insertCell(-1);
            cell.innerHTML = j;
            */
            for (var k = scol; k <= lcol; k++){
                var cell = row.insertCell(-1);
                cell.innerHTML = j * k;
            }
        }

        //appends the table to the HTML
        var div1 = document.getElementById("div1");
        div1.innerHTML ="";
        div1.appendChild(table);
        return document.getElementById("div1").innerHTML;
    //}else {

        //error code that is displayed if condition is not met
        //document.getElementById("error").innerHTML = "Invalid Inputs";
        /*var table = document.createElement("table");
        var div1 = document.getElementById("div1");
        div1.innerHTML ="";
        */
    }
//}
//Functions for jquery validation
//validation for max row vs min row
$().ready(function() {
    $.validator.addMethod("rowMaxValid", function (value, param) {
        if (parseInt($("#lrow").val()) < parseInt($("#srow").val())) {
            return false;
        }
        else {
            return true;
        }
    });
//validation for max col vs min col
    $.validator.addMethod("colMaxValid", function (value, param) {
        if (parseInt($("#lcol").val()) < parseInt($("#scol").val())) {
            return false;
        }
        else {
            return true;
        }
    });
 //validation for decimals
    $.validator.addMethod("noDecimal", function (value, element) {
        return !(value % 1);
    }, "No decimal numbers");

    $("#frm1").validate({
        errorPlacement: function(error, element) {
			// Append error within linked label
			$( element )
				.closest( "form" )
					.find( "label[for='" + element.attr( "id" ) + "']" )
						.append( error );
		},
        errorElement: "span",
//rules for validation
        rules: {
            scol: {
                required: true,
                number: true,
                noDecimal: true,
                min: -50,
                max: 50
            },
            lcol: {
                required: true,
                number: true,
                noDecimal: true,
                min: -50,
                max: 50,
                colMaxValid: "#scol"
            },
            srow: {
                required: true,
                number: true,
                noDecimal: true,
                min: -50,
                max: 50
            },
            lrow: {
                required: true,
                number: true,
                noDecimal: true,
                min: -50,
                max: 50,
                rowMaxValid: "#srow"
            }
        },
        messages: {
            lrow: {
                rowMaxValid: "Largest row can not be less than smallest row"
            },
            lcol: {
                colMaxValid: "Largest column can not be less than smallest column"
            }
        }
    })
});
//jquery slider functions
$(function() {
    $("#scolslider").slider({
        min: -50,
        max: 50,
        range: [-50, 50],
        value: 0,
        slide: function(event, ui){
            $("#scol").val(ui.value);
            if( $("#frm1").valid()) {
                createTable();
            }
        }
    });
    $("#scol").val($("#scolslider").slider("value"));
});

$(function() {
    $("#lcolslider").slider({
        min: -50,
        max: 50,
        range: [-50, 50],
        value: 0,
        slide: function(event, ui){
            $("#lcol").val(ui.value);
            if( $("#frm1").valid()) {
                createTable();
            }
        }
    });
    $("#lcol").val($("#lcolslider").slider("value"));
});

$(function() {
    $("#srowslider").slider({
        min: -50,
        max: 50,
        range: [-50, 50],
        value: 0,
        slide: function(event, ui){
            $("#srow").val(ui.value);
            if( $("#frm1").valid()) {
                createTable();
            }
        }
    });
    $("#srow").val($("#srowslider").slider("value"));
});

$(function() {
    $("#lrowslider").slider({
        min: -50,
        max: 50,
        range: [-50, 50],
        value: 0,
        slide: function(event, ui){
            $("#lrow").val(ui.value);
            if( $("#frm1").valid()) {
                createTable();
            }
        }
    });
    $("#lrow").val($("#lrowslider").slider("value"));
});

//checks for validation when number is changed in form and changes slider to number in form
$("#scol").change(function () {
    var value = this.value;
    $("#scolslider").slider("value", parseInt(value));
    if( $("#frm1").valid()) {
        createTable();
    }
});

$("#lcol").change(function () {
    var value = this.value;
    $("#lcolslider").slider("value", parseInt(value));
    if( $("#frm1").valid()) {
        createTable();
    }
});

$("#srow").change(function () {
    var value = this.value;
    $("#srowslider").slider("value", parseInt(value));
    if( $("#frm1").valid()) {
        createTable();
    }
});

$("#lrow").change(function () {
    var value = this.value;
    $("#lrowslider").slider("value", parseInt(value));
    if( $("#frm1").valid()) {
        createTable();
    }
});

$(function () {
    $("#tabs").tabs();
});
//function to create Tab
function createTab() {
    if ( $("#frm1").valid()) {
        var x = document.getElementById("frm1");
        var scol = x.elements[0].value;
        var lcol = x.elements[1].value;
        var srow = x.elements[2].value;
        var lrow = x.elements[3].value;
        var count = $("#tabs li").length + 1;
        var list = `<li><input type="checkbox"><a href='#tab${count}'</a>Rows: ${srow} to ${lrow} <br> Columns: ${scol} to ${lcol}<br><br><span class='ui-icon ui-icon-close'role='presentation'>Remove Tab</span></li>`;
        $("div#tabs ul").append(list);
        $("div#tabs").append('<div id="tab' + count + '">' + "<table>" + createTable() + "</table>" + '</div>');
        $("#tabs").tabs("refresh");
        $("#tabs").tabs("option", "active", -1);
    }
    //allows to remove individual tabs
    $("#tabs").delegate("span.ui-icon-close", "click", function () {
        var panelID = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelID).remove();
        $("#tabs").tabs("refresh");
    });
}

//function to delete all tabs
function deleteTabs() {
    $("#tabs ul li").each(function () {
        var panelID = $(this).attr("aria-controls");
        console.log(panelID);
        console.log($(this).attr("tabCheckBox"));
        $(this).remove()
        $("#" + panelID).remove();
        $("#tabs").tabs("refresh");
    });
}

//function to delete selected tabs
function deleteSelectTab() {
    $("#tabs ul li").each(function () {
        var panelID = $(this).attr("aria-controls");
        console.log(panelID);
        console.log($(this).attr("tabCheckBox"));
        if ($(this).find('input').prop("checked")) {
            $(this).remove()
            $("#" + panelID).remove();
            $("#tabs").tabs("refresh");
        }
    });
}