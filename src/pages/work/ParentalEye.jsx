import DocLayout from "../DocLayout.jsx";

// Data flow, drawn from the parental-eye-express and parental-eye-react code.
function Diagram() {
  return (
    <svg className="diagram" viewBox="0 0 760 330" role="img"
      aria-label="Devices publish GPS points over MQTT to a broker; the Express server checks geofences, stores points in PostGIS and pushes alerts to React dashboards over Socket.IO and email.">
      <defs>
        <marker id="pe-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path className="arrow" d="M0 0L10 5L0 10z" />
        </marker>
      </defs>

      <rect className="box" x="20" y="40" width="150" height="70" rx="10" />
      <text className="label" x="95" y="70" textAnchor="middle">GPS device</text>
      <text className="sub" x="95" y="90" textAnchor="middle">child or driver</text>

      <rect className="box" x="240" y="40" width="150" height="70" rx="10" />
      <text className="label" x="315" y="70" textAnchor="middle">MQTT broker</text>
      <text className="sub" x="315" y="90" textAnchor="middle">HiveMQ</text>

      <rect className="box box--accent" x="460" y="24" width="280" height="102" rx="10" />
      <text className="label" x="600" y="54" textAnchor="middle">Express server</text>
      <text className="sub" x="600" y="76" textAnchor="middle">geofence check with Turf.js</text>
      <text className="sub" x="600" y="94" textAnchor="middle">30 s inactivity, 5 min alert cooldown</text>
      <text className="sub" x="600" y="112" textAnchor="middle">roles and permissions</text>

      <rect className="box" x="460" y="220" width="280" height="70" rx="10" />
      <text className="label" x="600" y="250" textAnchor="middle">PostgreSQL + PostGIS</text>
      <text className="sub" x="600" y="270" textAnchor="middle">points marked safe or danger</text>

      <rect className="box" x="20" y="220" width="370" height="70" rx="10" />
      <text className="label" x="205" y="250" textAnchor="middle">React dashboards</text>
      <text className="sub" x="205" y="270" textAnchor="middle">live map, geofence drawing, history, reports, five roles</text>

      <path className="edge" d="M170 75H236" markerEnd="url(#pe-arrow)" />
      <text className="edge-label" x="203" y="66" textAnchor="middle">publish</text>
      <path className="edge" d="M390 75H456" markerEnd="url(#pe-arrow)" />
      <text className="edge-label" x="423" y="66" textAnchor="middle">subscribe</text>
      <path className="edge" d="M600 126V216" markerEnd="url(#pe-arrow)" />
      <text className="edge-label" x="608" y="176">store</text>
      <path className="edge" d="M520 126V170H205V216" markerEnd="url(#pe-arrow)" />
      <text className="edge-label" x="300" y="162">Socket.IO alerts and email</text>
    </svg>
  );
}

export default function ParentalEye() {
  return (
    <DocLayout
      back={{ to: "/#projects", label: "All work" }}
      eyebrow="Case study · Final-year project"
      title="Parental Eye: real-time tracking with geofences"
      lead="A system that shows parents and school transport operators where a child or vehicle is, and alerts them the moment it leaves a safe area."
    >
      <dl className="doc-facts">
        <div><dt>When</dt><dd>Oct 2024 – Jun 2025</dd></div>
        <div><dt>Team</dt><dd>Four students, PUCIT</dd></div>
        <div><dt>My part</dt><dd>108 of 118 commits, 19 merged pull requests</dd></div>
        <div><dt>Stack</dt><dd>React, Leaflet, Node.js, MQTT, Socket.IO, PostGIS</dd></div>
      </dl>

      <p className="doc-links">
        <a href="https://parental-eye-react.vercel.app">Live demo</a>
        <a href="https://github.com/maferozi/parental-eye-express">Backend code</a>
        <a href="https://github.com/maferozi/parental-eye-react">Frontend code</a>
      </p>

      <figure className="doc-figure">
        <img src="/work/parental-eye.webp" width="1200" height="400" alt="Parental Eye home page: Know where they are. Every step, every second." loading="lazy" />
        <figcaption>The public home page of the live demo.</figcaption>
      </figure>

      <h2>The problem</h2>
      <p>
        Parents and school transport operators need two things: to see where a child or vehicle is right now, and to be
        told immediately when it goes somewhere it shouldn’t. A map that someone has to keep watching doesn’t solve the
        second part, so the system has to decide on its own when a location is a problem.
      </p>

      <h2>How it works</h2>
      <figure className="doc-figure">
        <Diagram />
        <figcaption>From a GPS point to an alert. Every box is in the code linked above.</figcaption>
      </figure>
      <p>
        Each device publishes its position to its own MQTT topic (<code>tracking/location/&lt;device&gt;</code>) on a
        HiveMQ broker. MQTT suits this: it is light enough for small devices and keeps a single connection open instead of
        polling. The Express server subscribes to those topics and handles every point as it arrives.
      </p>
      <p>
        For each point the server loads the device’s geofences and checks them with Turf.js. There are three kinds: a
        circle (distance from the centre), a polygon (point-in-polygon), and a route, where the point must stay close to
        the nearest point on a drawn line. The point is stored in PostgreSQL with the PostGIS extension, marked safe or
        danger, and danger points are pushed to the right people over Socket.IO and by email.
      </p>

      <h2>Decisions that mattered</h2>
      <h3>Alerts that don’t flood</h3>
      <p>
        A device that leaves a geofence keeps sending points from outside it. Without care, that becomes an alert every
        few seconds. The server keeps a five-minute cooldown per user and device, so a guardian hears about a problem once,
        not fifty times.
      </p>
      <h3>Knowing when a device goes quiet</h3>
      <p>
        Silence can be as important as a bad location. If a device sends nothing for 30 seconds, the server marks it
        inactive, so the dashboard never shows an old position as if it were live.
      </p>
      <h3>Five roles in one model</h3>
      <p>
        Super admins, admins, guardians, drivers and children see different things. Instead of separate tables, the
        hierarchy is modelled as self-references on one users table, which keeps permission checks in one place.
      </p>
      <h3>Drawing geofences on the map</h3>
      <p>
        Guardians draw circles, polygons and routes directly on a Leaflet map (with leaflet-draw). The shapes are saved as
        geometry, so the same data drives both the map and the server-side check.
      </p>

      <h2>What I would improve next</h2>
      <ul>
        <li>
          Move the geofence check into PostGIS queries. The geometry is already in the database, and spatial indexes would
          scale better than checking every shape in the application for every point.
        </li>
        <li>Load-test the pipeline with simulated devices and measure the time from a GPS point to an alert.</li>
        <li>Let guardians set the alert cooldown per geofence instead of one fixed value.</li>
      </ul>
    </DocLayout>
  );
}
