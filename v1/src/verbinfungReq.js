//API verbindung request
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
    //wie bekomme ich die Start und end Zeit??
    buildRequest("Sterzing", "Brixen Dantestraße", "", "", "trip");
});

async function buildRequest(sP, eP, sT, eT, typeOfRequest){
    let req = 'https://efa.sta.bz.it/apb/';
    let today = new Date();
    console.log("start test2: " + sP + eP   );
    if (typeOfRequest === "trip"){
        req = req+'XML_TRIP_REQUEST2?';
        req = req+'locationServerActive=1&'+'stateless=%201&';
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
    }else if (typeOfRequest === "DM"){
        //CODE für DM
    }

    /*for(let i = 0; i<6; i++){
        for(let c = 0; c<6; c++){
            console.log(d[i][c]);
        }
    }*/
    let d = getDataTrip();
    console.log(d);
    return d.then(function(result){
        for(let i = 0; i<4; i++){
            for(let c = 0; c<6; c++){
                console.log(result[i][c]);
            }
        }
    });
}



//soll aufgerufen werden wenn button ok gedrückt wurde und alle daten eingegeben wurden.
//sind alle in file drinnen
async function getDataTrip(){
    let startName, endName, duration, startTime, endTime, vmNr;
    let array = [];

    let response = await fetch('https://efa.sta.bz.it/apb/XML_TRIP_REQUEST2?locationServerActive=1&stateless=%201&type_origin=any&name_origin=Bozen%20Bahnhof%20Bozen&type_destination=any&name_destination=Brixen%20Bahnhof%20Brixen&outputFormat=JSON');
    data = await response.json();
    for (let i = 0; i<data.trips.length;i++) {
        startTime = data.trips[i].legs[0].points[0].dateTime.time;
        startName = data.trips[i].legs[0].points[0].nameWO;
        endTime = data.trips[i].legs[0].points[1].dateTime.time;
        endName = data.trips[i].legs[0].points[1].nameWO;
        duration = data.trips[i].duration;
        vmNr = data.trips[i].legs[0].mode.name;
        let e = [vmNr, startName, endName, startTime, endTime, duration];
        console.log(e);
        array.push(e);
        console.log(array);
        //console.log(startTime + " " + startName + " " + endTime + " " + endName + " " + duration);
    }
    console.log(array);
    return array;


    /*await fetch('https://efa.sta.bz.it/apb/XML_TRIP_REQUEST2?locationServerActive=1&stateless=%201&type_origin=any&name_origin=Bozen%20Bahnhof%20Bozen&type_destination=any&name_destination=Brixen%20Bahnhof%20Brixen&outputFormat=JSON')
        .then((response) => {
            return response.json().then((data) => {
                for (let i = 0; i<data.trips.length;i++) {
                    startTime = data.trips[i].legs[0].points[0].dateTime.time;
                    daten[i][0] = startTime;
                    startName = data.trips[i].legs[0].points[0].nameWO;
                    daten[i][1] = startName;
                    endTime = data.trips[i].legs[0].points[1].dateTime.time;
                    daten[i][2] = endTime;
                    endName = data.trips[i].legs[0].points[1].nameWO;
                    daten[i][3] = endName;
                    duration = data.trips[i].duration;
                    daten[i][4] = startTime;
                    vmNr = data.trips[i].legs[0].mode.name;
                    daten[i][5] = vmNr;
                    console.log(startTime + " " + startName + " " + endTime + " " + endName + " " + duration);
                }
                return data;
            }).catch((err) => {
                 console.log(err);
            })
        });


             /*.then(response => response.json())
        .then(data => {
            for (let i = 0; i<data.trips.length;i++){
                startTime = data.trips[i].legs[0].points[0].dateTime.time;
                daten[i][0] = startTime;
                startName = data.trips[i].legs[0].points[0].nameWO;
                daten[i][1] = startName;
                endTime = data.trips[i].legs[0].points[1].dateTime.time;
                daten[i][2] = endTime;
                endName = data.trips[i].legs[0].points[1].nameWO;
                daten[i][3] = endName;
                duration = data.trips[i].duration;
                daten[i][4] = startTime;
                vmNr = data.trips[i].legs[0].mode.name;
                daten[i][5] = vmNr;
                console.log(startTime +" "+ startName +" "+ endTime +" "+ endName +" "+ duration);
            }
            return daten;
        });*/
}

