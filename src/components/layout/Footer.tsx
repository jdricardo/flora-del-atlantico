import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { FOOTER_NAV, PAYMENT_LOGOS } from '@/data/navigation';
import { SITE, whatsappLink } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Logo } from './Logo';

/** Solo las redes que tienen perfil abierto; ver `SITE.social`. */
const SOCIAL_LINKS = [
  { label: 'Instagram', href: SITE.social.instagram },
  { label: 'Facebook', href: SITE.social.facebook },
  { label: 'Pinterest', href: SITE.social.pinterest },
  { label: 'YouTube', href: SITE.social.youtube },
].filter((red) => red.href !== '');

/*
 * Aquí iba la suscripción al boletín. Se retiró porque no enviaba el correo a
 * ninguna parte: respondía "Listo, quedaste suscrito" y lo descartaba. Para
 * reponerla hace falta, además del formulario, a dónde mandar la dirección.
 */

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream/50">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div className="flex flex-col gap-8">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              Distribuidora y floristería en Malambo desde {SITE.founded}. Trabajamos con cultivos de la Sabana de
              Bogotá y Antioquia, y entregamos en todo el Atlántico.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {FOOTER_NAV.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="eyebrow mb-4">{group.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`}>
                      <Link to={item.to} className="text-sm text-ink-muted transition-colors hover:text-ink">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-line pt-10 lg:grid-cols-3">
          <div className="flex flex-col gap-3 text-sm text-ink-muted">
            <h3 className="eyebrow">Atelier</h3>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                {SITE.atelier.street}, {SITE.atelier.neighborhood}
                <br />
                {SITE.atelier.city} · {SITE.atelier.hours}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-ink-muted">
            <h3 className="eyebrow">Contacto</h3>
            <a href={`mailto:${SITE.contact.email}`} className="flex items-center gap-2 transition-colors hover:text-ink">
              <Mail className="size-4" aria-hidden="true" />
              {SITE.contact.email}
            </a>
            <a href={`tel:${SITE.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 transition-colors hover:text-ink">
              <Phone className="size-4" aria-hidden="true" />
              {SITE.contact.phone}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-medium text-olive-600 transition-colors hover:text-olive-700"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Escríbenos por WhatsApp
            </a>
          </div>

          {SOCIAL_LINKS.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="eyebrow">Síguenos</h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline relative text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-2" aria-label="Medios de pago aceptados">
            {PAYMENT_LOGOS.map((method) => (
              <li
                key={method}
                className="rounded border border-line bg-ivory px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.1em] text-ink-muted uppercase"
              >
                {method}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
