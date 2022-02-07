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
    if (document.getElementById("checkBusIMG").style.opacity === '1' && document.getElementById("checkZugIMG").style.opacity === '1'){
        document.getElementById("zugOderBus").innerText = "Zug & Bus";
    }
    else if(document.getElementById("checkZugIMG").style.opacity === '1'){
        document.getElementById("zugOderBus").innerText = "Zug";
    }
    else if (document.getElementById("checkBusIMG").style.opacity === '1'){
        document.getElementById("zugOderBus").innerText = "Bus";
    }
    else {
        document.getElementById("zugOderBus").innerText = "";
    }

    if(counter === 0){
        counter++;
        createTable();
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
        alert("Bitte gib eine gültige Angabe ein!");
    }
    else{
        //function
        alert("Richtig!");
    }
}

function timeOutput() {
    function showTime() {
        setInterval(showTime, 1000);
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

function createTable() {
    const arr = [
        "NR",
        "Start",
        "Stop",
        "Startzeit",
        "Ankunftszeit",
        "Fartzeit",
        "NR",
        "Start",
        "Stop",
        "Startzeit",
        "Ankunftszeit",
        "Fartzeit",
        "NR",
        "Start",
        "Stop",
        "Startzeit",
        "Ankunftszeit",
        "Fartzeit",
        "NR",
        "Start",
        "Stop",
        "Startzeit",
        "Ankunftszeit",
        "Fartzeit",
        "NR",
        "Start",
        "Stop",
        "Startzeit",
        "Ankunftszeit",
        "Fartzeit"
        ]
    var table = document.getElementById("tableAusgeben");

    for (var i = 0; i < 5; i++) {
        var row = document.createElement("tr");

        for (var j = 0; j <= 5; j++) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(arr[j] + i);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }


/*
<tr>
    <th style="width: auto; padding: 5px">NR</th>
    <th style="width: auto; padding: 5px">Start</th>
    <th style="width: auto; padding: 5px">Stop</th>
    <th style="width: auto; padding: 5px">Startzeit</th>
    <th style="width: auto; padding: 5px">Ankunftszeit</th>
    <th style="width: auto; padding: 5px">Fahrtzeit</th>
</tr>

<tr>
    <td>315</td>
    <td>Sterzing Bahnhof</td>
    <td>Obertelfes</td>
    <td>14:11</td>
    <td>14:28</td>
    <td>17 min</td>
</tr>
*/
}