using Avalonia.Browser;
using Avalonia.Platform;
using AvaloniaJSHost.Classes;
using System;
using System.Runtime.InteropServices.JavaScript;

namespace AvaloniaJSHost.Browser
{
    public class DirectedControlWeb : CustomNativeControl
    {
        public override JsControlHandle CreateControl(IPlatformHandle parent, Func<IPlatformHandle> createDefault)
        {
            var parentContainer = (JSObjectControlHandle)createDefault();
            JsControlHandle handle = new(parentContainer, parentContainer.Object);
            return handle;
        }
    }
}
