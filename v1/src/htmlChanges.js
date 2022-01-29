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
    let date_time = `${ye}-${mo}-${da}T${time}`;
    console.log("Current Time:" + date_time);
    document.getElementById(idString).value = date_time;
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