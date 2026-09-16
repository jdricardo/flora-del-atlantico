import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lleva el scroll arriba al cambiar de página.
 *
 * Las categorías del menú no cambian la ruta, solo el parámetro `categoria`
 * de `/tienda`: mirando únicamente `pathname`, quien estaba al final de una
 * categoría entraba a la siguiente ya abajo, con el encabezado y las primeras
 * filas de productos fuera de pantalla. Por eso también se vigila la
 * categoría. El resto de filtros (precio, orden, búsqueda) se siguen
 * ignorando a propósito: ahí el cliente está ajustando la lista que ya tiene
 * delante y moverle el scroll le hace perder el punto donde iba.
 */
export function ScrollToTop() {
  const { pathname, hash, search } = useLocation();
  const category = new URLSearchParams(search).get('categoria');

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, category]);

  return null;
}
