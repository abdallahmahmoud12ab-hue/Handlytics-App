const C='handlytics-v1',A=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;e.respondWith(caches.match(r).then(c=>{const n=fetch(r).then(res=>{if(res&&(res.status==200||res.type=='opaque')){const cp=res.clone();caches.open(C).then(x=>x.put(r,cp))}return res}).catch(()=>c||caches.match('index.html'));return c||n}))});
