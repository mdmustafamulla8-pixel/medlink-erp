import { r as reactExports, j as jsxRuntimeExports, N as cn } from "./index-D0FyCSZw.js";
import { S as Search, I as Input, X } from "./EmptyState-npLLL3hK.js";
function SearchInput({
  placeholder = "Search...",
  value: controlled,
  onChange,
  onClear,
  autoFocus,
  className,
  shortcut,
  "data-ocid": dataOcid
}) {
  const [internalValue, setInternalValue] = reactExports.useState("");
  const isControlled = controlled !== void 0;
  const value = isControlled ? controlled : internalValue;
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    if (autoFocus) (_a = inputRef.current) == null ? void 0 : _a.focus();
  }, [autoFocus]);
  const handleChange = (e) => {
    const val = e.target.value;
    if (!isControlled) setInternalValue(val);
    onChange == null ? void 0 : onChange(val);
  };
  const handleClear = () => {
    var _a;
    if (!isControlled) setInternalValue("");
    onChange == null ? void 0 : onChange("");
    onClear == null ? void 0 : onClear();
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        ref: inputRef,
        type: "search",
        placeholder,
        value,
        onChange: handleChange,
        className: "pl-9 pr-8 h-9 text-sm",
        "data-ocid": dataOcid
      }
    ),
    value ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleClear,
        className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
        "aria-label": "Clear search",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
      }
    ) : shortcut ? /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono", children: shortcut }) : null
  ] });
}
export {
  SearchInput as S
};
