using Avalonia;
using Avalonia.Controls;
using Avalonia.Input;
using Avalonia.Markup.Xaml;

namespace AvaloniaJSHost.Views;

public partial class PlotlyWrapper : UserControl
{
    public PlotlyWrapper()
    {
        InitializeComponent();
    }

    private void OnOverlayPointerPressed(object? sender, PointerPressedEventArgs e)
    {
        var p = e.GetPosition(PlotlyHost);
        PlotlyHost.ForwardJsEvent("pointerdown", p);
        e.Handled = true;
    }

    private void OnOverlayPointerReleased(object? sender, PointerReleasedEventArgs e)
    {
        var p = e.GetPosition(PlotlyHost);
        PlotlyHost.ForwardJsEvent("pointerup", p);
        e.Handled = true;
    }

    private void OnOverlayPointerMoved(object? sender, PointerEventArgs e)
    {
        var p = e.GetPosition(PlotlyHost);
        PlotlyHost.ForwardJsEvent("pointermove", p);
        // e.Handled = false — чтобы, при желании, Avalonia всё же могла показывать hover‑эффекты на оверлее
    }
}