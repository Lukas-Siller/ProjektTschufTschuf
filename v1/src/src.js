const userAction = async () => {
    const response = await fetch('https://efa.sta.bz.it/apb/XML_TRIP_REQUEST2?language=de&locationServerActive=1&convertStopsPTKernel2LocationServer=1&convertAddressesITKernel2LocationServer=1&convertCoord2LocationServer=1&convertCrossingsITKernel2LocationServer=1&convertPOIsITKernel2LocationServer=1&stateless=1&itOptionsActive=1&ptOptionsActive=1&sessionID=0&canChangeMOT=0&name_origin=Bozen%20Messe&type_origin=any&name_destination=Toblach%20Bus&type_destination=any&trITMOTvalue100=7&lineRestriction=400');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
}

