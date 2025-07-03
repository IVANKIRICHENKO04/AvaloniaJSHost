using Avalonia.Controls;
using Avalonia.Platform;
using System;

namespace AvaloniaJSHost.Views
{
    public class EmbedSample : NativeControlHost
    {
        public static INativeDemoControl? Implementation { get; set; }

        static EmbedSample()
        {

        }

        protected override IPlatformHandle CreateNativeControlCore(IPlatformHandle parent)
        {
            return Implementation?.CreateControl(parent, () => base.CreateNativeControlCore(parent))
                ?? base.CreateNativeControlCore(parent);
        }
    }

    public interface INativeDemoControl
    {
        /// <param name="parent"></param>
        /// <param name="createDefault"></param>
        IPlatformHandle CreateControl(IPlatformHandle parent, Func<IPlatformHandle> createDefault);
    }
}
