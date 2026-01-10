import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X, Eye, Clock, Globe, Calendar, TrendingUp, Users, Download, Trash2, Shield } from "lucide-react";
import { authUtils } from "@/utils/authUtils";

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

interface DashboardStats {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  averageDuration: number;
  topPages: { page: string; views: number }[];
}

export function Dashboard({ onClose }: { onClose: () => void }) {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalVisits: 0,
    uniqueVisitors: 0,
    todayVisits: 0,
    averageDuration: 0,
    topPages: []
  });

  useEffect(() => {
    // Charger les données de visite depuis localStorage
    const storedVisits = localStorage.getItem('portfolio_visits');
    if (storedVisits) {
      const parsedVisits = JSON.parse(storedVisits);
      setVisits(parsedVisits);
      calculateStats(parsedVisits);
    }
  }, []);

  const calculateStats = (visitData: Visit[]) => {
    const today = new Date().toDateString();
    const todayVisits = visitData.filter(v => new Date(v.timestamp).toDateString() === today);
    const uniqueIPs = new Set(visitData.map(v => v.ip));
    const avgDuration = visitData.length > 0 
      ? visitData.reduce((acc, v) => acc + v.duration, 0) / visitData.length 
      : 0;

    // Compter les pages les plus visitées
    const pageCounts: { [key: string]: number } = {};
    visitData.forEach(visit => {
      const page = visit.referrer || 'Direct';
      pageCounts[page] = (pageCounts[page] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([page, views]) => ({ page, views }));

    setStats({
      totalVisits: visitData.length,
      uniqueVisitors: uniqueIPs.size,
      todayVisits: todayVisits.length,
      averageDuration: Math.round(avgDuration),
      topPages
    });
  };

  const clearData = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes les données de visite ?')) {
      authUtils.clearAllAuthData();
      setVisits([]);
      setStats({
        totalVisits: 0,
        uniqueVisitors: 0,
        todayVisits: 0,
        averageDuration: 0,
        topPages: []
      });
    }
  };

  const exportData = () => {
    authUtils.downloadVisitData();
  };

  const resetBiometric = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser l\'empreinte digitale ?')) {
      authUtils.resetBiometric();
      alert('Empreinte digitale réinitialisée. Vous devrez la réenregistrer.');
    }
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${Math.round(seconds / 3600)}h`;
  };

  const getUserAgentInfo = (userAgent: string) => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Autre';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Dashboard Analytics</h2>
            <p className="text-muted-foreground">Suivi des visiteurs du portfolio</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportData}>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline" onClick={resetBiometric}>
              <Shield className="h-4 w-4 mr-2" />
              Réinitialiser empreinte
            </Button>
            <Button variant="destructive" onClick={clearData}>
              <Trash2 className="h-4 w-4 mr-2" />
              Effacer tout
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visites</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalVisits}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visiteurs Uniques</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.uniqueVisitors}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visites Aujourd'hui</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.todayVisits}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Durée Moyenne</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatDuration(stats.averageDuration)}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Visits */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Visites Récentes</CardTitle>
                <CardDescription>Derniers visiteurs du portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {visits.slice(-10).reverse().map((visit) => (
                      <div key={visit.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{visit.date}</div>
                            <div className="text-sm text-muted-foreground">{visit.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{getUserAgentInfo(visit.userAgent)}</Badge>
                          <Badge variant="outline">{formatDuration(visit.duration)}</Badge>
                        </div>
                      </div>
                    ))}
                    {visits.length === 0 && (
                      <div className="text-center text-muted-foreground py-8">
                        Aucune visite enregistrée
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Pages Populaires</CardTitle>
                <CardDescription>Sources de trafic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm truncate max-w-[150px]">{page.page}</span>
                      </div>
                      <Badge variant="secondary">{page.views}</Badge>
                    </div>
                  ))}
                  {stats.topPages.length === 0 && (
                    <div className="text-center text-muted-foreground py-4">
                      Aucune donnée
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
