// HeroVectors.js
// Vector paths extracted from NITS HACKS 9.0 design in 1024x539 coordinate space
export const IRONMAN_PATH =
  "M288,105 L291,105 L291,108 L288,110 L288,111 L291,112 L291,113 L284,115 L277,121 L280,123 L281,125 L280,126 L274,126 L271,128 L268,128 L256,133 L244,133 L243,134 L242,133 L237,133 L235,135 L235,137 L240,140 L244,145 L254,149 L261,147 L267,147 L268,148 L303,148 L304,149 L308,149 L311,152 L315,152 L316,151 L319,151 L320,149 L330,140 L337,137 L341,137 L342,138 L348,137 L351,142 L359,142 L369,134 L372,134 L377,138 L383,137 L382,139 L383,141 L390,142 L390,144 L393,149 L392,153 L395,156 L397,162 L400,165 L405,174 L404,180 L399,181 L389,172 L384,172 L381,169 L371,164 L364,162 L352,162 L351,163 L342,164 L321,173 L309,175 L306,178 L301,179 L296,182 L288,183 L283,185 L277,184 L276,182 L270,182 L263,179 L255,178 L252,176 L239,175 L238,174 L224,175 L212,171 L215,171 L216,170 L216,167 L213,164 L207,163 L206,164 L206,167 L207,168 L206,168 L201,163 L197,150 L193,146 L188,145 L184,151 L181,152 L179,151 L177,149 L172,139 L172,138 L173,139 L176,136 L176,134 L174,133 L172,136 L171,136 L171,133 L170,132 L171,131 L171,127 L175,121 L182,117 L186,117 L189,119 L191,119 L195,125 L204,118 L209,118 L214,116 L216,114 L219,114 L223,112 L231,111 L232,110 L241,110 L239,113 L234,114 L232,117 L229,117 L225,119 L220,119 L219,121 L220,122 L223,122 L224,121 L235,121 L236,120 L239,120 L240,119 L240,116 L243,116 L246,114 L252,114 L254,117 L257,118 L264,118 L269,114 L279,111 L283,109 L285,106 L288,105 Z";

export const TOWER_PATH =
  "M65,153 L79,153 L80,154 L94,219 L97,226 L104,234 L114,239 L118,238 L118,210 L136,244 L139,247 L175,247 L176,246 L179,247 L180,246 L209,250 L206,256 L201,276 L203,283 L183,287 L179,291 L178,295 L179,296 L199,296 L204,298 L268,298 L270,299 L257,301 L218,302 L175,320 L157,331 L151,337 L155,348 L156,355 L159,361 L159,362 L156,359 L154,359 L151,362 L151,364 L153,367 L153,370 L165,405 L169,413 L173,428 L185,458 L192,481 L194,483 L195,489 L200,500 L202,498 L202,500 L204,501 L207,498 L204,489 L205,487 L207,488 L210,486 L212,481 L212,472 L214,469 L217,468 L218,469 L217,481 L219,485 L219,491 L222,494 L225,493 L228,496 L244,491 L243,494 L246,499 L250,501 L253,493 L255,492 L258,493 L262,487 L269,489 L272,486 L271,481 L271,465 L272,464 L271,463 L272,458 L274,458 L274,479 L277,484 L280,484 L280,538 L50,538 L50,502 L52,506 L53,519 L56,521 L58,519 L59,496 L60,495 L60,409 L61,408 L60,405 L61,404 L62,303 L63,302 L62,298 L63,297 L63,262 L64,261 L63,254 L64,253 L65,153 Z";

// ── Motion tuning ─────────────────────────────────────────────
// Iron Man moves straight up and down only (no sideways drift, no tilt).
// The spotlight beam + NITSHACKS 9.0 title stay completely still.
export const FLIGHT_CONFIG = {
  bobAmplitude: 3, // up/down travel (SVG units)
  bobSpeed: 1.5, // speed of the up/down cycle
  baseOffsetY: 14, // resting height; negative = higher on screen
};

// ── Boot ──────────────────────────────────────────────────────
// offsetX:   horizontal nudge of Iron Man (positive = right).
// footPatch: SMALL black polygon (Iron Man's own coordinates) that extends the
//            boot downward over the beam's small black corner.
// Tuning: if black still shows below/left of the boot, move the lower points
// down/left (e.g. "372,196" -> "368,200"). If the patch sticks out into the
// red, pull those points back toward the boot.
export const BOOT = {
  offsetX: 13,
};

// ── Skyline ───────────────────────────────────────────────────
// Procedurally generated buildings, exactly one viewBox wide and drawn twice,
// so scrolling by `width` loops perfectly with no seam or kink.
export const SKYLINE = {
  width: 1024, // one loop period (SVG units); must equal the viewBox width
  bottom: 539, // buildings sit on the bottom of the scene
  seconds: 14, // front layer: seconds per loop (lower = faster)
  farFactor: 1.8, // back layer is this many times slower
};
