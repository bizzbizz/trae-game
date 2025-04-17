using UnityEngine;

public class UiEventHandler : MonoBehaviour
{
    public void ResetWorld()
    {
        if (WorldManager.main != null)
        {
            WorldManager.main.ResetWorld();
        }
        else
        {
            Debug.LogError("WorldManager is not initialized");
        }
    }

    public void NextTurn()
    {
        if (WorldManager.main != null)
        {
            StartCoroutine(WorldManager.main.NextTurnCoroutine());
        }
        else
        {
            Debug.LogError("WorldManager is not initialized");
        }
    }
}
