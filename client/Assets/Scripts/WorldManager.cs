using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Collections.Generic;
using System;

public class WorldManager : MonoBehaviour
{
    private const string BaseUrl = "http://localhost:8080/api";

    [SerializeField] private OsmReader osmReader;
    [SerializeField] private float latitude = 32.8765258f;
    [SerializeField] private float longitude = -96.7170481f;
    [SerializeField] private float radius = 332f;

    [SerializeField] private bool IsMapEditor = true;
    [SerializeField] private bool LoadFromCache = true;

    [SerializeField] private Ground ground;
    [SerializeField] private GameObject house;

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
            if (ground == null)
            {
                var groundObject = new GameObject("Ground");
                ground = groundObject.AddComponent<Ground>();
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

            if (LoadFromCache)
            {
                osmReader.LoadFromFile();
            }
            else
            {
#pragma warning disable CS0162 // Unreachable code detected
                OverpassResponse objects = await osmReader.ReadDataAsync(latitude, longitude, radius);
#pragma warning restore CS0162 // Unreachable code detected
                if (objects is null)
                {
                    Debug.Log("Nothing to display");
                }

                foreach (var node in objects.elements)
                {
                    Vector3 position = GeoToUnityPosition(node.lat, node.lon, latitude, longitude);
                    Instantiate(house);
                    house.transform.position = position;
                    house.name = node.type;
                }
            }

        }
        else
        {
            StartCoroutine(ResetWorldCoroutine());
        }
    }

    private IEnumerator ResetWorldCoroutine()
    {

        using (UnityWebRequest request = UnityWebRequest.Get($"{BaseUrl}/reset-world"))
        {
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
    }

    public void NextTurn()
    {
        StartCoroutine(NextTurnCoroutine());
    }

    private IEnumerator NextTurnCoroutine()
    {
        using (UnityWebRequest request = UnityWebRequest.Post($"{BaseUrl}/next-turn", new WWWForm()))
        {
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
}
