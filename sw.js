const CACHE_NAME = 'money-v6';
const ASSETS = [
  'index.html',
  'manifest.json',
  'money1.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // บังคับให้เริ่มทำงานทันทีโดยไม่ต้องรอแอปเก่าปิดตัว
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // ลบแคชถุงเขียวอันเก่าทิ้งให้สิ้นซาก
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
