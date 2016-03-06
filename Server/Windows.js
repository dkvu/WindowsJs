var edge = require('edge');

var moveCursor = edge.func(
    {
        source: function() {/*
            using System.Threading.Tasks;
            using System.Runtime.InteropServices;
            using System.Drawing;
 
            public class Startup
            {
                [DllImport("user32.dll")]
                static extern bool SetCursorPos(int X, int Y);
            
                [DllImport("user32.dll")]
                [return: MarshalAs(UnmanagedType.Bool)]
                static extern bool GetCursorPos(out Point lpPoint);

                public async Task<object> Invoke(dynamic input)
                {
                    Point point;
                    GetCursorPos(out point);
                    SetCursorPos(point.X + (input.X * 3), point.Y + (input.Y * 3));
                    return 0;
                }
            }
        */
        },
        references: ["System.Drawing.dll"]
    });

var mouseEvent = edge.func(
    {
        source: function () {/*
            using System;
            using System.Threading.Tasks;
            using System.Threading;
            using System.Runtime.InteropServices;
            using System.Drawing;
 
            public class Startup
            {
                [DllImport("user32.dll")]
                [return: MarshalAs(UnmanagedType.Bool)]
                static extern bool GetCursorPos(out Point lpPoint);

                [DllImport("user32.dll", CharSet = CharSet.Auto, CallingConvention = CallingConvention.StdCall)]
                public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint cButtons, UIntPtr dwExtraInfo);

                private const uint MOUSEEVENTF_LEFTDOWN = 0x02;
                private const uint MOUSEEVENTF_LEFTUP = 0x04;

                public async Task<object> Invoke(dynamic input)
                {
                    uint events;

                    Point point;
                    GetCursorPos(out point);

                    string command = input.ToString();

                    if(command == "click")
                        events = MOUSEEVENTF_LEFTDOWN | MOUSEEVENTF_LEFTUP;
                    else if(command == "double")
                    {
                        events = MOUSEEVENTF_LEFTDOWN | MOUSEEVENTF_LEFTUP;

                        mouse_event(events, (uint)point.X, (uint)point.Y, (uint)0, (UIntPtr)0);
                        Thread.Sleep(50);
                        mouse_event(events, (uint)point.X, (uint)point.Y, (uint)0, (UIntPtr)0);
                    }
                    else if(command == "down")
                        events = MOUSEEVENTF_LEFTDOWN;
                    else if(command == "up")
                        events = MOUSEEVENTF_LEFTUP;
                    else
                        throw new Exception("Unknown Command" + command);

                    mouse_event(events, (uint)point.X, (uint)point.Y, (uint)0, (UIntPtr)0);
                    return 0;
                }
            }
        */
        },
        references: ["System.Drawing.dll"]
    });

var keyboardEvent = edge.func(
    {
        source: function () {/*
            using System;
            using System.Threading.Tasks;
            using System.Threading;
            using WindowsInput;

            public class Startup
            {
                public async Task<object> Invoke(dynamic input)
                {
                    string type = (string) input.type;
                    string command = (string) input.value;
                    
                    if( type.Equals("KeyPress", StringComparison.OrdinalIgnoreCase))
                    {
                        if( command.Equals("Enter", StringComparison.OrdinalIgnoreCase))
                            InputSimulator.SimulateKeyPress(VirtualKeyCode.RETURN);
                        else if( command.Equals("Back", StringComparison.OrdinalIgnoreCase))
                            InputSimulator.SimulateKeyPress(VirtualKeyCode.BACK);
                        else 
                            throw new Exception("KeyBoardEvent: KeyPress: Unknown command " + command);
                    }
                    else if( type.Equals("TextEntry", StringComparison.OrdinalIgnoreCase))
                        InputSimulator.SimulateTextEntry(command);
                    else
                        throw new Exception("KeyBoardEvent: Unknown type: " + type);

                    return 0;
                }
            }
        */
        },
        references: ["InputSimulator.dll"]
    });

var shutdown = edge.func(
    {
        source: function () {/*
            using System.Threading.Tasks;
            using System.Diagnostics;

            public class Startup
            {
                public async Task<object> Invoke(dynamic input)
                {
                    Process.Start("shutdown", "/s /t 0"); 
                    return 0;
                }
            }
        */
        },
        references: ["System.Drawing.dll"]
    });


function edgeCallBack(error, result) {
    if (error) throw error;
}

module.exports = {
    moveCursor: function (x, y) { moveCursor({ X: x, Y: y }, edgeCallBack); },
    mouseEvent: function (strCommand) { mouseEvent(strCommand, edgeCallBack); },
    keyboardEvent: function (type, value) { keyboardEvent({ type: type, value: value }, edgeCallBack); },
    shutdown: function() { shutdown('',edgeCallBack)}
};