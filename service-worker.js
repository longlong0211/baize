/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "6ac1f847a5fcd240ce6e497f54c75910"
  },
  {
    "url": "assets/css/0.styles.cc700561.css",
    "revision": "e3219dad94714615c0207748e783da9b"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.db3585a0.js",
    "revision": "ac3c07dd1687b332f8d66d63c115fd6c"
  },
  {
    "url": "assets/js/3.698506f3.js",
    "revision": "7006d90e3c1ba944f6159f2935ec54f2"
  },
  {
    "url": "assets/js/4.c7eda6a0.js",
    "revision": "fea0453b59ad31d4edaf6ac124d9f113"
  },
  {
    "url": "assets/js/app.f3b3f261.js",
    "revision": "2e513c91a7f1fbb12640a5433634dc65"
  },
  {
    "url": "index.html",
    "revision": "30059a06cf3b8a0226438ce596db9f70"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
