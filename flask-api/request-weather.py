import requests

ERROR_SUCCESS = 0
ERROR_FAIL    = 1

def DarkSkyRequest(Lat, Long, Time, Dest):

    # in
    # Lat, Long   Must be integers in unit 
    # Time        Must be integer in unit seconds

    # out
    # Dest        Weather data dict to be filled out

    KEY_DARKSKY = "4aede4ab193276d113479d180653559f"

    # Building URL
    StringDSR = "https://api.darksky.net/forecast/"
    StringDSR += KEY_DARKSKY + "/" + str(Lat) + "," + str(Long)
    if Time: StringDSR += str(Time)

    # Making request
    Data = requests.get(StringDSR)
    if Data.status_code == 200:
        Current = Data.json()["currently"]
        Dest["Summary"]           = Current["summary"]
        Dest["Temperature"]       = (Current["temperature"] - 32) * 5 / 9
        Dest["UVIndex"]           = Current["uvIndex"]
        Dest["PrecipType"]        = Current["precipType"]
        Dest["PrecipIntensity"]   = Current["precipIntensity"]
        Dest["PrecipProbability"] = Current["precipProbability"]
        Dest["WindSpeed"]         = Current["windSpeed"]
        return ERROR_SUCCESS
    else:
        return ERROR_FAIL


WeatherData = {
    "Summary":           None,
	"Temperature":       None,
	"UVIndex":           None,
	"PrecipType":        None,
	"PrecipIntensity":   None,
	"PrecipProbability": None,
	"WindSpeed":         None
}

# Example call
Lat  = -37
Long = 144
Time = 1614990682
DarkSkyRequest(Lat, Long, Time, WeatherData)
print(WeatherData)