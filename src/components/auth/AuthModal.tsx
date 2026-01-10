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
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const CORRECT_CODE = 'Ab@h2006';

  // Vérifier la compatibilité biométrique au chargement
  useEffect(() => {
    const checkBiometricSupport = async () => {
      const supported = authUtils.isWebAuthnSupported();
      setIsBiometricSupported(supported);
      
      if (supported) {
        const available = await authUtils.isBiometricAvailable();
        if (!available) {
          setIsBiometricSupported(false);
        }
      }
    };

    checkBiometricSupport();
  }, []);

  // Vérifier si une empreinte est déjà enregistrée
  useEffect(() => {
    const registered = authUtils.isBiometricRegistered();
    const hasCredentialId = localStorage.getItem('biometric_credential_id');
    setIsRegistered(registered && !!hasCredentialId);
    if (registered && hasCredentialId) {
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

      // Créer les identifiants pour l'enregistrement
      const userId = new TextEncoder().encode('portfolio-user-' + Date.now());
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const publicKeyCredentialCreationOptions: CredentialCreationOptions = {
        publicKey: {
          challenge: challenge,
          rp: {
            name: "Portfolio Prince Evans",
            id: window.location.hostname,
          },
          user: {
            id: userId,
            name: "portfolio-user",
            displayName: "Portfolio User",
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" }, // ES256
            { alg: -257, type: "public-key" }, // RS256
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform", // Utiliser le lecteur de l'appareil
            userVerification: "required", // Exiger la vérification biométrique
            residentKey: "preferred", // Stocker sur l'appareil
          },
          timeout: 60000,
          attestation: "direct",
        },
      };

      // Demander l'enregistrement biométrique
      const credential = await navigator.credentials.create(publicKeyCredentialCreationOptions) as PublicKeyCredential;
      
      if (credential) {
        // Stocker l'ID de l'identifiant pour l'authentification future
        const credentialId = Array.from(new Uint8Array(credential.rawId));
        localStorage.setItem('biometric_credential_id', JSON.stringify(credentialId));
        authUtils.registerBiometric();
        setIsRegistered(true);
        setBiometricStep('authenticate');
      }

      setIsLoading(false);

    } catch (err: any) {
      console.error('Erreur d\'enregistrement biométrique:', err);
      
      // Messages d'erreur spécifiques
      if (err.name === 'NotAllowedError') {
        setError('L\'utilisateur a annulé l\'opération ou l\'empreinte n\'est pas disponible');
      } else if (err.name === 'SecurityError') {
        setError('Erreur de sécurité. Vérifiez que le site est en HTTPS');
      } else if (err.name === 'NotSupportedError') {
        setError('Votre appareil ne supporte pas l\'authentification biométrique');
      } else {
        setError('Échec de l\'enregistrement biométrique: ' + err.message);
      }
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

      // Récupérer l'ID de l'identifiant stocké
      const storedCredentialId = localStorage.getItem('biometric_credential_id');
      if (!storedCredentialId) {
        setError('Aucune empreinte enregistrée. Veuillez d\'abord enregistrer votre empreinte.');
        setIsLoading(false);
        return;
      }

      const credentialId = new Uint8Array(JSON.parse(storedCredentialId));
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const publicKeyCredentialRequestOptions: CredentialRequestOptions = {
        publicKey: {
          challenge: challenge,
          allowCredentials: [{
            id: credentialId,
            type: 'public-key',
            transports: ['internal', 'ble', 'nfc', 'usb'],
          }],
          userVerification: "required", // Exiger la vérification biométrique
          timeout: 60000,
        },
      };

      // Demander l'authentification biométrique
      const assertion = await navigator.credentials.get(publicKeyCredentialRequestOptions) as PublicKeyCredential;
      
      if (assertion) {
        // Authentification réussie
        setIsLoading(false);
        onSuccess();
        onClose();
      }

    } catch (err: any) {
      console.error('Erreur d\'authentification biométrique:', err);
      
      // Messages d'erreur spécifiques
      if (err.name === 'NotAllowedError') {
        setError('L\'utilisateur a annulé l\'opération ou l\'empreinte n\'est pas disponible');
      } else if (err.name === 'SecurityError') {
        setError('Erreur de sécurité. Vérifiez que le site est en HTTPS');
      } else if (err.name === 'NotSupportedError') {
        setError('Votre appareil ne supporte pas l\'authentification biométrique');
      } else if (err.name === 'InvalidStateError') {
        setError('L\'empreinte n\'est pas valide. Veuillez la réenregistrer.');
      } else {
        setError('Échec de l\'authentification biométrique: ' + err.message);
      }
      setIsLoading(false);
    }
  };

  const resetBiometric = () => {
    // Demander le mot de passe du propriétaire pour la réinitialisation
    const ownerPassword = prompt('Veuillez entrer le mot de passe du propriétaire pour réinitialiser l\'empreinte:');
    
    if (ownerPassword === CORRECT_CODE) {
      authUtils.resetBiometric();
      localStorage.removeItem('biometric_credential_id');
      setIsRegistered(false);
      setBiometricStep('register');
      setError('');
      alert('Empreinte digitale réinitialisée avec succès.');
    } else if (ownerPassword !== null) {
      setError('Mot de passe incorrect. Réinitialisation annulée.');
    }
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
              disabled={!isBiometricSupported}
            >
              <Fingerprint className="h-4 w-4 mr-2" />
              Empreinte
              {!isBiometricSupported && (
                <Badge variant="destructive" className="ml-2 text-xs">
                  Non supporté
                </Badge>
              )}
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

          {/* Message d'avertissement si non supporté */}
          {authMethod === 'biometric' && !isBiometricSupported && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                ⚠️ L'authentification biométrique n'est pas supportée sur cet appareil ou ce navigateur. 
                Utilisez un navigateur moderne comme Chrome sur un appareil avec capteur biométrique.
              </p>
            </div>
          )}

          {/* Contenu d'authentification */}
          {authMethod === 'biometric' && isBiometricSupported ? (
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
                    <p className="text-xs text-primary mt-2">
                      📱 Utilisez votre téléphone Android avec le lecteur d'empreinte
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
          ) : authMethod === 'biometric' ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                <Shield className="h-12 w-12 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Authentification biométrique non disponible
                </p>
                <p className="text-xs text-muted-foreground">
                  Veuillez utiliser la méthode par code ou un appareil compatible
                </p>
              </div>
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
