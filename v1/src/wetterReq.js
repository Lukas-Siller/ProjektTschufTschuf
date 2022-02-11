//API wetter request
/*
http://daten.buergernetz.bz.it/services/weather/district?format=json&lang=de
   0 = Schlanders
   1 = Meran
   2 = Bozen
   3 = Sterzing
   4 = Brixen
   5 = Brunneck
*/

window.onload = function(){
    let d =getWetter();
    return d.then(function(result){
        for(let i = 0; i<6; i++){
            for(let c = 0; c<5; c++){
                console.log(result[i][c]);
            }
        }
    });
}

async function getWetter(){
    orte = ["Schlanders", "Meran", "Bozen", "Sterzing", "Brixen", "Brunneck"];
    let wetter = [];
    let min, max, description, imgUrl, ort;

    let response = await fetch('http://daten.buergernetz.bz.it/services/weather/bulletin?format=json&lang=de');
    data = await response.json();
   // console.log(data.today.stationData.length);
    for (let i = 0; i<data.today.stationData.length;i++) {
        min = data.today.stationData[i].min;
        max = data.today.stationData[i].max;
        description = data.today.stationData[i].symbol.description;
        imgUrl = data.today.stationData[i].symbol.imageUrl;
        ort = orte[i];
        let e = [min, max, description, imgUrl, ort];
        wetter.push(e);
    }
    //console.log(wetter);
    return wetter;
}



