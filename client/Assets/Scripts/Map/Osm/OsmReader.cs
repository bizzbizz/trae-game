using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using UnityEngine;

public class OsmReader
{
    private readonly HttpClient _httpClient;

    public OsmReader()
    {
        _httpClient = new HttpClient();
    }

    public async Task<OverpassResponse> ReadDataAsync(float lat, float lon, float radiusInMeters = 100)
    {
        var query = GenerateOverpassQuery(lat, lon, radiusInMeters);
        var url = "https://overpass-api.de/api/interpreter?data=" + Uri.EscapeDataString(query);

        // call osm
        var jsonString = await _httpClient.GetStringAsync(url);

        // cache
        string path = Path.Combine(Application.persistentDataPath, "osm_data.json");
        File.WriteAllText(path, jsonString);
        Debug.Log("JSON saved to: " + path);

        // parse
        return JsonUtility.FromJson<OverpassResponse>(jsonString);
    }
    public static string GenerateOverpassQuery(MapBounds mapBounds)
    {
        const string baseUrl1 = "[out:json];(node({0},{1},{2},{3});way({0},{1},{2},{3});rel({0},{1},{2},{3}););out geom;";
        string url = string.Format(baseUrl1, mapBounds.minLat, mapBounds.minLon, mapBounds.maxLat, mapBounds.maxLon);
        return url;
    }
    private string GenerateOverpassQuery(float lat, float lon, float radius)
    {
        return q2();

#pragma warning disable CS8321 // Local function is declared but never used
        string q1() =>
            $@"[out:json];
            (
                way(around:{radius},{lat},{lon});
                >;
            );
            out body;";

        string q2() =>
            $@"[out:json];
            (
                way(around:{radius},{lat},{lon});
                >;
                node(around:{radius},{lat},{lon});
            );
            out body;";

        string geom() =>
    $@"[out:json];
            (
                way(around:{radius},{lat},{lon});
                >;
                node(around:{radius},{lat},{lon});
            );
            out geom;";

        string q3() =>
            $"[out:json];node(around:{radius},{lat},{lon});out;";

        string q4() =>
            $@"[out:json];
            (
                node(around:{radius},{lat},{lon});
                way(around:{radius},{lat},{lon});
                relation(around:{radius},{lat},{lon});
            );
            out body;
            >;
            out skel qt;";
#pragma warning restore CS8321 // Local function is declared but never used
    }

    internal OverpassResponse LoadFromFile()
    {
        string path = Path.Combine(Application.persistentDataPath, "osm_data.json");
        Debug.Log($"reading from file: {path}");
        var jsonString = File.ReadAllText(path);
        Debug.Log($"file has {jsonString.Length} length");

        return JsonUtility.FromJson<OverpassResponse>(jsonString);
    }
}

[System.Serializable]
public class Element
{
    public long id;
    public string type;
    public float lat;
    public float lon;
    public long[] nodes;  // For ways
    public Tags tags;
    public Member[] members;  // For relations
}

[System.Serializable]
public class Member
{
    public string type;
    public long ref_id;
    public string role;
}

[System.Serializable]
public class Tags
{
    public string name;
    public string highway;    // For roads
    public string building;   // For buildings
    public string amenity;    // For amenities
}
[System.Serializable]
public class Osm3s
{
    public string timestamp_osm_base;
    public string copyright;
}
[System.Serializable]
public class OverpassResponse
{
    public float version;
    public string generator;
    public Osm3s osm3s;
    public Element[] elements;
}
