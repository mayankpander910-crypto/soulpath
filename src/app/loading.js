export default function Loading() {
  return (
    <div className="container" style={{ paddingTop: 'calc(var(--header-h) + 3rem)', paddingBottom: '4rem' }}>
      <div className="skeleton" style={{ height: 14, width: 120, marginBottom: 22 }} />
      <div className="skeleton" style={{ height: 54, width: '72%', marginBottom: 18 }} />
      <div className="skeleton" style={{ height: 18, width: '52%', marginBottom: 40 }} />
      <div className="pkg-grid">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <div className="skeleton" style={{ aspectRatio: '4 / 3', marginBottom: 14 }} />
            <div className="skeleton" style={{ height: 18, width: '80%', marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 14, width: '60%' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
