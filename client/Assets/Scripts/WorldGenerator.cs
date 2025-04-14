using UnityEngine;

public class WorldGenerator : MonoBehaviour
{
    private NodeRenderer _nodeRenderer;

    void Awake()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    public void Generate()
    {
        if (_nodeRenderer is null)
        {
            _nodeRenderer = gameObject.AddComponent<NodeRenderer>();
        }
        _nodeRenderer.GenerateNodes();
    }
}
