function func_date_time(idString) {
    let dt = new Date();
    let hour = dt.getHours().toString();
    let min = dt.getMinutes().toString();
    console.log(hour.length);
    let time = "";
    if(hour.length === 1){
        time = "0" + hour + ":" + min;
    }
    else if(min.length === 1){
        time = hour + ":" + "0" + min;
    }
    else{
        time = hour + ":" + min;
    }
    if(hour.length === 1 && min.length === 1){
        time = "0" + hour + ":" + "0" + min;
    }
    let ye = new Intl.DateTimeFormat('de', {year: 'numeric'}).format(dt);
    let mo = new Intl.DateTimeFormat('de', {month: '2-digit'}).format(dt);
    let da = new Intl.DateTimeFormat('de', {day: '2-digit'}).format(dt);
    let date_time = `${ye}-${mo}-${da}T${time}`; //current Time/Date
    console.log("Current Time:" + date_time);

    document.getElementById('inputDateVon').min = date_time;
}

function opacity_change(idString){
    if(document.getElementById(idString).style.opacity === '1'){
        document.getElementById(idString).style.opacity = '0.3';
    }
    else{
        document.getElementById(idString).style.opacity = '1';
    }
}

function changeValues () {
    let textInputVon = document.getElementById("inputVon").value;
    let textInputBis = document.getElementById("inputBis").value;
    //let dateVon = document.getElementById("inputDateVon").value;

    document.getElementById("inputBis").value = textInputVon;
    document.getElementById("inputVon").value = textInputBis;
}

let counter = 0;

function ausgabeWerte() {
    console.log(counter);
    if(counter === 0){
        checkGueltigkeit();
    }
    else{
        return 0;
    }


}

function checkGueltigkeit() {
    let inputVon = document.getElementById("inputVon").value;
    let inputBis = document.getElementById("inputBis").value;
    let inputDateVon = document.getElementById("inputDateVon").value;

    if(inputVon === "" || inputBis === "" || inputDateVon === ""){
        return 1;
    }
    else{
        let start = document.getElementById("inputVon").value;
        let end = document.getElementById("inputBis").value;
        let zeit = document.getElementById("inputDateVon").value;
        buildRequest(start, end, zeit, "trip");
        if(counter === 0){
            //createTable();
        }
        else{
            return 0;
        }
    }
}

function timeOutput() {
    function showTime() {
        setInterval(showTime, 10000);
        let time = new Date();
        let hour = time.getHours();
        let min = time.getMinutes();

        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;

        let currentTime = hour + ":" + min;

        document.getElementById("zeitAusgabe").innerHTML = currentTime;
    }
    showTime();
}

function createTable(result) {
    counter++;
    for(let i = 0; i<4; i++){
        for(let c = 0; c<6; c++){
            console.log("RESULT BITE: ", result[i][c]);
        }
    }
    var table = document.getElementById("tableAusgeben");
    for (var i = 0; i <= 3; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j <= 5; j++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(result[i][j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}
function ausgabeWetter() {
    let d = getWetter();
    return d.then(function(result){
        for(let i = 0; i<6; i++){
            for(let c = 0; c<5; c++){
                console.log(result[i][c]);
            }
        }
        let schlanders = 0;
        let meran = 1;
        let bozen = 2;
        let sterzing = 3;
        let brixen = 4;
        let bruneck = 5;

        //Ort
        document.getElementById("schlandersID").innerHTML = result[schlanders][4];
        document.getElementById("meranID").innerHTML = result[meran][4];
        document.getElementById("bozenID").innerHTML = result[bozen][4];
        document.getElementById("sterzingID").innerHTML = result[sterzing][4];
        document.getElementById("brixenID").innerHTML = result[brixen][4];
        document.getElementById("bruneckID").innerHTML = result[bruneck][4];

        //Bild
        document.getElementById("schlandersIMG").src = result[schlanders][3];
        document.getElementById("meranIMG").src = result[meran][3];
        document.getElementById("bozenIMG").src = result[bozen][3];
        document.getElementById("sterzingIMG").src = result[sterzing][3];
        document.getElementById("brixenIMG").src = result[brixen][3];
        document.getElementById("bruneckIMG").src = result[bruneck][3];

        //Min
        document.getElementById("schlandersIDMin").innerHTML = result[schlanders][0] + "°";
        document.getElementById("meranIDMin").innerHTML = result[meran][0] + "°";
        document.getElementById("bozenIDMin").innerHTML = result[bozen][0] + "°";
        document.getElementById("sterzingIDMin").innerHTML = result[sterzing][0] + "°";
        document.getElementById("brixenIDMin").innerHTML = result[brixen][0] + "°";
        document.getElementById("bruneckIDMin").innerHTML = result[bruneck][0] + "°";

        //Max
        document.getElementById("schlandersIDMax").innerHTML = result[schlanders][1] + "°";
        document.getElementById("meranIDMax").innerHTML = result[meran][1] + "°";
        document.getElementById("bozenIDMax").innerHTML = result[bozen][1] + "°";
        document.getElementById("sterzingIDMax").innerHTML = result[sterzing][1] + "°";
        document.getElementById("brixenIDMax").innerHTML = result[brixen][1] + "°";
        document.getElementById("bruneckIDMax").innerHTML = result[bruneck][1] + "°";
    });
}