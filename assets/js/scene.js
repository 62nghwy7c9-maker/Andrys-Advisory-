/* Andrys Advisory — WebGL-Eiskristall (Signature-Element, nur Startseite).
   Eigene Szene ohne Addons: Fresnel-Eis-Shader, Struktur-Drahtgitter,
   Schneestaub-Partikel, Maus-Parallaxe, Scroll-Kopplung.
   Performance-Guards: DPR-Cap, Pause bei Unsichtbarkeit, reduzierte
   Partikelzahl auf Touch-Geräten, Einzelframe bei reduced motion. */
import * as THREE from "./vendor/three.module.min.js";

(function () {
  "use strict";

  var canvas = document.getElementById("crystal");
  if (!canvas) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia("(pointer: coarse)").matches;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: !coarse,
      powerPreference: "low-power"
    });
  } catch (e) {
    return; /* Kein WebGL: CSS-Nebelverlauf bleibt als Bühne stehen */
  }

  var dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.75 : 2);
  renderer.setPixelRatio(dpr);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0, 6);

  /* ---- Eis-Körper: flat-shaded Ikosaeder mit Fresnel-Shader ---- */
  var iceGeo = new THREE.IcosahedronGeometry(1.5, 1).toNonIndexed();
  iceGeo.computeVertexNormals();

  var iceMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uBase: { value: new THREE.Color("#dfe3ea") },
      uDeep: { value: new THREE.Color("#8f95a5") },
      uRim: { value: new THREE.Color("#f7f9fb") },
      uOpacity: { value: 1 }
    },
    vertexShader: [
      "varying vec3 vNormal;",
      "varying vec3 vView;",
      "varying vec3 vPos;",
      "void main() {",
      "  vNormal = normalize(normalMatrix * normal);",
      "  vec4 mv = modelViewMatrix * vec4(position, 1.0);",
      "  vView = normalize(-mv.xyz);",
      "  vPos = position;",
      "  gl_Position = projectionMatrix * mv;",
      "}"
    ].join("\n"),
    fragmentShader: [
      "uniform vec3 uBase;",
      "uniform vec3 uDeep;",
      "uniform vec3 uRim;",
      "uniform float uOpacity;",
      "varying vec3 vNormal;",
      "varying vec3 vView;",
      "varying vec3 vPos;",
      "void main() {",
      "  vec3 n = normalize(vNormal);",
      "  float fres = pow(1.0 - abs(dot(n, normalize(vView))), 2.2);",
      "  float depth = smoothstep(-1.6, 1.6, vPos.y);",       /* vertikales Eislicht */
      "  float facet = pow(0.5 + 0.5 * dot(n, normalize(vec3(0.4, 0.9, 0.6))), 1.6);",
      "  vec3 col = mix(uDeep, uBase, depth * 0.45 + facet * 0.55);",
      "  col = mix(col, uRim, fres);",
      "  float a = (0.2 + facet * 0.14 + fres * 0.62) * uOpacity;",
      "  gl_FragColor = vec4(col, a);",
      "}"
    ].join("\n")
  });
  var ice = new THREE.Mesh(iceGeo, iceMat);

  /* ---- Struktur: klare Silhouette außen + inneres Gitter ---- */
  var lineMat = new THREE.LineBasicMaterial({ color: 0x383e4e, transparent: true, opacity: 0.42 });
  var edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.5, 0)), lineMat);
  var innerMat = new THREE.LineBasicMaterial({ color: 0x383e4e, transparent: true, opacity: 0.16 });
  var inner = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.82, 0)), innerMat);

  var crystal = new THREE.Group();
  crystal.add(ice, edges, inner);
  scene.add(crystal);

  /* ---- Schneestaub ---- */
  var COUNT = coarse ? 110 : 240;
  var pos = new Float32Array(COUNT * 3);
  var speed = new Float32Array(COUNT);
  for (var i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    speed[i] = 0.05 + Math.random() * 0.22;
  }
  var pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  var pMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uDpr: { value: dpr } },
    vertexShader: [
      "uniform float uDpr;",
      "void main() {",
      "  vec4 mv = modelViewMatrix * vec4(position, 1.0);",
      "  gl_PointSize = (36.0 / -mv.z) * uDpr * 0.35;",
      "  gl_Position = projectionMatrix * mv;",
      "}"
    ].join("\n"),
    fragmentShader: [
      "void main() {",
      "  float d = length(gl_PointCoord - 0.5);",
      "  float a = smoothstep(0.5, 0.05, d) * 0.4;",
      "  gl_FragColor = vec4(0.714, 0.729, 0.773, a);",  /* #b6bac5 */
      "}"
    ].join("\n")
  });
  var dust = new THREE.Points(pGeo, pMat);
  scene.add(dust);

  /* ---- Resize ---- */
  function resize() {
    var w = canvas.clientWidth || canvas.parentElement.clientWidth;
    var h = canvas.clientHeight || canvas.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    /* Auf schmalen Screens Kristall etwas zurücknehmen */
    camera.position.z = w < 720 ? 8.4 : 6;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  /* ---- Maus-Parallaxe (nur feine Pointer) ---- */
  var mx = 0, my = 0, tmx = 0, tmy = 0;
  if (!coarse) {
    window.addEventListener("pointermove", function (e) {
      tmx = (e.clientX / window.innerWidth - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  /* ---- Scroll-Kopplung: Fortschritt durch den Hero (0…1) ---- */
  var hero = document.querySelector(".hero");
  function heroProgress() {
    if (!hero) return 0;
    var track = hero.offsetHeight - window.innerHeight;
    if (track <= 0) return 0;
    return Math.min(Math.max(-hero.getBoundingClientRect().top / track, 0), 1);
  }

  /* ---- Sichtbarkeit ---- */
  var visible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }).observe(canvas);
  }
  document.addEventListener("visibilitychange", function () {
    visible = visible && !document.hidden;
    if (!document.hidden) visible = true;
  });

  var clock = new THREE.Clock();
  function render() {
    var t = clock.getElapsedTime();
    var p = heroProgress();

    /* Grundrotation + Scroll beschleunigt und kippt den Kristall */
    crystal.rotation.y = t * 0.12 + p * 2.4 + mx * 0.22;
    crystal.rotation.x = 0.42 + Math.sin(t * 0.18) * 0.05 + p * 0.5 + my * 0.14;
    inner.rotation.y = -t * 0.2 - p * 1.2;
    inner.rotation.z = t * 0.08;

    /* Beim Scrollen rückt der Kristall näher und hebt sich */
    var s = 0.74 + p * 0.5;
    crystal.scale.set(s, s, s);
    crystal.position.y = Math.sin(t * 0.4) * 0.06 + p * 0.9;
    iceMat.uniforms.uOpacity.value = 1 - Math.max(0, p - 0.72) / 0.28;
    lineMat.opacity = 0.34 * (1 - p * 0.5);

    /* Staub steigt langsam */
    var arr = pGeo.attributes.position.array;
    for (var i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += speed[i] * 0.004;
      if (arr[i * 3 + 1] > 4.2) arr[i * 3 + 1] = -4.2;
    }
    pGeo.attributes.position.needsUpdate = true;

    mx += (tmx - mx) * 0.04;
    my += (tmy - my) * 0.04;

    renderer.render(scene, camera);
  }

  if (reducedMotion) {
    /* Ein stimmungsvoller Standframe, keine Animation */
    crystal.rotation.set(0.42, 0.8, 0);
    crystal.scale.setScalar(0.74);
    renderer.render(scene, camera);
    window.addEventListener("resize", function () { renderer.render(scene, camera); });
    return;
  }

  renderer.setAnimationLoop(function () {
    if (visible && !document.hidden) render();
  });
})();
