//API request
//now const later get from htmlChanges.js
const startPlace = "Brixen", endPlace = "Bozen";
let startTime = "", endTime = "";
let startDate = "";

//DM Request = abfartsliste

//XML_TRIP_REQUEST = fartenanfrage
//2?
//locationServerActive=1
//?
//language=de /language=it /language=en => muss nicht sein
//2?
//itdDate=JJMMDD (wenn nichts dann systemzeit)
//itdTime=1534
//type_origin=any
//$
//name_origin="startPlace"
//type_destination=any
//name_destination="endPlace"
//&outputFormat=JSON&

document.addEventListener("DOMContentLoaded", function() {
    buildRequest("Sterzing", "Brixen Dantestraße", "", "", "trip");
});

function buildRequest(sP, eP, sT, eT, typeOfRequest){
    let req = 'https://efa.sta.bz.it/apb/';
    console.log(req);
    if (typeOfRequest == "trip"){
        req = req+'XML_TRIP_REQUEST2?';
        req = req+'locationServerActive=1&'+'stateless=1%20&';
        //add time
        if (startTime !== "" && startDate !== ""){
            req = req+'itdDate='+startTime+"&"+'itdTime'+startDate+"&";
        }
        //origin hinzufügen
        let sp = startPlace.replace(/ /g,"%20");
        let ep = endPlace.replace(/ /g, '%20');
        req = req+'type_origin=any&name_origin='+sp+'&type_destination=any&name_destination='+ep;
        //als JSON ausgeben
        req = req+"&outputFormat=JSON";
        console.log("REQ = "+ req);
    }



    return req;
}

window.onload = function (){
    getData();
}

function getData(){
    let startName, endName, duration, startTime, endTime;
    fetch('https://efa.sta.bz.it/apb/XML_TRIP_REQUEST2?locationServerActive=1&stateless=%201&type_origin=any&name_origin=Bozen%20Bahnhof%20Bozen&type_destination=any&name_destination=Brixen%20Bahnhof%20Brixen&outputFormat=JSON')
        .then(response => response.json())
        .then(data => {
            startTime = data.trips[0].legs[0].points[0].dateTime.time;
            startName = data.trips[0].legs[0].points[0].nameWO;
            endTime = data.trips[0].legs[0].points[1].dateTime.time;
            endName = data.trips[0].legs[0].points[1].nameWO;
            duration = data.trips[0].duration;

            console.log(startTime +" "+ startName +" "+ endTime +" "+ endName +" "+ duration);


        });

}

