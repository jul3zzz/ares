/* =====================================================================
   ARES — compte et synchronisation de la progression (Firebase).

   Optionnel de bout en bout : sans compte, tout continue de fonctionner
   exactement comme avant (progression uniquement dans ce navigateur).
   Avec un compte, la progression se synchronise entre tous les appareils.

   Ne fonctionne que dans un vrai navigateur avec acces reseau : sur la forge
   hebergee (GitHub Pages), le compte est disponible ; dans un apercu a
   politique reseau stricte, l'import distant echoue et le module se
   desactive proprement (CloudSync.available reste false).
   ===================================================================== */
var CloudSync = (function () {
  'use strict';
  if (typeof document === 'undefined') return { available: false, ready: true, on: function () {}, schedulePush: function () {} };

  // Identifiants publics du projet Firebase : ce ne sont pas des secrets,
  // la securite vient des regles Firestore, pas de la confidentialite de ces
  // valeurs (elles sont visibles par construction dans le code cote client).
  var FIREBASE_CONFIG = {
    apiKey: "AIzaSyDoasHqf3IIlAb7FRNwHmD67UaebUV2wwQ",
    authDomain: "ares-forge.firebaseapp.com",
    projectId: "ares-forge",
    storageBucket: "ares-forge.firebasestorage.app",
    messagingSenderId: "729912554153",
    appId: "1:729912554153:web:311aa1ae8d6c453dbd6fb8"
  };
  var SDK = "https://www.gstatic.com/firebasejs/10.14.1/";
  var COLLECTION = "ares_progress";

  var state = { available: false, ready: false, user: null, db: null, auth: null, fns: null };
  var listeners = [];
  var pushTimer = null;
  var pendingPush = null;

  function on(evt, cb) { listeners.push({ evt: evt, cb: cb }); }
  function fire(evt, detail) { listeners.forEach(function (l) { if (l.evt === evt) l.cb(detail); }); }

  function messageErreur(code) {
    var table = {
      'auth/email-already-in-use': "Cet email est deja utilise. Essaie de te connecter a la place.",
      'auth/invalid-email': "Adresse email invalide.",
      'auth/missing-password': "Le mot de passe ne peut pas etre vide.",
      'auth/weak-password': "Le mot de passe doit faire au moins 6 caracteres.",
      'auth/wrong-password': "Email ou mot de passe incorrect.",
      'auth/invalid-credential': "Email ou mot de passe incorrect.",
      'auth/user-not-found': "Aucun compte avec cet email. Cree un compte d'abord.",
      'auth/too-many-requests': "Trop de tentatives. Reessaie dans quelques minutes.",
      'auth/network-request-failed': "Pas de connexion internet."
    };
    return table[code] || "Une erreur est survenue. Reessaie.";
  }

  var initPromise = null;
  function init() {
    if (initPromise) return initPromise;
    initPromise = (function () {
      if (FIREBASE_CONFIG.apiKey === 'REMPLACER') { state.ready = true; return Promise.resolve(); }
      return Promise.all([
        import(/* webpackIgnore: true */ SDK + 'firebase-app.js'),
        import(/* webpackIgnore: true */ SDK + 'firebase-auth.js'),
        import(/* webpackIgnore: true */ SDK + 'firebase-firestore.js')
      ]).then(function (mods) {
        var appMod = mods[0], authMod = mods[1], fsMod = mods[2];
        var app = appMod.initializeApp(FIREBASE_CONFIG);
        state.auth = authMod.getAuth(app);
        state.db = fsMod.getFirestore(app);
        state.fns = { authMod: authMod, fsMod: fsMod };
        state.available = true;
        authMod.onAuthStateChanged(state.auth, function (user) {
          state.user = user;
          fire('auth', user);
          if (user) chargerDepuisCloud(user.uid);
        });
      }).catch(function () {
        state.available = false;
      }).then(function () {
        state.ready = true;
        fire('ready', state.available);
      });
    })();
    return initPromise;
  }

  function chargerDepuisCloud(uid) {
    var fsMod = state.fns.fsMod;
    fsMod.getDoc(fsMod.doc(state.db, COLLECTION, uid)).then(function (snap) {
      fire('cloud-data', snap.exists() ? snap.data().donnees : null);
    }).catch(function () { /* pas grave : on reste sur la progression locale */ });
  }

  function schedulePush(progres) {
    if (!state.available || !state.user) return;
    pendingPush = progres;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () { pousserMaintenant(); }, 1200);
  }

  function pousserMaintenant() {
    if (!state.available || !state.user || !pendingPush) return;
    var fsMod = state.fns.fsMod;
    var ref = fsMod.doc(state.db, COLLECTION, state.user.uid);
    fsMod.setDoc(ref, { donnees: pendingPush, maj: fsMod.serverTimestamp(), email: state.user.email })
      .catch(function () { /* la prochaine modification relancera l'envoi */ });
  }

  function inscrire(email, motDePasse) {
    return init().then(function () {
      if (!state.available) return { ok: false, msg: "Compte indisponible dans cet apercu." };
      return state.fns.authMod.createUserWithEmailAndPassword(state.auth, email, motDePasse)
        .then(function (cred) { return { ok: true, user: cred.user }; })
        .catch(function (e) { return { ok: false, msg: messageErreur(e.code) }; });
    });
  }

  function connecter(email, motDePasse) {
    return init().then(function () {
      if (!state.available) return { ok: false, msg: "Compte indisponible dans cet apercu." };
      return state.fns.authMod.signInWithEmailAndPassword(state.auth, email, motDePasse)
        .then(function (cred) { return { ok: true, user: cred.user }; })
        .catch(function (e) { return { ok: false, msg: messageErreur(e.code) }; });
    });
  }

  function reinitialiserMotDePasse(email) {
    return init().then(function () {
      if (!state.available) return { ok: false, msg: "Compte indisponible dans cet apercu." };
      return state.fns.authMod.sendPasswordResetEmail(state.auth, email)
        .then(function () { return { ok: true }; })
        .catch(function (e) { return { ok: false, msg: messageErreur(e.code) }; });
    });
  }

  function deconnecter() {
    if (state.available && state.auth) state.fns.authMod.signOut(state.auth);
  }

  init();

  return {
    on: on,
    init: init,
    inscrire: inscrire,
    connecter: connecter,
    deconnecter: deconnecter,
    reinitialiserMotDePasse: reinitialiserMotDePasse,
    schedulePush: schedulePush,
    get available() { return state.available; },
    get ready() { return state.ready; },
    get user() { return state.user; }
  };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = CloudSync;
