const R = {}, $ = {}, Gt = { RUNTIME: "runtime", LEAF: "leaf", TASK: "task", CNAVAS: "canvas", types: {}, create(e) {
  const { types: t } = io;
  return t[e] ? t[e]++ : (t[e] = 1, 0);
} }, io = Gt, Ye = { within: (e, t, s) => (e < t && (e = t), e > s && (e = s), e), fourNumber(e) {
  let t, s, i, r;
  if (e instanceof Array)
    switch (e.length) {
      case 4:
        return e;
      case 2:
        t = i = e[0], s = r = e[1];
        break;
      case 3:
        t = e[0], s = r = e[1], i = e[2];
        break;
      case 1:
        e = e[0];
        break;
      default:
        e = 0;
    }
  return t === void 0 ? [e, e, e, e] : [t, s, i, r];
} }, M = Math.PI / 180, vt = 2 * Math.PI, Oe = Math.PI / 2, { sin: ro, cos: no, acos: fs, atan: $i, sqrt: Ji, PI: oo } = Math, we = {};
function ao() {
  return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
}
const S = { defaultMatrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }, tempMatrix: {}, set(e, t = 1, s = 0, i = 0, r = 1, n = 0, o = 0) {
  e.a = t, e.b = s, e.c = i, e.d = r, e.e = n, e.f = o;
}, get: ao, copy(e, t) {
  e.a = t.a, e.b = t.b, e.c = t.c, e.d = t.d, e.e = t.e, e.f = t.f;
}, translate(e, t, s) {
  e.e += t, e.f += s;
}, translateInner(e, t, s) {
  e.e += e.a * t + e.c * s, e.f += e.b * t + e.d * s;
}, scale(e, t, s = t) {
  e.a *= t, e.d *= s, e.c *= t, e.b *= s;
}, scaleOfOuter(e, t, s, i = s) {
  K.toInnerPoint(e, t, we), K.scaleOfInner(e, we, s, i);
}, scaleOfInner(e, t, s, i = s) {
  K.translateInner(e, t.x, t.y), K.scale(e, s, i), K.translateInner(e, -t.x, -t.y);
}, rotate(e, t) {
  const s = no(t *= M), i = ro(t), { a: r, b: n, c: o, d: a } = e;
  e.a = r * s - n * i, e.b = r * i + n * s, e.c = o * s - a * i, e.d = o * i + a * s;
}, rotateOfOuter(e, t, s) {
  K.toInnerPoint(e, t, we), K.rotateOfInner(e, we, s);
}, rotateOfInner(e, t, s) {
  K.translateInner(e, t.x, t.y), K.rotate(e, s), K.translateInner(e, -t.x, -t.y);
}, skew(e, t, s) {
  const { a: i, b: r, c: n, d: o } = e;
  s && (s *= M, e.a = i + n * s, e.b = r + o * s), t && (t *= M, e.c = n + i * t, e.d = o + r * t);
}, skewOfOuter(e, t, s, i) {
  K.toInnerPoint(e, t, we), K.skewOfInner(e, we, s, i);
}, skewOfInner(e, t, s, i) {
  K.translateInner(e, t.x, t.y), K.skew(e, s, i), K.translateInner(e, -t.x, -t.y);
}, multiply(e, t) {
  const { a: s, b: i, c: r, d: n, e: o, f: a } = e;
  e.a = t.a * s + t.b * r, e.b = t.a * i + t.b * n, e.c = t.c * s + t.d * r, e.d = t.c * i + t.d * n, e.e = t.e * s + t.f * r + o, e.f = t.e * i + t.f * n + a;
}, preMultiply(e, t) {
  const { a: s, b: i, c: r, d: n, e: o, f: a } = e;
  t.a === 1 && t.b === 0 && t.c === 0 && t.d === 1 || (e.a = s * t.a + i * t.c, e.b = s * t.b + i * t.d, e.c = r * t.a + n * t.c, e.d = r * t.b + n * t.d), e.e = o * t.a + a * t.c + t.e, e.f = o * t.b + a * t.d + t.f;
}, divide(e, t) {
  K.multiply(e, K.tempInvert(t));
}, tempInvert(e) {
  const { tempMatrix: t } = K;
  return K.copy(t, e), K.invert(t), t;
}, invert(e) {
  const { a: t, b: s, c: i, d: r, e: n, f: o } = e, a = 1 / (t * r - s * i);
  e.a = r * a, e.b = -s * a, e.c = -i * a, e.d = t * a, e.e = -(n * r - o * i) * a, e.f = -(o * t - n * s) * a;
}, toOuterPoint(e, t, s, i) {
  const { x: r, y: n } = t;
  s || (s = t), s.x = r * e.a + n * e.c, s.y = r * e.b + n * e.d, i || (s.x += e.e, s.y += e.f);
}, toInnerPoint(e, t, s, i) {
  const { x: r, y: n } = t, { a: o, b: a, c: l, d: c } = e, u = 1 / (o * c - a * l);
  if (s || (s = t), s.x = (r * c - n * l) * u, s.y = (n * o - r * a) * u, !i) {
    const { e: h, f: p } = e;
    s.x -= (h * c - p * l) * u, s.y -= (p * o - h * a) * u;
  }
}, decompose(e) {
  const { a: t, b: s, c: i, d: r } = e;
  let n = t, o = r, a = 0, l = 0, c = 0;
  if (s || i) {
    const u = t * r - s * i, h = t * i + s * r;
    if (s) {
      const p = t * t + s * s;
      n = Ji(p), o = u / n;
      const _ = t / n;
      a = s > 0 ? fs(_) : -fs(_), l = $i(h / p) / M;
    } else {
      const p = i * i + r * r;
      o = Ji(p), n = u / o;
      const _ = i / o;
      a = oo / 2 - (r > 0 ? fs(-_) : -fs(_)), c = $i(h / p) / M;
    }
    a /= M;
  }
  return { x: e.e, y: e.f, scaleX: n, scaleY: o, rotation: a, skewX: l, skewY: c };
}, reset(e) {
  K.set(e);
} }, K = S, { toInnerPoint: Ys, toOuterPoint: tr } = S, { sin: er, cos: sr, abs: ir, sqrt: ho, atan2: lo } = Math, O = { defaultPoint: { x: 0, y: 0 }, tempPoint: {}, tempRadiusPoint: {}, set(e, t = 0, s = 0) {
  e.x = t, e.y = s;
}, copy(e, t) {
  e.x = t.x, e.y = t.y;
}, move(e, t, s) {
  e.x += t, e.y += s;
}, rotate(e, t, s) {
  s || (s = bt.defaultPoint);
  const i = sr(t * M), r = er(t * M), n = e.x - s.x, o = e.y - s.y;
  e.x = s.x + n * i - o * r, e.y = s.y + n * r - o * i;
}, tempToInnerOf(e, t) {
  const { tempPoint: s } = bt;
  return bt.copy(s, e), Ys(t, s, s), s;
}, tempToOuterOf(e, t) {
  const { tempPoint: s } = bt;
  return bt.copy(s, e), tr(t, s, s), s;
}, tempToInnerRadiusPointOf(e, t) {
  const { tempRadiusPoint: s } = bt;
  return bt.copy(s, e), bt.toInnerRadiusPointOf(e, t, s), s;
}, toInnerRadiusPointOf(e, t, s) {
  s || (s = e), Ys(t, e, s), s.radiusX = e.radiusX / t.a, s.radiusY = e.radiusY / t.d;
}, toInnerOf(e, t, s) {
  Ys(t, e, s);
}, toOuterOf(e, t, s) {
  tr(t, e, s);
}, getCenter: (e, t) => ({ x: e.x + (t.x - e.x) / 2, y: e.y + (t.y - e.y) / 2 }), getDistance(e, t) {
  const s = ir(t.x - e.x), i = ir(t.y - e.y);
  return ho(s * s + i * i);
}, getAngle: (e, t) => bt.getAtan2(e, t) / M, getAtan2: (e, t) => lo(t.y - e.y, t.x - e.x), getDistancePoint(e, t, s) {
  const i = bt.getAtan2(e, t);
  return { x: e.x + sr(i) * s, y: e.y + er(i) * s };
}, reset(e) {
  bt.reset(e);
} }, bt = O;
class Di {
  constructor(t, s) {
    typeof t == "object" ? O.copy(this, t) : O.set(this, t, s);
  }
  set(t, s) {
    O.set(this, t, s);
  }
  copy(t) {
    return O.copy(this, t), this;
  }
  clone() {
    return new Di(this);
  }
  rotate(t, s) {
    return O.rotate(this, t, s), this;
  }
  toInnerOf(t, s) {
    return O.toInnerOf(this, t, s), this;
  }
  toOuterOf(t, s) {
    return O.toOuterOf(this, t, s), this;
  }
  getCenter(t) {
    return O.getCenter(this, t);
  }
  getDistance(t) {
    return O.getDistance(this, t);
  }
  getAngle(t) {
    return O.getAngle(this, t);
  }
  getAtan2(t) {
    return O.getAtan2(this, t);
  }
  reset() {
    O.reset(this);
  }
}
class ne {
  constructor(t, s, i, r, n, o) {
    typeof t == "object" ? S.copy(this, t) : S.set(this, t, s, i, r, n, o);
  }
  set(t, s, i, r, n, o) {
    S.set(this, t, s, i, r, n, o);
  }
  copy(t) {
    return S.copy(this, t), this;
  }
  clone() {
    return new ne(this);
  }
  translate(t, s) {
    return S.translate(this, t, s), this;
  }
  translateInner(t, s) {
    return S.translateInner(this, t, s), this;
  }
  scale(t, s) {
    return S.scale(this, t, s), this;
  }
  scaleOfOuter(t, s, i) {
    return S.scaleOfOuter(this, t, s, i), this;
  }
  scaleOfInner(t, s, i) {
    return S.scaleOfInner(this, t, s, i), this;
  }
  rotate(t) {
    return S.rotate(this, t), this;
  }
  rotateOfOuter(t, s) {
    return S.rotateOfOuter(this, t, s), this;
  }
  rotateOfInner(t, s) {
    return S.rotateOfInner(this, t, s), this;
  }
  skew(t, s) {
    return S.skew(this, t, s), this;
  }
  skewOfOuter(t, s, i) {
    return S.skewOfOuter(this, t, s, i), this;
  }
  skewOfInner(t, s, i) {
    return S.skewOfInner(this, t, s, i), this;
  }
  multiply(t) {
    return S.multiply(this, t), this;
  }
  preMultiply(t) {
    return S.preMultiply(this, t), this;
  }
  divide(t) {
    return S.divide(this, t), this;
  }
  invert() {
    return S.invert(this), this;
  }
  toOuterPoint(t, s) {
    S.toOuterPoint(this, t, s);
  }
  toInnerPoint(t, s) {
    S.toInnerPoint(this, t, s);
  }
  decompose() {
    return S.decompose(this);
  }
  reset() {
    S.reset(this);
  }
}
const Mt = { tempPointBounds: {}, setPoint(e, t, s) {
  e.minX = e.maxX = t, e.minY = e.maxY = s;
}, addPoint(e, t, s) {
  e.minX = t < e.minX ? t : e.minX, e.minY = s < e.minY ? s : e.minY, e.maxX = t > e.maxX ? t : e.maxX, e.maxY = s > e.maxY ? s : e.maxY;
}, addBounds(e, t, s, i, r) {
  rr(e, t, s), rr(e, t + i, s + r);
}, copy(e, t) {
  e.minX = t.minX, e.minY = t.minY, e.maxX = t.maxX, e.maxY = t.maxY;
}, add(e, t) {
  e.minX = t.minX < e.minX ? t.minX : e.minX, e.minY = t.minY < e.minY ? t.minY : e.minY, e.maxX = t.maxX > e.maxX ? t.maxX : e.maxX, e.maxY = t.maxY > e.maxY ? t.maxY : e.maxY;
}, toBounds(e, t) {
  t.x = e.minX, t.y = e.minY, t.width = e.maxX - e.minX, t.height = e.maxY - e.minY;
} }, { addPoint: rr } = Mt, { tempPointBounds: Qt, setPoint: nr, addPoint: ys, toBounds: or } = Mt, { toOuterPoint: ms } = S;
let Rt, Lt, xe, be;
const Nt = {}, gt = {}, P = { tempBounds: {}, set(e, t = 0, s = 0, i = 0, r = 0) {
  e.x = t, e.y = s, e.width = i, e.height = r;
}, copy(e, t) {
  e.x = t.x, e.y = t.y, e.width = t.width, e.height = t.height;
}, copyAndSpread(e, t, s) {
  U.set(e, t.x - s, t.y - s, t.width + 2 * s, t.height + 2 * s);
}, right: (e) => e.x + e.width, bottom: (e) => e.y + e.height, move(e, t, s) {
  e.x += t, e.y += s;
}, getByMove: (e, t, s) => (e = Object.assign({}, e), U.move(e, t, s), e), toOffsetOutBounds(e, t, s) {
  t ? ar(t, e) : t = e, s ? (t.offsetX = -(U.right(s) - e.x), t.offsetY = -(U.bottom(s) - e.y)) : (t.offsetX = e.x + e.width, t.offsetY = e.y + e.height), U.move(t, -t.offsetX, -t.offsetY);
}, scale(e, t) {
  e.x *= t, e.y *= t, e.width *= t, e.height *= t;
}, tempToOuterOf: (e, t) => (U.copy(U.tempBounds, e), U.toOuterOf(U.tempBounds, t), U.tempBounds), getOuterOf: (e, t) => (e = Object.assign({}, e), U.toOuterOf(e, t), e), toOuterOf(e, t, s) {
  if (s || (s = e), t.b === 0 && t.c === 0) {
    const { a: i, d: r } = t;
    i > 0 ? (s.width = e.width * i, s.x = t.e + e.x * i) : (s.width = e.width * -i, s.x = t.e + e.x * i - s.width), r > 0 ? (s.height = e.height * r, s.y = t.f + e.y * r) : (s.height = e.height * -r, s.y = t.f + e.y * r - s.height);
  } else
    Nt.x = e.x, Nt.y = e.y, ms(t, Nt, gt), nr(Qt, gt.x, gt.y), Nt.x = e.x + e.width, ms(t, Nt, gt), ys(Qt, gt.x, gt.y), Nt.y = e.y + e.height, ms(t, Nt, gt), ys(Qt, gt.x, gt.y), Nt.x = e.x, ms(t, Nt, gt), ys(Qt, gt.x, gt.y), or(Qt, s);
}, getFitMatrix(e, t) {
  const s = Math.min(1, Math.min(e.width / t.width, e.height / t.height));
  return new ne(s, 0, 0, s, -t.x * s, -t.y * s);
}, getSpread(e, t) {
  const s = {};
  return U.copyAndSpread(s, e, t), s;
}, spread(e, t) {
  U.copyAndSpread(e, e, t);
}, ceil(e) {
  e.x = Math.floor(e.x), e.y = Math.floor(e.y), e.width = Math.ceil(e.width), e.height = Math.ceil(e.height);
}, add(e, t) {
  Rt = e.x + e.width, Lt = e.y + e.height, xe = t.x + t.width, be = t.y + t.height, Rt = Rt > xe ? Rt : xe, Lt = Lt > be ? Lt : be, e.x = e.x < t.x ? e.x : t.x, e.y = e.y < t.y ? e.y : t.y, e.width = Rt - e.x, e.height = Lt - e.y;
}, addList(e, t) {
  U.setByListWithHandle(e, t, void 0, !0);
}, setByList(e, t, s = !1) {
  U.setByListWithHandle(e, t, void 0, s);
}, addListWithHandle(e, t, s) {
  U.setByListWithHandle(e, t, s, !0);
}, setByListWithHandle(e, t, s, i = !1) {
  let r, n = !0;
  for (let o = 0, a = t.length; o < a; o++)
    r = s ? s(t[o]) : t[o], r && (r.width || r.height) && (n ? (n = !1, i || ar(e, r)) : co(e, r));
  n && U.reset(e);
}, setByPoints(e, t) {
  t.forEach((s, i) => {
    i === 0 ? nr(Qt, s.x, s.y) : ys(Qt, s.x, s.y);
  }), or(Qt, e);
}, hitRadiusPoint: (e, t, s) => (s && (t = O.tempToInnerRadiusPointOf(t, s)), t.x >= e.x - t.radiusX && t.x <= e.x + e.width + t.radiusX && t.y >= e.y - t.radiusY && t.y <= e.y + e.height + t.radiusY), hitPoint: (e, t, s) => (s && (t = O.tempToInnerOf(t, s)), t.x >= e.x && t.x <= e.x + e.width && t.y >= e.y && t.y <= e.y + e.height), hit: (e, t, s) => (s && (t = U.tempToOuterOf(t, s)), !(e.y + e.height < t.y || t.y + t.height < e.y || e.x + e.width < t.x || t.x + t.width < e.x)), includes: (e, t, s) => (s && (t = U.tempToOuterOf(t, s)), e.x <= t.x && e.y <= t.y && e.x + e.width >= t.x + t.width && e.y + e.height >= t.y + t.height), getIntersectData(e, t, s) {
  s && (t = U.tempToOuterOf(t, s));
  let { x: i, y: r, width: n, height: o } = t;
  return Rt = i + n, Lt = r + o, xe = e.x + e.width, be = e.y + e.height, i = i > e.x ? i : e.x, r = r > e.y ? r : e.y, Rt = Rt < xe ? Rt : xe, Lt = Lt < be ? Lt : be, n = Rt - i, o = Lt - r, { x: i, y: r, width: n, height: o };
}, intersect(e, t, s) {
  U.copy(e, U.getIntersectData(e, t, s));
}, isSame: (e, t) => e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height, isEmpty: (e) => e.x === 0 && e.y === 0 && e.width === 0 && e.height === 0, reset(e) {
  U.set(e);
} }, U = P, { add: co, copy: ar } = U;
class et {
  constructor(t, s, i, r) {
    typeof t == "object" ? P.copy(this, t) : P.set(this, t, s, i, r);
  }
  set(t, s, i, r) {
    P.set(this, t, s, i, r);
  }
  copy(t) {
    return P.copy(this, t), this;
  }
  clone() {
    return new et(this);
  }
  scale(t) {
    return P.scale(this, t), this;
  }
  toOuterOf(t, s) {
    return P.toOuterOf(this, t, s), this;
  }
  getFitMatrix(t) {
    return P.getFitMatrix(this, t);
  }
  spread(t) {
    return P.spread(this, t), this;
  }
  ceil() {
    return P.ceil(this), this;
  }
  add(t) {
    return P.add(this, t), this;
  }
  addList(t) {
    return P.setByList(this, t, !0), this;
  }
  setByList(t, s) {
    return P.setByList(this, t, s), this;
  }
  addListWithHandle(t, s) {
    return P.setByListWithHandle(this, t, s, !0), this;
  }
  setByListWithHandle(t, s, i) {
    return P.setByListWithHandle(this, t, s, i), this;
  }
  setByPoints(t) {
    return P.setByPoints(this, t), this;
  }
  hitPoint(t, s) {
    return P.hitPoint(this, t, s);
  }
  hitRadiusPoint(t, s) {
    return P.hitRadiusPoint(this, t, s);
  }
  hit(t, s) {
    return P.hit(this, t, s);
  }
  includes(t, s) {
    return P.includes(this, t, s);
  }
  intersect(t, s) {
    return P.intersect(this, t, s), this;
  }
  getIntersect(t, s) {
    return new et(P.getIntersectData(this, t, s));
  }
  isSame(t) {
    return P.isSame(this, t);
  }
  isEmpty() {
    return P.isEmpty(this);
  }
  reset() {
    P.reset(this);
  }
}
class yn {
  constructor(t, s, i, r, n, o) {
    typeof t == "object" ? this.copy(t) : this.set(t, s, i, r, n, o);
  }
  set(t = 0, s = 0, i = 0, r = 0, n = 0, o = 0) {
    this.top = t, this.right = s, this.bottom = i, this.left = r, this.width = n, this.height = o;
  }
  copy(t) {
    const { top: s, right: i, bottom: r, left: n, width: o, height: a } = t;
    this.set(s, i, r, n, o, a);
  }
  getBoundsFrom(t) {
    const { top: s, right: i, bottom: r, left: n, width: o, height: a } = this;
    return new et(n, s, o || t.width - n - i, a || t.height - s - r);
  }
}
class uo {
  constructor(t, s) {
    Mt.setPoint(this, t, s);
  }
  addPoint(t, s) {
    Mt.addPoint(this, t, s);
  }
  addBounds(t, s, i, r) {
    Mt.addBounds(this, t, s, i, r);
  }
  add(t) {
    Mt.add(this, t);
  }
}
const mn = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, ".": 1, e: 1, E: 1 };
class W {
  constructor(t) {
    this.repeatMap = {}, this.name = t;
  }
  static get(t) {
    return new W(t);
  }
  static set filter(t) {
    t ? typeof t == "string" && (t = [t]) : t = [], this.filterList = t;
  }
  static set exclude(t) {
    t ? typeof t == "string" && (t = [t]) : t = [], this.excludeList = t;
  }
  log(...t) {
    if (je.enable) {
      if (je.filterList.length && je.filterList.every((s) => s !== this.name) || je.excludeList.length && je.excludeList.some((s) => s === this.name))
        return;
      console.log("%c" + this.name, "color:#21ae62", ...t);
    }
  }
  warn(...t) {
    console.warn(this.name, ...t);
  }
  repeat(t, ...s) {
    this.repeatMap[t] || (console.warn(this.name, "repeat:" + t, ...s), this.repeatMap[t] = !0);
  }
  error(...t) {
    try {
      throw new Error();
    } catch (s) {
      console.error(this.name, ...t, s);
    }
  }
}
W.filterList = [], W.excludeList = [];
const je = W, hr = W.get("RunTime");
class at {
  static start(t, s) {
    const i = Gt.create(Gt.RUNTIME);
    return ft.currentId = ft.idMap[i] = s ? performance.now() : Date.now(), ft.currentName = ft.nameMap[i] = t, ft.nameToIdMap[t] = i, i;
  }
  static end(t, s) {
    const i = ft.idMap[t], r = ft.nameMap[t];
    ft.idMap[t] = ft.nameMap[t] = ft.nameToIdMap[r] = void 0, s ? hr.log(r, performance.now() - i, "µs") : hr.log(r, Date.now() - i, "ms");
  }
  static endOfName(t, s) {
    const i = ft.nameToIdMap[t];
    i !== void 0 && ft.end(i, s);
  }
}
at.idMap = {}, at.nameMap = {}, at.nameToIdMap = {};
const ft = at, _o = W.get("UICreator"), Fs = { list: {}, register(e) {
  const { __tag: t } = e.prototype;
  js[t] ? _o.repeat(t) : js[t] = e;
}, get(e, t, s, i, r, n) {
  const o = new js[e](t);
  return s !== void 0 && (o.x = s, i && (o.y = i), r && (o.width = r), n && (o.height = n)), o;
} }, { list: js } = Fs, po = W.get("EventCreator"), ds = { nameList: {}, register(e) {
  let t;
  Object.keys(e).forEach((s) => {
    t = e[s], typeof t == "string" && (Xe[t] ? po.repeat(t) : Xe[t] = e);
  });
}, changeName(e, t) {
  const s = Xe[e];
  if (s) {
    const i = Object.keys(s).find((r) => s[r] === e);
    i && (s[i] = t, Xe[t] = s);
  }
}, get: (e, ...t) => new Xe[e](...t) }, { nameList: Xe } = ds;
class Mi {
  constructor() {
    this.list = [];
  }
  add(t) {
    t.manager = this, this.list.push(t);
  }
  get(t) {
    let s;
    const { list: i } = this;
    for (let n = 0, o = i.length; n < o; n++)
      if (s = i[n], s.recycled && s.isSameSize(t))
        return s.recycled = !1, s.manager || (s.manager = this), s;
    const r = $.canvas(t);
    return this.add(r), r;
  }
  recycle(t) {
    t.recycled || (t.clear(), t.recycled = !0);
  }
  clearRecycled() {
    let t;
    const s = [];
    for (let i = 0, r = this.list.length; i < r; i++)
      t = this.list[i], t.recycled ? t.destroy() : s.push(t);
    this.list = s;
  }
  clear() {
    this.list.forEach((t) => {
      t.destroy();
    }), this.list.length = 0;
  }
  destroy() {
    this.clear();
  }
}
class tt {
  get length() {
    return this.list.length;
  }
  constructor(t) {
    this.reset(), t && (t instanceof Array ? this.pushList(t) : this.push(t));
  }
  has(t) {
    return this.keys[t.innerId] !== void 0;
  }
  indexAt(t) {
    return this.list[t];
  }
  indexOf(t) {
    const s = this.keys[t.innerId];
    return s === void 0 ? -1 : s;
  }
  pushList(t) {
    t.forEach((s) => {
      this.push(s);
    });
  }
  unshift(t) {
    const { keys: s } = this;
    s[t.innerId] === void 0 && (this.list.unshift(t), Object.keys(s).forEach((i) => {
      s[i] !== void 0 && s[i]++;
    }), s[t.innerId] = 0);
  }
  push(t) {
    const { list: s, keys: i } = this;
    i[t.innerId] === void 0 && (s.push(t), i[t.innerId] = s.length - 1);
  }
  sort(t) {
    const { list: s } = this;
    t ? s.sort((i, r) => r.__level - i.__level) : s.sort((i, r) => i.__level - r.__level);
  }
  remove(t) {
    const { list: s } = this;
    let i;
    for (let r = 0, n = s.length; r < n; r++)
      i !== void 0 ? this.keys[s[r].innerId] = r - 1 : s[r].innerId === t.innerId && (i = r, delete this.keys[t.innerId]);
    i !== void 0 && s.splice(i, 1);
  }
  forEach(t) {
    this.list.forEach(t);
  }
  clone() {
    const t = new tt();
    return this.list.forEach((s) => {
      t.push(s);
    }), t;
  }
  reset() {
    this.list = [], this.keys = {};
  }
  destroy() {
    this.list = null;
  }
}
class vn {
  get length() {
    return this._length;
  }
  constructor(t) {
    this._length = 0, this.reset(), t && (t instanceof Array ? this.pushList(t) : this.push(t));
  }
  has(t) {
    return this.keys[t.innerId] !== void 0;
  }
  without(t) {
    return this.keys[t.innerId] === void 0;
  }
  sort(t) {
    const { levels: s } = this;
    t ? s.sort((i, r) => r - i) : s.sort((i, r) => i - r);
  }
  pushList(t) {
    t.forEach((s) => {
      this.push(s);
    });
  }
  push(t) {
    const { keys: s, levelMap: i } = this;
    s[t.innerId] || (s[t.innerId] = 1, i[t.__level] ? i[t.__level].push(t) : (i[t.__level] = [t], this.levels.push(t.__level)), this._length++);
  }
  forEach(t) {
    let s;
    this.levels.forEach((i) => {
      s = this.levelMap[i];
      for (let r = 0, n = s.length; r < n; r++)
        t(s[r]);
    });
  }
  reset() {
    this.levelMap = {}, this.keys = {}, this.levels = [], this._length = 0;
  }
  destroy() {
    this.levelMap = null;
  }
}
class wn extends Mi {
  constructor() {
    super(...arguments), this.pathTypeList = new tt(), this.imageTypeList = new tt();
  }
  get(t) {
  }
  getImageType(t, s) {
    return this.imageTypeList.push(t), $.hitCanvas(s);
  }
  getPathType(t) {
    return this.pathTypeList.push(t), $.hitCanvas();
  }
  clearImageType() {
    this.__clearLeafList(this.imageTypeList);
  }
  clearPathType() {
    this.__clearLeafList(this.pathTypeList);
  }
  __clearLeafList(t) {
    t.forEach((s) => {
      s.__hitCanvas && (s.__hitCanvas.destroy(), s.__hitCanvas = null);
    }), t.reset();
  }
  clear() {
    this.clearPathType(), this.clearImageType();
  }
}
const J = { default: (e, t) => (Xs(t, e), Xs(e, t), e), assign(e, t) {
  let s;
  Object.keys(t).forEach((i) => {
    var r;
    s = t[i], (s == null ? void 0 : s.constructor) === Object && ((r = e[i]) === null || r === void 0 ? void 0 : r.constructor) === Object ? Xs(e[i], t[i]) : e[i] = t[i];
  });
}, copyAttrs: (e, t, s) => (s.forEach((i) => {
  t[i] !== void 0 && (e[i] = t[i]);
}), e), clone: (e) => JSON.parse(JSON.stringify(e)) }, { assign: Xs } = J;
class Ai {
  constructor(t) {
    this.__leaf = t;
  }
  __get(t) {
    if (this.__input) {
      const s = this.__input[t];
      return s === void 0 ? this[t] : s;
    }
    return this[t];
  }
  __setInput(t, s) {
    this.__input || (this.__input = {}), this.__input[t] = s;
  }
  __getInput(t) {
    if (this.__input) {
      const s = this.__input[t];
      return s === void 0 ? this["_" + t] : s;
    }
    return this["_" + t];
  }
  __removeInput(t) {
    this.__input && this.__input[t] !== void 0 && (this.__input[t] = void 0);
  }
  __getInputData() {
    const t = {}, { __input: s } = this;
    let i, r;
    for (let n in this)
      i = n.substring(1), this[i] !== void 0 && (r = s ? s[i] : void 0, t[i] = r === void 0 ? this[n] : r);
    return t;
  }
  __setMiddle(t, s) {
    this.__middle || (this.__middle = {}), this.__middle[t] = s;
  }
  __getMiddle(t) {
    return this.__middle && this.__middle[t];
  }
  __checkSingle() {
    this.blendMode === "pass-through" ? this.__leaf.__hasEraser || this.isEraser ? this.__single = !0 : this.__single && (this.__single = !1) : this.__single = !0;
  }
  destroy() {
    this.__leaf = null;
  }
}
const Ii = { mineType: (e) => !e || e.startsWith("image") ? e : (e === "jpg" && (e = "jpeg"), "image/" + e), fileType(e) {
  const t = e.split(".");
  return t[t.length - 1];
} };
function d(e, t, s, i) {
  var r, n = arguments.length, o = n < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, s) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    o = Reflect.decorate(e, t, s, i);
  else
    for (var a = e.length - 1; a >= 0; a--)
      (r = e[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(t, s, o) : r(t, s)) || o);
  return n > 3 && o && Object.defineProperty(t, s, o), o;
}
function os(e, t, s, i) {
  return new (s || (s = Promise))(function(r, n) {
    function o(c) {
      try {
        l(i.next(c));
      } catch (u) {
        n(u);
      }
    }
    function a(c) {
      try {
        l(i.throw(c));
      } catch (u) {
        n(u);
      }
    }
    function l(c) {
      var u;
      c.done ? r(c.value) : (u = c.value, u instanceof s ? u : new s(function(h) {
        h(u);
      })).then(o, a);
    }
    l((i = i.apply(e, t || [])).next());
  });
}
function N(e) {
  return (t, s) => {
    e || (e = s), Object.defineProperty(t, s, { get() {
      return this.context[e];
    }, set(r) {
      this.context[e] = r;
    } });
  };
}
const xn = [];
function D() {
  return (e, t) => {
    xn.push(t);
  };
}
const go = [];
let v = class {
  set blendMode(e) {
    e === "normal" && (e = "source-over"), this.context.globalCompositeOperation = e;
  }
  get blendMode() {
    return this.context.globalCompositeOperation;
  }
  set dashPattern(e) {
    this.context.setLineDash(e || go);
  }
  get dashPattern() {
    return this.context.getLineDash();
  }
  __bindContext() {
    let e;
    xn.forEach((t) => {
      e = this.context[t], e && (this[t] = e.bind(this.context));
    }), this.textBaseline = "alphabetic";
  }
  setTransform(e, t, s, i, r, n) {
  }
  resetTransform() {
  }
  getTransform() {
  }
  save() {
  }
  restore() {
  }
  transform(e, t, s, i, r, n) {
  }
  translate(e, t) {
  }
  scale(e, t) {
  }
  rotate(e) {
  }
  fill(e, t) {
  }
  stroke(e) {
  }
  clip(e, t) {
  }
  fillRect(e, t, s, i) {
  }
  strokeRect(e, t, s, i) {
  }
  clearRect(e, t, s, i) {
  }
  drawImage(e, t, s, i, r, n, o, a, l) {
    switch (arguments.length) {
      case 9:
        if (t < 0) {
          const c = -t / i * a;
          i += t, t = 0, n += c, a -= c;
        }
        if (s < 0) {
          const c = -s / r * l;
          r += s, s = 0, o += c, l -= c;
        }
        this.context.drawImage(e, t, s, i, r, n, o, a, l);
        break;
      case 5:
        this.context.drawImage(e, t, s, i, r);
        break;
      case 3:
        this.context.drawImage(e, t, s);
    }
  }
  beginPath() {
  }
  moveTo(e, t) {
  }
  lineTo(e, t) {
  }
  bezierCurveTo(e, t, s, i, r, n) {
  }
  quadraticCurveTo(e, t, s, i) {
  }
  closePath() {
  }
  arc(e, t, s, i, r, n) {
  }
  arcTo(e, t, s, i, r) {
  }
  ellipse(e, t, s, i, r, n, o, a) {
  }
  rect(e, t, s, i) {
  }
  roundRect(e, t, s, i, r) {
  }
  createConicGradient(e, t, s) {
  }
  createLinearGradient(e, t, s, i) {
  }
  createPattern(e, t) {
  }
  createRadialGradient(e, t, s, i, r, n) {
  }
  fillText(e, t, s, i) {
  }
  measureText(e) {
  }
  strokeText(e, t, s, i) {
  }
  destroy() {
    this.context = null;
  }
};
d([N("imageSmoothingEnabled")], v.prototype, "smooth", void 0), d([N("imageSmoothingQuality")], v.prototype, "smoothLevel", void 0), d([N("globalAlpha")], v.prototype, "opacity", void 0), d([N()], v.prototype, "fillStyle", void 0), d([N()], v.prototype, "strokeStyle", void 0), d([N("lineWidth")], v.prototype, "strokeWidth", void 0), d([N("lineCap")], v.prototype, "strokeCap", void 0), d([N("lineJoin")], v.prototype, "strokeJoin", void 0), d([N("lineDashOffset")], v.prototype, "dashOffset", void 0), d([N()], v.prototype, "miterLimit", void 0), d([N()], v.prototype, "shadowBlur", void 0), d([N()], v.prototype, "shadowColor", void 0), d([N()], v.prototype, "shadowOffsetX", void 0), d([N()], v.prototype, "shadowOffsetY", void 0), d([N()], v.prototype, "filter", void 0), d([N()], v.prototype, "font", void 0), d([N()], v.prototype, "fontKerning", void 0), d([N()], v.prototype, "fontStretch", void 0), d([N()], v.prototype, "fontVariantCaps", void 0), d([N()], v.prototype, "textAlign", void 0), d([N()], v.prototype, "textBaseline", void 0), d([N()], v.prototype, "textRendering", void 0), d([N()], v.prototype, "wordSpacing", void 0), d([N()], v.prototype, "letterSpacing", void 0), d([N()], v.prototype, "direction", void 0), d([D()], v.prototype, "setTransform", null), d([D()], v.prototype, "resetTransform", null), d([D()], v.prototype, "getTransform", null), d([D()], v.prototype, "save", null), d([D()], v.prototype, "restore", null), d([D()], v.prototype, "transform", null), d([D()], v.prototype, "translate", null), d([D()], v.prototype, "scale", null), d([D()], v.prototype, "rotate", null), d([D()], v.prototype, "fill", null), d([D()], v.prototype, "stroke", null), d([D()], v.prototype, "clip", null), d([D()], v.prototype, "fillRect", null), d([D()], v.prototype, "strokeRect", null), d([D()], v.prototype, "clearRect", null), d([D()], v.prototype, "beginPath", null), d([D()], v.prototype, "moveTo", null), d([D()], v.prototype, "lineTo", null), d([D()], v.prototype, "bezierCurveTo", null), d([D()], v.prototype, "quadraticCurveTo", null), d([D()], v.prototype, "closePath", null), d([D()], v.prototype, "arc", null), d([D()], v.prototype, "arcTo", null), d([D()], v.prototype, "ellipse", null), d([D()], v.prototype, "rect", null), d([D()], v.prototype, "roundRect", null), d([D()], v.prototype, "createConicGradient", null), d([D()], v.prototype, "createLinearGradient", null), d([D()], v.prototype, "createPattern", null), d([D()], v.prototype, "createRadialGradient", null), d([D()], v.prototype, "fillText", null), d([D()], v.prototype, "measureText", null), d([D()], v.prototype, "strokeText", null);
const j = new et(), fo = { width: 1, height: 1, pixelRatio: 1 }, lr = W.get("LeaferCanvasBase"), Ot = ["width", "height", "pixelRatio"];
class bn extends v {
  get pixelWidth() {
    return this.width * this.pixelRatio;
  }
  get pixelHeight() {
    return this.height * this.pixelRatio;
  }
  get allowBackgroundColor() {
    return this.view && this.parentView && !this.offscreen;
  }
  constructor(t, s) {
    super(), this.worldTransform = {}, t || (t = fo), t.pixelRatio || (t.pixelRatio = R.devicePixelRatio), this.manager = s, this.innerId = Gt.create(Gt.CNAVAS);
    const { width: i, height: r, pixelRatio: n } = t;
    this.autoLayout = !i || !r, this.pixelRatio = n, this.offscreen = R.isWorker || t.offscreen, this.config = t, this.init();
  }
  init() {
  }
  __createContext() {
    this.context = this.view.getContext("2d"), this.__bindContext();
  }
  toBlob(t, s) {
    return new Promise((i) => {
      const r = this.getSaveCanvas(t);
      R.origin.canvasToBolb(r.view, t, s).then((n) => {
        r.recycle(), i(n);
      }).catch((n) => {
        lr.error(n), i(null);
      });
    });
  }
  toDataURL(t, s) {
    const i = this.getSaveCanvas(t), r = R.origin.canvasToDataURL(i.view, t, s);
    return i.recycle(), r;
  }
  saveAs(t, s) {
    return new Promise((i) => {
      const r = this.getSaveCanvas(Ii.fileType(t));
      R.origin.canvasSaveAs(r.view, t, s).then(() => {
        r.recycle(), i(!0);
      }).catch((n) => {
        lr.error(n), i(!1);
      });
    });
  }
  getSaveCanvas(t) {
    const { backgroundColor: s, bounds: i } = this, r = this.getSameCanvas();
    return ["jpg", "jpeg"].includes(t) && r.fillWorld(i, "#FFFFFF"), s && r.fillWorld(i, s), r.copyWorld(this), r;
  }
  resize(t) {
    if (this.isSameSize(t))
      return;
    let s;
    this.context && !this.unreal && this.width && (s = this.getSameCanvas(), s.copyWorld(this)), J.copyAttrs(this, t, Ot), this.bounds = new et(0, 0, this.width, this.height), this.pixelRatio || (this.pixelRatio = 1), this.unreal || (this.updateViewSize(), this.smooth = this.config.smooth), this.updateClientBounds(), this.context && !this.unreal && s && (this.clearWorld(s.bounds), this.copyWorld(s), s.recycle());
  }
  updateViewSize() {
  }
  updateClientBounds() {
  }
  startAutoLayout(t, s) {
  }
  stopAutoLayout() {
  }
  setWorld(t, s, i) {
    const { pixelRatio: r } = this, n = this.worldTransform;
    if (s)
      if (i)
        this.setTransform(n.a = t.a * r, n.b = t.b * r, n.c = t.c * r, n.d = t.d * r, n.e = (t.e + s.e) * r, n.f = (t.f + s.f) * r);
      else {
        const { a: o, b: a, c: l, d: c, e: u, f: h } = s;
        this.setTransform(n.a = (t.a * o + t.b * l) * r, n.b = (t.a * a + t.b * c) * r, n.c = (t.c * o + t.d * l) * r, n.d = (t.c * a + t.d * c) * r, n.e = (t.e * o + t.f * l + u) * r, n.f = (t.e * a + t.f * c + h) * r);
      }
    else
      this.setTransform(n.a = t.a * r, n.b = t.b * r, n.c = t.c * r, n.d = t.d * r, n.e = t.e * r, n.f = t.f * r);
  }
  setStroke(t, s, i) {
    s && (this.strokeWidth = s), t && (this.strokeStyle = t), i && this.setStrokeOptions(i);
  }
  setStrokeOptions(t) {
    this.strokeCap = t.strokeCap, this.strokeJoin = t.strokeJoin, this.dashPattern = t.dashPattern, this.dashOffset = t.dashOffset, this.miterLimit = t.miterLimit;
  }
  saveBlendMode(t) {
    this.savedBlendMode = this.blendMode, this.blendMode = t;
  }
  restoreBlendMode() {
    this.blendMode = this.savedBlendMode;
  }
  hitFill(t, s) {
    return s ? this.context.isPointInPath(t.x, t.y, s) : this.context.isPointInPath(t.x, t.y);
  }
  hitStroke(t, s) {
    return this.strokeWidth = s, this.context.isPointInStroke(t.x, t.y);
  }
  setWorldShadow(t, s, i, r) {
    const { pixelRatio: n } = this;
    this.shadowOffsetX = t * n, this.shadowOffsetY = s * n, this.shadowBlur = i * n, this.shadowColor = r || "black";
  }
  setWorldBlur(t) {
    const { pixelRatio: s } = this;
    this.filter = `blur(${t * s}px)`;
  }
  copyWorld(t, s, i, r) {
    if (r && (this.blendMode = r), s) {
      const { pixelRatio: n } = this;
      i || (i = s), this.drawImage(t.view, s.x * n, s.y * n, s.width * n, s.height * n, i.x * n, i.y * n, i.width * n, i.height * n);
    } else
      this.drawImage(t.view, 0, 0);
    r && (this.blendMode = "source-over");
  }
  copyWorldToInner(t, s, i, r) {
    if (r && (this.blendMode = r), s.b || s.c)
      this.save(), this.resetTransform(), this.copyWorld(t, s, P.tempToOuterOf(i, s)), this.restore();
    else {
      const { pixelRatio: n } = this;
      this.drawImage(t.view, s.x * n, s.y * n, s.width * n, s.height * n, i.x, i.y, i.width, i.height);
    }
    r && (this.blendMode = "source-over");
  }
  useMask(t, s, i) {
    this.copyWorld(t, s, i, "destination-in");
  }
  useEraser(t, s, i) {
    this.copyWorld(t, s, i, "destination-out");
  }
  fillWorld(t, s, i) {
    i && (this.blendMode = i), this.fillStyle = s, j.copy(t).scale(this.pixelRatio), this.fillRect(j.x, j.y, j.width, j.height), i && (this.blendMode = "source-over");
  }
  strokeWorld(t, s, i) {
    i && (this.blendMode = i), this.strokeStyle = s, j.copy(t).scale(this.pixelRatio), this.strokeRect(j.x, j.y, j.width, j.height), i && (this.blendMode = "source-over");
  }
  clearWorld(t, s) {
    j.copy(t).scale(this.pixelRatio), s && j.ceil(), this.clearRect(j.x, j.y, j.width, j.height);
  }
  clipWorld(t, s) {
    this.beginPath(), j.copy(t).scale(this.pixelRatio), s && j.ceil(), this.rect(j.x, j.y, j.width, j.height), this.clip();
  }
  clear() {
    const { pixelRatio: t } = this;
    this.clearRect(0, 0, this.width * t, this.height * t);
  }
  isSameSize(t) {
    return this.width === t.width && this.height === t.height && this.pixelRatio === t.pixelRatio;
  }
  getSameCanvas(t) {
    const { width: s, height: i, pixelRatio: r } = this, n = { width: s, height: i, pixelRatio: r }, o = this.manager ? this.manager.get(n) : $.canvas(n);
    if (o.save(), t) {
      const a = this.worldTransform;
      o.setTransform(a.a, a.b, a.c, a.d, a.e, a.f);
    }
    return o;
  }
  getBiggerCanvas(t, s) {
    let { width: i, height: r, pixelRatio: n } = this;
    t && (i += t), s && (r += s);
    const o = { width: i, height: r, pixelRatio: n }, a = this.manager ? this.manager.get(o) : $.canvas(o);
    return a.save(), a;
  }
  recycle() {
    this.restore(), this.manager ? this.manager.recycle(this) : this.destroy();
  }
  unrealCanvas() {
  }
  destroy() {
    this.manager = null, this.view = null, this.parentView = null, this.context = null, this.config = null;
  }
}
const Tt = { creator: {}, parse(e, t) {
}, convertToCanvasData(e, t) {
} }, Bn = { N: 21, D: 22, X: 23, G: 24, F: 25, O: 26, P: 27, U: 28 }, dt = Object.assign({ M: 1, m: 10, L: 2, l: 20, H: 3, h: 30, V: 4, v: 40, C: 5, c: 50, S: 6, s: 60, Q: 7, q: 70, T: 8, t: 80, A: 9, a: 90, Z: 11, z: 11, R: 12 }, Bn), En = { M: 3, m: 3, L: 3, l: 3, H: 2, h: 2, V: 2, v: 2, C: 7, c: 7, S: 5, s: 5, Q: 5, q: 5, T: 3, t: 3, A: 8, a: 8, Z: 1, z: 1, N: 5, D: 9, X: 6, G: 9, F: 5, O: 7, P: 4, U: 6 }, Wi = { m: 10, l: 20, H: 3, h: 30, V: 4, v: 40, c: 50, S: 6, s: 60, q: 70, T: 8, t: 80, A: 9, a: 90 }, yo = Object.assign(Object.assign({}, Wi), Bn), Ms = dt, Fi = {};
for (let e in Ms)
  Fi[Ms[e]] = e;
const Ni = {};
for (let e in Ms)
  Ni[Ms[e]] = En[e];
const zi = { drawRoundRect(e, t, s, i, r, n) {
  let [o, a, l, c] = Ye.fourNumber(n);
  const u = Math.min(i / 2, r / 2);
  o > u && (o = u), a > u && (a = u), l > u && (l = u), c > u && (c = u), o ? e.moveTo(t + o, s) : e.moveTo(t, s), a ? e.arcTo(t + i, s, t + i, s + r, a) : e.lineTo(t + i, s), l ? e.arcTo(t + i, s + r, t, s + r, l) : e.lineTo(t + i, s + r), c ? e.arcTo(t, s + r, t, s, c) : e.lineTo(t, s + r), o ? e.arcTo(t, s, t + i, s, o) : e.lineTo(t, s);
} }, { sin: Be, cos: Ve, atan2: dr, ceil: mo, abs: Vs, PI: cr } = Math, { setPoint: Gs, addPoint: vs } = Mt, { set: ws } = O, Ks = {}, fe = { rect(e, t, s, i, r) {
  Tt.creator.path = e, Tt.creator.moveTo(t, s).lineTo(t + i, s).lineTo(t + i, s + r).lineTo(t, s + r).lineTo(t, s);
}, roundRect(e, t, s, i, r, n) {
  Tt.creator.path = [], zi.drawRoundRect(Tt.creator, t, s, i, r, n), e.push(...Tt.convertToCanvasData(Tt.creator.path, !0));
}, arcTo(e, t, s, i, r, n, o, a, l, c, u) {
  const h = i - t, p = r - s, _ = n - i, g = o - r;
  let m = dr(p, h), f = dr(g, _), b = f - m;
  if (b < 0 && (b += vt), b === cr || Vs(h + p) < 1e-12 || Vs(_ + g) < 1e-12)
    return e && e.push(dt.L, i, r), l && (Gs(l, t, s), vs(l, i, r)), u && ws(u, t, s), void (c && ws(c, i, r));
  const E = h * g - _ * p < 0, y = E ? -1 : 1, w = a / Ve(b / 2), B = i + w * Ve(m + b / 2 + Oe * y), T = r + w * Be(m + b / 2 + Oe * y);
  return m -= Oe * y, f -= Oe * y, pr(e, B, T, a, a, 0, m / M, f / M, E, l, c, u);
}, arc: (e, t, s, i, r, n, o, a, l, c) => pr(e, t, s, i, i, 0, r, n, o, a, l, c), ellipse(e, t, s, i, r, n, o, a, l, c, u, h) {
  const p = n * M, _ = Be(p), g = Ve(p);
  let m = o * M, f = a * M;
  m > cr && (m -= vt), f < 0 && (f += vt);
  let b = f - m;
  b < 0 ? b += vt : b > vt && (b -= vt), l && (b -= vt);
  const E = mo(Vs(b / Oe)), y = b / E, w = Be(y / 4), B = 8 / 3 * w * w / Be(y / 2);
  f = m + y;
  let T, k, L, I, z, F, Y, Q, Wt = Ve(m), Ft = Be(m), ve = L = g * i * Wt - _ * r * Ft, zs = I = _ * i * Wt + g * r * Ft, Us = t + L, Hs = s + I;
  e && e.push(dt.L, Us, Hs), c && Gs(c, Us, Hs), h && ws(h, Us, Hs);
  for (let Zi = 0; Zi < E; Zi++)
    T = Ve(f), k = Be(f), L = g * i * T - _ * r * k, I = _ * i * T + g * r * k, z = t + ve - B * (g * i * Ft + _ * r * Wt), F = s + zs - B * (_ * i * Ft - g * r * Wt), Y = t + L + B * (g * i * k + _ * r * T), Q = s + I + B * (_ * i * k - g * r * T), e && e.push(dt.C, z, F, Y, Q, t + L, s + I), c && _r(t + ve, s + zs, z, F, Y, Q, t + L, s + I, c, !0), ve = L, zs = I, Wt = T, Ft = k, m = f, f += y;
  u && ws(u, t + L, s + I);
}, quadraticCurveTo(e, t, s, i, r, n, o) {
  e.push(dt.C, (t + 2 * i) / 3, (s + 2 * r) / 3, (n + 2 * i) / 3, (o + 2 * r) / 3, n, o);
}, toTwoPointBoundsByQuadraticCurve(e, t, s, i, r, n, o, a) {
  _r(e, t, (e + 2 * s) / 3, (t + 2 * i) / 3, (r + 2 * s) / 3, (n + 2 * i) / 3, r, n, o, a);
}, toTwoPointBounds(e, t, s, i, r, n, o, a, l, c) {
  const u = [];
  let h, p, _, g, m, f, b, E, y = e, w = s, B = r, T = o;
  for (let k = 0; k < 2; ++k)
    if (k == 1 && (y = t, w = i, B = n, T = a), h = -3 * y + 9 * w - 9 * B + 3 * T, p = 6 * y - 12 * w + 6 * B, _ = 3 * w - 3 * y, Math.abs(h) < 1e-12) {
      if (Math.abs(p) < 1e-12)
        continue;
      g = -_ / p, 0 < g && g < 1 && u.push(g);
    } else
      b = p * p - 4 * _ * h, E = Math.sqrt(b), b < 0 || (m = (-p + E) / (2 * h), 0 < m && m < 1 && u.push(m), f = (-p - E) / (2 * h), 0 < f && f < 1 && u.push(f));
  c ? vs(l, e, t) : Gs(l, e, t), vs(l, o, a);
  for (let k = 0, L = u.length; k < L; k++)
    ur(u[k], e, t, s, i, r, n, o, a, Ks), vs(l, Ks.x, Ks.y);
}, getPointAndSet(e, t, s, i, r, n, o, a, l, c) {
  const u = 1 - e, h = u * u * u, p = 3 * u * u * e, _ = 3 * u * e * e, g = e * e * e;
  c.x = h * t + p * i + _ * n + g * a, c.y = h * s + p * r + _ * o + g * l;
}, getPoint(e, t, s, i, r, n, o, a, l) {
  const c = {};
  return ur(e, t, s, i, r, n, o, a, l, c), c;
} }, { getPointAndSet: ur, toTwoPointBounds: _r, ellipse: pr } = fe, { sin: vo, cos: wo, sqrt: gr, atan2: fr } = Math, { ellipse: xo } = fe, Tn = { ellipticalArc(e, t, s, i, r, n, o, a, l, c, u) {
  const h = (l - t) / 2, p = (c - s) / 2, _ = n * M, g = vo(_), m = wo(_), f = -m * h - g * p, b = -m * p + g * h, E = i * i, y = r * r, w = b * b, B = f * f, T = E * y - E * w - y * B;
  let k = 0;
  if (T < 0) {
    const ve = gr(1 - T / (E * y));
    i *= ve, r *= ve;
  } else
    k = (o === a ? -1 : 1) * gr(T / (E * w + y * B));
  const L = k * i * b / r, I = -k * r * f / i, z = fr((b - I) / r, (f - L) / i), F = fr((-b - I) / r, (-f - L) / i);
  let Y = F - z;
  a === 0 && Y > 0 ? Y -= vt : a === 1 && Y < 0 && (Y += vt);
  const Q = t + h + m * L - g * I, Wt = s + p + g * L + m * I, Ft = Y < 0 ? 1 : 0;
  u ? xo(e, Q, Wt, i, r, n, z / M, F / M, Ft) : i !== r || n ? e.push(dt.G, Q, Wt, i, r, n, z / M, F / M, Ft) : e.push(dt.O, Q, Wt, i, z / M, F / M, Ft);
} }, { M: yr, m: bo, L: xs, l: Bo, H: Eo, h: To, V: ko, v: Co, C: Ge, c: Ro, S: qs, s: Lo, Q: Ke, q: Po, T: Qs, t: Oo, A: So, a: Do, Z: mr, z: Mo, N: Ao, D: Io, X: Wo, G: Fo, F: No, O: zo, P: Uo, U: Ho } = dt, { rect: Yo, roundRect: vr, arcTo: jo, arc: wr, ellipse: xr, quadraticCurveTo: br } = fe, { ellipticalArc: Xo } = Tn, Vo = W.get("PathConvert"), zt = {}, oe = { current: { dot: 0 }, stringify(e) {
  let t, s, i, r = 0, n = e.length, o = "";
  for (; r < n; ) {
    s = e[r], t = Ni[s], o += s === i ? " " : Fi[s];
    for (let a = 1; a < t; a++)
      o += e[r + a], a === t - 1 || (o += " ");
    i = s, r += t;
  }
  return o;
}, parse(e, t) {
  let s, i, r, n = "";
  const o = [], a = t ? yo : Wi;
  for (let l = 0, c = e.length; l < c; l++)
    i = e[l], mn[i] ? (i === "." && (yt.dot++, yt.dot > 1 && (Ee(o, n), n = "")), n += i) : dt[i] ? (n && (Ee(o, n), n = ""), yt.name = dt[i], yt.length = En[i], yt.index = 0, Ee(o, yt.name), !s && a[i] && (s = !0)) : i === "-" || i === "+" ? r === "e" || r === "E" ? n += i : (n && Ee(o, n), n = i) : n && (Ee(o, n), n = ""), r = i;
  return n && Ee(o, n), s ? oe.toCanvasData(o, t) : o;
}, toCanvasData(e, t) {
  let s, i, r, n, o, a = 0, l = 0, c = 0, u = 0, h = 0, p = e.length;
  const _ = [];
  for (; h < p; ) {
    switch (r = e[h], r) {
      case bo:
        e[h + 1] += a, e[h + 2] += l;
      case yr:
        a = e[h + 1], l = e[h + 2], _.push(yr, a, l), h += 3;
        break;
      case To:
        e[h + 1] += a;
      case Eo:
        a = e[h + 1], _.push(xs, a, l), h += 2;
        break;
      case Co:
        e[h + 1] += l;
      case ko:
        l = e[h + 1], _.push(xs, a, l), h += 2;
        break;
      case Bo:
        e[h + 1] += a, e[h + 2] += l;
      case xs:
        a = e[h + 1], l = e[h + 2], _.push(xs, a, l), h += 3;
        break;
      case Lo:
        e[h + 1] += a, e[h + 2] += l, e[h + 3] += a, e[h + 4] += l, r = qs;
      case qs:
        o = n === Ge || n === qs, c = o ? 2 * a - s : e[h + 1], u = o ? 2 * l - i : e[h + 2], s = e[h + 1], i = e[h + 2], a = e[h + 3], l = e[h + 4], _.push(Ge, c, u, s, i, a, l), h += 5;
        break;
      case Ro:
        e[h + 1] += a, e[h + 2] += l, e[h + 3] += a, e[h + 4] += l, e[h + 5] += a, e[h + 6] += l, r = Ge;
      case Ge:
        s = e[h + 3], i = e[h + 4], a = e[h + 5], l = e[h + 6], _.push(Ge, e[h + 1], e[h + 2], s, i, a, l), h += 7;
        break;
      case Oo:
        e[h + 1] += a, e[h + 2] += l, r = Qs;
      case Qs:
        o = n === Ke || n === Qs, s = o ? 2 * a - s : e[h + 1], i = o ? 2 * l - i : e[h + 2], t ? br(_, a, l, s, i, e[h + 1], e[h + 2]) : _.push(Ke, s, i, e[h + 1], e[h + 2]), a = e[h + 1], l = e[h + 2], h += 3;
        break;
      case Po:
        e[h + 1] += a, e[h + 2] += l, e[h + 3] += a, e[h + 4] += l, r = Ke;
      case Ke:
        s = e[h + 1], i = e[h + 2], t ? br(_, a, l, s, i, e[h + 3], e[h + 4]) : _.push(Ke, s, i, e[h + 3], e[h + 4]), a = e[h + 3], l = e[h + 4], h += 5;
        break;
      case Do:
        e[h + 6] += a, e[h + 7] += l;
      case So:
        Xo(_, a, l, e[h + 1], e[h + 2], e[h + 3], e[h + 4], e[h + 5], e[h + 6], e[h + 7], t), a = e[h + 6], l = e[h + 7], h += 8;
        break;
      case Mo:
      case mr:
        _.push(mr), h++;
        break;
      case Ao:
        a = e[h + 1], l = e[h + 2], t ? Yo(_, a, l, e[h + 3], e[h + 4]) : Zt(_, e, h, 5), h += 5;
        break;
      case Io:
        a = e[h + 1], l = e[h + 2], t ? vr(_, a, l, e[h + 3], e[h + 4], [e[h + 5], e[h + 6], e[h + 7], e[h + 8]]) : Zt(_, e, h, 9), h += 9;
        break;
      case Wo:
        a = e[h + 1], l = e[h + 2], t ? vr(_, a, l, e[h + 3], e[h + 4], e[h + 5]) : Zt(_, e, h, 6), h += 6;
        break;
      case Fo:
        xr(t ? _ : Zt(_, e, h, 9), e[h + 1], e[h + 2], e[h + 3], e[h + 4], e[h + 5], e[h + 6], e[h + 7], e[h + 8], null, zt), a = zt.x, l = zt.y, h += 9;
        break;
      case No:
        t ? xr(_, e[h + 1], e[h + 2], e[h + 3], e[h + 4], 0, 0, 360, !1) : Zt(_, e, h, 5), a = e[h + 1] + e[h + 3], l = e[h + 2], h += 5;
        break;
      case zo:
        wr(t ? _ : Zt(_, e, h, 7), e[h + 1], e[h + 2], e[h + 3], e[h + 4], e[h + 5], e[h + 6], null, zt), a = zt.x, l = zt.y, h += 7;
        break;
      case Uo:
        t ? wr(_, e[h + 1], e[h + 2], e[h + 3], 0, 360, !1) : Zt(_, e, h, 4), a = e[h + 1] + e[h + 3], l = e[h + 2], h += 4;
        break;
      case Ho:
        jo(t ? _ : Zt(_, e, h, 6), a, l, e[h + 1], e[h + 2], e[h + 3], e[h + 4], e[h + 5], null, zt), a = zt.x, l = zt.y, h += 6;
        break;
      default:
        return Vo.error(`command: ${r} [index:${h}]`, e), _;
    }
    n = r;
  }
  return _;
}, copyData(e, t, s, i) {
  for (let r = s, n = s + i; r < n; r++)
    e.push(t[r]);
}, pushData(e, t) {
  yt.index === yt.length && (yt.index = 1, e.push(yt.name)), e.push(Number(t)), yt.index++, yt.dot = 0;
} }, { current: yt, pushData: Ee, copyData: Zt } = oe, { M: Zs, L: Go, C: Ko, Q: qo, Z: Qo, N: Br, D: Zo, X: $o, G: Jo, F: ta, O: ea, P: sa, U: ia } = dt, Te = {}, me = { beginPath(e) {
  e.length = 0;
}, moveTo(e, t, s) {
  e.push(Zs, t, s);
}, lineTo(e, t, s) {
  e.push(Go, t, s);
}, bezierCurveTo(e, t, s, i, r, n, o) {
  e.push(Ko, t, s, i, r, n, o);
}, quadraticCurveTo(e, t, s, i, r) {
  e.push(qo, t, s, i, r);
}, closePath(e) {
  e.push(Qo);
}, rect(e, t, s, i, r) {
  e.push(Br, t, s, i, r);
}, roundRect(e, t, s, i, r, n) {
  if (typeof n == "number")
    e.push($o, t, s, i, r, n);
  else {
    const o = Ye.fourNumber(n);
    o ? e.push(Zo, t, s, i, r, ...o) : e.push(Br, t, s, i, r);
  }
}, ellipse(e, t, s, i, r, n, o, a, l) {
  n === void 0 ? e.push(ta, t, s, i, r) : (o === void 0 && (o = 0), a === void 0 && (a = 360), e.push(Jo, t, s, i, r, n, o, a, l ? 1 : 0));
}, arc(e, t, s, i, r, n, o) {
  r === void 0 ? e.push(sa, t, s, i) : (n === void 0 && (n = 360), e.push(ea, t, s, i, r, n, o ? 1 : 0));
}, moveToEllipse(e, t, s, i, r, n, o, a, l) {
  n === void 0 && (n = 0), o === void 0 && (o = 0), a === void 0 && (a = 360), fe.ellipse(null, t, s, i, r, n, o, a, l, null, null, Te), e.push(Zs, Te.x, Te.y), ra(e, t, s, i, r, n, o, a, l);
}, moveToArc(e, t, s, i, r, n, o) {
  r === void 0 && (r = 0), n === void 0 && (n = 360), fe.arc(null, t, s, i, r, n, o, null, null, Te), e.push(Zs, Te.x, Te.y), na(e, t, s, i, r, n, o);
}, arcTo(e, t, s, i, r, n) {
  e.push(ia, t, s, i, r, n);
} }, { ellipse: ra, arc: na } = me, { moveTo: oa, lineTo: aa, quadraticCurveTo: ha, bezierCurveTo: la, closePath: da, beginPath: ca, rect: ua, roundRect: _a, ellipse: pa, arc: ga, arcTo: fa, moveToEllipse: ya, moveToArc: ma } = me;
class Ui {
  constructor(t) {
    this.path = t ? typeof t == "string" ? Tt.parse(t) : t : [];
  }
  beginPath() {
    return ca(this.path), this;
  }
  moveTo(t, s) {
    return oa(this.path, t, s), this;
  }
  lineTo(t, s) {
    return aa(this.path, t, s), this;
  }
  bezierCurveTo(t, s, i, r, n, o) {
    return la(this.path, t, s, i, r, n, o), this;
  }
  quadraticCurveTo(t, s, i, r) {
    return ha(this.path, t, s, i, r), this;
  }
  closePath() {
    return da(this.path), this;
  }
  rect(t, s, i, r) {
    return ua(this.path, t, s, i, r), this;
  }
  roundRect(t, s, i, r, n) {
    return _a(this.path, t, s, i, r, n), this;
  }
  ellipse(t, s, i, r, n, o, a, l) {
    return pa(this.path, t, s, i, r, n, o, a, l), this;
  }
  arc(t, s, i, r, n, o) {
    return ga(this.path, t, s, i, r, n, o), this;
  }
  arcTo(t, s, i, r, n) {
    return fa(this.path, t, s, i, r, n), this;
  }
  moveToEllipse(t, s, i, r, n, o, a, l) {
    return ya(this.path, t, s, i, r, n, o, a, l), this;
  }
  moveToArc(t, s, i, r, n, o) {
    return ma(this.path, t, s, i, r, n, o), this;
  }
}
const { M: va, L: wa, C: xa, Q: ba, Z: Ba, N: Ea, D: Ta, X: ka, G: Ca, F: Ra, O: La, P: Pa, U: Oa } = dt, Sa = W.get("PathDrawer"), kn = { drawPathByData(e, t) {
  if (!t)
    return;
  let s, i = 0, r = t.length;
  for (; i < r; )
    switch (s = t[i], s) {
      case va:
        e.moveTo(t[i + 1], t[i + 2]), i += 3;
        break;
      case wa:
        e.lineTo(t[i + 1], t[i + 2]), i += 3;
        break;
      case xa:
        e.bezierCurveTo(t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5], t[i + 6]), i += 7;
        break;
      case ba:
        e.quadraticCurveTo(t[i + 1], t[i + 2], t[i + 3], t[i + 4]), i += 5;
        break;
      case Ba:
        e.closePath(), i += 1;
        break;
      case Ea:
        e.rect(t[i + 1], t[i + 2], t[i + 3], t[i + 4]), i += 5;
        break;
      case Ta:
        e.roundRect(t[i + 1], t[i + 2], t[i + 3], t[i + 4], [t[i + 5], t[i + 6], t[i + 7], t[i + 8]]), i += 9;
        break;
      case ka:
        e.roundRect(t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5]), i += 6;
        break;
      case Ca:
        e.ellipse(t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5] * M, t[i + 6] * M, t[i + 7] * M, t[i + 8]), i += 9;
        break;
      case Ra:
        e.ellipse(t[i + 1], t[i + 2], t[i + 3], t[i + 4], 0, 0, vt, !1), i += 5;
        break;
      case La:
        e.arc(t[i + 1], t[i + 2], t[i + 3], t[i + 4] * M, t[i + 5] * M, t[i + 6]), i += 7;
        break;
      case Pa:
        e.arc(t[i + 1], t[i + 2], t[i + 3], 0, vt, !1), i += 4;
        break;
      case Oa:
        e.arcTo(t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5]), i += 6;
        break;
      default:
        return void Sa.error(`command: ${s} [index:${i}]`, t);
    }
} }, { M: Da, L: Ma, C: Er, Q: Tr, Z: kr, N: Aa, D: Cr, X: Ia, G: Wa, F: Fa, O: Na, P: za, U: Ua } = dt, { toTwoPointBounds: Ha, toTwoPointBoundsByQuadraticCurve: Ya, arcTo: ja, arc: Xa, ellipse: Va } = fe, { add: qe, copy: $s, addPoint: Ga, setPoint: Js, addBounds: bs, toBounds: Ka } = Mt, qa = W.get("PathBounds");
let ke, Bs, ti;
const ct = {}, Rr = {}, Ut = {}, Hi = { toBounds(e, t) {
  Hi.toTwoPointBounds(e, Rr), Ka(Rr, t);
}, toTwoPointBounds(e, t) {
  if (!e || !e.length)
    return Js(t, 0, 0);
  let s, i, r, n, o, a = 0, l = 0, c = 0;
  const u = e.length;
  for (; a < u; )
    switch (s = e[a], a === 0 && (s === kr || s === Er || s === Tr ? Js(t, l, c) : Js(t, e[a + 1], e[a + 2])), s) {
      case Da:
      case Ma:
        l = e[a + 1], c = e[a + 2], Ga(t, l, c), a += 3;
        break;
      case Er:
        n = e[a + 5], o = e[a + 6], Ha(l, c, e[a + 1], e[a + 2], e[a + 3], e[a + 4], n, o, ct), qe(t, ct), l = n, c = o, a += 7;
        break;
      case Tr:
        i = e[a + 1], r = e[a + 2], n = e[a + 3], o = e[a + 4], Ya(l, c, i, r, n, o, ct), qe(t, ct), l = n, c = o, a += 5;
        break;
      case kr:
        a += 1;
        break;
      case Aa:
        l = e[a + 1], c = e[a + 2], bs(t, l, c, e[a + 3], e[a + 4]), a += 5;
        break;
      case Cr:
      case Ia:
        l = e[a + 1], c = e[a + 2], bs(t, l, c, e[a + 3], e[a + 4]), a += s === Cr ? 9 : 6;
        break;
      case Wa:
        Va(null, e[a + 1], e[a + 2], e[a + 3], e[a + 4], e[a + 5], e[a + 6], e[a + 7], e[a + 8], ct, Ut), a === 0 ? $s(t, ct) : qe(t, ct), l = Ut.x, c = Ut.y, a += 9;
        break;
      case Fa:
        l = e[a + 1], c = e[a + 2], Bs = e[a + 3], ti = e[a + 4], bs(t, l - Bs, c - ti, 2 * Bs, 2 * ti), l += Bs, a += 5;
        break;
      case Na:
        Xa(null, e[a + 1], e[a + 2], e[a + 3], e[a + 4], e[a + 5], e[a + 6], ct, Ut), a === 0 ? $s(t, ct) : qe(t, ct), l = Ut.x, c = Ut.y, a += 7;
        break;
      case za:
        l = e[a + 1], c = e[a + 2], ke = e[a + 3], bs(t, l - ke, c - ke, 2 * ke, 2 * ke), l += ke, a += 4;
        break;
      case Ua:
        ja(null, l, c, e[a + 1], e[a + 2], e[a + 3], e[a + 4], e[a + 5], ct, Ut), a === 0 ? $s(t, ct) : qe(t, ct), l = Ut.x, c = Ut.y, a += 6;
        break;
      default:
        return void qa.error(`command: ${s} [index:${a}]`, e);
    }
} }, Cn = { smooth: (e, t, s) => e };
Tt.creator = new Ui(), Tt.parse = oe.parse, Tt.convertToCanvasData = oe.toCanvasData;
const { drawRoundRect: Qa } = zi;
function vi(e) {
  (function(t) {
    t && !t.roundRect && (t.roundRect = function(s, i, r, n, o) {
      Qa(this, s, i, r, n, o);
    });
  })(e);
}
function cs(e, t, s) {
  Object.defineProperty(e, t, s);
}
function Yi(e, t) {
  return Object.getOwnPropertyDescriptor(e, t);
}
function Za(e) {
  return (t, s) => {
    cs(t, s, { get() {
      return this.__getAttr(e);
    }, set(i) {
      this.__setAttr(e, i);
    } });
  };
}
function st(e, t, s, i) {
  cs(e, t, Object.assign({ get() {
    return this.__getAttr(t);
  }, set(n) {
    this.__setAttr(t, n);
  }, configurable: !0, enumerable: !0 }, i || {})), Xi(e, t, s);
}
function Se(e) {
  return (t, s) => {
    st(t, s, e);
  };
}
function wi(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.__layout.positionChanged || this.__layout.positionChange();
    } });
  };
}
function xi(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.__layout.scaleChanged || this.__layout.scaleChange();
    } });
  };
}
function Os(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.__layout.rotationChanged || this.__layout.rotationChange();
    } });
  };
}
function H(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.__layout.boxChanged || this.__layout.boxChange();
    } });
  };
}
const kt = H;
function us(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.__layout.strokeChanged || this.__layout.strokeChange();
    } });
  };
}
const Pt = us;
function ji(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.__layout.renderChanged || this.__layout.renderChange();
    } });
  };
}
function bi(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.__layout.surfaceChanged || this.__layout.surfaceChange();
    } });
  };
}
function Bi(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.__layout.opacityChanged || this.__layout.opacityChange();
    } });
  };
}
function Rn(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.__layout.surfaceChanged || this.__layout.surfaceChange(), this.waitParent(() => {
        this.parent.__layout.childrenSortChanged = !0;
      });
    } });
  };
}
function Ln(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.__layout.boxChanged || this.__layout.boxChange(), this.waitParent(() => {
        this.parent.__updateMask(i);
      });
    } });
  };
}
function Pn(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.waitParent(() => {
        this.parent.__updateEraser(i);
      });
    } });
  };
}
function Fe(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), W.showHitView && (this.__layout.surfaceChanged || this.__layout.surfaceChange());
    } });
  };
}
function it(e) {
  return (t, s) => {
    cs(t, "__DataProcessor", { get: () => e });
  };
}
function $a(e) {
  return (t, s) => {
    cs(t, "__LayoutProcessor", { get: () => e });
  };
}
function Ja(e, t, s) {
  Xi(e.prototype, t, s);
}
function Xi(e, t, s) {
  const i = e.__DataProcessor.prototype, r = "_" + t, n = function(l) {
    return "set" + l.charAt(0).toUpperCase() + l.slice(1);
  }(t), o = { get() {
    const l = this[r];
    return l === void 0 ? s : l;
  }, set(l) {
    this[r] = l;
  }, configurable: !0, enumerable: !0 };
  s === void 0 ? o.get = function() {
    return this[r];
  } : t === "width" ? o.get = function() {
    const l = this[r];
    return l === void 0 ? this.__naturalWidth || s : l;
  } : t === "height" && (o.get = function() {
    const l = this[r];
    return l === void 0 ? this.__naturalHeight || s : l;
  });
  const a = Yi(i, t);
  a && a.set && (o.set = a.set), i[n] && (o.set = i[n], delete i[n]), Object.defineProperty(i, t, o);
}
const th = new W("rewrite"), Ss = [], eh = ["destroy", "constructor"];
function Et(e) {
  return (t, s) => {
    Ss.push({ name: t.constructor.name + "." + s, run: () => {
      t[s] = e;
    } });
  };
}
function Vi() {
  return (e) => {
    On();
  };
}
function On(e) {
  Ss.length && (Ss.forEach((t) => {
    e && th.error(t.name, "需在Class上装饰@rewriteAble()"), t.run();
  }), Ss.length = 0);
}
function ot(e, t) {
  return (s) => {
    var i;
    (e.prototype ? (i = e.prototype, Object.getOwnPropertyNames(i)) : Object.keys(e)).forEach((r) => {
      eh.includes(r) || t && t.includes(r) || (e.prototype ? Yi(e.prototype, r).writable && (s.prototype[r] = e.prototype[r]) : s.prototype[r] = e[r]);
    });
  };
}
function rt() {
  return (e) => {
    Fs.register(e);
  };
}
function Kt() {
  return (e) => {
    ds.register(e);
  };
}
setTimeout(() => On(!0));
const { toOuterOf: ei } = P;
class sh {
  constructor(t) {
    this.leaf = t, this.renderBounds = this.strokeBounds = this.boxBounds = { x: 0, y: 0, width: 0, height: 0 }, this.localRenderBounds = this.localStrokeBounds = t.__local, this.boxChange(), this.positionChange();
  }
  checkUpdate(t) {
    const { leafer: s } = this.leaf;
    if (s)
      s.ready ? (R.realtimeLayout || t) && s.watcher.changed && s.layouter.layout() : s.start();
    else {
      let i = this.leaf;
      for (; i.parent; )
        i = i.parent;
      R.layout(i);
    }
  }
  getTransform(t) {
    return this.checkUpdate(), t === "world" ? this.leaf.__world : this.leaf.__local;
  }
  decomposeTransform(t) {
    return this.checkUpdate(), S.decompose(t === "world" ? this.leaf.__world : this.leaf.__local);
  }
  getBounds(t, s) {
    if (this.checkUpdate(), s === "world")
      switch (t) {
        case "render":
          return this.leaf.__world;
        case "content":
          if (this.contentBounds)
            return this.getWorldContentBounds();
        case "margin":
        case "box":
          return this.getWorldBoxBounds();
        case "margin":
        case "stroke":
          return this.getWorldStrokeBounds();
      }
    else if (s === "inner")
      switch (t) {
        case "render":
          return this.renderBounds;
        case "content":
          if (this.contentBounds)
            return this.contentBounds;
        case "margin":
        case "box":
          return this.boxBounds;
        case "stroke":
          return this.strokeBounds;
      }
    else
      switch (t) {
        case "render":
          return this.localRenderBounds;
        case "margin":
        case "content":
        case "box":
          return this.leaf.__local;
        case "stroke":
          return this.localStrokeBounds;
      }
  }
  getWorldContentBounds() {
    return this._worldContentBounds || (this._worldContentBounds = {}), ei(this.contentBounds, this.leaf.__world, this._worldContentBounds), this._worldContentBounds;
  }
  getWorldBoxBounds() {
    return this._worldBoxBounds || (this._worldBoxBounds = {}), ei(this.boxBounds, this.leaf.__world, this._worldBoxBounds), this._worldBoxBounds;
  }
  getWorldStrokeBounds() {
    return this._worldStrokeBounds || (this._worldStrokeBounds = {}), ei(this.strokeBounds, this.leaf.__world, this._worldStrokeBounds), this._worldStrokeBounds;
  }
  spreadStrokeCancel() {
    const t = this.renderBounds === this.strokeBounds;
    this.strokeBounds = this.boxBounds, this.localStrokeBounds = this.leaf.__local, t && this.spreadRenderCancel();
  }
  spreadRenderCancel() {
    this.renderBounds = this.strokeBounds, this.localRenderBounds = this.localStrokeBounds;
  }
  spreadStroke() {
    const { x: t, y: s, width: i, height: r } = this.strokeBounds;
    this.strokeBounds = { x: t, y: s, width: i, height: r }, this.localStrokeBounds = { x: t, y: s, width: i, height: r }, this.renderSpread || this.spreadRenderCancel();
  }
  spreadRender() {
    const { x: t, y: s, width: i, height: r } = this.renderBounds;
    this.renderBounds = { x: t, y: s, width: i, height: r }, this.localRenderBounds = { x: t, y: s, width: i, height: r };
  }
  boxChange() {
    this.boxChanged = !0, this.localBoxChanged || this.localBoxChange(), this.hitCanvasChanged = !0;
  }
  localBoxChange() {
    this.localBoxChanged = !0, this.boundsChanged = !0;
  }
  strokeChange() {
    this.strokeChanged = !0, this.strokeSpread || (this.strokeSpread = 1), this.boundsChanged = !0, this.hitCanvasChanged = !0;
  }
  renderChange() {
    this.renderChanged = !0, this.renderSpread || (this.renderSpread = 1), this.boundsChanged = !0;
  }
  positionChange() {
    this.positionChanged = !0, this.matrixChanged = !0, this.localBoxChanged || this.localBoxChange();
  }
  scaleChange() {
    this.scaleChanged = !0, this._scaleOrRotationChange();
  }
  rotationChange() {
    this.rotationChanged = !0, this.affectRotation = !0, this._scaleOrRotationChange();
  }
  _scaleOrRotationChange() {
    this.affectScaleOrRotation = !0, this.matrixChanged = !0, this.localBoxChanged || this.localBoxChange();
  }
  surfaceChange() {
    this.surfaceChanged = !0;
  }
  opacityChange() {
    this.opacityChanged = !0, this.surfaceChanged || this.surfaceChange();
  }
  destroy() {
    this.leaf = null;
  }
}
const Lr = {}, Sn = { on(e, t, s) {
  let i, r, n;
  s && (typeof s == "boolean" ? i = s : (i = s.capture, r = s.once));
  const o = si(this, i, !0), a = typeof e == "string" ? e.split(" ") : e, l = r ? { listener: t, once: r } : { listener: t };
  a.forEach((c) => {
    c && (n = o[c], n ? n.findIndex((u) => u.listener === t) === -1 && n.push(l) : o[c] = [l]);
  });
}, off(e, t, s) {
  let i, r, n;
  s && (i = typeof s == "boolean" ? s : s.capture);
  const o = si(this, i);
  (typeof e == "string" ? e.split(" ") : e).forEach((a) => {
    a && (r = o[a], r && (n = r.findIndex((l) => l.listener === t), n > -1 && r.splice(n, 1), r.length || delete o[a]));
  });
}, on_(e, t, s, i) {
  return s && (t = t.bind(s)), this.on(e, t, i), { type: e, listener: t, options: i };
}, off_(e) {
  if (!e)
    return;
  const t = e instanceof Array ? e : [e];
  t.forEach((s) => {
    this.off(s.type, s.listener, s.options);
  }), t.length = 0;
}, once(e, t, s) {
  this.on(e, t, { once: !0, capture: s });
}, emit(e, t, s) {
  const i = si(this, s)[e];
  if (i) {
    let r;
    for (let n = 0, o = i.length; n < o && (r = i[n], r.listener(t), r.once && (this.off(e, r.listener, s), n--, o--), !t || !t.isStopNow); n++)
      ;
  }
}, emitEvent(e, t) {
  e.current = this, this.emit(e.type, e, t);
}, hasEvent(e, t) {
  const { __bubbleMap: s, __captureMap: i } = this;
  return t === void 0 ? !!(i && i[e] || s && s[e]) : !!(t ? i && i[e] : s && s[e]);
} };
function si(e, t, s) {
  if (t) {
    const { __captureMap: i } = e;
    return i || (s ? e.__captureMap = {} : Lr);
  }
  {
    const { __bubbleMap: i } = e;
    return i || (s ? e.__bubbleMap = {} : Lr);
  }
}
class xt {
  constructor(t, s) {
    this.bubbles = !1, this.type = t, s && (this.target = s);
  }
  stopDefault() {
    this.isStopDefault = !0;
  }
  stopNow() {
    this.isStopNow = !0, this.isStop = !0;
  }
  stop() {
    this.isStop = !0;
  }
}
class At extends xt {
  constructor(t, s, i) {
    super(t, s), this.parent = i, this.child = s;
  }
}
At.ADD = "child.add", At.REMOVE = "child.remove";
class ze extends xt {
  constructor(t, s, i, r, n) {
    super(t, s), this.attrName = i, this.oldValue = r, this.newValue = n;
  }
}
ze.CHANGE = "property.change";
class St extends xt {
  constructor(t, s, i, r, n, o) {
    super(t, s), this.image = i, this.attrName = r, this.attrValue = n, o && (this.error = o);
  }
}
St.LOADED = "image.loaded", St.ERROR = "image.error";
class ae extends xt {
  get bigger() {
    if (!this.old)
      return !0;
    const { width: t, height: s } = this.old;
    return this.width >= t && this.height >= s;
  }
  get smaller() {
    return !this.bigger;
  }
  get samePixelRatio() {
    return !this.old || this.pixelRatio === this.old.pixelRatio;
  }
  constructor(t, s) {
    typeof t == "object" ? (super(ae.RESIZE), Object.assign(this, t)) : super(t), this.old = s;
  }
}
ae.RESIZE = "resize";
class de extends xt {
  constructor(t, s) {
    super(t), s && Object.assign(this, s);
  }
}
de.START = "transform.start", de.CHANGE = "transform.change", de.END = "transform.end", de.BEFORE_START = "transform.before_start", de.BEFORE_CHANGE = "transform.before_change", de.BEFORE_END = "transform.before_end";
class ie extends xt {
  constructor(t, s) {
    super(t), this.data = s;
  }
}
ie.REQUEST = "watch.request", ie.DATA = "watch.data";
class A extends xt {
  constructor(t, s, i) {
    super(t), s && (this.data = s, this.times = i);
  }
}
A.CHECK_UPDATE = "layout.check_update", A.REQUEST = "layout.request", A.START = "layout.start", A.BEFORE = "layout.before", A.LAYOUT = "layout.layout", A.AFTER = "layout.after", A.AGAIN = "layout.again", A.END = "layout.end";
class Gi extends xt {
}
Gi.FRAME = "animate.frame";
class G extends xt {
  constructor(t, s, i, r) {
    super(t), s && (this.times = s), i && (this.renderBounds = i, this.renderOptions = r);
  }
}
G.REQUEST = "render.request", G.START = "render.start", G.BEFORE = "render.before", G.RENDER = "render", G.AFTER = "render.after", G.AGAIN = "render.again", G.END = "render.end";
class q extends xt {
}
q.START = "leafer.start", q.BEFORE_READY = "leafer.before_ready", q.READY = "leafer.ready", q.AFTER_READY = "leafer.after_ready", q.VIEW_READY = "leafer.view_ready", q.STOP = "leafer.stop", q.RESTART = "leafer.restart", q.END = "leafer.end";
const Dn = { __setAttr(e, t) {
  if (this.leafer && this.leafer.ready) {
    this.__[e] = t;
    const { CHANGE: s } = ze, i = new ze(s, this, e, this.__.__get(e), t);
    this.hasEvent(s) && !this.isLeafer && this.emitEvent(i), this.leafer.emitEvent(i);
  } else
    this.__[e] = t;
}, __getAttr(e) {
  return this.__.__get(e);
} }, { defaultMatrix: ih } = S, { sin: Pr, cos: Or } = Math, Mn = { __updateWorldMatrix() {
  const e = this.parent ? this.parent.__world : ih, t = this.__local, s = this.__world;
  this.__layout.matrixChanged && this.__updateLocalMatrix(), this.__layout.affectScaleOrRotation ? (s.a = t.a * e.a + t.b * e.c, s.b = t.a * e.b + t.b * e.d, s.c = t.c * e.a + t.d * e.c, s.d = t.c * e.b + t.d * e.d, s.e = t.e * e.a + t.f * e.c + e.e, s.f = t.e * e.b + t.f * e.d + e.f) : (s.a = e.a, s.b = e.b, s.c = e.c, s.d = e.d, s.e = t.e * e.a + t.f * e.c + e.e, s.f = t.e * e.b + t.f * e.d + e.f);
}, __updateLocalMatrix() {
  const e = this.__local, t = this.__layout;
  if (t.affectScaleOrRotation) {
    const { scaleX: s, scaleY: i } = this.__;
    if (t.affectRotation) {
      if (t.scaleChanged || t.rotationChanged) {
        let { rotation: r, skewX: n, skewY: o } = this.__;
        r || n || o ? (r *= M, n && (n *= M), o && (o *= M), e.a = s * Or(r + o), e.b = s * Pr(r + o), e.c = i * -Pr(r - n), e.d = i * Or(r - n)) : (e.a = s, e.b = 0, e.c = 0, e.d = i, t.affectRotation = !1), t.scaleChanged = !1, t.rotationChanged = !1;
      }
    } else
      t.scaleChanged && (e.a = s, e.d = i, t.scaleChanged = !1);
  }
  t.positionChanged && (e.e = this.__.x, e.f = this.__.y, t.positionChanged = !1), this.__layout.matrixChanged = !1;
} }, { toOuterOf: Qe, copyAndSpread: Sr } = P, An = { __updateWorldBounds() {
  var e;
  if (this.__layout.boundsChanged) {
    let t;
    const s = this.__layout;
    s.boxChanged && (this.__updatePath(), this.__updateRenderPath(), this.__updateBoxBounds(), s.boxChanged = !1, t = !0), s.localBoxChanged && (this.__updateLocalBoxBounds(), s.localBoxChanged = !1, s.strokeSpread && (s.strokeChanged = !0), s.renderSpread && (s.renderChanged = !0), (e = this.parent) === null || e === void 0 || e.__layout.boxChange()), s.strokeChanged && (s.strokeSpread = this.__updateStrokeSpread(), s.strokeSpread ? (s.strokeBounds === s.boxBounds && s.spreadStroke(), this.__updateStrokeBounds(), this.__updateLocalStrokeBounds()) : s.spreadStrokeCancel(), s.strokeChanged = !1, s.renderSpread && (s.renderChanged = !0), this.parent && this.parent.__layout.strokeChange(), t || (t = !0)), s.renderChanged && (s.renderSpread = this.__updateRenderSpread(), s.renderSpread ? (s.renderBounds !== s.boxBounds && s.renderBounds !== s.strokeBounds || s.spreadRender(), this.__updateRenderBounds(), this.__updateLocalRenderBounds()) : s.spreadRenderCancel(), s.renderChanged = !1, this.parent && this.parent.__layout.renderChange()), s.boundsChanged = !1, Qe(this.__layout.renderBounds, this.__world, this.__world), t && this.__onUpdateSize();
  } else
    Qe(this.__layout.renderBounds, this.__world, this.__world);
}, __updateLocalBoxBounds() {
  Qe(this.__layout.boxBounds, this.__local, this.__local);
}, __updateLocalStrokeBounds() {
  Qe(this.__layout.strokeBounds, this.__local, this.__layout.localStrokeBounds);
}, __updateLocalRenderBounds() {
  Qe(this.__layout.renderBounds, this.__local, this.__layout.localRenderBounds);
}, __updateBoxBounds() {
  const e = this.__layout.boxBounds;
  e.x = 0, e.y = 0, e.width = this.__.width, e.height = this.__.height;
}, __updateStrokeBounds() {
  Sr(this.__layout.strokeBounds, this.__layout.boxBounds, this.__layout.strokeSpread);
}, __updateRenderBounds() {
  Sr(this.__layout.renderBounds, this.__layout.strokeBounds, this.__layout.renderSpread);
} }, { toInnerRadiusPointOf: rh } = O, Dr = {}, In = { __hitWorld(e) {
  return this.__layout.hitCanvasChanged && (this.__updateHitCanvas(), this.__layout.hitCanvasChanged = !1), rh(e, this.__world, Dr), this.__hit(Dr);
}, __drawHitPath(e) {
  this.__drawRenderPath(e);
} }, Wn = { __render(e, t) {
  if (this.__worldOpacity)
    if (e.setWorld(this.__world, t.matrix), e.opacity = this.__worldOpacity, this.__.__single) {
      const s = e.getSameCanvas(!0);
      this.__draw(s, t);
      const i = this.__.isEraser ? "destination-out" : this.__.blendMode;
      t.matrix ? (e.resetTransform(), e.copyWorld(s, null, null, i)) : e.copyWorldToInner(s, this.__world, this.__layout.renderBounds, i), s.recycle();
    } else
      this.__draw(e, t);
}, __updateWorldOpacity() {
  this.__worldOpacity = this.__.visible ? this.parent ? this.parent.__worldOpacity * this.__.opacity : this.__.opacity : 0, this.__layout.opacityChanged && (this.__layout.opacityChanged = !1);
} }, Fn = { __updateEraser(e) {
  this.__hasEraser = !!e || this.children.some((t) => t.__.isEraser);
}, __updateMask(e) {
  this.__hasMask = !!e || this.children.some((t) => t.__.isMask);
}, __renderMask(e, t, s) {
  t.resetTransform(), t.useMask(s), e.resetTransform(), e.opacity = this.__worldOpacity, e.copyWorld(t);
}, __removeMask(e) {
  if (e)
    e.isMask = !1, this.remove(e);
  else {
    const { children: t } = this;
    for (let s = 0, i = t.length; s < i; s++)
      (e = t[s]).isMask && (this.__removeMask(e), i--, s--);
  }
} }, Nn = { __updateChange() {
  const { __layout: e } = this;
  e.childrenSortChanged && (this.__updateSortChildren(), e.childrenSortChanged = !1), this.__.__checkSingle();
}, __render(e, t) {
  if (this.__worldOpacity)
    if (this.__.__single) {
      e.resetTransform();
      const s = e.getSameCanvas();
      this.__renderBranch(s, t), e.opacity = this.__worldOpacity;
      const i = this.__.isEraser ? "destination-out" : this.__.blendMode;
      t.matrix ? e.copyWorld(s, null, null, i) : e.copyWorld(s, this.__world, this.__world, i), s.recycle();
    } else
      this.__renderBranch(e, t);
}, __renderBranch(e, t) {
  let s;
  const { children: i } = this;
  if (this.__hasMask && i.length > 1) {
    let r, n = e.getSameCanvas(), o = e.getSameCanvas();
    for (let a = 0, l = i.length; a < l; a++)
      s = i[a], s.isMask ? (r ? (this.__renderMask(e, o, n), n.clear(), o.clear()) : r = !0, s.__render(n, t)) : s.__render(o, t);
    this.__renderMask(e, o, n), n.recycle(), o.recycle();
  } else {
    const { bounds: r, hideBounds: n } = t;
    for (let o = 0, a = i.length; o < a; o++)
      s = i[o], r && !r.hit(s.__world, t.matrix) || n && n.includes(s.__world, t.matrix) || s.__render(e, t);
  }
} }, Ct = { updateAllWorldMatrix(e) {
  if (e.__updateWorldMatrix(), e.isBranch) {
    const { children: t } = e;
    for (let s = 0, i = t.length; s < i; s++)
      nh(t[s]);
  }
}, updateAllWorldOpacity(e) {
  if (e.__updateWorldOpacity(), e.isBranch) {
    const { children: t } = e;
    for (let s = 0, i = t.length; s < i; s++)
      Mr(t[s]);
  }
}, updateAllChange(e) {
  if (Mr(e), e.__updateChange(), e.isBranch) {
    const { children: t } = e;
    for (let s = 0, i = t.length; s < i; s++)
      oh(t[s]);
  }
}, worldHittable(e) {
  if (!e.__.hittable)
    return !1;
  let { parent: t } = e;
  for (; t; ) {
    if (!t.__.hittable || !t.__.hitChildren)
      return !1;
    t = t.parent;
  }
  return !0;
}, moveWorld(e, t, s) {
  const i = { x: t, y: s };
  e.parent && S.toInnerPoint(e.parent.__world, i, i, !0), zn.moveLocal(e, i.x, i.y);
}, moveLocal(e, t, s = 0) {
  e.x = e.__.x + t, e.y = e.__.y + s;
}, zoomOfWorld(e, t, s, i, r) {
  const n = e.parent ? O.tempToInnerOf(t, e.parent.__world) : t;
  this.zoomOfLocal(e, n, s, i, r);
}, zoomOfLocal(e, t, s, i, r) {
  i || (i = s), r || (r = e);
  const { x: n, y: o } = r.__, a = new ne().translate(n, o).scaleOfOuter(t, s, i);
  r.x = a.e, r.y = a.f, e.scaleX = e.__.scaleX * s, e.scaleY = e.__.scaleY * i;
}, rotateOfWorld(e, t, s, i) {
  const r = e.parent ? O.tempToInnerOf(t, e.parent.__world) : t;
  this.rotateOfLocal(e, r, s, i);
}, rotateOfLocal(e, t, s, i) {
  i || (i = e);
  const { x: r, y: n } = i.__, o = new ne().translate(r, n).rotateOfOuter(t, s);
  i.x = o.e, i.y = o.f, e.rotation = e.__.rotation + s;
}, drop(e, t) {
  const s = { x: e.x, y: e.y };
  e.localToWorld(s), t.worldToInner(s), e.set(s), t.add(e);
} }, zn = Ct, { updateAllWorldMatrix: nh, updateAllWorldOpacity: Mr, updateAllChange: oh } = zn, Ki = { worldBounds: (e) => e.__world, localBoxBounds: (e) => e.__.isEraser ? null : e.__local, localEventBounds: (e) => e.__.isEraser ? null : e.__layout.localStrokeBounds, localRenderBounds: (e) => e.__.isEraser ? null : e.__layout.localRenderBounds, maskLocalBoxBounds: (e) => e.__.isMask ? e.__local : null, maskLocalEventBounds: (e) => e.__.isMask ? e.__layout.localStrokeBounds : null, maskLocalRenderBounds: (e) => e.__.isMask ? e.__layout.localRenderBounds : null }, _s = { sort: (e, t) => e.__.zIndex === t.__.zIndex ? e.__tempNumber - t.__tempNumber : e.__.zIndex - t.__.zIndex, pushAllChildBranch(e, t) {
  if (e.__tempNumber = 1, e.__.__childBranchNumber) {
    const { children: s } = e;
    for (let i = 0, r = s.length; i < r; i++)
      (e = s[i]).isBranch && (e.__tempNumber = 1, t.push(e), ah(e, t));
  }
}, pushAllParent(e, t) {
  const { keys: s } = t;
  if (s)
    for (; e.parent && s[e.parent.innerId] === void 0; )
      t.push(e.parent), e = e.parent;
  else
    for (; e.parent; )
      t.push(e.parent), e = e.parent;
}, pushAllBranchStack(e, t) {
  let s = t.length;
  const { children: i } = e;
  for (let r = 0, n = i.length; r < n; r++)
    i[r].isBranch && t.push(i[r]);
  for (let r = s, n = t.length; r < n; r++)
    hh(t[r], t);
}, updateWorldBoundsByBranchStack(e) {
  let t;
  for (let s = e.length - 1; s > -1; s--) {
    t = e[s];
    for (let i = 0, r = t.children.length; i < r; i++)
      t.children[i].__updateWorldBounds();
  }
  t.__updateWorldBounds();
} }, { pushAllChildBranch: ah, pushAllBranchStack: hh } = _s, qi = { run(e) {
  for (let t = 0, s = e.length; t < s; t++)
    e[t]();
  e.length = 0;
} }, { LEAF: lh, create: dh } = Gt;
let as = class {
  get tag() {
    return this.__tag;
  }
  set tag(e) {
  }
  get __tag() {
    return "Leaf";
  }
  get innerName() {
    return this.__.name || this.tag + this.innerId;
  }
  get __DataProcessor() {
    return Ai;
  }
  get __LayoutProcessor() {
    return sh;
  }
  get worldTransform() {
    return this.__layout.getTransform("world");
  }
  get localTransform() {
    return this.__layout.getTransform("local");
  }
  get worldBoxBounds() {
    return this.getBounds("box");
  }
  get worldStrokeBounds() {
    return this.getBounds("stroke");
  }
  get worldRenderBounds() {
    return this.getBounds("render");
  }
  get worldOpacity() {
    return this.__layout.checkUpdate(), this.__worldOpacity;
  }
  get __onlyHitMask() {
    return this.__hasMask && !this.__.hitChildren;
  }
  get __ignoreHitWorld() {
    return (this.__hasMask || this.__hasEraser) && this.__.hitChildren;
  }
  constructor(e) {
    this.innerId = dh(lh), this.__local = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0, x: 0, y: 0, width: 0, height: 0 }, this.__world = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0, x: 0, y: 0, width: 0, height: 0 }, this.__worldOpacity = 1, this.__ = new this.__DataProcessor(this), this.__layout = new this.__LayoutProcessor(this), e && Object.assign(this, e);
  }
  waitParent(e) {
    this.parent ? e() : this.__parentWait ? this.__parentWait.push(e) : this.__parentWait = [e];
  }
  waitLeafer(e) {
    this.leafer ? e() : this.__leaferWait ? this.__leaferWait.push(e) : this.__leaferWait = [e];
  }
  __bindLeafer(e) {
    if (this.isLeafer && (e = this), this.leafer = e, this.__level = this.parent ? this.parent.__level + 1 : 1, this.__leaferWait && e && qi.run(this.__leaferWait), this.isBranch) {
      const { children: t } = this;
      for (let s = 0, i = t.length; s < i; s++)
        t[s].__bindLeafer(e);
    }
  }
  set(e) {
  }
  get(e) {
  }
  __setAttr(e, t) {
  }
  __getAttr(e) {
  }
  forceUpdate(e) {
    e || (e = "x");
    const t = this.__.__getInput(e);
    this[e] = t;
  }
  __updateWorldMatrix() {
  }
  __updateLocalMatrix() {
  }
  __updateWorldBounds() {
  }
  __updateLocalBoxBounds() {
  }
  __updateLocalStrokeBounds() {
  }
  __updateLocalRenderBounds() {
  }
  __updateBoxBounds() {
  }
  __updateStrokeBounds() {
  }
  __updateRenderBounds() {
  }
  __updateStrokeSpread() {
    return 0;
  }
  __updateRenderSpread() {
    return 0;
  }
  __onUpdateSize() {
  }
  __updateEraser(e) {
  }
  __updateMask(e) {
  }
  __renderMask(e, t, s) {
  }
  __removeMask(e) {
  }
  getWorld(e) {
    return this.__layout.decomposeTransform("world")[e];
  }
  getBounds(e, t = "world") {
    return this.__layout.getBounds(e, t);
  }
  worldToLocal(e, t, s) {
    this.parent ? S.toInnerPoint(this.parent.worldTransform, e, t, s) : t && O.copy(t, e);
  }
  localToWorld(e, t, s) {
    this.parent ? S.toOuterPoint(this.parent.worldTransform, e, t, s) : t && O.copy(t, e);
  }
  worldToInner(e, t, s) {
    S.toInnerPoint(this.worldTransform, e, t, s);
  }
  innerToWorld(e, t, s) {
    S.toOuterPoint(this.worldTransform, e, t, s);
  }
  move(e, t) {
    Ct.moveLocal(this, e, t);
  }
  scaleOf(e, t, s) {
    this.__layout.checkUpdate(), s === void 0 && (s = t), Ct.zoomOfLocal(this, O.tempToOuterOf(e, this.__local), t, s);
  }
  rotateOf(e, t) {
    this.__layout.checkUpdate(), Ct.rotateOfLocal(this, O.tempToOuterOf(e, this.__local), t);
  }
  __hitWorld(e) {
    return !0;
  }
  __hit(e) {
    return !0;
  }
  __drawHitPath(e) {
  }
  __updateHitCanvas() {
  }
  __render(e, t) {
  }
  __drawFast(e, t) {
  }
  __draw(e, t) {
  }
  __renderShape(e, t) {
  }
  __updateWorldOpacity() {
  }
  __updateChange() {
  }
  __drawPath(e) {
  }
  __drawRenderPath(e) {
  }
  __updatePath() {
  }
  __updateRenderPath() {
  }
  __updateSortChildren() {
  }
  add(e, t) {
  }
  remove(e) {
    this.parent && this.parent.remove(this);
  }
  on(e, t, s) {
  }
  off(e, t, s) {
  }
  on_(e, t, s, i) {
  }
  off_(e) {
  }
  once(e, t, s) {
  }
  emit(e, t, s) {
  }
  emitEvent(e, t) {
  }
  hasEvent(e, t) {
    return !1;
  }
  destroy() {
    this.__ && (this.__hitCanvas && (this.__hitCanvas.destroy(), this.__hitCanvas = null), this.leafer = null, this.parent = null, this.__.destroy(), this.__layout.destroy(), this.__ = null, this.__layout = null, this.__captureMap = null, this.__bubbleMap = null, this.children && (this.children.forEach((e) => {
      e.destroy();
    }), this.children.length = 0));
  }
};
as = d([ot(Dn), ot(Mn), ot(An), ot(In), ot(Sn), ot(Wn)], as);
const { setByListWithHandle: ii } = P, { sort: ch } = _s, { localBoxBounds: uh, localEventBounds: _h, localRenderBounds: ph, maskLocalBoxBounds: gh, maskLocalEventBounds: fh, maskLocalRenderBounds: yh } = Ki;
let As = class extends as {
  constructor() {
    super(), this.isBranch = !0, this.children = [];
  }
  __updateStrokeSpread() {
    const { children: e } = this;
    for (let t = 0, s = e.length; t < s; t++)
      if (e[t].__layout.strokeSpread)
        return 1;
    return 0;
  }
  __updateRenderSpread() {
    const { children: e } = this;
    for (let t = 0, s = e.length; t < s; t++)
      if (e[t].__layout.renderSpread)
        return 1;
    return 0;
  }
  __updateBoxBounds() {
    ii(this.__layout.boxBounds, this.children, this.__hasMask ? gh : uh);
  }
  __updateStrokeBounds() {
    ii(this.__layout.strokeBounds, this.children, this.__hasMask ? fh : _h);
  }
  __updateRenderBounds() {
    ii(this.__layout.renderBounds, this.children, this.__hasMask ? yh : ph);
  }
  __updateSortChildren() {
    const { children: e } = this;
    if (e.length > 1) {
      for (let t = 0, s = e.length; t < s; t++)
        e[t].__tempNumber = t;
      e.sort(ch);
    }
  }
  add(e, t) {
    e.parent && e.parent.remove(e), e.parent = this, t === void 0 ? this.children.push(e) : this.children.splice(t, 0, e), e.isBranch && (this.__.__childBranchNumber = (this.__.__childBranchNumber || 0) + 1), e.__layout.boundsChanged || e.__layout.positionChange(), e.__parentWait && qi.run(e.__parentWait), this.leafer && (e.__bindLeafer(this.leafer), this.leafer.ready && this.__emitChildEvent(At.ADD, e));
  }
  remove(e) {
    if (e) {
      const t = this.children.indexOf(e);
      t > -1 && (this.children.splice(t, 1), e.isBranch && (this.__.__childBranchNumber = (this.__.__childBranchNumber || 1) - 1), this.__preRemove(), this.__realRemoveChild(e));
    } else
      e === void 0 && super.remove();
  }
  removeAll() {
    const { children: e } = this;
    this.children = [], this.__preRemove(), this.__.__childBranchNumber = 0, e.forEach((t) => {
      this.__realRemoveChild(t);
    });
  }
  __preRemove() {
    this.__hasMask && this.__updateMask(), this.__hasEraser && this.__updateEraser(), this.__layout.boxChange();
  }
  __realRemoveChild(e) {
    e.parent = null, this.leafer && (e.__bindLeafer(null), this.leafer.ready && this.__emitChildEvent(At.REMOVE, e));
  }
  __emitChildEvent(e, t) {
    const s = new At(e, t, this);
    t.hasEvent(e) && t.emitEvent(s), this.hasEvent(e) && !this.isLeafer && this.emitEvent(s), this.leafer.emitEvent(s);
  }
};
As = d([ot(Nn), ot(Fn)], As);
const Es = {};
class ye {
  static isHoldSpaceKey() {
    return ye.hasDownCode("Space");
  }
  static setDownCode(t) {
    Es[t] || (Es[t] = !0);
  }
  static setUpCode(t) {
    Es[t] = !1;
  }
  static hasDownCode(t) {
    return Es[t];
  }
}
class Xt {
  static left(t) {
    return t.buttons === 1;
  }
  static right(t) {
    return t.buttons === 2;
  }
  static middle(t) {
    return t.buttons === 4;
  }
}
const Ts = {};
class ps extends xt {
  get spaceKey() {
    return ye.isHoldSpaceKey();
  }
  get left() {
    return Xt.left(this);
  }
  get right() {
    return Xt.right(this);
  }
  get middle() {
    return Xt.middle(this);
  }
  constructor(t) {
    super(t.type), this.bubbles = !0, Object.assign(this, t);
  }
  getInner(t) {
    return t || (t = this.current), t.worldToInner(this, Ts), Object.assign({}, Ts);
  }
  getLocal(t) {
    return t || (t = this.current), t.worldToLocal(this, Ts), Object.assign({}, Ts);
  }
  static changeName(t, s) {
    ds.changeName(t, s);
  }
}
let C = class extends ps {
};
C.POINTER = "pointer", C.BEFORE_DOWN = "pointer.before_down", C.BEFORE_MOVE = "pointer.before_move", C.BEFORE_UP = "pointer.before_up", C.DOWN = "pointer.down", C.MOVE = "pointer.move", C.UP = "pointer.up", C.OVER = "pointer.over", C.OUT = "pointer.out", C.ENTER = "pointer.enter", C.LEAVE = "pointer.leave", C.TAP = "tap", C.DOUBLE_TAP = "double_tap", C.CLICK = "click", C.DOUBLE_CLICK = "double_click", C.LONG_PRESS = "long_press", C.LONG_TAP = "long_tap", C = d([Kt()], C);
const Ce = {}, ks = {};
let V = class extends C {
  getInnerMove(e) {
    return e || (e = this.current), Ce.x = this.moveX, Ce.y = this.moveY, e.worldToInner(Ce, ks, !0), Object.assign({}, ks);
  }
  getLocalMove(e) {
    return e || (e = this.current), Ce.x = this.moveX, Ce.y = this.moveY, e.worldToLocal(Ce, ks, !0), Object.assign({}, ks);
  }
};
var Ei;
V.DRAG = "drag", V.START = "drag.start", V.END = "drag.end", V.OVER = "drag.over", V.OUT = "drag.out", V.ENTER = "drag.enter", V.LEAVE = "drag.leave", V = d([Kt()], V);
let Vt = Ei = class extends C {
  static setList(e) {
    Ei.dragList = e instanceof tt ? e : new tt(e);
  }
  static setData(e) {
    this.dragData = e;
  }
};
Vt.DROP = "drop", Vt = Ei = d([Kt()], Vt);
let pt = class extends V {
};
pt.MOVE = "move", pt.START = "move.start", pt.END = "move.end", pt = d([Kt()], pt);
let jt = class extends ps {
};
jt.ROTATE = "rotate", jt.START = "rotate.start", jt.END = "rotate.end", jt = d([Kt()], jt);
let wt = class extends V {
};
wt.SWIPE = "swipe", wt.LEFT = "swipe.left", wt.RIGHT = "swipe.right", wt.UP = "swipe.up", wt.DOWN = "swipe.down", wt = d([Kt()], wt);
let Dt = class extends ps {
};
Dt.ZOOM = "zoom", Dt.START = "zoom.start", Dt.END = "zoom.end", Dt = d([Kt()], Dt);
let De = class extends ps {
};
De.DOWN = "key.down", De.PRESS = "key.press", De.UP = "key.up", De = d([Kt()], De);
class Ti {
  constructor(t) {
    this.options = t;
  }
  load(t, s) {
    return os(this, void 0, void 0, function* () {
      return R.origin.loadImage(this.options.url).then((i) => {
        this.ready = !0, this.width = i.naturalWidth || i.width, this.height = i.naturalHeight || i.height, this.view = i, t && t(this);
      }).catch((i) => {
        this.error = i, s && s(i);
      });
    });
  }
  getCanvas(t, s, i, r) {
    t || (t = this.width), s || (s = this.height);
    const n = R.origin.createCanvas(t, s), o = n.getContext("2d");
    return i && (o.globalAlpha = i), o.drawImage(this.view, 0, 0, t, s), n;
  }
  destroy() {
    this.view = null, this.options = null;
  }
}
class Ds {
  constructor(t) {
    this.taskTime = 1, this.id = Gt.create(Gt.TASK), this.task = t;
  }
  run() {
    return os(this, void 0, void 0, function* () {
      this.task && !this.isComplete && this.parent.running && (yield this.task());
    });
  }
  complete() {
    this.isComplete = !0, this.parent = null, this.task = null;
  }
}
const mh = W.get("TaskProcessor");
class Qi {
  get isComplete() {
    return this._isComplete;
  }
  get running() {
    return this._running;
  }
  get percent() {
    const { total: t } = this;
    let s = 0, i = 0;
    for (let r = 0; r < t; r++)
      r <= this.finishedIndex ? (i += this.list[r].taskTime, r === this.finishedIndex && (s = i)) : s += this.list[r].taskTime;
    return this._isComplete ? 1 : i / s;
  }
  get total() {
    return this.list.length;
  }
  get finishedIndex() {
    return this._isComplete ? 0 : this.index + this.parallelSuccessNumber;
  }
  get remain() {
    return this._isComplete ? this.total : this.total - this.finishedIndex;
  }
  constructor(t) {
    this.config = { parallel: 6 }, this.list = [], this.index = 0, t && J.assign(this.config, t), this.init();
  }
  init() {
    this.empty(), this._running = !1, this._isComplete = !0;
  }
  empty() {
    this.index = 0, this.parallelSuccessNumber = 0, this.list = [], this.parallelList = [];
  }
  start() {
    this._running = !0, this._isComplete = !1, this.run();
  }
  pause() {
    clearTimeout(this._timer), this._running = !1;
  }
  resume() {
    this._running = !0, this._isComplete = !1, this.run();
  }
  skip() {
    this.index++, this.resume();
  }
  stop() {
    clearTimeout(this._timer), this._running = !1, this._isComplete = !0, this.list.forEach((t) => {
      t.complete();
    }), this.empty();
  }
  add(t, s) {
    this.push(new Ds(t), s);
  }
  addParallel(t, s) {
    const i = new Ds(t);
    i.parallel = !0, this.push(i, s);
  }
  addEmpty(t) {
    this.push(new Ds(t));
  }
  push(t, s) {
    s && (t.taskTime = s), t.parent = this, this.list.push(t);
  }
  run() {
    this._running && (this.setParallelList(), this.parallelList.length > 1 ? this.runParallelTask() : this.remain ? this.runTask() : this.onComplete());
  }
  runTask() {
    const t = this.list[this.index];
    t.run().then(() => {
      this.onTask(t), this.index++, this.nextTask();
    }).catch((s) => {
      this.onError(s);
    });
  }
  runParallelTask() {
    this.parallelList.forEach((t) => {
      t.run().then(() => {
        this.onTask(t), this.fillParallelTask();
      }).catch((s) => {
        this.onParallelError(s);
      });
    });
  }
  setParallelList() {
    let t;
    this.parallelList = [], this.parallelSuccessNumber = 0;
    let s = this.index + this.config.parallel;
    s > this.list.length && (s = this.list.length);
    for (let i = this.index; i < s && (t = this.list[i], t.parallel); i++)
      this.parallelList.push(t);
  }
  fillParallelTask() {
    let t;
    const s = this.parallelList;
    this.parallelSuccessNumber++, s.pop();
    const i = s.length, r = this.finishedIndex + i;
    if (s.length) {
      if (!this._running)
        return;
      r < this.total && (t = this.list[r], t.parallel && (s.push(t), t.run().then(() => {
        this.onTask(t), this.fillParallelTask();
      }).catch((n) => {
        this.onParallelError(n);
      })));
    } else
      this.index += this.parallelSuccessNumber, this.parallelSuccessNumber = 0, this.nextTask();
  }
  nextTask() {
    this.total === this.finishedIndex ? this.onComplete() : this._timer = setTimeout(() => this.run(), 0);
  }
  onComplete() {
    this.stop(), this.config.onComplete && this.config.onComplete();
  }
  onTask(t) {
    t.complete(), this.config.onTask && this.config.onTask();
  }
  onParallelError(t) {
    mh.error("ParallelError"), this.parallelList.forEach((s) => {
      s.parallel = !1;
    }), this.parallelList.length = 0, this.parallelSuccessNumber = 0, this.onError(t);
  }
  onError(t) {
    this.pause(), this.config.onError && this.config.onError(t);
  }
  destroy() {
    this.empty(), this.config = {};
  }
}
class Un {
  constructor(t, s) {
    this.map = {}, this.leafer = t, this.tasker = new Qi();
  }
  get(t) {
    let s = this.map[t.url];
    return s || (s = $.image(t), this.map[t.url] = s), s;
  }
  load(t, s, i) {
    this.tasker.addParallel(() => os(this, void 0, void 0, function* () {
      return yield t.load(s, i);
    })), this.tasker.running || this.tasker.start();
  }
  destroy() {
    this.leafer = null, this.map = null;
  }
}
const ri = W.get("plugin"), Ue = { power: {}, list: [], onLeafer(e) {
  Ue.list.forEach((t) => {
    t.onLeafer && t.onLeafer(e);
  });
} };
function vh(e, t) {
  const { power: s } = Ue;
  Ue.list.push(e);
  const i = {};
  e.import ? e.import.forEach((r) => {
    s[r] ? i[r] = s[r] : ri.error(r + " non-existent");
  }) : ri.warn("no import");
  try {
    e.run(i, t);
  } catch (r) {
    ri.error(r);
  }
}
class Hn {
  get updatedList() {
    if (this.hasRemoved) {
      const t = new tt();
      return this.__updatedList.list.forEach((s) => {
        s.leafer && t.push(s);
      }), t;
    }
    return this.__updatedList;
  }
  constructor(t, s) {
    this.totalTimes = 0, this.config = {}, this.__updatedList = new tt(), this.target = t, s && (this.config = J.default(s, this.config)), this.__listenEvents();
  }
  start() {
    this.disabled || (this.running = !0);
  }
  stop() {
    this.running = !1;
  }
  disable() {
    this.stop(), this.__removeListenEvents(), this.disabled = !0;
  }
  update() {
    this.changed = !0, this.running && this.target.emit(G.REQUEST);
  }
  __onAttrChange(t) {
    this.__updatedList.push(t.target), this.update();
  }
  __onChildEvent(t) {
    t.type === At.ADD ? this.__pushChild(t.child) : (this.hasRemoved || (this.hasRemoved = !0), this.__updatedList.push(t.parent)), this.update();
  }
  __pushChild(t) {
    this.__updatedList.push(t), t.isBranch && this.__loopChildren(t);
  }
  __loopChildren(t) {
    const { children: s } = t;
    for (let i = 0, r = s.length; i < r; i++)
      this.__pushChild(s[i]);
  }
  __onRquestData() {
    this.target.emitEvent(new ie(ie.DATA, { updatedList: this.updatedList })), this.__updatedList = new tt(), this.totalTimes++, this.changed = !1, this.hasRemoved = !1;
  }
  __listenEvents() {
    const { target: t } = this;
    this.__eventIds = [t.on_(ze.CHANGE, this.__onAttrChange, this), t.on_([At.ADD, At.REMOVE], this.__onChildEvent, this), t.on_(ie.REQUEST, this.__onRquestData, this)];
  }
  __removeListenEvents() {
    this.target.off_(this.__eventIds);
  }
  destroy() {
    this.target && (this.stop(), this.__removeListenEvents(), this.target = null, this.__updatedList = null);
  }
}
const { updateAllWorldMatrix: wh, updateAllWorldOpacity: xh } = Ct, { pushAllChildBranch: bh, pushAllParent: Ar } = _s, { worldBounds: Ir } = Ki, { setByListWithHandle: Wr } = P;
class Bh {
  constructor(t) {
    this.updatedBounds = new et(), this.beforeBounds = new et(), this.afterBounds = new et(), t instanceof Array && (t = new tt(t)), this.updatedList = t;
  }
  setBefore() {
    Wr(this.beforeBounds, this.updatedList.list, Ir);
  }
  setAfter() {
    Wr(this.afterBounds, this.updatedList.list, Ir), this.updatedBounds.setByList([this.beforeBounds, this.afterBounds]);
  }
  merge(t) {
    this.updatedList.pushList(t.updatedList.list), this.beforeBounds.add(t.beforeBounds), this.afterBounds.add(t.afterBounds), this.updatedBounds.add(t.updatedBounds);
  }
  destroy() {
    this.updatedList = null;
  }
}
const { updateAllWorldMatrix: Eh, updateAllChange: Th } = Ct, { pushAllBranchStack: kh, updateWorldBoundsByBranchStack: Ch } = _s, ni = W.get("Layouter");
class hs {
  constructor(t, s) {
    this.totalTimes = 0, this.config = {}, this.__levelList = new vn(), this.target = t, s && (this.config = J.default(s, this.config)), this.__listenEvents();
  }
  start() {
    this.disabled || (this.running = !0);
  }
  stop() {
    this.running = !1;
  }
  disable() {
    this.stop(), this.__removeListenEvents(), this.disabled = !0;
  }
  layout() {
    if (!this.running)
      return;
    const { target: t } = this;
    this.times = 0;
    try {
      t.emit(A.START), this.layoutOnce(), t.emitEvent(new A(A.END, this.layoutedBlocks, this.times));
    } catch (s) {
      ni.error(s);
    }
    this.layoutedBlocks = null;
  }
  layoutAgain() {
    this.layouting ? this.waitAgain = !0 : this.layoutOnce();
  }
  layoutOnce() {
    return this.layouting ? ni.warn("layouting") : this.times > 3 ? ni.warn("layout max times") : (this.times++, this.totalTimes++, this.layouting = !0, this.target.emit(ie.REQUEST), this.totalTimes > 1 ? this.partLayout() : this.fullLayout(), this.layouting = !1, void (this.waitAgain && (this.waitAgain = !1, this.layoutOnce())));
  }
  partLayout() {
    var t;
    if (!(!((t = this.__updatedList) === null || t === void 0) && t.length))
      return;
    const s = at.start("PartLayout"), { target: i, __updatedList: r } = this, { BEFORE: n, LAYOUT: o, AFTER: a } = A, l = this.getBlocks(r);
    l.forEach((c) => {
      c.setBefore();
    }), i.emitEvent(new A(n, l, this.times)), r.sort(), function(c, u) {
      let h;
      c.list.forEach((p) => {
        h = p.__layout, u.without(p) && !h.useZoomProxy && (h.matrixChanged ? (wh(p), u.push(p), p.isBranch && bh(p, u), Ar(p, u)) : h.boundsChanged && (u.push(p), p.isBranch && (p.__tempNumber = 0), Ar(p, u)));
      });
    }(r, this.__levelList), function(c) {
      let u, h;
      c.sort(!0), c.levels.forEach((p) => {
        u = c.levelMap[p];
        for (let _ = 0, g = u.length; _ < g; _++) {
          if (h = u[_], h.isBranch && h.__tempNumber)
            for (let m = 0, f = h.children.length; m < f; m++)
              h.children[m].isBranch || h.children[m].__updateWorldBounds();
          h.__updateWorldBounds();
        }
      });
    }(this.__levelList), function(c) {
      c.list.forEach((u) => {
        u.__layout.opacityChanged && xh(u), u.__updateChange();
      });
    }(r), l.forEach((c) => c.setAfter()), i.emitEvent(new A(o, l, this.times)), i.emitEvent(new A(a, l, this.times)), this.addBlocks(l), this.__levelList.reset(), this.__updatedList = null, at.end(s);
  }
  fullLayout() {
    const t = at.start("FullLayout"), { target: s } = this, { BEFORE: i, LAYOUT: r, AFTER: n } = A, o = this.getBlocks(new tt(s));
    s.emitEvent(new A(i, o, this.times)), hs.fullLayout(s), o.forEach((a) => {
      a.setAfter();
    }), s.emitEvent(new A(r, o, this.times)), s.emitEvent(new A(n, o, this.times)), this.addBlocks(o), at.end(t);
  }
  static fullLayout(t) {
    if (Eh(t), t.isBranch) {
      const s = [t];
      kh(t, s), Ch(s);
    } else
      t.__updateWorldBounds();
    Th(t);
  }
  createBlock(t) {
    return new Bh(t);
  }
  getBlocks(t) {
    return [this.createBlock(t)];
  }
  addBlocks(t) {
    this.layoutedBlocks ? this.layoutedBlocks.push(...t) : this.layoutedBlocks = t;
  }
  __onReceiveWatchData(t) {
    this.__updatedList = t.data.updatedList;
  }
  __listenEvents() {
    const { target: t } = this;
    this.__eventIds = [t.on_(A.REQUEST, this.layout, this), t.on_(A.AGAIN, this.layoutAgain, this), t.on_(ie.DATA, this.__onReceiveWatchData, this)];
  }
  __removeListenEvents() {
    this.target.off_(this.__eventIds);
  }
  destroy() {
    this.target && (this.stop(), this.__removeListenEvents(), this.target = null, this.config = null);
  }
}
const he = W.get("Renderer");
class Yn {
  get needFill() {
    return !(this.canvas.allowBackgroundColor || !this.config.fill);
  }
  constructor(t, s, i) {
    this.FPS = 60, this.totalTimes = 0, this.times = 0, this.config = { usePartRender: !0, maxFPS: 60 }, this.target = t, this.canvas = s, i && (this.config = J.default(i, this.config)), this.__listenEvents(), this.__requestRender();
  }
  start() {
    this.running = !0;
  }
  stop() {
    this.running = !1;
  }
  update() {
    this.changed = !0;
  }
  requestLayout() {
    this.target.emit(A.REQUEST);
  }
  render(t) {
    if (!this.running || !this.canvas.view)
      return void (this.changed = !0);
    const { target: s } = this;
    this.times = 0, this.totalBounds = new et(), he.log(s.innerName, "--->");
    try {
      this.emitRender(G.START), this.renderOnce(t), this.emitRender(G.END, this.totalBounds);
    } catch (i) {
      he.error(i);
    }
    he.log("-------------|");
  }
  renderAgain() {
    this.rendering ? this.waitAgain = !0 : this.renderOnce();
  }
  renderOnce(t) {
    return this.rendering ? he.warn("rendering") : this.times > 3 ? he.warn("render max times") : (this.times++, this.totalTimes++, this.rendering = !0, this.changed = !1, this.renderBounds = new et(), this.renderOptions = {}, t ? (this.emitRender(G.BEFORE), t()) : (this.requestLayout(), this.emitRender(G.BEFORE), this.config.usePartRender && this.totalTimes > 1 ? this.partRender() : this.fullRender()), this.emitRender(G.RENDER, this.renderBounds, this.renderOptions), this.emitRender(G.AFTER, this.renderBounds, this.renderOptions), this.updateBlocks = null, this.rendering = !1, void (this.waitAgain && (this.waitAgain = !1, this.renderOnce())));
  }
  partRender() {
    const { canvas: t, updateBlocks: s } = this;
    if (!s)
      return he.warn("PartRender: need update attr");
    s.some((i) => i.includes(this.target.__world)) && this.mergeBlocks(), s.forEach((i) => {
      t.bounds.hit(i) && !i.isEmpty() && this.clipRender(i);
    });
  }
  clipRender(t) {
    const s = at.start("PartRender"), { canvas: i } = this, r = t.getIntersect(i.bounds), n = t.includes(this.target.__world), o = new et().copy(r);
    i.save(), n && !W.showRepaint ? i.clear() : (r.spread(1 + 1 / this.canvas.pixelRatio).ceil(), i.clearWorld(r, !0), i.clipWorld(r, !0)), this.__render(r, o), i.restore(), at.end(s);
  }
  fullRender() {
    const t = at.start("FullRender"), { canvas: s } = this;
    s.save(), s.clear(), this.__render(s.bounds), s.restore(), at.end(t);
  }
  __render(t, s) {
    const i = t != null && t.includes(this.target.__world) ? {} : { bounds: t };
    this.needFill && this.canvas.fillWorld(t, this.config.fill), W.showRepaint && this.canvas.strokeWorld(t, "red"), this.target.__render(this.canvas, i), this.renderBounds = s || t, this.renderOptions = i, this.totalBounds.isEmpty() ? this.totalBounds = this.renderBounds : this.totalBounds.add(this.renderBounds), W.showHitView && this.renderHitView(i), W.showBoundsView && this.renderBoundsView(i);
  }
  renderHitView(t) {
  }
  renderBoundsView(t) {
  }
  addBlock(t) {
    this.updateBlocks || (this.updateBlocks = []), this.updateBlocks.push(t);
  }
  mergeBlocks() {
    const { updateBlocks: t } = this;
    if (t) {
      const s = new et();
      s.setByList(t), t.length = 0, t.push(s);
    }
  }
  __requestRender() {
    const t = Date.now();
    R.requestRender(() => {
      this.FPS = Math.min(60, Math.ceil(1e3 / (Date.now() - t))), this.changed && this.running && this.canvas.view && this.render(), this.running && this.target.emit(Gi.FRAME), this.target && this.__requestRender();
    });
  }
  __onResize(t) {
    if (!this.canvas.unreal && (t.bigger || !t.samePixelRatio)) {
      const { width: s, height: i } = t.old;
      new et(0, 0, s, i).includes(this.target.__world) && !this.needFill && t.samePixelRatio || (this.addBlock(this.canvas.bounds), this.target.forceUpdate("blendMode"));
    }
  }
  __onLayoutEnd(t) {
    t.data && t.data.map((s) => {
      let i;
      s.updatedList && s.updatedList.list.some((r) => (i = !r.__world.width || !r.__world.height, i && (he.warn(r.innerName, ": none bounds"), i = !r.isBranch || r.isBranchLeaf), i)), this.addBlock(i ? this.canvas.bounds : s.updatedBounds);
    });
  }
  emitRender(t, s, i) {
    this.target.emitEvent(new G(t, this.times, s, i));
  }
  __listenEvents() {
    const { target: t } = this;
    this.__eventIds = [t.on_(G.REQUEST, this.update, this), t.on_(A.END, this.__onLayoutEnd, this), t.on_(G.AGAIN, this.renderAgain, this), t.on_(ae.RESIZE, this.__onResize, this)];
  }
  __removeListenEvents() {
    this.target.off_(this.__eventIds);
  }
  destroy() {
    this.target && (this.stop(), this.__removeListenEvents(), this.target = null, this.canvas = null, this.config = null);
  }
}
const { hitRadiusPoint: Rh } = P;
class Lh {
  constructor(t, s) {
    this.target = t, this.selector = s;
  }
  getByPoint(t, s, i) {
    s || (s = 0), i || (i = {});
    const r = i.through || !1, n = i.ignoreHittable || !1;
    this.exclude = i.exclude || null, this.point = { x: t.x, y: t.y, radiusX: s, radiusY: s }, this.findList = [], this.eachFind(this.target.children, this.target.__onlyHitMask);
    const o = this.findList, a = this.getBestMatchLeaf(), l = n ? this.getPath(a) : this.getHitablePath(a);
    return this.clear(), r ? { path: l, leaf: a, throughPath: o.length ? this.getThroughPath(o) : l } : { path: l, leaf: a };
  }
  getBestMatchLeaf() {
    const { findList: t } = this;
    if (t.length > 1) {
      let s;
      this.findList = [];
      const { x: i, y: r } = this.point, n = { x: i, y: r, radiusX: 0, radiusY: 0 };
      for (let o = 0, a = t.length; o < a; o++)
        if (s = t[o], Ct.worldHittable(s) && (this.hitChild(s, n), this.findList.length))
          return this.findList[0];
    }
    return t[0];
  }
  getPath(t) {
    const s = new tt();
    for (; t; )
      s.push(t), t = t.parent;
    return s.push(this.target), s;
  }
  getHitablePath(t) {
    const s = this.getPath(t);
    let i, r = new tt();
    for (let n = s.list.length - 1; n > -1 && (i = s.list[n], i.__.hittable) && (r.unshift(i), i.__.hitChildren); n--)
      ;
    return r;
  }
  getThroughPath(t) {
    const s = new tt(), i = [];
    for (let a = t.length - 1; a > -1; a--)
      i.push(this.getPath(t[a]));
    let r, n, o;
    for (let a = 0, l = i.length; a < l; a++) {
      r = i[a], n = i[a + 1];
      for (let c = 0, u = r.length; c < u && (o = r.list[c], !n || !n.has(o)); c++)
        s.push(o);
    }
    return s;
  }
  eachFind(t, s) {
    let i, r;
    const { point: n } = this;
    for (let o = t.length - 1; o > -1; o--)
      i = t[o], s && !i.isMask || (r = Rh(i.__world, n), i.isBranch ? (r || i.__ignoreHitWorld) && (this.eachFind(i.children, i.__onlyHitMask), i.isBranchLeaf && !this.findList.length && this.hitChild(i, n)) : r && this.hitChild(i, n));
  }
  hitChild(t, s) {
    this.exclude && this.exclude.has(t) || t.__hitWorld(s) && this.findList.push(t);
  }
  clear() {
    this.point = null, this.findList = null, this.exclude = null;
  }
  destroy() {
    this.target = null, this.selector = null;
  }
}
class jn {
  constructor(t, s) {
    this.config = {}, this.innerIdList = {}, this.idList = {}, this.classNameList = {}, this.tagNameList = {}, this.target = t, s && (this.config = J.default(s, this.config)), this.findPath = new Lh(t, this), this.__listenEvents();
  }
  getByPoint(t, s, i) {
    return R.name === "node" && this.target.emit(A.CHECK_UPDATE), this.findPath.getByPoint(t, s, i);
  }
  find(t, s) {
    return typeof t == "number" ? this.getByInnerId(t, s) : t.startsWith("#") ? this.getById(t.substring(1), s) : t.startsWith(".") ? this.getByClassName(t.substring(1), s) : this.getByTagName(t, s);
  }
  getByInnerId(t, s) {
    let i;
    return this.innerIdList[t] || (s || (s = this.target), this.loopFind(s, (n) => n.innerId === t && (i = n, this.innerIdList[t] = i, !0)), i);
  }
  getById(t, s) {
    let i;
    return this.idList[t] || (s || (s = this.target), this.loopFind(s, (n) => n.id === t && (i = n, this.idList[t] = i, !0)), i);
  }
  getByClassName(t, s) {
    s || (s = this.target);
    let i = [];
    return this.loopFind(s, (r) => (r.className === t && i.push(r), !1)), i;
  }
  getByTagName(t, s) {
    s || (s = this.target);
    let i = [];
    return this.loopFind(s, (r) => (r.__tag === t && i.push(r), !1)), i;
  }
  loopFind(t, s) {
    if (s(t))
      return;
    const { children: i } = t;
    for (let r = 0, n = i.length; r < n; r++) {
      if (s(t = i[r]))
        return;
      t.isBranch && this.loopFind(t, s);
    }
  }
  __onRemoveChild(t) {
    const s = t.target;
    this.idList[s.id] && (this.idList[s.id] = null), this.innerIdList[s.id] && (this.innerIdList[s.innerId] = null);
  }
  __listenEvents() {
    this.__eventIds = [this.target.on_(At.REMOVE, this.__onRemoveChild, this)];
  }
  __removeListenEvents() {
    this.target.off_(this.__eventIds);
  }
  destroy() {
    this.target && (this.__removeListenEvents(), this.findPath.destroy(), this.target = null, this.findPath = null, this.innerIdList = null, this.idList = null, this.classNameList = null, this.tagNameList = null);
  }
}
Object.assign($, { watcher: (e, t) => new Hn(e, t), layouter: (e, t) => new hs(e, t), renderer: (e, t, s) => new Yn(e, t, s), selector: (e, t) => new jn(e, t) }), R.layout = hs.fullLayout;
const Fr = W.get("LeaferCanvas");
class ki extends bn {
  init() {
    const { view: t } = this.config;
    if (this.offscreen)
      t ? this.view = t : this.__createView();
    else {
      t ? this.__createViewFrom(t) : this.__createView();
      const { style: s } = this.view;
      s.display || (s.display = "block"), this.parentView = this.view.parentElement;
    }
    this.__createContext(), this.autoLayout || this.resize(this.config);
  }
  set backgroundColor(t) {
    this.view.style.backgroundColor = t;
  }
  get backgroundColor() {
    return this.view.style.backgroundColor;
  }
  set hittable(t) {
    this.view.style.pointerEvents = t ? "auto" : "none";
  }
  get hittable() {
    return this.view.style.pointerEvents !== "none";
  }
  __createView() {
    if (this.offscreen)
      try {
        return void (this.view = new OffscreenCanvas(1, 1));
      } catch (t) {
        Fr.error(t);
      }
    this.view = document.createElement("canvas");
  }
  __createViewFrom(t) {
    let s = typeof t == "string" ? document.getElementById(t) : t;
    if (s)
      if (s instanceof HTMLCanvasElement)
        this.view = s;
      else {
        let i = s;
        if (s === window || s === document) {
          const n = document.createElement("div"), { style: o } = n;
          o.position = "absolute", o.top = o.bottom = o.left = o.right = "0px", document.body.appendChild(n), i = n;
        }
        this.__createView();
        const r = this.view;
        if (i.hasChildNodes()) {
          const { style: n } = r;
          n.position = "absolute", n.top = n.left = "0px", i.style.position || (i.style.position = "relative");
        }
        i.appendChild(r);
      }
    else
      Fr.error(`no id: ${t}`), this.__createView();
  }
  updateViewSize() {
    const { width: t, height: s, pixelRatio: i } = this;
    if (!this.offscreen) {
      const { style: r } = this.view;
      r.width = t + "px", r.height = s + "px";
    }
    this.view.width = t * i, this.view.height = s * i;
  }
  updateClientBounds() {
    this.offscreen || (this.clientBounds = this.view.getBoundingClientRect());
  }
  startAutoLayout(t, s) {
    if (!this.offscreen) {
      this.autoBounds = t, this.resizeListener = s;
      try {
        this.resizeObserver = new ResizeObserver((r) => {
          this.updateClientBounds();
          for (const n of r)
            this.checkAutoBounds(n.contentRect);
        });
        const i = this.parentView;
        i && (this.resizeObserver.observe(i), this.checkAutoBounds(i.getBoundingClientRect()));
      } catch {
        this.imitateResizeObserver();
      }
    }
  }
  imitateResizeObserver() {
    this.autoLayout && (this.parentView && this.checkAutoBounds(this.parentView.getBoundingClientRect()), R.requestRender(this.imitateResizeObserver.bind(this)));
  }
  checkAutoBounds(t) {
    const s = this.view, { x: i, y: r, width: n, height: o } = this.autoBounds.getBoundsFrom(t);
    if (n !== this.width || o !== this.height) {
      const { style: a } = s, { pixelRatio: l } = this;
      a.marginLeft = i + "px", a.marginTop = r + "px";
      const c = { width: n, height: o, pixelRatio: l }, u = {};
      J.copyAttrs(u, this, Ot), this.resize(c), this.width !== void 0 && this.resizeListener(new ae(c, u));
    }
  }
  stopAutoLayout() {
    this.autoLayout = !1, this.resizeListener = null, this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null);
  }
  unrealCanvas() {
    if (!this.unreal && this.parentView) {
      const t = this.view;
      t && t.remove(), this.view = this.parentView, this.unreal = !0;
    }
  }
  destroy() {
    if (this.view) {
      if (this.stopAutoLayout(), !this.unreal && !this.offscreen) {
        const t = this.view;
        t.parentElement && t.remove();
      }
      super.destroy();
    }
  }
}
vi(CanvasRenderingContext2D.prototype), vi(Path2D.prototype);
class Ph {
  constructor(t) {
    this.interaction = t;
  }
  move(t) {
    const { interaction: s } = this;
    if (!this.moveData) {
      const { path: i } = s.selector.getByPoint(t, s.hitRadius);
      t.path = i, this.moveData = Object.assign(Object.assign({}, t), { moveX: 0, moveY: 0 }), s.emit(pt.START, this.moveData);
    }
    t.path = this.moveData.path, s.emit(pt.MOVE, t), this.transformEndWait();
  }
  zoom(t) {
    const { interaction: s } = this;
    if (!this.zoomData) {
      const { path: i } = s.selector.getByPoint(t, s.hitRadius);
      t.path = i, this.zoomData = Object.assign(Object.assign({}, t), { scale: 1 }), s.emit(Dt.START, this.zoomData);
    }
    t.path = this.zoomData.path, s.emit(Dt.ZOOM, t), this.transformEndWait();
  }
  rotate(t) {
    const { interaction: s } = this;
    if (!this.rotateData) {
      const { path: i } = s.selector.getByPoint(t, s.hitRadius);
      t.path = i, this.rotateData = Object.assign(Object.assign({}, t), { rotation: 0 }), s.emit(jt.START, this.rotateData);
    }
    t.path = this.rotateData.path, s.emit(jt.ROTATE, t), this.transformEndWait();
  }
  transformEndWait() {
    clearTimeout(this.transformTimer), this.transformTimer = setTimeout(() => {
      this.transformEnd();
    }, this.interaction.config.pointer.transformTime);
  }
  transformEnd() {
    this.moveEnd(), this.zoomEnd(), this.rotateEnd(), this.transformMode = null;
  }
  moveEnd() {
    this.moveData && (this.interaction.emit(pt.END, this.moveData), this.moveData = null);
  }
  zoomEnd() {
    this.zoomData && (this.interaction.emit(Dt.END, this.zoomData), this.zoomData = null);
  }
  rotateEnd() {
    this.rotateData && (this.interaction.emit(jt.END, this.rotateData), this.rotateData = null);
  }
  destroy() {
    clearTimeout(this.transformTimer), this.transformEnd(), this.interaction = null;
  }
}
const It = { getMoveEventData: (e, t, s) => Object.assign(Object.assign({}, s), { x: e.x, y: e.y, moveX: t.x, moveY: t.y }), getRotateEventData: (e, t, s) => Object.assign(Object.assign({}, s), { x: e.x, y: e.y, rotation: t }), getZoomEventData: (e, t, s) => Object.assign(Object.assign({}, s), { x: e.x, y: e.y, scale: t }), getDragEventData: (e, t, s) => Object.assign(Object.assign({}, s), { x: s.x, y: s.y, moveX: s.x - t.x, moveY: s.y - t.y, totalX: s.x - e.x, totalY: s.y - e.y }), getDropEventData: (e, t, s) => Object.assign(Object.assign({}, e), { list: t, data: s }), getSwipeDirection: (e) => e < -45 && e > -135 ? wt.UP : e > 45 && e < 135 ? wt.DOWN : e <= 45 && e >= -45 ? wt.RIGHT : wt.LEFT, getSwipeEventData: (e, t, s) => Object.assign(Object.assign({}, s), { moveX: t.moveX, moveY: t.moveY, totalX: s.x - e.x, totalY: s.y - e.y, type: Oh.getSwipeDirection(O.getAngle(e, s)) }), getBase: (e) => ({ altKey: e.altKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey, metaKey: e.metaKey, buttons: e.buttons === void 0 ? 1 : e.buttons, origin: e }), pathHasEventType(e, t) {
  const { list: s } = e;
  for (let i = 0, r = s.length; i < r; i++)
    if (s[i].hasEvent(t))
      return !0;
  return !1;
}, filterPathByEventType(e, t) {
  const s = new tt(), { list: i } = e;
  for (let r = 0, n = i.length; r < n; r++)
    i[r].hasEvent(t) && s.push(i[r]);
  return s;
} }, Oh = It, { getDragEventData: oi, getDropEventData: Sh, getSwipeEventData: Dh, filterPathByEventType: Mh } = It;
class Ah {
  constructor(t) {
    this.interaction = t;
  }
  setDragData(t) {
    this.dragData = oi(t, t, t);
  }
  getDragList() {
    return this.dragging ? Vt.dragList || this.dragList : null;
  }
  checkDrag(t, s) {
    const { interaction: i } = this, { downData: r } = i;
    if (this.moving && !Xt.middle(t) && !Xt.left(t))
      return void i.pointerCancel();
    const { dragData: n } = this;
    if (!this.moving) {
      const l = r.target.isLeafer && i.config.move.dragEmpty;
      this.moving = (Xt.middle(t) || ye.isHoldSpaceKey() || l) && s, this.moving && i.emit(pt.START, n);
    }
    this.moving || this.dragStart(t, s);
    const { path: o, throughPath: a } = r;
    this.dragData = oi(r, n, t), a && (this.dragData.throughPath = a), this.dragData.path = o, this.moving ? i.emit(pt.MOVE, this.dragData) : this.dragging && (i.emit(V.DRAG, this.dragData), this.dragDragableList());
  }
  dragStart(t, s) {
    this.dragging || (this.dragging = Xt.left(t) && s, this.dragging && (this.interaction.emit(V.START, this.dragData), this.getDragableList(this.dragData.path), this.dragList = Mh(this.dragData.path, V.DRAG), !this.dragList.length && this.dragableList && this.dragList.pushList(this.dragableList)));
  }
  getDragableList(t) {
    let s;
    for (let i = 0, r = t.length; i < r; i++)
      if (s = t.list[i], s.__.draggable && s.__.hitSelf) {
        this.dragableList = [s];
        break;
      }
  }
  dragDragableList() {
    const { running: t } = this.interaction;
    if (this.dragableList && t) {
      const { moveX: s, moveY: i } = this.dragData;
      this.dragableList.forEach((r) => {
        Ct.moveWorld(r, s, i);
      });
    }
  }
  dragOverOrOut(t) {
    const { interaction: s } = this, { dragOverPath: i } = this, { path: r } = t;
    i ? r.indexAt(0) !== i.indexAt(0) && (s.emit(V.OUT, t, i), s.emit(V.OVER, t, r)) : s.emit(V.OVER, t, r), this.dragOverPath = r;
  }
  dragEnterOrLeave(t) {
    const { interaction: s } = this, { dragEnterPath: i } = this, { path: r } = t;
    s.emit(V.ENTER, t, r, i), s.emit(V.LEAVE, t, i, r), this.dragEnterPath = r;
  }
  dragEnd(t) {
    const { interaction: s } = this, { downData: i } = s;
    if (!i)
      return;
    const { path: r, throughPath: n } = i, o = oi(i, t, t);
    n && (o.throughPath = n), o.path = r, this.moving && s.emit(pt.END, o), this.dragging && (s.emit(V.END, o), this.swipe(t, o), this.drop(t)), this.autoMoveCancel(), this.dragReset();
  }
  swipe(t, s) {
    const { interaction: i } = this, { downData: r } = i;
    if (O.getDistance(r, t) > i.config.pointer.swipeDistance) {
      const n = Dh(r, this.dragData, s);
      this.interaction.emit(n.type, n);
    }
  }
  drop(t) {
    const s = Sh(t, this.getDragList(), Vt.dragData);
    s.path = this.dragEnterPath, this.interaction.emit(Vt.DROP, s), this.interaction.emit(V.LEAVE, t, this.dragEnterPath);
  }
  dragReset() {
    Vt.dragList = null, this.dragList = null, this.dragableList = null, this.dragData = null, this.dragOverPath = null, this.dragEnterPath = null, this.dragging = null, this.moving = null;
  }
  checkDragOut(t) {
    const { interaction: s } = this;
    this.autoMoveCancel(), this.dragging && !s.shrinkCanvasBounds.hitPoint(t) && this.autoMoveOnDragOut(t);
  }
  autoMoveOnDragOut(t) {
    const { interaction: s } = this, { downData: i } = s, { autoDistance: r, dragOut: n } = s.config.move;
    if (!n || !r)
      return;
    const o = s.shrinkCanvasBounds, { x: a, y: l } = o, c = P.right(o), u = P.bottom(o), h = t.x < a ? r : c < t.x ? -r : 0, p = t.y < l ? r : u < t.y ? -r : 0;
    let _ = 0, g = 0;
    this.autoMoveTimer = setInterval(() => {
      _ += h, g += p, O.move(i, h, p), O.move(this.dragData, h, p), s.move(Object.assign(Object.assign({}, t), { moveX: h, moveY: p, totalX: _, totalY: g })), s.pointerMoveReal(t);
    }, 10);
  }
  autoMoveCancel() {
    this.autoMoveTimer && (clearInterval(this.autoMoveTimer), this.autoMoveTimer = 0);
  }
  destroy() {
    this.interaction = null, this.dragableList = null;
  }
}
const Ih = ["move", "zoom", "rotate"];
function Nr(e, t, s, i, r) {
  if (Ih.some((n) => t.startsWith(n)) && e.__.hitChildren && !Xn(e, r)) {
    let n;
    for (let o = 0, a = e.children.length; o < a; o++)
      n = e.children[o], !s.path.has(n) && n.__.hittable && Ci(n, t, s, i, r);
  }
}
function Ci(e, t, s, i, r) {
  if (!e.__)
    return !0;
  if (e.__.hitSelf && e.hasEvent(t, i) && !Xn(e, r)) {
    s.phase = i ? 1 : e === s.target ? 2 : 3;
    const n = ds.get(t, s);
    if (e.emitEvent(n, i), n.isStop)
      return !0;
  }
  return !1;
}
function Xn(e, t) {
  return t && t.has(e);
}
const Wh = { getData(e) {
  const t = e[0], s = e[1], i = O.getCenter(t.from, s.from), r = O.getCenter(t.to, s.to), n = { x: r.x - i.x, y: r.y - i.y }, o = O.getDistance(t.from, s.from), a = O.getDistance(t.to, s.to) / o, l = O.getAngle(t.from, s.from), c = O.getAngle(t.to, s.to);
  return { move: n, scale: a, angle: this.getChangedAngle(l, c), center: r };
}, getChangedAngle(e, t) {
  const s = (t = t <= -90 ? 360 + t : t) - (e = e <= -90 ? 360 + e : e);
  return s < 0 ? s + 360 : s;
} }, { pathHasEventType: zr, getMoveEventData: Fh, getZoomEventData: Nh, getRotateEventData: zh } = It;
class Uh {
  get dragging() {
    return this.dragger.dragging;
  }
  get hitRadius() {
    return this.config.pointer.hitRadius;
  }
  constructor(t, s, i, r) {
    this.config = { wheel: { zoomMode: !1, zoomSpeed: 0.5, moveSpeed: 0.5, rotateSpeed: 0.5, delta: R.os === "Windows" ? { x: 37.5, y: 37.5 } : { x: 20, y: 8 }, preventDefault: !0 }, pointer: { hitRadius: 5, through: !1, tapTime: 120, longPressTime: 800, transformTime: 500, dragHover: !0, dragDistance: 2, swipeDistance: 20, ignoreMove: !1 } }, this.tapCount = 0, this.target = t, this.canvas = s, this.selector = i, this.defaultPath = new tt(t), this.transformer = new Ph(this), this.dragger = new Ah(this), r && (this.config = J.default(r, this.config)), this.__listenEvents();
  }
  start() {
    this.running = !0;
  }
  stop() {
    this.running = !1;
  }
  receive(t) {
  }
  pointerDown(t) {
    this.emit(C.BEFORE_DOWN, t, this.defaultPath);
    const { hitRadius: s, through: i } = this.config.pointer, r = this.selector.getByPoint(t, s, { through: i });
    r.throughPath && (t.throughPath = r.throughPath), t.path = r.path, this.emit(C.DOWN, t), this.downData = t, this.downTime = Date.now(), this.dragger.setDragData(t), Xt.left(t) && (this.tapWait(), this.longPressWait(t));
  }
  pointerMove(t) {
    (this.downData || this.canvas.bounds.hitPoint(t)) && (this.pointerMoveReal(t), this.dragger.checkDragOut(t));
  }
  pointerMoveReal(t) {
    if (this.emit(C.BEFORE_MOVE, t, this.defaultPath), this.downData) {
      const i = O.getDistance(this.downData, t) > this.config.pointer.dragDistance;
      this.waitTap && i && this.pointerWaitCancel(), this.dragger.checkDrag(t, i);
    }
    if (this.dragger.moving || this.config.pointer.ignoreMove)
      return;
    const s = this.selector.getByPoint(t, this.hitRadius, { exclude: this.dragger.getDragList(), name: C.MOVE });
    t.path = s.path, this.emit(C.MOVE, t), this.pointerOverOrOut(t), this.pointerEnterOrLeave(t), this.dragger.dragging && (this.dragger.dragOverOrOut(t), this.dragger.dragEnterOrLeave(t));
  }
  pointerUp(t) {
    if (!this.downData)
      return;
    this.emit(C.BEFORE_UP, t, this.defaultPath);
    const { through: s } = this.config.pointer, i = this.selector.getByPoint(t, this.hitRadius, { through: s });
    i.throughPath && (t.throughPath = i.throughPath), t.path = i.path, this.emit(C.UP, t), this.emit(C.UP, this.downData, void 0, t.path), this.touchLeave(t), this.tap(t), this.dragger.dragEnd(t), this.downData = null;
  }
  pointerCancel() {
    this.pointerUp(this.dragger.dragData);
  }
  multiTouch(t, s) {
    const { move: i, angle: r, scale: n, center: o } = Wh.getData(s);
    this.rotate(zh(o, r, t)), this.zoom(Nh(o, n, t)), this.move(Fh(o, i, t));
  }
  move(t) {
    this.transformer.move(t);
  }
  zoom(t) {
    this.transformer.zoom(t);
  }
  rotate(t) {
    this.transformer.rotate(t);
  }
  transformEnd() {
    this.transformer.transformEnd();
  }
  pointerOverOrOut(t) {
    if (this.dragger.moving || this.dragging && !this.config.pointer.dragHover)
      return;
    const { path: s } = t;
    this.overPath ? s.indexAt(0) !== this.overPath.indexAt(0) && (this.emit(C.OUT, t, this.overPath), this.emit(C.OVER, t, s)) : this.emit(C.OVER, t, s), this.overPath = s;
  }
  pointerEnterOrLeave(t) {
    if (this.dragger.moving || this.dragging && !this.config.pointer.dragHover)
      return;
    const { path: s } = t;
    this.emit(C.ENTER, t, s, this.enterPath), this.emit(C.LEAVE, t, this.enterPath, s), this.enterPath = s;
  }
  touchLeave(t) {
    t.pointerType === "touch" && this.enterPath && (this.emit(C.LEAVE, t), this.dragger.dragging && this.emit(Vt.LEAVE, t));
  }
  tap(t) {
    const { pointer: s } = this.config, i = this.longTap(t);
    if (!s.tapMore && i || !this.waitTap)
      return;
    s.tapMore && this.emitTap(t);
    const r = Date.now() - this.downTime, n = [C.DOUBLE_TAP, C.DOUBLE_CLICK].some((o) => zr(t.path, o));
    r < s.tapTime + 50 && n ? (this.tapCount++, this.tapCount === 2 ? (this.tapWaitCancel(), this.emitDoubleTap(t)) : (clearTimeout(this.tapTimer), this.tapTimer = setTimeout(() => {
      s.tapMore || (this.tapWaitCancel(), this.emitTap(t));
    }, s.tapTime))) : s.tapMore || (this.tapWaitCancel(), this.emitTap(t));
  }
  emitTap(t) {
    this.emit(C.TAP, t), this.emit(C.CLICK, t);
  }
  emitDoubleTap(t) {
    this.emit(C.DOUBLE_TAP, t), this.emit(C.DOUBLE_CLICK, t);
  }
  pointerWaitCancel() {
    this.tapWaitCancel(), this.longPressWaitCancel();
  }
  tapWait() {
    clearTimeout(this.tapTimer), this.waitTap = !0;
  }
  tapWaitCancel() {
    clearTimeout(this.tapTimer), this.waitTap = !1, this.tapCount = 0;
  }
  longPressWait(t) {
    clearTimeout(this.longPressTimer), this.longPressTimer = setTimeout(() => {
      this.longPressed = !0, this.emit(C.LONG_PRESS, t);
    }, this.config.pointer.longPressTime);
  }
  longTap(t) {
    let s;
    return this.longPressed && (this.emit(C.LONG_TAP, t), zr(t.path, C.LONG_TAP) && (s = !0)), this.longPressWaitCancel(), s;
  }
  longPressWaitCancel() {
    clearTimeout(this.longPressTimer), this.longPressed = !1;
  }
  __onResize() {
    this.shrinkCanvasBounds = new et(this.canvas.bounds), this.shrinkCanvasBounds.spread(-2);
  }
  __listenEvents() {
    const { target: t } = this;
    this.__eventIds = [t.on_(ae.RESIZE, this.__onResize, this)], t.once(q.READY, () => this.__onResize());
  }
  __removeListenEvents() {
    this.target.off_(this.__eventIds);
  }
  emit(t, s, i, r) {
    this.running && function(n, o, a, l) {
      if (!a && !o.path)
        return;
      let c;
      o.type = n, a ? o = Object.assign(Object.assign({}, o), { path: a }) : a = o.path, o.target = a.indexAt(0);
      for (let u = a.length - 1; u > -1; u--) {
        if (c = a.list[u], Ci(c, n, o, !0, l))
          return;
        c.isApp && Nr(c, n, o, !0, l);
      }
      for (let u = 0, h = a.length; u < h; u++)
        if (c = a.list[u], c.isApp && Nr(c, n, o, !1, l), Ci(c, n, o, !1, l))
          return;
    }(t, s, i, r);
  }
  destroy() {
    this.target && (this.stop(), this.__removeListenEvents(), this.dragger.destroy(), this.transformer.destroy(), this.config = null, this.target = null, this.selector = null, this.canvas = null, this.dragger = null, this.transformer = null);
  }
}
const _t = { convert(e, t) {
  const s = It.getBase(e), i = Object.assign(Object.assign({}, s), { x: t.x, y: t.y, width: e.width, height: e.height, pointerType: e.pointerType, pressure: e.pressure });
  return i.pointerType === "pen" && (i.tangentialPressure = e.tangentialPressure, i.tiltX = e.tiltX, i.tiltY = e.tiltY, i.twist = e.twist), i;
}, convertMouse(e, t) {
  const s = It.getBase(e);
  return Object.assign(Object.assign({}, s), { x: t.x, y: t.y, width: 1, height: 1, pointerType: "mouse", pressure: 0.5 });
}, convertTouch(e, t) {
  const s = _t.getTouch(e), i = It.getBase(e);
  return Object.assign(Object.assign({}, i), { x: t.x, y: t.y, width: 1, height: 1, pointerType: "touch", pressure: s.force });
}, getTouch: (e) => e.targetTouches[0] || e.changedTouches[0] }, Ur = { getMove(e, t) {
  let { moveSpeed: s } = t, { deltaX: i, deltaY: r } = e;
  return e.shiftKey && !i && (i = r, r = 0), i > 50 && (i = Math.max(50, i / 3)), r > 50 && (r = Math.max(50, r / 3)), { x: -i * s * 2, y: -r * s * 2 };
}, getScale(e, t) {
  let s, i = 1, { zoomMode: r, zoomSpeed: n } = t;
  const o = e.deltaY || e.deltaX;
  return r ? (s = !e.deltaX && (R.intWheelDeltaY ? Math.abs(o) > 17 : Math.ceil(o) !== o), (e.shiftKey || e.metaKey || e.ctrlKey) && (s = !0)) : s = !e.shiftKey && (e.metaKey || e.ctrlKey), s && (n = Ye.within(n, 0, 1), i = 1 - o / (25 * (e.deltaY ? t.delta.y : t.delta.x) * (1 - n) + 10), i < 0.5 && (i = 0.5), i >= 1.5 && (i = 1.5)), i;
} }, { getMoveEventData: Hh, getZoomEventData: Hr, getRotateEventData: Yh } = It;
class Vn extends Uh {
  __listenEvents() {
    super.__listenEvents();
    const t = this.view = this.canvas.view;
    this.viewEvents = { pointerdown: this.onPointerDown, mousedown: this.onMouseDown, touchstart: this.onTouchStart, wheel: this.onWheel, gesturestart: this.onGesturestart, gesturechange: this.onGesturechange, gestureend: this.onGestureend }, this.windowEvents = { pointermove: this.onPointerMove, pointerup: this.onPointerUp, pointercancel: this.onPointerCancel, mousemove: this.onMouseMove, mouseup: this.onMouseUp, touchmove: this.onTouchMove, touchend: this.onTouchEnd, touchcancel: this.onTouchCancel, keydown: this.onKeyDown, keyup: this.onKeyUp, scroll: this.onScroll };
    const { viewEvents: s, windowEvents: i } = this;
    for (let r in s)
      s[r] = s[r].bind(this), t.addEventListener(r, s[r]);
    for (let r in i)
      i[r] = i[r].bind(this), window.addEventListener(r, i[r]);
  }
  __removeListenEvents() {
    super.__removeListenEvents();
    const { viewEvents: t, windowEvents: s } = this;
    for (let i in t)
      this.view.removeEventListener(i, t[i]), this.viewEvents = {};
    for (let i in s)
      window.removeEventListener(i, s[i]), this.windowEvents = {};
  }
  getLocal(t) {
    const { clientBounds: s } = this.canvas;
    return { x: t.clientX - s.x, y: t.clientY - s.y };
  }
  getTouches(t) {
    const s = [];
    for (let i = 0, r = t.length; i < r; i++)
      s.push(t[i]);
    return s;
  }
  preventDefaultPointer(t) {
    const { pointer: s } = this.config;
    s.preventDefault && t.preventDefault();
  }
  preventDefaultWheel(t) {
    const { wheel: s } = this.config;
    s.preventDefault && t.preventDefault();
  }
  preventWindowPointer(t) {
    return !this.downData && t.target !== this.view;
  }
  onKeyDown(t) {
    ye.setDownCode(t.code);
  }
  onKeyUp(t) {
    ye.setUpCode(t.code);
  }
  onScroll() {
    this.canvas.updateClientBounds();
  }
  onPointerDown(t) {
    this.preventDefaultPointer(t), this.usePointer || (this.usePointer = !0), this.useMultiTouch || this.pointerDown(_t.convert(t, this.getLocal(t)));
  }
  onPointerMove(t) {
    this.usePointer || (this.usePointer = !0), this.useMultiTouch || this.preventWindowPointer(t) || this.pointerMove(_t.convert(t, this.getLocal(t)));
  }
  onPointerUp(t) {
    this.downData && this.preventDefaultPointer(t), this.useMultiTouch || this.preventWindowPointer(t) || this.pointerUp(_t.convert(t, this.getLocal(t)));
  }
  onPointerCancel() {
    this.useMultiTouch || this.pointerCancel();
  }
  onMouseDown(t) {
    this.preventDefaultPointer(t), this.useTouch || this.usePointer || this.pointerDown(_t.convertMouse(t, this.getLocal(t)));
  }
  onMouseMove(t) {
    this.useTouch || this.usePointer || this.preventWindowPointer(t) || this.pointerMove(_t.convertMouse(t, this.getLocal(t)));
  }
  onMouseUp(t) {
    this.downData && this.preventDefaultPointer(t), this.useTouch || this.usePointer || this.preventWindowPointer(t) || this.pointerUp(_t.convertMouse(t, this.getLocal(t)));
  }
  onMouseCancel() {
    this.useTouch || this.usePointer || this.pointerCancel();
  }
  onTouchStart(t) {
    if (t.preventDefault(), this.multiTouchStart(t), this.usePointer)
      return;
    this.touchTimer && (window.clearTimeout(this.touchTimer), this.touchTimer = 0), this.useTouch = !0;
    const s = _t.getTouch(t);
    this.pointerDown(_t.convertTouch(t, this.getLocal(s)));
  }
  onTouchMove(t) {
    if (this.multiTouchMove(t), this.usePointer || this.preventWindowPointer(t))
      return;
    const s = _t.getTouch(t);
    this.pointerMove(_t.convertTouch(t, this.getLocal(s)));
  }
  onTouchEnd(t) {
    if (this.multiTouchEnd(), this.usePointer || this.preventWindowPointer(t))
      return;
    this.touchTimer && clearTimeout(this.touchTimer), this.touchTimer = setTimeout(() => {
      this.useTouch = !1;
    }, 500);
    const s = _t.getTouch(t);
    this.pointerUp(_t.convertTouch(t, this.getLocal(s)));
  }
  onTouchCancel() {
    this.usePointer || this.pointerCancel();
  }
  multiTouchStart(t) {
    this.useMultiTouch = t.touches.length >= 2, this.touches = this.useMultiTouch ? this.getTouches(t.touches) : void 0, this.useMultiTouch && this.pointerCancel();
  }
  multiTouchMove(t) {
    if (this.useMultiTouch && t.touches.length > 1) {
      const s = this.getTouches(t.touches), i = this.getKeepTouchList(this.touches, s);
      i.length > 1 && (this.multiTouch(It.getBase(t), i), this.touches = s);
    }
  }
  multiTouchEnd() {
    this.touches = null, this.useMultiTouch = !1, this.transformEnd();
  }
  getKeepTouchList(t, s) {
    let i;
    const r = [];
    return t.forEach((n) => {
      i = s.find((o) => o.identifier === n.identifier), i && r.push({ from: this.getLocal(n), to: this.getLocal(i) });
    }), r;
  }
  getLocalTouchs(t) {
    return t.map((s) => this.getLocal(s));
  }
  onWheel(t) {
    this.preventDefaultWheel(t);
    const { wheel: s } = this.config, i = s.getScale ? s.getScale(t, s) : Ur.getScale(t, s), r = this.getLocal(t), n = It.getBase(t);
    i !== 1 ? this.zoom(Hr(r, i, n)) : this.move(Hh(r, s.getMove ? s.getMove(t, s) : Ur.getMove(t, s), n));
  }
  onGesturestart(t) {
    this.preventDefaultWheel(t), this.lastGestureScale = 1, this.lastGestureRotation = 0;
  }
  onGesturechange(t) {
    this.preventDefaultWheel(t);
    const s = this.getLocal(t), i = It.getBase(t), r = t.scale / this.lastGestureScale, n = t.rotation - this.lastGestureRotation;
    let { rotateSpeed: o } = this.config.wheel;
    o = Ye.within(o, 0, 1), this.zoom(Hr(s, r * r, i)), this.rotate(Yh(s, n / Math.PI * 180 * (o / 4 + 0.1), i)), this.lastGestureScale = t.scale, this.lastGestureRotation = t.rotation;
  }
  onGestureend(t) {
    this.preventDefaultWheel(t), this.transformEnd();
  }
  destroy() {
    this.view && (super.destroy(), this.view = null, this.touches = null);
  }
}
const { mineType: ai, fileType: jh } = Ii;
function Gn(e, t) {
  R.origin = { createCanvas(s, i) {
    const r = document.createElement("canvas");
    return r.width = s, r.height = i, r;
  }, canvasToDataURL: (s, i, r) => s.toDataURL(ai(i), r), canvasToBolb: (s, i, r) => new Promise((n) => s.toBlob(n, ai(i), r)), canvasSaveAs: (s, i, r) => new Promise((n) => {
    let o = document.createElement("a");
    o.href = s.toDataURL(ai(jh(i)), r), o.download = i, document.body.appendChild(o), o.click(), document.body.removeChild(o), n();
  }), loadImage: (s) => new Promise((i, r) => {
    const n = new Image();
    n.setAttribute("crossOrigin", "anonymous"), n.crossOrigin = "anonymous", n.onload = () => {
      i(n);
    }, n.onerror = (o) => {
      r(o);
    }, s.startsWith("data:") || s.includes("?"), n.src = s;
  }) }, R.canvas = $.canvas(), R.conicGradientSupport = !!R.canvas.context.createConicGradient;
}
Object.assign($, { canvas: (e, t) => new ki(e, t), image: (e) => new Ti(e), hitCanvas: (e, t) => new ki(e, t), interaction: (e, t, s, i) => new Vn(e, t, s, i) }), R.name = "web", R.requestRender = function(e) {
  window.requestAnimationFrame(e);
}, R.devicePixelRatio = devicePixelRatio, R.realtimeLayout = !0;
const { userAgent: Re } = navigator;
Re.indexOf("Firefox") > -1 ? (R.conicGradientRotate90 = !0, R.intWheelDeltaY = !0) : Re.indexOf("Safari") > -1 && Re.indexOf("Chrome") === -1 && (R.fullImageShadow = !0), Re.indexOf("Windows") > -1 ? (R.os = "Windows", R.intWheelDeltaY = !0) : Re.indexOf("Mac") > -1 ? R.os = "Mac" : Re.indexOf("Linux") > -1 && (R.os = "Linux");
const Yr = W.get("LeaferTypeCreator"), He = { list: {}, register(e, t) {
  jr[e] ? Yr.repeat(e) : jr[e] = t;
}, run(e, t) {
  const s = He.list[e];
  s ? s(t) : Yr.error("no", e);
} }, { list: jr } = He;
He.register("user", function(e) {
  const { config: t } = e;
  t.move.dragOut = !1;
}), He.register("design", function(e) {
  const { MOVE: t } = pt, { ZOOM: s } = Dt;
  e.__eventIds.push(e.on_(t, (i) => {
    Ct.moveWorld(e.moveLayer, i.moveX, i.moveY);
  }), e.on_(s, (i) => {
    const { scaleX: r } = e.zoomLayer.__, { min: n, max: o } = e.config.zoom;
    let { scale: a } = i;
    a * r < n ? a = n / r : a * r > o && (a = o / r), a !== 1 && Ct.zoomOfWorld(e.zoomLayer, i, a);
  }));
});
const Is = {}, Z = {}, Xh = {}, Kn = { export(e, t, s) {
  return function(i) {
    return Ze || (Ze = new Qi()), new Promise((r) => {
      Ze.add(() => os(this, void 0, void 0, function* () {
        return yield i(r);
      })), Ze.running || Ze.start();
    });
  }((i) => new Promise((r) => {
    const { leafer: n } = e;
    n ? n.waitViewLoaded(() => os(this, void 0, void 0, function* () {
      let o, a, l, { canvas: c } = n, { unreal: u } = c;
      switch (u && (c = c.getSameCanvas(), c.backgroundColor = n.config.fill, n.__render(c, {})), typeof s) {
        case "object":
          s.quality && (o = s.quality), s.blob && (a = !0);
          break;
        case "number":
          o = s;
          break;
        case "boolean":
          a = s;
      }
      l = t.includes(".") ? yield c.saveAs(t, o) : a ? yield c.toBlob(t, o) : c.toDataURL(t, o), i({ data: l }), r(), u && c.recycle();
    })) : (i({ data: !1 }), r());
  }));
} };
let Ze;
const { copy: Xr, toOffsetOutBounds: Vh } = P, ht = {}, Cs = {};
function Vr(e, t, s, i) {
  const { bounds: r, shapeBounds: n } = i;
  if (R.fullImageShadow) {
    if (Xr(ht, e.bounds), ht.x += t.x - n.x, ht.y += t.y - n.y, s) {
      const { matrix: o } = i;
      ht.x -= (r.x + (o ? o.e : 0) + r.width / 2) * (s - 1), ht.y -= (r.y + (o ? o.f : 0) + r.height / 2) * (s - 1), ht.width *= s, ht.height *= s;
    }
    e.copyWorld(i.canvas, e.bounds, ht);
  } else
    s && (Xr(ht, t), ht.x -= t.width / 2 * (s - 1), ht.y -= t.height / 2 * (s - 1), ht.width *= s, ht.height *= s), e.copyWorld(i.canvas, n, s ? ht : t);
}
const { toOffsetOutBounds: Gh } = P, Rs = {};
var Kh = Object.freeze({ __proto__: null, blur: function(e, t, s) {
  const { blur: i } = e.__;
  s.setWorldBlur(i * e.__world.a), s.copyWorldToInner(t, e.__world, e.__layout.renderBounds), s.filter = "none";
}, innerShadow: function(e, t, s, i) {
  let r, n;
  const { __world: o, __layout: a } = e, { innerShadow: l } = e.__, { worldCanvas: c, bounds: u, shapeBounds: h, scaleX: p, scaleY: _ } = s, g = t.getSameCanvas(), m = l.length - 1;
  Gh(u, Rs), l.forEach((f, b) => {
    g.save(), g.setWorldShadow(Rs.offsetX + f.x * p, Rs.offsetY + f.y * _, f.blur * p), n = f.spread ? 1 - 2 * f.spread / (a.boxBounds.width + 2 * (a.strokeBoxSpread || 0)) : 0, Vr(g, Rs, n, s), g.restore(), c ? (g.copyWorld(g, u, o, "copy"), g.copyWorld(c, o, o, "source-out"), r = o) : (g.copyWorld(s.canvas, h, u, "source-out"), r = u), g.fillWorld(r, f.color, "source-in"), t.copyWorldToInner(g, r, a.renderBounds, f.blendMode), m && b < m && g.clear();
  }), g.recycle();
}, shadow: function(e, t, s, i) {
  let r, n;
  const { __world: o, __layout: a } = e, { shadow: l } = e.__, { worldCanvas: c, bounds: u, shapeBounds: h, scaleX: p, scaleY: _ } = s, g = t.getSameCanvas(), m = l.length - 1;
  Vh(u, Cs), l.forEach((f, b) => {
    g.setWorldShadow(Cs.offsetX + f.x * p, Cs.offsetY + f.y * _, f.blur * p, f.color), n = f.spread ? 1 + 2 * f.spread / (a.boxBounds.width + 2 * (a.strokeBoxSpread || 0)) : 0, Vr(g, Cs, n, s), r = u, f.box && (g.restore(), g.save(), c && (g.copyWorld(g, u, o, "copy"), r = o), c ? g.copyWorld(c, o, o, "destination-out") : g.copyWorld(s.canvas, h, u, "destination-out")), t.copyWorldToInner(g, r, a.renderBounds, f.blendMode), m && b < m && g.clear();
  }), g.recycle();
} });
function ue(e, t) {
  let s;
  const { rows: i, decorationY: r, decorationHeight: n } = e.__.__textDrawData;
  for (let o = 0, a = i.length; o < a; o++)
    s = i[o], s.text ? t.fillText(s.text, s.x, s.y) : s.data && s.data.forEach((l) => {
      t.fillText(l.char, l.x, s.y);
    }), r && t.fillRect(s.x, s.y + r, s.width, n);
}
function Gr(e, t, s) {
  const { strokeAlign: i } = e.__;
  switch (i) {
    case "center":
      t.setStroke(s, e.__.strokeWidth, e.__), ls(e, t);
      break;
    case "inside":
      Ri(e, t, s, "inside");
      break;
    case "outside":
      Ri(e, t, s, "outside");
  }
}
function Ri(e, t, s, i) {
  const { strokeWidth: r, __font: n } = e.__, o = t.getSameCanvas(!0);
  o.setStroke(s, 2 * r, e.__), o.font = n, ls(e, o), o.blendMode = i === "outside" ? "destination-out" : "destination-in", ue(e, o), o.blendMode = "normal", t.copyWorldToInner(o, e.__world, e.__layout.renderBounds), o.recycle();
}
function Kr(e, t, s) {
  const { strokeAlign: i } = e.__;
  switch (i) {
    case "center":
      t.setStroke(void 0, e.__.strokeWidth, e.__), qr(e, s, t);
      break;
    case "inside":
      Ri(e, t, s, "inside");
      break;
    case "outside":
      (function(r, n, o, a) {
        const { strokeWidth: l, __font: c } = r.__, u = n.getSameCanvas(!0);
        u.setStroke(void 0, 2 * l, r.__), u.font = c, qr(r, o, u), u.blendMode = a === "outside" ? "destination - out" : "destination -in ", ue(r, u), u.blendMode = "normal", n.copyWorldToInner(u, r.__world, r.__layout.renderBounds), u.recycle();
      })(e, t, s, "outside");
  }
}
function qr(e, t, s) {
  t.forEach((i) => {
    s.strokeStyle = i.style, i.blendMode ? (s.saveBlendMode(i.blendMode), ls(e, s), s.restoreBlendMode()) : ls(e, s);
  });
}
function ls(e, t) {
  let s;
  const { rows: i, decorationY: r, decorationHeight: n } = e.__.__textDrawData;
  for (let o = 0, a = i.length; o < a; o++)
    s = i[o], s.text ? t.strokeText(s.text, s.x, s.y) : s.data && s.data.forEach((l) => {
      t.strokeText(l.char, l.x, s.y);
    }), r && t.strokeRect(s.x, s.y + r, s.width, n);
}
function hi(e, t) {
  e.forEach((s) => {
    t.strokeStyle = s.style, s.blendMode ? (t.saveBlendMode(s.blendMode), t.stroke(), t.restoreBlendMode()) : t.stroke();
  });
}
const { getSpread: qh, getOuterOf: Qr, getByMove: Qh, getIntersectData: Zh } = P, Li = { string(e, t) {
  if (typeof e == "string")
    return e;
  let s = e.a === void 0 ? 1 : e.a;
  t && (s *= t);
  const i = e.r + "," + e.g + "," + e.b;
  return s === 1 ? "rgb(" + i + ")" : "rgba(" + i + "," + s + ")";
} }, { get: Ls, rotateOfOuter: $h, translate: $t, scaleOfOuter: Jh, scale: li, rotate: Zr } = S;
function tl(e, t, s, i) {
  const { type: r, blendMode: n } = s;
  let o = { type: r, style: "rgba(255,255,255,0)" };
  n && (o.blendMode = n);
  const { imageManager: a } = e.leafer, l = a.get(s);
  if (l.ready) {
    if ($r(e, t, l)) {
      let c, { opacity: u, mode: h, offset: p, scale: _, rotation: g } = s, { width: m, height: f } = l;
      const b = i.width === m && i.height === f;
      switch (h) {
        case "strench":
          b || (m = i.width, f = i.height), (i.x || i.y) && (c = Ls(), $t(c, i.x, i.y));
          break;
        case "clip":
          (p || _ || g) && (c = function(E, y, w, B) {
            const T = Ls();
            return $t(T, E.x, E.y), y && $t(T, y.x, y.y), w && (typeof w == "number" ? li(T, w) : li(T, w.x, w.y)), B && Zr(T, B), T;
          }(i, p, _, g));
          break;
        case "repeat":
          (!b || _ || g) && (c = function(E, y, w, B, T) {
            const k = Ls();
            if (T)
              switch (Zr(k, T), T) {
                case 90:
                  $t(k, w, 0);
                  break;
                case 180:
                  $t(k, y, w);
                  break;
                case 270:
                  $t(k, 0, y);
              }
            return $t(k, E.x, E.y), B && Jh(k, E, B), k;
          }(i, m, f, _, g));
          break;
        default:
          b && !g || (c = function(E, y, w, B, T) {
            const k = Ls(), L = T && T !== 180, I = y.width / (L ? B : w), z = y.height / (L ? w : B), F = E === "fit" ? Math.min(I, z) : Math.max(I, z), Y = y.x + (y.width - w * F) / 2, Q = y.y + (y.height - B * F) / 2;
            return $t(k, Y, Q), li(k, F), T && $h(k, { x: y.x + y.width / 2, y: y.y + y.height / 2 }, T), k;
          }(h, i, m, f, g));
      }
      (function(E, y, w, B) {
        let T = R.canvas.createPattern(y, B ? "repeat" : "no-repeat");
        w && (T.setTransform ? T.setTransform(w) : E.transform = w), E.style = T;
      })(o, l.getCanvas(m, f, u), c, h === "repeat");
    }
  } else
    a.load(l, () => {
      e.leafer && ($r(e, t, l) && e.forceUpdate("width"), e.hasEvent(St.LOADED) && e.emitEvent(new St(St.LOADED, e, l, t, s)));
    }, (c) => {
      e.hasEvent(St.ERROR) && e.emitEvent(new St(St.ERROR, e, l, t, s, c));
    });
  return o;
}
function $r(e, t, s) {
  const { __: i } = e;
  return !(t === "fill" && i && !(i.__naturalWidth && i.__naturalHeight || (i.__naturalWidth = s.width, i.__naturalHeight = s.height, i.__getInput("width") && i.__getInput("height")))) || (e.forceUpdate("width"), !1);
}
const el = { x: 0.5, y: 0 }, sl = { x: 0.5, y: 1 };
function di(e, t, s) {
  let i;
  for (let r = 0, n = t.length; r < n; r++)
    i = t[r], e.addColorStop(i.offset, Li.string(i.color, s));
}
const { set: Jr, getAngle: il, getDistance: rl } = O, { get: nl, rotateOfOuter: ol, scaleOfOuter: al } = S, hl = { x: 0.5, y: 0.5 }, ll = { x: 0.5, y: 1 }, Ht = {}, ci = {}, { set: tn, getAngle: dl, getDistance: cl } = O, { get: ul, rotateOfOuter: en, scaleOfOuter: sn } = S, _l = { x: 0.5, y: 0.5 }, pl = { x: 0.5, y: 1 }, ut = {}, ui = {};
function rn(e, t) {
  let s, i = e.__.__input[t];
  const r = [];
  i instanceof Array || (i = [i]);
  for (let n = 0, o = i.length; n < o; n++)
    s = gl(e, i[n], t), s && r.push(s);
  e.__["_" + t] = r.length ? r : void 0;
}
function gl(e, t, s) {
  if (typeof t != "object" || t.visible === !1 || t.opacity === 0)
    return;
  const { boxBounds: i } = e.__layout;
  switch (t.type) {
    case "solid":
      let { type: r, blendMode: n, color: o, opacity: a } = t;
      return { type: r, blendMode: n, style: Li.string(o, a) };
    case "image":
      return tl(e, s, t, i);
    case "linear":
      return function(l, c) {
        let { from: u, to: h, type: p, blendMode: _, opacity: g } = l;
        u || (u = el), h || (h = sl);
        const m = R.canvas.createLinearGradient(c.x + u.x * c.width, c.y + u.y * c.height, c.x + h.x * c.width, c.y + h.y * c.height);
        di(m, l.stops, g);
        const f = { type: p, style: m };
        return _ && (f.blendMode = _), f;
      }(t, i);
    case "radial":
      return function(l, c) {
        let { from: u, to: h, type: p, opacity: _, blendMode: g, stretch: m } = l;
        u || (u = hl), h || (h = ll);
        const { x: f, y: b, width: E, height: y } = c;
        let w;
        Jr(Ht, f + u.x * E, b + u.y * y), Jr(ci, f + h.x * E, b + h.y * y), (E !== y || m) && (w = nl(), al(w, Ht, E / y * (m || 1), 1), ol(w, Ht, il(Ht, ci) + 90));
        const B = R.canvas.createRadialGradient(Ht.x, Ht.y, 0, Ht.x, Ht.y, rl(Ht, ci));
        di(B, l.stops, _);
        const T = { type: p, style: B, transform: w };
        return g && (T.blendMode = g), T;
      }(t, i);
    case "angular":
      return function(l, c) {
        let { from: u, to: h, type: p, opacity: _, blendMode: g, stretch: m } = l;
        u || (u = _l), h || (h = pl);
        const { x: f, y: b, width: E, height: y } = c;
        tn(ut, f + u.x * E, b + u.y * y), tn(ui, f + h.x * E, b + h.y * y);
        const w = ul(), B = dl(ut, ui);
        R.conicGradientRotate90 ? (sn(w, ut, E / y * (m || 1), 1), en(w, ut, B + 90)) : (sn(w, ut, 1, E / y * (m || 1)), en(w, ut, B));
        const T = R.conicGradientSupport ? R.canvas.createConicGradient(0, ut.x, ut.y) : R.canvas.createRadialGradient(ut.x, ut.y, 0, ut.x, ut.y, cl(ut, ui));
        di(T, l.stops, _);
        const k = { type: p, style: T, transform: w };
        return g && (k.blendMode = g), k;
      }(t, i);
    default:
      return t.r ? { type: "solid", style: Li.string(t) } : void 0;
  }
}
var fl = Object.freeze({ __proto__: null, computeFill: function(e) {
  rn(e, "fill");
}, computeStroke: function(e) {
  rn(e, "stroke");
}, drawText: ue, drawTextStroke: ls, fill: function(e, t, s) {
  t.fillStyle = s, e.__.__font ? ue(e, t) : e.__.windingRule ? t.fill(e.__.windingRule) : t.fill();
}, fills: function(e, t, s) {
  let i;
  const { windingRule: r, __font: n } = e.__;
  for (let o = 0, a = s.length; o < a; o++)
    if (i = s[o], t.fillStyle = i.style, i.transform) {
      t.save();
      const { a: l, b: c, c: u, d: h, e: p, f: _ } = i.transform;
      t.transform(l, c, u, h, p, _), i.blendMode && (t.blendMode = i.blendMode), n ? ue(e, t) : r ? t.fill(r) : t.fill(), t.restore();
    } else
      i.blendMode ? (t.saveBlendMode(i.blendMode), n ? ue(e, t) : r ? t.fill(r) : t.fill(), t.restoreBlendMode()) : n ? ue(e, t) : r ? t.fill(r) : t.fill();
}, shape: function(e, t, s) {
  const i = t.getSameCanvas();
  let r, n, o, a;
  const { __world: l } = e;
  let { a: c, d: u } = l;
  if (t.bounds.includes(l, s.matrix))
    s.matrix ? (c *= s.matrix.a, u *= s.matrix.d, r = o = Qr(l, s.matrix)) : r = o = l, a = i;
  else {
    const { renderShapeSpread: h } = e.__layout, p = Zh(h ? qh(t.bounds, h * c) : t.bounds, l, s.matrix);
    n = t.bounds.getFitMatrix(p), n.a < 1 && (a = t.getSameCanvas(), e.__renderShape(a, s), c *= n.a, u *= n.d), o = Qr(l, n), r = Qh(o, -n.e, -n.f), s.matrix && n.multiply(s.matrix), s = Object.assign(Object.assign({}, s), { matrix: n });
  }
  return e.__renderShape(i, s), { canvas: i, matrix: n, bounds: r, worldCanvas: a, shapeBounds: o, scaleX: c, scaleY: u };
}, stroke: function(e, t, s) {
  const i = e.__, { strokeWidth: r, strokeAlign: n, __font: o } = i;
  if (r)
    if (o)
      Gr(e, t, s);
    else
      switch (n) {
        case "center":
          t.setStroke(s, r, i), t.stroke();
          break;
        case "inside":
          t.save(), t.setStroke(s, 2 * r, i), t.clip(i.windingRule), t.stroke(), t.restore();
          break;
        case "outside":
          const a = t.getSameCanvas(!0);
          a.setStroke(s, 2 * r, e.__), e.__drawRenderPath(a), a.stroke(), a.clip(i.windingRule), a.clearWorld(e.__layout.renderBounds), t.copyWorldToInner(a, e.__world, e.__layout.renderBounds), a.recycle();
      }
}, strokeText: Gr, strokes: function(e, t, s) {
  const i = e.__, { strokeWidth: r, strokeAlign: n, __font: o } = i;
  if (r)
    if (o)
      Kr(e, t, s);
    else
      switch (n) {
        case "center":
          t.setStroke(void 0, r, i), hi(s, t);
          break;
        case "inside":
          t.save(), t.setStroke(void 0, 2 * r, i), t.clip(i.windingRule), hi(s, t), t.restore();
          break;
        case "outside":
          const { renderBounds: a } = e.__layout, l = t.getSameCanvas(!0);
          e.__drawRenderPath(l), l.setStroke(void 0, 2 * r, e.__), hi(s, l), l.clip(i.windingRule), l.clearWorld(a), t.copyWorldToInner(l, e.__world, a), l.recycle();
      }
}, strokesText: Kr });
Object.assign(Is, Kh), Object.assign(Z, fl);
class qt extends Ai {
  setFill(t) {
    typeof t != "string" && t ? typeof t == "object" && (this.__setInput("fill", t), this.__leaf.__layout.boxChanged ? this._fill = t : Z.computeFill(this.__leaf), this.__isFills = !0) : (this._fill = t, this.__input && this.__removeInput("fill"), this.__isFills && (this.__isFills = !1)), this.__naturalWidth && (this.__naturalWidth = this.__naturalHeight = void 0);
  }
  setStroke(t) {
    typeof t != "string" && t ? typeof t == "object" && (this.__setInput("stroke", t), this.__leaf.__layout.boxChanged ? this._stroke = t : Z.computeStroke(this.__leaf), this.__isStrokes = !0) : (this._stroke = t, this.__input && this.__removeInput("stroke"), this.__isStrokes && (this.__isStrokes = !1));
  }
  setShadow(t) {
    this.__setInput("shadow", t), t instanceof Array ? (t.some((s) => s.visible === !1) && (t = t.filter((s) => s.visible !== !1)), this._shadow = t.length ? t : null) : this._shadow = t ? t.visible === !1 ? null : [t] : null;
  }
  setInnerShadow(t) {
    this.__setInput("innerShadow", t), t instanceof Array ? (t.some((s) => s.visible === !1) && (t = t.filter((s) => s.visible !== !1)), this._innerShadow = t.length ? t : null) : this._innerShadow = t ? t.visible === !1 ? null : [t] : null;
  }
}
const nn = { number: (e, t) => typeof e == "object" ? e.type === "percent" ? e.value / 100 * t : e.value : e };
class Ns extends qt {
}
class qn extends Ns {
  get __boxStroke() {
    return !0;
  }
}
class Qn extends qt {
  get __boxStroke() {
    return !0;
  }
}
const { parse: yl } = oe, ml = { thin: 100, "extra-light": 200, light: 300, normal: 400, medium: 500, "semi-bold": 600, bold: 700, "extra-bold": 800, black: 900 };
class Zn extends Qn {
}
function Me(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), i && (this.__.__useEffect = !0), this.__layout.renderChanged || this.__layout.renderChange();
    } });
  };
}
function ts(e) {
  return (t, s) => {
    st(t, s, e, { set(i) {
      this.__setAttr(s, i), this.__layout.boxChanged || this.__layout.boxChange(), this.__updateSize();
    } });
  };
}
const $n = { __updateStrokeSpread() {
  let e = 0, t = 0;
  const { stroke: s, hitStroke: i, strokeAlign: r, strokeWidth: n } = this.__;
  if ((s || i === "all") && n && r !== "inside" && (t = e = r === "center" ? n / 2 : n, !this.__.__boxStroke)) {
    const { miterLimit: o, strokeCap: a } = this.__, l = this.__tag !== "Line" ? 1 / Math.sin(o * M / 2) * Math.sqrt(n) - e : 0;
    e += Math.max(l, a === "none" ? 0 : n);
  }
  return this.__layout.strokeBoxSpread = t, e;
}, __updateRenderSpread() {
  let e = 0;
  const { shadow: t, innerShadow: s, blur: i, backgroundBlur: r } = this.__;
  t && t.forEach((o) => {
    e = Math.max(e, Math.max(Math.abs(o.y), Math.abs(o.x)) + (o.spread > 0 ? o.spread : 0) + 1.5 * o.blur);
  }), i && (e = Math.max(e, i));
  let n = e = Math.ceil(e);
  return s && s.forEach((o) => {
    n = Math.max(n, Math.max(Math.abs(o.y), Math.abs(o.x)) + (o.spread < 0 ? -o.spread : 0) + 1.5 * o.blur);
  }), r && (n = Math.max(n, r)), this.__layout.renderShapeSpread = n, e;
} }, Jn = { __updateHitCanvas() {
  this.__hitCanvas || (this.__hitCanvas = this.leafer.hitCanvasManager.getPathType(this));
  const e = this.__hitCanvas;
  this.__drawHitPath(e), e.setStrokeOptions(this.__);
}, __hit(e) {
  const { __hitCanvas: t } = this;
  R.name === "miniapp" && this.__drawHitPath(t);
  const { fill: s, hitFill: i, windingRule: r } = this.__, n = s && i === "path" || i === "all", o = t.hitFill(e, r);
  if (n && o)
    return !0;
  const { stroke: a, hitStroke: l, strokeWidth: c, strokeAlign: u } = this.__, h = a && l === "path" || l === "all", p = 2 * e.radiusX;
  let _ = p;
  if (h)
    switch (u) {
      case "inside":
        if (_ += 2 * c, !n && o && t.hitStroke(e, _))
          return !0;
        _ = p;
        break;
      case "center":
        _ += c;
        break;
      case "outside":
        if (_ += 2 * c, !n) {
          if (!o && t.hitStroke(e, _))
            return !0;
          _ = p;
        }
    }
  return !!_ && t.hitStroke(e, _);
} }, to = { __updateChange() {
  const e = this.__;
  if (e.__useEffect) {
    const { shadow: t, innerShadow: s, blur: i, backgroundBlur: r } = this.__;
    e.__useEffect = !!(t || s || i || r);
  }
  e.__checkSingle(), e.__isFills || e.__isStrokes || e.cornerRadius || e.__useEffect ? e.__complex = !0 : e.__complex && (e.__complex = !1);
}, __drawFast(e, t) {
  const { fill: s, stroke: i, __drawAfterFill: r } = this.__;
  this.__drawRenderPath(e), s && Z.fill(this, e, s), r && this.__drawAfterFill(e, t), i && Z.stroke(this, e, i);
}, __draw(e, t) {
  if (this.__.__complex) {
    const { fill: s, stroke: i, __drawAfterFill: r } = this.__;
    if (this.__drawRenderPath(e), this.__.__useEffect) {
      const n = Z.shape(this, e, t), { shadow: o, innerShadow: a } = this.__;
      o && Is.shadow(this, e, n, t), s && (this.__.__isFills ? Z.fills(this, e, s) : Z.fill(this, e, s)), r && this.__drawAfterFill(e, t), a && Is.innerShadow(this, e, n, t), i && (this.__.__isStrokes ? Z.strokes(this, e, i) : Z.stroke(this, e, i)), n.worldCanvas && n.worldCanvas.recycle(), n.canvas.recycle();
    } else
      s && (this.__.__isFills ? Z.fills(this, e, s) : Z.fill(this, e, s)), r && this.__drawAfterFill(e, t), i && (this.__.__isStrokes ? Z.strokes(this, e, i) : Z.stroke(this, e, i));
  } else
    this.__drawFast(e, t);
}, __renderShape(e, t) {
  if (!this.__worldOpacity)
    return;
  e.setWorld(this.__world, t.matrix);
  const { fill: s, stroke: i } = this.__;
  this.__drawRenderPath(e), s && Z.fill(this, e, "#000000"), i && Z.stroke(this, e, "#000000");
} }, eo = { __drawFast(e, t) {
  const { width: s, height: i, fill: r, stroke: n, __drawAfterFill: o } = this.__;
  if (r && (e.fillStyle = r, e.fillRect(0, 0, s, i)), o && this.__drawAfterFill(e, t), n) {
    const { strokeAlign: a, strokeWidth: l } = this.__;
    e.setStroke(n, l, this.__);
    const c = l / 2;
    switch (a) {
      case "center":
        e.strokeRect(0, 0, s, i);
        break;
      case "inside":
        e.strokeRect(c, c, s - l, i - l);
        break;
      case "outside":
        e.strokeRect(-c, -c, s + l, i + l);
    }
  }
} };
let x = class extends as {
  constructor(e) {
    super(e);
  }
  set(e) {
    Object.assign(this, e);
  }
  get() {
    return this.__.__getInputData();
  }
  getPath(e) {
    const t = this.__.path;
    return t ? e ? oe.toCanvasData(t, !0) : t : [];
  }
  getPathString(e) {
    return oe.stringify(this.getPath(e));
  }
  __onUpdateSize() {
    if (this.__.__input) {
      const { fill: e, stroke: t } = this.__.__input;
      e && Z.computeFill(this), t && Z.computeStroke(this);
    }
  }
  __updateRenderPath() {
    if (this.__.path) {
      const { __: e } = this;
      e.__pathForRender = e.cornerRadius ? Cn.smooth(e.path, e.cornerRadius, e.cornerSmoothing) : e.path;
    }
  }
  __drawRenderPath(e) {
    e.beginPath(), this.__drawPathByData(e, this.__.__pathForRender);
  }
  __drawPath(e) {
    e.beginPath(), this.__drawPathByData(e, this.__.path);
  }
  __drawPathByData(e, t) {
  }
  export(e, t) {
    return Kn.export(this, e, t);
  }
  static one(e, t, s, i, r) {
    return Fs.get(e.tag || this.prototype.__tag, e, t, s, i, r);
  }
};
d([it(qt)], x.prototype, "__", void 0), d([Se("")], x.prototype, "id", void 0), d([Se("")], x.prototype, "name", void 0), d([Se("")], x.prototype, "className", void 0), d([bi("pass-through")], x.prototype, "blendMode", void 0), d([Bi(1)], x.prototype, "opacity", void 0), d([Bi(!0)], x.prototype, "visible", void 0), d([Ln(!1)], x.prototype, "isMask", void 0), d([Pn(!1)], x.prototype, "isEraser", void 0), d([Rn(0)], x.prototype, "zIndex", void 0), d([Se()], x.prototype, "locked", void 0), d([wi(0)], x.prototype, "x", void 0), d([wi(0)], x.prototype, "y", void 0), d([H(100)], x.prototype, "width", void 0), d([H(100)], x.prototype, "height", void 0), d([xi(1)], x.prototype, "scaleX", void 0), d([xi(1)], x.prototype, "scaleY", void 0), d([Os(0)], x.prototype, "rotation", void 0), d([Os(0)], x.prototype, "skewX", void 0), d([Os(0)], x.prototype, "skewY", void 0), d([Se(!1)], x.prototype, "draggable", void 0), d([Fe(!0)], x.prototype, "hittable", void 0), d([Fe("path")], x.prototype, "hitFill", void 0), d([Pt("path")], x.prototype, "hitStroke", void 0), d([Fe(!0)], x.prototype, "hitChildren", void 0), d([Fe(!0)], x.prototype, "hitSelf", void 0), d([bi()], x.prototype, "fill", void 0), d([Pt()], x.prototype, "stroke", void 0), d([Pt("inside")], x.prototype, "strokeAlign", void 0), d([Pt(1)], x.prototype, "strokeWidth", void 0), d([Pt("none")], x.prototype, "strokeCap", void 0), d([Pt("miter")], x.prototype, "strokeJoin", void 0), d([Pt()], x.prototype, "dashPattern", void 0), d([Pt()], x.prototype, "dashOffset", void 0), d([Pt(10)], x.prototype, "miterLimit", void 0), d([kt()], x.prototype, "cornerRadius", void 0), d([kt()], x.prototype, "cornerSmoothing", void 0), d([Me()], x.prototype, "shadow", void 0), d([Me()], x.prototype, "innerShadow", void 0), d([Me()], x.prototype, "blur", void 0), d([Me()], x.prototype, "backgroundBlur", void 0), d([Me()], x.prototype, "grayscale", void 0), d([Et(kn.drawPathByData)], x.prototype, "__drawPathByData", null), x = d([ot($n), ot(Jn), ot(to), Vi()], x);
let re = class extends x {
  get __tag() {
    return "Group";
  }
  set mask(e) {
    this.__hasMask && this.__removeMask(), e && (e.isMask = !0, this.addAt(e, 0));
  }
  get mask() {
    return this.children.find((e) => e.isMask);
  }
  constructor(e) {
    super(e), this.isBranch = !0, this.children = [];
  }
  addAt(e, t) {
    this.add(e, t);
  }
  addAfter(e, t) {
    this.add(e, this.children.indexOf(t) + 1);
  }
  addBefore(e, t) {
    this.add(e, this.children.indexOf(t));
  }
  add(e, t) {
  }
  remove(e) {
  }
  removeAll() {
  }
};
d([it(Ns)], re.prototype, "__", void 0), re = d([ot(As), rt()], re);
let ge = class extends x {
  get __tag() {
    return "Rect";
  }
  constructor(e) {
    super(e);
  }
  __drawPathByData(e, t) {
    const { width: s, height: i, cornerRadius: r } = this.__;
    r ? e.roundRect(0, 0, s, i, r) : e.rect(0, 0, s, i);
  }
};
d([it(Qn)], ge.prototype, "__", void 0), ge = d([ot(eo), rt()], ge);
const Jt = ge.prototype, vl = re.prototype, on = {}, { copy: wl, add: xl } = P;
let nt = class extends re {
  get __tag() {
    return "Box";
  }
  constructor(e) {
    super(e), this.isBranchLeaf = !0, this.__layout.renderChanged || this.__layout.renderChange();
  }
  __updateStrokeSpread() {
    return 0;
  }
  __updateRectRenderSpread() {
    return 0;
  }
  __updateRenderSpread() {
    let e = this.__updateRectRenderSpread() || super.__updateRenderSpread();
    return this.__.__drawAfterFill = this.__.overflow === "hide", e || (e = this.__.__drawAfterFill ? 0 : 1), e;
  }
  __updateBoxBounds() {
  }
  __updateStrokeBounds() {
  }
  __updateRenderBounds() {
    if (this.__updateRectRenderBounds(), !this.__.__drawAfterFill) {
      const { renderBounds: e } = this.__layout;
      wl(on, e), super.__updateRenderBounds(), xl(e, on);
    }
  }
  __updateRectRenderBounds() {
  }
  __updateRectChange() {
  }
  __updateChange() {
    super.__updateChange(), this.__updateRectChange();
  }
  __drawPathByData(e, t) {
  }
  __renderRect(e, t) {
  }
  __renderGroup(e, t) {
  }
  __render(e, t) {
    this.__.__drawAfterFill ? this.__renderRect(e, t) : (this.__renderRect(e, t), this.__renderGroup(e, t));
  }
  __drawAfterFill(e, t) {
    e.save(), e.clip(), this.__renderGroup(e, t), e.restore(), this.__.stroke && this.__drawRenderPath(e);
  }
};
d([it(qn)], nt.prototype, "__", void 0), d([ji("show")], nt.prototype, "overflow", void 0), d([Et(Jt.__updateStrokeSpread)], nt.prototype, "__updateStrokeSpread", null), d([Et(Jt.__updateRenderSpread)], nt.prototype, "__updateRectRenderSpread", null), d([Et(Jt.__updateBoxBounds)], nt.prototype, "__updateBoxBounds", null), d([Et(Jt.__updateStrokeBounds)], nt.prototype, "__updateStrokeBounds", null), d([Et(Jt.__updateRenderBounds)], nt.prototype, "__updateRectRenderBounds", null), d([Et(Jt.__updateChange)], nt.prototype, "__updateRectChange", null), d([Et(Jt.__drawPathByData)], nt.prototype, "__drawPathByData", null), d([Et(Jt.__render)], nt.prototype, "__renderRect", null), d([Et(vl.__render)], nt.prototype, "__renderGroup", null), nt = d([Vi(), rt()], nt);
let es = class extends nt {
  get __tag() {
    return "Frame";
  }
  constructor(e) {
    super(e), this.__.fill || (this.__.fill = "#FFFFFF");
  }
};
d([it(class extends qn {
})], es.prototype, "__", void 0), d([ji("hide")], es.prototype, "overflow", void 0), es = d([rt()], es);
const { moveTo: an, closePath: hn, ellipse: Le } = me;
let ce = class extends x {
  get __tag() {
    return "Ellipse";
  }
  constructor(e) {
    super(e);
  }
  __updatePath() {
    const { width: e, height: t, innerRadius: s, startAngle: i, endAngle: r } = this.__, n = e / 2, o = t / 2, a = this.__.path = [];
    s ? i || r ? (s < 1 && Le(a, n, o, n * s, o * s, 0, i, r, !1), Le(a, n, o, n, o, 0, r, i, !0), s < 1 && hn(a)) : (s < 1 && (Le(a, n, o, n * s, o * s), an(a, e, o)), Le(a, n, o, n, o, 0, 0, 360, !0)) : i || r ? (an(a, n, o), Le(a, n, o, n, o, 0, i, r, !1), hn(a)) : Le(a, n, o, n, o);
  }
};
d([it(class extends qt {
  get __boxStroke() {
    return !0;
  }
})], ce.prototype, "__", void 0), d([kt(0)], ce.prototype, "innerRadius", void 0), d([kt(0)], ce.prototype, "startAngle", void 0), d([kt(0)], ce.prototype, "endAngle", void 0), ce = d([rt()], ce);
const { sin: bl, cos: Bl, PI: ln } = Math, { moveTo: El, lineTo: Tl, closePath: kl } = me;
let ss = class extends x {
  get __tag() {
    return "Polygon";
  }
  constructor(e) {
    super(e);
  }
  __updatePath() {
    const { width: e, height: t, sides: s } = this.__, i = e / 2, r = t / 2, n = this.__.path = [];
    El(n, i, 0);
    for (let o = 1; o < s; o++)
      Tl(n, i + i * bl(2 * o * ln / s), r - r * Bl(2 * o * ln / s));
    kl(n);
  }
};
d([it(class extends qt {
})], ss.prototype, "__", void 0), d([kt(3)], ss.prototype, "sides", void 0), ss = d([rt()], ss);
const { sin: Cl, cos: Rl, PI: dn } = Math, { moveTo: Ll, lineTo: Pl, closePath: Ol } = me;
let Ae = class extends x {
  get __tag() {
    return "Star";
  }
  constructor(e) {
    super(e);
  }
  __updatePath() {
    const { width: e, height: t, points: s, innerRadius: i } = this.__, r = e / 2, n = t / 2, o = this.__.path = [];
    Ll(o, r, 0);
    for (let a = 1; a < 2 * s; a++)
      Pl(o, r + (a % 2 == 0 ? r : r * i) * Cl(a * dn / s), n - (a % 2 == 0 ? n : n * i) * Rl(a * dn / s));
    Ol(o);
  }
};
d([it(class extends qt {
})], Ae.prototype, "__", void 0), d([kt(5)], Ae.prototype, "points", void 0), d([kt(0.382)], Ae.prototype, "innerRadius", void 0), Ae = d([rt()], Ae);
const { moveTo: Sl, lineTo: Dl } = me, { rotate: Ml, getAngle: Al, getDistance: Il, defaultPoint: cn } = O, { setPoint: Wl, addPoint: Fl, toBounds: Nl } = Mt, _i = {};
let Ie = class extends x {
  get __tag() {
    return "Line";
  }
  get toPoint() {
    if (this.__toPoint && !this.__layout.boxChanged)
      return this.__toPoint;
    const { width: e, rotation: t } = this.__, s = { x: 0, y: 0 };
    return e && (s.x = e), t && Ml(s, t), this.__toPoint = s, s;
  }
  set toPoint(e) {
    this.width = Il(cn, e), this.rotation = Al(cn, e), this.height && (this.height = 0);
  }
  constructor(e) {
    super(e);
  }
  __updatePath() {
    const e = this.__.path = [];
    Sl(e, 0, 0);
    const t = this.toPoint;
    Dl(e, t.x, t.y);
  }
  __updateBoxBounds() {
    Wl(_i, 0, 0), Fl(_i, this.__toPoint.x, this.__toPoint.y), Nl(_i, this.__layout.boxBounds);
  }
};
d([it(class extends qt {
})], Ie.prototype, "__", void 0), d([H()], Ie.prototype, "rotation", void 0), d([us("center")], Ie.prototype, "strokeAlign", void 0), Ie = d([rt()], Ie);
let is = class extends ge {
  get __tag() {
    return "Image";
  }
  get ready() {
    return !!this.image && this.image.ready;
  }
  constructor(e) {
    super(e);
  }
  __updateBoxBounds() {
    let e;
    const { url: t } = this, s = this.fill;
    s ? s.url !== t && (e = !0) : t && (e = !0), e && (this.image && (this.image = null), this.fill = { type: "image", mode: "strench", url: t }, this.once(St.LOADED, (i) => this.image = i.image)), super.__updateBoxBounds();
  }
  destroy() {
    this.image = null, super.destroy();
  }
};
d([it(Zn)], is.prototype, "__", void 0), d([H("")], is.prototype, "url", void 0), is = d([rt()], is);
let Yt = class extends ge {
  get __tag() {
    return "Canvas";
  }
  constructor(e) {
    super(e), this.canvas = $.canvas(this.__), this.context = this.canvas.context, this.__.__drawAfterFill = !0;
  }
  draw(e, t, s, i) {
    e.__layout.checkUpdate();
    const r = new ne(e.__world);
    r.invert();
    const n = new ne();
    t && n.translate(t.x, t.y), s && (typeof s == "number" ? n.scale(s) : n.scale(s.x, s.y)), i && n.rotate(i), r.preMultiply(n), e.__render(this.canvas, { matrix: r }), this.paint();
  }
  paint() {
    this.forceUpdate("fill");
  }
  __drawAfterFill(e, t) {
    const s = this.canvas.view, { width: i, height: r } = this;
    this.__.cornerRadius ? (e.save(), e.clip(), e.drawImage(this.canvas.view, 0, 0, s.width, s.height, 0, 0, i, r), e.restore()) : e.drawImage(this.canvas.view, 0, 0, s.width, s.height, 0, 0, i, r);
  }
  __updateSize() {
    const { canvas: e } = this;
    if (e) {
      const { smooth: t } = this.__;
      e.smooth !== t && (e.smooth = t), e.resize(this.__);
    }
  }
  destroy() {
    this.canvas && (this.canvas.destroy(), this.canvas = null, this.context = null), super.destroy();
  }
};
d([it(Zn)], Yt.prototype, "__", void 0), d([ts(100)], Yt.prototype, "width", void 0), d([ts(100)], Yt.prototype, "height", void 0), d([ts(R.devicePixelRatio)], Yt.prototype, "pixelRatio", void 0), d([ts(!0)], Yt.prototype, "smooth", void 0), d([Fe("all")], Yt.prototype, "hitFill", void 0), Yt = d([rt()], Yt);
const so = `>)]}%!?,.:;'"》）」〉』〗】〕｝┐＞’”！？，、。：；‰`, zl = so + "_#~&*+\\=|≮≯≈≠＝…", Ul = new RegExp([[19968, 40959], [13312, 19903], [131072, 173791], [173824, 177983], [177984, 178207], [178208, 183983], [183984, 191471], [196608, 201551], [201552, 205743], [11904, 12031], [12032, 12255], [12272, 12287], [12288, 12351], [12736, 12783], [12800, 13055], [13056, 13311], [63744, 64255], [65072, 65103], [127488, 127743], [194560, 195103]].map(([e, t]) => `[\\u${e.toString(16)}-\\u${t.toString(16)}]`).join("|"));
function gs(e) {
  const t = {};
  return e.split("").forEach((s) => t[s] = !0), t;
}
const Hl = gs("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"), Yl = gs(`{[(<'"《（「〈『〖【〔｛┌＜‘“＝¥￥＄€£￡¢￠`), jl = gs(so), Xl = gs(zl), Vl = gs("- —／～｜┆·");
var Ws;
(function(e) {
  e[e.Letter = 0] = "Letter", e[e.Single = 1] = "Single", e[e.Before = 2] = "Before", e[e.After = 3] = "After", e[e.Symbol = 4] = "Symbol", e[e.Break = 5] = "Break";
})(Ws || (Ws = {}));
const { Letter: un, Single: Gl, Before: Kl, After: ql, Symbol: Ql, Break: Zl } = Ws;
function $l(e) {
  return Hl[e] ? un : Vl[e] ? Zl : Yl[e] ? Kl : jl[e] ? ql : Xl[e] ? Ql : Ul.test(e) ? Gl : un;
}
const Jl = { trimRight(e) {
  const { words: t } = e;
  let s, i = 0, r = t.length;
  for (let n = r - 1; n > -1 && (s = t[n].data[0], s.char === " "); n--)
    i++, e.width -= s.width;
  i && t.splice(r - i, i);
} };
function td(e, t, s) {
  switch (t) {
    case "title":
      return s ? e.toUpperCase() : e;
    case "upper":
      return e.toUpperCase();
    case "lower":
      return e.toLowerCase();
    default:
      return e;
  }
}
const { trimRight: ed } = Jl, { Letter: pi, Single: $e, Before: _n, After: gi, Symbol: sd, Break: pn } = Ws;
let rs, se, lt, _e, fi, Bt, le, mt, te, yi, Je, Ne, Pi, Oi, We = [];
function mi(e, t) {
  rs.data.push({ char: e, width: t }), lt += t;
}
function Pe() {
  _e += lt, rs.width = lt, se.words.push(rs), rs = { data: [] }, lt = 0;
}
function Ps() {
  Ne && (Pi.paraNumber++, se.paraStart = !0, Ne = !1), se.width = _e, Oi.width && ed(se), We.push(se), se = { words: [] }, _e = 0;
}
const id = 0, gn = 1, fn = 2, rd = { getDrawData(e, t) {
  typeof e != "string" && (e = String(e));
  let s = 0, i = 0, { width: r, height: n, padding: o } = t;
  const { textDecoration: a, textOverflow: l, __font: c } = t;
  if (r || (r = 0), o) {
    const [h, p, _, g] = Ye.fourNumber(o);
    r && (s = g, r -= p + g), n && (i = h, n -= h + _);
  }
  const u = { bounds: { x: s, y: i, width: r, height: n }, rows: [], paraNumber: 0, font: R.canvas.font = c };
  return function(h, p, _) {
    Pi = h, We = h.rows, Oi = h.bounds;
    const { __letterSpacing: g, paraIndent: m, textCase: f } = _, { canvas: b } = R, { width: E, height: y } = Oi;
    if (E || y || g || f !== "none") {
      Ne = !0, te = null, lt = _e = 0, rs = { data: [] }, se = { words: [] };
      for (let w = 0, B = p.length; w < B; w++)
        Bt = p[w], Bt === `
` ? (lt && Pe(), se.paraEnd = !0, Ps(), Ne = !0) : (mt = $l(Bt), mt === pi && f !== "none" && (Bt = td(Bt, f, !lt)), le = b.measureText(Bt).width, g && (le += g), yi = mt === $e && (te === $e || te === pi) || te === $e && mt !== gi, Je = !(mt !== _n && mt !== $e || te !== sd && te !== gi), fi = Ne && m ? E - m : E, E && _e + lt + le > fi && (Je || (Je = mt === pi && te == gi), (yi || Je || mt === pn || mt === _n || mt === $e || lt + le > fi) && lt && Pe(), Ps()), Bt === " " && Ne !== !0 && _e + lt === 0 || (mt === pn ? (Bt === " " && lt && Pe(), mi(Bt, le), Pe()) : ((yi || Je) && lt && Pe(), mi(Bt, le))), te = mt);
      lt && Pe(), _e && Ps(), We.length > 0 && (We[We.length - 1].paraEnd = !0);
    } else
      p.split(`
`).forEach((w) => {
        Pi.paraNumber++, We.push({ x: m || 0, text: w, width: b.measureText(w).width, paraStart: !0 });
      });
  }(u, e, t), function(h, p) {
    const { rows: _, bounds: g } = h, { __lineHeight: m, __baseLine: f, textAlign: b, verticalAlign: E, paraSpacing: y, textOverflow: w } = p;
    let B, { x: T, y: k, width: L, height: I } = g, z = m * _.length + (y ? y * (h.paraNumber - 1) : 0), F = f;
    if (I) {
      if (w !== "show" && z > I)
        z = Math.max(I, m), h.overflow = _.length;
      else
        switch (E) {
          case "middle":
            k += (I - z) / 2;
            break;
          case "bottom":
            k += I - z;
        }
      F += k;
    }
    for (let Y = 0, Q = _.length; Y < Q; Y++) {
      switch (B = _[Y], B.x = T, b) {
        case "center":
          B.x += (L - B.width) / 2;
          break;
        case "right":
          B.x += L - B.width;
      }
      B.paraStart && y && Y > 0 && (F += y), B.y = F, F += m, h.overflow > Y && F > z && (B.isOverflow = !0, h.overflow = Y + 1), B.width > g.width && (g.width = B.width);
    }
    g.y = k, g.height = z;
  }(u, t), function(h, p, _, g) {
    const { rows: m } = h, { textAlign: f, paraIndent: b, letterSpacing: E } = p;
    let y, w, B, T, k;
    m.forEach((L) => {
      L.words && (B = b && L.paraStart ? b : 0, w = _ && f === "justify" && L.words.length > 1 ? (_ - L.width - B) / (L.words.length - 1) : 0, T = E || L.isOverflow ? id : w > 0.01 ? gn : fn, T === fn ? (L.text = "", L.x += B, L.words.forEach((I) => {
        I.data.forEach((z) => {
          L.text += z.char;
        });
      })) : (L.x += B, y = L.x, L.data = [], L.words.forEach((I) => {
        T === gn ? (k = { char: "", x: y }, y = function(z, F, Y) {
          return z.forEach((Q) => {
            Y.char += Q.char, F += Q.width;
          }), F;
        }(I.data, y, k), k.char !== " " && L.data.push(k)) : y = function(z, F, Y) {
          return z.forEach((Q) => {
            Q.char !== " " && (Q.x = F, Y.push(Q)), F += Q.width;
          }), F;
        }(I.data, y, L.data), !L.paraEnd && w && (y += w, L.width += w);
      })), L.words = null);
    });
  }(u, t, r), u.overflow && function(h, p) {
    const { rows: _, overflow: g } = h;
    if (_.splice(g), p !== "hide") {
      p === "ellipsis" && (p = "...");
      const m = R.canvas.measureText(p).width, f = _[g - 1];
      let b, E, y = f.data.length - 1;
      const { x: w, width: B } = h.bounds, T = w + B - m;
      for (let k = y; k > -1 && (b = f.data[k], E = b.x + b.width, !(k === y && E < T)); k--) {
        if (E < T && b.char !== " ") {
          f.data.splice(k + 1), f.width -= b.width;
          break;
        }
        f.width -= b.width;
      }
      f.width += m, f.data.push({ char: p, x: E });
    }
  }(u, l), a !== "none" && function(h, p) {
    const { fontSize: _ } = p;
    switch (h.decorationHeight = _ / 11, p.textDecoration) {
      case "under":
        h.decorationY = 0.15 * _;
        break;
      case "delete":
        h.decorationY = 0.35 * -_;
    }
  }(u, t), u;
} }, { copyAndSpread: nd, includes: od, spread: ad } = P;
let X = class extends x {
  get __tag() {
    return "Text";
  }
  get textDrawData() {
    return this.__layout.checkUpdate(), this.__.__textDrawData;
  }
  constructor(e) {
    super(e);
  }
  __drawHitPath(e) {
    const { __lineHeight: t, __baseLine: s, __textDrawData: i } = this.__;
    e.beginPath(), i.rows.forEach((r) => e.rect(r.x, r.y - s, r.width, t));
  }
  __drawPathByData(e, t) {
    const { x: s, y: i, width: r, height: n } = this.__layout.boxBounds;
    e.rect(s, i, r, n);
  }
  __drawRenderPath(e) {
    e.font = this.__.__font;
  }
  __updateTextDrawData() {
    const e = this.__;
    e.__textDrawData = rd.getDrawData(e.text, this.__);
  }
  __updateBoxBounds() {
    const e = this.__, t = this.__layout, { width: s, height: i, lineHeight: r, letterSpacing: n, fontFamily: o, fontSize: a, fontWeight: l, italic: c, textCase: u } = e;
    e.__lineHeight = nn.number(r, a), e.__letterSpacing = nn.number(n, a), e.__baseLine = e.__lineHeight - (e.__lineHeight - 0.7 * a) / 2, e.__font = `${c ? "italic " : ""}${u === "small-caps" ? "small-caps " : ""}${l !== "normal" ? l + " " : ""}${a}px ${o}`, this.__updateTextDrawData();
    const { bounds: h } = e.__textDrawData, p = t.boxBounds;
    e.__lineHeight < a && ad(h, a / 2), s && i ? super.__updateBoxBounds() : (p.x = s ? 0 : h.x, p.y = i ? 0 : h.y, p.width = s || h.width, p.height = i || h.height);
    const _ = od(p, h) ? p : h;
    _ !== t.contentBounds && (t.contentBounds = _, t.renderChanged = !0);
  }
  __updateRenderSpread() {
    let e = super.__updateRenderSpread();
    return e || (e = this.__layout.boxBounds === this.__layout.contentBounds ? 0 : 1), e;
  }
  __updateRenderBounds() {
    nd(this.__layout.renderBounds, this.__layout.contentBounds, this.__layout.renderSpread);
  }
};
d([it(class extends qt {
  setFontWeight(e) {
    typeof e == "string" ? (this.__setInput("fontWeight", e), this._fontWeight = ml[e] || 400) : (this.__input && this.__removeInput("fontWeight"), this._fontWeight = e);
  }
})], X.prototype, "__", void 0), d([H(0)], X.prototype, "width", void 0), d([H(0)], X.prototype, "height", void 0), d([H(0)], X.prototype, "padding", void 0), d([us("outside")], X.prototype, "strokeAlign", void 0), d([H("")], X.prototype, "text", void 0), d([H("L")], X.prototype, "fontFamily", void 0), d([H(12)], X.prototype, "fontSize", void 0), d([H("normal")], X.prototype, "fontWeight", void 0), d([H(!1)], X.prototype, "italic", void 0), d([H("none")], X.prototype, "textCase", void 0), d([H("none")], X.prototype, "textDecoration", void 0), d([H(0)], X.prototype, "letterSpacing", void 0), d([H({ type: "percent", value: 150 })], X.prototype, "lineHeight", void 0), d([H(0)], X.prototype, "paraIndent", void 0), d([H(0)], X.prototype, "paraSpacing", void 0), d([H("left")], X.prototype, "textAlign", void 0), d([H("top")], X.prototype, "verticalAlign", void 0), d([H("show")], X.prototype, "textOverflow", void 0), X = d([rt()], X);
const { toBounds: hd } = Hi;
let ee = class extends x {
  get __tag() {
    return "Path";
  }
  constructor(e) {
    super(e);
  }
  __updateBoxBounds() {
    hd(this.__.path, this.__layout.boxBounds);
  }
};
d([it(class extends qt {
  setPath(e) {
    typeof e == "string" ? (this.__setInput("path", e), this._path = yl(e)) : (this.__input && this.__removeInput("path"), this._path = e);
  }
})], ee.prototype, "__", void 0), d([kt()], ee.prototype, "path", void 0), d([kt()], ee.prototype, "windingRule", void 0), d([us("center")], ee.prototype, "strokeAlign", void 0), ee = d([rt()], ee);
let ns = class extends re {
  get __tag() {
    return "Pen";
  }
  constructor(e) {
    super(e);
  }
  setStyle(e) {
    const t = this.pathElement = new ee(e);
    return this.pathStyle = e, this.path = t.path || (t.path = []), this.add(t), this;
  }
  beginPath() {
    return this.path.length = 0, this.paint(), this;
  }
  moveTo(e, t) {
    return this;
  }
  lineTo(e, t) {
    return this;
  }
  bezierCurveTo(e, t, s, i, r, n) {
    return this;
  }
  quadraticCurveTo(e, t, s, i) {
    return this;
  }
  closePath() {
    return this;
  }
  rect(e, t, s, i) {
    return this;
  }
  roundRect(e, t, s, i, r) {
    return this;
  }
  ellipse(e, t, s, i, r, n, o, a) {
    return this;
  }
  arc(e, t, s, i, r, n) {
    return this;
  }
  arcTo(e, t, s, i, r) {
    return this;
  }
  moveToEllipse(e, t, s, i, r, n, o, a) {
    return this;
  }
  moveToArc(e, t, s, i, r, n) {
    return this;
  }
  paint() {
    this.pathElement.forceUpdate("path");
  }
};
d([it(class extends Ns {
})], ns.prototype, "__", void 0), ns = d([ot(Ui, ["beginPath"]), rt()], ns);
const ld = W.get("Leafer");
let pe = class extends re {
  get __tag() {
    return "Leafer";
  }
  get isApp() {
    return !1;
  }
  get viewLoaded() {
    return this.viewReady && !this.watcher.changed && this.imageManager.tasker.isComplete;
  }
  constructor(e, t) {
    super(t), this.zoomLayer = this, this.moveLayer = this, this.config = { type: "design", start: !0, hittable: !0, smooth: !0, zoom: { min: 0.02, max: 256 }, move: { dragOut: !0, autoDistance: 2 } }, this.__eventIds = [], this.__controllers = [], this.userConfig = e, e && (e.view || e.width) && this.init(e);
  }
  init(e, t) {
    if (this.canvas)
      return;
    let s;
    this.__setLeafer(this), e && J.assign(this.config, e);
    const { config: i } = this;
    He.run(i.type, this), this.canvas = $.canvas(i), this.__controllers.push(this.renderer = $.renderer(this, this.canvas, i), this.watcher = $.watcher(this, i), this.layouter = $.layouter(this, i)), this.isApp && this.__setApp(), this.__checkAutoLayout(i), this.view = this.canvas.view, t ? (this.__bindApp(t), s = t.running) : (this.selector = $.selector(this), this.__controllers.unshift(this.interaction = $.interaction(this, this.canvas, this.selector, i)), this.canvasManager = new Mi(), this.hitCanvasManager = new wn(), this.imageManager = new Un(this, i), s = i.start), this.hittable = i.hittable, this.fill = i.fill, this.canvasManager.add(this.canvas), this.__listenEvents(), s && (this.__startTimer = setTimeout(this.start.bind(this))), Ue.onLeafer(this);
  }
  start() {
    clearTimeout(this.__startTimer), !this.running && this.canvas && (this.ready ? this.emitLeafer(q.RESTART) : this.emitLeafer(q.START), this.__controllers.forEach((e) => e.start()), this.isApp || this.renderer.render(), this.running = !0);
  }
  stop() {
    clearTimeout(this.__startTimer), this.running && this.canvas && (this.__controllers.forEach((e) => e.stop()), this.running = !1, this.emitLeafer(q.STOP));
  }
  resize(e) {
    const t = J.copyAttrs({}, e, Ot);
    Object.keys(t).forEach((s) => this[s] = t[s]);
  }
  forceLayout() {
    this.__layout.checkUpdate(!0);
  }
  forceFullRender() {
    this.renderer.addBlock(this.canvas.bounds), this.viewReady && this.renderer.update();
  }
  __doResize(e) {
    if (!this.canvas || this.canvas.isSameSize(e))
      return;
    const t = J.copyAttrs({}, this.canvas, Ot);
    this.canvas.resize(e), this.__onResize(new ae(e, t));
  }
  __onResize(e) {
    this.emitEvent(e), J.copyAttrs(this.__, e, Ot), setTimeout(() => {
      this.canvasManager && this.canvasManager.clearRecycled();
    }, 0);
  }
  __setApp() {
  }
  __bindApp(e) {
    this.selector = e.selector, this.interaction = e.interaction, this.canvasManager = e.canvasManager, this.hitCanvasManager = e.hitCanvasManager, this.imageManager = e.imageManager;
  }
  __setLeafer(e) {
    this.leafer = e, this.isLeafer = !!e, this.__level = 1;
  }
  setZoomLayer(e, t) {
    this.zoomLayer = e, this.moveLayer = t || e;
  }
  waitViewLoaded(e) {
    let t;
    const s = () => {
      this.viewLoaded && (t && this.off_(t), R.requestRender(e));
    };
    this.running || this.start(), s(), this.viewLoaded || (t = this.on_(G.AFTER, s));
  }
  __checkAutoLayout(e) {
    e.width && e.height || (this.autoLayout = new yn(e), this.canvas.startAutoLayout(this.autoLayout, this.__onResize.bind(this)));
  }
  __setAttr(e, t) {
    this.canvas && (Ot.includes(e) ? this.__changeCanvasSize(e, t) : e === "fill" ? this.__changeFill(t) : e === "hittable" && (this.canvas.hittable = t)), super.__setAttr(e, t);
  }
  __getAttr(e) {
    return this.canvas && Ot.includes(e) ? this.canvas[e] : super.__getAttr(e);
  }
  __changeCanvasSize(e, t) {
    const s = J.copyAttrs({}, this.canvas, Ot);
    s[e] = this.config[e] = t, t && this.canvas.stopAutoLayout(), this.__doResize(s);
  }
  __changeFill(e) {
    this.config.fill = e, this.canvas.allowBackgroundColor ? this.canvas.backgroundColor = e : this.forceFullRender();
  }
  __onReady() {
    this.ready || (this.ready = !0, this.emitLeafer(q.BEFORE_READY), this.emitLeafer(q.READY), this.emitLeafer(q.AFTER_READY));
  }
  __onViewReady() {
    this.viewReady || (this.viewReady = !0, this.emitLeafer(q.VIEW_READY));
  }
  __checkUpdateLayout() {
    this.__layout.checkUpdate();
  }
  emitLeafer(e) {
    this.emitEvent(new q(e, this));
  }
  __listenEvents() {
    const e = at.start("FirstCreate " + this.innerName);
    this.once(q.START, () => at.end(e)), this.once(A.END, () => this.__onReady()), this.once(G.END, () => this.__onViewReady()), this.on(A.CHECK_UPDATE, () => this.__checkUpdateLayout());
  }
  __removeListenEvents() {
    this.off_(this.__eventIds);
  }
  destroy() {
    if (this.canvas)
      try {
        this.stop(), this.emitEvent(new q(q.END, this)), this.__removeListenEvents(), this.__controllers.forEach((e) => e.destroy()), this.__controllers.length = 0, this.selector.destroy(), this.canvasManager.destroy(), this.hitCanvasManager.destroy(), this.imageManager.destroy(), this.canvas.destroy(), this.canvas = null, this.config = this.userConfig = this.view = null, super.destroy();
      } catch (e) {
        ld.error(e);
      }
  }
};
d([it(class extends Ns {
})], pe.prototype, "__", void 0), d([H()], pe.prototype, "pixelRatio", void 0), pe = d([rt()], pe);
let Si = class extends pe {
  constructor() {
    super(...arguments), this.children = [];
  }
  get __tag() {
    return "App";
  }
  get isApp() {
    return !0;
  }
  __setApp() {
    const { canvas: e } = this, { realCanvas: t, view: s } = this.config;
    t || s === this.canvas.view || !e.parentView ? this.realCanvas = !0 : e.unrealCanvas(), this.leafer = this, this.watcher.disable(), this.layouter.disable(), this.__eventIds.push(this.on_(ze.CHANGE, () => {
      W.showHitView && this.children.forEach((i) => {
        i.forceUpdate("blendMode");
      });
    }));
  }
  start() {
    super.start(), this.children.forEach((e) => {
      e.start();
    });
  }
  stop() {
    this.children.forEach((e) => {
      e.stop();
    }), super.stop();
  }
  addLeafer(e) {
    const t = new pe(e);
    return this.add(t), t;
  }
  add(e) {
    e.view || e.init(this.__getChildConfig(e.userConfig), this), super.add(e), e.once(A.END, () => {
      !this.ready && this.children.every((t) => t.ready) && this.__onReady();
    }), e.once(G.END, () => {
      !this.viewReady && this.children.every((t) => t.viewReady) && this.__onViewReady();
    }), this.realCanvas && this.__eventIds.push(e.on_(G.END, this.__onChildRenderEnd, this));
  }
  waitViewLoaded(e) {
    const t = () => {
      this.children.every((s) => s.viewLoaded) && R.requestRender(e);
    };
    this.children.forEach((s) => {
      s.waitViewLoaded(t);
    }), this.running || this.start();
  }
  __onChildRenderEnd(e) {
    this.renderer.addBlock(e.renderBounds), this.viewReady && this.renderer.update();
  }
  __render(e, t) {
    this.children.forEach((s) => {
      e.copyWorld(s.canvas);
    });
  }
  __onResize(e) {
    this.children.forEach((t) => {
      t.resize(e);
    }), super.__onResize(e);
  }
  __checkUpdateLayout() {
    this.children.forEach((e) => {
      e.__layout.checkUpdate();
    });
  }
  __getChildConfig(e) {
    let t = Object.assign({}, this.config);
    return t.hittable = t.realCanvas = void 0, e && J.assign(t, e), this.autoLayout && J.copyAttrs(t, this, Ot), t.view = this.realCanvas ? void 0 : this.view, t.fill = void 0, t;
  }
  destroy() {
    this.children.forEach((e) => {
      e.destroy();
    }), this.children.length = 0, super.destroy();
  }
};
Si = d([rt()], Si);
var dd = Object.freeze({ __proto__: null, Animate: Xh, AnimateEvent: Gi, get App() {
  return Si;
}, AutoBounds: yn, BezierHelper: fe, Bounds: et, BoundsHelper: P, get Box() {
  return nt;
}, get Branch() {
  return As;
}, BranchHelper: _s, BranchRender: Nn, get Canvas() {
  return Yt;
}, CanvasManager: Mi, ChildEvent: At, Creator: $, DataHelper: J, Debug: W, get DragEvent() {
  return V;
}, get DropEvent() {
  return Vt;
}, Effect: Is, get Ellipse() {
  return ce;
}, EllipseHelper: Tn, Event: xt, EventCreator: ds, Export: Kn, FileHelper: Ii, get Frame() {
  return es;
}, get Group() {
  return re;
}, HitCanvasManager: wn, get Image() {
  return is;
}, ImageEvent: St, ImageManager: Un, IncrementId: Gt, Interaction: Vn, get KeyEvent() {
  return De;
}, Keyboard: ye, LayoutEvent: A, Layouter: hs, get Leaf() {
  return as;
}, LeafBounds: An, LeafBoundsHelper: Ki, LeafData: Ai, LeafDataProxy: Dn, LeafEventer: Sn, LeafHelper: Ct, LeafHit: In, LeafLevelList: vn, LeafList: tt, LeafMask: Fn, LeafMatrix: Mn, LeafRender: Wn, get Leafer() {
  return pe;
}, LeaferCanvas: ki, LeaferCanvasBase: bn, LeaferEvent: q, LeaferImage: Ti, LeaferImageBase: Ti, LeaferTypeCreator: He, get Line() {
  return Ie;
}, MathHelper: Ye, Matrix: ne, MatrixHelper: S, get MoveEvent() {
  return pt;
}, NeedConvertToCanvasCommandMap: Wi, OneRadian: M, PI2: vt, PI_2: Oe, Paint: Z, get Path() {
  return ee;
}, PathBounds: Hi, PathCommandDataHelper: me, PathCommandMap: dt, PathConvert: oe, PathCorner: Cn, PathCreator: Ui, PathDrawer: kn, PathHelper: Tt, PathNumberCommandLengthMap: Ni, PathNumberCommandMap: Fi, get Pen() {
  return ns;
}, Platform: R, PluginManager: Ue, Point: Di, PointHelper: O, PointerButton: Xt, get PointerEvent() {
  return C;
}, get Polygon() {
  return ss;
}, PropertyEvent: ze, get Rect() {
  return ge;
}, RectHelper: zi, RectRender: eo, RenderEvent: G, Renderer: Yn, ResizeEvent: ae, get RotateEvent() {
  return jt;
}, Run: at, Selector: jn, get Star() {
  return Ae;
}, StringNumberMap: mn, get SwipeEvent() {
  return wt;
}, TaskItem: Ds, TaskProcessor: Qi, get Text() {
  return X;
}, TransformEvent: de, TwoPointBounds: uo, TwoPointBoundsHelper: Mt, get UI() {
  return x;
}, UIBounds: $n, UICreator: Fs, UIEvent: ps, UIHit: Jn, UIRender: to, WaitHelper: qi, WatchEvent: ie, Watcher: Hn, get ZoomEvent() {
  return Dt;
}, affectRenderBoundsType: ji, affectStrokeBoundsType: us, aliasType: Za, boundsType: H, canvasPatch: vi, canvasSizeAttrs: Ot, dataProcessor: it, dataType: Se, defineDataProcessor: Xi, defineKey: cs, defineLeafAttr: st, effectType: Me, eraserType: Pn, getDescriptor: Yi, hitType: Fe, layoutProcessor: $a, maskType: Ln, opacityType: Bi, pathType: kt, positionType: wi, registerUI: rt, registerUIEvent: Kt, resizeType: ts, rewrite: Et, rewriteAble: Vi, rotationType: Os, scaleType: xi, setDefaultValue: Ja, sortType: Rn, strokeType: Pt, surfaceType: bi, useCanvas: Gn, useModule: ot, usePlugin: vh });
Ue.power = dd, Gn();
class cd {
  constructor(t, s) {
    this.isDrawing = !1, this.config = s, this.canvas = t, this.pen = new ns(), this.canvas.add(this.pen), this.startDrawing(), this.continueDrawing(), this.stopDrawing();
  }
  /**
   * Starts the drawing process.
   *
   * @private
   */
  startDrawing() {
    this.canvas.on(C.DOWN, (t) => {
      this.isDrawing = !0, this.pen.setStyle({
        stroke: this.config.config.stroke ? this.config.config.stroke : "red",
        strokeWidth: this.config.config.strokeWidth ? this.config.config.strokeWidth : 2,
        opacity: this.config.config.penOpacity ? this.config.config.penOpacity : 1
      }), this.pen.moveTo(t.x, t.y);
    });
  }
  /**
   * Continues the drawing process.
   *
   * @param {PointerEvent} event - The pointer event object.
   * @return {void} This function does not return anything.
   */
  continueDrawing() {
    this.canvas.on(C.OVER, (t) => {
      this.isDrawing && (this.pen.lineTo(t.x, t.y), this.pen.paint());
    });
  }
  /**
   * Stops the drawing process when the pointer is released.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  stopDrawing() {
    this.canvas.on(C.OUT, (t) => {
      console.log("up");
    });
  }
  /**
   * Clears the signature canvas.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  clearSignature() {
    this.pen.removeAll();
  }
  /**
   * Downloads an image by exporting the signature as a PNG file.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  downLoadImg() {
    this.pen.export("signature.png");
  }
  /**
   * Converts the current data to a file format.
   *
   * @return {Promise} A promise that resolves with the data of the file.
   */
  toFile() {
    return new Promise((t, s) => {
      this.pen.export("png", !0).then((i) => {
        console.log(i), t(i.data);
      }).catch((i) => {
        s(i);
      });
    });
  }
  /**
   * Converts the image to base64 format.
   *
   * @param {number} quality - The quality of the image. Optional.
   * @return {Promise<string>} A promise that resolves to the base64 representation of the image.
   */
  toBase64(t) {
    return new Promise((s, i) => {
      this.pen.export("jpg", t).then((r) => {
        s(r.data);
      }).catch((r) => {
        i(r);
      });
    });
  }
  /**
   * Undoes the last stroke in the signature.
   *
   * @return {void} No return value.
   */
  undo() {
    this.pen.children.pop(), this.canvas.forceFullRender();
  }
}
const ud = {
  importVersion: "1.0.0-beta.8",
  import: ["LeaferTypeCreator"],
  config: {},
  LeaferUI: {},
  borad: {},
  /**
   * A description of the entire function.
   *
   * @param {IObject} LeaferUI - description of parameter
   * @param {Iconfig} config - description of parameter
   * @return {void} description of return value
   */
  run(e, t) {
    this.config = t, this.LeaferUI = e, console.log("run", e);
  },
  /**
   * Asynchronously handles the "onLeafer" event.
   *
   * @param {ILeafer} leafer - The leafer object.
   * @return {void} - A promise that resolves when the function completes.
   */
  onLeafer(e) {
    console.log(e, "onLeafer"), this.borad = new cd(e, this.config);
  },
  undo() {
    this.borad.undo();
  },
  clear() {
    this.borad.clearSignature();
  },
  downLoadImg() {
    this.borad.downLoadImg();
  },
  toBase64() {
    this.borad.toBase64();
  },
  toFile() {
    this.borad.toFile();
  }
};
console.log("singature", ud);
export {
  ud as Signature
};
//# sourceMappingURL=leafer-signature-plugin.js.map
