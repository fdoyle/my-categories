import{x as m,y as I,H as L,z as S,A as p,B as h,C as N,D as H,w as _,F as O,G as V,I as b,J as C,K as M,L as Y,M as $,n as k,p as z,v as w,N as B,a as F,d as G}from"./runtime.CYuBARcl.js";import{a as J,r as R,h as v}from"./events.BZuoxORW.js";import{b as K}from"./disclose-version.DrqLgsy6.js";const P=["touchstart","touchmove"];function W(t){return P.includes(t)}function X(t,e){e!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=e,t.nodeValue=e==null?"":e+"")}function j(t,e){return A(t,e)}function Z(t,e){m(),e.intro=e.intro??!1;const d=e.target,u=w,l=_;try{for(var r=I(d);r&&(r.nodeType!==8||r.data!==L);)r=S(r);if(!r)throw p;h(!0),N(r),H();const i=A(t,{...e,anchor:r});if(_===null||_.nodeType!==8||_.data!==O)throw V(),p;return h(!1),i}catch(i){if(i===p)return e.recover===!1&&b(),m(),C(d),h(!1),j(t,e);throw i}finally{h(u),N(l)}}const o=new Map;function A(t,{target:e,anchor:d,props:u={},events:l,context:r,intro:i=!0}){m();var y=new Set,g=n=>{for(var a=0;a<n.length;a++){var s=n[a];if(!y.has(s)){y.add(s);var f=W(s);e.addEventListener(s,v,{passive:f});var T=o.get(s);T===void 0?(document.addEventListener(s,v,{passive:f}),o.set(s,1)):o.set(s,T+1)}}};g(M(J)),R.add(g);var c=void 0,D=Y(()=>{var n=d??e.appendChild($());return k(()=>{if(r){z({});var a=G;a.c=r}l&&(u.$$events=l),w&&K(n,null),c=t(n,u)||{},w&&(B.nodes_end=_),r&&F()}),()=>{var f;for(var a of y){e.removeEventListener(a,v);var s=o.get(a);--s===0?(document.removeEventListener(a,v),o.delete(a)):o.set(a,s)}R.delete(g),E.delete(c),n!==d&&((f=n.parentNode)==null||f.removeChild(n))}});return E.set(c,D),c}let E=new WeakMap;function x(t){const e=E.get(t);e&&e()}export{Z as h,j as m,X as s,x as u};
