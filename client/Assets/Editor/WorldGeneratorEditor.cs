// MyComponentEditor.cs
using UnityEditor;
using UnityEngine;

[CustomEditor(typeof(WorldGenerator))]
public class WorldGeneratorEditor : Editor
{
    public override void OnInspectorGUI()
    {
        // Draw the default inspector
        DrawDefaultInspector();

        // Add a button
        WorldGenerator worldGenerator = (WorldGenerator)target;
        if (GUILayout.Button("Click Me", GUILayout.Height(40)))
        {
            worldGenerator.Generate();
        }
    }
}
