/*! For license information please see createBoxOutlineGeometry.js.LICENSE.txt */
import{a as d}from"./chunk-HVRXLRH7.js";import{a as l}from"./chunk-4S4T622A.js";import{b as O,c as h,d as p}from"./chunk-WRT5H5YZ.js";import{d as A}from"./chunk-2Z7LHEFB.js";import"./chunk-URXUHQWZ.js";import{a}from"./chunk-2ZKHVIZO.js";import{a as m}from"./chunk-H26ARMDM.js";import"./chunk-KROATL7C.js";import"./chunk-6A4YVUYV.js";import"./chunk-IPTRD2UF.js";import{a as u}from"./chunk-WF3Q7FOG.js";import{a as b,b as r}from"./chunk-NERDVOKQ.js";import{e as c}from"./chunk-4ACNSQDC.js";var g=new m;function f(t){let e=(t=u(t,u.EMPTY_OBJECT)).minimum,n=t.maximum;if(r.typeOf.object("min",e),r.typeOf.object("max",n),c(t.offsetAttribute)&&t.offsetAttribute===d.TOP)throw new b("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._min=m.clone(e),this._max=m.clone(n),this._offsetAttribute=t.offsetAttribute,this._workerName="createBoxOutlineGeometry"}f.fromDimensions=function(t){let e=(t=u(t,u.EMPTY_OBJECT)).dimensions;r.typeOf.object("dimensions",e),r.typeOf.number.greaterThanOrEquals("dimensions.x",e.x,0),r.typeOf.number.greaterThanOrEquals("dimensions.y",e.y,0),r.typeOf.number.greaterThanOrEquals("dimensions.z",e.z,0);let n=m.multiplyByScalar(e,.5,new m);return new f({minimum:m.negate(n,new m),maximum:n,offsetAttribute:t.offsetAttribute})},f.fromAxisAlignedBoundingBox=function(t){return r.typeOf.object("boundindBox",t),new f({minimum:t.minimum,maximum:t.maximum})},f.packedLength=2*m.packedLength+1,f.pack=function(t,e,n){return r.typeOf.object("value",t),r.defined("array",e),n=u(n,0),m.pack(t._min,e,n),m.pack(t._max,e,n+m.packedLength),e[n+2*m.packedLength]=u(t._offsetAttribute,-1),e};var w=new m,x=new m,_={minimum:w,maximum:x,offsetAttribute:void 0};f.unpack=function(t,e,n){r.defined("array",t),e=u(e,0);let i=m.unpack(t,e,w),o=m.unpack(t,e+m.packedLength,x),a=t[e+2*m.packedLength];return c(n)?(n._min=m.clone(i,n._min),n._max=m.clone(o,n._max),n._offsetAttribute=-1===a?void 0:a,n):(_.offsetAttribute=-1===a?void 0:a,new f(_))},f.createGeometry=function(t){let e=t._min,n=t._max;if(m.equals(e,n))return;let r=new l,i=new Uint16Array(24),o=new Float64Array(24);o[0]=e.x,o[1]=e.y,o[2]=e.z,o[3]=n.x,o[4]=e.y,o[5]=e.z,o[6]=n.x,o[7]=n.y,o[8]=e.z,o[9]=e.x,o[10]=n.y,o[11]=e.z,o[12]=e.x,o[13]=e.y,o[14]=n.z,o[15]=n.x,o[16]=e.y,o[17]=n.z,o[18]=n.x,o[19]=n.y,o[20]=n.z,o[21]=e.x,o[22]=n.y,o[23]=n.z,r.position=new p({componentDatatype:a.DOUBLE,componentsPerAttribute:3,values:o}),i[0]=4,i[1]=5,i[2]=5,i[3]=6,i[4]=6,i[5]=7,i[6]=7,i[7]=4,i[8]=0,i[9]=1,i[10]=1,i[11]=2,i[12]=2,i[13]=3,i[14]=3,i[15]=0,i[16]=0,i[17]=4,i[18]=1,i[19]=5,i[20]=2,i[21]=6,i[22]=3,i[23]=7;let u=m.subtract(n,e,g),f=.5*m.magnitude(u);if(c(t._offsetAttribute)){let e=o.length,n=t._offsetAttribute===d.NONE?0:1,m=new Uint8Array(e/3).fill(n);r.applyOffset=new p({componentDatatype:a.UNSIGNED_BYTE,componentsPerAttribute:1,values:m})}return new h({attributes:r,indices:i,primitiveType:O.LINES,boundingSphere:new A(m.ZERO,f),offsetAttribute:t._offsetAttribute})};var y=f;function L(t,e){return c(e)&&(t=y.unpack(t,e)),y.createGeometry(t)}var R=L;export{R as default};