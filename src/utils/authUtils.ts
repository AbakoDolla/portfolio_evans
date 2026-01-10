// Utilitaires pour la gestion de l'authentification

export const authUtils = {
  // Vérifier si l'empreinte est enregistrée
  isBiometricRegistered(): boolean {
    return localStorage.getItem('biometric_registered') === 'true';
  },

  // Enregistrer l'empreinte
  registerBiometric(): void {
    localStorage.setItem('biometric_registered', 'true');
  },

  // Réinitialiser l'empreinte
  resetBiometric(): void {
    localStorage.removeItem('biometric_registered');
  },

  // Effacer toutes les données d'authentification
  clearAllAuthData(): void {
    localStorage.removeItem('biometric_registered');
    localStorage.removeItem('portfolio_visits');
    localStorage.removeItem('current_session');
  },

  // Obtenir les statistiques de visites
  getVisitStats() {
    try {
      const visits = localStorage.getItem('portfolio_visits');
      if (!visits) return null;
      
      const visitData = JSON.parse(visits);
      const today = new Date().toDateString();
      const todayVisits = visitData.filter((v: any) => new Date(v.timestamp).toDateString() === today);
      const uniqueIPs = new Set(visitData.map((v: any) => v.ip));

      return {
        totalVisits: visitData.length,
        uniqueVisitors: uniqueIPs.size,
        todayVisits: todayVisits.length,
        visits: visitData
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return null;
    }
  },

  // Exporter les données de visite
  exportVisitData(): string | null {
    try {
      const visits = localStorage.getItem('portfolio_visits');
      if (!visits) return null;
      
      const data = {
        exportDate: new Date().toISOString(),
        visits: JSON.parse(visits)
      };
      
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Erreur lors de l\'export des données:', error);
      return null;
    }
  },

  // Télécharger les données de visite en fichier JSON
  downloadVisitData(): void {
    const data = this.exportVisitData();
    if (!data) {
      alert('Aucune donnée à exporter');
      return;
    }

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_visits_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
