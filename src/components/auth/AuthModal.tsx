import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, Key, Eye, EyeOff, Lock, Shield, UserPlus, Check } from "lucide-react";
import { authUtils } from "@/utils/authUtils";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [authMethod, setAuthMethod] = useState<'biometric' | 'code'>('biometric');
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [biometricStep, setBiometricStep] = useState<'check' | 'register' | 'authenticate'>('check');
  const [isRegistered, setIsRegistered] = useState(false);

  const CORRECT_CODE = 'Ab@h2006';

  // Vérifier si une empreinte est déjà enregistrée
  useEffect(() => {
    const registered = authUtils.isBiometricRegistered();
    setIsRegistered(registered);
    if (registered) {
      setBiometricStep('authenticate');
    }
  }, []);

  const handleBiometricRegister = async () => {
    setIsLoading(true);
    setError('');

    try {
      if (!window.navigator.credentials) {
        setError('L\'authentification biométrique n\'est pas supportée sur ce navigateur');
        setIsLoading(false);
        return;
      }

      // Simuler l'enregistrement de l'empreinte digitale
      // En production, vous utiliseriez: navigator.credentials.create()
      setTimeout(() => {
        authUtils.registerBiometric();
        setIsRegistered(true);
        setBiometricStep('authenticate');
        setIsLoading(false);
      }, 2000);

    } catch (err) {
      setError('Échec de l\'enregistrement biométrique');
      setIsLoading(false);
    }
  };

  const handleBiometricAuth = async () => {
    setIsLoading(true);
    setError('');

    try {
      if (!window.navigator.credentials) {
        setError('L\'authentification biométrique n\'est pas supportée sur ce navigateur');
        setIsLoading(false);
        return;
      }

      // Simuler l'authentification biométrique
      // En production, vous utiliseriez: navigator.credentials.get()
      setTimeout(() => {
        setIsLoading(false);
        onSuccess();
        onClose();
      }, 2000);

    } catch (err) {
      setError('Échec de l\'authentification biométrique');
      setIsLoading(false);
    }
  };

  const resetBiometric = () => {
    authUtils.resetBiometric();
    setIsRegistered(false);
    setBiometricStep('register');
    setError('');
  };

  const handleCodeAuth = () => {
    setError('');
    
    if (code === CORRECT_CODE) {
      onSuccess();
      onClose();
      setCode('');
    } else {
      setError('Code incorrect');
      setCode('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCodeAuth();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authentification Requise
          </DialogTitle>
          <DialogDescription>
            Accès sécurisé au dashboard analytics
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sélection de la méthode d'authentification */}
          <div className="flex gap-2">
            <Button
              variant={authMethod === 'biometric' ? 'default' : 'outline'}
              onClick={() => setAuthMethod('biometric')}
              className="flex-1"
            >
              <Fingerprint className="h-4 w-4 mr-2" />
              Empreinte
            </Button>
            <Button
              variant={authMethod === 'code' ? 'default' : 'outline'}
              onClick={() => setAuthMethod('code')}
              className="flex-1"
            >
              <Key className="h-4 w-4 mr-2" />
              Code
            </Button>
          </div>

          {/* Contenu d'authentification */}
          {authMethod === 'biometric' ? (
            <div className="space-y-4">
              {!isRegistered ? (
                // Interface d'enregistrement
                <div className="text-center space-y-4">
                  <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserPlus className="h-12 w-12 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Première utilisation de l'empreinte digitale ?
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Enregistrez votre empreinte pour un accès rapide et sécurisé
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Enregistrement requis
                  </Badge>
                </div>
              ) : (
                // Interface d'authentification
                <div className="text-center space-y-4">
                  <div className="mx-auto w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Check className="h-12 w-12 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Utilisez votre empreinte digitale pour accéder au dashboard
                    </p>
                    <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-700">
                      Empreinte enregistrée
                    </Badge>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={!isRegistered ? handleBiometricRegister : handleBiometricAuth} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    {!isRegistered ? 'Enregistrement en cours...' : 'Vérification en cours...'}
                  </>
                ) : (
                  <>
                    {!isRegistered ? (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Enregistrer l'empreinte
                      </>
                    ) : (
                      <>
                        <Fingerprint className="h-4 w-4 mr-2" />
                        Scanner l'empreinte
                      </>
                    )}
                  </>
                )}
              </Button>

              {isRegistered && (
                <Button 
                  variant="outline" 
                  onClick={resetBiometric}
                  className="w-full text-sm"
                >
                  Réinitialiser l'empreinte
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Code d'accès
                </label>
                <div className="relative">
                  <Input
                    type={showCode ? 'text' : 'password'}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Entrez le code d'accès"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCode(!showCode)}
                  >
                    {showCode ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button onClick={handleCodeAuth} className="w-full">
                <Key className="h-4 w-4 mr-2" />
                Valider le code
              </Button>
            </div>
          )}

          {/* Message d'erreur */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="text-xs text-muted-foreground text-center">
            <p>Accès réservé à l'administrateur du portfolio</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
