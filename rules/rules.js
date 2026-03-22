/*
  RULE HANDLERS
  Each rule: { test: RegExp, apply: (match) => CSSObject | null }
*/
import { color, px, sides } from "../utils/helpers.js";
import {
  COLORS,
  FONT_SIZES,
  ROUNDED,
  SHADOWS,
  FONT_WEIGHTS,
  MAX_WIDTHS,
  LEADING,
  TRACKING,
} from "../config/tokens.js";

export const rules = [
  /* PADDING */
  { test: /^p-(\d+\.?\d*)$/, apply: (m) => sides(m[1], "padding") },
  {
    test: /^px-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { paddingLeft: v, paddingRight: v } : null;
    },
  },
  {
    test: /^py-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { paddingTop: v, paddingBottom: v } : null;
    },
  },
  {
    test: /^pt-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { paddingTop: v } : null;
    },
  },
  {
    test: /^pb-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { paddingBottom: v } : null;
    },
  },
  {
    test: /^pl-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { paddingLeft: v } : null;
    },
  },
  {
    test: /^pr-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { paddingRight: v } : null;
    },
  },

  /* MARGIN */
  { test: /^m-(\d+\.?\d*)$/, apply: (m) => sides(m[1], "margin") },
  {
    test: /^mx-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { marginLeft: v, marginRight: v } : null;
    },
  },
  {
    test: /^my-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { marginTop: v, marginBottom: v } : null;
    },
  },
  {
    test: /^mt-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { marginTop: v } : null;
    },
  },
  {
    test: /^mb-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { marginBottom: v } : null;
    },
  },
  {
    test: /^ml-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { marginLeft: v } : null;
    },
  },
  {
    test: /^mr-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { marginRight: v } : null;
    },
  },
  {
    test: /^mx-auto$/,
    apply: () => ({ marginLeft: "auto", marginRight: "auto" }),
  },
  {
    test: /^my-auto$/,
    apply: () => ({ marginTop: "auto", marginBottom: "auto" }),
  },
  { test: /^m-auto$/, apply: () => ({ margin: "auto" }) },

  /* BACKGROUND */
  {
    test: /^bg-(.+)$/,
    apply: (m) => {
      const c = color(m[1]);
      return c ? { backgroundColor: c } : null;
    },
  },

  /* TEXT COLOR */
  {
    test: /^text-(.+)$/,
    apply: (m) => {
      const c = color(m[1]);
      // Only apply color if it resolves to something known (color names, hex-brackets)
      if (c && (COLORS[m[1]] || m[1].startsWith("["))) return { color: c };
      return null;
    },
  },

  /* FONT SIZE */
  {
    test: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
    apply: (m) => {
      const s = FONT_SIZES[m[1]];
      return s ? { fontSize: s[0], lineHeight: s[1] } : null;
    },
  },

  /* TEXT ALIGN */
  {
    test: /^text-(left|center|right|justify|start|end)$/,
    apply: (m) => ({ textAlign: m[1] }),
  },

  /* FONT WEIGHT */
  {
    test: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
    apply: (m) => {
      return FONT_WEIGHTS[m[1]] ? { fontWeight: FONT_WEIGHTS[m[1]] } : null;
    },
  },

  /* FONT STYLE */
  { test: /^italic$/, apply: () => ({ fontStyle: "italic" }) },
  { test: /^not-italic$/, apply: () => ({ fontStyle: "normal" }) },

  /* TEXT TRANSFORM */
  { test: /^uppercase$/, apply: () => ({ textTransform: "uppercase" }) },
  { test: /^lowercase$/, apply: () => ({ textTransform: "lowercase" }) },
  { test: /^capitalize$/, apply: () => ({ textTransform: "capitalize" }) },
  { test: /^normal-case$/, apply: () => ({ textTransform: "none" }) },

  /* TEXT DECORATION */
  { test: /^underline$/, apply: () => ({ textDecoration: "underline" }) },
  { test: /^overline$/, apply: () => ({ textDecoration: "overline" }) },
  { test: /^line-through$/, apply: () => ({ textDecoration: "line-through" }) },
  { test: /^no-underline$/, apply: () => ({ textDecoration: "none" }) },

  /* LINE HEIGHT */
  {
    test: /^leading-(\w+)$/,
    apply: (m) => {
      if (LEADING[m[1]] !== undefined) return { lineHeight: LEADING[m[1]] };
      const n = parseFloat(m[1]);
      return isNaN(n) ? null : { lineHeight: n };
    },
  },

  /* LETTER SPACING */
  {
    test: /^tracking-(\w+)$/,
    apply: (m) => (TRACKING[m[1]] ? { letterSpacing: TRACKING[m[1]] } : null),
  },

  /* WORD BREAK / WHITESPACE */
  {
    test: /^whitespace-(normal|nowrap|pre|pre-wrap|pre-line|break-spaces)$/,
    apply: (m) => ({ whiteSpace: m[1] }),
  },
  {
    test: /^break-(normal|words|all|keep)$/,
    apply: (m) => ({
      wordBreak: m[1] === "normal" ? "normal" : `break-${m[1]}`,
    }),
  },
  {
    test: /^truncate$/,
    apply: () => ({
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
  },

  /* BORDERS */
  {
    test: /^border$/,
    apply: () => ({ borderWidth: "1px", borderStyle: "solid" }),
  },
  {
    test: /^border-(\d+)$/,
    apply: (m) => ({ borderWidth: `${m[1]}px`, borderStyle: "solid" }),
  },
  {
    test: /^border-t(-\d+)?$/,
    apply: (m) => ({
      borderTopWidth: m[1] ? `${m[1].slice(1)}px` : "1px",
      borderTopStyle: "solid",
    }),
  },
  {
    test: /^border-b(-\d+)?$/,
    apply: (m) => ({
      borderBottomWidth: m[1] ? `${m[1].slice(1)}px` : "1px",
      borderBottomStyle: "solid",
    }),
  },
  {
    test: /^border-l(-\d+)?$/,
    apply: (m) => ({
      borderLeftWidth: m[1] ? `${m[1].slice(1)}px` : "1px",
      borderLeftStyle: "solid",
    }),
  },
  {
    test: /^border-r(-\d+)?$/,
    apply: (m) => ({
      borderRightWidth: m[1] ? `${m[1].slice(1)}px` : "1px",
      borderRightStyle: "solid",
    }),
  },
  {
    test: /^border-(solid|dashed|dotted|double|none)$/,
    apply: (m) => ({ borderStyle: m[1] }),
  },
  {
    test: /^border-(.+)$/,
    apply: (m) => {
      const c = color(m[1]);
      return c ? { borderColor: c } : null;
    },
  },

  /* BORDER RADIUS */
  { test: /^rounded$/, apply: () => ({ borderRadius: ROUNDED[""] }) },
  {
    test: /^rounded-(none|sm|md|lg|xl|2xl|3xl|full)$/,
    apply: (m) => ({ borderRadius: ROUNDED[m[1]] || null }),
  },
  {
    test: /^rounded-t-(none|sm|md|lg|xl|2xl|3xl|full)$/,
    apply: (m) => {
      const r = ROUNDED[m[1]];
      return r ? { borderTopLeftRadius: r, borderTopRightRadius: r } : null;
    },
  },
  {
    test: /^rounded-b-(none|sm|md|lg|xl|2xl|3xl|full)$/,
    apply: (m) => {
      const r = ROUNDED[m[1]];
      return r
        ? { borderBottomLeftRadius: r, borderBottomRightRadius: r }
        : null;
    },
  },
  {
    test: /^rounded-l-(none|sm|md|lg|xl|2xl|3xl|full)$/,
    apply: (m) => {
      const r = ROUNDED[m[1]];
      return r ? { borderTopLeftRadius: r, borderBottomLeftRadius: r } : null;
    },
  },
  {
    test: /^rounded-r-(none|sm|md|lg|xl|2xl|3xl|full)$/,
    apply: (m) => {
      const r = ROUNDED[m[1]];
      return r ? { borderTopRightRadius: r, borderBottomRightRadius: r } : null;
    },
  },
  {
    test: /^rounded-tl-(none|sm|md|lg|xl|2xl|3xl|full)$/,
    apply: (m) => {
      const r = ROUNDED[m[1]];
      return r ? { borderTopLeftRadius: r } : null;
    },
  },
  {
    test: /^rounded-tr-(none|sm|md|lg|xl|2xl|3xl|full)$/,
    apply: (m) => {
      const r = ROUNDED[m[1]];
      return r ? { borderTopRightRadius: r } : null;
    },
  },
  {
    test: /^rounded-bl-(none|sm|md|lg|xl|2xl|3xl|full)$/,
    apply: (m) => {
      const r = ROUNDED[m[1]];
      return r ? { borderBottomLeftRadius: r } : null;
    },
  },
  {
    test: /^rounded-br-(none|sm|md|lg|xl|2xl|3xl|full)$/,
    apply: (m) => {
      const r = ROUNDED[m[1]];
      return r ? { borderBottomRightRadius: r } : null;
    },
  },

  /* DISPLAY */
  { test: /^flex$/, apply: () => ({ display: "flex" }) },
  { test: /^inline-flex$/, apply: () => ({ display: "inline-flex" }) },
  { test: /^grid$/, apply: () => ({ display: "grid" }) },
  { test: /^inline-grid$/, apply: () => ({ display: "inline-grid" }) },
  { test: /^block$/, apply: () => ({ display: "block" }) },
  { test: /^inline$/, apply: () => ({ display: "inline" }) },
  { test: /^inline-block$/, apply: () => ({ display: "inline-block" }) },
  { test: /^hidden$/, apply: () => ({ display: "none" }) },
  { test: /^table$/, apply: () => ({ display: "table" }) },
  { test: /^contents$/, apply: () => ({ display: "contents" }) },

  /* FLEX */
  { test: /^flex-row$/, apply: () => ({ flexDirection: "row" }) },
  {
    test: /^flex-row-reverse$/,
    apply: () => ({ flexDirection: "row-reverse" }),
  },
  { test: /^flex-col$/, apply: () => ({ flexDirection: "column" }) },
  {
    test: /^flex-col-reverse$/,
    apply: () => ({ flexDirection: "column-reverse" }),
  },
  { test: /^flex-wrap$/, apply: () => ({ flexWrap: "wrap" }) },
  { test: /^flex-wrap-reverse$/, apply: () => ({ flexWrap: "wrap-reverse" }) },
  { test: /^flex-nowrap$/, apply: () => ({ flexWrap: "nowrap" }) },
  { test: /^flex-1$/, apply: () => ({ flex: "1 1 0%" }) },
  { test: /^flex-auto$/, apply: () => ({ flex: "1 1 auto" }) },
  { test: /^flex-initial$/, apply: () => ({ flex: "0 1 auto" }) },
  { test: /^flex-none$/, apply: () => ({ flex: "none" }) },
  { test: /^grow$/, apply: () => ({ flexGrow: 1 }) },
  { test: /^grow-0$/, apply: () => ({ flexGrow: 0 }) },
  { test: /^shrink$/, apply: () => ({ flexShrink: 1 }) },
  { test: /^shrink-0$/, apply: () => ({ flexShrink: 0 }) },
  {
    test: /^basis-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { flexBasis: v } : null;
    },
  },
  { test: /^basis-full$/, apply: () => ({ flexBasis: "100%" }) },
  { test: /^basis-auto$/, apply: () => ({ flexBasis: "auto" }) },

  /* GRID */
  {
    test: /^grid-cols-(\d+)$/,
    apply: (m) => {
      const n = parseInt(m[1]);
      return n >= 1 && n <= 12
        ? { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }
        : null;
    },
  },
  { test: /^grid-cols-none$/, apply: () => ({ gridTemplateColumns: "none" }) },
  {
    test: /^grid-rows-(\d+)$/,
    apply: (m) => {
      const n = parseInt(m[1]);
      return n >= 1 && n <= 6
        ? { gridTemplateRows: `repeat(${n}, minmax(0, 1fr))` }
        : null;
    },
  },
  {
    test: /^col-span-(\d+)$/,
    apply: (m) => ({ gridColumn: `span ${m[1]} / span ${m[1]}` }),
  },
  { test: /^col-span-full$/, apply: () => ({ gridColumn: "1 / -1" }) },
  {
    test: /^row-span-(\d+)$/,
    apply: (m) => ({ gridRow: `span ${m[1]} / span ${m[1]}` }),
  },

  /* ALIGNMENT */
  {
    test: /^items-(start|center|end|stretch|baseline)$/,
    apply: (m) => ({
      alignItems:
        m[1] === "start" ? "flex-start" : m[1] === "end" ? "flex-end" : m[1],
    }),
  },
  {
    test: /^justify-(start|center|end|between|around|evenly|stretch)$/,
    apply: (m) => ({
      justifyContent:
        m[1] === "start"
          ? "flex-start"
          : m[1] === "end"
            ? "flex-end"
            : m[1] === "between"
              ? "space-between"
              : m[1] === "around"
                ? "space-around"
                : m[1] === "evenly"
                  ? "space-evenly"
                  : m[1],
    }),
  },
  {
    test: /^content-(start|center|end|between|around|evenly|stretch|normal)$/,
    apply: (m) => ({
      alignContent:
        m[1] === "start"
          ? "flex-start"
          : m[1] === "end"
            ? "flex-end"
            : m[1] === "between"
              ? "space-between"
              : m[1] === "around"
                ? "space-around"
                : m[1] === "evenly"
                  ? "space-evenly"
                  : m[1],
    }),
  },
  {
    test: /^self-(auto|start|center|end|stretch|baseline)$/,
    apply: (m) => ({
      alignSelf:
        m[1] === "start" ? "flex-start" : m[1] === "end" ? "flex-end" : m[1],
    }),
  },
  {
    test: /^justify-self-(auto|start|center|end|stretch)$/,
    apply: (m) => ({
      justifySelf:
        m[1] === "start" ? "flex-start" : m[1] === "end" ? "flex-end" : m[1],
    }),
  },
  {
    test: /^place-items-(start|center|end|stretch)$/,
    apply: (m) => ({ placeItems: m[1] }),
  },
  {
    test: /^place-content-(start|center|end|between|around|evenly|stretch)$/,
    apply: (m) => ({ placeContent: m[1] }),
  },

  /* GAP */
  {
    test: /^gap-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { gap: v } : null;
    },
  },
  {
    test: /^gap-x-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { columnGap: v } : null;
    },
  },
  {
    test: /^gap-y-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { rowGap: v } : null;
    },
  },

  /* SIZING */
  {
    test: /^w-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { width: v } : null;
    },
  },
  { test: /^w-full$/, apply: () => ({ width: "100%" }) },
  { test: /^w-screen$/, apply: () => ({ width: "100vw" }) },
  { test: /^w-auto$/, apply: () => ({ width: "auto" }) },
  { test: /^w-fit$/, apply: () => ({ width: "fit-content" }) },
  { test: /^w-min$/, apply: () => ({ width: "min-content" }) },
  { test: /^w-max$/, apply: () => ({ width: "max-content" }) },
  { test: /^w-1\/2$/, apply: () => ({ width: "50%" }) },
  { test: /^w-1\/3$/, apply: () => ({ width: "33.333%" }) },
  { test: /^w-2\/3$/, apply: () => ({ width: "66.666%" }) },
  { test: /^w-1\/4$/, apply: () => ({ width: "25%" }) },
  { test: /^w-3\/4$/, apply: () => ({ width: "75%" }) },

  {
    test: /^h-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { height: v } : null;
    },
  },
  { test: /^h-full$/, apply: () => ({ height: "100%" }) },
  { test: /^h-screen$/, apply: () => ({ height: "100vh" }) },
  { test: /^h-auto$/, apply: () => ({ height: "auto" }) },
  { test: /^h-fit$/, apply: () => ({ height: "fit-content" }) },

  {
    test: /^min-w-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { minWidth: v } : null;
    },
  },
  { test: /^min-w-full$/, apply: () => ({ minWidth: "100%" }) },
  { test: /^min-w-0$/, apply: () => ({ minWidth: "0" }) },
  {
    test: /^max-w-(\w+)$/,
    apply: (m) =>
      MAX_WIDTHS[m[1]]
        ? { maxWidth: MAX_WIDTHS[m[1]] }
        : { maxWidth: `${parseFloat(m[1]) * SCALE}px` },
  },
  {
    test: /^min-h-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { minHeight: v } : null;
    },
  },
  { test: /^min-h-screen$/, apply: () => ({ minHeight: "100vh" }) },
  {
    test: /^max-h-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { maxHeight: v } : null;
    },
  },
  { test: /^max-h-screen$/, apply: () => ({ maxHeight: "100vh" }) },
  { test: /^max-h-full$/, apply: () => ({ maxHeight: "100%" }) },

  /* POSITION */
  {
    test: /^(static|relative|absolute|fixed|sticky)$/,
    apply: (m) => ({ position: m[1] }),
  },
  {
    test: /^top-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { top: v } : null;
    },
  },
  {
    test: /^bottom-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { bottom: v } : null;
    },
  },
  {
    test: /^left-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { left: v } : null;
    },
  },
  {
    test: /^right-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { right: v } : null;
    },
  },
  { test: /^top-auto$/, apply: () => ({ top: "auto" }) },
  { test: /^bottom-auto$/, apply: () => ({ bottom: "auto" }) },
  { test: /^left-auto$/, apply: () => ({ left: "auto" }) },
  { test: /^right-auto$/, apply: () => ({ right: "auto" }) },
  {
    test: /^inset-0$/,
    apply: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
  },
  { test: /^inset-x-0$/, apply: () => ({ left: 0, right: 0 }) },
  { test: /^inset-y-0$/, apply: () => ({ top: 0, bottom: 0 }) },
  { test: /^z-(\d+)$/, apply: (m) => ({ zIndex: parseInt(m[1]) }) },
  { test: /^z-auto$/, apply: () => ({ zIndex: "auto" }) },

  /* OVERFLOW */
  {
    test: /^overflow-(hidden|visible|scroll|auto|clip)$/,
    apply: (m) => ({ overflow: m[1] }),
  },
  {
    test: /^overflow-x-(hidden|visible|scroll|auto|clip)$/,
    apply: (m) => ({ overflowX: m[1] }),
  },
  {
    test: /^overflow-y-(hidden|visible|scroll|auto|clip)$/,
    apply: (m) => ({ overflowY: m[1] }),
  },

  /* VISIBILITY */
  { test: /^visible$/, apply: () => ({ visibility: "visible" }) },
  { test: /^invisible$/, apply: () => ({ visibility: "hidden" }) },

  /* OPACITY */
  {
    test: /^opacity-(\d+)$/,
    apply: (m) => {
      const n = parseInt(m[1]);
      return n >= 0 && n <= 100 ? { opacity: n / 100 } : null;
    },
  },

  /* BOX SHADOW */
  { test: /^shadow$/, apply: () => ({ boxShadow: SHADOWS[""] }) },
  {
    test: /^shadow-(sm|md|lg|xl|2xl|inner|none)$/,
    apply: (m) => ({ boxShadow: SHADOWS[m[1]] || null }),
  },

  /* CURSOR */
  {
    test: /^cursor-(auto|default|pointer|wait|text|move|help|not-allowed|none|grab|grabbing|zoom-in|zoom-out|crosshair)$/,
    apply: (m) => ({ cursor: m[1] }),
  },

  /* POINTER EVENTS */
  {
    test: /^pointer-events-(none|auto)$/,
    apply: (m) => ({ pointerEvents: m[1] }),
  },

  /* OBJECT FIT / POSITION */
  {
    test: /^object-(contain|cover|fill|none|scale-down)$/,
    apply: (m) => ({ objectFit: m[1] }),
  },
  {
    test: /^object-(top|bottom|left|right|center)$/,
    apply: (m) => ({ objectPosition: m[1] }),
  },

  /* RESIZE */
  {
    test: /^resize(-(none|x|y|both))?$/,
    apply: (m) => ({ resize: m[1] ? m[1].slice(1) : "both" }),
  },

  /* TRANSITION & ANIMATION */
  {
    test: /^transition$/,
    apply: () => ({
      transition:
        "color 150ms, background-color 150ms, border-color 150ms, text-decoration-color 150ms, fill 150ms, stroke 150ms, opacity 150ms, box-shadow 150ms, transform 150ms, filter 150ms, backdrop-filter 150ms",
    }),
  },
  { test: /^transition-none$/, apply: () => ({ transition: "none" }) },
  { test: /^transition-all$/, apply: () => ({ transition: "all 150ms ease" }) },
  {
    test: /^transition-colors$/,
    apply: () => ({
      transition: "color 150ms, background-color 150ms, border-color 150ms",
    }),
  },
  {
    test: /^transition-opacity$/,
    apply: () => ({ transition: "opacity 150ms" }),
  },
  {
    test: /^transition-shadow$/,
    apply: () => ({ transition: "box-shadow 150ms" }),
  },
  {
    test: /^transition-transform$/,
    apply: () => ({ transition: "transform 150ms" }),
  },
  {
    test: /^duration-(\d+)$/,
    apply: (m) => ({ transitionDuration: `${m[1]}ms` }),
  },
  {
    test: /^ease-(linear|in|out|in-out)$/,
    apply: (m) => ({
      transitionTimingFunction:
        m[1] === "in"
          ? "ease-in"
          : m[1] === "out"
            ? "ease-out"
            : m[1] === "in-out"
              ? "ease-in-out"
              : "linear",
    }),
  },
  { test: /^delay-(\d+)$/, apply: (m) => ({ transitionDelay: `${m[1]}ms` }) },

  /* TRANSFORM */
  {
    test: /^scale-(\d+)$/,
    apply: (m) => ({ transform: `scale(${parseInt(m[1]) / 100})` }),
  },
  {
    test: /^scale-x-(\d+)$/,
    apply: (m) => ({ transform: `scaleX(${parseInt(m[1]) / 100})` }),
  },
  {
    test: /^scale-y-(\d+)$/,
    apply: (m) => ({ transform: `scaleY(${parseInt(m[1]) / 100})` }),
  },
  {
    test: /^rotate-(\d+)$/,
    apply: (m) => ({ transform: `rotate(${m[1]}deg)` }),
  },
  {
    test: /^-rotate-(\d+)$/,
    apply: (m) => ({ transform: `rotate(-${m[1]}deg)` }),
  },
  {
    test: /^translate-x-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { transform: `translateX(${v})` } : null;
    },
  },
  {
    test: /^translate-y-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { transform: `translateY(${v})` } : null;
    },
  },
  {
    test: /^-translate-x-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { transform: `translateX(-${v})` } : null;
    },
  },
  {
    test: /^-translate-y-(\d+\.?\d*)$/,
    apply: (m) => {
      const v = px(m[1]);
      return v ? { transform: `translateY(-${v})` } : null;
    },
  },

  /* FILTER */
  { test: /^blur$/, apply: () => ({ filter: "blur(8px)" }) },
  {
    test: /^blur-(sm|md|lg|xl|2xl|3xl)$/,
    apply: (m) => {
      const map = {
        sm: "4px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      };
      return { filter: `blur(${map[m[1]]})` };
    },
  },
  {
    test: /^brightness-(\d+)$/,
    apply: (m) => ({ filter: `brightness(${parseInt(m[1]) / 100})` }),
  },
  { test: /^grayscale$/, apply: () => ({ filter: "grayscale(100%)" }) },

  /* BACKGROUND ATTACHMENT / SIZE / POSITION */
  {
    test: /^bg-(fixed|local|scroll)$/,
    apply: (m) => ({ backgroundAttachment: m[1] }),
  },
  {
    test: /^bg-(auto|cover|contain)$/,
    apply: (m) => ({ backgroundSize: m[1] }),
  },
  {
    test: /^bg-(top|bottom|left|right|center)$/,
    apply: (m) => ({ backgroundPosition: m[1] }),
  },
  {
    test: /^bg-(repeat|no-repeat|repeat-x|repeat-y)$/,
    apply: (m) => ({ backgroundRepeat: m[1] }),
  },

  /* MISC */
  { test: /^box-border$/, apply: () => ({ boxSizing: "border-box" }) },
  { test: /^box-content$/, apply: () => ({ boxSizing: "content-box" }) },
  {
    test: /^aspect-(auto|square|video)$/,
    apply: (m) => ({
      aspectRatio:
        m[1] === "auto" ? "auto" : m[1] === "square" ? "1 / 1" : "16 / 9",
    }),
  },
  {
    test: /^list-(none|disc|decimal)$/,
    apply: (m) => ({ listStyleType: m[1] }),
  },
  { test: /^float-(left|right|none)$/, apply: (m) => ({ float: m[1] }) },
  { test: /^clear-(left|right|both|none)$/, apply: (m) => ({ clear: m[1] }) },
  { test: /^isolate$/, apply: () => ({ isolation: "isolate" }) },
  { test: /^mix-blend-(\w+)$/, apply: (m) => ({ mixBlendMode: m[1] }) },
  { test: /^bg-blend-(\w+)$/, apply: (m) => ({ backgroundBlendMode: m[1] }) },
];
