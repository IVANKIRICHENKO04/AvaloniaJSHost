using System.Runtime.InteropServices.JavaScript;

namespace AvaloniaJSHost.Classes
{
    public static partial class EmdedInterop
    {
        [JSImport("AddElement", "embed.js")]
        public static partial JSObject AddElement(JSObject parentObject);
    }

    public static partial class DirectedInterop
    {
        [JSImport("AddElement", "DirectedModule.js")]
        public static partial JSObject AddElement(JSObject parentObject);

        [JSImport("ClearCanvas", "DirectedModule.js")]
        public static partial void ClearCanvas(JSObject canvas);
    }
}
