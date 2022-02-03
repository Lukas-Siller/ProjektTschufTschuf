//API request
//now const later get from htmlChanges.js
const startPlace = "Brixen", endPlace = "Bozen";
let startTime = "", endTime = "";
let startDate = "";

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
        console.log("REQ = "+ req);
    }



    return req;
}





// fetch-Aufruf mit Pfad zur XML-Datei XML auslesen
fetch ('https://efa.sta.bz.it/apb/XML_TRIP_REQUEST2?locationServerActive=1&stateless=%201&type_origin=any&name_origin=Bozen%20Bahnhof%20Bozen&type_destination=any&name_destination=Brixen%20Bahnhof%20Brixen')
    .then (function (response) {
        // Antwort kommt als Text-String
        return response.text();
    })
    .then (function (data) {
        console.log (data);			  // schnell mal in der Konsole checken

        // String in ein XML-DOM-Objekt umwandeln
        let parser = new DOMParser(),
            xmlDoc = parser.parseFromString (data, 'text/xml');

        //und noch ein paar Test-Ausgaben in die Konsole
        console.log (xmlDoc.getElementsByTagName('content'));
        console.log ("item "  + xmlDoc.getElementsByTagName ('item')[1].children[0].textContent);

        comicToday(xmlDoc);			// Funktion zur Bearbeitung mit dem geparsten xmlDoc aufrufen
    }).catch (function (error) {
    console.log ("Fehler: bei Auslesen der XML- Datei " + error);
});
