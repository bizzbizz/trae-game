using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using System;
using System.Linq;

public class WorldManager : MonoBehaviour
{
    private const string BaseUrl = "http://localhost:8080/api";

    private OsmReader osmReader;
    [SerializeField] private float latitude = 32.8765258f;
    [SerializeField] private float longitude = -96.7170481f;
    [SerializeField] private float radius = 332f;

    [SerializeField] private bool IsMapEditor = true;
    public bool LoadFromCache = true;

    [SerializeField] private Ground groundPrefab;
    [SerializeField] private GameObject housePrefab;
    private GameObject mapNodes;

    public static WorldManager Instance { get; private set; }

    private Vector3 GeoToUnityPosition(float lat, float lon, float originLat, float originLon)
    {
        float scale = 1000f;
        float x = (lon - originLon) * scale;
        float z = (lat - originLat) * scale;
        return new Vector3(x, 0, z);
    }

    private void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
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

    public async void ResetWorld()
    {
        if (IsMapEditor)
        {
            if (osmReader is null)
            {
                osmReader = new OsmReader();
            }

            OverpassResponse objects = LoadFromCache ?
                osmReader.LoadFromFile()
                : await osmReader.ReadDataAsync(latitude, longitude, radius);

            if (objects is null)
            {
                Debug.Log("Nothing to display");
            }

            if (mapNodes is not null)
            {
                DestroyImmediate(mapNodes);
            }

            mapNodes = new GameObject("nodes");
            mapNodes.transform.SetParent(transform);

            foreach (var element in objects.elements)
            {
                Vector3 position = GeoToUnityPosition(element.lat, element.lon, latitude, longitude);
                var houseObject = Instantiate(housePrefab, mapNodes.transform);
                houseObject.transform.position = position;
                var nodes = objects.elements.Where(x => x.type == "node" && (element.nodes?.Contains(x.id) ?? false));
                houseObject.GetComponent<NodeRenderer>().GenerateNodes(NodeType.Polygon, nodes);
            }

        }
        else
        {
            StartCoroutine(ResetWorldCoroutine());
        }
    }

    private IEnumerator ResetWorldCoroutine()
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

    public void NextTurn()
    {
        StartCoroutine(NextTurnCoroutine());
    }

    private IEnumerator NextTurnCoroutine()
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
