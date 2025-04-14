using UnityEngine;

public class PolygonNode
{
    public Vector3 Position { get; private set; }
    public int Edges { get; private set; }
    public float Radius { get; private set; }
    public float Height { get; private set; }
        public bool IsHovered { get; set; }
        public bool IsSelected { get; set; }
    public PolygonNode(Vector3 position, int edges = 6, float radius = 0.5f, float height = 1f)
    {
        Position = position;
        Edges = Mathf.Max(3, edges); // Ensure minimum of 3 edges
        Radius = radius;
        Height = height;
    }
}
