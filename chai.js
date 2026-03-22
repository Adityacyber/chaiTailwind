import { init } from "./core/engine.js";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init());
} else {
  init();
}
