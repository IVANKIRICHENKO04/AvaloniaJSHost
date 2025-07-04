using Avalonia.Controls;

namespace AvaloniaJSHost.Views;

public partial class MainView : UserControl
{
    public MainView()
    {
        InitializeComponent();
        ClearCanvas.Click += ClearCanvas_Click;
    }

    private void ClearCanvas_Click(object? sender, Avalonia.Interactivity.RoutedEventArgs e)
    {
        CanvasOne.Clear();
        CanvasTwo.Clear();
        CanvasThree.Clear();
    }
}
