using Avalonia.Controls;
using Avalonia.Platform;
using AvaloniaJSHost.Classes;
using System.Text.Json.Nodes;

namespace AvaloniaJSHost.Views
{
    public class DirectedControl : NativeControlHost
    {
        public static CustomNativeControl? Implementation { get; set; }

        protected override IPlatformHandle CreateNativeControlCore(IPlatformHandle parent)
        {
            var handle = Implementation?.CreateControl(parent, () => base.CreateNativeControlCore(parent))
             ?? base.CreateNativeControlCore(parent);

            return handle;
        }

        public void Clear()
        {
            DirectedInterop.ClearCanvas(Implementation.Parent);
        }

    }
}
