using Avalonia;
using Avalonia.Controls;
using Avalonia.Input;
using Avalonia.Platform;
using AvaloniaJSHost.Classes;
using System.ComponentModel;
using System.Runtime.InteropServices.JavaScript;
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

        // helper: форвардим событие в JS
        public void ForwardJsEvent(string type, Point p)
        {
            //PlotlyInterop.EnablePointerForwarding(JS);
        }
    }
}
