/*
	krpano 1.19-pr16 ScrollArea Plugin (build 2018-04-04)
	http://krpano.com/plugins/scrollarea/
*/
var krpanoplugin = function () {
  function P(a) { return "boolean" == typeof a ? a : 0 <= "yesontrue1".indexOf(String(a).toLowerCase()) } function Z(a) {
    if (a && k && aa) {
      var d = k.timertick, f = 0; 0 == Q && (Q = d); var b = d - Q | 0; Q = d; "wheel" == a.type ? f = a.deltaY : "mousewheel" == a.type ? f = -a.wheelDelta : "DOMMouseScroll" == a.type && (f = a.detail); f = -f; 500 < b ? R = 1 == a.deltaMode || 0 == f % 20 ? 0 : 1 : 66 > b && 0 == R && 0 != f % 40 && 6 < Math.abs(f) && (R = 1); a.preventDefault(); a.stopPropagation(); 0 != f && (0 == R ? f = 0 > f ? -5 : 5 : (f /= 20, -10 > f ? f = -10 : 10 < f && (f = 10)), 1 == n ? S(f * A, 0) : 2 == n ? S(0, f *
        y) : 3 == n && S(0, f * y))
    }
  } function r(a, d, f, b, e) { var c = null; e = (!0 === e ? "remove" : "add") + "EventListener"; var g = T.browser.events; if (g.touch && ("down" == d ? c = g.touchstart : "move" == d ? c = g.touchmove : "up" == d && (c = g.touchend), T.ie && 0 == g.mouse && ("over" == d ? c = g.pointerover ? g.pointerover : "MSPointerOver" : "out" == d && (c = g.pointerout ? g.pointerout : "MSPointerOut")), c)) a[e](c, f, b); if (g.mouse && ("down" == d ? c = "mousedown" : "move" == d ? c = "mousemove" : "up" == d ? c = "mouseup" : "over" == d ? c = "mouseover" : "out" == d && (c = "mouseout"), c)) a[e](c, f, b) } function ba() {
    if (b) {
      var a =
        b.sprite.parentNode; a && (a = a.kobject) && (a.maskchildren = !0, a.poschanged && a.updatepluginpos(), b.poschanged && b.updatepluginpos(), ca = a, t = a.pixelwidth, u = a.pixelheight, isNaN(t) && (t = 0), isNaN(u) && (u = 0), D = 0 < t || 0 < u)
    }
  } function E() { e = Number(b.x); c = Number(b.y); isNaN(da) && (e = 0); isNaN(ea) && (c = 0) } function F(a) {
    a = void 0 === a ? !1 : a; 1 == (n & 1) ? b.x != e && (b.x = e, a = !0) : e = 0; 2 == (n & 2) ? b.y != c && (b.y = c, a = !0) : c = 0; !D || U[0] == v && U[1] == w || (U[0] = v, U[1] = w, a = !0); if (a && b && D) {
      a = t - v; var d = u - w, f = e, l = c; isNaN(f) && (f = 0); isNaN(l) && (l = 0); f += a * p; l +=
        d * q; b.woverflow = -a; b.hoverflow = -d; b.loverflow = Math.round((-f + G * a) * A); b.roverflow = Math.round((+f - (1 - G) * a) * A); b.toverflow = Math.round((-l + H * d) * y); b.boverflow = Math.round((+l - (1 - H) * d) * y); b.onscroll && k.call(b.onscroll, b)
    }
  } function ia(a) { for (; 0 < z.length && !(100 >= a - z[0].time);)z.shift() } function I() {
    ba(); var a = String(b.align).toLowerCase(); if ("" == a || "null" == a) a = "lefttop"; y = A = 1; q = p = .5; H = G = 0; 0 <= a.indexOf("left") && (p = G = 0, A = 1); 0 <= a.indexOf("top") && (q = H = 0, y = 1); 0 <= a.indexOf("right") && (G = 1, p = 0, A = -1); 0 <= a.indexOf("bottom") &&
      (H = 1, q = 0, y = -1)
  } function ja(a) { I(); z = []; if (0 == J) x = !1; else { r(window, "up", fa, !0); r(window, "move", ga, !0); var d = k.stagescale, b = a.changedTouches && 0 < a.changedTouches.length ? a.changedTouches[0] : a; a = b.pageX / d; d = b.pageY / d; x = !1; V = a; W = d; return !1 } } function ka(a) { (void 0 === a.pointerType || 4 == a.pointerType || "mouse" == a.pointerType) && ha && (I(), 0 != D && (a = u - w, 0 > t - v || 0 > a)) && (K = !0, r(b.sprite, "move", la, !0), r(b.sprite, "out", ma, !0)) } function la(a) { K && 0 == x && ca && (a = ca.getmouse(), X(a.x / t * b.pixelwidth, a.y / u * b.pixelheight, !0)) }
  function ma(a) { r(b.sprite, "move", la, !0, !0); r(b.sprite, "out", ma, !0, !0); K = !1 } function ga(a) {
    if (0 == J) return x = !1; var d = k.stagescale, b = a.changedTouches && 0 < a.changedTouches.length ? a.changedTouches[0] : a; a = b.pageX / d; d = b.pageY / d; 0 == x && (n & 1 && 5 < Math.abs(a - V) || n & 2 && 5 < Math.abs(d - W)) && (B && (g = h = 0, B = !1), null != m && (clearInterval(m), m = null), x = !0, K = !1, V = a, W = d, E(), da = e, ea = c); x && (b = k.timertick, ia(b), z.push({ time: b, x: a, y: d }), e = da + (a - V) * A, c = ea + (d - W) * y, a = -(v - t), d = -(w - u), e += a * p, c += d * q, b = 1 / (1 + C * C), e = 0 < a ? e - (e - a * p) * b : e - (0 < e ?
      e : e < a ? e - a : 0) * b, c = 0 < d ? c - (c - d * q) * b : c - (0 < c ? c : c < d ? c - d : 0) * b, e -= a * p, c -= d * q, F()); return !1
  } function fa(a) { r(window, "up", fa, !0, !0); r(window, "move", ga, !0, !0); if (0 == J) g = h = 0, x = !1; else if (x) { ia(k.timertick); if (1 < z.length) { a = z[0]; var d = z[z.length - 1], b = d.y - a.y, c = (d.time - a.time) * Y; h = (d.x - a.x) / c * A; g = b / c * y } else g = h = 0; m = setInterval(L, 1E3 / 60); x = !1 } } function pa() { setTimeout(function () { ba(); F(!0); null == m && (m = setInterval(L, 1E3 / 60)) }, 100) } function qa() { b && (ba(), E(), F(!0)) } function L() {
    e += h; c += g; h *= M; g *= M; var a = 0, d = 0, b = -(v -
      t), l = -(w - u); e += b * p; c += l * q; 0 < b ? a = e - b * p : B ? a = e - na : e < b ? a = e - b : 0 < e && (a = e); .1 > a * a && (a = 0); 0 < l ? d = c - l * q : B ? d = c - oa : c < l ? d = c - l : 0 < c && (d = c); .1 > d * d && (d = 0); e -= b * p; c -= l * q; 0 == (n & 1) && (h = a = 0); 0 == (n & 2) && (g = d = 0); 0 != a && (a *= -1, e += a * (1 - C), h = 0 >= a * h ? h + a * N : a * O, h *= C); 0 != d && (d *= -1, c += d * (1 - C), g = 0 >= d * g ? g + d * N : d * O, g *= C); 0 == a && 0 == d && .05 > Math.sqrt(h * h + g * g) && (B = !1, g = h = 0, clearInterval(m), m = null); F()
  } function X(a, b, f) {
    I(); E(); if (0 == D) setTimeout(function () { X(a, b, f) }, 10); else {
      a = Number(a); isNaN(a) && (a = 0); b = Number(b); isNaN(b) && (b = 0); var l = t -
        v, g = u - w; a = G * v + a * A; b = H * w + b * y; a *= -1; b *= -1; a += t / 2; 0 < a && (a = 0); a < l && (a = l); b += u / 2; 0 < b && (b = 0); b < g && (b = g); !0 === f ? (B = !0, na = a, oa = b, null == m && (m = setInterval(L, 1E3 / 60))) : (l = -(v - t), g = -(w - u), a = 0 > l ? a - l * p : 0, b = 0 > g ? b - g * q : 0, e = a, c = b, F())
    }
  } function ra(a, b) { X(a, b, !0) } function sa() { x && (r(window, "up", fa, !0, !0), r(window, "move", ga, !0, !0)); null != m && (clearInterval(m), m = null); K = x = !1; z = []; g = h = 0; B = !1; E() } function S(a, b) {
    B = !1; a = Number(a); isNaN(a) && (a = 0); b = Number(b); isNaN(b) && (b = 0); I(); E(); if (0 != D) {
      var f = t - v, l = u - w, k = !1; 0 > f && (e += f *
        p, 0 < a && 0 > e ? (k = !0, h += a) : 0 > a && e > f && (k = !0, h += a), e -= f * p); 0 > l && (c += l * q, 0 < b && 0 > c ? (k = !0, g += b) : 0 > b && c > l && (k = !0, g += b), c -= l * q); k && null == m && (m = setInterval(L, 1E3 / 60))
    }
  } var k = null, b = null, T = null, n = 3, v = 0, w = 0, U = [0, 0], D = !1, ca = null, t = 0, u = 0, B = !1, na = 0, oa = 0, A = 1, y = 1, p = 0, q = 0, G = 0, H = 0, C = 1, M = .95, N = .08, O = .15, Y = 1 / 15, J = !0, aa = !0, x = !1, V = 0, W = 0, e = 0, c = 0, da = 0, ea = 0, m = null, z = [], h = 0, g = 0, K = !1, ha = !1; this.registerplugin = function (a, c, e) {
    k = a; b = e; "1.19" > k.version ? (k.trace(3, "Scrollarea Plugin - too old krpano version (min. version 1.19)"),
      b = k = null) : (T = k.device, b.registerattribute("direction", "all", function (a) { a = String(a).toLowerCase(); n = 0; n |= 1 * (0 <= a.indexOf("h")); n |= 2 * (0 <= a.indexOf("v")); n |= 3 * (0 <= a.indexOf("all")) }, function () { return 3 == (n & 3) ? "all" : 1 == (n & 1) ? "h" : "v" }), b.registerattribute("overscroll", C, function (a) { C = 0 > a ? 0 : 1 < a ? 1 : a }, function () { return C }), b.registerattribute("friction", M, function (a) { M = Number(a) }, function () { return M }), b.registerattribute("acceleration", N, function (a) { N = Number(a) }, function () { return N }), b.registerattribute("returnacceleration",
        O, function (a) { O = Number(a) }, function () { return O }), b.registerattribute("momentum", Y, function (a) { Y = Number(a) }, function () { return Y }), b.registerattribute("onscroll", null), b.registerattribute("woverflow", 0), b.registerattribute("hoverflow", 0), b.registerattribute("loverflow", 0), b.registerattribute("roverflow", 0), b.registerattribute("toverflow", 0), b.registerattribute("boverflow", 0), b.registerattribute("draggable", !0, function (a) { J = P(a) }, function () { return J }), b.registerattribute("mwheel", !0, function (a) { aa = P(a) },
          function () { return aa }), b.registerattribute("onhover_autoscrolling", !1, function (a) { ha = P(a) }, function () { return ha }), b.registerattribute("csshardwareacceleration", "auto"), b.setcenter = X, b.scrolltocenter = ra, b.stopscrolling = sa, b.scrollby = S, b.update = qa, 1 == P(b.csshardwareacceleration) && (b.sprite.style[T.browser.css.transform + "Style"] = "preserve-3d"), b.sprite.addEventListener("DOMMouseScroll", Z, !0), b.sprite.addEventListener("mousewheel", Z, !0), b.sprite.addEventListener("wheel", Z, !0), r(b.sprite, "down", ja, !0),
        r(b.sprite, "over", ka, !0), k.set("events[" + b.name + "_scrollarea].keep", !0), k.set("events[" + b.name + "_scrollarea].onresize", pa))
  }; var Q = 0, R = 0; this.onresize = function (a, b) { if (!k) return !1; v = a; w = b; var f; B = !1; I(); E(); if (0 == D) f = !1; else { f = t - v; var g = u - w, h = !1; e += f * p; if (0 > f) { if (0 > e || e > f) h = !0 } else 0 != e && (h = !0); e -= f * p; c += g * q; if (0 > g) { if (0 > c || c > g) h = !0 } else 0 != c && (h = !0); c -= g * q; h && null == m && (m = setInterval(L, 1E3 / 60)); f = h } 0 == f && F(!0); return !1 }; this.unloadplugin = function () {
    k && b && (k.set("events[" + b.name + "_scrollarea].name",
      null), null != m && (clearInterval(m), m = null), r(b.sprite, "down", ja, !0, !0), r(b.sprite, "over", ka, !0, !0)); k = b = null
  }
};
