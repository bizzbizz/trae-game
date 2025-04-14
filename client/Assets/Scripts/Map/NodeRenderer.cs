using UnityEngine;
using System.Collections.Generic;
using System.Linq;

[DisallowMultipleComponent]
public class NodeRenderer : MonoBehaviour
{
    private MeshFilter meshFilter;
    private MeshRenderer meshRenderer;
    private MeshCollider meshCollider;
    private Mesh mesh;
    private List<Vector3> vertices;
    private List<int> triangles;
    private BaseNode node;

    void Awake()
    {
        //Initialize();
        //DrawNodes();
    }
    private void Update()
    {
        HandleNodeInteraction();
        UpdateNodeMaterials();
    }
    public void GenerateNodes(NodeType type, IEnumerable<Element> osmNodes)
    {
        Initialize();
    
        if (osmNodes == null || !osmNodes.Any())
        {
            Debug.LogWarning("No OSM nodes provided to generate");
            gameObject.SetActive(false);
            return;
        }
    
        var validNodes = osmNodes.Where(x => x != null && x.lat != 0 && x.lon != 0);
        if (!validNodes.Any())
        {
            Debug.LogWarning("No valid OSM nodes found");
            gameObject.SetActive(false);
            return;
        }
    
        node = new PolygonNode(validNodes.Select(x => new Vector3(x.lat, 0, x.lon)).ToArray());
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
    }

    private void DrawNodes()
    {
        vertices.Clear();
        triangles.Clear();

        //// Create sample nodes with different shapes
        //nodes.Add(new PolygonNode(new Vector3(-2, 0, 0), 4));  // Square
        //nodes.Add(new PolygonNode(new Vector3(0, 0, 0), 6));   // Hexagon
        //nodes.Add(new PolygonNode(new Vector3(2, 0, 0), 8));   // Octagon

        CreateNode(node);

        mesh.vertices = vertices.ToArray();
        mesh.triangles = triangles.ToArray();
        mesh.RecalculateNormals();

        // Update mesh collider
        GetComponent<MeshCollider>().sharedMesh = null;
        GetComponent<MeshCollider>().sharedMesh = mesh;
    }

    private void CreateNode(BaseNode node)
    {
        switch (node.NodeType)
        {
            case NodeType.Polygon: CreateNode(node as PolygonNode); break;
            case NodeType.UniformPolygon: CreateNode(node as UniformPolygonNode); break;
        }
    }
    private void CreateNode(PolygonNode node)
    {
        int vertexOffset = vertices.Count;

        // Add bottom vertices
        foreach (Vector3 point in node.Positions)
        {
            vertices.Add(point);
        }

        // Add top vertices
        foreach (Vector3 point in node.Positions)
        {
            vertices.Add(new Vector3(point.x, node.Height, point.z));
        }

        int pointCount = node.Positions.Length;

        // Create side triangles
        for (int i = 0; i < pointCount; i++)
        {
            int next = (i + 1) % pointCount;

            // First triangle of the side
            triangles.AddRange(new int[] {
            vertexOffset + i,
            vertexOffset + i + pointCount,
            vertexOffset + next
        });

            // Second triangle of the side
            triangles.AddRange(new int[] {
            vertexOffset + next,
            vertexOffset + i + pointCount,
            vertexOffset + next + pointCount
        });
        }

        // Add top face (triangulate the polygon)
        for (int i = 2; i < pointCount; i++)
        {
            triangles.AddRange(new int[] {
            vertexOffset + pointCount,
            vertexOffset + pointCount + i,
            vertexOffset + pointCount + (i - 1)
        });
        }
    }
    private void CreateNode(UniformPolygonNode node)
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
        if(node == null)
        {
            Debug.Log("node is not found");
            return;
        }

        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);

        // Reset hover states
        node.IsHovered = false;

        if (Physics.Raycast(ray, out RaycastHit hit))
        {
            //if ( Vector3.Distance(hit.point, node.Position) < closestNode.Radius)
            {
                node.IsHovered = true;

                if (Input.GetMouseButtonDown(0))
                {
                    node.IsSelected = !node.IsSelected;
                }
            }
        }
    }

    private void UpdateNodeMaterials()
    {
        bool needsRedraw = false;

        if (node.IsHovered || node.IsSelected)
        {
            needsRedraw = true;
        }

        if (needsRedraw)
        {
            DrawNodes();
        }
    }
}
