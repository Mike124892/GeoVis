/*! For license information please see createVectorTilePolylines.js.LICENSE.txt */
import{a as K}from"./chunk-BHWELPB4.js";import{a as G}from"./chunk-PT6JDBLV.js";import{a as S}from"./chunk-YNTFMT6T.js";import{c as B,h as R}from"./chunk-URXUHQWZ.js";import"./chunk-2ZKHVIZO.js";import{a as t,b as _,d as L}from"./chunk-H26ARMDM.js";import{a as F}from"./chunk-KROATL7C.js";import"./chunk-6A4YVUYV.js";import"./chunk-IPTRD2UF.js";import"./chunk-WF3Q7FOG.js";import"./chunk-NERDVOKQ.js";import"./chunk-4ACNSQDC.js";var O=32767,ct=new _,rt=new t;function it(e,r,a,n,u){let o=e.length/3,s=e.subarray(0,o),f=e.subarray(o,2*o),i=e.subarray(2*o,3*o);G.zigZagDeltaDecode(s,f,i);let c=new Float64Array(e.length);for(let e=0;e<o;++e){let o=s[e],p=f[e],l=i[e],d=F.lerp(r.west,r.east,o/O),h=F.lerp(r.south,r.north,p/O),k=F.lerp(a,n,l/O),b=_.fromRadians(d,h,k,ct),m=u.cartographicToCartesian(b,rt);t.pack(m,c,3*e)}return c}var Y=it,X=new R,$=new L,j=new t,H={min:void 0,max:void 0};function at(e){e=new Float64Array(e);let r=0;H.min=e[r++],H.max=e[r++],R.unpack(e,r,X),r+=R.packedLength,L.unpack(e,r,$),r+=L.packedLength,t.unpack(e,r,j)}function ft(t){let e=t.length,r=new Uint32Array(e+1),a=0;for(let n=0;n<e;++n)r[n]=a,a+=t[n];return r[e]=a,r}var Z=new t,q=new t,J=new t,dt=new t,Q=new t;function ut(e,r){let a=new Uint16Array(e.positions),n=new Uint16Array(e.widths),u=new Uint32Array(e.counts),o=new Uint16Array(e.batchIds);at(e.packedBuffer);let s,f=X,i=$,c=j,p=H.min,l=H.max,d=Y(a,f,p,l,i),h=d.length/3,k=4*h-4,b=new Float32Array(3*k),m=new Float32Array(3*k),w=new Float32Array(3*k),y=new Float32Array(2*k),A=new Uint16Array(k),F=0,R=0,T=0,U=0,D=u.length;for(s=0;s<D;++s){let e=u[s],r=n[s],a=o[s];for(let n=0;n<e;++n){let u;if(0===n){let e=t.unpack(d,3*U,Z),r=t.unpack(d,3*(U+1),q);u=t.subtract(e,r,J),t.add(e,u,u)}else u=t.unpack(d,3*(U+n-1),J);let o,s=t.unpack(d,3*(U+n),dt);if(n===e-1){let r=t.unpack(d,3*(U+e-1),Z),a=t.unpack(d,3*(U+e-2),q);o=t.subtract(r,a,Q),t.add(r,o,o)}else o=t.unpack(d,3*(U+n+1),Q);t.subtract(u,c,u),t.subtract(s,c,s),t.subtract(o,c,o);let f=n===e-1?2:4;for(let e=0===n?2:0;e<f;++e){t.pack(s,b,F),t.pack(u,m,F),t.pack(o,w,F),F+=3;let n=e-2<0?-1:1;y[R++]=e%2*2-1,y[R++]=n*r,A[T++]=a}}U+=e}let g=S.createTypedArray(k,6*h-6),L=0,O=0;for(D=h-1,s=0;s<D;++s)g[O++]=L,g[O++]=L+2,g[O++]=L+1,g[O++]=L+1,g[O++]=L+2,g[O++]=L+3,L+=4;r.push(b.buffer,m.buffer,w.buffer),r.push(y.buffer,A.buffer,g.buffer);let P={indexDatatype:2===g.BYTES_PER_ELEMENT?S.UNSIGNED_SHORT:S.UNSIGNED_INT,currentPositions:b.buffer,previousPositions:m.buffer,nextPositions:w.buffer,expandAndWidth:y.buffer,batchIds:A.buffer,indices:g.buffer};if(e.keepDecodedPositions){let t=ft(u);r.push(d.buffer,t.buffer),P=B(P,{decodedPositions:d.buffer,decodedPositionOffsets:t.buffer})}return P}var It=K(ut);export{It as default};