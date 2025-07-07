using Avalonia.Controls;
using Avalonia.Platform;
using AvaloniaJSHost.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.JavaScript;
using System.Text;
using System.Threading.Tasks;

namespace AvaloniaJSHost.Views
{
    public class PlotlyControl : NativeControlHost
    {

        JSObject JS;

        protected override IPlatformHandle CreateNativeControlCore(IPlatformHandle parent)
        {
            var handle = SharredJsHost.Implementation?.CreateControl(parent, () => base.CreateNativeControlCore(parent));
            InitializeAsync(handle.JsObject);
            return handle.PlatformHandle;
        }

        public async Task InitializeAsync(JSObject js)
        {
            await JSHost.ImportAsync("PlotlyModule.js", "../PlotlyModule.js");
            JS = PlotlyInterop.AddPlotlyElement(js);
        }
    }
}
