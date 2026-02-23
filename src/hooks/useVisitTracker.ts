import { useEffect, useState } from 'react';

interface Visit {
  id: string;
  timestamp: number;
  date: string;
  time: string;
  userAgent: string;
  ip: string;
  referrer: string;
  duration: number;
  pageViews: number;
}

export const useVisitTracker = () => {
  const [sessionId, setSessionId] = useState<string>('');
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [pageViews, setPageViews] = useState<number>(1);

  useEffect(() => {
    // Générer un ID de session unique
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);

    // Enregistrer la visite
    recordVisit();

    // Configurer le suivi de la durée
    const handleBeforeUnload = () => {
      updateVisitDuration();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Suivre les changements de page (SPA)
    const handlePageView = () => {
      setPageViews(prev => prev + 1);
      updatePageViews();
    };

    window.addEventListener('popstate', handlePageView);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePageView);
      updateVisitDuration();
    };
  }, []);

  const getClientIP = async (): Promise<string> => {
    try {
      // Utiliser plusieurs APIs en fallback pour éviter les erreurs DNS
      const apis = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
        'https://ip.sb/api/ip'
      ];
      
      for (const api of apis) {
        try {
          const response = await fetch(api);
          if (response.ok) {
            const data = await response.json();
            return data.ip || data.ip_address || `local_${Math.random().toString(36).substr(2, 9)}`;
          }
        } catch {
          continue; // Essayer l'API suivante
        }
      }
      
      // Fallback si aucune API ne fonctionne
      return `local_${Math.random().toString(36).substr(2, 9)}`;
    } catch (error) {
      return `local_${Math.random().toString(36).substr(2, 9)}`;
    }
  };

  const recordVisit = async () => {
    try {
      const now = new Date();
      const visit: Visit = {
        id: `visit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: now.getTime(),
        date: now.toLocaleDateString('fr-FR'),
        time: now.toLocaleTimeString('fr-FR'),
        userAgent: navigator.userAgent,
        ip: await getClientIP(),
        referrer: document.referrer || 'Direct',
        duration: 0,
        pageViews: 1
      };

      // Récupérer les visites existantes
      const existingVisits = localStorage.getItem('portfolio_visits');
      const visits: Visit[] = existingVisits ? JSON.parse(existingVisits) : [];

      // Ajouter la nouvelle visite
      visits.push(visit);

      // Limiter à 1000 visites pour éviter la surcharge du localStorage
      if (visits.length > 1000) {
        visits.splice(0, visits.length - 1000);
      }

      // Sauvegarder dans localStorage
      localStorage.setItem('portfolio_visits', JSON.stringify(visits));
      localStorage.setItem('current_session', sessionId);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la visite:', error);
    }
  };

  const updateVisitDuration = () => {
    try {
      const duration = Math.round((Date.now() - startTime) / 1000); // en secondes
      
      // Mettre à jour la dernière visite avec la durée
      const existingVisits = localStorage.getItem('portfolio_visits');
      if (existingVisits) {
        const visits: Visit[] = JSON.parse(existingVisits);
        if (visits.length > 0) {
          visits[visits.length - 1].duration = duration;
          localStorage.setItem('portfolio_visits', JSON.stringify(visits));
        }
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la durée:', error);
    }
  };

  const updatePageViews = () => {
    try {
      const existingVisits = localStorage.getItem('portfolio_visits');
      if (existingVisits) {
        const visits: Visit[] = JSON.parse(existingVisits);
        if (visits.length > 0) {
          visits[visits.length - 1].pageViews = pageViews;
          localStorage.setItem('portfolio_visits', JSON.stringify(visits));
        }
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des pages vues:', error);
    }
  };

  const getVisitStats = () => {
    try {
      const existingVisits = localStorage.getItem('portfolio_visits');
      if (!existingVisits) return null;
      
      const visits: Visit[] = JSON.parse(existingVisits);
      const today = new Date().toDateString();
      const todayVisits = visits.filter(v => new Date(v.timestamp).toDateString() === today);
      const uniqueIPs = new Set(visits.map(v => v.ip));

      return {
        totalVisits: visits.length,
        uniqueVisitors: uniqueIPs.size,
        todayVisits: todayVisits.length,
        visits: visits
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return null;
    }
  };

  return {
    recordVisit,
    updateVisitDuration,
    getVisitStats,
    sessionId
  };
};
