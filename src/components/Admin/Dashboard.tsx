import maaShardaLogo from '../../images/maa-sharda.jpeg';

const studentCounts = [
  { label: 'Total students', count: '128', icon: '♟', accent: 'blue' },
  { label: 'Classical Music', count: '42', icon: '♫', accent: 'gold' },
  { label: 'Light Music', count: '30', icon: '♪', accent: 'rose' },
  { label: 'Harmonium', count: '24', icon: '♬', accent: 'green' },
  { label: 'Guitar', count: '32', icon: '♩', accent: 'purple' },
];

const Dashboard = () => (
  <section className="admin-welcome" aria-labelledby="admin-welcome-title">
    <div className="admin-welcome__glow admin-welcome__glow--one" aria-hidden="true" />
    <div className="admin-welcome__glow admin-welcome__glow--two" aria-hidden="true" />
    <div className="admin-welcome__content">
      <div className="admin-welcome__card">
        <div className="admin-welcome__logo-wrap">
          <img src={maaShardaLogo} alt="Maa Sharda Sangeet Academy" className="admin-welcome__logo" />
        </div>
        <div className="admin-welcome__copy">
          <p className="admin-welcome__eyebrow">MAA SHARDA SANGEET ACADEMY</p>
          <h1 id="admin-welcome-title">Welcome to Sharda Academy</h1>
          <p className="admin-welcome__message">Your academy overview, all in one place.</p>
        </div>
      </div>
      <div className="admin-welcome__section-heading">
        <div>
          <span>ACADEMY AT A GLANCE</span>
          <h2>Student overview</h2>
        </div>
        <p>Current enrollment across your music programs</p>
      </div>
      <div className="admin-student-counts" aria-label="Student counts by program">
        {studentCounts.map((item) => (
          <article className={`admin-student-count admin-student-count--${item.accent}`} key={item.label}>
            <span className="admin-student-count__icon" aria-hidden="true">{item.icon}</span>
            <div><p>{item.label}</p><strong>{item.count}</strong><small>students</small></div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Dashboard;
