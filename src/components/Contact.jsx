import { useEffect, useState } from 'react';
import { scrollToTarget } from '../lib/motion';
import { BrandIcon, Icon } from '../lib/icons';

const WEB3FORMS_KEY = '0747e6a8-4350-4ca8-b840-8aaf7effeb64';
const EMPTY_FORM = { name: '', email: '', message: '' };

const formatTime = () =>
  new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date());

function Contact({ profile }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime()), 30_000);
    return () => clearInterval(interval);
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', message: 'Completa los tres campos.' });
      return;
    }

    setStatus({ type: 'sending', message: 'Enviando…' });
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...form,
          subject: `Nuevo mensaje de ${form.name} desde tu portafolio`
        })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      setStatus({ type: 'success', message: 'Mensaje enviado. Te respondo pronto.' });
      setForm(EMPTY_FORM);
    } catch {
      setStatus({ type: 'error', message: 'No se pudo enviar. Escríbeme directamente al correo.' });
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
          <h2 className="section-title" id="contacto-title" data-fade>Contacto</h2>
          <p className="section-intro" data-fade>
            ¿Tienes un rol de backend, una colaboración o una pregunta? Escríbeme por el formulario o directo al correo.
          </p>
          <div className="contact__mail-row" data-fade>
            <a className="contact__mail" href={`mailto:${profile.email}`}>{profile.email}</a>
            <button
              type="button"
              className="icon-button"
              onClick={copyEmail}
              aria-label={copied ? 'Correo copiado' : 'Copiar correo'}
              title={copied ? 'Copiado' : 'Copiar correo'}
            >
              <Icon name={copied ? 'check' : 'copy'} />
            </button>
          </div>
          <p className="contact__status-line" aria-live="polite">{copied ? 'Correo copiado al portapapeles.' : ''}</p>
        </div>

        <form className="card contact__form" onSubmit={onSubmit} noValidate data-fade>
          <label className="field">
            <span>Nombre</span>
            <input name="name" value={form.name} onChange={onChange} autoComplete="name" required />
          </label>
          <label className="field">
            <span>Correo</span>
            <input name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" required />
          </label>
          <label className="field field--wide">
            <span>Mensaje</span>
            <textarea name="message" rows={4} value={form.message} onChange={onChange} required />
          </label>
          <div className="contact__submit">
            <button type="submit" className="button button--primary" disabled={status.type === 'sending'}>
              Enviar mensaje <Icon name="arrow" size={12} />
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
        <p>© 2026 {profile.name} · Hecho con React y GSAP</p>
        <p>Colombia · {time}</p>
        <a
          href="#inicio"
          className="text-link"
          onClick={(event) => {
            event.preventDefault();
            scrollToTarget('#inicio', { offset: 0 });
          }}
        >
          Volver arriba <Icon name="up" size={12} />
        </a>
      </footer>
    </section>
  );
}

export default Contact;
