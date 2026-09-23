const e=require("./useWebGLCanvas-Bl86YbrR.cjs"),t=require("./cn-CFAiuoYh.cjs");let n=require("react"),r=require("react/jsx-runtime");var i=new Float32Array([-1,-1,3,-1,-1,3]),a=`precision highp float;

attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`,o=`precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform bool enableRainbow;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float edgeFade;
uniform float gridRotation;
uniform bool mouseInteraction;
uniform vec2 mousePosition;
uniform float mouseInfluence;
uniform float mouseInteractionRadius;
uniform bool lightMode;
varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= iResolution.x / iResolution.y;

  if (gridRotation != 0.0) {
    uv = rotate(gridRotation * pi / 180.0) * uv;
  }

  float dist = length(uv);
  float func = sin(pi * (iTime - dist));
  vec2 rippleUv = uv + uv * func * rippleIntensity;

  if (mouseInteraction && mouseInfluence > 0.0) {
    vec2 mouseUv = (mousePosition * 2.0 - 1.0);
    mouseUv.x *= iResolution.x / iResolution.y;
    float mouseDist = length(uv - mouseUv);

    float influence = mouseInfluence * exp(-mouseDist * mouseDist / (mouseInteractionRadius * mouseInteractionRadius));

    float mouseWave = sin(pi * (iTime * 2.0 - mouseDist * 3.0)) * influence;
    rippleUv += normalize(uv - mouseUv) * mouseWave * rippleIntensity * 0.3;
  }

  vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
  vec2 b = abs(a);

  float aaWidth = 0.5;
  vec2 smoothB = vec2(
    smoothstep(0.0, aaWidth, b.x),
    smoothstep(0.0, aaWidth, b.y)
  );

  vec3 color = vec3(0.0);
  color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
  color += exp(-gridThickness * smoothB.y);
  color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
  color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

  if (glowIntensity > 0.0) {
    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
  }

  // 0 at the centre of the section, 1 at its corners, for any aspect ratio.
  float sectionDist = length(vUv * 2.0 - 1.0) / 1.41421356;
  float ddd = exp(-2.0 * clamp(pow(sectionDist, fadeDistance), 0.0, 1.0));

  float vignette = 1.0 - pow(sectionDist, vignetteStrength);
  vignette = clamp(vignette, 0.0, 1.0);

  vec3 t;
  if (enableRainbow) {
    t = vec3(
      uv.x * 0.5 + 0.5 * sin(iTime),
      uv.y * 0.5 + 0.5 * cos(iTime),
      pow(cos(iTime), 4.0)
    ) + 0.5;
  } else {
    t = gridColor;
  }

  float finalFade = mix(1.0, ddd * vignette, edgeFade);
  float alpha = length(color) * finalFade * opacity;
  vec3 effect = color * t * finalFade * opacity;
  if (lightMode) {
    float peak = max(effect.r, max(effect.g, effect.b));
    vec3 chroma = pow(clamp(effect / max(peak, 0.0001), 0.0, 1.0), vec3(1.2));
    gl_FragColor = vec4(mix(vec3(1.0), chroma, clamp(alpha * 0.94, 0.0, 0.94)), 1.0);
  } else {
    gl_FragColor = vec4(effect, alpha);
  }
}`;function s(e){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e.trim());return t?[Number.parseInt(t[1],16)/255,Number.parseInt(t[2],16)/255,Number.parseInt(t[3],16)/255]:[1,1,1]}var c={lightMode:!0,gridColor:`#c9ccd6`,rippleIntensity:.03,gridSize:14,opacity:.8,vignetteStrength:1.2,edgeFade:.35,mouseInteraction:!0},l=.1,u=.05;function d({active:c=!0,enableRainbow:d=!1,gridColor:f=`#ffffff`,rippleIntensity:p=.05,gridSize:m=10,gridThickness:h=15,fadeDistance:g=1.5,vignetteStrength:_=2,glowIntensity:v=.1,opacity:y=1,edgeFade:b=1,gridRotation:x=0,mouseInteraction:S=!0,mouseInteractionRadius:C=1,lightMode:w=!1,pixelRatio:T,className:E,"data-testid":D=`ripple-grid-background`}){let O=(0,n.useMemo)(()=>s(f),[f]),k=(0,n.useRef)({enableRainbow:d,rgb:O,rippleIntensity:p,gridSize:m,gridThickness:h,fadeDistance:g,vignetteStrength:_,glowIntensity:v,opacity:y,edgeFade:b,gridRotation:x,mouseInteraction:S,mouseInteractionRadius:C,lightMode:w});k.current={enableRainbow:d,rgb:O,rippleIntensity:p,gridSize:m,gridThickness:h,fadeDistance:g,vignetteStrength:_,glowIntensity:v,opacity:y,edgeFade:b,gridRotation:x,mouseInteraction:S,mouseInteractionRadius:C,lightMode:w};let A=(0,n.useRef)({x:.5,y:.5}),j=(0,n.useRef)({x:.5,y:.5}),M=(0,n.useRef)(0),N=(0,n.useRef)(0),P=[+!!d,f,p,m,h,g,_,v,y,b,x,C,+!!w].join(`:`),{hostRef:F,canvasRef:I,status:L,reducedMotion:R}=e.i({active:c,version:P,...T===void 0?{}:{pixelRatio:T},setup:t=>{let n=e.t(t,a,o);if(!n)return null;let r=e.n(t,i);if(!r)return null;let s=[`iTime`,`iResolution`,`enableRainbow`,`gridColor`,`rippleIntensity`,`gridSize`,`gridThickness`,`fadeDistance`,`vignetteStrength`,`glowIntensity`,`opacity`,`edgeFade`,`gridRotation`,`mouseInteraction`,`mousePosition`,`mouseInfluence`,`mouseInteractionRadius`,`lightMode`],c={};for(let e of s)c[e]=t.getUniformLocation(n,e);return{program:n,buffer:r,position:t.getAttribLocation(n,`position`),uniforms:c}},draw:(e,t)=>{let n=k.current,{gl:r,width:i,height:a,time:o}=t;A.current.x+=(j.current.x-A.current.x)*l,A.current.y+=(j.current.y-A.current.y)*l,M.current+=(N.current-M.current)*u,r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.enable(r.BLEND),r.blendFunc(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA),r.useProgram(e.program),e.position>=0&&(r.bindBuffer(r.ARRAY_BUFFER,e.buffer),r.enableVertexAttribArray(e.position),r.vertexAttribPointer(e.position,2,r.FLOAT,!1,0,0));let s=e.uniforms;r.uniform1f(s.iTime,o*.001),r.uniform2f(s.iResolution,i,a),r.uniform1i(s.enableRainbow,+!!n.enableRainbow),r.uniform3f(s.gridColor,n.rgb[0],n.rgb[1],n.rgb[2]),r.uniform1f(s.rippleIntensity,R?0:n.rippleIntensity),r.uniform1f(s.gridSize,n.gridSize),r.uniform1f(s.gridThickness,n.gridThickness),r.uniform1f(s.fadeDistance,n.fadeDistance),r.uniform1f(s.vignetteStrength,n.vignetteStrength),r.uniform1f(s.glowIntensity,n.glowIntensity),r.uniform1f(s.opacity,n.opacity),r.uniform1f(s.edgeFade,Math.min(1,Math.max(0,n.edgeFade))),r.uniform1f(s.gridRotation,n.gridRotation),r.uniform1i(s.mouseInteraction,n.mouseInteraction&&!R?1:0),r.uniform2f(s.mousePosition,A.current.x,A.current.y),r.uniform1f(s.mouseInfluence,R?0:M.current),r.uniform1f(s.mouseInteractionRadius,n.mouseInteractionRadius),r.uniform1i(s.lightMode,+!!n.lightMode),r.drawArrays(r.TRIANGLES,0,3)},dispose:(e,t)=>{t.deleteProgram(e.program),t.deleteBuffer(e.buffer)}});(0,n.useEffect)(()=>{if(!S||typeof window>`u`)return;let e=e=>{let t=F.current?.getBoundingClientRect();if(!t||t.width===0||t.height===0)return;let n=e.clientX>=t.left&&e.clientX<=t.right&&e.clientY>=t.top&&e.clientY<=t.bottom;N.current=+!!n,n&&(j.current={x:(e.clientX-t.left)/t.width,y:1-(e.clientY-t.top)/t.height})};return window.addEventListener(`pointermove`,e,{passive:!0}),()=>window.removeEventListener(`pointermove`,e)},[S,F]);let z=L===`unsupported`;return(0,r.jsx)(`div`,{ref:F,"aria-hidden":`true`,"data-testid":D,"data-motion":R?`static`:`rippling`,"data-webgl":z?`unavailable`:`ready`,className:t.t(`pointer-events-none overflow-hidden`,E),children:(0,r.jsx)(`canvas`,{ref:I,"data-testid":`${D}-canvas`,className:`block h-full w-full`,...z?{hidden:!0}:{}})})}Object.defineProperty(exports,"n",{enumerable:!0,get:function(){return d}}),Object.defineProperty(exports,"t",{enumerable:!0,get:function(){return c}});