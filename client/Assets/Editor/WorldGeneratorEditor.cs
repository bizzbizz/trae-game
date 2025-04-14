// MyComponentEditor.cs
using UnityEditor;
using UnityEngine;

[CustomEditor(typeof(WorldManager))]
public class WorldGeneratorEditor : Editor
{
    public override void OnInspectorGUI()
    {
        // Draw the default inspector
        DrawDefaultInspector();

        // Add a button
        WorldManager world = (WorldManager)target;
        if (GUILayout.Button("Click Me", GUILayout.Height(40)))
        {
            world.ResetWorld();
        }

        // Show a warning if the bool is true
        if (!world.LoadFromCache)
        {
            EditorGUILayout.HelpBox("Warning: 'LoadFromCache' is disabled! It will call OSM.", MessageType.Warning);
        }
    }
}
