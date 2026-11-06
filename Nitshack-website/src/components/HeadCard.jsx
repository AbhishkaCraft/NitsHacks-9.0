import { HMark, SocialLinks } from './Icons'
import NitsLogo from './NitsLogo'
import './HeadCard.css'

// Notched card outline, drawn once and reused for fill, border and glow.
const OUTLINE =
  'M40 8 H438 L476 46 H556 Q574 46 574 64 V806 Q574 814 568 822 L546 852 H486 L468 818 H138 L120 852 H60 L8 794 V650 L40 628 V250 L8 226 V50 Q8 8 40 8 Z'

export default function HeadCard({ person }) {
  const { name, role, img, links } = person
  return (
    <article className="tp-head" tabIndex={0} aria-label={`${name}, ${role}`}>
      <div className="tp-head__card">
      <svg className="tp-head__frame" viewBox="0 0 582 860" aria-hidden="true">
        <defs>
          <pattern id="tp-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="#fff" strokeOpacity=".1" strokeWidth="1" />
          </pattern>
          <pattern id="tp-grid-big" width="110" height="110" patternUnits="userSpaceOnUse">
            <path d="M110 0H0V110" fill="none" stroke="#fff" strokeOpacity=".16" strokeWidth="1.4" />
          </pattern>
          <linearGradient id="tp-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1f5fb8" />
            <stop offset="1" stopColor="#123f95" />
          </linearGradient>
        </defs>
        <path className="tp-head__rim" d={OUTLINE} />
        <path className="tp-head__edge" d={OUTLINE} />
        <path d={OUTLINE} fill="url(#tp-blue)" />
        <path d={OUTLINE} fill="url(#tp-grid)" />
        <path d={OUTLINE} fill="url(#tp-grid-big)" />
      </svg>

      <div className="tp-head__logo">
        <NitsLogo />
      </div>

      <div className="tp-head__photo">
        <img src={img} alt={`Portrait of ${name}`} width="432" height="456" loading="lazy" />
      </div>

      <div className="tp-head__badge">
        <HMark />
      </div>

      <h3 className="tp-head__name">{name}</h3>
      <p className="tp-head__role">{role}</p>
      <div className="tp-head__links">
        <SocialLinks links={links} label={name} />
      </div>
      </div>
    </article>
  )
}
