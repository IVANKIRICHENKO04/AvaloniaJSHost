using Avalonia.Browser;
using Avalonia.Platform;
using System;
using System.Runtime.InteropServices.JavaScript;

namespace AvaloniaJSHost.Views
{
    internal class EmbedSampleWeb : INativeDemoControl
    {
        public IPlatformHandle CreateControl(IPlatformHandle parent, Func<IPlatformHandle> createDefault)
        {
            var parentContainer = (JSObjectControlHandle)createDefault();

            AddEllemnt(parentContainer.Object);

            return parentContainer;

            static async void AddEllemnt(JSObject parent)
            {
                await JSHost.ImportAsync("embed.js", "../embed.js");
                EmbedInterop.AddElement(parent);
            }
        }
    }

    internal static partial class EmbedInterop
    {
        [JSImport("AddElement", "embed.js")]
        public static partial void AddElement(JSObject parentObject);
    }

}
