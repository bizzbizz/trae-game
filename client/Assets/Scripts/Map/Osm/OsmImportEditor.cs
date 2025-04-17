//using System;
//using System.Net.Http;
//using System.Threading.Tasks;
//using UnityEngine;

//public static class OsmImportEditor
//{
//    //private string baseUrl = "https://overpass-api.de/api/interpreter?data=[out:json];node({0},{1},{2},{3});out;";
//    //private string baseUrl = "https://overpass-api.de/api/interpreter?data=[out:json];(way[building]({0},{1},{2},{3});node(w););out;body;";
//    //private string baseUrl = "https://overpass-api.de/api/interpreter?data=[out:json];%20(%20way[%22building%22]({0},{1},{2},{3});%20node(w);%20);%20out%20body;";
//    //private string baseUrl = "https://overpass-api.de/api/interpreter?data=[out:json][maxsize:1073741824][timeout:25];(node({0},{1},{2},{3});way({0},{1},{2},{3});relation({0},{1},{2},{3}););out body;>;out skel qt;";
//    //private string baseUrl = "https://overpass-api.de/api/interpreter?data=[out:json];way({0},{1},{2},{3});out geom;";
//    private const string baseUrl1 = "https://overpass-api.de/api/interpreter?data=[out:json];(node({0},{1},{2},{3});way({0},{1},{2},{3});rel({0},{1},{2},{3}););out geom;";

//    public static string GetLoadingUrl(MapBounds mapBounds)
//    {
//        string url = string.Format(baseUrl1, mapBounds.minLat, mapBounds.minLon, mapBounds.maxLat, mapBounds.maxLon);
//        return url;
//    }

//    public static async Task<OsmResponse?> FetchData(string url)
//    {
//        using (HttpClient client = new HttpClient())
//        {
//            HttpResponseMessage response = await client.GetAsync(url);

//            if (response.IsSuccessStatusCode)
//            {
//                string responseBody = await response.Content.ReadAsStringAsync();

//                return JsonSerializer.Deserialize<OsmResponse>(responseBody);
//            }
//            else
//            {
//                Debug.Log($"Error: {response.StatusCode}");
//                return null;
//            }
//        }
//    }
//}

//[Serializable]
//public class OsmResponse
//{
//    public OsmElement[] elements;
//}
