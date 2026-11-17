'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE, CABIN_CLASSES } from '@/lib/config';
import { ChevronDown, Minus, Plane, Plus, Search, Sparkle, Swap, Users } from './Icons';

const today = () => new Date().toISOString().slice(0, 10);

const BUDGETS = [
  { label: 'Any Budget', value: '' },
  { label: 'Under ₹25,000', value: '0-25000' },
  { label: '₹25,000 – ₹50,000', value: '25000-50000' },
  { label: '₹50,000 – ₹1,00,000', value: '50000-100000' },
  { label: '₹1,00,000 – ₹2,00,000', value: '100000-200000' },
  { label: '₹2,00,000+', value: '200000-' },
];

const DURATIONS = [
  { label: 'Any Duration', value: '' },
  { label: 'Up to 3 nights', value: '0-3' },
  { label: '4 – 5 nights', value: '4-5' },
  { label: '6 – 7 nights', value: '6-7' },
  { label: '8 nights & more', value: '8-' },
];

const CATEGORIES = ['Romantic', 'Family', 'Cultural', 'Luxury', 'Adventure', 'Budget'];

/* ------------------------------ airport input ----------------------------- */

function AirportField({ label, value, onChange, placeholder }) {
  const [query, setQuery] = useState(value?.city || '');
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/flights/airports?q=${encodeURIComponent(query.trim())}`,
          { signal: ctrl.signal }
        );
        const json = await res.json();
        setResults(json?.data || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query]);

  return (
    <div className="sf" ref={boxRef}>
      <span className="sf__label">{label}</span>
      <div className={`sf__box${open ? ' is-focus' : ''}`}>
        <input
          className="sf__value sf__value--big"
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          aria-label={label}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange({ city: e.target.value, code: '' });
            setOpen(true);
          }}
        />
        {open && (query.trim().length >= 2 || results.length > 0) && (
          <div className="suggest" role="listbox">
            {loading && <div className="suggest__empty">Searching airports…</div>}
            {!loading && results.length === 0 && (
              <div className="suggest__empty">
                No airport matched “{query}”. You can still search by typing the city name.
              </div>
            )}
            {results.map((a) => (
              <button
                type="button"
                key={a.code || a.iataCode || a._id || a.name}
                className="suggest__item"
                onClick={() => {
                  const code = a.code || a.iataCode || '';
                  setQuery(a.city || a.name);
                  onChange({ city: a.city || a.name, code });
                  setOpen(false);
                }}
              >
                <Plane size={14} />
                <span>
                  {a.city || a.name}
                  {a.country ? `, ${a.country}` : ''}
                </span>
                <span className="suggest__code">{a.code || a.iataCode}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------- travellers ------------------------------ */

function TravellersField({ travellers, setTravellers, cabin, setCabin }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const total = travellers.adults + travellers.children + travellers.infants;
  const set = (key, delta, min = 0, max = 9) =>
    setTravellers((t) => ({ ...t, [key]: Math.min(max, Math.max(min, t[key] + delta)) }));

  const rows = [
    { key: 'adults', label: 'Adults', hint: '12+ yrs', min: 1 },
    { key: 'children', label: 'Children', hint: '2–11 yrs', min: 0 },
    { key: 'infants', label: 'Infants', hint: 'Under 2', min: 0 },
  ];

  return (
    <div className="sf" ref={ref} style={{ position: 'relative' }}>
      <span className="sf__label">Travellers</span>
      <div className={`sf__box${open ? ' is-focus' : ''}`}>
        <button
          type="button"
          className="sf__value"
          style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <Users size={16} />
          {total} traveller{total > 1 ? 's' : ''}
          <ChevronDown size={14} style={{ marginLeft: 'auto', opacity: 0.6 }} />
        </button>
      </div>
      {open && (
        <div className="sf__popover">
          {rows.map((r) => (
            <div className="stepper" key={r.key}>
              <span>
                {r.label} <small style={{ opacity: 0.6 }}>{r.hint}</small>
              </span>
              <span className="stepper__ctrl">
                <button
                  type="button"
                  onClick={() => set(r.key, -1, r.min)}
                  disabled={travellers[r.key] <= r.min}
                  aria-label={`Remove ${r.label}`}
                >
                  <Minus size={12} />
                </button>
                <b style={{ minWidth: '1ch', textAlign: 'center' }}>{travellers[r.key]}</b>
                <button type="button" onClick={() => set(r.key, 1)} aria-label={`Add ${r.label}`}>
                  <Plus size={12} />
                </button>
              </span>
            </div>
          ))}
          <div className="field" style={{ marginTop: '0.3rem' }}>
            <label htmlFor="cabin-class">Cabin class</label>
            <select
              id="cabin-class"
              className="select"
              value={cabin}
              onChange={(e) => setCabin(e.target.value)}
            >
              {CABIN_CLASSES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- main --------------------------------- */

export default function SearchBar({ destinations = [], defaultTab = 'flights', variant = 'hero' }) {
  const router = useRouter();
  const [tab, setTab] = useState(defaultTab);

  // flights
  const [tripType, setTripType] = useState('round');
  const [legs, setLegs] = useState([{ from: null, to: null, date: '' }]);
  const [ret, setRet] = useState('');
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabin, setCabin] = useState('Y');
  const [error, setError] = useState('');

  // packages
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');

  const minDate = useMemo(() => today(), []);

  const updateLeg = (index, patch) =>
    setLegs((prev) => prev.map((l, i) => (i === index ? { ...l, ...patch } : l)));

  const swap = () => {
    setLegs((prev) => prev.map((l) => ({ ...l, from: l.to, to: l.from })));
  };

  const searchFlights = () => {
    setError('');
    const active = tripType === 'multi' ? legs : legs.slice(0, 1);

    if (tripType === 'multi') {
      const complete = legs.filter((l) => l.from?.city && l.to?.city && l.date);
      if (complete.length < 2) {
        setError('Add at least two complete legs for a multi-city search.');
        return;
      }
      const params = new URLSearchParams({
        type: 'multi',
        legs: JSON.stringify(complete),
        adults: String(travellers.adults),
        children: String(travellers.children),
        infants: String(travellers.infants),
        cabin,
      });
      router.push(`/flights/search?${params.toString()}`);
      return;
    }

    const leg = active[0];
    if (!leg?.from?.city || !leg?.to?.city || !leg?.date) {
      setError('Please add a from city, a destination and a departure date.');
      return;
    }

    const params = new URLSearchParams({
      type: tripType,
      from: leg.from.city,
      fromCode: leg.from.code || '',
      to: leg.to.city,
      toCode: leg.to.code || '',
      depart: leg.date,
      ...(tripType === 'round' && ret ? { return: ret } : {}),
      adults: String(travellers.adults),
      children: String(travellers.children),
      infants: String(travellers.infants),
      cabin,
    });
    router.push(`/flights/search?${params.toString()}`);
  };

  const searchPackages = () => {
    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (category) params.set('category', category);
    if (budget) params.set('price', budget);
    if (duration) {
      const [minDays, maxDays] = duration.split('-');
      if (minDays) params.set('minDays', minDays);
      if (maxDays) params.set('maxDays', maxDays);
    }
    router.push(`/packages${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="search-card" id="search">
      <div className="search-tabs">
        <div className="search-tabs__group" role="tablist" aria-label="Search type">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'flights'}
            className={`search-tab${tab === 'flights' ? ' is-active' : ''}`}
            onClick={() => setTab('flights')}
          >
            Flights
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'packages'}
            className={`search-tab${tab === 'packages' ? ' is-active' : ''}`}
            onClick={() => setTab('packages')}
          >
            Holiday Packages
          </button>
        </div>
        <span className="search-tabs__note">
          <Sparkle size={12} />{' '}
          {variant === 'hero' ? 'Curated by real travel experts' : 'Real inventory, real prices'}
        </span>
      </div>

      {tab === 'flights' ? (
        <>
          <div className="search-meta" style={{ marginTop: 0, marginBottom: '0.9rem' }}>
            {[
              { id: 'round', label: 'Round trip' },
              { id: 'oneway', label: 'One way' },
              { id: 'multi', label: 'Multi city' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                className={`chip${tripType === t.id ? ' is-active' : ''}`}
                onClick={() => {
                  setTripType(t.id);
                  if (t.id === 'multi' && legs.length < 2) {
                    setLegs((prev) => [...prev, { from: null, to: null, date: '' }]);
                  }
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tripType === 'multi' ? (
            <div style={{ display: 'grid', gap: '0.7rem' }}>
              {legs.map((leg, i) => (
                <div className="search-fields" key={i}>
                  <AirportField
                    label={`From (leg ${i + 1})`}
                    value={leg.from}
                    placeholder="City"
                    onChange={(v) => updateLeg(i, { from: v })}
                  />
                  <span />
                  <AirportField
                    label="To"
                    value={leg.to}
                    placeholder="City"
                    onChange={(v) => updateLeg(i, { to: v })}
                  />
                  <div className="sf">
                    <span className="sf__label">Departure</span>
                    <div className="sf__box">
                      <input
                        type="date"
                        min={minDate}
                        value={leg.date}
                        aria-label={`Departure date leg ${i + 1}`}
                        onChange={(e) => updateLeg(i, { date: e.target.value })}
                      />
                    </div>
                  </div>
                  {i === legs.length - 1 ? (
                    <div className="sf">
                      <span className="sf__label">Travellers</span>
                      <TravellersField
                        travellers={travellers}
                        setTravellers={setTravellers}
                        cabin={cabin}
                        setCabin={setCabin}
                      />
                    </div>
                  ) : (
                    <div />
                  )}
                  <button
                    type="button"
                    className="swap-btn"
                    aria-label="Remove leg"
                    onClick={() => setLegs((prev) => prev.filter((_, idx) => idx !== i))}
                    disabled={legs.length <= 2}
                  >
                    <Minus size={14} />
                  </button>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  className="chip"
                  onClick={() => setLegs((prev) => [...prev, { from: null, to: null, date: '' }])}
                >
                  <Plus size={12} style={{ display: 'inline', verticalAlign: '-2px' }} /> Add another city
                </button>
              </div>
            </div>
          ) : (
            <div className="search-fields">
              <AirportField
                label="From city"
                value={legs[0].from}
                placeholder="City"
                onChange={(v) => updateLeg(0, { from: v })}
              />
              <button type="button" className="swap-btn" onClick={swap} aria-label="Swap cities">
                <Swap size={15} />
              </button>
              <AirportField
                label="To city"
                value={legs[0].to}
                placeholder="City"
                onChange={(v) => updateLeg(0, { to: v })}
              />
              <div className="sf">
                <span className="sf__label">Departure</span>
                <div className="sf__box">
                  <input
                    type="date"
                    min={minDate}
                    value={legs[0].date}
                    aria-label="Departure date"
                    onChange={(e) => updateLeg(0, { date: e.target.value })}
                  />
                </div>
              </div>
              <div className="sf">
                <span className="sf__label">Return</span>
                <div className="sf__box">
                  <input
                    type="date"
                    min={legs[0].date || minDate}
                    value={ret}
                    disabled={tripType !== 'round'}
                    aria-label="Return date"
                    onChange={(e) => setRet(e.target.value)}
                  />
                </div>
              </div>
              <TravellersField
                travellers={travellers}
                setTravellers={setTravellers}
                cabin={cabin}
                setCabin={setCabin}
              />
              <button type="button" className="search-submit" onClick={searchFlights}>
                <Search size={16} /> Search
              </button>
            </div>
          )}

          {tripType === 'multi' && (
            <div style={{ marginTop: '0.8rem' }}>
              <button type="button" className="search-submit" onClick={searchFlights}>
                <Search size={16} /> Search flights
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="search-fields search-fields--packages">
          <div className="sf">
            <span className="sf__label">Destination</span>
            <div className="sf__box">
              <select
                className="sf__value"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                aria-label="Destination"
              >
                <option value="">Anywhere</option>
                {destinations.map((d) => (
                  <option key={d._id || d.slug} value={d.slug}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sf">
            <span className="sf__label">Travel style</span>
            <div className="sf__box">
              <select
                className="sf__value"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Travel style"
              >
                <option value="">Any style</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sf">
            <span className="sf__label">Duration</span>
            <div className="sf__box">
              <select
                className="sf__value"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                aria-label="Duration"
              >
                {DURATIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sf">
            <span className="sf__label">Budget</span>
            <div className="sf__box">
              <select
                className="sf__value"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                aria-label="Budget"
              >
                {BUDGETS.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="button" className="search-submit" onClick={searchPackages}>
            <Search size={16} /> Search
          </button>
        </div>
      )}

      {error && (
        <p className="form-error" style={{ marginTop: '0.8rem' }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
