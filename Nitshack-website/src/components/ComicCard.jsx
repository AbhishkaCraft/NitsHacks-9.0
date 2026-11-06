import { HMark, SocialLinks } from './Icons'
import NitsLogo from './NitsLogo'
import './ComicCard.css'

// Cloud bursts around the border. Each circle is drawn twice: once with a
// thick black stroke, then again in white on top, so they merge into one
// outlined cloud shape.
const CLOUDS = [
  [4, 30, 6], [2, 50, 6], [3, 72, 6.5], [2, 92, 7], [3, 108, 9],
  [10, 124, 12], [28, 131, 9], [92, 30, 6], [93, 52, 6], [92, 74, 6.5],
  [93, 94, 7], [92, 110, 9], [85, 124, 12], [67, 131, 9], [5, 10, 5], [91, 10, 5],
]

export default function ComicCard({ person }) {
  const { name, role, img, links } = person
  return (
    <article className="tp-comic" tabIndex={0} aria-label={`${name}, ${role}`}>
      <div className="tp-comic__card">
      <div className="tp-comic__face">
        <div className="tp-comic__rays" />

        <svg className="tp-comic__clouds" viewBox="0 0 95 132" aria-hidden="true">
          <g fill="#000" stroke="#000" strokeWidth="2.6">
            {CLOUDS.map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} />
            ))}
          </g>
          <g fill="#fff">
            {CLOUDS.map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} />
            ))}
          </g>
        </svg>

        <div className="tp-comic__shot">
          <div className="tp-comic__shotInner">
            <img src={img} alt={`Portrait of ${name}`} width="258" height="260" loading="lazy" />
          </div>
        </div>

        <div className="tp-comic__pill tp-comic__pill--logo">
          <NitsLogo />
        </div>
        <div className="tp-comic__pill tp-comic__pill--badge">
          <HMark />
        </div>

        <h3 className="tp-comic__name">{name}</h3>
        <p className="tp-comic__role">{role}</p>

        <div className="tp-comic__links">
          <SocialLinks links={links} label={name} />
        </div>
      </div>
      </div>
    </article>
  )
}
