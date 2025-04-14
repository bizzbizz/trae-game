using UnityEngine;
using System.Collections.Generic;

public class NodeRenderer : MonoBehaviour
{
    private MeshFilter meshFilter;
    private MeshRenderer meshRenderer;
    private MeshCollider meshCollider;
    private Mesh mesh;
    private List<Vector3> vertices;
    private List<int> triangles;
    private List<PolygonNode> nodes;

    void Awake()
    {
        Initialize();
        DrawNodes();
    }
    private void Update()
    {
        HandleNodeInteraction();
        UpdateNodeMaterials();
    }
    public void GenerateNodes()
    {
        Initialize();
        DrawNodes();
    }
    public Material baseMaterial;
   // public Material hoverMaterial;
    //public Material selectedMaterial;
    private void Initialize()
    {
       /* // Setup materials
        baseMaterial = meshRenderer.material;
        hoverMaterial = new Material(baseMaterial);
        selectedMaterial = new Material(baseMaterial);

        hoverMaterial.color = new Color(1.2f, 1.2f, 1.2f, 1f);  // Brighter
        selectedMaterial.color = new Color(1.5f, 1.5f, 1.5f, 1f);  // Even brighter
       */
        meshCollider = GetComponent<MeshCollider>();
        meshFilter = GetComponent<MeshFilter>();
        meshRenderer = GetComponent<MeshRenderer>();
        meshRenderer.material = baseMaterial;

        mesh = new Mesh();
        mesh.name = "NodeMesh";
        meshFilter.mesh = mesh;
        meshCollider.sharedMesh = mesh;

        vertices = new List<Vector3>();
        triangles = new List<int>();
        nodes = new List<PolygonNode>();
    }

    private void DrawNodes()
    {
        vertices.Clear();
        triangles.Clear();
        nodes.Clear();

        // Create sample nodes with different shapes
        nodes.Add(new PolygonNode(new Vector3(-2, 0, 0), 4));  // Square
        nodes.Add(new PolygonNode(new Vector3(0, 0, 0), 6));   // Hexagon
        nodes.Add(new PolygonNode(new Vector3(2, 0, 0), 8));   // Octagon

        foreach (var node in nodes)
        {
            CreateNodePolygon(node);
        }

        mesh.vertices = vertices.ToArray();
        mesh.triangles = triangles.ToArray();
        mesh.RecalculateNormals();

        // Update mesh collider
        GetComponent<MeshCollider>().sharedMesh = null;
        GetComponent<MeshCollider>().sharedMesh = mesh;
    }

    private void CreateNodePolygon(PolygonNode node)
    {
        int vertexOffset = vertices.Count;

        // Bottom vertices
        for (int i = 0; i < node.Edges; i++)
        {
            float angle = i * Mathf.PI * 2f / node.Edges;
            vertices.Add(node.Position + new Vector3(
                Mathf.Cos(angle) * node.Radius,
                0,
                Mathf.Sin(angle) * node.Radius
            ));
        }

        // Top vertices
        for (int i = 0; i < node.Edges; i++)
        {
            float angle = i * Mathf.PI * 2f / node.Edges;
            vertices.Add(node.Position + new Vector3(
                Mathf.Cos(angle) * node.Radius,
                node.Height,
                Mathf.Sin(angle) * node.Radius
            ));
        }

        // Create side triangles
        for (int i = 0; i < node.Edges; i++)
        {
            int next = (i + 1) % node.Edges;

            triangles.AddRange(new int[] {
                vertexOffset + i,
                vertexOffset + i + node.Edges,
                vertexOffset + next
            });
            triangles.AddRange(new int[] {
                vertexOffset + next,
                vertexOffset + i + node.Edges,
                vertexOffset + next + node.Edges
            });
        }

        /*// Add bottom face
        for (int i = 2; i < node.Edges; i++)
        {
            triangles.AddRange(new int[] {
                vertexOffset,
                vertexOffset + i,
                vertexOffset + (i - 1)
            });
        }*/

        // Add top face
        for (int i = 2; i < node.Edges; i++)
        {
            triangles.AddRange(new int[] {
                vertexOffset + node.Edges,
                vertexOffset + node.Edges + i,
                vertexOffset + node.Edges + (i - 1),
            });
        }
    }

    private void HandleNodeInteraction()
    {
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);

        // Reset hover states
        foreach (PolygonNode node in nodes)
        {
            node.IsHovered = false;
        }

        if (Physics.Raycast(ray, out RaycastHit hit))
        {
            // Find closest node to hit point
            PolygonNode closestNode = FindClosestNode(hit.point);
            if (closestNode != null && Vector3.Distance(hit.point, closestNode.Position) < closestNode.Radius)
            {
                closestNode.IsHovered = true;

                if (Input.GetMouseButtonDown(0))
                {
                    closestNode.IsSelected = !closestNode.IsSelected;
                }
            }
        }
    }

    private PolygonNode FindClosestNode(Vector3 point)
    {
        PolygonNode closest = null;
        float minDistance = float.MaxValue;

        foreach (PolygonNode node in nodes)
        {
            float distance = Vector3.Distance(point, node.Position);
            if (distance < minDistance)
            {
                minDistance = distance;
                closest = node;
            }
        }

        return closest;
    }

    private void UpdateNodeMaterials()
    {
        bool needsRedraw = false;

        foreach (PolygonNode node in nodes)
        {
            if (node.IsHovered || node.IsSelected)
            {
                needsRedraw = true;
                break;
            }
        }

        if (needsRedraw)
        {
            DrawNodes();
        }
    }
}
