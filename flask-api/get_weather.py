import urllib
import requests

ERROR_SUCCESS = 0
ERROR_FAIL    = 1

KEY_DARKSKY = "4aede4ab193276d113479d180653559f"
KEY_OPENCAGE = "8d14fe4c97a2479f9d0804e72fd3b19c"


def RequestWeather(Lat, Long, Time, Dest):

    # in
    # Lat, Long   In unit degrees
    # Time        Integer in unit seconds

    # out
    # Dest        Weather data dict to be filled out

    # Building URL
    StringDSR = "https://api.darksky.net/forecast/"
    StringDSR += KEY_DARKSKY + "/" + urllib.parse.quote(str(Lat)) + "," + urllib.parse.quote(str(Long))
    if Time: StringDSR += "," + str(Time)

    # Making request and resolving
    Data = requests.get(StringDSR)
    if Data.status_code == 200:
        Current = Data.json()["currently"]
        Dest["Summary"]           = Current["summary"]
        Dest["Temperature"]       = (Current["temperature"] - 32) * 5 / 9
        Dest["UVIndex"]           = Current["uvIndex"]
        Dest["PrecipIntensity"]   = Current["precipIntensity"]
        Dest["PrecipProbability"] = Current["precipProbability"]
        if Dest["PrecipProbability"]: Dest["PrecipType"] = Current["precipType"]
        else:                         Dest["PrecipType"] = None
        Dest["WindSpeed"]         = Current["windSpeed"]
        return ERROR_SUCCESS
    else:
        return ERROR_FAIL


def GetLatLong(Address, Dest):

    # in
    # Address   Some reasonable string

    # out
    # Dest      Lat/long dict to be filled out

    # Building URL
    StringOCR = "https://api.opencagedata.com/geocode/v1/json"
    StringOCR += "?q=" + urllib.parse.quote(Address)
    StringOCR += "&key=" + KEY_OPENCAGE

    # Making request and resolving
    Data = requests.get(StringOCR)
    if Data.status_code == 200:
        geometry = Data.json()["results"][0]["geometry"]
        Dest[0] = geometry["lat"]
        Dest[1] = geometry["lng"]
        return ERROR_SUCCESS
    else:
        return ERROR_FAIL


def GetWeather(Address, Time, Dest):

    # Converting address string into lat/long coords for use with Dark Sky
    LatLong = { 0: None, 1: None }
    GetLatLong(Address, LatLong)

    RequestWeather(LatLong[0], LatLong[1], Time, Dest)


def GetWeatherExampleCall():

    Address     = "***REMOVED***, Victoria"
    Time        =  1614990682
    WeatherData = {
        "Summary":           None,
	    "Temperature":       None,
	    "UVIndex":           None,
	    "PrecipIntensity":   None,
	    "PrecipProbability": None,
	    "PrecipType":        None,
	    "WindSpeed":         None
    }

    LatLong = { 0: None, 1: None }
    GetLatLong(Address, LatLong)
    print("LatLong: " + str(LatLong[0]) + ", " + str(LatLong[1]))

    GetWeather(Address, Time, WeatherData)
    print(WeatherData)

