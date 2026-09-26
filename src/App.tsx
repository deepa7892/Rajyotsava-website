import { useState } from "react";
import "./App.css";

type Update = {
  id: number;
  date: string;
  title: string;
  description: string;
};

type EventItem = {
  id: number;
  date: string;
  title: string;
  time: string;
  venue: string;
};

type Sponsor = {
  id: number;
  name: string;
  promised: number;
  received: number;
};

type Member = {
  id: number;
  name: string;
  role: string;
};

type Photo = {
  id: number;
  name: string;
  album: string;
  url: string;
};

type FileItem = {
  id: number;
  name: string;
  type: string;
  url: string;
};

function App() {
  const [language, setLanguage] = useState<"en" | "kn">("en");
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const [updates, setUpdates] = useState<Update[]>([
    {
      id: 1,
      date: "26 Sep 2026",
      title: "Kannada Rajyotsava 2026",
      description:
        "Preparations for Kannada Rajyotsava celebrations have started.",
    },
  ]);

  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 1,
      date: "01 Nov 2026",
      title: "Kannada Rajyotsava Celebration",
      time: "10:00 AM",
      venue: "College Auditorium",
    },
  ]);

  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  const [members, setMembers] = useState<Member[]>([]);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [albumName, setAlbumName] = useState("Rajyotsava Preparation");

  // Form states
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const [editingUpdateId, setEditingUpdateId] = useState<number | null>(null);

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [editingEventId, setEditingEventId] = useState<number | null>(null);

  const [sponsorName, setSponsorName] = useState("");
  const [promisedAmount, setPromisedAmount] = useState("");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [editingSponsorId, setEditingSponsorId] = useState<number | null>(
    null
  );

  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);

  // ---------------- ADMIN ----------------

  const handleAdminLogin = () => {
    if (password === "rajyotsava123") {
      setIsAdmin(true);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  // ---------------- UPDATES ----------------

  const saveUpdate = () => {
    if (!updateTitle.trim() || !updateDescription.trim()) {
      alert("Please enter update title and description.");
      return;
    }

    if (editingUpdateId !== null) {
      setUpdates((previous) =>
        previous.map((item) =>
          item.id === editingUpdateId
            ? {
                ...item,
                title: updateTitle,
                date: updateDate || item.date,
                description: updateDescription,
              }
            : item
        )
      );
    } else {
      const newUpdate: Update = {
        id: Date.now(),
        date:
          updateDate ||
          new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        title: updateTitle,
        description: updateDescription,
      };

      setUpdates((previous) => [newUpdate, ...previous]);
    }

    clearUpdateForm();
  };

  const editUpdate = (item: Update) => {
    setEditingUpdateId(item.id);
    setUpdateTitle(item.title);
    setUpdateDate(item.date);
    setUpdateDescription(item.description);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const deleteUpdate = (id: number) => {
    if (window.confirm("Delete this update?")) {
      setUpdates((previous) => previous.filter((item) => item.id !== id));
    }
  };

  const clearUpdateForm = () => {
    setEditingUpdateId(null);
    setUpdateTitle("");
    setUpdateDate("");
    setUpdateDescription("");
  };

  // ---------------- EVENTS ----------------

  const saveEvent = () => {
    if (!eventTitle.trim() || !eventDate.trim() || !eventVenue.trim()) {
      alert("Please enter event title, date and venue.");
      return;
    }

    if (editingEventId !== null) {
      setEvents((previous) =>
        previous.map((item) =>
          item.id === editingEventId
            ? {
                ...item,
                title: eventTitle,
                date: eventDate,
                time: eventTime,
                venue: eventVenue,
              }
            : item
        )
      );
    } else {
      const newEvent: EventItem = {
        id: Date.now(),
        title: eventTitle,
        date: eventDate,
        time: eventTime,
        venue: eventVenue,
      };

      setEvents((previous) => [newEvent, ...previous]);
    }

    clearEventForm();
  };

  const editEvent = (item: EventItem) => {
    setEditingEventId(item.id);
    setEventTitle(item.title);
    setEventDate(item.date);
    setEventTime(item.time);
    setEventVenue(item.venue);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const deleteEvent = (id: number) => {
    if (window.confirm("Delete this event?")) {
      setEvents((previous) => previous.filter((item) => item.id !== id));
    }
  };

  const clearEventForm = () => {
    setEditingEventId(null);
    setEventTitle("");
    setEventDate("");
    setEventTime("");
    setEventVenue("");
  };

  // ---------------- SPONSORS ----------------

  const saveSponsor = () => {
    if (!sponsorName.trim()) {
      alert("Please enter sponsor name.");
      return;
    }

    const promised = Number(promisedAmount) || 0;
    const received = Number(receivedAmount) || 0;

    if (editingSponsorId !== null) {
      setSponsors((previous) =>
        previous.map((item) =>
          item.id === editingSponsorId
            ? {
                ...item,
                name: sponsorName,
                promised,
                received,
              }
            : item
        )
      );
    } else {
      const newSponsor: Sponsor = {
        id: Date.now(),
        name: sponsorName,
        promised,
        received,
      };

      setSponsors((previous) => [newSponsor, ...previous]);
    }

    clearSponsorForm();
  };

  const editSponsor = (item: Sponsor) => {
    setEditingSponsorId(item.id);
    setSponsorName(item.name);
    setPromisedAmount(String(item.promised));
    setReceivedAmount(String(item.received));
  };

  const deleteSponsor = (id: number) => {
    if (window.confirm("Delete this sponsor?")) {
      setSponsors((previous) => previous.filter((item) => item.id !== id));
    }
  };

  const clearSponsorForm = () => {
    setEditingSponsorId(null);
    setSponsorName("");
    setPromisedAmount("");
    setReceivedAmount("");
  };

  // ---------------- TEAM ----------------

  const saveMember = () => {
    if (!memberName.trim() || !memberRole.trim()) {
      alert("Please enter member name and role.");
      return;
    }

    if (editingMemberId !== null) {
      setMembers((previous) =>
        previous.map((item) =>
          item.id === editingMemberId
            ? {
                ...item,
                name: memberName,
                role: memberRole,
              }
            : item
        )
      );
    } else {
      const newMember: Member = {
        id: Date.now(),
        name: memberName,
        role: memberRole,
      };

      setMembers((previous) => [newMember, ...previous]);
    }

    clearMemberForm();
  };

  const editMember = (item: Member) => {
    setEditingMemberId(item.id);
    setMemberName(item.name);
    setMemberRole(item.role);
  };

  const deleteMember = (id: number) => {
    if (window.confirm("Delete this team member?")) {
      setMembers((previous) => previous.filter((item) => item.id !== id));
    }
  };

  const clearMemberForm = () => {
    setEditingMemberId(null);
    setMemberName("");
    setMemberRole("");
  };

  // ---------------- PHOTOS ----------------

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles || selectedFiles.length === 0) return;

    const newPhotos: Photo[] = Array.from(selectedFiles).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      album: albumName || "Rajyotsava Photos",
      url: URL.createObjectURL(file),
    }));

    setPhotos((previous) => [...newPhotos, ...previous]);

    event.target.value = "";
  };

  const deletePhoto = (id: number) => {
    if (window.confirm("Delete this photo?")) {
      setPhotos((previous) => previous.filter((item) => item.id !== id));
    }
  };

  // ---------------- FILES ----------------

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: FileItem[] = Array.from(selectedFiles).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type || "Other File",
      url: URL.createObjectURL(file),
    }));

    setFiles((previous) => [...newFiles, ...previous]);

    event.target.value = "";
  };

  const deleteFile = (id: number) => {
    if (window.confirm("Delete this file?")) {
      setFiles((previous) => previous.filter((item) => item.id !== id));
    }
  };

  // ---------------- TEXT ----------------

  const text = {
    home: language === "en" ? "Home" : "ಮುಖಪುಟ",
    updates: language === "en" ? "Updates" : "ನವೀಕರಣಗಳು",
    events: language === "en" ? "Events" : "ಕಾರ್ಯಕ್ರಮಗಳು",
    files: language === "en" ? "Files" : "ಫೈಲ್‌ಗಳು",
    photos: language === "en" ? "Photos" : "ಫೋಟೋಗಳು",
    sponsors: language === "en" ? "Sponsors" : "ಪ್ರಾಯೋಜಕರು",
    team: language === "en" ? "Team" : "ತಂಡ",
  };

  const totalPromised = sponsors.reduce(
    (sum, sponsor) => sum + sponsor.promised,
    0
  );

  const totalReceived = sponsors.reduce(
    (sum, sponsor) => sum + sponsor.received,
    0
  );

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="brand-icon">ಕ</div>
          <div>
            <strong>ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ</strong>
            <span>Kannada Rajyotsava 2026</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#home">{text.home}</a>
          <a href="#updates">{text.updates}</a>
          <a href="#events">{text.events}</a>
          <a href="#files">{text.files}</a>
          <a href="#photos">{text.photos}</a>
          <a href="#sponsors">{text.sponsors}</a>
          <a href="#team">{text.team}</a>
        </div>

        <div className="nav-actions">
          <button
            className="language-btn"
            onClick={() =>
              setLanguage(language === "en" ? "kn" : "en")
            }
          >
            {language === "en" ? "ಕನ್ನಡ" : "English"}
          </button>

          {!isAdmin ? (
            <a className="admin-btn" href="#admin">
              🔐 Admin
            </a>
          ) : (
            <button className="admin-btn" onClick={handleAdminLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-tag">🌼 Karnataka • Culture • Unity</span>

          <h1>
            ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ
            <br />
            <span>Kannada Rajyotsava 2026</span>
          </h1>

          <p>
            Celebrating the language, culture, heritage and spirit of
            Karnataka together.
          </p>

          <div className="hero-buttons">
            <a href="#events" className="primary-btn">
              View Events
            </a>

            <a href="#updates" className="secondary-btn">
              Latest Updates
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-symbol">ಕ</div>
          <h3>ನಮ್ಮ ಕನ್ನಡ</h3>
          <p>Our Kannada • Our Culture • Our Pride</p>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="quick-stats">
        <div className="quick-card">
          <span>📢</span>
          <div>
            <strong>{updates.length}</strong>
            <p>Updates</p>
          </div>
        </div>

        <div className="quick-card">
          <span>📅</span>
          <div>
            <strong>{events.length}</strong>
            <p>Events</p>
          </div>
        </div>

        <div className="quick-card">
          <span>📸</span>
          <div>
            <strong>{photos.length}</strong>
            <p>Photos</p>
          </div>
        </div>

        <div className="quick-card">
          <span>👥</span>
          <div>
            <strong>{members.length}</strong>
            <p>Team Members</p>
          </div>
        </div>
      </section>

      {/* UPDATES */}
      <section className="section" id="updates">
        <div className="section-heading">
          <div>
            <span className="section-label">📢 UPDATES</span>
            <h2>Latest Updates</h2>
          </div>
        </div>

        <div className="updates-grid">
          {updates.length === 0 ? (
            <div className="empty-box">
              <h3>No updates yet</h3>
              <p>New announcements will appear here.</p>
            </div>
          ) : (
            updates.map((item) => (
              <article className="update-card" key={item.id}>
                <span className="date-badge">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                {isAdmin && (
                  <div className="card-actions">
                    <button onClick={() => editUpdate(item)}>✏️ Edit</button>
                    <button onClick={() => deleteUpdate(item.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </section>

      {/* EVENTS */}
      <section className="section alternate-section" id="events">
        <div className="section-heading">
          <div>
            <span className="section-label">📅 EVENTS</span>
            <h2>Upcoming Events</h2>
          </div>
        </div>

        <div className="events-grid">
          {events.length === 0 ? (
            <div className="empty-box">
              <h3>No events added yet</h3>
              <p>Event details will appear here.</p>
            </div>
          ) : (
            events.map((item) => (
              <article className="event-card" key={item.id}>
                <div className="event-date">
                  <strong>{item.date}</strong>
                </div>

                <div className="event-info">
                  <h3>{item.title}</h3>
                  <p>🕐 {item.time || "Time will be announced"}</p>
                  <p>📍 {item.venue}</p>

                  {isAdmin && (
                    <div className="card-actions">
                      <button onClick={() => editEvent(item)}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => deleteEvent(item.id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>

        <div className="resources-box">
          <h3>📁 Event Resources</h3>
          <p>Important event documents and resources can be added here.</p>
        </div>
      </section>

      {/* PHOTOS */}
      <section className="section" id="photos">
        <div className="section-heading">
          <div>
            <span className="section-label">📸 PHOTOS</span>
            <h2>Photos & Albums</h2>
          </div>
        </div>

        {photos.length === 0 ? (
          <div className="empty-box">
            <h3>No photos uploaded yet</h3>
            <p>Photos will appear here after uploading.</p>
          </div>
        ) : (
          <div className="photos-grid">
            {photos.map((photo) => (
              <div className="photo-card" key={photo.id}>
                <img src={photo.url} alt={photo.name} />

                <div className="photo-info">
                  <strong>{photo.name}</strong>
                  <span>{photo.album}</span>

                  {isAdmin && (
                    <button onClick={() => deletePhoto(photo.id)}>
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FILES */}
      <section className="section alternate-section" id="files">
        <div className="section-heading">
          <div>
            <span className="section-label">📁 FILES</span>
            <h2>Available Files</h2>
          </div>
        </div>

        {files.length === 0 ? (
          <div className="empty-box">
            <h3>No files uploaded yet</h3>
            <p>PDFs, documents and other files will appear here.</p>
          </div>
        ) : (
          <div className="files-grid">
            {files.map((file) => (
              <div className="file-card" key={file.id}>
                <div className="file-icon">📄</div>

                <div>
                  <strong>{file.name}</strong>
                  <span>{file.type}</span>
                </div>

                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="view-btn"
                >
                  View
                </a>

                {isAdmin && (
                  <button onClick={() => deleteFile(file.id)}>
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SPONSORS */}
      <section className="section" id="sponsors">
        <div className="section-heading">
          <div>
            <span className="section-label">🤝 SPONSORS</span>
            <h2>Our Sponsors</h2>
          </div>
        </div>

        <div className="sponsor-summary">
          <div>
            <span>Promised</span>
            <strong>₹{totalPromised.toLocaleString("en-IN")}</strong>
          </div>

          <div>
            <span>Received</span>
            <strong>₹{totalReceived.toLocaleString("en-IN")}</strong>
          </div>

          <div>
            <span>Pending</span>
            <strong>
              ₹{Math.max(totalPromised - totalReceived, 0).toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        {sponsors.length === 0 ? (
          <div className="empty-box">
            <h3>No sponsors added yet</h3>
            <p>Sponsor details will appear here.</p>
          </div>
        ) : (
          <div className="sponsors-grid">
            {sponsors.map((sponsor) => (
              <div className="sponsor-card" key={sponsor.id}>
                <h3>{sponsor.name}</h3>

                <p>
                  Promised: ₹
                  {sponsor.promised.toLocaleString("en-IN")}
                </p>

                <p>
                  Received: ₹
                  {sponsor.received.toLocaleString("en-IN")}
                </p>

                <p>
                  Pending: ₹
                  {Math.max(
                    sponsor.promised - sponsor.received,
                    0
                  ).toLocaleString("en-IN")}
                </p>

                {isAdmin && (
                  <div className="card-actions">
                    <button onClick={() => editSponsor(sponsor)}>
                      ✏️ Edit
                    </button>
                    <button onClick={() => deleteSponsor(sponsor.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TEAM */}
      <section className="section alternate-section" id="team">
        <div className="section-heading">
          <div>
            <span className="section-label">👥 TEAM</span>
            <h2>Our Team</h2>
          </div>
        </div>

        {members.length === 0 ? (
          <div className="empty-box">
            <h3>Our team members will appear here</h3>
            <p>
              Everyone contributing to Kannada Rajyotsava 2026 can be
              added here.
            </p>
          </div>
        ) : (
          <div className="team-grid">
            {members.map((member) => (
              <div className="team-card" key={member.id}>
                <div className="team-avatar">
                  {member.name.charAt(0).toUpperCase()}
                </div>

                <h3>{member.name}</h3>
                <p>{member.role}</p>

                {isAdmin && (
                  <div className="card-actions">
                    <button onClick={() => editMember(member)}>
                      ✏️ Edit
                    </button>
                    <button onClick={() => deleteMember(member.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ADMIN */}
      <section className="section admin-section" id="admin">
        <div className="section-heading">
          <div>
            <span className="section-label">🔐 ADMIN</span>
            <h2>Admin Panel</h2>
          </div>
        </div>

        {!isAdmin ? (
          <div className="admin-login">
            <h3>Admin Login</h3>

            <p>
              Only the administrator can add, edit or delete website
              content.
            </p>

            <div className="admin-login-form">
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAdminLogin();
                  }
                }}
              />

              <button onClick={handleAdminLogin}>Login</button>
            </div>
          </div>
        ) : (
          <div className="admin-panel">
            <div className="admin-welcome">
              <div>
                <span className="section-label">ADMIN ACCESS</span>
                <h3>Manage Kannada Rajyotsava Website</h3>
                <p>
                  Add, edit, delete updates, events, sponsors and team
                  members. You can also upload photos and files.
                </p>
              </div>

              <button onClick={handleAdminLogout}>Logout</button>
            </div>

            {/* UPDATE FORM */}
            <div className="admin-card">
              <h3>
                {editingUpdateId !== null
                  ? "✏️ Edit Update"
                  : "📢 Add Update"}
              </h3>

              <div className="form-grid">
                <input
                  placeholder="Update title"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                />

                <input
                  placeholder="Date"
                  value={updateDate}
                  onChange={(e) => setUpdateDate(e.target.value)}
                />

                <textarea
                  placeholder="Update description"
                  value={updateDescription}
                  onChange={(e) =>
                    setUpdateDescription(e.target.value)
                  }
                />
              </div>

              <div className="form-buttons">
                <button className="primary-btn" onClick={saveUpdate}>
                  {editingUpdateId !== null
                    ? "Update"
                    : "Add Update"}
                </button>

                {editingUpdateId !== null && (
                  <button
                    className="secondary-btn"
                    onClick={clearUpdateForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* EVENT FORM */}
            <div className="admin-card">
              <h3>
                {editingEventId !== null
                  ? "✏️ Edit Event"
                  : "📅 Add Event"}
              </h3>

              <div className="form-grid">
                <input
                  placeholder="Event title"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />

                <input
                  placeholder="Date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />

                <input
                  placeholder="Time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />

                <input
                  placeholder="Venue"
                  value={eventVenue}
                  onChange={(e) => setEventVenue(e.target.value)}
                />
              </div>

              <div className="form-buttons">
                <button className="primary-btn" onClick={saveEvent}>
                  {editingEventId !== null ? "Update" : "Add Event"}
                </button>

                {editingEventId !== null && (
                  <button
                    className="secondary-btn"
                    onClick={clearEventForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* SPONSOR FORM */}
            <div className="admin-card">
              <h3>
                {editingSponsorId !== null
                  ? "✏️ Edit Sponsor"
                  : "🤝 Add Sponsor"}
              </h3>

              <div className="form-grid">
                <input
                  placeholder="Sponsor name"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Promised amount"
                  value={promisedAmount}
                  onChange={(e) =>
                    setPromisedAmount(e.target.value)
                  }
                />

                <input
                  type="number"
                  placeholder="Received amount"
                  value={receivedAmount}
                  onChange={(e) =>
                    setReceivedAmount(e.target.value)
                  }
                />
              </div>

              <div className="form-buttons">
                <button className="primary-btn" onClick={saveSponsor}>
                  {editingSponsorId !== null
                    ? "Update"
                    : "Add Sponsor"}
                </button>

                {editingSponsorId !== null && (
                  <button
                    className="secondary-btn"
                    onClick={clearSponsorForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* TEAM FORM */}
            <div className="admin-card">
              <h3>
                {editingMemberId !== null
                  ? "✏️ Edit Team Member"
                  : "👥 Add Team Member"}
              </h3>

              <div className="form-grid">
                <input
                  placeholder="Member name"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                />

                <input
                  placeholder="Role / Responsibility"
                  value={memberRole}
                  onChange={(e) => setMemberRole(e.target.value)}
                />
              </div>

              <div className="form-buttons">
                <button className="primary-btn" onClick={saveMember}>
                  {editingMemberId !== null
                    ? "Update"
                    : "Add Member"}
                </button>

                {editingMemberId !== null && (
                  <button
                    className="secondary-btn"
                    onClick={clearMemberForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* PHOTO UPLOAD */}
            <div className="admin-card">
              <h3>📸 Upload Photos</h3>

              <div className="form-grid">
                <input
                  placeholder="Album name"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                />

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                />
              </div>

              <p className="admin-note">
                You can select multiple photos at once.
              </p>
            </div>

            {/* FILE UPLOAD */}
            <div className="admin-card">
              <h3>📁 Upload Documents / Files</h3>

              <div className="form-grid">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip,image/*"
                  onChange={handleFileUpload}
                />
              </div>

              <p className="admin-note">
                PDF, Word, PowerPoint, Excel, text, ZIP and image
                files are supported.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <h3>ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ 2026</h3>
          <p>
            Celebrating Kannada language, culture and unity.
          </p>
        </div>

        <div className="footer-right">
          <p>Made with ❤️ by our team</p>
          <p>© 2026 Kannada Rajyotsava</p>
        </div>
      </footer>
    </div>
  );
}

export default App;