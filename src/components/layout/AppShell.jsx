import { useLocation } from 'react-router-dom';
import { useReveal } from '../../hooks/useReveal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

/** Global effects that must live inside the router. */
export default function AppShell({ children }) {
  const { pathname } = useLocation();
  useReveal(pathname);
  useDocumentTitle(pathname);
  return children;
}
