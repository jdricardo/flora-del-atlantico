import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, MapPin, Menu, Search, ShoppingBag, User } from 'lucide-react';
import { MAIN_NAV } from '@/data/navigation';
import { cityName } from '@/data/cities';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/cn';
import { selectItemCount, useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useUiStore } from '@/store/useUiStore';
import { IconButton } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Logo } from './Logo';

/** Marca activo el enlace del menú comparando ruta y categoría. */
function useActiveMatcher() {
  const { pathname, search } = useLocation();
  const currentCategory = new URLSearchParams(search).get('categoria');

  return (to: string) => {
    const [path, queryString] = to.split('?');
    if (path !== pathname) return false;
    const target = new URLSearchParams(queryString ?? '').get('categoria');
    return target === currentCategory;
  };
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const itemCount = useCartStore(selectItemCount);
  const cityId = useCartStore((state) => state.cityId);
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const { notify } = useToast();
  const cartPulse = useUiStore((state) => state.cartPulse);
  const open = useUiStore((state) => state.open);
  const isActive = useActiveMatcher();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        isScrolled ? 'border-line bg-ivory/92 backdrop-blur-md' : 'border-transparent bg-ivory',
      )}
    >
      {/* Margen lateral más corto solo aquí: en pantallas de 360px la marca
          completa más el menú y los iconos no caben con el del resto del sitio. */}
      <Container className="max-sm:px-4">
        <div
          className={cn(
            'flex items-center justify-between gap-2 transition-[height] duration-500 sm:gap-4',
            isScrolled ? 'h-16 lg:h-18' : 'h-18 lg:h-22',
          )}
        >
          <div className="flex flex-1 items-center gap-1 xl:flex-none">
            <IconButton label="Abrir menú" onClick={() => open('menu')} className="xl:hidden">
              <Menu className="size-5" aria-hidden="true" strokeWidth={1.6} />
            </IconButton>
            <Logo className="max-xl:ml-1" />
          </div>

          {/*
            El menú completo solo cabe desde 1280px: con siete categorías, más
            abajo empujaba la lupa, el carrito y la ubicación fuera de la
            pantalla. Por debajo de ese ancho se entra por el menú lateral, que
            lista las mismas categorías.
          */}
          <nav aria-label="Menú principal" className="hidden xl:block">
            <ul className="flex items-center gap-x-3">
              {MAIN_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={cn(
                      'link-underline relative py-2 text-[0.7rem] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-colors',
                      isActive(item.to) ? 'text-olive-600' : 'text-ink hover:text-olive-600',
                    )}
                    aria-current={isActive(item.to) ? 'page' : undefined}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-0.5 xl:flex-none">
            {/*
              El nombre de la ciudad solo aparece cuando sobra ancho; por
              debajo queda el alfiler solo, que sigue abriendo el selector.
              Así la ubicación nunca desaparece del header.
            */}
            <button
              type="button"
              onClick={() => open('city')}
              aria-label={cityId ? `Enviar a ${cityName(cityId)}. Cambiar ciudad` : 'Elegir ciudad de entrega'}
              className="mr-1 hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[0.7rem] tracking-[0.08em] text-ink-muted uppercase transition-colors hover:bg-cream hover:text-ink sm:flex 2xl:mr-2 2xl:px-3"
            >
              <MapPin className="size-3.5" aria-hidden="true" strokeWidth={1.6} />
              <span className="hidden 2xl:inline">{cityId ? cityName(cityId) : 'Elegir ciudad'}</span>
            </button>

            <IconButton label="Buscar productos" onClick={() => open('search')}>
              <Search className="size-5" aria-hidden="true" strokeWidth={1.6} />
            </IconButton>

            <Link
              to="/favoritos"
              aria-label={`Mis favoritos${wishlistCount ? ` (${wishlistCount})` : ''}`}
              title="Mis favoritos"
              className="relative hidden size-10 place-items-center rounded-full text-ink transition-colors hover:bg-cream sm:grid"
            >
              <Heart className="size-5" aria-hidden="true" strokeWidth={1.6} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid min-w-[1.125rem] place-items-center rounded-full bg-rose-500 px-1 text-[0.62rem] leading-[1.125rem] font-medium text-ivory">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <IconButton
              label="Mi cuenta"
              onClick={() =>
                notify({
                  variant: 'info',
                  title: 'Cuentas de usuario en camino',
                  description: 'Por ahora puedes comprar como invitado y seguir tu pedido por WhatsApp.',
                })
              }
              className="hidden sm:grid"
            >
              <User className="size-5" aria-hidden="true" strokeWidth={1.6} />
            </IconButton>

            <IconButton
              label={`Carrito de compras${itemCount ? ` (${itemCount} productos)` : ' vacío'}`}
              onClick={() => open('cart')}
              badge={itemCount}
            >
              <ShoppingBag
                key={cartPulse}
                className={cn('size-5', cartPulse > 0 && 'animate-bump')}
                aria-hidden="true"
                strokeWidth={1.6}
              />
            </IconButton>
          </div>
        </div>
      </Container>
    </header>
  );
}
