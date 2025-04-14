using UnityEngine;

public class Clickable : MonoBehaviour
{
    public Animation Animation { get; set; }
    private void Awake()
    {
        if (Animation is null)
        {
            Animation = new Animation
            {
                Material = GetComponent<Renderer>().material
            };
        }
    }

    void OnMouseDown()
    {
        Animation.Start();
    }

    private void Update()
    {
        Animation.Update();
    }

    public bool IsSelectable { get; set; }
    public bool IsSelected { get; set; }

    public ClickInstruction ClickInstruction { get; set; }

    public void Clicked()
    {
        if (IsSelectable)
        {
            IsSelected = !IsSelected;
        }

        if (ClickInstruction is not null)
        {
            if (IsSelected)
            {
                ClickInstruction.OpenPanel();
            }
            else
            {
                ClickInstruction.ClosePanel();
            }
        }
    }
}
