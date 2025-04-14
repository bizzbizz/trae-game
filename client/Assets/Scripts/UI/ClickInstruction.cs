using System;
using UnityEngine;

public class ClickInstruction
{
    public PanelController OpeningPanel { get; set; }

    internal void OpenPanel()
    {

        OpeningPanel.gameObject.SetActive(true);
    }

    internal void ClosePanel()
    {
        OpeningPanel.gameObject.SetActive(false);
    }
}

public class Animation
{
    public Material Material { get; set; }
    private Color _startColor = Color.white;
    private Color _targetColor = Color.white;

    public float _duration { get; set; } = 0.2f;
    private float _timeElapsed = 0f;

    private bool _isPlaying;

    internal void Start(bool deselect = false)
    {
        _timeElapsed = 0f;
        _isPlaying = true;

        if(deselect)
        {
            _startColor = Color.gray;
        }
        else
        {
            _startColor = Color.cyan;
        }
    }

    internal void Update()
    {
        if (_isPlaying)
        {
            _timeElapsed += Time.deltaTime;
            float t = _timeElapsed / _duration;
            Material.color = Color.Lerp(_startColor, _targetColor, t);
            if (t >= 1f)
            {
                _isPlaying = false;
            }
        }
    }
}
