using System;

[Serializable]
public class OsmMember
{
    public string type; // "node", "way", or "relation"
    public long refId;  // Reference ID of the member
    public string role; // Role in the relation (e.g., "outer" for multipolygons)
}
