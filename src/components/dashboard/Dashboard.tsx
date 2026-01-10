import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Eye, Clock, Globe, Calendar, TrendingUp, Users, Download, Trash2, Shield, Plus, Edit, Save, AlertCircle } from "lucide-react";
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

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'skill' | 'experience';
  createdAt: number;
  updatedAt: number;
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
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    type: 'project' as 'project' | 'skill' | 'experience'
  });
  const [activeTab, setActiveTab] = useState<'analytics' | 'content'>('analytics');

  useEffect(() => {
    // Charger les données de visite depuis localStorage
    const storedVisits = localStorage.getItem('portfolio_visits');
    if (storedVisits) {
      const parsedVisits = JSON.parse(storedVisits);
      setVisits(parsedVisits);
      calculateStats(parsedVisits);
    } else {
      // Ajouter des données d'exemple pour démonstration
      const sampleVisits: Visit[] = [
        {
          id: 'visit_1',
          timestamp: Date.now() - 86400000, // Hier
          date: new Date(Date.now() - 86400000).toLocaleDateString('fr-FR'),
          time: new Date(Date.now() - 86400000).toLocaleTimeString('fr-FR'),
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          ip: '192.168.1.100',
          referrer: 'https://google.com',
          duration: 245,
          pageViews: 3
        },
        {
          id: 'visit_2',
          timestamp: Date.now() - 3600000, // Il y a 1 heure
          date: new Date().toLocaleDateString('fr-FR'),
          time: new Date(Date.now() - 3600000).toLocaleTimeString('fr-FR'),
          userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
          ip: '192.168.1.101',
          referrer: 'https://linkedin.com',
          duration: 180,
          pageViews: 2
        },
        {
          id: 'visit_3',
          timestamp: Date.now() - 1800000, // Il y a 30 minutes
          date: new Date().toLocaleDateString('fr-FR'),
          time: new Date(Date.now() - 1800000).toLocaleTimeString('fr-FR'),
          userAgent: 'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0',
          ip: '192.168.1.102',
          referrer: 'Direct',
          duration: 420,
          pageViews: 5
        }
      ];
      setVisits(sampleVisits);
      calculateStats(sampleVisits);
      localStorage.setItem('portfolio_visits', JSON.stringify(sampleVisits));
    }

    // Charger le contenu depuis localStorage
    const storedContent = localStorage.getItem('portfolio_content');
    if (storedContent) {
      const parsedContent = JSON.parse(storedContent);
      setContent(parsedContent);
    } else {
      // Ajouter du contenu d'exemple
      const sampleContent: ContentItem[] = [
        {
          id: 'content_1',
          title: 'Portfolio Cybersecurity',
          description: 'Développement d\'un portfolio sécurisé avec authentification biométrique et tracking des visiteurs en temps réel.',
          type: 'project',
          createdAt: Date.now() - 86400000 * 2,
          updatedAt: Date.now() - 86400000 * 2
        },
        {
          id: 'content_2',
          title: 'WebAuthn & FIDO2',
          description: 'Expertise en implémentation de standards d\'authentification modernes pour une sécurité maximale.',
          type: 'skill',
          createdAt: Date.now() - 86400000 * 3,
          updatedAt: Date.now() - 86400000 * 3
        },
        {
          id: 'content_3',
          title: 'Développeur Full Stack',
          description: '3 ans d\'expérience en développement d\'applications web complètes avec React, Node.js et les meilleures pratiques de sécurité.',
          type: 'experience',
          createdAt: Date.now() - 86400000 * 5,
          updatedAt: Date.now() - 86400000 * 5
        }
      ];
      setContent(sampleContent);
      localStorage.setItem('portfolio_content', JSON.stringify(sampleContent));
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

  // Fonctions CRUD pour le contenu
  const addContent = () => {
    if (!newContent.title.trim() || !newContent.description.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const contentItem: ContentItem = {
      id: `content_${Date.now()}`,
      title: newContent.title,
      description: newContent.description,
      type: newContent.type,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedContent = [...content, contentItem];
    setContent(updatedContent);
    localStorage.setItem('portfolio_content', JSON.stringify(updatedContent));
    
    // Réinitialiser le formulaire
    setNewContent({ title: '', description: '', type: 'project' });
    setIsAddingContent(false);
  };

  const updateContent = () => {
    if (!editingContent || !newContent.title.trim() || !newContent.description.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const updatedContent = content.map(item => 
      item.id === editingContent.id 
        ? { ...item, title: newContent.title, description: newContent.description, type: newContent.type, updatedAt: Date.now() }
        : item
    );

    setContent(updatedContent);
    localStorage.setItem('portfolio_content', JSON.stringify(updatedContent));
    
    // Réinitialiser le formulaire
    setNewContent({ title: '', description: '', type: 'project' });
    setEditingContent(null);
    setIsAddingContent(false);
  };

  const deleteContent = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
      const updatedContent = content.filter(item => item.id !== id);
      setContent(updatedContent);
      localStorage.setItem('portfolio_content', JSON.stringify(updatedContent));
    }
  };

  const startEditContent = (item: ContentItem) => {
    setEditingContent(item);
    setNewContent({ title: item.title, description: item.description, type: item.type });
    setIsAddingContent(true);
  };

  const cancelEdit = () => {
    setNewContent({ title: '', description: '', type: 'project' });
    setEditingContent(null);
    setIsAddingContent(false);
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-background border rounded-lg shadow-lg w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Dashboard Analytics</h2>
            <p className="text-muted-foreground text-sm">Gestion du portfolio</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={exportData} className="hidden sm:flex">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline" size="sm" onClick={resetBiometric} className="hidden sm:flex">
              <Shield className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
            <Button variant="destructive" size="sm" onClick={clearData} className="hidden sm:flex">
              <Trash2 className="h-4 w-4 mr-2" />
              Effacer
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="flex border-b px-4 sm:px-6">
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('analytics')}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button
            variant={activeTab === 'content' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('content')}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Contenu
          </Button>
        </div>

        {/* Contenu scrollable */}
        <ScrollArea className="flex-1">
          <div className="p-4 sm:p-6">
            {activeTab === 'analytics' ? (
              // Onglet Analytics
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Visits */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Visites Récentes</CardTitle>
                      <CardDescription>Derniers visiteurs du portfolio</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px] sm:h-[400px]">
                        <div className="space-y-4">
                          {visits.slice(-10).reverse().map((visit) => (
                            <div key={visit.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2">
                              <div className="flex items-center gap-3">
                                <Eye className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <div>
                                  <div className="font-medium text-sm">{visit.date}</div>
                                  <div className="text-sm text-muted-foreground">{visit.time}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="secondary" className="text-xs">{getUserAgentInfo(visit.userAgent)}</Badge>
                                <Badge variant="outline" className="text-xs">{formatDuration(visit.duration)}</Badge>
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
                              <span className="text-sm truncate max-w-[120px] sm:max-w-[200px]">{page.page}</span>
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
            ) : (
              // Onglet Contenu
              <div className="space-y-6">
                {/* Actions mobiles */}
                <div className="flex flex-wrap gap-2 sm:hidden">
                  <Button variant="outline" size="sm" onClick={exportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetBiometric}>
                    <Shield className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </Button>
                  <Button variant="destructive" size="sm" onClick={clearData}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Effacer
                  </Button>
                </div>

                {/* Formulaire d'ajout/modification */}
                {isAddingContent && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {editingContent ? <Edit className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        {editingContent ? 'Modifier le contenu' : 'Ajouter du contenu'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Type de contenu</label>
                        <select 
                          value={newContent.type}
                          onChange={(e) => setNewContent({...newContent, type: e.target.value as 'project' | 'skill' | 'experience'})}
                          className="w-full mt-1 p-2 border rounded-md"
                        >
                          <option value="project">Projet</option>
                          <option value="skill">Compétence</option>
                          <option value="experience">Expérience</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Titre</label>
                        <Input
                          value={newContent.title}
                          onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                          placeholder="Titre du contenu"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={newContent.description}
                          onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                          placeholder="Description détaillée"
                          className="mt-1 min-h-[100px]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={editingContent ? updateContent : addContent}>
                          <Save className="h-4 w-4 mr-2" />
                          {editingContent ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                        <Button variant="outline" onClick={cancelEdit}>
                          Annuler
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Liste du contenu */}
                <div className="space-y-4">
                  {!isAddingContent && (
                    <Button onClick={() => setIsAddingContent(true)} className="w-full sm:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter du contenu
                    </Button>
                  )}

                  {content.length === 0 && !isAddingContent && (
                    <Card>
                      <CardContent className="text-center py-8">
                        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Aucun contenu ajouté</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Commencez par ajouter des projets, compétences ou expériences
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.map((item) => (
                      <Card key={item.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{item.title}</CardTitle>
                              <Badge variant="outline" className="mt-1">
                                {item.type === 'project' ? 'Projet' : item.type === 'skill' ? 'Compétence' : 'Expérience'}
                              </Badge>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => startEditContent(item)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteContent(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                          <div className="mt-2 text-xs text-muted-foreground">
                            Créé le: {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                            {item.updatedAt !== item.createdAt && (
                              <span> • Modifié le: {new Date(item.updatedAt).toLocaleDateString('fr-FR')}</span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
