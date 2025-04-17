//using System;
//using System.Collections.Generic;
//using UnityEngine;

//public static class OsmProcessor
//{
//    private static Dictionary<long, Point> nodePositions = new(); // Dictionary to store node positions by ID

//    public static void ProcessOSMData(OsmResponse osmData)
//    {
//        //ProcessNodes(osmData);

//        var elements = osmData.elements.Where(x => x.type is not "node").ToArray();

//        ILogger.Log($"{elements.Length} non-node elements found");

//        foreach (var element in elements)
//        {
//            ProcessElement(element);
//        }
//    }

//    private static void ProcessNodes(OsmResponse osmData)
//    {
//        // First, process all nodes and store their positions
//        foreach (var element in osmData.elements.Where(x => x.type is "node"))
//        {
//            Vector3 position = OsmUtils.ConvertGeoToUnityPosition(element.lat, element.lon);
//            nodePositions[element.id] = position;
//        }
//    }

//    private static void ProcessElement(OsmElement element)
//    {
//        var vertices = CreateVertices(element);

//        if (element.geometry is not null && element.geometry.Count > 0)
//        {
//            WithGeometry.Create(element, vertices);
//            return;
//        }

//        //if (element.nodes != null && element.tags != null)
//        //{
//        //    return;
//        //}
//        //else
//        //{
//        //    OsmUtils.CreatePoint(element);
//        //}
//    }

//    private static Vector3[] CreateVertices(OsmElement element)
//    {

//        if (element.geometry is not null)
//        {
//            var vertices = new List<Vector3>();
//            foreach (var geom in element.geometry)
//            {
//                vertices.Add(geom.ToVector3());
//            }
//            return vertices.ToArray();
//        }

//        //if (element.nodes is not null)
//        //{
//        //    var vertices = new List<Vector3>();
//        //    foreach (long nodeId in element.nodes)
//        //    {
//        //        if (nodePositions.TryGetValue(nodeId, out Vector3 position))
//        //        {
//        //            vertices.Add(position);
//        //        }
//        //    }
//        //    return vertices.ToArray();
//        //}

//        return Array.Empty<Vector3>();

//    }
//}
