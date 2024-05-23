/*! For license information please see createCoplanarPolygonGeometry.js.LICENSE.txt */
import{a as et}from"./chunk-A7UIA5P4.js";import{a as U}from"./chunk-UK55SE65.js";import"./chunk-GAH7IJVU.js";import{a as y}from"./chunk-NSWJ5LZZ.js";import"./chunk-QF7CWIRX.js";import{a as I}from"./chunk-VXN75QM4.js";import{a as $}from"./chunk-MS2KBTBR.js";import"./chunk-PT6JDBLV.js";import"./chunk-7QMJUJWF.js";import{a as u}from"./chunk-OBRBT3RZ.js";import"./chunk-4CSLOU34.js";import"./chunk-YGZTDFCH.js";import{b as ot}from"./chunk-HUIDJQZX.js";import{a as tt}from"./chunk-EETKHMAV.js";import"./chunk-3NQCF6LY.js";import"./chunk-4ZLSWVFU.js";import"./chunk-B3LBD7CG.js";import{a as J}from"./chunk-YNTFMT6T.js";import{a as X}from"./chunk-4S4T622A.js";import{b as K,c as Y,d as z}from"./chunk-WRT5H5YZ.js";import{d as Z}from"./chunk-2Z7LHEFB.js";import{f as Q}from"./chunk-URXUHQWZ.js";import{a as N}from"./chunk-2ZKHVIZO.js";import{a as i,c as x,d as m,e as P}from"./chunk-H26ARMDM.js";import{a as q}from"./chunk-KROATL7C.js";import"./chunk-6A4YVUYV.js";import"./chunk-IPTRD2UF.js";import{a as f}from"./chunk-WF3Q7FOG.js";import{b as B}from"./chunk-NERDVOKQ.js";import{e as g}from"./chunk-4ACNSQDC.js";var st=new i,at=new et,pt=new x,lt=new x,mt=new i,ft=new i,ut=new i,V=new i,yt=new i,ht=new i,nt=new Q,dt=new P,gt=new P,Pt=new i;function wt(t,e,n,o,r,a,s,c,p){let l=t.positions,u=ot.triangulate(t.positions2D,t.holes);u.length<3&&(u=[0,1,2]);let m=J.createTypedArray(l.length,u.length);m.set(u);let h=dt;if(0!==o){let t=Q.fromAxisAngle(s,o,nt);if(h=P.fromQuaternion(t,h),e.tangent||e.bitangent){t=Q.fromAxisAngle(s,-o,nt);let n=P.fromQuaternion(t,gt);c=i.normalize(P.multiplyByVector(n,c,c),c),e.bitangent&&(p=i.normalize(i.cross(s,c,p),p))}}else h=P.clone(P.IDENTITY,h);let y=lt;e.st&&(y.x=n.x,y.y=n.y);let d=l.length,f=3*d,k=new Float64Array(f),w=e.normal?new Float32Array(f):void 0,A=e.tangent?new Float32Array(f):void 0,j=e.bitangent?new Float32Array(f):void 0,F=e.st?new Float32Array(2*d):void 0,T=0,v=0,_=0,b=0,E=0;for(let t=0;t<d;t++){let o=l[t];if(k[T++]=o.x,k[T++]=o.y,k[T++]=o.z,e.st)if(g(r)&&r.positions.length===d)F[E++]=r.positions[t].x,F[E++]=r.positions[t].y;else{let t=a(P.multiplyByVector(h,o,st),pt);x.subtract(t,y,t);let e=q.clamp(t.x/n.width,0,1),i=q.clamp(t.y/n.height,0,1);F[E++]=e,F[E++]=i}e.normal&&(w[v++]=s.x,w[v++]=s.y,w[v++]=s.z),e.tangent&&(A[b++]=c.x,A[b++]=c.y,A[b++]=c.z),e.bitangent&&(j[_++]=p.x,j[_++]=p.y,j[_++]=p.z)}let L=new X;return e.position&&(L.position=new z({componentDatatype:N.DOUBLE,componentsPerAttribute:3,values:k})),e.normal&&(L.normal=new z({componentDatatype:N.FLOAT,componentsPerAttribute:3,values:w})),e.tangent&&(L.tangent=new z({componentDatatype:N.FLOAT,componentsPerAttribute:3,values:A})),e.bitangent&&(L.bitangent=new z({componentDatatype:N.FLOAT,componentsPerAttribute:3,values:j})),e.st&&(L.st=new z({componentDatatype:N.FLOAT,componentsPerAttribute:2,values:F})),new Y({attributes:L,indices:m,primitiveType:K.TRIANGLES})}function E(t){let e=(t=f(t,f.EMPTY_OBJECT)).polygonHierarchy,n=t.textureCoordinates;B.defined("options.polygonHierarchy",e);let o=f(t.vertexFormat,u.DEFAULT);this._vertexFormat=u.clone(o),this._polygonHierarchy=e,this._stRotation=f(t.stRotation,0),this._ellipsoid=m.clone(f(t.ellipsoid,m.WGS84)),this._workerName="createCoplanarPolygonGeometry",this._textureCoordinates=n,this.packedLength=y.computeHierarchyPackedLength(e,i)+u.packedLength+m.packedLength+(g(n)?y.computeHierarchyPackedLength(n,x):1)+2}E.fromPositions=function(t){return t=f(t,f.EMPTY_OBJECT),B.defined("options.positions",t.positions),new E({polygonHierarchy:{positions:t.positions},vertexFormat:t.vertexFormat,stRotation:t.stRotation,ellipsoid:t.ellipsoid,textureCoordinates:t.textureCoordinates})},E.pack=function(t,e,n){return B.typeOf.object("value",t),B.defined("array",e),n=f(n,0),n=y.packPolygonHierarchy(t._polygonHierarchy,e,n,i),m.pack(t._ellipsoid,e,n),n+=m.packedLength,u.pack(t._vertexFormat,e,n),n+=u.packedLength,e[n++]=t._stRotation,g(t._textureCoordinates)?n=y.packPolygonHierarchy(t._textureCoordinates,e,n,x):e[n++]=-1,e[n++]=t.packedLength,e};var _t=m.clone(m.UNIT_SPHERE),At=new u,bt={polygonHierarchy:{}};E.unpack=function(t,e,n){B.defined("array",t),e=f(e,0);let o=y.unpackPolygonHierarchy(t,e,i);e=o.startingIndex,delete o.startingIndex;let r=m.unpack(t,e,_t);e+=m.packedLength;let a=u.unpack(t,e,At);e+=u.packedLength;let s=t[e++],c=-1===t[e]?void 0:y.unpackPolygonHierarchy(t,e,x);g(c)?(e=c.startingIndex,delete c.startingIndex):e++;let p=t[e++];return g(n)||(n=new E(bt)),n._polygonHierarchy=o,n._ellipsoid=m.clone(r,n._ellipsoid),n._vertexFormat=u.clone(a,n._vertexFormat),n._stRotation=s,n._textureCoordinates=c,n.packedLength=p,n},E.createGeometry=function(t){let e=t._vertexFormat,n=t._polygonHierarchy,o=t._stRotation,r=t._textureCoordinates,a=g(r),s=n.positions;if(s=tt(s,i.equalsEpsilon,!0),s.length<3)return;let c=mt,p=ft,l=ut,u=yt,m=ht;if(!U.computeProjectTo2DArguments(s,V,u,m))return;if(c=i.cross(u,m,c),c=i.normalize(c,c),!i.equalsEpsilon(V,i.ZERO,q.EPSILON6)){let e=t._ellipsoid.geodeticSurfaceNormal(V,Pt);i.dot(c,e)<0&&(c=i.negate(c,c),u=i.negate(u,u))}let h=U.createProjectPointsTo2DFunction(V,u,m),d=U.createProjectPointTo2DFunction(V,u,m);e.tangent&&(p=i.clone(u,p)),e.bitangent&&(l=i.clone(m,l));let f=y.polygonsFromHierarchy(n,a,h,!1),k=f.hierarchy,x=f.polygons,P=a?y.polygonsFromHierarchy(r,!0,(function(t){return t}),!1).polygons:void 0;if(0===k.length)return;s=k[0].outerRing;let w=Z.fromPoints(s),A=y.computeBoundingRectangle(c,d,s,o,at),j=[];for(let t=0;t<x.length;t++){let n=new I({geometry:wt(x[t],e,A,o,a?P[t]:void 0,d,c,p,l)});j.push(n)}let F=$.combineInstances(j)[0];F.attributes.position.values=new Float64Array(F.attributes.position.values),F.indices=J.createTypedArray(F.attributes.position.values.length/3,F.indices);let T=F.attributes;return e.position||delete T.position,new Y({attributes:T,indices:F.indices,primitiveType:F.primitiveType,boundingSphere:w})};var W=E;function kt(t,e){return g(e)&&(t=W.unpack(t,e)),W.createGeometry(t)}var Xt=kt;export{Xt as default};