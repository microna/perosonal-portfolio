import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "../lib/supabase";

const PALETTE = [
  "#598eff", "#1c34ff", "#7c3aed", "#a855f7",
  "#818cf8", "#60a5fa", "#c4b5fd", "#e879f9",
];

const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

function pickColor() {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)];
}

function getOpacity(createdAt) {
  const age = Date.now() - new Date(createdAt).getTime();
  return Math.max(0.06, 0.75 * (1 - age / MAX_AGE_MS));
}

function floatStyle(index) {
  const duration = 5 + (index % 5) * 1.3;
  const delay = -(index % 7) * 1.1;
  const dir = index % 2 === 0 ? "inkFloatA" : "inkFloatB";
  return {
    transformBox: "fill-box",
    transformOrigin: "center",
    animation: `${dir} ${duration}s ease-in-out ${delay}s infinite`,
  };
}

// ── Custom cursor ────────────────────────────────────────────────
const CustomCursor = ({ containerRef }) => {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onUp);
    };
  }, [containerRef]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute z-30"
      style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
    >
      <div
        style={{
          width: clicking ? 36 : 44,
          height: clicking ? 36 : 44,
          borderRadius: "50%",
          border: `1.5px solid rgba(165,132,253,${clicking ? 0.9 : 0.5})`,
          boxShadow: `0 0 12px rgba(124,58,237,${clicking ? 0.8 : 0.4})`,
          transition: "width 0.15s, height 0.15s, border-color 0.15s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: clicking ? 6 : 4,
            height: clicking ? 6 : 4,
            borderRadius: "50%",
            background: "#a78bfa",
            boxShadow: "0 0 8px #7c3aed",
            transition: "width 0.15s, height 0.15s",
          }}
        />
      </div>
      {!clicking && (
        <p
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: 8,
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(167,139,250,0.7)",
            whiteSpace: "nowrap",
          }}
        >
          leave a mark
        </p>
      )}
    </div>
  );
};

// ── Main component ───────────────────────────────────────────────
const InkDropCanvas = () => {
  const [marks, setMarks]         = useState([]);
  const [ripples, setRipples]     = useState([]);
  const [newIds, setNewIds]       = useState(new Set());
  const [count, setCount]         = useState(0);
  const [hint, setHint]           = useState(true);
  const lastClick                 = useRef(0);
  const selfIds                   = useRef(new Set());
  const containerRef              = useRef(null);

  const spawnRipple = useCallback((x, y, color) => {
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x, y, color }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1400);
  }, []);

  const markAsNew = useCallback((id) => {
    setNewIds((prev) => new Set([...prev, id]));
    setTimeout(() => setNewIds((prev) => { const s = new Set(prev); s.delete(id); return s; }), 900);
  }, []);

  useEffect(() => {
    supabase
      .from("marks")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(800)
      .then(({ data }) => {
        if (data) { setMarks(data); setCount(data.length); }
      });

    const channel = supabase
      .channel("marks-live")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "marks" }, (payload) => {
        const mark = payload.new;
        setCount((prev) => prev + 1);

        if (selfIds.current.has(mark.id)) {
          // replace optimistic placeholder with real record
          selfIds.current.delete(mark.id);
          setMarks((prev) => prev.map((m) => m.__temp === mark.id ? { ...mark } : m));
        } else {
          // another visitor — add mark + ripple
          setMarks((prev) => [...prev, mark]);
          markAsNew(mark.id);
          spawnRipple(mark.x, mark.y, mark.color);
        }
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [spawnRipple, markAsNew]);

  const handleClick = useCallback(async (e) => {
    const now = Date.now();
    if (now - lastClick.current < 400) return;
    lastClick.current = now;
    setHint(false);

    const rect = e.currentTarget.getBoundingClientRect();
    const x     = (e.clientX - rect.left) / rect.width;
    const y     = (e.clientY - rect.top)  / rect.height;
    const color = pickColor();
    const tempId = `temp-${now}`;

    // optimistic: show the dot immediately with arrival animation
    const tempMark = { id: tempId, __temp: tempId, x, y, color, created_at: new Date().toISOString() };
    setMarks((prev) => [...prev, tempMark]);
    markAsNew(tempId);
    spawnRipple(x, y, color);

    const { data } = await supabase.from("marks").insert({ x, y, color }).select("id").single();
    if (data?.id) {
      selfIds.current.add(data.id);
      // tag the temp so subscription knows which one to replace
      setMarks((prev) => prev.map((m) => m.id === tempId ? { ...m, __temp: data.id } : m));
    }
  }, [spawnRipple, markAsNew]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20"
      style={{ cursor: "none" }}
      onClick={handleClick}
    >
      <CustomCursor containerRef={containerRef} />

      <svg
        className="w-full h-full pointer-events-none"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <filter id="ink-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {marks.map((mark, i) => {
          const isNew = newIds.has(mark.id);
          return (
            <circle
              key={mark.id}
              cx={`${mark.x * 100}%`}
              cy={`${mark.y * 100}%`}
              r="3"
              fill={mark.color}
              opacity={isNew ? 1 : getOpacity(mark.created_at)}
              filter="url(#ink-glow)"
              style={
                isNew
                  ? { transformBox: "fill-box", transformOrigin: "center", animation: "inkMarkArrive 0.9s ease-out forwards" }
                  : floatStyle(i)
              }
            />
          );
        })}

        {/* Ripple rings only — no extra dot */}
        {ripples.map((ripple) => (
          <g key={ripple.id}>
            <circle
              cx={`${ripple.x * 100}%`}
              cy={`${ripple.y * 100}%`}
              r="4"
              fill="none"
              stroke={ripple.color}
              strokeWidth="1.5"
              className="ink-ripple"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            <circle
              cx={`${ripple.x * 100}%`}
              cy={`${ripple.y * 100}%`}
              r="4"
              fill="none"
              stroke={ripple.color}
              strokeWidth="1"
              className="ink-ripple-slow"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          </g>
        ))}
      </svg>

      {hint && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none">
          <p
            className="text-white/30 text-xs tracking-widest uppercase"
            style={{ animation: "inkHintFade 3s ease-in-out infinite" }}
          >
            ✦ click anywhere to leave your mark
          </p>
        </div>
      )}

      {count > 0 && (
        <div className="absolute bottom-8 right-6 pointer-events-none">
          <p className="text-white/20 text-xs tracking-wider">
            {count} {count === 1 ? "mark" : "marks"} left by visitors
          </p>
        </div>
      )}
    </div>
  );
};

export default InkDropCanvas;
