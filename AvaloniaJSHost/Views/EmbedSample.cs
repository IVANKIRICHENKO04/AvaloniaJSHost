using Avalonia.Controls;
using Avalonia.Platform;
using AvaloniaJSHost.Classes;
using System;
using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;

namespace AvaloniaJSHost.Views
{
    public class EmbedSample : NativeControlHost
    {
        public static CustomNativeControl? Implementation { get; set; }

        JSObject JS;


        protected override IPlatformHandle CreateNativeControlCore(IPlatformHandle parent)
        {
            var handle = Implementation?.CreateControl(parent, () => base.CreateNativeControlCore(parent));
            InitializeAsync(handle.JsObject);
            return handle.PlatformHandle;
        }


        public async Task InitializeAsync(JSObject js)
        {
            await JSHost.ImportAsync("embed.js", "../embed.js");
            JS = EmdedInterop.AddElement(js);
        }
    }
}
