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
            //if (isSecond)
            //{
            //    var iframe = EmbedInterop.CreateElement("iframe");
            //    iframe.SetProperty("src", "https://www.youtube.com/embed/kZCIporjJ70");

            //    return new JSObjectControlHandle(iframe);
            //}
            //else
            //{
                var parentContainer = (JSObjectControlHandle)createDefault();

                AddButton(parentContainer.Object);

                return parentContainer;

                static async void AddButton(JSObject parent)
                {
                    await JSHost.ImportAsync("embed.js", "../embed.js");
                    EmbedInterop.AddElement(parent);
                }
            //}
        }
    }

    internal static partial class EmbedInterop
    {
        [JSImport("globalThis.document.createElement")]
        public static partial JSObject CreateElement(string tagName);

        [JSImport("AddElement", "embed.js")]
        public static partial void AddElement(JSObject parentObject);
    }

}
