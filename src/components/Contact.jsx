import { useState, useSyncExternalStore } from 'react';
import { scrollToTarget } from '../lib/motion';
import { BrandIcon, Icon } from '../lib/icons';
import { useStrings } from '../i18n';

const WEB3FORMS_KEY = '0747e6a8-4350-4ca8-b840-8aaf7effeb64';
const EMPTY_FORM = { name: '', email: '', message: '' };

const formatTime = (locale) =>
  new Intl.DateTimeFormat(locale, {
    timeZone: 'America/Bogota',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date());

const subscribeClock = (onChange) => {
  const interval = setInterval(onChange, 30_000);
  return () => clearInterval(interval);
};

function Contact({ profile }) {
  const t = useStrings().contact;
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [copied, setCopied] = useState(false);
  // Client only: the prerendered HTML has no time, so hydration never finds a
  // different one (a mismatch makes React discard the prerendered page)
  const time = useSyncExternalStore(subscribeClock, () => formatTime(t.timeLocale), () => '');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: t.missing });
      return;
    }

    setStatus({ type: 'sending', message: t.sending });
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...form,
          subject: t.subject(form.name)
        })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      setStatus({ type: 'success', message: t.sent });
      setForm(EMPTY_FORM);
    } catch {
      setStatus({ type: 'error', message: t.failed });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: 'GitHub', href: profile.github, icon: <BrandIcon name="github" size={14} /> },
    { label: 'LinkedIn', href: profile.linkedin, icon: <BrandIcon name="linkedin" size={14} /> },
    { label: 'Blog', href: profile.blog, icon: <Icon name="pen" size={14} /> },
    { label: 'Suite', href: 'https://jesusflorez.cloud', icon: <Icon name="globe" size={14} /> }
  ];

  return (
    <section className="section container contact" id="contacto" aria-labelledby="contacto-title">
      <div className="contact__grid">
        <div className="contact__intro">
          <h2 className="section-title" id="contacto-title" data-fade>{t.title}</h2>
          <p className="section-intro" data-fade>
            {t.intro}
          </p>
          <div className="contact__mail-row" data-fade>
            <a className="contact__mail" href={`mailto:${profile.email}`}>{profile.email}</a>
            <button
              type="button"
              className="icon-button"
              onClick={copyEmail}
              aria-label={copied ? t.copiedLabel : t.copy}
              title={copied ? t.copied : t.copy}
            >
              <Icon name={copied ? 'check' : 'copy'} />
            </button>
          </div>
          <p className="contact__status-line" aria-live="polite">{copied ? t.copiedStatus : ''}</p>
        </div>

        <form className="card contact__form" onSubmit={onSubmit} noValidate data-fade>
          <label className="field">
            <span>{t.name}</span>
            <input name="name" value={form.name} onChange={onChange} autoComplete="name" required />
          </label>
          <label className="field">
            <span>{t.email}</span>
            <input name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" required />
          </label>
          <label className="field field--wide">
            <span>{t.message}</span>
            <textarea name="message" rows={4} value={form.message} onChange={onChange} required />
          </label>
          <div className="contact__submit">
            <button type="submit" className="button button--primary" disabled={status.type === 'sending'}>
              {t.send} <Icon name="arrow" size={12} />
            </button>
            <p className={`contact__status is-${status.type}`} role="status">{status.message}</p>
          </div>
        </form>
      </div>

      <ul className="contact__links" data-fade>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              <span className="contact__link-icon">{link.icon}</span>
              {link.label}
              <Icon name="arrow" size={10} className="contact__link-arrow" />
            </a>
          </li>
        ))}
      </ul>

      <footer className="footer">
        <p>© 2026 {profile.name} · {t.madeWith}</p>
        <p>Colombia{time && ` · ${time}`}</p>
        <a
          href="#inicio"
          className="text-link"
          onClick={(event) => {
            event.preventDefault();
            scrollToTarget('#inicio', { offset: 0 });
          }}
        >
          {t.backToTop} <Icon name="up" size={12} />
        </a>
      </footer>
    </section>
  );
}

export default Contact;
