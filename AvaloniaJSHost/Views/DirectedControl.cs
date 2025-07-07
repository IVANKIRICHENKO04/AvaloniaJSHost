using Avalonia.Controls;
using Avalonia.Platform;
using AvaloniaJSHost.Classes;
using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;

namespace AvaloniaJSHost.Views
{
    public class DirectedControl : NativeControlHost
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
            await JSHost.ImportAsync("DirectedModule.js", "../DirectedModule.js");
            JS = DirectedInterop.AddElement(js);
        } 


        public void Clear()
        {
            DirectedInterop.ClearCanvas(JS);
        }

    }
}
