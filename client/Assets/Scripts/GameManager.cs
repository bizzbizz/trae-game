using System;
using UnityEditor;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    [Header("Scene References")]
    [SerializeField] private CameraController cameraController;
    [SerializeField] private ClickController clickController;
    [SerializeField] private WorldManager worldManager;
    [SerializeField] private OsmReader osmReader;

    public void InstantiateAll()
    {
        cameraController = FindAnyObjectByType<CameraController>();
        var worldManagerObject = new GameObject("WorldManager");
        worldManager = worldManagerObject.AddComponent<WorldManager>();
        var clickControllerObject = new GameObject("ClickController");
        clickController = clickControllerObject.AddComponent<ClickController>();
    }

    private void Awake()
    {
        // Create camera controller if not present
        if (cameraController == null)
        {
            cameraController = FindAnyObjectByType<CameraController>();
        }

        // Create WorldManager if not present
        if (worldManager == null)
        {
            var worldManagerObject = new GameObject("WorldManager");
            worldManager = worldManagerObject.AddComponent<WorldManager>();
        }

        // Create WorldManager if not present
        if (clickController == null)
        {
            var clickControllerObject = new GameObject("ClickController");
            clickController = clickControllerObject.AddComponent<ClickController>();
        }
    }

    public void ResetWorld()
    {
        if (worldManager != null)
        {
            worldManager.ResetWorld();
        }
        else
        {
            Debug.LogError("WorldManager is not initialized");
        }
    }

    public void NextTurn()
    {
        if (worldManager != null)
        {
            worldManager.NextTurn();
        }
        else
        {
            Debug.LogError("WorldManager is not initialized");
        }
    }
}
