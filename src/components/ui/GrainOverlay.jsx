// components/ui/GrainOverlay.jsx
// ============================================================
// GRAIN OVERLAY
// Adds a subtle film-grain texture over the entire site.
// Purely aesthetic — gives the dark design a premium, tactile feel.
//
// TO REMOVE: delete this component from layout.jsx
// TO ADJUST INTENSITY: edit opacity in globals.css → .grain-overlay
// ============================================================

const GrainOverlay = () => {
  return <div className="grain-overlay" aria-hidden="true" />
}

export default GrainOverlay