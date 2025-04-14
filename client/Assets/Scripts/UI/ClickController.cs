using UnityEngine;

public class ClickController : MonoBehaviour
{
    void Update()
    {
        if (Input.GetMouseButtonDown(0)) // Left click
        {
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            if (Physics.Raycast(ray, out RaycastHit hit))
            {
                Debug.Log("Clicked: " + hit.collider.gameObject.name);
                hit.collider.GetComponent<Clickable>().Clicked();
            }
        }
    }
}
