import{a as de,t as ve}from"../chunks/disclose-version.CKFsFc0v.js";import{I as Z,ab as _e,ac as pe,ad as ge,ae as fe,p as he,t as ye,a as we,N as r,af as c,h as e,s as o,c as ae,r as re}from"../chunks/runtime.C-JL9AE_.js";import{d as be}from"../chunks/events.Egb-Lb1-.js";import{i as Ie}from"../chunks/lifecycle.DYJwRUjt.js";let le=!1;function ce(){le||(le=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var l;if(!t.defaultPrevented)for(const i of t.target.elements)(l=i.__on_r)==null||l.call(i)})},{capture:!0}))}function n(t){if(Z){var l=!1,i=()=>{if(!l){if(l=!0,t.hasAttribute("value")){var u=t.value;se(t,"value",null),t.value=u}if(t.hasAttribute("checked")){var s=t.checked;se(t,"checked",null),t.checked=s}}};t.__on_r=i,_e(i),ce()}}function se(t,l,i,u){var s=t.__attributes??(t.__attributes={});Z&&(s[l]=t.getAttribute(l),l==="src"||l==="srcset"||l==="href"&&t.nodeName==="LINK")||s[l]!==(s[l]=i)&&(l==="loading"&&(t[pe]=i),t.removeAttribute(l))}function ke(t,l,i,u=i){t.addEventListener(l,i);const s=t.__on_r;s?t.__on_r=()=>{s(),u()}:t.__on_r=u,ce()}function m(t,l,i=l){var u=ge();ke(t,"input",()=>{var s=ie(t)?oe(t.value):t.value;i(s),u&&s!==(s=l())&&(t.value=s??"")}),fe(()=>{var s=l();if(Z&&t.defaultValue!==t.value){i(t.value);return}ie(t)&&s===oe(t.value)||t.type==="date"&&!s&&!t.value||(t.value=s??"")})}function ie(t){var l=t.type;return l==="number"||l==="range"}function oe(t){return t===""?null:+t}function Ae(t,l,i,u,s,d,v,_,p,g,f,h,y,w,b,I,k,A,C,L,N,P){r(l,""),r(i,""),r(u,""),r(s,""),r(d,""),r(v,""),r(_,""),r(p,""),r(g,""),r(f,""),r(h,""),r(y,""),r(w,""),r(b,""),r(I,""),r(k,""),r(A,""),r(C,""),r(L,""),r(N,""),r(P,"")}function Ce(t,l,i){if(l()){let s=`/my-categories/game/?game=${i().toString()}`;window.location.href=s}}var Le=ve('<div class="root svelte-1dtw4m0"><div class="container svelte-1dtw4m0"><h1>Build your connections game here</h1> <h3 class="svelte-1dtw4m0">title</h3> <input class="category svelte-1dtw4m0" placeholder="Title"> <h3 class="svelte-1dtw4m0">yellow</h3> <input class="category svelte-1dtw4m0" placeholder="Category 1"> <input class="item svelte-1dtw4m0" placeholder="Item 1"> <input class="item svelte-1dtw4m0" placeholder="Item 1"> <input class="item svelte-1dtw4m0" placeholder="Item 2"> <input class="item svelte-1dtw4m0" placeholder="Item 3"> <br> <h3 class="svelte-1dtw4m0">green</h3> <input class="category svelte-1dtw4m0" placeholder="Category 1"> <input class="item svelte-1dtw4m0" placeholder="Item 1"> <input class="item svelte-1dtw4m0" placeholder="Item 1"> <input class="item svelte-1dtw4m0" placeholder="Item 2"> <input class="item svelte-1dtw4m0" placeholder="Item 3"> <br> <h3 class="svelte-1dtw4m0">blue</h3> <input class="category svelte-1dtw4m0" placeholder="Category 1"> <input class="item svelte-1dtw4m0" placeholder="Item 1"> <input class="item svelte-1dtw4m0" placeholder="Item 1"> <input class="item svelte-1dtw4m0" placeholder="Item 2"> <input class="item svelte-1dtw4m0" placeholder="Item 3"> <br> <h3 class="svelte-1dtw4m0">purple</h3> <input class="category svelte-1dtw4m0" placeholder="Category 1"> <input class="item svelte-1dtw4m0" placeholder="Item 1"> <input class="item svelte-1dtw4m0" placeholder="Item 1"> <input class="item svelte-1dtw4m0" placeholder="Item 2"> <input class="item svelte-1dtw4m0" placeholder="Item 3"> <button>Play</button> <button>Clear</button></div></div>');function Oe(t,l){he(l,!1);let i=c(""),u=c("Things cats do"),s=c("knead"),d=c("purr"),v=c("scratch"),_=c("shed"),p=c("pages on a website"),g=c("about"),f=c("contact"),h=c("home"),y=c("login"),w=c("turn tail"),b=c("flee"),I=c("leave"),k=c("retreat"),A=c("withdraw"),C=c("___ cheese"),L=c("cottage"),N=c("cream"),P=c("goat"),T=c("string");function ne(){return{title:e(i),category1:{name:e(u),items:[e(s),e(d),e(v),e(_)]},category2:{name:e(p),items:[e(g),e(f),e(h),e(y)]},category3:{name:e(w),items:[e(b),e(I),e(k),e(A)]},category4:{name:e(C),items:[e(L),e(N),e(P),e(T)]}}}function ee(){return e(i)&&e(u)&&e(p)&&e(w)&&e(C)&&e(s)&&e(d)&&e(v)&&e(_)&&e(g)&&e(f)&&e(h)&&e(y)&&e(b)&&e(I)&&e(k)&&e(A)&&e(L)&&e(N)&&e(P)&&e(T)}function me(){let a=JSON.stringify(ne());return btoa(a)}Ie();var G=Le(),te=ae(G),O=o(ae(te),4);n(O);var S=o(O,4);n(S);var B=o(S,2);n(B);var E=o(B,2);n(E);var V=o(E,2);n(V);var j=o(V,2);n(j);var q=o(j,6);n(q);var x=o(q,2);n(x);var D=o(x,2);n(D);var J=o(D,2);n(J);var K=o(J,2);n(K);var M=o(K,6);n(M);var R=o(M,2);n(R);var U=o(R,2);n(U);var Y=o(U,2);n(Y);var $=o(Y,2);n($);var z=o($,6);n(z);var F=o(z,2);n(F);var H=o(F,2);n(H);var Q=o(H,2);n(Q);var W=o(Q,2);n(W);var X=o(W,2);ye(()=>X.disabled=!ee()),X.__click=[Ce,ee,me];var ue=o(X,2);ue.__click=[Ae,i,u,p,w,C,s,d,v,_,g,f,h,y,b,I,k,A,L,N,P,T],re(te),re(G),m(O,()=>e(i),a=>r(i,a)),m(S,()=>e(u),a=>r(u,a)),m(B,()=>e(s),a=>r(s,a)),m(E,()=>e(d),a=>r(d,a)),m(V,()=>e(v),a=>r(v,a)),m(j,()=>e(_),a=>r(_,a)),m(q,()=>e(p),a=>r(p,a)),m(x,()=>e(g),a=>r(g,a)),m(D,()=>e(f),a=>r(f,a)),m(J,()=>e(h),a=>r(h,a)),m(K,()=>e(y),a=>r(y,a)),m(M,()=>e(w),a=>r(w,a)),m(R,()=>e(b),a=>r(b,a)),m(U,()=>e(I),a=>r(I,a)),m(Y,()=>e(k),a=>r(k,a)),m($,()=>e(A),a=>r(A,a)),m(z,()=>e(C),a=>r(C,a)),m(F,()=>e(L),a=>r(L,a)),m(H,()=>e(N),a=>r(N,a)),m(Q,()=>e(P),a=>r(P,a)),m(W,()=>e(T),a=>r(T,a)),de(t,G),we()}be(["click"]);export{Oe as component};
