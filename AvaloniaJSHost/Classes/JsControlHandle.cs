using Avalonia.Platform;
using System.Runtime.InteropServices.JavaScript;

namespace AvaloniaJSHost.Classes
{
    public class JsControlHandle
    {
        public IPlatformHandle PlatformHandle { get; }
        public JSObject JsObject { get; }

        public JsControlHandle(IPlatformHandle platformHandle, JSObject jsObject)
        {
            PlatformHandle = platformHandle;
            JsObject = jsObject;
        }
    }
}
