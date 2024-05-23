/*! For license information please see decodeI3S.js.LICENSE.txt */
import{a as xt}from"./chunk-EYMNXDR6.js";import{a as P}from"./chunk-7RE2NPD7.js";import{a as yt}from"./chunk-BHWELPB4.js";import{a as ht}from"./chunk-JOOO6TIY.js";import{a as g,b as ot,d as st,e as it}from"./chunk-H26ARMDM.js";import{a as M}from"./chunk-KROATL7C.js";import{a as ft}from"./chunk-WF3Q7FOG.js";import{b as lt}from"./chunk-NERDVOKQ.js";import{d as mt,e as h}from"./chunk-4ACNSQDC.js";var at=mt(xt(),1);function wt(t){return lt.defined("value",t),t<=.04045?.07739938080495357*t:Math.pow(.9478672985781991*(t+.055),2.4)}var ut,k=wt;function It(t,e,n,r,o,a){return(n*(1-t)+r*t)*(1-e)+(o*(1-t)+a*t)*e}function H(t,e,n,r){return r[t+e*n]}function At(t,e,n){let r=n.nativeExtent,o=(t-r.west)/(r.east-r.west)*(n.width-1),a=(e-r.south)/(r.north-r.south)*(n.height-1),i=Math.floor(o),l=Math.floor(a);o-=i,a-=l;let s=i<n.width?i+1:i,u=l<n.height?l+1:l;l=n.height-1-l,u=n.height-1-u;let f=It(o,a,H(i,l,n.width,n.buffer),H(s,l,n.width,n.buffer),H(i,u,n.width,n.buffer),H(s,u,n.width,n.buffer));return f=f*n.scale+n.offset,f}function bt(t,e,n){for(let r=0;r<n.length;r++){let o=n[r].nativeExtent,a=new g;if("WebMercator"===n[r].projectionType){let o=n[r].projection._ellipsoid._radii;a=new ht(new st(o.x,o.y,o.z)).project(new ot(t,e,0))}else a.x=t,a.y=e;if(a.x>o.west&&a.x<o.east&&a.y>o.south&&a.y<o.north)return At(a.x,a.y,n[r])}return 0}function Lt(t,e,n,r,o,a,i){if(i)return;let l=bt(o.longitude,o.latitude,a);for(let i=0;i<t;++i){let t=bt(o.longitude+M.toRadians(n*e[3*i]),o.latitude+M.toRadians(r*e[3*i+1]),a);e[3*i+2]+=t-l}}function Ot(t,e,n,r,o,a,i,l,s){if(0===t||!h(e)||0===e.length)return;let u=new st(Math.sqrt(i.x),Math.sqrt(i.y),Math.sqrt(i.z));for(let i=0;i<t;++i){let t=3*i,f=t+1,c=t+2,y=new ot;y.longitude=r.longitude+M.toRadians(l*e[t]),y.latitude=r.latitude+M.toRadians(s*e[f]),y.height=r.height+e[c];let p={};u.cartographicToCartesian(y,p),p.x-=o.x,p.y-=o.y,p.z-=o.z;let b={};if(it.multiplyByVector(a,p,b),e[t]=b.x,e[f]=b.y,e[c]=b.z,h(n)){let e=new g(n[t],n[f],n[c]),r={};it.multiplyByVector(a,e,r),n[t]=r.x,n[f]=r.y,n[c]=r.z}}}function Tt(t,e,n){for(let r=0;r<t;++r){let t=n[4*r]/65535,o=n[4*r+1]/65535,a=(n[4*r+2]-n[4*r])/65535,i=(n[4*r+3]-n[4*r+1])/65535;e[2*r]*=a,e[2*r]+=t,e[2*r+1]*=i,e[2*r+1]+=o}}function Ct(t,e,n,r){let o=new Uint32Array(t),a=h(e)?t=>e[t]:t=>t,i=0;if(r&&h(n)){let e=t=>n[4*a(t)+3]<255;for(let n=0;n<t;n+=3)!e(n)&&!e(n+1)&&!e(n+2)&&(o[i++]=a(n),o[i++]=a(n+1),o[i++]=a(n+2));if(i>0){let n=i;for(let r=0;r<t;r+=3)(e(r)||e(r+1)||e(r+2))&&(o[n++]=a(r),o[n++]=a(r+1),o[n++]=a(r+2))}else for(let e=0;e<t;++e)o[e]=a(e)}else{i=t;for(let e=0;e<t;++e)o[e]=a(e)}return{indexArray:o,transparentVertexOffset:i}}function Ft(t,e,n){let r=e[n];if(h(r))return r;let o=e[n]={positions:{},indices:{},edges:{}},a=ft(t[n],t.default);return o.hasOutline=h(a?.edges),o}function Ut(t,e,n,r){if(!h(t[n])){let o=3*n,a=e;for(let t=0;t<3;t++){let e=r[o+t];h(a[e])||(a[e]={}),a=a[e]}h(a.index)||(a.index=n),t[n]=a.index}}function Vt(t,e,n,r,o,a){let i,l;r<o?(i=r,l=o):(i=o,l=r);let s=t[i];h(s)||(s=t[i]={});let u=s[l];h(u)||(u=s[l]={normalsIndex:[],outlines:[]}),u.normalsIndex.push(a),(0===u.outlines.length||e!==r||n!==o)&&u.outlines.push(e,n)}function Et(t,e,n,r){let o=[];for(let a=0;a<n.length;a+=3){let i=Ft(t,o,h(e)?e[n[a]]:"default");if(!i.hasOutline)continue;let l=i.indices,s=i.positions;for(let t=0;t<3;t++)Ut(l,s,n[a+t],r);let u=i.edges;for(let t=0;t<3;t++){let e=n[a+t],r=n[a+(t+1)%3];Vt(u,e,r,l[e],l[r],a)}}return o}var O=new g,X=new g,Y=new g;function gt(t,e,n,r){let o=3*n[e],a=3*n[e+1],i=3*n[e+2];g.fromArray(r,o,O),g.fromArray(r,a,X),g.fromArray(r,i,Y),g.subtract(X,O,X),g.subtract(Y,O,Y),g.cross(X,Y,O);let l=g.magnitude(O);0!==l&&g.divideByScalar(O,l,O);let s=3*e,u=3*(e+1),f=3*(e+2);g.pack(O,t,s),g.pack(O,t,u),g.pack(O,t,f)}var z=new g,ct=new g;function _t(t,e,n){g.fromArray(t,e,z),g.fromArray(t,n,ct);let r=g.dot(z,ct),o=g.magnitude(g.cross(z,ct,z));return Math.atan2(o,r)<.25}function Rt(t,e,n,r,o){if(e.normalsIndex.length>1){let t=r.length===o.length;for(let a=0;a<e.normalsIndex.length;a++){let i=e.normalsIndex[a];if(h(o[3*i])||gt(o,i,n,r),0!==a)for(let r=0;r<a;r++){let a=e.normalsIndex[r];if(_t(o,t?3*n[i]:3*i,t?3*n[a]:3*a))return}}}t.push(...e.outlines)}function Nt(t,e,n,r,o){let a=Object.keys(e);for(let i=0;i<a.length;i++){let l=e[a[i]],s=Object.keys(l);for(let e=0;e<s.length;e++)Rt(t,l[s[e]],n,r,o)}}function Bt(t,e,n,r){let o=[],a=Object.keys(t);for(let i=0;i<a.length;i++)Nt(o,t[a[i]].edges,e,n,r);return o}function Gt(t,e,n,r,o){if(!h(t)||0===Object.keys(t).length)return;let a=Et(t,e,n,r);(!h(o)||3*n.length!==o.length)&&(o=[]);let i=Bt(a,n,r,o);return i.length>0?new Uint32Array(i):void 0}function St(t){let e=new Float32Array(t.length);for(let n=0;n<t.length;n+=4)e[n]=k(P.byteToFloat(t[n])),e[n+1]=k(P.byteToFloat(t[n+1])),e[n+2]=k(P.byteToFloat(t[n+2])),e[n+3]=P.byteToFloat(t[n+3]);return e}function vt(t,e,n,r,o,a,i){let l={normals:void 0,positions:void 0,uv0s:void 0,colors:void 0,featureIndex:void 0,vertexCount:void 0};if(0===t||!h(n)||0===n.length||h(r))return l;if(h(e)){l.vertexCount=e.length,l.positions=new Float32Array(3*e.length),l.uv0s=h(o)?new Float32Array(2*e.length):void 0,l.colors=h(a)?new Uint8Array(4*e.length):void 0,l.featureIndex=h(i)?new Array(e.length):void 0;for(let t=0;t<e.length;t++){let r=e[t];l.positions[3*t]=n[3*r],l.positions[3*t+1]=n[3*r+1],l.positions[3*t+2]=n[3*r+2],h(l.uv0s)&&(l.uv0s[2*t]=o[2*r],l.uv0s[2*t+1]=o[2*r+1]),h(l.colors)&&(l.colors[4*t]=a[4*r],l.colors[4*t+1]=a[4*r+1],l.colors[4*t+2]=a[4*r+2],l.colors[4*t+3]=a[4*r+3]),h(l.featureIndex)&&(l.featureIndex[t]=i[r])}t=e.length,n=l.positions}e=new Array(t);for(let n=0;n<t;n++)e[n]=n;l.normals=new Float32Array(3*e.length);for(let t=0;t<e.length;t+=3)gt(l.normals,t,e,n);return l}function Mt(t,e,n,r,o,a,i,l){if(0===t||!h(n)||0===n.length)return{buffers:[],bufferViews:[],accessors:[],meshes:[],nodes:[],nodesInScene:[]};let s=[],u=[],f=[],c=[],y=[],g=[],p={},b=[];h(e)&&(t=e.length);let{indexArray:d,transparentVertexOffset:m}=Ct(t,e,a,l.splitGeometryByColorTransparency),A=new Blob([d],{type:"application/binary"}),w=URL.createObjectURL(A),x=t,I=l.enableFeatures&&h(i)?new Float32Array(i.length):void 0,v=0;if(h(I))for(let t=0;t<i.length;++t){I[t]=i[t];let e=i[t]+1;v<e&&(v=e)}let O,L=Gt(l.symbologyData,i,d,n,r);if(h(L)){let t=new Blob([L],{type:"application/binary"});O=URL.createObjectURL(t)}let C=n.subarray(0,3*x),R=new Blob([C],{type:"application/binary"}),T=URL.createObjectURL(R),_=Number.POSITIVE_INFINITY,U=Number.NEGATIVE_INFINITY,F=Number.POSITIVE_INFINITY,E=Number.NEGATIVE_INFINITY,V=Number.POSITIVE_INFINITY,G=Number.NEGATIVE_INFINITY;for(let t=0;t<C.length/3;t++)_=Math.min(_,C[3*t+0]),U=Math.max(U,C[3*t+0]),F=Math.min(F,C[3*t+1]),E=Math.max(E,C[3*t+1]),V=Math.min(V,C[3*t+2]),G=Math.max(G,C[3*t+2]);let D,N=r?r.subarray(0,3*x):void 0;if(h(N)){let t=new Blob([N],{type:"application/binary"});D=URL.createObjectURL(t)}let M,j=o?o.subarray(0,2*x):void 0;if(h(j)){let t=new Blob([j],{type:"application/binary"});M=URL.createObjectURL(t)}let k,B=h(a)?St(a.subarray(0,4*x)):void 0;if(h(B)){let t=new Blob([B],{type:"application/binary"});k=URL.createObjectURL(t)}let S,P=h(I)?I.subarray(0,x):void 0;if(h(P)){let t=new Blob([P],{type:"application/binary"});S=URL.createObjectURL(t)}let Y,X=h(I)?new Float32Array(v):void 0;if(h(X)){for(let t=0;t<X.length;++t)X[t]=t;let t=new Blob([X],{type:"application/binary"});Y=URL.createObjectURL(t)}let z={},H={};z.POSITION=f.length,s.push({uri:T,byteLength:C.byteLength}),u.push({buffer:s.length-1,byteOffset:0,byteLength:C.byteLength,target:34962}),f.push({bufferView:u.length-1,byteOffset:0,componentType:5126,count:C.length/3,type:"VEC3",max:[_,F,V],min:[U,E,G]}),h(D)&&(z.NORMAL=f.length,s.push({uri:D,byteLength:N.byteLength}),u.push({buffer:s.length-1,byteOffset:0,byteLength:N.byteLength,target:34962}),f.push({bufferView:u.length-1,byteOffset:0,componentType:5126,count:N.length/3,type:"VEC3"})),h(M)&&(z.TEXCOORD_0=f.length,s.push({uri:M,byteLength:j.byteLength}),u.push({buffer:s.length-1,byteOffset:0,byteLength:j.byteLength,target:34962}),f.push({bufferView:u.length-1,byteOffset:0,componentType:5126,count:j.length/2,type:"VEC2"})),h(k)&&(z.COLOR_0=f.length,s.push({uri:k,byteLength:B.byteLength}),u.push({buffer:s.length-1,byteOffset:0,byteLength:B.byteLength,target:34962}),f.push({bufferView:u.length-1,byteOffset:0,componentType:5126,count:B.length/4,type:"VEC4"})),h(S)&&(z._FEATURE_ID_0=f.length,s.push({uri:S,byteLength:P.byteLength}),u.push({buffer:s.length-1,byteOffset:0,byteLength:P.byteLength,target:34963}),f.push({bufferView:u.length-1,byteOffset:0,componentType:5126,count:P.length,type:"SCALAR"}),H.EXT_mesh_features={featureIds:[{attribute:0,propertyTable:0,featureCount:v}]},b.push("EXT_mesh_features")),h(Y)&&(s.push({uri:Y,byteLength:X.byteLength}),u.push({buffer:s.length-1,byteOffset:0,byteLength:X.byteLength,target:34963}),p.EXT_structural_metadata={schema:{id:"i3s-metadata-schema-001",name:"I3S metadata schema 001",description:"The schema for I3S metadata",version:"1.0",classes:{feature:{name:"feature",description:"Feature metadata",properties:{index:{description:"The feature index",type:"SCALAR",componentType:"FLOAT32",required:!0}}}}},propertyTables:[{name:"feature-indices-mapping",class:"feature",count:v,properties:{index:{values:u.length-1}}}]},b.push("EXT_structural_metadata")),h(O)&&(s.push({uri:O,byteLength:L.byteLength}),u.push({buffer:s.length-1,byteOffset:0,byteLength:L.byteLength,target:34963}),f.push({bufferView:u.length-1,byteOffset:0,componentType:5125,count:L.length,type:"SCALAR"}),H.CESIUM_primitive_outline={indices:f.length-1},b.push("CESIUM_primitive_outline")),s.push({uri:w,byteLength:d.byteLength}),u.push({buffer:s.length-1,byteOffset:0,byteLength:d.byteLength,target:34963});let W=[];return m>0&&(f.push({bufferView:u.length-1,byteOffset:0,componentType:5125,count:m,type:"SCALAR"}),W.push({attributes:z,indices:f.length-1,material:W.length,extensions:H})),m<t&&(f.push({bufferView:u.length-1,byteOffset:4*m,componentType:5125,count:t-m,type:"SCALAR"}),W.push({attributes:z,indices:f.length-1,material:W.length,extensions:H,extra:{isTransparent:!0}})),c.push({primitives:W}),g.push(0),y.push({mesh:0}),{buffers:s,bufferViews:u,accessors:f,meshes:c,nodes:y,nodesInScene:g,rootExtensions:p,extensionsUsed:b}}function Pt(t,e,n,r){let o=new Uint8Array(t,0,5);return 68===o[0]&&82===o[1]&&65===o[2]&&67===o[3]&&79===o[4]?jt(t,n):Ht(t,e,n,r)}function jt(t){let e=ut,n=new e.DecoderBuffer,r=new Uint8Array(t);n.Init(r,r.length);let o,a,i=new e.Decoder,l=i.GetEncodedGeometryType(n),s=new e.MetadataQuerier;l===e.TRIANGULAR_MESH&&(o=new e.Mesh,a=i.DecodeBufferToMesh(n,o));let u={vertexCount:[0],featureCount:0};if(h(a)&&a.ok()&&0!==o.ptr){let t=o.num_faces(),n=o.num_attributes(),r=o.num_points();u.indices=new Uint32Array(3*t);let a=u.indices;u.vertexCount[0]=r,u.scale_x=1,u.scale_y=1;let l=new e.DracoInt32Array(3);for(let e=0;e<t;++e)i.GetFaceFromMesh(o,e,l),a[3*e]=l.GetValue(0),a[3*e+1]=l.GetValue(1),a[3*e+2]=l.GetValue(2);e.destroy(l);for(let t=0;t<n;++t){let n=i.GetAttribute(o,t),a=kt(e,i,o,n,r),l=n.attribute_type(),f="unknown";l===e.POSITION?f="positions":l===e.NORMAL?f="normals":l===e.COLOR?f="colors":l===e.TEX_COORD&&(f="uv0s");let c=i.GetAttributeMetadata(o,t);if(0!==c.ptr){let t=s.NumEntries(c);for(let e=0;e<t;++e){let t=s.GetEntryName(c,e);"i3s-scale_x"===t?u.scale_x=s.GetDoubleEntry(c,"i3s-scale_x"):"i3s-scale_y"===t?u.scale_y=s.GetDoubleEntry(c,"i3s-scale_y"):"i3s-attribute-type"===t&&(f=s.GetStringEntry(c,"i3s-attribute-type"))}}h(u[f])&&console.log("Attribute already exists",f),u[f]=a,"feature-index"===f&&u.featureCount++}e.destroy(o)}return e.destroy(s),e.destroy(i),u}function kt(t,e,n,r,o){let a,i=r.num_components()*o,l=[function(){},function(){a=new t.DracoInt8Array(i),e.GetAttributeInt8ForAllPoints(n,r,a)||console.error("Bad stream");let o=new Int8Array(i);for(let t=0;t<i;++t)o[t]=a.GetValue(t);return o},function(){a=new t.DracoInt8Array(i),e.GetAttributeUInt8ForAllPoints(n,r,a)||console.error("Bad stream");let o=new Uint8Array(i);for(let t=0;t<i;++t)o[t]=a.GetValue(t);return o},function(){a=new t.DracoInt16Array(i),e.GetAttributeInt16ForAllPoints(n,r,a)||console.error("Bad stream");let o=new Int16Array(i);for(let t=0;t<i;++t)o[t]=a.GetValue(t);return o},function(){a=new t.DracoInt16Array(i),e.GetAttributeUInt16ForAllPoints(n,r,a)||console.error("Bad stream");let o=new Uint16Array(i);for(let t=0;t<i;++t)o[t]=a.GetValue(t);return o},function(){a=new t.DracoInt32Array(i),e.GetAttributeInt32ForAllPoints(n,r,a)||console.error("Bad stream");let o=new Int32Array(i);for(let t=0;t<i;++t)o[t]=a.GetValue(t);return o},function(){a=new t.DracoInt32Array(i),e.GetAttributeUInt32ForAllPoints(n,r,a)||console.error("Bad stream");let o=new Uint32Array(i);for(let t=0;t<i;++t)o[t]=a.GetValue(t);return o},function(){},function(){},function(){a=new t.DracoFloat32Array(i),e.GetAttributeFloatForAllPoints(n,r,a)||console.error("Bad stream");let o=new Float32Array(i);for(let t=0;t<i;++t)o[t]=a.GetValue(t);return o},function(){},function(){a=new t.DracoUInt8Array(i),e.GetAttributeUInt8ForAllPoints(n,r,a)||console.error("Bad stream");let o=new Uint8Array(i);for(let t=0;t<i;++t)o[t]=a.GetValue(t);return o}][r.data_type()]();return h(a)&&t.destroy(a),l}var W={position:function(t,e,n){let r=3*t.vertexCount;return t.positions=new Float32Array(e,n,r),n+4*r},normal:function(t,e,n){let r=3*t.vertexCount;return t.normals=new Float32Array(e,n,r),n+4*r},uv0:function(t,e,n){let r=2*t.vertexCount;return t.uv0s=new Float32Array(e,n,r),n+4*r},color:function(t,e,n){let r=4*t.vertexCount;return t.colors=new Uint8Array(e,n,r),n+r},featureId:function(t,e,n){return n+8*t.featureCount},id:function(t,e,n){return n+8*t.featureCount},faceRange:function(t,e,n){let r=2*t.featureCount;return t.faceRange=new Uint32Array(e,n,r),n+4*r},uvRegion:function(t,e,n){let r=4*t.vertexCount;return t["uv-region"]=new Uint16Array(e,n,r),n+2*r},region:function(t,e,n){let r=4*t.vertexCount;return t["uv-region"]=new Uint16Array(e,n,r),n+2*r}};function Ht(t,e,n,r){let o={vertexCount:0},a=new DataView(t);try{let i=0;if(o.vertexCount=a.getUint32(i,1),i+=4,o.featureCount=a.getUint32(i,1),i+=4,h(n))for(let e=0;e<n.attributes.length;e++)h(W[n.attributes[e]])?i=W[n.attributes[e]](o,t,i):console.error("Unknown decoder for",n.attributes[e]);else{let n=e.ordering,a=e.featureAttributeOrder;h(r)&&h(r.geometryData)&&h(r.geometryData[0])&&h(r.geometryData[0].params)&&(n=Object.keys(r.geometryData[0].params.vertexAttributes),a=Object.keys(r.geometryData[0].params.featureAttributes));for(let e=0;e<n.length;e++)i=(0,W[n[e]])(o,t,i);for(let e=0;e<a.length;e++)i=(0,W[a[e]])(o,t,i)}}catch(t){console.error(t)}return o.scale_x=1,o.scale_y=1,o}function Xt(t){let e,n=Pt(t.binaryData,t.schema,t.bufferInfo,t.featureData);if(h(t.geoidDataList)&&t.geoidDataList.length>0&&Lt(n.vertexCount,n.positions,n.scale_x,n.scale_y,t.cartographicCenter,t.geoidDataList,!1),Ot(n.vertexCount,n.positions,n.normals,t.cartographicCenter,t.cartesianCenter,t.parentRotation,t.ellipsoidRadiiSquare,n.scale_x,n.scale_y),h(n.uv0s)&&h(n["uv-region"])&&Tt(n.vertexCount,n.uv0s,n["uv-region"]),h(n["feature-index"]))e=n["feature-index"];else if(h(n.faceRange)){e=new Array(n.vertexCount);for(let t=0;t<n.faceRange.length-1;t+=2){let r=t/2,o=n.faceRange[t],a=n.faceRange[t+1];for(let t=o;t<=a;t++)e[3*t]=r,e[3*t+1]=r,e[3*t+2]=r}}if(t.calculateNormals){let t=vt(n.vertexCount,n.indices,n.positions,n.normals,n.uv0s,n.colors,e);h(t.normals)&&(n.normals=t.normals,h(t.vertexCount)&&(n.vertexCount=t.vertexCount,n.indices=t.indices,n.positions=t.positions,n.uv0s=t.uv0s,n.colors=t.colors,e=t.featureIndex))}let r=Mt(n.vertexCount,n.indices,n.positions,n.normals,n.uv0s,n.colors,e,t),o={positions:n.positions,indices:n.indices,featureIndex:e,sourceURL:t.url,cartesianCenter:t.cartesianCenter,parentRotation:t.parentRotation};return r._customAttributes=o,{meshData:r}}async function Yt(t,e){let n=t.webAssemblyConfig;return ut=h(n)&&h(n.wasmBinaryFile)?await(0,at.default)(n):await(0,at.default)(),!0}function zt(t,e){let n=t.webAssemblyConfig;return h(n)?Yt(t,e):Xt(t,e)}var se=yt(zt);export{se as default};