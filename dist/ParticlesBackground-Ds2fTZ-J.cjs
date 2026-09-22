const e=require("./useWebGLCanvas-Bl86YbrR.cjs"),t=require("./cn-CFAiuoYh.cjs"),n=require("./RisingParticles-CuGgfU7A.cjs");let r=require("react"),i=require("react/jsx-runtime");var a=250,o=[`#ffffff`,`#ffffff`,`#ffffff`],s=[`#ffffff`,`#c7d2fe`,`#a5b4fc`],c=`precision highp float;

attribute vec3 position;
attribute vec4 random;
attribute vec3 color;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSpread;
uniform float uBaseSize;
uniform float uSizeRandomness;

varying vec4 vRandom;
varying vec3 vColor;

void main() {
  vRandom = random;
  vColor = color;

  vec3 pos = position * uSpread;
  pos.z *= 10.0;

  vec4 mPos = modelMatrix * vec4(pos, 1.0);
  float t = uTime;
  mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
  mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
  mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

  vec4 mvPos = viewMatrix * mPos;

  if (uSizeRandomness == 0.0) {
    gl_PointSize = uBaseSize;
  } else {
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
  }

  gl_Position = projectionMatrix * mvPos;
}`,l=`precision highp float;

uniform float uTime;
uniform float uAlphaParticles;
varying vec4 vRandom;
varying vec3 vColor;

void main() {
  vec2 uv = gl_PointCoord.xy;
  float d = length(uv - vec2(0.5));

  if (uAlphaParticles < 0.5) {
    if (d > 0.5) {
      discard;
    }
    gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
  } else {
    float circle = smoothstep(0.5, 0.4, d) * 0.8;
    gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
  }
}`;function u(e){let t=e.replace(/^#/,``);t.length===3&&(t=t.split(``).map(e=>e+e).join(``));let n=Number.parseInt(t.slice(0,6),16);return Number.isFinite(n)?[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]:[1,1,1]}function d(e,t,n,r){let i=1/Math.tan(e*Math.PI/360),a=1/(n-r);return new Float32Array([i/t,0,0,0,0,i,0,0,0,0,(r+n)*a,-1,0,0,2*r*n*a,0])}function f(e,t){let n=new Float32Array(16);for(let r=0;r<4;r+=1)for(let i=0;i<4;i+=1){let a=0;for(let n=0;n<4;n+=1)a+=e[n*4+i]*t[r*4+n];n[r*4+i]=a}return n}function p(e,t,n,r,i){let a=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,e,t,0,1]),o=Math.cos(n),s=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(i),d=Math.sin(i),p=new Float32Array([1,0,0,0,0,o,s,0,0,-s,o,0,0,0,0,1]),m=new Float32Array([c,0,-l,0,0,1,0,0,l,0,c,0,0,0,0,1]);return f(a,f(new Float32Array([u,d,0,0,-d,u,0,0,0,0,1,0,0,0,0,1]),f(m,p)))}function m(e){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,-e,1])}function h({active:e=!0,particleCount:n=200,particleSpread:s=10,speed:c=.1,particleColors:l,moveParticlesOnHover:u=!1,particleHoverFactor:d=1,alphaParticles:f=!1,particleBaseSize:p=100,sizeRandomness:m=1,cameraDistance:h=20,disableRotation:_=!1,pixelRatio:v,seed:y=1,fallbackIntensity:b=`medium`,className:x,children:S,"data-testid":C=`particles-background`}){let[w,T]=(0,r.useState)(e);return(0,r.useEffect)(()=>{if(e){T(!0);return}let t=setTimeout(()=>T(!1),a);return()=>clearTimeout(t)},[e]),(0,i.jsxs)(`div`,{"data-testid":C,"data-active":e?`true`:`false`,className:t.t(`relative isolate`,w&&`uic-particles-ground overflow-hidden`,x),children:[w&&(0,i.jsx)(g,{active:e,particleCount:n,particleSpread:s,speed:c,particleColors:l,moveParticlesOnHover:u,particleHoverFactor:d,alphaParticles:f,particleBaseSize:p,sizeRandomness:m,cameraDistance:h,disableRotation:_,...v===void 0?{}:{pixelRatio:v},seed:y,fallbackIntensity:b,testId:C},`${Math.max(1,Math.round(n))}|${(l?.length?l:o).join(`,`)}`),S]})}function g(a){let{testId:s}=a,f=(0,r.useRef)(a);f.current=a;let h=(0,r.useRef)({x:0,y:0}),g=(0,r.useRef)(0),_=(0,r.useRef)(0),v=(a.particleColors?.length?a.particleColors:o).join(`,`),y=(0,r.useMemo)(()=>{let e=Math.max(1,Math.round(a.particleCount)),t=new Float32Array(e*3),n=new Float32Array(e*4),r=new Float32Array(e*3),i=v.split(`,`);for(let a=0;a<e;a+=1){let e=0,o=0,s=0,c=0;do e=Math.random()*2-1,o=Math.random()*2-1,s=Math.random()*2-1,c=e*e+o*o+s*s;while(c>1||c===0);let l=Math.cbrt(Math.random());t.set([e*l,o*l,s*l],a*3),n.set([Math.random(),Math.random(),Math.random(),Math.random()],a*4),r.set(u(i[Math.floor(Math.random()*i.length)]??`#ffffff`),a*3)}return{count:e,positions:t,randoms:n,colors:r}},[a.particleCount,v]),b=(0,r.useRef)(y);b.current=y;let x=[y.count,a.particleSpread,a.particleBaseSize,a.sizeRandomness,+!!a.alphaParticles,a.cameraDistance,+!!a.disableRotation].join(`:`),{hostRef:S,canvasRef:C,status:w,reducedMotion:T}=e.i({active:a.active,version:x,...a.pixelRatio===void 0?{}:{pixelRatio:a.pixelRatio},setup:t=>{let n=e.t(t,c,l);if(!n)return null;let{positions:r,randoms:i,colors:a,count:o}=b.current,s=e.n(t,r),u=e.n(t,i),d=e.n(t,a);return!s||!u||!d?null:{program:n,buffers:{position:s,random:u,color:d},attributes:{position:t.getAttribLocation(n,`position`),random:t.getAttribLocation(n,`random`),color:t.getAttribLocation(n,`color`)},uniforms:{modelMatrix:t.getUniformLocation(n,`modelMatrix`),viewMatrix:t.getUniformLocation(n,`viewMatrix`),projectionMatrix:t.getUniformLocation(n,`projectionMatrix`),uTime:t.getUniformLocation(n,`uTime`),uSpread:t.getUniformLocation(n,`uSpread`),uBaseSize:t.getUniformLocation(n,`uBaseSize`),uSizeRandomness:t.getUniformLocation(n,`uSizeRandomness`),uAlphaParticles:t.getUniformLocation(n,`uAlphaParticles`)},count:o}},draw:(e,t)=>{let n=f.current,{gl:r,width:i,height:a,delta:o}=t;_.current+=o*n.speed,n.disableRotation||(g.current+=.01*n.speed),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.disable(r.DEPTH_TEST),r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),r.useProgram(e.program);let s=(e,t,n)=>{e<0||(r.bindBuffer(r.ARRAY_BUFFER,t),r.enableVertexAttribArray(e),r.vertexAttribPointer(e,n,r.FLOAT,!1,0,0))};s(e.attributes.position,e.buffers.position,3),s(e.attributes.random,e.buffers.random,4),s(e.attributes.color,e.buffers.color,3);let c=Math.max(1,i/Math.max(1,S.current?.clientWidth||i)),l=n.disableRotation?0:Math.sin(_.current*2e-4)*.1,u=n.disableRotation?0:Math.cos(_.current*5e-4)*.15,v=n.moveParticlesOnHover?-h.current.x*n.particleHoverFactor:0,y=n.moveParticlesOnHover?-h.current.y*n.particleHoverFactor:0;r.uniformMatrix4fv(e.uniforms.projectionMatrix??null,!1,d(15,i/Math.max(1,a),.1,100)),r.uniformMatrix4fv(e.uniforms.viewMatrix??null,!1,m(n.cameraDistance)),r.uniformMatrix4fv(e.uniforms.modelMatrix??null,!1,p(v,y,l,u,n.disableRotation?0:g.current)),r.uniform1f(e.uniforms.uTime??null,_.current*.001),r.uniform1f(e.uniforms.uSpread??null,n.particleSpread),r.uniform1f(e.uniforms.uBaseSize??null,n.particleBaseSize*c),r.uniform1f(e.uniforms.uSizeRandomness??null,n.sizeRandomness),r.uniform1f(e.uniforms.uAlphaParticles??null,+!!n.alphaParticles),r.drawArrays(r.POINTS,0,e.count)},dispose:(e,t)=>{t.deleteProgram(e.program),t.deleteBuffer(e.buffers.position),t.deleteBuffer(e.buffers.random),t.deleteBuffer(e.buffers.color)}});(0,r.useEffect)(()=>{if(!a.moveParticlesOnHover||typeof window>`u`)return;let e=e=>{let t=S.current?.getBoundingClientRect();if(!(!t||t.width===0||t.height===0)){if(!(e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom)){h.current={x:0,y:0};return}h.current={x:(e.clientX-t.left)/t.width*2-1,y:-((e.clientY-t.top)/t.height*2-1)}}};return window.addEventListener(`pointermove`,e,{passive:!0}),()=>window.removeEventListener(`pointermove`,e)},[a.moveParticlesOnHover,S]);let E=w===`unsupported`;return(0,i.jsxs)(`div`,{ref:S,"aria-hidden":`true`,"data-testid":`${s}-backdrop`,"data-motion":T?`static`:`drifting`,"data-webgl":E?`unavailable`:`ready`,className:t.t(`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-[250ms] motion-reduce:transition-none`,a.active?`uic-particles-in opacity-100`:`opacity-0`),children:[(0,i.jsx)(`canvas`,{ref:C,"data-testid":`${s}-canvas`,className:`block h-full w-full`,...E?{hidden:!0}:{}}),E&&(0,i.jsx)(n.t,{active:a.active,intensity:a.fallbackIntensity,seed:a.seed,className:`absolute inset-0`,"data-testid":`${s}-fallback`})]})}Object.defineProperty(exports,"n",{enumerable:!0,get:function(){return h}}),Object.defineProperty(exports,"t",{enumerable:!0,get:function(){return s}});