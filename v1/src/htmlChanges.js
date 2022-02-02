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
    //let dateBis = document.getElementById("inputDateBis").value;

    document.getElementById("inputBis").value = textInputVon;
    document.getElementById("inputVon").value = textInputBis;
}

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
    else{
        document.getElementById("zugOderBus").innerText = "";
    }

    document.getElementById("zeitStart").innerText = document.getElementById("inputDateVon").value;
    document.getElementById("zeitStop").innerText = document.getElementById("inputDateBis").value;
}

function changeValueOfDate(){
    if(document.getElementById('inputDateBis').value <= document.getElementById('inputDateVon').value){
        document.getElementById('inputDateBis').value = document.getElementById('inputDateVon').value;
        document.getElementById('inputDateBis').min = document.getElementById('inputDateVon').value;
    }
    else{
        document.getElementById('inputDateBis').min = document.getElementById('inputDateVon').value;
    }
}

function checkGueltigkeit() {
    let inputVon = document.getElementById("inputVon").value;
    let inputBis = document.getElementById("inputBis").value;
    let inputDateVon = document.getElementById("inputDateVon").value;
    let inputDateBis = document.getElementById("inputDateBis").value;

    if(inputVon === "" || inputBis === "" || inputDateVon === "" || inputDateBis === ""){
        alert("Bitte gib eine gültige Angabe ein!");
    }
    else{
        //function
        alert("Richtig!");
    }
}