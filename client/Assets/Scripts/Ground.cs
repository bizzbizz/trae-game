using UnityEngine;

public class Ground : MonoBehaviour
{
    [Header("Ground Settings")]
    [SerializeField] private float size = 100f;
    [SerializeField] private Material groundMaterial;

    private void Awake()
    {
        // Create a plane mesh for the ground
        var meshFilter = gameObject.AddComponent<MeshFilter>();
        var meshRenderer = gameObject.AddComponent<MeshRenderer>();

        // Set up the mesh
        var mesh = new Mesh();
        mesh.vertices = new Vector3[]
        {
            new Vector3(-size, 0, -size),
            new Vector3(size, 0, -size),
            new Vector3(size, 0, size),
            new Vector3(-size, 0, size)
        };

        mesh.triangles = new int[] { 0, 2, 1, 0, 3, 2 };

        // Calculate UVs for proper texture mapping
        mesh.uv = new Vector2[]
        {
            new Vector2(0, 0),
            new Vector2(1, 0),
            new Vector2(1, 1),
            new Vector2(0, 1)
        };

        mesh.RecalculateNormals();
        mesh.RecalculateBounds();

        // Assign the mesh and material
        meshFilter.mesh = mesh;
        if (groundMaterial != null)
            meshRenderer.material = groundMaterial;
        else
            meshRenderer.material = new Material(Shader.Find("Universal Render Pipeline/2D/Sprite-Unlit-Default"));
    }
}
