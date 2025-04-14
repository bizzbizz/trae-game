using System;
using UnityEngine;

public class CameraController : MonoBehaviour
{
    [Header("Movement Settings")]
    [SerializeField] private float moveSpeed = 20f;
    [SerializeField] private float edgeScrollThreshold = 20f;
    [SerializeField] private float rotationSpeed = 100f;
    [SerializeField] private float zoomSpeed = 4f;
    [SerializeField] private float minZoom = 10f;
    [SerializeField] private float maxZoom = 50f;
    [SerializeField] private float smoothTime = 0.3f;
    //[SerializeField] private Camera mainCamera;

    public bool ScrollEdges { get; set; } = false;

    private Vector3 targetPosition;
    private float targetZoom;
    private Vector3 currentVelocity;
    private float zoomVelocity;

    private void Start()
    {
        targetPosition = transform.position;
        targetZoom = Camera.main.orthographicSize;
    }

    private void Update()
    {
        HandleKeyboardInput();
        HandleMouseInput();
        HandleZoom();
        HandleRotation();
        UpdateCameraPosition();
    }

    private void HandleKeyboardInput()
    {
        Vector3 input = new(Input.GetAxisRaw("Horizontal"), 0, Input.GetAxisRaw("Vertical"));
        targetPosition += moveSpeed * Time.deltaTime * transform.TransformDirection(input);
    }

    private void HandleMouseInput()
    {
        Vector3 mousePos = Input.mousePosition;

        if (ScrollEdges)
        {
            if (mousePos.x < edgeScrollThreshold)
                targetPosition += -moveSpeed * Time.deltaTime * transform.right;
            else if (mousePos.x > Screen.width - edgeScrollThreshold)
                targetPosition += moveSpeed * Time.deltaTime * transform.right;

            if (mousePos.y < edgeScrollThreshold)
                targetPosition += -moveSpeed * Time.deltaTime * transform.forward;
            else if (mousePos.y > Screen.height - edgeScrollThreshold)
                targetPosition += moveSpeed * Time.deltaTime * transform.forward;
        }
    }

    private void HandleZoom()
    {
        float scrollInput = Input.GetAxis("Mouse ScrollWheel");
        targetZoom = Mathf.Clamp(targetZoom - scrollInput * zoomSpeed, minZoom, maxZoom);
        Camera.main.orthographicSize = Mathf.SmoothDamp(Camera.main.orthographicSize, targetZoom, ref zoomVelocity, smoothTime);
    }

    private void HandleRotation()
    {
        if (Input.GetKey(KeyCode.Q))
            transform.Rotate(Vector3.up, -rotationSpeed * Time.deltaTime, Space.World);
        else if (Input.GetKey(KeyCode.E))
            transform.Rotate(Vector3.up, rotationSpeed * Time.deltaTime, Space.World);
    }

    private void UpdateCameraPosition()
    {
        transform.position = Vector3.SmoothDamp(transform.position, targetPosition, ref currentVelocity, smoothTime);
    }


    internal Ray ScreenPointToRay(Vector3 mousePosition)
    {
        if (Camera.main == null)
        {
            Debug.LogError("Main Camera is not assigned!");
            return new Ray(); // return a default ray to avoid null issues
        }

        return Camera.main.ScreenPointToRay(mousePosition);
    }

}
