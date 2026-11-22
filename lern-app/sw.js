// VALIAS PRO – nur für Benachrichtigungen (Duell-Einladungen). Kein Zwischenspeichern der App.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(l => {
    const w = l.find(c => c.url.includes("/lern-app/")) || l[0];
    return w ? w.focus() : self.clients.openWindow("./");
  }));
});
