using Avalonia.Browser;
using Avalonia.Platform;
using AvaloniaJSHost.Classes;
using AvaloniaJSHost.Views;
using System;
using System.Runtime.InteropServices.JavaScript;

namespace AvaloniaJSHost.Browser
{
    public class DirectedControlWeb : CustomNativeControl
    {
        public override IPlatformHandle CreateControl(IPlatformHandle parent, Func<IPlatformHandle> createDefault)
        {
            var parentContainer = (JSObjectControlHandle)createDefault();
            ImportJsModules(parentContainer.Object);

            
            return parentContainer;
        }
        async void ImportJsModules(JSObject parent)
        {
            await JSHost.ImportAsync("DirectedModule.js", "../DirectedModule.js");
            Parent = DirectedInterop.AddElement(parent);
        }
    }

    //internal static partial class DirectedInterop
    //{
    //    [JSImport("AddElement", "DirectedModule.js")]
    //    public static partial void AddElement(JSObject parentObject);

    //    [JSImport("ClearCanvas", "DirectedModule.js")]
    //    public static partial void ClearCanvas(JSObject canvas);
    //}
}
