using System;
using UnityEngine;

[Serializable]
public class GeoCoordinate
{
    public float lat;
    public float lon;
    public Vector3 ToVector3()
    {
        return new Vector3(lat * 1000, 0, lon * 1000);
    }
}
