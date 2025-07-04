using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace AvaloniaJSHost.Views;

public partial class NativeHost : UserControl
{
    public NativeHost()
    {
        InitializeComponent();
        ClearCanvas.Click += ClearCanvas_Click;
    }

    private void ClearCanvas_Click(object? sender, Avalonia.Interactivity.RoutedEventArgs e)
    {
        JSCanvas.Clear();
    }
}