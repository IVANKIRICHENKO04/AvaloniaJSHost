using System.Runtime.InteropServices.JavaScript;
using Avalonia.Platform;
using System;

namespace AvaloniaJSHost.Classes
{
    public abstract class CustomNativeControl
    {
        public abstract IPlatformHandle CreateControl(IPlatformHandle parent, Func<IPlatformHandle> createDefault);

        public JSObject Parent { get; set; }
    }
}
