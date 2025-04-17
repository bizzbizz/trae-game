using System;
using System.Collections.Generic;
using UnityEngine;

public static class OsmUtils
{
    public static Vector3 ConvertGeoToUnityPosition(Element element) => ConvertGeoToUnityPosition(element.lat, element.lon);
    public static Vector3 ConvertGeoToUnityPosition(float lat, float lon)
    {
        // Simple conversion (this example assumes a flat Earth model for simplicity)
        float x = (lon - 13.37f) * 10000f; // Adjust with your longitude bounds
        float z = (lat - 52.51f) * 10000f; // Adjust with your latitude bounds
        return new Vector3(x, 0, z);
    }

//    public static int[] TriangulatePolygon(Vector3[] vertices)
//    {
//        // Basic triangulation for a convex polygon (for simplicity)
//        var triangles = new List<int>();

//        for (int i = 1; i < vertices.Length - 1; i++)
//        {
//            triangles.Add(0);
//            triangles.Add(i);
//            triangles.Add(i + 1);
//        }

//        return triangles.ToArray();
//    }

//    public static GameObject CreatePolygon(OsmElement element, Vector3[] vertices, Color color, string name)
//    {
//        var polygonObject = SceneEditor.CreateEntity(element, name);

//        // Create the polygon mesh if we have enough vertices
//        if (vertices.Length >= 3)
//        {
//            var mesh = new Mesh();
//            polygonObject.AddComponent<MeshFilter>().mesh = mesh;
//            polygonObject.AddComponent<MeshRenderer>().sharedMaterial = OsmImportEditor.BlueMaterial;
//            //polygonObject.AddComponent<MeshRenderer>().sharedMaterial.color = color;

//            int[] triangles = TriangulatePolygon(vertices);

//            mesh.vertices = vertices;
//            mesh.triangles = triangles;
//            mesh.RecalculateNormals();
//        }

//        return polygonObject;
//    }

//    //public static GameObject CreatePolyline(Vector3[] vertices, Color color, string name)
//    //{
//    //    var polylineObject = SceneEditor.CreateEntity( name);

//    //    return FillPolylineObject(polylineObject, vertices, color);
//    //}

//    private static GameObject FillPolylineObject(GameObject polylineObject, Vector3[] vertices, Color color)
//    {
//        var lineRenderer = polylineObject.AddComponent<LineRenderer>();
//        lineRenderer.positionCount = vertices.Length;
//        lineRenderer.startWidth = 0.1f;
//        lineRenderer.endWidth = 0.1f;
//        //lineRenderer.sharedMaterial.color = color;
//        if (color == Color.green)
//        {
//            lineRenderer.sharedMaterial = OsmImportEditor.GreenMaterial;
//        }
//        else
//        {
//            lineRenderer.sharedMaterial = OsmImportEditor.BlueMaterial;
//        }

//        for (int i = 0; i < vertices.Length; i++)
//        {
//            lineRenderer.SetPosition(i, vertices[i]);
//        }

//        return polylineObject;
//    }


//    public static GameObject CreateDebug(Vector3[] vertices, Color color, OsmElement element)
//    {
//        var debugInfo = element.tags is null ? element.type : string.Join('_', element.tags);
//        var polygonObject = SceneEditor.CreateEntity(element, debugInfo);

//        return FillPolylineObject(polygonObject, vertices, color);
//    }

//    public static GameObject CreatePoint(OsmElement element)
//    {
//        var debugInfo = element.tags is null ? element.type : string.Join('_', element.tags);
//        var pointObject = SceneEditor.CreatePoint(debugInfo);

//        Vector3 position = ConvertGeoToUnityPosition(element.lat, element.lon);

//        pointObject.transform.position = position;
//        pointObject.transform.localScale = Vector3.one * 0.1f;

//        return pointObject;
//    }
}
