using UnityEngine;

public abstract class BaseNode
{
    public NodeType NodeType { get; protected set; }
    public bool IsHovered { get; set; }
    public bool IsSelected { get; set; }
}
public class UniformPolygonNode : BaseNode
{
    public Vector3 Position { get; private set; }
    public int Edges { get; private set; }
    public float Radius { get; private set; }
    public float Height { get; private set; }
    public UniformPolygonNode(Vector3 position, int edges = 6, float radius = 0.5f, float height = 1f)
    {
        NodeType = NodeType.UniformPolygon;
        Position = position;
        Edges = Mathf.Max(3, edges); // Ensure minimum of 3 edges
        Radius = radius;
        Height = height;
    }
}
public class PolygonNode : BaseNode
{
    public Vector3[] Positions { get; private set; }
    public float Height { get; private set; }
    public PolygonNode(Vector3[] positions, float height = 1f)
    {
        NodeType = NodeType.Polygon;
        Positions = positions;
        Height = height;
    }
}
