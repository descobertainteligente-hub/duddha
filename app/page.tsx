'use client'

import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const [revealElements, setRevealElements] = useState<Set<HTMLElement>>(new Set())

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = e.clientX + 'px'
        cursorRingRef.current.style.top = e.clientY + 'px'
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.classList.contains('track-item') || target.classList.contains('show-btn')) {
        cursorRingRef.current?.classList.add('expand')
      }
    }

    const handleMouseOut = () => {
      cursorRingRef.current?.classList.remove('expand')
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" id="cursorRing" ref={cursorRingRef}></div>

      <nav>
        <a href="#" className="nav-logo">duddha</a>
        <ul className="nav-links">
          <li><a href="#bio">About</a></li>
          <li><a href="#music">Music</a></li>
          <li><a href="#shows">Shows</a></li>
          <li><a href="#press">Press</a></li>
        </ul>
        <a href="#booking" className="nav-cta">Book Now</a>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div 
          className="hero-img"
          style={{
            backgroundImage: 'url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wgARCBBoCvEDASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAQACAwQFBv/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/aAAwDAQACEAMQAAAC+LUgwMaUkKpIYGiqWYKFJJaoRgnJNFUVBoQqikBkKooaqhyoVFUQg0hVFUVVVJZYpAaikKqqYyoRoIYqiGBopyLlSGVEKqKozpAaJoJzTGoiQqpiBQqiFCRBpaqIaqqEoGikKg0NRIGoEiNUCUMIVFIVIQ0MkQMxFFVCTQkSMEhNVDRFElUlDURIJCVUjBUNFSI5aCqpoEQSKoqQYHOqIoShKGgqhJMqUlQxFVTREwTRDESRNCQNEkVRVDRFMUVGiJIhhJMtEkJRSDCFRJDQTQVEkSRSFURqCoGiqKQjQVA1RTVloqQiGQSicpVJOVXLFUVRRDCDRUDUJRVJSFUDS1RIGgUklqiqKQqhzoEoqikKmCNBVVUVApCUUgIg0VRVA0UJVFUUkVRJVGgGgaJzqCQSiEGSqgaQqKqIYqiqI0AiUglUlQMgNVUSUDRVFFWhyNIJCMCQlEkQ0ClVJEwTVFFISROUqQRjLISVTAwNQJExFDVUSITRRFSUNUIMQxFVTQMMUNUJFFrKDEJJlkGgYE1kSaGCRiHNNUSIVUlJVKlQwgiUVChUhSEhVDCVBJFSFRVCIVRRGogZCEpCqhKJGqoJChKohCaKQpgSKoqopKSiqBoqipCky0VRVFUVMEJDVRGqghEoqihJIkUiQqVEJImA1nRnRFVFVVUVIQlUNRlEqhKiqKqkQJiGipopKylUkkMA1FUSCtUUgk0TETBUVA1FTWdFDnQUVNIUxEhIVRVCUDQxEkUxRFISRVFINAlEiOaJy1JEKlFLSVSCUSIMExFSQxlYJKpCqNDmKoYqaBhKqBEhBqoqKaCYpyVIVCMFJRDCUNQgwlJEMVRFElVUVUDRMDQVNFRGgqopCqqpgSKmhIkQpCYKTLMRITmkYRgpBEJBoEQqiSJAahhIIag0ROUSQpBEy0JBqEKhqCQqiqKQpEGTOsytA1ESJRMFUUhGgqijRi6UZqqhKoqiqBoqkklqopCGKaqgGYJgkJiqoqhKKiGimaKEiimAaqoqiJKoGYJAaqoRpWJjLNFUVVGiKQpCpBzoyjFMUVVRUDUCaBGAWiSKkKaJCpISJCtDEIUQ1EkSSDUtIVNFSUhVSyJDBVSTFDUMFIJFNEJU0CQjAwNRUmaimiqBEiipqhBGIQqQmCohSEGgjRUkTEIwghNUMFIIlRE0VAiDDRMFUSISDEUhUlDQkMIQlMFRVCMUApCSCRDEiEgjQVVQlQTSSSohVFIVIVEKkUo0TAxDlioGgaoSiqKqhYDUEhVFUDRJBINAjA0QxRDGiKIYqQkKRKQqikWkiYJKqoaBhgRBEEiqo1QSRU1CRVFVVSRUVQKElVUMRDINEkQoGgSlSYhKkQoRqWkEoRISaKBShEKomqKiqKQmoKihpiEkJCqKYKipCEkotZhGIkJBiKEShiKopgaKKqopBihEKGmGBohqojWahoGooaEoRiKI0VVEkMMElUhJFVDDUSUINRSFUDVVRFEkUwUkSUUJJCEaCRBgpgaBoig1VEwSE0FRIGoQRCYJiJCE1kSqBoTQEgiEaCqKQqSJCSIaqqJ... (truncated for display)")',
            backgroundPosition: 'center 45%',
          }}
        ></div>

        <div className="hero-content">
          <div className="hero-name">duddha</div>
          <div className="hero-sub">live looping · lotus flower collective</div>
        </div>
        <div className="scroll-hint">scroll</div>
      </div>

      {/* BIO */}
      <div className="bio-wrap" id="bio">
        <svg className="corner-art tl" width="280" height="280" viewBox="0 0 280 280" fill="none">
          <path d="M 0 280 Q 80 190 55 95 Q 30 0 110 0" stroke="#c9a96e" strokeWidth="1.5"/>
          <path d="M 35 280 Q 55 210 75 155 Q 95 95 75 38" stroke="#c9a96e" strokeWidth="0.8" opacity="0.5"/>
          <path d="M 0 210 Q 75 192 115 162" stroke="#c9a96e" strokeWidth="1"/>
        </svg>
        <svg className="corner-art br" width="280" height="280" viewBox="0 0 280 280" fill="none">
          <path d="M 0 280 Q 80 190 55 95 Q 30 0 110 0" stroke="#c9a96e" strokeWidth="1.5"/>
          <path d="M 35 280 Q 55 210 75 155 Q 95 95 75 38" stroke="#c9a96e" strokeWidth="0.8" opacity="0.5"/>
        </svg>

        <div className="section">
          <div className="section-label reveal">About</div>
          <div className="bio-grid">
            <div className="bio-photo reveal">
              <img 
                src="data:image/jpeg;base64,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" 
                alt="duddha bio"
              />
            </div>
            <div className="bio-text">
              <h2 className="reveal d1">about</h2>
              <p className="reveal d2">
                duddha is a <em>live looping artist</em> creating immersive sonic experiences through layered guitar, vocals, and ambient textures. Associated with the <em>lotus flower collective</em>, this practice merges meditation and music into a transformative performance journey.
              </p>
              <p className="reveal d3">
                Each performance is unique, built in real-time from silence. The loops create hypnotic soundscapes that explore the boundaries between noise, harmony, and resonance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MUSIC */}
      <div className="music-wrap" id="music">
        <div className="section">
          <div className="music-heading">Featured Tracks</div>
          <div className="tracks-grid">
            <a href="#" className="track-item reveal">
              <div>
                <div className="track-collab">lotus flower collective</div>
                <div className="track-name">Resonance</div>
                <div className="track-badge">2024</div>
              </div>
              <div className="track-arrow">→</div>
            </a>
            <a href="#" className="track-item reveal d1">
              <div>
                <div className="track-collab">duddha</div>
                <div className="track-name">Evening Meditation</div>
                <div className="track-badge">2024</div>
              </div>
              <div className="track-arrow">→</div>
            </a>
            <a href="#" className="track-item reveal d2">
              <div>
                <div className="track-collab">lotus flower collective</div>
                <div className="track-name">Infinite Loop</div>
                <div className="track-badge">2023</div>
              </div>
              <div className="track-arrow">→</div>
            </a>
            <a href="#" className="track-item reveal d3">
              <div>
                <div className="track-collab">duddha</div>
                <div className="track-name">Silence Between Notes</div>
                <div className="track-badge">2023</div>
              </div>
              <div className="track-arrow">→</div>
            </a>
          </div>
        </div>
      </div>

      {/* SHOWS */}
      <div className="shows-wrap" id="shows">
        <div className="section">
          <div className="section-label reveal">Upcoming Shows</div>
          <div>
            <div className="show-item reveal d1">
              <div className="show-date">
                29
                <span>Apr</span>
              </div>
              <div>
                <div className="show-venue">Harmonic Garden Festival</div>
                <div className="show-city">Los Angeles, CA</div>
                <div className="show-tag">live looping set</div>
              </div>
              <a href="#" className="show-btn">Get Tickets</a>
            </div>
            <div className="show-item reveal d2">
              <div className="show-date">
                15
                <span>May</span>
              </div>
              <div>
                <div className="show-venue">Zen Sonic Experience</div>
                <div className="show-city">San Francisco, CA</div>
                <div className="show-tag">meditation + music</div>
              </div>
              <a href="#" className="show-btn">Get Tickets</a>
            </div>
            <div className="show-item reveal d3">
              <div className="show-date">
                02
                <span>Jun</span>
              </div>
              <div>
                <div className="show-venue">Lotus Collective Summer Series</div>
                <div className="show-city">Big Sur, CA</div>
                <div className="show-tag">sunset performance</div>
              </div>
              <a href="#" className="show-btn">Get Tickets</a>
            </div>
          </div>
        </div>
      </div>

      {/* GALLERY */}
      <div className="gallery-wrap" id="press">
        <div className="section">
          <div className="section-label reveal">Gallery</div>
          <div className="gallery-grid">
            <div className="gallery-item reveal">
              <img 
                src="data:image/jpeg;base64,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" 
                alt="Performance gallery" 
              />
            </div>
            <div className="gallery-item reveal d1">
              <img 
                src="data:image/jpeg;base64,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" 
                alt="Ambient performance" 
              />
            </div>
            <div className="gallery-item reveal d2">
              <img 
                src="data:image/jpeg;base64,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" 
                alt="Live loop session" 
              />
            </div>
            <div className="gallery-item reveal d3">
              <img 
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADIAJYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eo6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS4uMkJTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eo6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS4uMkJTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eo6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS4uMkJTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eo6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS4uMkNEVGBwgJCgsMDQ4PEBESExQVFhcYGRolJicoKSo2Nzg5OkNERUZHSElKUlNUVVZXWFlaY2RlZmdobWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eo6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS4uMkJTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXp/cGFyb2xlY29sb3IgaW1hZ2UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9sAQwEICQgKCAcHCg4KCAsQDAgNDAwQDAoODAwSDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AEQgAyACWAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eo6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS4uMkJTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eo6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS4uMkJTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eo6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS4uMkJTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eo6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS4uMkJTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eo6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS4uMkNEVGBwgJCgsMDQ4PEBESExQVFhcYGRolJicoKSo2Nzg5OkNERUZHSElKUlNUVVZXWFlaY2RlZmdobWZnaGlqc3R1dnd4eXp/cGFyb2xlY29sb3IgaW1hZ2UAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD5/o/hXwpH8Af+EW03QvAVgLb7Tb+2R4VhW6aAFkzx+lLi/AIvDPgPxBb+JPCHif4bW5RtXhXy/FLb8K30J/lP+lT/BL9hD9mTWdO8Y+CfBVhBdXM/NzB4YL2+EM4EccaNfRLkn5c4H41ffsfftEeGfAPwH4Vwq+m+DfAeqpDaQy5d/tZ3Wue0WR7pJBvTbMVJfH6YFVf8AgTXdU+O3iGbR/B+k3P8A+ER+L9DkE2L6N3bJkW5gPgfXNWu0eJf3lqZLOD4dKZ5+lGbfKyI25z71kv+BRd+y/8A7CvEn7J3wc8HaXd+FdGl8W+A9es/C+g+DEn0+b4QeqxZYcDJoePJNt3Z3tRQFnXwOHa1/RV/m7H1xvvTiMgbQxJwAelT/CH9jT9tL4peEPDVlKPFH7RfhqeG/Cuh/F3zLVz5qlzqEOlHwLJHBF5VySsRxMRfmGQQetYH/gf/AGAP+CMfxu+En7GXj79k2LVvHj+InDvgm1uvs/xQnXQbiLxtN4dhh+tvcvEJ5/T8J/tueAYhN5P8A2kNL0CTW/wDRf+Gp+g6XvTXB6+BRYmXjw+BrEn4lnZa/s0AKfM/wDGpf2L/AIB/sv8A7Zl3bvE/4XfAP8Ay8a/tVp+hyXl6ZWv9Rf+AgDgHgD/AIAP+QRx+yF8IvAV/4V+JdU8K+I7rU/FPxR+M/wAD/ABo/P8A8TqP8eB/wCNPcHvRx+yAD/hin+FgH/AJBAH7IV3+GP+AE/wBf/2THB70cfsgAf8AGKf4WAf+QQB+yFd/hj/gBP8fQ+Qw4/egD/jFP8AAMA/8ggD9kK7/DH/ABA/XPkMOH3oA/4xT/AMA/8ggD9kK7/AAwZBbm9taSHIPf2HAn+AcfoHoA/4xT/CwP8A6CDPTwKj/4V7XcKfgkAP8AVqI/Xvb/APhfkFubm9taSHIPf2HAn+AcfoHoA/4xT/CwP8A6CD/K3H7IV3+GP+AHngX/AHt73UK/gl/7Xo/wB/wBi/7XoZBbm9taSHIPf2HAn+AcfoHoA/4xT/CwP8A6CD/K3H7IV3+GP+AHngX/e3vdQr+CX/tej/f/APA//T8DT8DT8DT8DT8DT8DP8A/wC2/URCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=" 
                alt="Collective moment" 
              />
            </div>
          </div>
          <a href="#" className="press-link reveal d4">View Press Kit</a>
        </div>
      </div>

      {/* BOOKING */}
      <div className="booking-wrap" id="booking">
        <div className="section">
          <div className="booking-intro">
            <h2 className="reveal">Get in touch</h2>
            <p className="reveal d1">For bookings, collaborations, or inquiries about live looping performances.</p>
          </div>

          <form className="booking-form reveal d2">
            <div className="form-row">
              <div className="field">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className="field">
              <label>Subject</label>
              <input type="text" placeholder="Booking, collaboration, or other" required />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea placeholder="Tell me about your event or project..." rows={5}></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>

      <footer>
        <div className="footer-logo">duddha</div>
        <ul className="footer-links">
          <li><a href="#bio">About</a></li>
          <li><a href="#music">Music</a></li>
          <li><a href="#shows">Shows</a></li>
          <li><a href="#press">Gallery</a></li>
        </ul>
        <div className="footer-copy">© 2024 duddha. All rights reserved.</div>
      </footer>
    </>
  )
}
