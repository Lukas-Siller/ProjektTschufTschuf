//API verbindung request
//DM Request = abfartslist

async function buildRequest(sP, eP, dateRequest, typeOfRequest){
    let req = 'https://efa.sta.bz.it/apb/';
    let today = new Date();
    let year = (today.getFullYear()).toString(), month = (today.getMonth()+1).toString(), day = (today.getDay()).toString(), hour = (today.getHours()).toString(), minute = (today.getMinutes()).toString();
    //0year 1month 2day 3hour 4minut
    let dateArray = dateRequest.split(/[-T:]/g);
    console.log(dateRequest);
    console.log(dateArray);

    console.log("start test2: " + sP + eP);
    if (typeOfRequest === "trip"){
        req = req+'XML_TRIP_REQUEST2?';
        //add Time
        if (parseInt(month) <10) month = "0"+month;
        if(parseInt(hour)<10) hour = "0"+hour;
        if(parseInt(minute)<10) minute = "0"+minute;
        req = req+'locationServerActive=1&'+'stateless=%201&';
        console.log(dateArray[2] + " "+  day);
        if (dateArray[0] === year && dateArray[1] === month && dateArray[2] === day && dataArray[3] === hour && dataArray[4] === minute){
            //time hinzufügen
             console.log("change date");
        }
        else{
            req=req+"itdDate="+dateArray[0]+dateArray[1]+dateArray[2]+"&"+"itdTime="+dateArray[3]+dateArray[4]+"&";
        }
        //origin hinzufügen
        let startPlace = sP.replace(/ /g,"%20");
        let endPLace = eP.replace(/ /g, '%20');
        req = req+'type_origin=any&name_origin='+startPlace+'&type_destination=any&name_destination='+endPLace;
        //als JSON ausgeben
        req = req+"&outputFormat=JSON";
        console.log("REQ = "+ req);
    }else if (typeOfRequest === "DM"){
        //CODE für DM
    }

    console.log(req);
    let d = getDataTrip(req);
    return d.then(function(result){
        createTable(result);
        return result;
    });
}

//soll aufgerufen werden wenn button ok gedrückt wurde und alle daten eingegeben wurden.
//sind alle in file drinnen
async function getDataTrip(req){
    let startName, endName, duration, startTime, endTime, vmNr;
    let array = [];

    console.log(req);
    let response = await fetch(req);
    data = await response.json();
    for (let i = 0; i<data.trips.length;i++) {
        startTime = data.trips[i].legs[0].points[0].dateTime.time;
        startName = data.trips[i].legs[0].points[0].nameWO;
        endTime = data.trips[i].legs[0].points[1].dateTime.time;
        endName = data.trips[i].legs[0].points[1].nameWO;
        duration = data.trips[i].duration;
        vmNr = data.trips[i].legs[0].mode.name;
        let e = [vmNr, startName, endName, startTime, endTime, duration];
        array.push(e);
    }
    return array;
}

