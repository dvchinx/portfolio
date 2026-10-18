import { useEffect, useRef } from 'react';
import { setScrollLocked } from '../lib/motion';

/** Native <dialog>: focus trap, Escape and backdrop come from the platform. */
function Lightbox({ figure, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!figure || !dialog) return undefined;

    dialog.showModal();
    setScrollLocked(true);
    return () => {
      if (dialog.open) dialog.close();
      setScrollLocked(false);
    };
  }, [figure]);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-label={figure?.title ?? 'Diagrama'}
    >
      {figure && (
        <figure className="lightbox__figure">
          <div className="lightbox__bar">
            <figcaption className="mono">{figure.title}</figcaption>
            <button type="button" className="button-line" onClick={onClose}>
              Cerrar
            </button>
          </div>
          <div className="lightbox__img" data-lenis-prevent>
            <img src={figure.src} alt={figure.title} />
          </div>
        </figure>
      )}
    </dialog>
  );
}

export default Lightbox;
