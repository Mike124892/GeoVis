/*! For license information please see chunk-VIH6IU5Q.js.LICENSE.txt */
import{a as y}from"./chunk-PT6JDBLV.js";import{d as j}from"./chunk-2Z7LHEFB.js";import{b as d,h as L}from"./chunk-URXUHQWZ.js";import{a as R}from"./chunk-2ZKHVIZO.js";import{a as s,b as W,c as T,d as q}from"./chunk-H26ARMDM.js";import{a as w}from"./chunk-KROATL7C.js";import{a as P}from"./chunk-WF3Q7FOG.js";import{a as A,b as z}from"./chunk-NERDVOKQ.js";import{e as l}from"./chunk-4ACNSQDC.js";function x(t,e){z.typeOf.object("ellipsoid",t),this._ellipsoid=t,this._cameraPosition=new s,this._cameraPositionInScaledSpace=new s,this._distanceToLimbInScaledSpaceSquared=0,l(e)&&(this.cameraPosition=e)}Object.defineProperties(x.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},cameraPosition:{get:function(){return this._cameraPosition},set:function(t){let e=this._ellipsoid.transformPositionToScaledSpace(t,this._cameraPositionInScaledSpace),i=s.magnitudeSquared(e)-1;s.clone(t,this._cameraPosition),this._cameraPositionInScaledSpace=e,this._distanceToLimbInScaledSpaceSquared=i}}});var U=new s;x.prototype.isPointVisible=function(t){return F(this._ellipsoid.transformPositionToScaledSpace(t,U),this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)},x.prototype.isScaledSpacePointVisible=function(t){return F(t,this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)};var at=new s;x.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid=function(t,e){let i,o,r=this._ellipsoid;return l(e)&&e<0&&r.minimumRadius>-e?(o=at,o.x=this._cameraPosition.x/(r.radii.x+e),o.y=this._cameraPosition.y/(r.radii.y+e),o.z=this._cameraPosition.z/(r.radii.z+e),i=o.x*o.x+o.y*o.y+o.z*o.z-1):(o=this._cameraPositionInScaledSpace,i=this._distanceToLimbInScaledSpaceSquared),F(t,o,i)},x.prototype.computeHorizonCullingPoint=function(t,e,i){return Q(this._ellipsoid,t,e,i)};var v=q.clone(q.UNIT_SPHERE);x.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid=function(t,e,i,o){return Q(Z(this._ellipsoid,i,v),t,e,o)},x.prototype.computeHorizonCullingPointFromVertices=function(t,e,i,o,r){return J(this._ellipsoid,t,e,i,o,r)},x.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid=function(t,e,i,o,r,s){return J(Z(this._ellipsoid,r,v),t,e,i,o,s)};var nt=[];x.prototype.computeHorizonCullingPointFromRectangle=function(t,e,i){z.typeOf.object("rectangle",t);let o=L.subsample(t,e,0,nt),r=j.fromPoints(o);if(!(s.magnitude(r.center)<.1*e.minimumRadius))return this.computeHorizonCullingPoint(r.center,o,i)};var st=new s;function Z(t,e,i){if(l(e)&&e<0&&t.minimumRadius>-e){let o=s.fromElements(t.radii.x+e,t.radii.y+e,t.radii.z+e,st);t=q.fromCartesian3(o,i)}return t}function Q(t,e,i,o){z.typeOf.object("directionToPoint",e),z.defined("positions",i),l(o)||(o=new s);let r=Y(t,e),a=0;for(let e=0,o=i.length;e<o;++e){let o=K(t,i[e],r);if(o<0)return;a=Math.max(a,o)}return X(r,a,o)}var M=new s;function J(t,e,i,o,r,a){z.typeOf.object("directionToPoint",e),z.defined("vertices",i),z.typeOf.number("stride",o),l(a)||(a=new s),o=P(o,3),r=P(r,s.ZERO);let n=Y(t,e),c=0;for(let e=0,s=i.length;e<s;e+=o){M.x=i[e]+r.x,M.y=i[e+1]+r.y,M.z=i[e+2]+r.z;let o=K(t,M,n);if(o<0)return;c=Math.max(c,o)}return X(n,c,a)}function F(t,e,i){let o=e,r=i,a=s.subtract(t,o,U),n=-s.dot(a,o);return!(r<0?n>0:n>r&&n*n/s.magnitudeSquared(a)>r)}var ct=new s,rt=new s;function K(t,e,i){let o=t.transformPositionToScaledSpace(e,ct),r=s.magnitudeSquared(o),a=Math.sqrt(r),n=s.divideByScalar(o,a,rt);r=Math.max(1,r),a=Math.max(1,a);let c=1/a;return 1/(s.dot(n,i)*c-s.magnitude(s.cross(n,i,n))*(Math.sqrt(r-1)*c))}function X(t,e,i){if(!(e<=0||e===1/0||e!=e))return s.multiplyByScalar(t,e,i)}var D=new s;function Y(t,e){return s.equals(e,s.ZERO)?e:(t.transformPositionToScaledSpace(e,D),s.normalize(D,D))}var Pt=x,O={getHeight:function(t,e,i){if(!Number.isFinite(e))throw new A("scale must be a finite number.");if(!Number.isFinite(i))throw new A("relativeHeight must be a finite number.");return(t-i)*e+i}},mt=new W;O.getPosition=function(t,e,i,o,r){let a=e.cartesianToCartographic(t,mt);if(!l(a))return s.clone(t,r);let n=O.getHeight(a.height,i,o);return s.fromRadians(a.longitude,a.latitude,n,e,r)};var $=O,dt={NONE:0,BITS12:1},S=Object.freeze(dt),C=new s,lt=new s,f=new T,V=new d,ht=new d,pt=Math.pow(2,12);function p(t,e,i,o,r,a,n,c,m,u){let h,f,p=S.NONE;if(l(e)&&l(i)&&l(o)&&l(r)){let t=e.minimum,a=e.maximum,n=s.subtract(a,t,lt),c=o-i;p=Math.max(s.maximumComponent(n),c)<pt-1?S.BITS12:S.NONE,h=d.inverseTransformation(r,new d);let l=s.negate(t,C);d.multiply(d.fromTranslation(l,V),h,h);let m=C;m.x=1/n.x,m.y=1/n.y,m.z=1/n.z,d.multiply(d.fromScale(m,V),h,h),f=d.clone(r),d.setTranslation(f,s.ZERO,f),r=d.clone(r,new d);let u=d.fromTranslation(t,V),x=d.fromScale(n,ht),y=d.multiply(u,x,V);d.multiply(r,y,r),d.multiply(f,y,f)}this.quantization=p,this.minimumHeight=i,this.maximumHeight=o,this.center=s.clone(t),this.toScaledENU=h,this.fromScaledENU=r,this.matrix=f,this.hasVertexNormals=a,this.hasWebMercatorT=P(n,!1),this.hasGeodeticSurfaceNormals=P(c,!1),this.exaggeration=P(m,1),this.exaggerationRelativeHeight=P(u,0),this.stride=0,this._offsetGeodeticSurfaceNormal=0,this._offsetVertexNormal=0,this._calculateStrideAndOffsets()}p.prototype.encode=function(t,e,i,o,r,a,n,c){let l=o.x,m=o.y;if(this.quantization===S.BITS12){(i=d.multiplyByPoint(this.toScaledENU,i,C)).x=w.clamp(i.x,0,1),i.y=w.clamp(i.y,0,1),i.z=w.clamp(i.z,0,1);let o=this.maximumHeight-this.minimumHeight,s=w.clamp((r-this.minimumHeight)/o,0,1);T.fromElements(i.x,i.y,f);let a=y.compressTextureCoordinates(f);T.fromElements(i.z,s,f);let c=y.compressTextureCoordinates(f);T.fromElements(l,m,f);let u=y.compressTextureCoordinates(f);if(t[e++]=a,t[e++]=c,t[e++]=u,this.hasWebMercatorT){T.fromElements(n,0,f);let i=y.compressTextureCoordinates(f);t[e++]=i}}else s.subtract(i,this.center,C),t[e++]=C.x,t[e++]=C.y,t[e++]=C.z,t[e++]=r,t[e++]=l,t[e++]=m,this.hasWebMercatorT&&(t[e++]=n);return this.hasVertexNormals&&(t[e++]=y.octPackFloat(a)),this.hasGeodeticSurfaceNormals&&(t[e++]=c.x,t[e++]=c.y,t[e++]=c.z),e};var ut=new s,B=new s;p.prototype.addGeodeticSurfaceNormals=function(t,e,i){if(this.hasGeodeticSurfaceNormals)return;let o=this.stride,r=t.length/o;this.hasGeodeticSurfaceNormals=!0,this._calculateStrideAndOffsets();let s=this.stride;for(let a=0;a<r;a++){for(let i=0;i<o;i++){let r=a*o+i;e[a*s+i]=t[r]}let r=this.decodePosition(e,a,ut),n=i.geodeticSurfaceNormal(r,B),c=a*s+this._offsetGeodeticSurfaceNormal;e[c]=n.x,e[c+1]=n.y,e[c+2]=n.z}},p.prototype.removeGeodeticSurfaceNormals=function(t,e){if(!this.hasGeodeticSurfaceNormals)return;let i=this.stride,o=t.length/i;this.hasGeodeticSurfaceNormals=!1,this._calculateStrideAndOffsets();let r=this.stride;for(let s=0;s<o;s++)for(let o=0;o<r;o++){let a=s*i+o;e[s*r+o]=t[a]}},p.prototype.decodePosition=function(t,e,i){if(l(i)||(i=new s),e*=this.stride,this.quantization===S.BITS12){let o=y.decompressTextureCoordinates(t[e],f);i.x=o.x,i.y=o.y;let r=y.decompressTextureCoordinates(t[e+1],f);return i.z=r.x,d.multiplyByPoint(this.fromScaledENU,i,i)}return i.x=t[e],i.y=t[e+1],i.z=t[e+2],s.add(i,this.center,i)},p.prototype.getExaggeratedPosition=function(t,e,i){i=this.decodePosition(t,e,i);let o=this.exaggeration,r=this.exaggerationRelativeHeight;if(1!==o&&this.hasGeodeticSurfaceNormals){let s=this.decodeGeodeticSurfaceNormal(t,e,B),a=this.decodeHeight(t,e),n=$.getHeight(a,o,r)-a;i.x+=s.x*n,i.y+=s.y*n,i.z+=s.z*n}return i},p.prototype.decodeTextureCoordinates=function(t,e,i){return l(i)||(i=new T),e*=this.stride,this.quantization===S.BITS12?y.decompressTextureCoordinates(t[e+2],i):T.fromElements(t[e+4],t[e+5],i)},p.prototype.decodeHeight=function(t,e){return e*=this.stride,this.quantization===S.BITS12?y.decompressTextureCoordinates(t[e+1],f).y*(this.maximumHeight-this.minimumHeight)+this.minimumHeight:t[e+3]},p.prototype.decodeWebMercatorT=function(t,e){return e*=this.stride,this.quantization===S.BITS12?y.decompressTextureCoordinates(t[e+3],f).x:t[e+6]},p.prototype.getOctEncodedNormal=function(t,e,i){let o=t[e=e*this.stride+this._offsetVertexNormal]/256,r=Math.floor(o),s=256*(o-r);return T.fromElements(r,s,i)},p.prototype.decodeGeodeticSurfaceNormal=function(t,e,i){return e=e*this.stride+this._offsetGeodeticSurfaceNormal,i.x=t[e],i.y=t[e+1],i.z=t[e+2],i},p.prototype._calculateStrideAndOffsets=function(){let t=0;this.quantization===S.BITS12?t+=3:t+=6,this.hasWebMercatorT&&(t+=1),this.hasVertexNormals&&(this._offsetVertexNormal=t,t+=1),this.hasGeodeticSurfaceNormals&&(this._offsetGeodeticSurfaceNormal=t,t+=3),this.stride=t};var G={position3DAndHeight:0,textureCoordAndEncodedNormals:1,geodeticSurfaceNormal:2},H={compressed0:0,compressed1:1,geodeticSurfaceNormal:2};p.prototype.getAttributes=function(t){let e=R.FLOAT,i=R.getSizeInBytes(e),o=this.stride*i,r=0,s=[];function a(a,n){s.push({index:a,vertexBuffer:t,componentDatatype:e,componentsPerAttribute:n,offsetInBytes:r,strideInBytes:o}),r+=n*i}if(this.quantization===S.NONE){a(G.position3DAndHeight,4);let t=2;t+=this.hasWebMercatorT?1:0,t+=this.hasVertexNormals?1:0,a(G.textureCoordAndEncodedNormals,t),this.hasGeodeticSurfaceNormals&&a(G.geodeticSurfaceNormal,3)}else{let t=this.hasWebMercatorT||this.hasVertexNormals,e=this.hasWebMercatorT&&this.hasVertexNormals;a(H.compressed0,t?4:3),e&&a(H.compressed1,1),this.hasGeodeticSurfaceNormals&&a(H.geodeticSurfaceNormal,3)}return s},p.prototype.getAttributeLocations=function(){return this.quantization===S.NONE?G:H},p.clone=function(t,e){if(l(t))return l(e)||(e=new p),e.quantization=t.quantization,e.minimumHeight=t.minimumHeight,e.maximumHeight=t.maximumHeight,e.center=s.clone(t.center),e.toScaledENU=d.clone(t.toScaledENU),e.fromScaledENU=d.clone(t.fromScaledENU),e.matrix=d.clone(t.matrix),e.hasVertexNormals=t.hasVertexNormals,e.hasWebMercatorT=t.hasWebMercatorT,e.hasGeodeticSurfaceNormals=t.hasGeodeticSurfaceNormals,e.exaggeration=t.exaggeration,e.exaggerationRelativeHeight=t.exaggerationRelativeHeight,e._calculateStrideAndOffsets(),e};var Wt=p;export{Pt as a,Wt as b};