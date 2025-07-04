using Avalonia.Browser;
using Avalonia.Platform;
using AvaloniaJSHost.Classes;
using System;
using System.Runtime.InteropServices.JavaScript;

namespace AvaloniaJSHost.Views
{
    internal class EmbedSampleWeb : CustomNativeControl
    {
        public override IPlatformHandle CreateControl(IPlatformHandle parent, Func<IPlatformHandle> createDefault)
        {
            var parentContainer = (JSObjectControlHandle)createDefault();
            ImportJsModules(parentContainer.Object);
            return parentContainer;
        }
        static async void ImportJsModules(JSObject parent)
        {
            await JSHost.ImportAsync("embed.js", "../embed.js");
            EmbedInterop.AddElement(parent);
        }

    }
    internal static partial class EmbedInterop
    {
        [JSImport("AddElement", "embed.js")]
        public static partial void AddElement(JSObject parentObject);
    }
}
