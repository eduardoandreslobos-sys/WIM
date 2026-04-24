// Tweaks panel — palette + density switches
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "editorial",
  "density": "regular",
  "showQR": true
}/*EDITMODE-END*/;

const PALETTES = {
  editorial: {
    label: "Editorial Navy",
    paper: "#f4efe6",
    paper2: "#eae2d3",
    ink: "#0a1733",
    ink2: "#1d2a4a",
    inkMute: "#5a6684",
    accent: "#b76a2b",
    accent2: "#2f58d3",
    wimBlue: "#11307a",
    wimBlueLight: "#4a7fd1",
    highlight: "#f4d03f",
  },
  copper: {
    label: "Industrial Copper",
    paper: "#1a1612",
    paper2: "#251f19",
    ink: "#f4eadb",
    ink2: "#d4c4a8",
    inkMute: "#8a7e6a",
    accent: "#d4883d",
    accent2: "#e8b566",
    wimBlue: "#5a7fd1",
    wimBlueLight: "#8aa5e0",
    highlight: "#f4d03f",
  },
  mono: {
    label: "High-contrast Mono",
    paper: "#ffffff",
    paper2: "#f0f0f0",
    ink: "#000000",
    ink2: "#222222",
    inkMute: "#666666",
    accent: "#000000",
    accent2: "#000000",
    wimBlue: "#11307a",
    wimBlueLight: "#4a7fd1",
    highlight: "#ffd500",
  },
};

const DENSITY_MAP = {
  compact: { padY: "90px", padX: "72px" },
  regular: { padY: "120px", padX: "96px" },
  comfy:   { padY: "150px", padX: "120px" },
};

function applyTweaks(t) {
  const p = PALETTES[t.palette] || PALETTES.editorial;
  const r = document.documentElement.style;
  r.setProperty("--paper", p.paper);
  r.setProperty("--paper-2", p.paper2);
  r.setProperty("--ink", p.ink);
  r.setProperty("--ink-2", p.ink2);
  r.setProperty("--ink-mute", p.inkMute);
  r.setProperty("--accent", p.accent);
  r.setProperty("--accent-2", p.accent2);
  r.setProperty("--wim-blue", p.wimBlue);
  r.setProperty("--wim-blue-light", p.wimBlueLight);
  r.setProperty("--highlight", p.highlight);

  const d = DENSITY_MAP[t.density] || DENSITY_MAP.regular;
  // density is subtle — update the .pad class via a style tag
  let styleTag = document.getElementById("tweaks-density-style");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "tweaks-density-style";
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = `
    section.slide .pad { inset: ${d.padY} ${d.padX} ${d.padY} ${d.padX}; }
    .qr-ph { display: ${t.showQR ? "grid" : "none"}; }
  `;
}

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyTweaks(t);
  }, [t]);

  return (
    <TweaksPanel title="Deck Tweaks">
      <TweakSection label="Paleta" />
      <TweakRadio
        label="Palette"
        value={t.palette}
        options={[
          { value: "editorial", label: "Navy" },
          { value: "copper", label: "Copper" },
          { value: "mono", label: "Mono" },
        ]}
        onChange={(v) => setTweak("palette", v)}
      />
      <TweakSection label="Layout" />
      <TweakRadio
        label="Densidad"
        value={t.density}
        options={["compact", "regular", "comfy"]}
        onChange={(v) => setTweak("density", v)}
      />
      <TweakSection label="Contenido" />
      <TweakToggle
        label="Mostrar QRs"
        value={t.showQR}
        onChange={(v) => setTweak("showQR", v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<TweaksApp />);
