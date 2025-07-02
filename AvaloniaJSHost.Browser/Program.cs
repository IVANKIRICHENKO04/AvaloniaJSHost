using Avalonia;
using Avalonia.Browser;
using AvaloniaJSHost;
using AvaloniaJSHost.Views;
using System.Runtime.Versioning;
using System.Threading.Tasks;



[assembly: SupportedOSPlatform("browser")]
#nullable enable

internal sealed partial class Program
{
    private static async Task Main(string[] args)
    {
        BuildAvaloniaApp()
            .WithInterFont()
            .AfterSetup(_ =>
            {
                EmbedSample.Implementation = new EmbedSampleWeb();
            })
            .StartBrowserAppAsync("out");
    }
    public static AppBuilder BuildAvaloniaApp()
        => AppBuilder.Configure<App>();
}
