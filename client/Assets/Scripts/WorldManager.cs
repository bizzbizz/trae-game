using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using System;
using System.Linq;

public class WorldManager : MonoBehaviour
{
    public static WorldManager main { get; private set; }

    private const string BaseUrl = "http://localhost:8080/api";

    private OsmReader osmReader;
    [SerializeField] private float latitude = 32.8765258f;
    [SerializeField] private float longitude = -96.7170481f;
    [SerializeField] private float radius = 332f;

    [SerializeField] private bool IsMapEditor = true;
    public bool LoadFromCache = true;

    [SerializeField] private Ground groundPrefab;
    [SerializeField] private GameObject housePrefab;
    private GameObject mapParent;

    private Vector3 GeoToUnityPosition(float lat, float lon, float originLat, float originLon)
    {
        float scale = 1000f;
        float x = (lon - originLon) * scale;
        float z = (lat - originLat) * scale;
        return new Vector3(x, 0, z);
    }

    private void Awake()
    {
        if (main == null)
        {
            main = this;
            DontDestroyOnLoad(gameObject);

            // Create ground if not present
            if (groundPrefab == null)
            {
                var groundObject = new GameObject("Ground");
                groundPrefab = groundObject.AddComponent<Ground>();
            }
        }
        else
        {
            Destroy(gameObject);
        }
    }

    public void ResetWorld()
    {
        if (mapParent is not null)
        {
            DestroyImmediate(mapParent);
        }

        if (osmReader is null)
        {
            osmReader = new OsmReader();
        }

        if (IsMapEditor)
        {
            StartCoroutine(ResetWorldFromClientCoroutine());
        }
        else
        {
            StartCoroutine(ResetWorldFromServerCoroutine());
        }
    }

    private IEnumerator ResetWorldFromClientCoroutine()
    {
        OverpassResponse objects;
        if (LoadFromCache)
        {
            objects = osmReader.LoadFromFile();
        }
        else
        {
            var task = osmReader.ReadDataAsync(latitude, longitude, radius);

            yield return new WaitUntil(() => task.IsCompleted);

            if (task.Exception != null)
            {
                Debug.LogError(task.Exception);
                yield break;
            }

            objects = task.Result;
        }

        if (objects is null || objects.elements is null || !objects.elements.Any())
        {
            Debug.LogWarning($"Nothing to display: '{objects}' '{objects.elements}'");
            yield break;
        }

        Debug.Log($"response has {objects.elements.Length} elements");

        mapParent = new GameObject("nodes");
        mapParent.transform.SetParent(transform);

        var shapes = objects.elements
                .Where(x => x.type == "way" && (x.nodes?.Any() ?? false))
                .ToArray();

        foreach (var shape in shapes)
        {
            Vector3 position = GeoToUnityPosition(shape.lat, shape.lon, latitude, longitude);
            var houseObject = Instantiate(housePrefab, mapParent.transform);
            houseObject.transform.position = position;

            houseObject.GetComponent<NodeRenderer>().GenerateShapes(NodeType.Polygon, shape, objects.elements.ToDictionary(x => x.id));
        }

    }

    private IEnumerator ResetWorldFromServerCoroutine()
    {
        using UnityWebRequest request = UnityWebRequest.Get($"{BaseUrl}/reset-world");
        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log($"World reset successful: {jsonResponse}");
            // TODO: Parse the JSON response and update game state
            // This will be implemented once we have the World data structure defined
        }
        else
        {
            Debug.LogError($"Failed to reset world: {request.error}");
        }
    }

    public IEnumerator NextTurnCoroutine()
    {
        using UnityWebRequest request = UnityWebRequest.Post($"{BaseUrl}/next-turn", new WWWForm());
        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            string jsonResponse = request.downloadHandler.text;
            Debug.Log($"Next turn successful: {jsonResponse}");
            // TODO: Parse the JSON response and update game state
            // This will be implemented once we have the World data structure defined
        }
        else
        {
            Debug.LogError($"Failed to next turn: {request.error}");
        }
    }
}
