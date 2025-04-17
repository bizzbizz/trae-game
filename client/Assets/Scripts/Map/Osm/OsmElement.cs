using System;
using System.Collections.Generic;
using UnityEngine;

[Serializable]
public class OsmElement
{
    public string type; // "node", "way", or "relation"
    public float lat;   // Latitude (for nodes)
    public float lon;   // Longitude (for nodes)
    public long id;     // Unique ID of the element
    public long[] nodes; // References to node IDs (for ways)
    public Dictionary<string, string> tags; // Tags for additional data (e.g., "building", "highway")
    public List<Member> members;            // Members for relations
    public List<GeoCoordinate> geometry;    // Geometry coordinates for ways and relations

    public override string ToString()
    {
        return $"{type} nodes:{string.Join(',', nodes)} tags:{string.Join(',', tags)}";
    }

    public Vector3 ToVector3() => new Vector3(lat * 1000, 0, lon * 1000);
}
