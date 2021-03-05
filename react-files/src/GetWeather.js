// NOTE(isuru): So far I've just done the absolute simplest thing of getting a weather summary at a given lat and long for a given time. OpenCage can be used for forward and reverse geocoding, at the moment I'm not using it but we might want to if we want to demonstrate a human-accessible way of setting location.

const KEY_OPENCAGE = "8d14fe4c97a2479f9d0804e72fd3b19c";
const KEY_DARKSKY = "4aede4ab193276d113479d180653559f";

const BuildParamStringFromData = (Data) => {
	
    let Params = "";
    for (let Key in Data) {
        if (Data.hasOwnProperty(Key)) {
            if (Params.length == 0) Params += "?";
            else                    Params += "&";
            Params += encodeURIComponent(Key) + "=" + encodeURIComponent(Data[Key]);
        }
    }
	return Params;
}

const OpenCageRequest = (Data) => {

    let Script = document.createElement('script');
    Script.src = "https://api.opencagedata.com/geocode/v1/json" + BuildParamStringFromData(Data);
    document.body.appendChild(Script);
}

const GetAddress = (Data) => {

    // @Incomplete(isuru)
}

// TODO(canta): Store requests that have already made and don't make redundant ones!!
const DarkSkyRequest = (Key, Lat, Long, Data, Time) => {

    // @Cleanup(isuru): Delete any appended Dark Sky scripts?
    let Script = document.createElement('script');
    let Params = BuildParamStringFromData(Data);
    if (Time == undefined) Script.src = "https://api.darksky.net/forecast/"+Key+"/"+Lat+","+Long+Params;
    else                   Script.src = "https://api.darksky.net/forecast/"+Key+"/"+Lat+","+Long+","+Time+Params;
    document.body.appendChild(Script);
}

const ExtractWeather = (Data) => {

	let Current = Data.currently;

	WeatherData = {
		Summary:           Current.summary,
		Temperature:       (Current.temperature - 32) * 5 / 9,
		UVIndex:           Current.uvIndex,
		PrecipType:        Current.precipType,
		PrecipIntensity:   Current.precipIntensity,
		PrecipProbability: Current.precipProbability,
		WindSpeed:         Current.windSpeed
	};

	// @Incomplete(isuru): Call into backend here? Or do some stuff with Promises to allow it to happen elsewhere async.
	// I'm keeping WeatherData global to inspect it for now but it has no real reason to be.
}

let WeatherData = {
	Summary:           undefined,
	Temperature:       undefined,
	UVIndex:           undefined,
	PrecipType:        undefined,
	PrecipIntensity:   undefined,
	PrecipProbability: undefined,
	WindSpeed:         undefined,
};

//let OpenCageParamData = { q: lat + ',' + lng, key: KEY_OPENCAGE, jsonp: GetAddress };
//OpenCageRequest(OpenCageParamData);

let DarkSkyParamData  = { callback: "ExtractWeather" };

{   // Example call
	// We /1000 because Dark Sky expects the time in seconds.
	// We round because Dark Sky poops its pants if ever it sees a decimal place.
	let Time = Math.round(new Date() / 1000);
	let Lat  = 0;
	let Long = 0
	DarkSkyRequest(KEY_DARKSKY, Lat, Long, DarkSkyParamData, Time);
}

