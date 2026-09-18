(() => {
  'use strict';
  const body = document.body;
  if (!('IntersectionObserver' in window) || !('ResizeObserver' in window)) return;
  const hydra = body.classList.contains('hydra');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(max, n));
  const mix = (a, b, p) => a + (b - a) * p;
  const ease = p => p * p * (3 - 2 * p);
  const scene = document.querySelector(hydra ? '.terrain' : '.scene');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { alpha: hydra });
  if (!ctx) return;
  canvas.className = 'motion-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  scene.append(canvas);
  const track = document.createElement('div');
  track.className = hydra ? 'hero-track' : 'scene-track';
  const pinned = hydra ? document.querySelector('.hero') : scene;
  pinned.before(track);
  track.append(pinned);
  const state = { w: 0, h: 0, x: 0, y: 0, tx: 0, ty: 0, progress: 0, target: 0, time: 0, visible: true, paused: reduced.matches };
  let manualPause = false;
  let raf = 0;
  let lastTime = 0;
  let trackTop = 0;
  let travel = 1;
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.id = 'pause-motion';
  toggle.className = 'motion-toggle';
  body.append(toggle);

  document.querySelector('h1').innerHTML = document.querySelector('h1').innerHTML.split('<br>').map((line, i) => `<span class="title-line"><span class="title-words" style="--delay:${i * .15}s">${line}</span></span>`).join('');
  const reveals = [...document.querySelectorAll('.section-top,.section-heading,.module,.method h2,.method p,.terminal,.instructor:not(.instructor-full),.instructor-full>div,.course-method,.course-details>details,.registration>div,.faq>details,.manifesto h2,.manifesto p,.instructor-line,.offer-copy,.offer>div,.stamp')];
  reveals.forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.module').forEach((el, i) => el.style.setProperty('--reveal-delay', `${i * .12}s`));
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); }
  }, { threshold: .08 });
  reveals.forEach(el => revealObserver.observe(el));
  document.addEventListener('focusin', event => {
    const target = event.target.closest('.reveal');
    if (target) { target.classList.add('in-view'); revealObserver.unobserve(target); }
  });
  document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => { link.closest('details').open = false; }));
  const ambientObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('motion-offscreen', !entry.isIntersecting));
  });
  document.querySelectorAll('.tech-band,.terminal').forEach(el => ambientObserver.observe(el));
  const render = hydra ? initHydra() : initIlloca();
  body.classList.add('motion-ready');
  scene.classList.add('canvas-ready');

  function measure() {
    const rect = scene.getBoundingClientRect();
    state.w = rect.width;
    state.h = rect.height;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    trackTop = track.getBoundingClientRect().top + scrollY;
    const top = parseFloat(getComputedStyle(pinned).top) || 0;
    travel = Math.max(1, track.offsetHeight - pinned.offsetHeight || pinned.offsetHeight * .7);
    trackTop -= top;
    updateScroll();
    render();
  }
  function updateScroll() {
    state.target = state.paused ? 0 : clamp((scrollY - trackTop) / travel);
    wake();
  }
  function wake() {
    if (!raf && !state.paused && !document.hidden && state.visible) raf = requestAnimationFrame(frame);
  }
  function frame(now) {
    raf = 0;
    if (state.paused || document.hidden || !state.visible) { lastTime = 0; return; }
    const dt = lastTime ? Math.min(40, now - lastTime) : 16.7;
    lastTime = now;
    state.time += dt / 1000;
    const factor = 1 - Math.exp(-dt / 85);
    state.progress = mix(state.progress, state.target, factor);
    state.x = mix(state.x, state.tx, factor);
    state.y = mix(state.y, state.ty, factor);
    render();
    if (hydra || state.time < 1.8 || Math.abs(state.progress - state.target) > .0001 || Math.abs(state.x - state.tx) + Math.abs(state.y - state.ty) > .001) wake();
    else lastTime = 0;
  }
  function setPaused() {
    state.paused = manualPause || reduced.matches;
    body.classList.toggle('motion-paused', state.paused);
    body.classList.toggle('tab-hidden', document.hidden);
    toggle.textContent = reduced.matches ? 'Movimiento reducido' : manualPause ? '▶ Activar movimiento' : 'Ⅱ Pausar movimiento';
    toggle.setAttribute('aria-pressed', String(state.paused));
    toggle.disabled = reduced.matches;
    if (state.paused) {
      cancelAnimationFrame(raf); raf = 0; lastTime = 0;
      state.progress = state.target = state.x = state.y = state.tx = state.ty = 0;
    }
    measure();
    wake();
  }
  toggle.addEventListener('click', () => { manualPause = !manualPause; setPaused(); });
  reduced.addEventListener('change', setPaused);
  addEventListener('scroll', updateScroll, { passive: true });
  new ResizeObserver(measure).observe(scene);
  document.fonts.ready.then(measure);
  new IntersectionObserver(entries => {
    state.visible = entries[0].isIntersecting;
    if (state.visible) wake(); else { cancelAnimationFrame(raf); raf = 0; lastTime = 0; }
  }, { rootMargin: '60px' }).observe(pinned);
  pinned.addEventListener('pointermove', e => {
    if (state.paused || e.pointerType === 'touch') return;
    const rect = pinned.getBoundingClientRect();
    state.tx = clamp((e.clientX - rect.left) / rect.width, 0, 1) * 2 - 1;
    state.ty = clamp((e.clientY - rect.top) / rect.height, 0, 1) * 2 - 1;
    if (!hydra) document.querySelector('.coordinates').textContent = `X ${e.clientX.toFixed(2)} / Y ${e.clientY.toFixed(2)}`;
    wake();
  });
  pinned.addEventListener('pointerleave', () => { state.tx = state.ty = 0; wake(); });
  document.addEventListener('visibilitychange', () => {
    body.classList.toggle('tab-hidden', document.hidden);
    if (document.hidden) { cancelAnimationFrame(raf); raf = 0; lastTime = 0; } else wake();
  });
  setPaused();

  function initHydra() {
    const band = document.querySelector('.tech-band .wrap');
    const set = document.createElement('div');
    set.className = 'stack-set';
    while (band.firstChild) set.append(band.firstChild);
    band.append(set);
    const copy = set.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    band.append(copy);
    const hint = document.createElement('div');
    hint.className = 'motion-hint';
    hint.innerHTML = '<i></i><span>MUEVE EL CURSOR / DESPLÁZATE PARA TRANSFORMAR</span>';
    pinned.append(hint);
    const label = scene.querySelector('.terrain-label');
    const cols = 62, rows = 36;
    const count = cols * rows;
    const points = Array.from({length:count}, (_, i) => {
      const u = (i % cols) / (cols - 1), v = Math.floor(i / cols) / (rows - 1);
      const x = (u - .5) * 940, z = (v - .5) * 600;
      const height = 190 * Math.exp(-(x*x/90000 + z*z/36000)) + 95 * Math.exp(-((x-235)**2/21000 + (z+75)**2/31000));
      const lon = u * Math.PI * 2, lat = (v - .5) * Math.PI;
      return {x,z,height,gx:270*Math.cos(lat)*Math.sin(lon),gy:270*Math.sin(lat),gz:270*Math.cos(lat)*Math.cos(lon)};
    });
    const projected = new Float32Array(count * 3);
    const palette = ['#5e2b17','#a63d17','#ed5016','#ff8a36','#ffe0a2'];
    const nodes = [710,1147,1580,1350,880];
    let phase = -1;
    return () => {
      if (!state.w || !state.h) return;
      const {w,h,time,x:mx,y:my,progress:p} = state;
      ctx.clearRect(0,0,w,h);
      const morph = ease(clamp((p-.12)/.77));
      const yaw = -.22 + mx*.25 + time*.075;
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const pitch = .57 + my*.12 - morph*.25;
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const scale = Math.min(w/1010,h/580);
      const assembled = state.paused ? 1 : ease(clamp(time/1.5));
      for (let i=0;i<count;i++) {
        const a = points[i];
        const wave = state.paused ? 0 : Math.sin(a.x*.012+time*1.4)*Math.cos(a.z*.014-time*.6)*17;
        const ripple = Math.exp(-((a.x-mx*340)**2+(a.z-my*200)**2)/17000)*43;
        const xx = mix(a.x,a.gx,morph), zz = mix(a.z,a.gz,morph);
        const yy = mix(a.height+wave+ripple,a.gy,morph);
        const rx = xx*cy-zz*sy, rz = xx*sy+zz*cy;
        const depth = rz*cp+yy*sp;
        const k = 1000/(1000+depth);
        const scatter = (1-assembled)*(Math.sin(i*17.21)*300);
        projected[i*3] = w*.52+(rx+scatter)*scale*k;
        projected[i*3+1] = h*(.64-morph*.11)+(rz*sp-yy*cp+scatter)*scale*k;
        projected[i*3+2] = clamp(Math.floor((yy+100)/90 + (1-depth/500)),0,4);
      }
      const size = Math.max(1.6,scale*3.2);
      for (let color=0;color<5;color++) {
        ctx.fillStyle = palette[color]; ctx.beginPath();
        for (let i=0;i<count;i++) if (projected[i*3+2]===color) ctx.rect(projected[i*3],projected[i*3+1],size,size);
        ctx.fill();
      }
      ctx.strokeStyle = '#d0c6b78c';ctx.lineWidth=.65;ctx.setLineDash([3,6]);ctx.beginPath();
      nodes.forEach((n,i) => {const next=nodes[(i+1)%nodes.length];ctx.moveTo(projected[n*3],projected[n*3+1]);ctx.lineTo(projected[next*3],projected[next*3+1]);});
      ctx.stroke();ctx.setLineDash([]);
      nodes.forEach((n,i) => {
        const x=projected[n*3],y=projected[n*3+1],s=12+Math.sin(time*1.6+i)*3;
        ctx.strokeStyle='#ded6bf';ctx.strokeRect(x-s,y-s,s*2,s*2);
        ctx.fillStyle='#ff601f';ctx.fillRect(x-3,y-3,6,6);
        if(w>550){ctx.fillStyle='#e6d6bd';ctx.font='8px monospace';ctx.fillText(['01 / INTENCIÓN','02 / CONTEXTO','03 / APLICACIÓN','04 / CONEXIÓN','05 / TERRITORIO'][i],x+s+7,y-s);}
      });
      const nextPhase = p < .36 ? 0 : p < .74 ? 1 : 2;
      if (phase!==nextPhase) {
        phase=nextPhase;
        label.textContent=['01 / RELIEVE VIVO — TU PUNTO DE PARTIDA','02 / CONECTAR DATOS — AMPLIAR LA MIRADA','03 / UN TERRITORIO DE POSIBILIDADES'][phase];
        canvas.dataset.phase=String(phase);
      }
    };
  }

  function initIlloca() {
    const story = document.createElement('div');
    story.className = 'scene-story';
    story.innerHTML = '<div><span class="eyebrow">01 / LA INTENCIÓN</span><h2>Todo empieza<br>con una idea.</h2><p>Un territorio por explorar.<br>Una pregunta que merece tomar forma.</p></div><div><span class="eyebrow">02 / LA CONSTRUCCIÓN</span><h2>Capa a capa,<br>cobra vida.</h2><p>Acércate. Conecta datos, mapas y tu criterio territorial.</p></div><div><span class="eyebrow">03 / LA APLICACIÓN</span><h2>De imaginar<br>a interactuar.</h2><p>Tu mirada se convierte en una herramienta que puedes compartir.</p></div>';
    scene.append(story);
    const stops = document.createElement('div');
    stops.className='scene-stops';stops.setAttribute('role','group');stops.setAttribute('aria-label','Etapas de la escena');
    ['01 Idea','02 Territorio','03 Aplicación'].forEach((text,i)=>{
      const b=document.createElement('button');b.type='button';b.textContent=text;b.setAttribute('aria-pressed','false');
      b.addEventListener('click',()=>window.scrollTo({top:trackTop+travel*[0,.51,1][i],behavior:state.paused?'instant':'smooth'}));
      stops.append(b);
    });
    scene.append(stops);
    const progress=document.createElement('div');progress.className='scene-progress';progress.setAttribute('aria-hidden','true');progress.innerHTML='<span></span>';scene.append(progress);
    const panel=document.createElement('div');panel.className='scene-app';panel.setAttribute('aria-hidden','true');
    panel.innerHTML='<span class="mono">TU APP / VISTA CONECTADA</span><strong>Territorio vivo.</strong><p>Mapa + análisis + visualización</p><div class="mini-bars"><span style="--bar:45%;--bar-delay:0s"></span><span style="--bar:78%;--bar-delay:.1s"></span><span style="--bar:55%;--bar-delay:.2s"></span><span style="--bar:100%;--bar-delay:.3s"></span><span style="--bar:68%;--bar-delay:.4s"></span></div><p>Ejemplo visual · datos ilustrativos</p>';
    scene.append(panel);
    scene.querySelector('.scene-bottom p').classList.add('scene-scroll-note');
    scene.querySelector('.scene-bottom p').textContent='DESPLÁZATE ↓ / DE LA IDEA A LA APLICACIÓN';
    const buildings=[[-230,-90,52,44,68],[-142,-110,60,40,110],[-75,-40,46,52,54],[135,-130,58,46,100],[225,-90,63,48,48],[120,-25,52,52,146],[250,20,50,40,84],[-220,100,65,42,45],[-130,130,42,42,98],[130,115,56,48,64],[235,150,48,38,110]];
    const river=[[-48,-250],[-40,-170],[-95,-90],[-100,-10],[-30,55],[12,120],[-4,250],[58,250],[75,120],[40,55],[-25,-10],[-20,-90],[20,-170],[18,-250]];
    let phase=-1;
    let project;
    function polygon(vertices,fill,stroke='#254b91',width=1) {
      ctx.beginPath();vertices.forEach((v,i)=>{const p=project(v);i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);});ctx.closePath();
      if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke();}
    }
    function line(vertices,color,width=1) {
      ctx.beginPath();vertices.forEach((v,i)=>{const p=project(v);i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);});ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();
    }
    return () => {
      if(!state.w||!state.h)return;
      const {w,h,progress:p,x:mx,y:my}=state;
      const mobile=w<700;
      ctx.fillStyle='#1648c6';ctx.fillRect(0,0,w,h);
      const zoom=Math.sin(p*Math.PI)*.42;
      const entrance=state.paused?1:ease(clamp(state.time/1.5));
      const yaw=-.48+p*.9+mx*.065+(1-entrance)*.15;
      const elevation=.60+p*.55+my*.035;
      const cy=Math.cos(yaw),sy=Math.sin(yaw),ce=Math.cos(elevation),se=Math.sin(elevation);
      const scale=Math.min(w/(mobile?960:1360),h/(mobile?570:760))*(1+zoom)*(.9+entrance*.1);
      const cx=w*(mobile?.48:.58)-p*w*.03;
      const centerY=h*(mobile?.60:.57);
      project=([x,y,z])=>{const rx=x*cy-z*sy,rz=x*sy+z*cy;return[cx+rx*scale,centerY+(rz*se-y*ce)*scale,rz*ce+y*se];};
      ctx.globalAlpha=.13;
      for(let i=-700;i<=700;i+=70){line([[i,-20,-650],[i,-20,650]],'#d0dcf5');line([[-800,-20,i],[800,-20,i]],'#d0dcf5');}
      ctx.globalAlpha=1;
      ctx.save();
      ctx.beginPath();
      if(!mobile)ctx.rect(w<1100?240:310,0,w,h);
      else ctx.rect(0,h<600?205:250,w,h);
      ctx.clip();
      polygon([[-430,-23,-250],[430,-23,-250],[430,-23,250],[-430,-23,250]],'#0b3291',null);
      polygon([[-430,0,-250],[430,0,-250],[430,0,250],[-430,0,250]],'#eee8d5','#1b3d83',1.3);
      for(let i=-400;i<430;i+=50)line([[i,1,-250],[i,1,250]],'#afb8a366',.7);
      for(let i=-200;i<250;i+=50)line([[-430,1,i],[430,1,i]],'#afb8a366',.7);
      polygon(river.map(([x,z])=>[x,2,z]),'#6190d4','#406daf',1);
      line([[-14,3,-245],[-9,3,-170],[-57,3,-85],[-60,3,-10],[5,3,60],[44,3,125],[28,3,247]],'#c9deec',2);
      for(const [x,z] of [[-330,-145],[332,100]]){
        for(let r=25;r<=105;r+=18){const ring=[];for(let i=0;i<=50;i++){const t=i/50*Math.PI*2;ring.push([x+Math.cos(t)*r,3,z+Math.sin(t)*r*.7]);}line(ring,'#8e9c77',.8);}
      }
      for(const z of [-50,62]){line([[-410,3,z],[405,3,z]],'#b7bfa8',10*scale);line([[-410,4,z],[405,4,z]],'#fbf6e8',3*scale);}
      for(const x of [-280,80,195]){line([[x,3,-225],[x,3,215]],'#b7bfa8',9*scale);line([[x,4,-225],[x,4,215]],'#fbf6e8',2*scale);}
      const faces=[];
      buildings.forEach(([x,z,bw,bd,bh],i)=>{
        const rise=state.paused?1:ease(clamp((p-.08)*3.5-i*.035));
        const height=3+bh*rise;
        const a=[x,4,z],b=[x+bw,4,z],c=[x+bw,4,z+bd],d=[x,4,z+bd];
        const A=[x,height,z],B=[x+bw,height,z],C=[x+bw,height,z+bd],D=[x,height,z+bd];
        const depth=project([x+bw/2,0,z+bd/2])[2];
        faces.push({depth,parts:[[a,b,B,A,'#aabbbc'],[b,c,C,B,'#1648c6'],[c,d,D,C,'#b5c4bc'],[d,a,A,D,'#3564b6'],[A,B,C,D,'#f9f2de']],x,z,bw,bd,height});
      });
      faces.sort((a,b)=>a.depth-b.depth);
      faces.forEach(({parts,x,z,bw,bd,height})=>{
        for(const [a,b,c,d,color] of parts)polygon([a,b,c,d],color,'#2b4c89',.8);
        if(height>20)for(let floor=18;floor<height-8;floor+=18)line([[x+5,floor,z+bd+.5],[x+bw-5,floor,z+bd+.5]],'#738fac',.65);
        polygon([[x+5,height+1,z+5],[x+bw-5,height+1,z+5],[x+bw-5,height+1,z+bd-5],[x+5,height+1,z+bd-5]],null,'#a4b19f',.65);
      });
      const ring=[];for(let i=0;i<=70;i++){const t=i/70*Math.PI*2;ring.push([150+Math.cos(t)*120,8,Math.sin(t)*105]);}
      ctx.setLineDash([5,5]);line(ring,'#e87139',1.5);ctx.setLineDash([]);
      if(p>.65){
        const visible=clamp((p-.65)/.25);ctx.globalAlpha=visible;
        for(const [x,z] of [[-190,-90],[155,8],[-135,135],[255,170]]){
          const [sx,sy]=project([x,95,z]);ctx.fillStyle='#ee7039';ctx.beginPath();ctx.arc(sx,sy,5,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#ee7039';ctx.beginPath();ctx.arc(sx,sy,11,0,Math.PI*2);ctx.stroke();
        }ctx.globalAlpha=1;
      }
      ctx.restore();
      const nextPhase=p<.3?0:p<.72?1:2;
      if(phase!==nextPhase){
        phase=nextPhase;canvas.dataset.phase=String(phase);
        [...story.children].forEach((el,i)=>{el.classList.toggle('is-current',i===phase);el.setAttribute('aria-hidden',String(i!==phase));});
        [...stops.children].forEach((el,i)=>el.setAttribute('aria-pressed',String(i===phase)));
        panel.classList.toggle('is-current',phase===2);
      }
      progress.firstChild.style.transform=`scaleX(${p})`;
    };
  }
})();
