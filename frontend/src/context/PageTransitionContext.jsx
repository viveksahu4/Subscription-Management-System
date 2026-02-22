import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageTransitionOverlay from '../components/PageTransitionOverlay';

const PageTransitionContext = createContext(null);

export const usePageTransition = () => useContext(PageTransitionContext);

const TRANSITION_DURATION = 2500;

export const PageTransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelayedNavigate = useCallback(
    (to) => {
      if (location.pathname === to) return;
      setIsTransitioning(true);
      setTimeout(() => {
        navigate(to);
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    },
    [navigate, location.pathname]
  );

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      if (link.getAttribute('target') === '_blank') return;
      if (link.hasAttribute('data-no-transition')) return;

      e.preventDefault();
      handleDelayedNavigate(href);
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [handleDelayedNavigate]);

  return (
    <PageTransitionContext.Provider value={{ handleDelayedNavigate, isTransitioning }}>
      {children}
      <PageTransitionOverlay visible={isTransitioning} />
    </PageTransitionContext.Provider>
  );
};
