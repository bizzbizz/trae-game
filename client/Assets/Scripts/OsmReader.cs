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

    private string GenerateOverpassQuery(float lat, float lon, float radius)
    {
        // return $"[out:json];node(around:{radius},{lat},{lon});out;";
/*        return $@"[out:json];
    (
      node(around:{radius},{lat},{lon});
      way(around:{radius},{lat},{lon});
      relation(around:{radius},{lat},{lon});
    );
    out body;
    >;
    out skel qt;";
    }*/
        return $@"[out:json];
(
    way(around:{radius},{lat},{lon});
    >;  // Get all nodes that are part of the ways
    node(around:{radius},{lat},{lon});
);
out body;";
    }

    internal OverpassResponse LoadFromFile()
    {
        string path = Path.Combine(Application.persistentDataPath, "osm_data.json");
        var jsonString = File.ReadAllText(path);

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
