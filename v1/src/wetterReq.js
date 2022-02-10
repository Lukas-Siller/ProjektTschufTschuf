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
    getWetter();
}

function getWetter(){
    orte = ["Schlander", "Meran", "Bozen", "Sterzing", "Brixen", "Brunneck"];
    let wetter = [...Array(6)].map(e => Array(6).fill(0));
    let min, max, description, imgUrl, ort;
    fetch('http://daten.buergernetz.bz.it/services/weather/bulletin?format=json&lang=de')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < 6; i++){
                min = data.today.stationData[i].min;
                max = data.today.stationData[i].max;
                description = data.today.stationData[i].symbol.description;
                imgUrl = data.today.stationData[i].symbol.imageUrl;
                ort = orte[i];
                console.log(min +" "+ max +" "+ ort +" "+ description +" ");
            }

            return wetter;
        });
}



