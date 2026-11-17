function SectionHead({ id, title, intro }) {
  return (
    <header className="section-head">
      <h2 className="section-title" id={`${id}-title`} data-fade>{title}</h2>
      {intro && <p className="section-intro" data-fade>{intro}</p>}
    </header>
  );
}

export default SectionHead;
