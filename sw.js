'use strict';
const CACHE='estante-partituras-v1.4.2';
const PREFIX='estante-partituras-';
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(['./','./index.html']);})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith(PREFIX)&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;e.respondWith((async()=>{const c=await caches.open(CACHE),hit=await c.match(e.request,{ignoreSearch:true});if(hit)return hit;try{const r=await fetch(e.request);if(r.ok)await c.put(e.request,r.clone());return r}catch(err){if(e.request.mode==='navigate')return (await c.match('./index.html'))||new Response('Offline',{status:503});return new Response('',{status:503})}})())});
