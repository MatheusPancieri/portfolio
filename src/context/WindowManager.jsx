import { createContext, useContext, useReducer, useRef } from "react";

const WindowsContext = createContext(null);

const TASKBAR_H = 56;

function cascadePosition(index, w, h) {
  const vw = window.innerWidth;
  const vh = window.innerHeight - TASKBAR_H;
  const baseX = Math.max(24, (vw - w) / 2 - 120);
  const baseY = Math.max(16, (vh - h) / 2 - 40);
  return {
    x: Math.min(baseX + (index % 5) * 36, Math.max(8, vw - w - 8)),
    y: Math.min(baseY + (index % 5) * 28, Math.max(8, vh - h - 8)),
  };
}

function reducer(state, action) {
  const { windows } = state;
  const find = (id) => windows.find((w) => w.id === id);

  switch (action.type) {
    case "open": {
      const existing = find(action.id);
      if (existing) {
        return reducer(
          existing.minimized
            ? { ...state, windows: windows.map((w) => w.id === action.id ? { ...w, minimized: false } : w) }
            : state,
          { type: "focus", id: action.id }
        );
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight - TASKBAR_H;
      const w = Math.min(action.spec.w, vw - 24);
      const h = Math.min(action.spec.h, vh - 24);
      const pos = cascadePosition(state.spawned, w, h);
      return {
        ...state,
        spawned: state.spawned + 1,
        topZ: state.topZ + 1,
        windows: [
          ...windows,
          {
            id: action.id,
            x: pos.x,
            y: pos.y,
            w,
            h,
            z: state.topZ + 1,
            minimized: false,
            maximized: false,
            closing: false,
            iconRect: action.iconRect,
          },
        ],
      };
    }
    case "focus": {
      const win = find(action.id);
      if (!win || win.z === state.topZ) return state;
      return {
        ...state,
        topZ: state.topZ + 1,
        windows: windows.map((w) =>
          w.id === action.id ? { ...w, z: state.topZ + 1 } : w
        ),
      };
    }
    case "close":
      return {
        ...state,
        windows: windows.map((w) =>
          w.id === action.id ? { ...w, closing: true } : w
        ),
      };
    case "destroy":
      return { ...state, windows: windows.filter((w) => w.id !== action.id) };
    case "minimize":
      return {
        ...state,
        windows: windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w
        ),
      };
    case "restore":
      return reducer(
        {
          ...state,
          windows: windows.map((w) =>
            w.id === action.id ? { ...w, minimized: false } : w
          ),
        },
        { type: "focus", id: action.id }
      );
    case "move":
      return {
        ...state,
        windows: windows.map((w) =>
          w.id === action.id ? { ...w, x: action.x, y: action.y } : w
        ),
      };
    case "toggleMax":
      return {
        ...state,
        windows: windows.map((w) =>
          w.id === action.id ? { ...w, maximized: !w.maximized } : w
        ),
      };
    default:
      return state;
  }
}

export const WindowsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    windows: [],
    topZ: 10,
    spawned: 0,
  });

  // stable API object so consumers don't re-render on every dispatch
  const api = useRef({
    open: (id, spec, iconRect) => dispatch({ type: "open", id, spec, iconRect }),
    close: (id) => dispatch({ type: "close", id }),
    destroy: (id) => dispatch({ type: "destroy", id }),
    minimize: (id) => dispatch({ type: "minimize", id }),
    restore: (id) => dispatch({ type: "restore", id }),
    focus: (id) => dispatch({ type: "focus", id }),
    move: (id, x, y) => dispatch({ type: "move", id, x, y }),
    toggleMax: (id) => dispatch({ type: "toggleMax", id }),
  }).current;

  return (
    <WindowsContext.Provider value={{ windows: state.windows, ...api }}>
      {children}
    </WindowsContext.Provider>
  );
};

export const useWindows = () => useContext(WindowsContext);
export { TASKBAR_H };
