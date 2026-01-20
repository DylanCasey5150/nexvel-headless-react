import { useEffect, useState } from "react";
import { WP_BASE } from "../config";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return res.json();
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("loading"); 
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");

        // Fetch services
        const svc = await fetchJSON(`${WP_BASE}/wp-json/wp/v2/services?per_page=100`);

        // Collect unique icon IDs
        const iconIds = [...new Set(svc.map(s => s?.acf?.icon).filter(Boolean))];

        // Fetch icon media URLs
        const mediaPairs = await Promise.all(
          iconIds.map(async (id) => {
            const media = await fetchJSON(`${WP_BASE}/wp-json/wp/v2/media/${id}`);
            return [id, media?.source_url || ""];
          })
        );

        const iconMap = Object.fromEntries(mediaPairs);

        // Normalize data for the UI
        const enriched = svc.map(s => ({
          id: s.id,
          title: s?.title?.rendered ?? "",
          description: s?.acf?.description ?? "",
          iconUrl: s?.acf?.icon ? iconMap[s.acf.icon] : ""
        }));

        if (!cancelled) {
          setServices(enriched);
          setStatus("ready");
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Something went wrong");
          setStatus("error");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page">
      <h1>Services</h1>
      <p className="lead">
        Services are managed in WordPress and rendered here via the REST API.
      </p>

      {status === "loading" && (
        <p style={{ marginTop: 18 }}>Loading services…</p>
      )}

      {status === "error" && (
        <div className="notice" style={{ marginTop: 18 }}>
          <strong>Couldn’t load services.</strong>
          <div style={{ marginTop: 6, color: "var(--muted)" }}>
            {error}
          </div>
        </div>
      )}

      {status === "ready" && (
        <div className="grid">
          {services.map((s) => (
            <article key={s.id} className="card">
              <div className="card__top">
                <div className="icon">
                  {s.iconUrl ? <img src={s.iconUrl} alt="" /> : null}
                </div>

                <h2
                  className="card__title"
                  dangerouslySetInnerHTML={{ __html: s.title }}
                />
              </div>

              <p className="card__desc">{s.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}