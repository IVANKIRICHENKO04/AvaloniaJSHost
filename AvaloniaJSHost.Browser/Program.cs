﻿using Avalonia;
using Avalonia.Browser;
using AvaloniaJSHost;
using AvaloniaJSHost.Browser;
using AvaloniaJSHost.Classes;
using System.Runtime.Versioning;
using System.Threading.Tasks;



[assembly: SupportedOSPlatform("browser")]
#nullable enable

internal sealed partial class Program
{
    private static async Task Main(string[] args)
    {
        _ = BuildAvaloniaApp()
            .WithInterFont()
            .AfterSetup(_ =>
            {
                SharredJsHost.Implementation = new DirectedControlWeb();
            })
            .StartBrowserAppAsync("out");
    }
    public static AppBuilder BuildAvaloniaApp()
        => AppBuilder.Configure<App>();
}
