import { useEffect, useState } from 'react';
import { scrollToTarget } from '../lib/motion';

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

  return (
    <section className="section contact" id="contacto" aria-labelledby="contacto-title">
      <p className="eyebrow">(04) Contacto</p>
      <h2 className="contact__title" id="contacto-title" data-split>¿Hablamos?</h2>

      <div className="contact__mail-row" data-fade>
        <a className="contact__mail" href={`mailto:${profile.email}`}>{profile.email}</a>
        <button type="button" className="button-line" onClick={copyEmail} aria-live="polite">
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>

      <div className="contact__grid">
        <ul className="contact__links" data-fade>
          <li>
            <a className="link-arrow" href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a className="link-arrow" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a className="link-arrow" href="https://blog.jesusflorez.cloud" target="_blank" rel="noopener noreferrer">
              Blog <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>

        <form className="contact__form" onSubmit={onSubmit} noValidate data-fade>
          <label className="field">
            <span className="mono">Nombre</span>
            <input name="name" value={form.name} onChange={onChange} autoComplete="name" required />
          </label>
          <label className="field">
            <span className="mono">Correo</span>
            <input name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" required />
          </label>
          <label className="field field--wide">
            <span className="mono">Mensaje</span>
            <textarea name="message" rows={4} value={form.message} onChange={onChange} required />
          </label>
          <div className="contact__submit">
            <button type="submit" className="button-solid" disabled={status.type === 'sending'}>
              Enviar mensaje
            </button>
            <p className={`mono contact__status is-${status.type}`} role="status">{status.message}</p>
          </div>
        </form>
      </div>

      <footer className="footer">
        <p className="mono">© 2026 {profile.name}</p>
        <p className="footer__note">
          Diseñado y construido a mano con React, GSAP y Lenis. Servido por Nginx en el mismo VPS que la suite.
        </p>
        <p className="mono">Colombia · {time}</p>
        <a
          href="#inicio"
          className="mono footer__top"
          onClick={(event) => {
            event.preventDefault();
            scrollToTarget('#inicio', { offset: 0 });
          }}
        >
          Volver arriba ↑
        </a>
      </footer>
    </section>
  );
}

export default Contact;
