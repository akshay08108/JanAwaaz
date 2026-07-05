import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  MapPin,
  Plus,
  X,
  Menu,
  List,
  Map,
  SlidersHorizontal,
  AlertTriangle,
  Droplets,
  Trash2,
  Zap,
  Bus,
  MoreHorizontal,
  Users,
  BadgeCheck,
  Share2,
  Bookmark,
  Camera,
  CheckCircle2,
  Circle,
  ExternalLink,
  Navigation,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Clock3,
  Upload,
  Languages,
} from "lucide-react";
import "./styles.css";

const CATEGORIES = {
  Roads: { icon: AlertTriangle, color: "#dc5b27" },
  Water: { icon: Droplets, color: "#1687a7" },
  Waste: { icon: Trash2, color: "#2e8b74" },
  Electricity: { icon: Zap, color: "#d38a17" },
  "Public transport": { icon: Bus, color: "#5b61b2" },
  Other: { icon: MoreHorizontal, color: "#657082" },
};
const STATUS = {
  Reported: "#d94949",
  Submitted: "#2367d1",
  Acknowledged: "#df8b16",
  Resolved: "#238467",
};
const SEED_ISSUES = [
  {
    id: 1,
    title: "Dangerous pothole outside Government School",
    category: "Roads",
    location: "Indiranagar, Bengaluru",
    time: "2 hours ago",
    status: "Submitted",
    affected: 48,
    verified: 2,
    description:
      "Large pothole right outside the school gate. Risk of accidents for children and vehicles, especially during rain.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=85",
    saved: false,
    lat: 32,
    top: 24,
  },
  {
    id: 2,
    title: "Garbage has not been collected for 6 days",
    category: "Waste",
    location: "HSR Layout, Bengaluru",
    time: "6 hours ago",
    status: "Acknowledged",
    affected: 31,
    verified: 3,
    description:
      "Garbage overflowing for almost a week near 27th Cross. Foul smell and attracting stray animals.",
    image:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=85",
    saved: false,
    lat: 58,
    top: 48,
  },
  {
    id: 3,
    title: "Streetlights not working on 5th Main",
    category: "Electricity",
    location: "Koramangala, Bengaluru",
    time: "1 day ago",
    status: "Reported",
    affected: 19,
    verified: 1,
    description:
      "Multiple streetlights have not worked since last week. The road is very dark at night and feels unsafe.",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=85",
    saved: false,
    lat: 46,
    top: 72,
  },
  {
    id: 4,
    title: "Water supply has been irregular all week",
    category: "Water",
    location: "BTM Layout, Bengaluru",
    time: "1 day ago",
    status: "Reported",
    affected: 23,
    verified: 2,
    description:
      "Homes in three lanes are receiving water for less than thirty minutes each morning.",
    image:
      "https://images.unsplash.com/photo-1538300342682-cf57afb97285?auto=format&fit=crop&w=800&q=85",
    saved: false,
    lat: 72,
    top: 32,
  },
];
const storageKey = "janawaaz-issues-v1";
const loadIssues = () => {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || SEED_ISSUES;
  } catch {
    return SEED_ISSUES;
  }
};

function Brand() {
  return (
    <button
      className="brand"
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
    >
      Jan<span>Awaaz</span>
    </button>
  );
}
function Header({ openReport }) {
  const [menu, setMenu] = useState(false);
  return (
    <header>
      <Brand />
      <nav className={menu ? "nav-open" : ""}>
        <a href="#explore">Explore</a>
        <a href="#how">How it works</a>
        <a href="#safety">Safety</a>
      </nav>
      <div className="header-actions">
        <button className="language">
          <Languages /> EN / हिंदी
        </button>
        <label className="top-search">
          <Search />
          <input placeholder="Search issues, places..." />
        </label>
        <button className="primary" onClick={openReport}>
          <Plus /> Report an issue
        </button>
        <button
          className="menu-button"
          onClick={() => setMenu(!menu)}
          aria-label="Menu"
        >
          <Menu />
        </button>
      </div>
    </header>
  );
}
function Hero({ openReport, explore }) {
  return (
    <section className="hero">
      <div className="hero-copy">
        <h1>
          Make local problems
          <br />
          impossible to ignore.
        </h1>
        <p>
          Report what’s not working in your area. Neighbours verify the impact.
          Authorities get a clearer signal to respond.
        </p>
        <div>
          <button className="primary" onClick={openReport}>
            <Plus /> Report an issue
          </button>
          <button className="outline" onClick={explore}>
            <MapPin /> Explore your area
          </button>
        </div>
      </div>
      <div className="city-art" aria-hidden="true">
        <span className="route route-one" />
        <span className="route route-two" />
        <div className="sun" />
        <div className="building b1" />
        <div className="building b2" />
        <div className="building b3" />
        <div className="building b4" />
        <MapPin className="pin p1" />
        <MapPin className="pin p2" />
        <MapPin className="pin p3" />
        <Bus className="art-bus" />
        <span className="ground" />
      </div>
    </section>
  );
}
function Filters({ category, setCategory, status, setStatus, reset }) {
  return (
    <aside className="filters">
      <label className="section-label">Location</label>
      <button className="select-button">
        <MapPin /> Bengaluru <ChevronDown />
      </button>
      <label className="section-label">Categories</label>
      <div className="category-list">
        {Object.entries(CATEGORIES).map(([name, meta]) => {
          const Icon = meta.icon;
          return (
            <button
              key={name}
              className={category === name ? "active" : ""}
              onClick={() => setCategory(category === name ? "All" : name)}
            >
              <Icon />
              <span>{name}</span>
            </button>
          );
        })}
      </div>
      <label className="section-label">Status</label>
      <div className="status-list">
        {Object.keys(STATUS).map((s) => (
          <label key={s}>
            <input
              type="checkbox"
              checked={status.includes(s)}
              onChange={() =>
                setStatus(
                  status.includes(s)
                    ? status.filter((x) => x !== s)
                    : [...status, s],
                )
              }
            />
            <i style={{ background: STATUS[s] }} />
            {s}
          </label>
        ))}
      </div>
      <label className="section-label">Distance</label>
      <button className="select-button">
        Within 5 km <ChevronDown />
      </button>
      <button className="reset" onClick={reset}>
        Reset filters
      </button>
    </aside>
  );
}
function Timeline({ current }) {
  const steps = ["Reported", "Submitted", "Acknowledged", "Resolved"];
  const index = steps.indexOf(current);
  return (
    <div className="timeline">
      {steps.map((s, i) => (
        <div key={s} className={i <= index ? "done" : ""}>
          <i style={i <= index ? { background: STATUS[s] } : {}} />
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}
function IssueCard({ issue, onAffected, onSave, onOpen }) {
  const Icon = CATEGORIES[issue.category]?.icon || MoreHorizontal;
  return (
    <article className="issue-card">
      <button className="evidence" onClick={onOpen}>
        <img src={issue.image} alt="Evidence submitted with issue" />
        <span>
          <Camera /> Evidence
        </span>
      </button>
      <div className="issue-main">
        <div className="issue-heading">
          <div>
            <button className="issue-title" onClick={onOpen}>
              {issue.title}
            </button>
            <p>
              <MapPin /> {issue.location} <b>·</b> {issue.time}
            </p>
          </div>
          <span className="status-chip" style={{ color: STATUS[issue.status] }}>
            <i style={{ background: STATUS[issue.status] }} /> {issue.status}
          </span>
        </div>
        <span className="category">
          <Icon /> {issue.category}
        </span>
        <p className="description">{issue.description}</p>
        <div className="issue-actions">
          <button onClick={onAffected}>
            <Users /> {issue.affected} people affected
          </button>
          <span>
            <BadgeCheck /> {issue.verified} verified
          </span>
          <div className="spacer" />
          <button
            aria-label="Save issue"
            className={issue.saved ? "saved" : ""}
            onClick={onSave}
          >
            <Bookmark fill={issue.saved ? "currentColor" : "none"} />
          </button>
          <button
            aria-label="Share issue"
            onClick={() => navigator.clipboard?.writeText(location.href)}
          >
            <Share2 />
          </button>
        </div>
      </div>
      <Timeline current={issue.status} />
    </article>
  );
}
function MiniMap({ issues }) {
  return (
    <div className="mini-map">
      <div className="map-roads">
        <i />
        <i />
        <i />
        <i />
      </div>
      {issues.slice(0, 4).map((x, i) => (
        <MapPin
          key={x.id}
          className={`map-pin mp${i + 1}`}
          style={{ color: STATUS[x.status] }}
          fill="currentColor"
        />
      ))}
      <span className="area a1">INDIRANAGAR</span>
      <span className="area a2">HSR LAYOUT</span>
      <span className="area a3">KORAMANGALA</span>
      <button>
        View larger map <ExternalLink />
      </button>
    </div>
  );
}
function RightRail({ issues, openReport }) {
  return (
    <aside className="right-rail">
      <section className="rail-section">
        <h3>Area overview</h3>
        <MiniMap issues={issues} />
      </section>
      <section className="rail-section" id="how">
        <h3>Your civic route</h3>
        <div className="route-steps">
          <div>
            <Plus />
            <p>
              <b>Report</b>
              <span>Share the problem with details and evidence.</span>
            </p>
          </div>
          <div>
            <Users />
            <p>
              <b>Verify</b>
              <span>Neighbours confirm the local impact.</span>
            </p>
          </div>
          <div>
            <Navigation />
            <p>
              <b>Submit officially</b>
              <span>Use the right authority and reference number.</span>
            </p>
          </div>
          <div>
            <CheckCircle2 />
            <p>
              <b>Track response</b>
              <span>Keep a public resolution timeline.</span>
            </p>
          </div>
        </div>
      </section>
      <section className="official">
        <h3>Official escalation</h3>
        <p>
          JanAwaaz is an independent civic platform. Official complaints must be
          filed with the responsible authority.
        </p>
        <div>
          <b>CPGRAMS</b>
          <span>
            Centralised Public Grievance Redress and Monitoring System
          </span>
          <a
            href="https://www.pgportal.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            Open official portal <ExternalLink />
          </a>
        </div>
        <button className="outline full" onClick={openReport}>
          Start with JanAwaaz
        </button>
      </section>
    </aside>
  );
}
function Explore({ issues, setIssues, openReport }) {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Newest");
  const [mode, setMode] = useState("list");
  const filtered = useMemo(() => {
    let result = issues.filter(
      (x) =>
        (category === "All" || x.category === category) &&
        (!status.length || status.includes(x.status)) &&
        (x.title + " " + x.location + " " + x.description)
          .toLowerCase()
          .includes(query.toLowerCase()),
    );
    if (sort === "Most affected")
      result = [...result].sort((a, b) => b.affected - a.affected);
    if (sort === "Recently updated")
      result = [...result].sort((a, b) => b.id - a.id);
    return result;
  }, [issues, category, status, query, sort]);
  const patch = (id, changes) =>
    setIssues((old) =>
      old.map((x) => (x.id === id ? { ...x, ...changes } : x)),
    );
  return (
    <section className="explore" id="explore">
      <Filters
        {...{
          category,
          setCategory,
          status,
          setStatus,
          reset: () => {
            setCategory("All");
            setStatus([]);
          },
        }}
      />
      <main className="feed">
        <div className="feed-head">
          <div>
            <h2>Issues near you</h2>
            <p>{filtered.length} public reports around Bengaluru</p>
          </div>
          <button className="mobile-filter">
            <SlidersHorizontal /> Filters
          </button>
          <div className="view-switch">
            <button
              className={mode === "list" ? "active" : ""}
              onClick={() => setMode("list")}
            >
              <List /> List
            </button>
            <button
              className={mode === "map" ? "active" : ""}
              onClick={() => setMode("map")}
            >
              <Map /> Map
            </button>
          </div>
        </div>
        <div className="feed-tools">
          <label>
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search issues..."
            />
          </label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Newest</option>
            <option>Most affected</option>
            <option>Recently updated</option>
          </select>
        </div>
        {mode === "list" ? (
          <div className="issue-list">
            {filtered.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onAffected={() =>
                  patch(issue.id, { affected: issue.affected + 1 })
                }
                onSave={() => patch(issue.id, { saved: !issue.saved })}
                onOpen={() => {}}
              />
            ))}
            {!filtered.length ? (
              <div className="empty">
                <Search />
                <h3>No matching issues</h3>
                <p>Try a different category, status, or search.</p>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="large-map">
            <MiniMap issues={filtered} />
            <div className="map-legend">
              {Object.entries(STATUS).map(([s, c]) => (
                <span key={s}>
                  <i style={{ background: c }} />
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="feed-footer">
          <span>Showing {filtered.length} issues</span>
          <button className="primary" onClick={openReport}>
            <Plus /> Report another issue
          </button>
        </div>
      </main>
      <RightRail issues={filtered} openReport={openReport} />
    </section>
  );
}
const resizeImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const maxWidth = 1000;
        const scale = Math.min(1, maxWidth / image.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas
          .getContext("2d")
          .drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.76));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

function EvidencePicker({ evidence, setEvidence }) {
  const uploadRef = useRef(null);
  const captureRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOpen(false);
  };

  useEffect(() => stopCamera, []);

  const addFiles = async (files) => {
    const selected = [...files].filter((file) =>
      file.type.startsWith("image/"),
    );
    if (!selected.length) return;
    if (evidence.length + selected.length > 5) {
      setError("You can attach up to 5 images.");
      return;
    }
    if (selected.some((file) => file.size > 20 * 1024 * 1024)) {
      setError("Each image must be smaller than 20 MB.");
      return;
    }
    setProcessing(true);
    setError("");
    try {
      const images = await Promise.all(selected.map(resizeImage));
      setEvidence((current) => [...current, ...images].slice(0, 5));
    } catch {
      setError("That image could not be processed. Try another file.");
    } finally {
      setProcessing(false);
    }
  };

  const openLiveCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      captureRef.current?.click();
      return;
    }
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraOpen(true);
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
    } catch {
      setError(
        "Camera access was blocked. Allow camera permission or upload a photo instead.",
      );
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    if (!video?.videoWidth) return;
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 1000 / video.videoWidth);
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    setEvidence((current) =>
      [...current, canvas.toDataURL("image/jpeg", 0.78)].slice(0, 5),
    );
    stopCamera();
  };

  return (
    <div className="evidence-picker">
      <input
        ref={uploadRef}
        className="sr-only"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => addFiles(e.target.files)}
      />
      <input
        ref={captureRef}
        className="sr-only"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => addFiles(e.target.files)}
      />
      <div className="evidence-buttons">
        <button
          type="button"
          className="upload"
          onClick={() => uploadRef.current?.click()}
        >
          <Upload />
          <b>{processing ? "Processing…" : "Upload images"}</b>
          <small>Up to 5 · max 20 MB each</small>
        </button>
        <button
          type="button"
          className="camera-button"
          onClick={openLiveCamera}
        >
          <Camera />
          <b>Open camera</b>
          <small>Use your rear camera on mobile</small>
        </button>
      </div>
      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : null}
      {evidence.length ? (
        <div className="evidence-previews">
          {evidence.map((src, index) => (
            <div key={`${src.slice(-20)}-${index}`}>
              <img src={src} alt={`Evidence preview ${index + 1}`} />
              <button
                type="button"
                aria-label={`Remove evidence ${index + 1}`}
                onClick={() =>
                  setEvidence((current) =>
                    current.filter((_, i) => i !== index),
                  )
                }
              >
                <X />
              </button>
            </div>
          ))}
        </div>
      ) : null}
      {cameraOpen ? (
        <div className="camera-modal">
          <video ref={videoRef} autoPlay muted playsInline />
          <div>
            <button type="button" className="outline" onClick={stopCamera}>
              Cancel
            </button>
            <button type="button" className="primary" onClick={takePhoto}>
              <Camera /> Take photo
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ReportDrawer({ close, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    category: "Roads",
    location: "",
    description: "",
    private: true,
    coordinates: null,
    evidence: [],
  });
  const [step, setStep] = useState(1);
  const [locating, setLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const valid =
    form.title.trim() && form.location.trim() && form.description.trim();
  const update = (k, v) => setForm({ ...form, [k]: v });
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage("Location is not supported by this browser.");
      return;
    }
    setLocating(true);
    setLocationMessage("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const latitude = Number(coords.latitude.toFixed(6));
        const longitude = Number(coords.longitude.toFixed(6));
        setForm((current) => ({
          ...current,
          location: `Current location (${latitude}, ${longitude})`,
          coordinates: { latitude, longitude },
        }));
        setLocationMessage(
          "Location captured. You can replace it with a landmark if needed.",
        );
        setLocating(false);
      },
      (geoError) => {
        const messages = {
          1: "Location permission was denied. Allow it in browser settings or enter a landmark.",
          2: "Your location is currently unavailable. Enter a landmark instead.",
          3: "Location request timed out. Please try again.",
        };
        setLocationMessage(
          messages[geoError.code] || "Could not get your location.",
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
  };
  return (
    <div className="overlay" onMouseDown={close}>
      <aside className="report-drawer" onMouseDown={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <div>
            <h2>Report an issue</h2>
            <p>Keep it factual, local and specific.</p>
          </div>
          <button onClick={close}>
            <X />
          </button>
        </div>
        {step === 1 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) setStep(2);
            }}
          >
            <label>
              Title <span>*</span>
              <input
                maxLength="100"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Briefly describe the problem"
              />
              <small>{form.title.length}/100</small>
            </label>
            <label>
              Category <span>*</span>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
              >
                {Object.keys(CATEGORIES).map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Location <span>*</span>
              <div className="input-icon">
                <MapPin />
                <input
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="Area or nearby landmark"
                />
              </div>
              <button
                type="button"
                className="locate-button"
                onClick={useCurrentLocation}
                disabled={locating}
              >
                <Navigation />{" "}
                {locating ? "Getting location…" : "Use my current location"}
              </button>
              {locationMessage ? (
                <small className="location-message" aria-live="polite">
                  {locationMessage}
                </small>
              ) : null}
            </label>
            <label>
              What happened? <span>*</span>
              <textarea
                maxLength="1000"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="What happened, when it started, and how it affects people."
              />
              <small>{form.description.length}/1000</small>
            </label>
            <label>
              Evidence <span className="optional">optional</span>
              <EvidencePicker
                evidence={form.evidence}
                setEvidence={(next) =>
                  setForm((current) => ({
                    ...current,
                    evidence:
                      typeof next === "function"
                        ? next(current.evidence)
                        : next,
                  }))
                }
              />
            </label>
            <label className="privacy">
              <input
                type="checkbox"
                checked={form.private}
                onChange={(e) => update("private", e.target.checked)}
              />
              <ShieldCheck />
              <p>
                <b>Keep my identity private</b>
                <span>
                  Your name and contact details will not be shown publicly.
                </span>
              </p>
            </label>
            <button className="primary submit" disabled={!valid}>
              Review report <ArrowRight />
            </button>
          </form>
        ) : (
          <div className="review">
            <div className="review-mark">
              <ShieldCheck />
            </div>
            <h3>Review before publishing</h3>
            <div>
              <span>{form.category}</span>
              <h2>{form.title}</h2>
              <p>
                <MapPin /> {form.location}, Bengaluru
              </p>
              <p>{form.description}</p>
              {form.evidence.length ? (
                <div className="review-evidence">
                  {form.evidence.map((src, index) => (
                    <img src={src} alt={`Evidence ${index + 1}`} key={index} />
                  ))}
                </div>
              ) : null}
            </div>
            <label className="declaration">
              <input type="checkbox" required defaultChecked /> I confirm this
              is based on my direct experience and does not expose someone’s
              private information.
            </label>
            <button className="primary submit" onClick={() => onSubmit(form)}>
              Publish report <ArrowRight />
            </button>
            <button className="back" onClick={() => setStep(1)}>
              Go back and edit
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
function Safety() {
  return (
    <section className="safety" id="safety">
      <div>
        <ShieldCheck />
        <h2>Built for accountability, not outrage.</h2>
      </div>
      <p>
        Reports should describe service-delivery issues, not target individuals.
        Personal details stay private, evidence can be reported, and every issue
        keeps a transparent status history.
      </p>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <Brand />
      <p>Independent civic technology for clearer local accountability.</p>
      <div>
        <a href="#explore">Explore</a>
        <a href="#how">How it works</a>
        <a href="#safety">Safety</a>
        <a href="https://www.pgportal.gov.in/" target="_blank" rel="noreferrer">
          CPGRAMS
        </a>
      </div>
      <small>
        JanAwaaz is not affiliated with any government department or political
        party.
      </small>
    </footer>
  );
}
function App() {
  const [issues, setIssues] = useState(loadIssues);
  const [reportOpen, setReportOpen] = useState(false);
  const saveIssues = (next) =>
    setIssues((current) => {
      const resolved = typeof next === "function" ? next(current) : next;
      localStorage.setItem(storageKey, JSON.stringify(resolved));
      return resolved;
    });
  const addIssue = (form) => {
    const item = {
      id: Date.now(),
      title: form.title,
      category: form.category,
      location: `${form.location}, Bengaluru`,
      time: "Just now",
      status: "Reported",
      affected: 1,
      verified: 0,
      description: form.description,
      image:
        form.evidence[0] ||
        "https://images.unsplash.com/photo-1584972191378-d70853fc47fc?auto=format&fit=crop&w=800&q=85",
      coordinates: form.coordinates,
      saved: false,
    };
    saveIssues((current) => [item, ...current]);
    setReportOpen(false);
    setTimeout(
      () =>
        document
          .querySelector("#explore")
          ?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };
  return (
    <>
      <Header openReport={() => setReportOpen(true)} />
      <Hero
        openReport={() => setReportOpen(true)}
        explore={() =>
          document
            .querySelector("#explore")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <Explore
        issues={issues}
        setIssues={saveIssues}
        openReport={() => setReportOpen(true)}
      />
      <Safety />
      <Footer />
      {reportOpen ? (
        <ReportDrawer close={() => setReportOpen(false)} onSubmit={addIssue} />
      ) : null}
    </>
  );
}
const root =
  globalThis.__janawaazRoot || createRoot(document.getElementById("root"));
globalThis.__janawaazRoot = root;
root.render(<App />);
