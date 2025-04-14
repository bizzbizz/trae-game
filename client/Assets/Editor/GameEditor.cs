using UnityEditor;
using UnityEngine;

[CustomEditor(typeof(GameManager))]
public class MyGameLogicEditor : Editor
{
    public override void OnInspectorGUI()
    {
        DrawDefaultInspector();

        GameManager script = (GameManager)target;

        if (GUILayout.Button("Create all"))
        {
            script.InstantiateAll();
        }
    }
}
