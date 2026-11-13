const C='tiny-reader-v10';
const A=['./','./index.html','./styles.css','./ipad.css','./app.js','./manifest.json','./icons/icon.svg','./hero-game.png',
'./assets/characters/dao.svg','./assets/characters/ton.svg','./assets/characters/owl.svg','./assets/characters/cat.svg',
'./assets/backgrounds/home.svg','./assets/backgrounds/classroom.svg','./assets/backgrounds/story.svg','./assets/backgrounds/adventure.svg','./assets/backgrounds/rewards.svg',
'./assets/ui/menu-letters.svg','./assets/ui/menu-words.svg','./assets/ui/menu-games.svg','./assets/ui/menu-stories.svg','./assets/ui/menu-map.svg','./assets/ui/menu-rewards.svg','./assets/ui/menu-trace.svg','./assets/ui/menu-progress.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tiny-reader-')&&k!==C).map(k=>caches.delete(k)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);const fresh=e.request.mode==='navigate'||/\.(?:js|css)$/.test(u.pathname);e.respondWith((fresh?fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request)):caches.match(e.request).then(r=>r||fetch(e.request).then(v=>{if(v.ok){const copy=v.clone();caches.open(C).then(c=>c.put(e.request,copy))}return v}))).catch(()=>caches.match('./index.html')))});
