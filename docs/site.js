try{
/* The resting candle from the phone app (aodDraw), drawn on each screen. */
(function(){
 var cvs=[].slice.call(document.querySelectorAll('#schedule .sx-cv')),still=matchMedia('(prefers-reduced-motion: reduce)').matches,run=false;
 function draw(cv,t,k){
  var W=cv.clientWidth,H=cv.clientHeight,d=devicePixelRatio||1;if(!W||!H)return;
  if(cv.width!==Math.round(W*d)){cv.width=Math.round(W*d);cv.height=Math.round(H*d)}
  var x=cv.getContext('2d');x.setTransform(d,0,0,d,0,0);x.clearRect(0,0,W,H);
  var u=Math.min(W/90,H/230),s=t/1000+k*3.1,cx=W/2;
  var maxH=H*.5,frac=.62,base=H/2+maxH*frac/2+14*u,top=base-maxH*frac,ww=30*u;
  var n=(Math.sin(s*7.3)*.5+Math.sin(s*13.1+1.7)*.3+Math.sin(s*2.1+.4)*.6)/1.4;
  var g=Math.pow(Math.max(0,Math.sin(s*.83+.6)),10)*Math.sin(s*21);
  var fl=1+.07*n+.1*g,sway=Math.sin(s*1.7)*1.4+Math.sin(s*5.3+1)*.7+g*3.2;
  var fh=36*fl*u,fw=8.5*(1.06-.06*fl)*u,by=top-7*u,tipX=cx+sway*u,tipY=by-fh;
  var gx=cx+sway*.3*u,gy=by-fh*.4,edge=Math.min(gx,W-gx,gy,H-gy)-2;
  var gr=x.createRadialGradient(gx,gy,0,gx,gy,Math.max(20,Math.min(190*u*fl,edge)));
  gr.addColorStop(0,'rgba(255,170,80,'+(.34*fl).toFixed(3)+')');gr.addColorStop(.35,'rgba(255,135,50,.12)');gr.addColorStop(.75,'rgba(255,120,40,.03)');gr.addColorStop(1,'rgba(255,120,40,0)');
  x.fillStyle=gr;x.fillRect(0,0,W,H);
  var wg=x.createLinearGradient(0,top,0,base);
  wg.addColorStop(0,'rgba(255,222,175,'+Math.min(1,.62*fl).toFixed(3)+')');wg.addColorStop(.18,'rgba(185,148,106,.42)');wg.addColorStop(1,'rgba(60,48,38,0)');
  x.fillStyle=wg;x.beginPath();if(x.roundRect)x.roundRect(cx-ww/2,top,ww,base-top,[5*u,5*u,0,0]);else x.rect(cx-ww/2,top,ww,base-top);x.fill();
  var rim=x.createRadialGradient(cx,top+2*u,0,cx,top+2*u,ww*.6);rim.addColorStop(0,'rgba(255,230,188,'+Math.min(1,.55*fl).toFixed(3)+')');rim.addColorStop(1,'rgba(255,230,188,0)');
  x.fillStyle=rim;x.beginPath();x.ellipse(cx,top+2*u,ww/2,3.5*u,0,0,7);x.fill();
  x.strokeStyle='#5a4632';x.lineWidth=2*u;x.lineCap='round';x.beginPath();x.moveTo(cx,top+u);x.quadraticCurveTo(cx,top-5*u,cx+sway*.15*u,top-9*u);x.stroke();
  x.fillStyle='rgba(255,120,48,.95)';x.beginPath();x.arc(cx+sway*.15*u,top-9*u,1.3*u,0,7);x.fill();
  var fg=x.createRadialGradient(cx+sway*.2*u,by-fh*.28,0,cx+sway*.2*u,by-fh*.35,fh*.75);
  fg.addColorStop(0,'rgba(255,251,232,1)');fg.addColorStop(.3,'rgba(255,214,128,.97)');fg.addColorStop(.7,'rgba(246,140,52,.7)');fg.addColorStop(1,'rgba(210,70,24,0)');
  x.fillStyle=fg;x.beginPath();x.moveTo(cx,by+2*u);
  x.bezierCurveTo(cx-fw*1.35,by-fh*.18,tipX-fw*.75+sway*.2*u,by-fh*.68,tipX,tipY);
  x.bezierCurveTo(tipX+fw*.75+sway*.2*u,by-fh*.68,cx+fw*1.35,by-fh*.18,cx,by+2*u);x.fill();
 }
 function frame(t){cvs.forEach(function(c,i){draw(c,t,i)});if(run&&!still)requestAnimationFrame(frame)}
 frame(800);addEventListener('resize',function(){frame(800)});
 if('IntersectionObserver' in window)new IntersectionObserver(function(e){var was=run;run=e[0].isIntersecting;if(run&&!was&&!still)requestAnimationFrame(frame)}).observe(document.querySelector('#schedule .sk-row3'));
})();
}catch(e){console.error(e)}
try{
(function(){
"use strict";
var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── billing toggle ─────────────────────────────────── */
/* Both prices are in the markup with one set hidden, so the page is right
   before this runs and right if it never does. */
var billSet = document.querySelector(".bill-set");
if (billSet) billSet.addEventListener("click", function(e){
  var hit = e.target.closest(".bill-btn");
  if (!hit) return;
  var yearly = hit.getAttribute("data-cycle") === "year";
  Array.prototype.forEach.call(billSet.querySelectorAll(".bill-btn"), function(b){
    b.setAttribute("aria-pressed",
      String((b.getAttribute("data-cycle") === "year") === yearly));
  });
  var pricing = document.getElementById("pricing");
  Array.prototype.forEach.call(pricing.querySelectorAll(".bill-m"), function(n){ n.hidden = yearly; });
  Array.prototype.forEach.call(pricing.querySelectorAll(".bill-y"), function(n){ n.hidden = !yearly; });
});

/* ── theme ──────────────────────────────────────────────────── */
var themeBtn = document.getElementById("themeToggle");
var metaTheme = document.getElementById("metaThemeColor");
function paintMeta(){
  if (metaTheme) metaTheme.setAttribute("content",
    document.documentElement.getAttribute("data-theme") === "dark" ? "#0d0d0f" : "#faf9f6");
}
paintMeta();
themeBtn.addEventListener("click", function(){
  var dark = document.documentElement.getAttribute("data-theme") === "dark";
  if (dark) document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme","dark");
  try { localStorage.setItem("theme", dark ? "light" : "dark"); } catch(e){}
  paintMeta();
});

/* ── the wheel — real app presets ───────────────────────────── */
var PRESETS = [
  ["10 sec",     10], ["1 min",    60], ["5 min",   300], ["10 min",  600],
  ["15 min",    900], ["20 min", 1200], ["25 min", 1500], ["30 min", 1800],
  ["45 min",   2700], ["1 hour", 3600], ["1½ hour", 5400],
  ["2 hours",  7200], ["3 hours", 10800]
];
var DEG = 15, RAD = 235, DEFAULT_IDX = 3;

var el    = document.querySelector(".wheel"),
    track = el.querySelector(".wheel-track"),
    pos = DEFAULT_IDX, target = DEFAULT_IDX, raf = null;

var opts = PRESETS.map(function(p){
  var s = document.createElement("span");
  s.className = "wheel-opt";
  s.textContent = p[0];
  track.appendChild(s);
  return s;
});

function draw(){
  for (var i = 0; i < opts.length; i++){
    var d = i - pos, ang = d * DEG;
    if (Math.abs(ang) > 92){ opts[i].style.opacity = 0; continue; }
    /* opacity floors at .8 — below that the dimmed options drop under the
       3:1 contrast line. Deliberate; don't "improve" it. */
    var op = 0.8 + 0.2 * Math.pow(Math.max(0, Math.cos(ang * Math.PI / 180)), 1.5);
    opts[i].style.transform =
      "translateY(-50%) rotateX(" + (-ang) + "deg) translateZ(" + RAD + "px)";
    opts[i].style.opacity = op;
    opts[i].classList.toggle("is-sel", Math.round(pos) === i);
  }
  var idx = Math.max(0, Math.min(PRESETS.length - 1, Math.round(pos)));
  el.setAttribute("aria-valuenow", PRESETS[idx][1]);
  if (window.__wheelMoved) window.__wheelMoved(pos, idx);
  el.setAttribute("aria-valuetext", PRESETS[idx][0]);
}
function picked(){
  return PRESETS[Math.max(0, Math.min(PRESETS.length - 1, Math.round(target)))];
}
function loop(){
  pos += (target - pos) * .18;
  if (Math.abs(target - pos) < .001){ pos = target; raf = null; draw(); return; }
  draw();
  raf = requestAnimationFrame(loop);
}
function run(){ if (reduce){ pos = target; draw(); return; }
                if (!raf) raf = requestAnimationFrame(loop); }
function go(v){ target = Math.max(0, Math.min(PRESETS.length - 1, v)); run(); }

var spun = 0;
/* only steals the scroll once focused — otherwise it hijacks the page */
el.addEventListener("wheel", function(e){
  if (document.activeElement !== el) return;
  var dir = e.deltaY > 0 ? 1 : -1, at = Math.round(target);
  if ((dir > 0 && at === PRESETS.length - 1) || (dir < 0 && at === 0)) return;
  e.preventDefault();
  var now = e.timeStamp || Date.now();
  if (now - spun < 110) return;
  spun = now;
  go(at + dir);
}, {passive:false});
el.addEventListener("keydown", function(e){
  if (e.key === "ArrowUp"   || e.key === "ArrowLeft" ){ e.preventDefault(); go(Math.round(target) - 1); }
  if (e.key === "ArrowDown" || e.key === "ArrowRight"){ e.preventDefault(); go(Math.round(target) + 1); }
});
var drag = null;
el.addEventListener("pointerdown", function(e){
  el.focus({preventScroll:true});
  drag = {y:e.clientY, start:target};
  el.setPointerCapture(e.pointerId);
});
el.addEventListener("pointermove", function(e){
  if (!drag) return;
  target = Math.max(0, Math.min(PRESETS.length - 1,
           drag.start - (e.clientY - drag.y) / 58));
  run();
});
function drop(){ if (drag){ drag = null; go(Math.round(target)); } }
el.addEventListener("pointerup", drop);
el.addEventListener("pointercancel", drop);
draw();

/* One-time wheel introduction, interrupted immediately by interaction. */
if (!reduce) {
  var introFrame = null, introDelay = null, introCancelled = false;
  function cancelWheelIntro(){
    introCancelled = true;
    clearTimeout(introDelay);
    if (introFrame !== null) {
      cancelAnimationFrame(introFrame);
      introFrame = null;
      pos = target = Math.round(pos);
      draw();
    }
  }
  ["pointerdown", "focus", "wheel", "keydown"].forEach(function(type){
    el.addEventListener(type, cancelWheelIntro, {capture:true, passive:true});
  });
  document.getElementById("demoStart").addEventListener("click", cancelWheelIntro, true);
  function startWheelIntro(){
    if (introCancelled) return;
    introDelay = setTimeout(function(){
      var bounds = el.getBoundingClientRect();
      if (introCancelled || document.hidden || bounds.bottom <= 0 || bounds.top >= innerHeight) return;
      var start = pos, end = Math.min(PRESETS.length - 1, start + 5), began = null;
      var settled = Math.max(start, end - 1);
      function animateIntro(time){
        if (introCancelled) return;
        if (began === null) began = time;
        var elapsed = time - began;
        // Scroll forward, hesitate for 250ms, then reconsider by one notch.
        var returning = elapsed >= 1050;
        var progress = returning ? Math.min(1, (elapsed - 1050) / 400)
                                 : Math.min(1, elapsed / 800);
        var eased = progress * progress * (3 - 2 * progress);
        pos = target = returning ? end + (settled - end) * eased
                                 : start + (end - start) * eased;
        draw();
        introFrame = elapsed < 1450 ? requestAnimationFrame(animateIntro) : null;
      }
      introFrame = requestAnimationFrame(animateIntro);
    }, 350);
  }
  if (document.readyState === "complete") startWheelIntro();
  else window.addEventListener("load", startWheelIntro, {once:true});
}

/* ── demo overlay ───────────────────────────────────────────── */
var DEMO_SECS = 15;
var demo      = document.getElementById("demo"),
    demoClock = document.getElementById("demoClock"),
    demoBar   = document.getElementById("demoBar"),
    demoState = document.getElementById("demoState"),
    demoSub   = document.getElementById("demoSub"),
    demoTimer = null, lastFocus = null;

function mmss(s){
  s = Math.max(0, Math.ceil(s));
  var h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), q = s % 60;
  var pad = function(n){ return (n < 10 ? "0" : "") + n; };
  return h ? h + ":" + pad(m) + ":" + pad(q) : pad(m) + ":" + pad(q);
}
function openDemo(){
  var total = picked()[1];
  var rate  = Math.max(1, total / DEMO_SECS);
  var left  = total, t0 = null;

  lastFocus = document.activeElement;
  demo.hidden = false; demo.setAttribute("aria-hidden", "false");
  demo.classList.remove("done");
  demoState.textContent = "● Locked";
  demoSub.textContent = "Clicking, typing and Alt+Tab stop reaching Windows " +
                        "until the clock hits zero.";
  demoClock.textContent = mmss(left);
  demoBar.style.transform = "scaleX(1)";
  requestAnimationFrame(function(){ demo.classList.add("on"); });
  document.body.style.overflow = "hidden";
  document.getElementById("demoBack").focus();

  if (demoTimer) cancelAnimationFrame(demoTimer);
  (function tick(ts){
    if (t0 === null) t0 = ts;
    left = total - (ts - t0) / 1000 * rate;
    if (left <= 0){
      demoClock.textContent = mmss(0);
      demoBar.style.transform = "scaleX(0)";
      demo.classList.add("done");
      demoState.textContent = "● Unlocked";
      demoSub.textContent = "Session over. Your mouse and keyboard come straight back.";
      demoTimer = null;
      return;
    }
    demoClock.textContent = mmss(left);
    demoBar.style.transform = "scaleX(" + (left / total) + ")";
    demoTimer = requestAnimationFrame(tick);
  })(performance.now());
}
function closeDemo(){
  if (demoTimer){ cancelAnimationFrame(demoTimer); demoTimer = null; }
  demo.classList.remove("on");
  document.body.style.overflow = "";
  setTimeout(function(){
    demo.hidden = true; demo.setAttribute("aria-hidden", "true");
    if (lastFocus) lastFocus.focus();
  }, 320);
}
document.getElementById("demoBack").addEventListener("click", closeDemo);
document.addEventListener("keydown", function(e){
  if (e.key === "Escape" && !demo.hidden) closeDemo();
});


/* ═══ THE CANDLE ═══════════════════════════════════════════════════ */
/* sound: the Ember pack, off until somebody asks for it */
var state = "idle";
const snd=(()=>{
  let ac=null, out=null, bedBus=null, bedCtx=false, bedVol=1, nb=null, on=true, amb=true, bedStops=[], lastTick=0, pack='ember', rooms=null;
  function setRoom(){if(!rooms)return;const want=(P[pack]&&P[pack].room)||'packs';for(const k in rooms)rooms[k][0].gain.value=k===want?rooms[k][1]:0}
  function wake(){
    if(!on)return null;
    if(!ac){
      const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return null;
      ac=new AC();
      const comp=ac.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=3;comp.connect(ac.destination);
      out=ac.createGain();out.gain.value=.9;out.connect(comp);
      bedBus=ac.createGain();bedBus.gain.value=bedVol;bedBus.connect(out);
      // a small room, so nothing sounds dry
      const room=(len,pw,gain)=>{const ir=ac.createBuffer(2,ac.sampleRate*len,ac.sampleRate);
        for(let ch=0;ch<2;ch++){const d=ir.getChannelData(ch);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,pw)}
        const rv=ac.createConvolver();rv.buffer=ir;const g=ac.createGain();g.gain.value=0;out.connect(rv);rv.connect(g);g.connect(comp);return [g,gain]};
      rooms={packs:room(1.6,3,.24)};setRoom();app.load();
      nb=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
    }
    if(ac.state==='suspended')ac.resume();
    return ac;
  }
  const T=()=>ac.currentTime, R=(a,b)=>a+Math.random()*(b-a);
  // anything made while the bed is playing goes through the hearth's own volume
  const bus=()=>bedCtx&&bedBus?bedBus:out;
  function env(g,t,a,peak,dur){g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+dur)}
  function noise({t=T(),dur=.2,type='bandpass',f0=1000,f1=f0,q=1,peak=.3,a=.005}){
    const s=ac.createBufferSource();s.buffer=nb;s.loop=true;
    const f=ac.createBiquadFilter();f.type=type;f.Q.value=q;f.frequency.setValueAtTime(f0,t);f.frequency.exponentialRampToValueAtTime(f1,t+dur);
    const g=ac.createGain();env(g,t,a,peak,dur);
    s.connect(f);f.connect(g);g.connect(bus());s.start(t,Math.random()*1.5);s.stop(t+dur+.05);
  }
  function tone({t=T(),f=440,f1=f,dur=.3,type='sine',peak=.2,a=.005,cut=0}){
    const o=ac.createOscillator();o.type=type;o.frequency.setValueAtTime(f,t);if(f1!==f)o.frequency.exponentialRampToValueAtTime(f1,t+dur);
    const g=ac.createGain();env(g,t,a,peak,dur);
    if(cut){const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=cut;o.connect(lp);lp.connect(g)}else o.connect(g);
    g.connect(bus());o.start(t);o.stop(t+dur+.05);
  }
  // a struck bell: a fundamental plus inharmonic partials that die faster
  function bell(t,f,dur,peak,parts=[[1,1,1],[2.76,.32,.45],[5.4,.12,.25],[.5,.25,.8]]){
    parts.forEach(([r,g,d])=>tone({t,f:f*r,dur:dur*d,peak:peak*g,a:.004}));
  }
  // a wave: filtered noise that swells and draws back
  function wave(t,dur,peak,lo=220,hi=1500){
    const s=ac.createBufferSource();s.buffer=nb;s.loop=true;const f=ac.createBiquadFilter();f.type='lowpass';f.Q.value=.4;
    f.frequency.setValueAtTime(lo,t);f.frequency.linearRampToValueAtTime(hi,t+dur*.42);f.frequency.exponentialRampToValueAtTime(lo,t+dur);
    const g=ac.createGain();g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+dur*.42);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    s.connect(f);f.connect(g);g.connect(bus());s.start(t,Math.random());s.stop(t+dur+.1);
  }
  // continuous layers for the burn; each returns a stopper
  function hum(type,f,q,gain,fade=1.2){
    const s=ac.createBufferSource();s.buffer=nb;s.loop=true;const fl=ac.createBiquadFilter();fl.type=type;fl.frequency.value=f;fl.Q.value=q;
    const g=ac.createGain();g.gain.setValueAtTime(.0001,T());g.gain.exponentialRampToValueAtTime(gain,T()+fade);
    s.connect(fl);fl.connect(g);g.connect(bus());s.start();return fadeOut(g,[s]);
  }
  function drone(fs,gain,type='sine',fade=2){
    const g=ac.createGain();g.gain.setValueAtTime(.0001,T());g.gain.exponentialRampToValueAtTime(gain,T()+fade);g.connect(bus());
    const os=fs.map(f=>{const o=ac.createOscillator();o.type=type;o.frequency.value=f;o.connect(g);o.start();return o});
    return fadeOut(g,os);
  }
  function fadeOut(g,srcs){return (fd=.6)=>{const t=T();g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(Math.max(.0001,g.gain.value),t);g.gain.exponentialRampToValueAtTime(.0001,t+fd);srcs.forEach(s=>s.stop(t+fd+.1))}}
  function every(fn,min,max,first=null){let alive=true,id;const ctx=bedCtx;const go=()=>{if(!alive)return;const pv=bedCtx;bedCtx=ctx;try{fn()}finally{bedCtx=pv};id=setTimeout(go,R(min,max))};id=setTimeout(go,first??R(0,min));return ()=>{alive=false;clearTimeout(id)}}

  // The All Block's own sound set, baked from sfx.py, so this pack is byte-for-byte what both apps play
  // The sound set loads from sfx/app-sfx.js the first time sound is switched on
  const app={bufs:{},last:-1,
    load(){if(!window.APP_SFX){const sc=document.createElement('script');sc.src='sfx/app-sfx.js';sc.onload=()=>app.load();document.head.appendChild(sc);return}Object.entries(window.APP_SFX).forEach(async([k,u])=>{try{const b=await (await fetch(u)).arrayBuffer();app.bufs[k]=await ac.decodeAudioData(b)}catch(_){}})},
    play(k){const b=app.bufs[k];if(!b)return;const s=ac.createBufferSource();s.buffer=b;s.connect(ac.destination);s.start()}};

  const PENT=[523.25,587.33,659.25,783.99,880,1046.5,1174.66,1318.51,1567.98,1760,2093];
  const LOFI=[220,261.63,329.63,392,440,523.25,659.25,783.99,880,1046.5,1318.51];
  const chirp=(t,f0,f1,d,p)=>tone({t,f:f0,f1,dur:d,peak:p,a:.006});

  // shared defaults; each pack overrides what it needs
  const base={
    tick(n){const t=T();noise({t,dur:.035,f0:3800-n*120,q:5,peak:.32,a:.001});tone({t,f:1300-n*45,f1:900-n*30,dur:.05,peak:.07,a:.001});tone({t,f:140,f1:90,dur:.06,peak:.12,a:.002});},
    press(){const t=T();tone({t,f:180,f1:110,dur:.09,peak:.22,a:.002});noise({t,dur:.025,type:'highpass',f0:2500,peak:.08,a:.001});},
    strike(){const t=T();
      noise({t,dur:.09,f0:2200,f1:4800,q:1.4,peak:.42,a:.004});
      noise({t:t+.12,dur:.16,f0:2600,f1:6500,q:1.1,peak:.55,a:.004});
      for(let i=0;i<6;i++)noise({t:t+.2+Math.random()*.18,dur:.01+Math.random()*.02,type:'highpass',f0:3000+Math.random()*3000,peak:.18*Math.random()+.05,a:.001});
      noise({t:t+.22,dur:.35,f0:1200,f1:500,q:.8,peak:.25,a:.03});},
    ignite(){const t=T();noise({t,dur:.75,type:'lowpass',f0:250,f1:1400,q:.6,peak:.5,a:.12});tone({t,f:95,f1:52,dur:.55,peak:.32,a:.03});tone({t:t+.05,f:190,f1:120,dur:.4,peak:.06,a:.05});},
    bed(){return [hum('lowpass',420,.7,.05),every(()=>{const t=T(),big=Math.random()<.12;
      noise({t,dur:big?.03:.012,f0:big?1800:2600+Math.random()*2400,q:big?2:6,peak:big?.28:.05+Math.random()*.1,a:.001});
      if(big&&Math.random()<.5)noise({t:t+.04,dur:.015,type:'highpass',f0:4000,peak:.08,a:.001});},40,320)]},
    blow(){const t=T();noise({t,dur:.55,f0:700,f1:350,q:.7,peak:.5,a:.06});noise({t,dur:.4,type:'lowpass',f0:500,f1:200,q:.5,peak:.3,a:.04});noise({t:t+.3,dur:.5,type:'highpass',f0:5500,f1:7000,peak:.06,a:.02});},
    chime(){const t=T();[[523.25,0],[783.99,.16]].forEach(([f,d])=>{tone({t:t+d,f,dur:2.8,peak:.16,a:.008});tone({t:t+d,f:f*2,dur:1.6,peak:.05,a:.008});tone({t:t+d,f:f*2.76,dur:.8,peak:.025,a:.004});tone({t:t+d,f:f*.5,dur:2.2,peak:.05,a:.02})});},
    snuff(){const t=T();noise({t,dur:.25,type:'highpass',f0:3000,f1:6000,peak:.18,a:.01});tone({t,f:160,f1:90,dur:.12,peak:.1});},
    rise(){const t=T();noise({t,dur:.6,f0:300,f1:1600,q:1.2,peak:.12,a:.2});tone({t,f:330,f1:660,dur:.6,peak:.04,a:.2});}
  };

  const P={
    hearth:{name:'Hearth',desc:'A struck match, a soft crackle while it burns, and a warm two-note bell at the end.'},

    lofi:{name:'Lo-fi',desc:'Soft synth plucks, a warm chord as it lights, only vinyl crackle while it burns, a tape stop and a jazz chord at the end.',
      tick(n){const t=T();tone({t,f:LOFI[n],dur:.35,type:'triangle',peak:.1,a:.004,cut:1400});},
      press(){const t=T();tone({t,f:110,f1:70,dur:.12,peak:.22,a:.003});},
      strike(){const t=T();tone({t,f:80,f1:50,dur:.18,peak:.25,a:.002});for(let i=0;i<5;i++)noise({t:t+R(0,.25),dur:.006,type:'highpass',f0:3000,peak:.15,a:.001});},
      ignite(){const t=T();[174.61,220,261.63,329.63].forEach(f=>{tone({t,f,dur:2.8,type:'sawtooth',peak:.025,a:.8,cut:900});tone({t,f:f*1.004,dur:2.8,type:'sawtooth',peak:.02,a:.8,cut:900})});},
      bed(){return [hum('highpass',6000,.5,.012,1.5),every(()=>noise({t:T(),dur:.006,type:'highpass',f0:R(2000,5000),peak:R(.03,.12),a:.001}),20,260)]},
      blow(){const t=T();tone({t,f:440,f1:55,dur:.9,type:'sawtooth',peak:.06,cut:1200});tone({t,f:330,f1:41,dur:.9,type:'triangle',peak:.06});},
      chime(){const t=T()+.5;[261.63,329.63,392,493.88,587.33].forEach((f,i)=>{tone({t:t+i*.035,f,dur:3,peak:.06,a:.006});tone({t:t+i*.035,f:f*2,dur:1,peak:.012,a:.006})});},
      rise(){const t=T();tone({t,f:55,f1:330,dur:.6,type:'triangle',peak:.08,cut:1500});}},

    shore:{name:'Shore',desc:'Pebble clicks, a wave as it lights, slow waves while it burns, and a buoy bell over the water at the end.',
      tick(n){const t=T();noise({t,dur:.02,f0:2600-n*60,q:3,peak:.25,a:.001});tone({t,f:1700-n*40,dur:.02,peak:.04,a:.001});},
      press(){const t=T();noise({t,dur:.04,f0:1400,q:2,peak:.2,a:.001});},
      strike(){wave(T(),1.6,.18,300,2000);},
      ignite(){wave(T()+.2,3.2,.32,200,1600);},
      bed(){return [hum('lowpass',260,.5,.03,2),every(()=>wave(T(),R(4.5,6.5),R(.18,.3)),6500,9500,3500)]},
      blow(){wave(T(),2.4,.25,250,1200);},
      chime(){const t=T()+.4;bell(t,392,5,.13);bell(t+1.6,392,5,.1);},
      stopFade:2.5,
      rise(){wave(T(),1.4,.12,300,1800);}},

    night:{name:'Night garden',desc:'A match in the dark, crickets while it burns, and the first birds of the morning when it ends.',
      tick(n){const t=T();noise({t,dur:.02,f0:1900+n*60,q:4,peak:.2,a:.001});tone({t,f:260,f1:160,dur:.04,peak:.06});},
      bed(){const cr=(f,p)=>{const t=T();for(let i=0;i<3;i++)tone({t:t+i*.055,f,dur:.035,peak:p,a:.004})};
        return [hum('lowpass',300,.5,.025,2),every(()=>cr(4600,.02),700,1300),every(()=>cr(5200,.012),1100,2100,900),every(()=>{const t=T();tone({t,f:R(380,420),f1:R(330,360),dur:.5,peak:.01,a:.15})},9000,16000,8000)]},
      chime(){const t=T()+.5;const s=[[3000,4200,.1],[3400,4600,.08],[4400,3000,.14],[3600,4800,.07],[3600,4800,.07],[4800,3400,.18]];let d=0;s.forEach(([a,b,l])=>{chirp(t+d,a,b,l,.05);d+=l+.05});chirp(t+1.6,2500,3600,.25,.04);chirp(t+1.95,2600,3700,.25,.035);}},

    quiet:{name:'Quiet',desc:'Almost nothing: tiny soft clicks, a low swell when it lights, silence while it burns, and one soft note at the end.',
      tick(n){const t=T();noise({t,dur:.008,type:'highpass',f0:3000,peak:.1,a:.001});},
      press(){const t=T();tone({t,f:120,f1:90,dur:.06,peak:.1});},
      strike(){},
      ignite(){const t=T();tone({t,f:220,dur:.9,peak:.05,a:.3});tone({t,f:330,dur:.9,peak:.02,a:.35});},
      bed(){return []},
      blow(){const t=T();noise({t,dur:.4,type:'lowpass',f0:600,f1:250,peak:.12,a:.08});},
      chime(){const t=T();tone({t,f:659.25,dur:2.2,peak:.1,a:.01});tone({t,f:1318.5,dur:.8,peak:.015,a:.01});},
      snuff(){},
      rise(){const t=T();tone({t,f:330,f1:440,dur:.5,peak:.03,a:.2});}},

    app:{name:'The app today',desc:'The exact sounds the desktop and Android apps play now: the wheel blips, the press, the bowl strike when a block starts, a lower bowl when it finishes, and the two-note blip when one ends early. Nothing plays while it burns.',
      // the apps' own WAV files (sfx.py), played dry, the way both apps play them
      tick(n){app.play(n>app.last?'blip_down':'blip_up');app.last=n},
      press(){app.play('press')}, strike(){app.play('start')}, ignite(){},
      bed(){return []}, blow(){}, chime(){app.play('complete')}, snuff(){app.play('cancel')}, rise(){}},

    temple:{name:'Temple',desc:'A wooden fish for each step, a gong as it lights, a low chant-like drone while it burns, and three gongs to finish.',
      tick(n){const t=T();tone({t,f:640+n*18,f1:470,dur:.07,type:'triangle',peak:.17,a:.001});noise({t,dur:.02,f0:950,q:9,peak:.14,a:.001});},
      press(){const t=T();tone({t,f:420,f1:330,dur:.08,type:'triangle',peak:.15,a:.001});},
      strike(){const t=T();tone({t,f:120,f1:80,dur:.15,peak:.2,a:.003});noise({t,dur:.08,type:'lowpass',f0:400,peak:.14,a:.002});},
      ignite(){const t=T();bell(t,98,9,.2,[[1,1,1],[1.48,.5,.8],[2.1,.4,.6],[2.9,.25,.45],[4.2,.12,.3],[.5,.3,1]]);noise({t,dur:2.5,type:'lowpass',f0:200,f1:900,q:.5,peak:.08,a:.8});},
      bed(){return [drone([65.41,65.8],.03),drone([98.0,130.81],.012,'triangle'),every(()=>{const t=T();tone({t,f:R(180,200),dur:.06,type:'triangle',peak:.05,a:.001})},6000,6000,4000)]},
      chime(){const t=T();[[110,0],[98,2.2],[82.41,4.4]].forEach(([f,d])=>bell(t+d,f,8,.18,[[1,1,1],[1.48,.5,.8],[2.1,.4,.6],[2.9,.25,.45],[4.2,.12,.3]]));},
      rise(){const t=T();bell(t,196,2,.05,[[1,1,1],[2.1,.3,.5]]);}},

    fireplace:{name:'Fireplace',desc:'Logs knocking for each step, a big whoosh as it lights, a roaring fire with loud pops while it burns, and a low bell at the end.',
      tick(n){const t=T();tone({t,f:210-n*6,f1:130,dur:.07,type:'triangle',peak:.2,a:.001});noise({t,dur:.03,type:'lowpass',f0:900,peak:.12,a:.001});},
      press(){const t=T();tone({t,f:160,f1:100,dur:.1,type:'triangle',peak:.2,a:.001});},
      ignite(){const t=T();noise({t,dur:1.6,type:'lowpass',f0:180,f1:1600,q:.6,peak:.6,a:.3});tone({t,f:70,f1:45,dur:1,peak:.3,a:.08});},
      bed(){return [hum('lowpass',240,.6,.09,2),hum('bandpass',800,.5,.02,2),every(()=>{const t=T(),big=Math.random()<.2;
        noise({t,dur:big?.04:.015,f0:big?1400:R(2000,5000),q:big?1.5:5,peak:big?.35:R(.05,.16),a:.001});
        if(big)for(let i=0;i<3;i++)noise({t:t+R(.03,.15),dur:.01,type:'highpass',f0:4000,peak:.08,a:.001});},30,220)]},
      chime(){const t=T();[[392,0],[293.66,.4]].forEach(([f,d])=>bell(t+d,f,3.5,.13));},
      rise(){const t=T();noise({t,dur:.8,type:'lowpass',f0:200,f1:1200,q:.6,peak:.18,a:.3});}},

    breath:{name:'Breathe',desc:'A soft heartbeat for each step, a long exhale as it lights, slow breathing to follow while it burns (six breaths a minute), and a quiet bowl at the end.',
      tick(n){const t=T();tone({t,f:62,f1:44,dur:.11,peak:.32,a:.004});tone({t:t+.13,f:58,f1:42,dur:.09,peak:.18,a:.004});},
      press(){const t=T();tone({t,f:70,f1:48,dur:.12,peak:.3,a:.004});},
      strike(){const t=T();noise({t,dur:1.2,type:'lowpass',f0:250,f1:900,q:.5,peak:.14,a:.9});},
      ignite(){const t=T();noise({t,dur:2.2,type:'lowpass',f0:900,f1:220,q:.5,peak:.16,a:.2});},
      bed(){const breathe=()=>{const t=T();noise({t,dur:4.6,type:'lowpass',f0:260,f1:950,q:.5,peak:.06,a:3.8});noise({t:t+4.8,dur:5,type:'lowpass',f0:950,f1:230,q:.5,peak:.07,a:.6})};
        return [hum('lowpass',150,.5,.015,2),every(breathe,10000,10000,300)]},
      blow(){const t=T();noise({t,dur:1.2,type:'lowpass',f0:900,f1:250,q:.5,peak:.18,a:.1});},
      chime(){const t=T();bell(t,261.63,6,.12,[[1,1,1],[1.006,.6,1],[2.71,.25,.5]]);},
      stopFade:2,
      snuff(){const t=T();tone({t,f:62,f1:44,dur:.12,peak:.25});},
      rise(){const t=T();noise({t,dur:1,type:'lowpass',f0:250,f1:800,q:.5,peak:.08,a:.6});}},

    ember:{name:'Ember',desc:'Hearth\'s match, button clicks and bell, the app\'s own wheel blips, and a slower, calmer crackle while it burns.',
      // the wheel: the apps' own blips (pack 6); everything else not named here falls back to Hearth (pack 1)
      tick(n){app.play(n>app.last?'blip_down':'blip_up');app.last=n},
      // Hearth's crackle, slowed and softened: a lower, darker bed that swells gently,
      // crackles about a third as often, quieter and duller, and rare, muffled pops
      bed(){
        const s=ac.createBufferSource();s.buffer=nb;s.loop=true;const fl=ac.createBiquadFilter();fl.type='lowpass';fl.frequency.value=300;fl.Q.value=.6;
        const g=ac.createGain();g.gain.setValueAtTime(.0001,T());g.gain.exponentialRampToValueAtTime(.04,T()+3);
        const lfo=ac.createOscillator();lfo.frequency.value=.07;const lg=ac.createGain();lg.gain.value=.012;lfo.connect(lg);lg.connect(g.gain);
        s.connect(fl);fl.connect(g);g.connect(bus());s.start();lfo.start();
        return [fadeOut(g,[s,lfo]),every(()=>{const t=T(),big=Math.random()<.06;
          noise({t,dur:big?.045:R(.015,.03),f0:big?1100:R(1400,3000),q:big?1.6:4,peak:big?.14:R(.025,.06),a:big?.003:.002});
          if(big&&Math.random()<.4)noise({t:t+R(.08,.2),dur:.02,f0:R(1600,2400),q:4,peak:.035,a:.002});},180,1100,600)]},
      stopFade:2}
  };
  const cur=()=>P[pack], call=(k,...a)=>{if(!(on&&wake()))return;(cur()[k]||base[k]).apply(null,a)};
  return {
    wake, packs:P,
    tick(n){const now=performance.now();if(now-lastTick<28)return;lastTick=now;call('tick',n)},
    press:()=>call('press'), strike:()=>call('strike'), ignite:()=>call('ignite'), blow:()=>call('blow'),
    chime:()=>call('chime'), snuff:()=>call('snuff'), rise:()=>call('rise'),
    startBed(){if(!(on&&wake())||!amb||bedStops.length)return;bedCtx=true;try{bedStops=(cur().bed||base.bed)()}finally{bedCtx=false}},
    stopBed(){const fd=cur().stopFade||.6;bedStops.forEach(s=>s(fd));bedStops=[]},
    setPack(k){const was=bedStops.length>0;this.stopBed();pack=k;setRoom();if(was)this.startBed()},
    preview(){if(!(on&&wake()))return;[3,4,5].forEach((n,i)=>setTimeout(()=>call('tick',n),i*110));setTimeout(()=>call('chime'),480)},
    setBedVol(p){bedVol=Math.max(0,p)/100;if(bedBus)bedBus.gain.setTargetAtTime(bedVol,ac.currentTime,.05)},
    setOn(v){on=v;if(!v){this.stopBed();if(ac)ac.suspend()}else{wake();if(state==='burning')this.startBed()}},
    setCrackle(v){amb=v;if(!v)this.stopBed();else if(state==='burning')this.startBed()}
  };
})();
snd.setOn(false);
var sndBtn = document.getElementById("sndBtn");
if (sndBtn) sndBtn.addEventListener("click", function(){
  var v = sndBtn.getAttribute("aria-pressed") !== "true";
  sndBtn.setAttribute("aria-pressed", String(v));
  snd.setOn(v); if (v) snd.press();
});

var TOP = 110, BASE = 452, CH = BASE - TOP, MAXS = 10800;
var card = document.querySelector(".wheel-card"), hcSvg = document.querySelector("#heroCandle svg");
var C = { wax: hcSvg.querySelector(".waxRect"), wick: hcSvg.querySelector(".wickG"), line: hcSvg.querySelector(".line"),
          flame: hcSvg.querySelector(".flame"), glow: hcSvg.querySelector(".glowC"), smoke: hcSvg.querySelectorAll(".smoke path"),
          level: 0, target: 0, y: TOP };
function secsAt(p){
  p = Math.max(0, Math.min(PRESETS.length - 1, p));
  var i = Math.floor(p), f = p - i, a = PRESETS[i][1], b = PRESETS[Math.min(PRESETS.length - 1, i + 1)][1];
  return a + (b - a) * f;
}
/* the green line sits where a block of this length burns down to: 3 hours is the whole candle */
function lineY(sec){ return TOP + Math.min(1, sec / MAXS) * CH; }
function setWax(y){ C.y = y; C.wax.setAttribute("y", y); C.wax.setAttribute("height", BASE - y);
  C.wick.setAttribute("transform", "translate(0," + y + ")"); C.glow.setAttribute("cy", y - 30); }
function setLine(sec){ C.line.setAttribute("transform", "translate(0," + lineY(sec) + ")"); }
function puff(){ C.smoke.forEach(function(p, i){ p.animate([{opacity:0,transform:"translateY(0)"},{opacity:.45,offset:.2},{opacity:0,transform:"translateY(-40px)"}],
  {duration:2600, delay:i * 180, easing:"ease-out"}); }); }
setWax(TOP);

var phase = "idle", lastIdx = null;
window.__wheelMoved = function(p, idx){
  if (phase === "idle") setLine(secsAt(p));
  if (idx !== lastIdx){ if (lastIdx !== null && phase === "idle") snd.tick(idx); lastIdx = idx; }
};
setLine(secsAt(pos));

function hhmm(d){ return (d.getHours() < 10 ? "0" : "") + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes(); }
var nz = function(t, f){ return Math.sin(t*f)*.5 + Math.sin(t*f*2.31+1.7)*.3 + Math.sin(t*f*5.17+.4)*.2; };
var lastT = 0, cardOn = true, flick = 0, dark = false, wcg = document.createElement("i");
wcg.className = "wc-glow"; card.prepend(wcg);
function frame(t){
  if (!cardOn){ flick = 0; lastT = 0; return; }
  var dt = lastT ? Math.min(64, t - lastT) : 16; lastT = t; var k = t / 1000;
  C.level += (C.target - C.level) * Math.min(1, dt / (C.target > C.level ? 260 : 180));
  if (!C.target && C.level < .002){ C.level = 0; if (!dark){ dark = true; C.flame.style.opacity = 0; C.glow.setAttribute("opacity", 0); wcg.style.opacity = 0; } flick = requestAnimationFrame(frame); return; }
  dark = false;
  var sy = 1 + (reduce ? 0 : nz(k, 2.2) * .09), sx = 1 + (reduce ? 0 : nz(k + 9, 1.6) * .05), sk = reduce ? 0 : nz(k + 3, 1.1) * 4;
  C.flame.style.transform = "scale(" + (sx * C.level) + "," + (sy * C.level) + ") skewX(" + sk + "deg)";
  C.flame.style.opacity = Math.min(1, C.level * 1.4);
  C.glow.setAttribute("opacity", C.level);
  wcg.style.opacity = (C.level * (.85 + (reduce ? 0 : nz(k + 5, 2.6) * .15))).toFixed(3);
  flick = requestAnimationFrame(frame);
}
flick = requestAnimationFrame(frame);
new IntersectionObserver(function(e){
  cardOn = e[e.length - 1].isIntersecting;
  if (cardOn && !flick) flick = requestAnimationFrame(frame);
}).observe(card);

/* the small candles */
function mini(h, lock){
  var H = h + 46, wy = 40;
  return '<svg class="mc" width="40" height="' + H + '" viewBox="0 0 40 ' + H + '">' +
    '<ellipse class="mc-halo" cx="20" cy="22" rx="17" ry="21"/>' +
    '<rect class="mc-wax" x="12" y="' + wy + '" width="16" height="' + h + '" rx="3"/>' +
    '<line x1="20" y1="' + wy + '" x2="20" y2="' + (wy - 7) + '" stroke="#8a8780" stroke-width="1.8"/>' +
    '<path class="mc-flame" d="M20 35 C15 29,15.4 21,20 11 C24.6 21,25 29,20 35Z"/>' +
    (lock ? '<g fill="none" stroke="#8a8780" stroke-width="1.8" stroke-linecap="round"><path d="M16.5 ' + (wy + 30) + 'v-4a3.5 3.5 0 0 1 7 0v4"/></g>' +
            '<rect x="14.5" y="' + (wy + 30) + '" width="11" height="9" rx="2" fill="#8a8780"/>' : '') + '</svg>';
}
document.querySelectorAll(".mcSlot").forEach(function(sl){
  sl.innerHTML = mini(+sl.dataset.h, sl.dataset.lock);
  if (sl.dataset.out) sl.firstChild.classList.add("out");
});
/* the last call: the candle lights when you reach for the download */
var fc = document.querySelector("#finalSlot .mc"), fbtn = document.querySelector(".final .btn--light");
if (fc && fbtn) {
["mouseenter", "focus"].forEach(function(ev){ fbtn.addEventListener(ev, function(){ fc.classList.remove("out"); }); });
["mouseleave", "blur"].forEach(function(ev){ fbtn.addEventListener(ev, function(){ fc.classList.add("out"); }); });
if (matchMedia("(hover: none)").matches) new IntersectionObserver(function(es){ es.forEach(function(x){ fc.classList.toggle("out", !x.isIntersecting); }); }, {threshold:.6}).observe(fc);
}

/* the page burns down as you read it, and goes out at the bottom */
var sc = document.getElementById("scrollCandle"), scWax = document.getElementById("scWax"), scTop = document.getElementById("scTop"),
    scHalo = sc.querySelector(".mc-halo");
var scMax = 0, scQ = false;
function scMeasure(){ scMax = document.documentElement.scrollHeight - innerHeight; }
function onScroll(){
  scQ = false;
  var max = scMax, p = max > 0 ? Math.min(1, scrollY / max) : 0;
  var y = 34 + p * 96;
  scWax.setAttribute("y", y); scWax.setAttribute("height", 148 - y);
  scTop.setAttribute("transform", "translate(0," + (y - 34) + ")"); scHalo.setAttribute("transform", "translate(0," + (y - 34) + ")");
  sc.classList.toggle("show", scrollY > innerHeight * .6);
  sc.querySelector("svg").classList.toggle("out", p > .985);
}
sc.querySelector("svg").classList.add("mc");
addEventListener("scroll", function(){ if (!scQ){ scQ = true; requestAnimationFrame(onScroll); } }, {passive:true});
new ResizeObserver(function(){ scMeasure(); onScroll(); }).observe(document.body);
scMeasure(); onScroll();

addEventListener("pointerdown", function(){ snd.wake(); }, {passive:true});

/* ═══ the full-screen lock demo: press Start, and the screen becomes the app's lock screen ═══ */
var fsEl = document.getElementById("lkfs"), fsSvg = fsEl.querySelector("svg"), fsRoom = document.getElementById("lkRoom");
var L = { wax: fsSvg.querySelector(".waxRect"), wick: fsSvg.querySelector(".wickG"), line: fsSvg.querySelector(".line"),
          flame: fsSvg.querySelector(".flame"), glow: fsSvg.querySelector(".glowC"), smoke: fsSvg.querySelectorAll(".smoke path"),
          level: 0, target: 0, y: TOP };
var fsLeft = document.getElementById("lkLeft"), fsAt = document.getElementById("lkAt"), fsSess = document.getElementById("lkSess"),
    fsDoneT = document.getElementById("lkDoneT"), fsDoneP = document.getElementById("lkDoneP"), fsEsc = document.getElementById("lkEsc");
var fsRun = null, fsOpen = false, fsFocus = null, fsRaf = 0, fsLast = 0, escT = null;
function fsWax(y){ L.y = y; L.wax.setAttribute("y", y); L.wax.setAttribute("height", BASE - y);
  L.wick.setAttribute("transform", "translate(0," + y + ")"); L.glow.setAttribute("cy", y - 30);
  fsRoom.style.top = ((y - 40) / 500 * 100) + "%"; }
function human(s){ s = Math.round(s); if (s < 60) return s + " sec"; if (s < 3600) return Math.round(s / 60) + " min";
  var h = Math.floor(s / 3600), m = Math.round(s % 3600 / 60); return h + " hr" + (m ? " " + m + " min" : ""); }
function lockOpen(){
  var total = picked()[1];
  fsFocus = document.activeElement; fsOpen = true;
  fsEl.hidden = false; fsEl.classList.remove("over");
  requestAnimationFrame(function(){ fsEl.classList.add("on"); });
  document.body.style.overflow = "hidden";
  try { if (fsEl.requestFullscreen) fsEl.requestFullscreen().catch(function(){}); } catch (_) {}
  fsWax(TOP); L.line.setAttribute("transform", "translate(0," + lineY(total) + ")");
  L.level = 0; L.target = 0;
  fsLeft.textContent = mmss(total); fsAt.textContent = hhmm(new Date(Date.now() + total * 1000)); fsSess.textContent = human(total);
  fsRun = { total: total, t0: null, to: lineY(total) };
  ambWake();
  amb.on = true; ambOpened = performance.now(); amb.el.classList.add("on");
  snd.press(); snd.strike();
  setTimeout(function(){ if (!fsRun) return; fsRun.t0 = performance.now(); L.target = 1; state = "burning"; snd.ignite(); snd.startBed(); }, 420);
  document.getElementById("lkEnd").focus({ preventScroll: true });
  if (!fsRaf) fsRaf = requestAnimationFrame(fsFrame);
}
function lockFinish(stopped){
  fsRun = null; L.target = 0; state = "out"; escHold(false);
  snd.stopBed(); snd.blow(); if (!stopped) setTimeout(function(){ snd.chime(); }, 700);
  L.smoke.forEach(function(p, i){ p.animate([{opacity:0,transform:"translateY(0)"},{opacity:.45,offset:.2},{opacity:0,transform:"translateY(-40px)"}],
    {duration:2600, delay:i * 180, easing:"ease-out"}); });
  fsDoneT.textContent = stopped ? "Put out early." : "Burnt down.";
  fsDoneP.textContent = stopped ? "In the app, that spends your one escape for the month." : "Your distractions, burnt up. Your mouse and keyboard are back.";
  fsEl.classList.add("over");
  setTimeout(function(){ if (fsOpen) document.getElementById("lkBack").focus({ preventScroll: true }); }, 400);
}
function lockClose(){
  if (fsRun){ fsRun = null; L.target = 0; snd.stopBed(); }
  state = "idle"; fsOpen = false; escHold(false); ambWake();
  fsEl.classList.remove("on"); document.body.style.overflow = "";
  try { if (document.fullscreenElement) document.exitFullscreen(); } catch (_) {}
  setTimeout(function(){ fsEl.hidden = true; if (fsFocus) fsFocus.focus({ preventScroll: true }); }, 500);
}

/* the dim screen: the same candle the app draws on black (ui/lock.html) */
var AMB_AFTER = 5000, amb = { on: false, touched: 0, el: document.getElementById("lkAmb"), cv: document.getElementById("lkAmbCv") };
function ambWake(){ amb.touched = performance.now(); if (amb.on){ amb.on = false; amb.el.classList.remove("on"); } }
/* the demo is only the dim candle: a tap, click or key press leaves it */
var ambOpened = 0;
["pointerdown", "keydown"].forEach(function(ev){
  addEventListener(ev, function(e){ if (!fsOpen || !amb.on || performance.now() - ambOpened < 500) return;
    e.preventDefault(); e.stopPropagation(); lockClose(); }, { capture: true });
});
function ambDraw(r, sc){
  var cv = amb.cv, W = cv.clientWidth, H = cv.clientHeight; if (!W || !H) return;
  var d = Math.min(3, Math.max(devicePixelRatio || 1, 1));
  if (cv.width !== Math.round(W * d) || cv.height !== Math.round(H * d)){ cv.width = Math.round(W * d); cv.height = Math.round(H * d); }
  var x = cv.getContext("2d"); x.setTransform(d, 0, 0, d, 0, 0); x.clearRect(0, 0, W, H);
  var u = Math.max(.9, Math.min(4, H / 870 * 1.4, W / 412 * 1.4));
  var dx = Math.sin(sc / 37) * 6 * u, dy = Math.cos(sc / 53) * 6 * u;
  var maxH = Math.min(H * .4, 270 * u), cx = W / 2 + dx;
  var frac = Math.max(.06, Math.min(1, r / 10800)), wax = maxH * frac, ww = 30 * u;
  var base = H / 2 + (wax - 37 * u) / 2 + dy, top = base - wax;
  var n = (Math.sin(sc * 7.3) * .5 + Math.sin(sc * 13.1 + 1.7) * .3 + Math.sin(sc * 2.1 + .4) * .6) / 1.4;
  var g = Math.pow(Math.max(0, Math.sin(sc * .83 + .6)), 10) * Math.sin(sc * 21);
  if (reduce){ n = 0; g = 0; }
  var fl = 1 + .07 * n + .1 * g, sway = reduce ? 0 : Math.sin(sc * 1.7) * 1.4 + Math.sin(sc * 5.3 + 1) * .7 + g * 3.2;
  var fh = 36 * fl * u, fw = 8.5 * (1.06 - .06 * fl) * u, by = top - 7 * u, tipX = cx + sway * u, tipY = by - fh;
  var gx = cx + sway * .3 * u, gy = by - fh * .4, edge = Math.min(gx, W - gx, gy, H - gy) - 4;
  var gr = x.createRadialGradient(gx, gy, 0, gx, gy, Math.max(40, Math.min(190 * u * fl, edge)));
  gr.addColorStop(0, "rgba(255,170,80," + (.34 * fl).toFixed(3) + ")"); gr.addColorStop(.35, "rgba(255,135,50,.12)"); gr.addColorStop(.75, "rgba(255,120,40,.03)"); gr.addColorStop(1, "rgba(255,120,40,0)");
  x.fillStyle = gr; x.fillRect(0, 0, W, H);
  var wg = x.createLinearGradient(0, top, 0, base);
  wg.addColorStop(0, "rgba(255,222,175," + Math.min(1, .62 * fl).toFixed(3) + ")"); wg.addColorStop(.18, "rgba(185,148,106,.42)"); wg.addColorStop(1, "rgba(60,48,38,0)");
  x.fillStyle = wg; x.beginPath();
  if (x.roundRect) x.roundRect(cx - ww / 2, top, ww, base - top, [5 * u, 5 * u, 0, 0]); else x.rect(cx - ww / 2, top, ww, base - top);
  x.fill();
  var rim = x.createRadialGradient(cx, top + 2 * u, 0, cx, top + 2 * u, ww * .6); rim.addColorStop(0, "rgba(255,230,188," + Math.min(1, .55 * fl).toFixed(3) + ")"); rim.addColorStop(1, "rgba(255,230,188,0)");
  x.fillStyle = rim; x.beginPath(); x.ellipse(cx, top + 2 * u, ww / 2, 3.5 * u, 0, 0, 7); x.fill();
  x.strokeStyle = "#5a4632"; x.lineWidth = 2 * u; x.lineCap = "round"; x.beginPath(); x.moveTo(cx, top + u); x.quadraticCurveTo(cx, top - 5 * u, cx + sway * .15 * u, top - 9 * u); x.stroke();
  x.fillStyle = "rgba(255,120,48,.95)"; x.beginPath(); x.arc(cx + sway * .15 * u, top - 9 * u, 1.3 * u, 0, 7); x.fill();
  var fg = x.createRadialGradient(cx + sway * .2 * u, by - fh * .28, 0, cx + sway * .2 * u, by - fh * .35, fh * .75);
  fg.addColorStop(0, "rgba(255,251,232,1)"); fg.addColorStop(.3, "rgba(255,214,128,.97)"); fg.addColorStop(.7, "rgba(246,140,52,.7)"); fg.addColorStop(1, "rgba(210,70,24,0)");
  x.fillStyle = fg; x.beginPath(); x.moveTo(cx, by + 2 * u);
  x.bezierCurveTo(cx - fw * 1.35, by - fh * .18, tipX - fw * .75 + sway * .2 * u, by - fh * .68, tipX, tipY);
  x.bezierCurveTo(tipX + fw * .75 + sway * .2 * u, by - fh * .68, cx + fw * 1.35, by - fh * .18, cx, by + 2 * u); x.fill();
  document.getElementById("lkAmbLeft").textContent = fsLeft.textContent;
  document.getElementById("lkAmbBack").textContent = "BACK AT " + fsAt.textContent;
  var T = document.getElementById("lkAmbT").style; T.top = (base + 34 * u) + "px"; T.fontSize = (16 * u) + "px";
}
function ambTick(t, k){
  /* never while the escape is held, before the flame is lit, or once it has ended */
  if (!amb.on && fsOpen && fsRun){ amb.on = true; ambOpened = performance.now(); amb.el.classList.add("on"); }
  if (!fsRun && amb.on){ amb.on = false; amb.el.classList.remove("on"); }
  if (amb.on && fsRun) ambDraw(fsRun.t0 === null ? fsRun.total : fsRun.total * (1 - Math.min(1, (t - fsRun.t0) / (fsRun.total * 1000))), k);
}
function fsFrame(t){
  var dt = fsLast ? Math.min(64, t - fsLast) : 16; fsLast = t; var k = t / 1000;
  L.level += (L.target - L.level) * Math.min(1, dt / (L.target > L.level ? 260 : 180));
  var sy = 1 + (reduce ? 0 : nz(k, 2.2) * .09), sx = 1 + (reduce ? 0 : nz(k + 9, 1.6) * .05), sk = reduce ? 0 : nz(k + 3, 1.1) * 4;
  L.flame.style.transform = "scale(" + (sx * L.level) + "," + (sy * L.level) + ") skewX(" + sk + "deg)";
  L.flame.style.opacity = Math.min(1, L.level * 1.4);
  L.glow.setAttribute("opacity", L.level);
  fsRoom.style.opacity = (L.level * (.85 + (reduce ? 0 : nz(k + 5, 2.6) * .15))).toFixed(3);
  if (fsRun && fsRun.t0 !== null){
    var p = Math.min(1, (t - fsRun.t0) / (fsRun.total * 1000));   /* real time: a second is a second */
    fsWax(TOP + p * (fsRun.to - TOP));
    fsLeft.textContent = mmss(fsRun.total * (1 - p));
    if (p >= 1) lockFinish(false);
  }
  ambTick(t, k);
  if (fsOpen || L.level > .002) fsRaf = requestAnimationFrame(fsFrame); else { fsRaf = 0; fsLast = 0; }
}
/* hold Esc (or, on a phone, the button) for a second and a half to put it out early, as in the app */
var fsHold = document.getElementById("lkHold");
function fsEp(v){ fsEsc.style.setProperty("--ep", v); if (fsHold) fsHold.style.setProperty("--ep", v); }
if (fsHold){
  fsHold.addEventListener("pointerdown", function(e){ e.stopPropagation(); if (fsRun && !escT){ try{ fsHold.setPointerCapture(e.pointerId) }catch(_){} escHold(true); } });
  ["pointerup","pointercancel","lostpointercapture"].forEach(function(t){ fsHold.addEventListener(t, function(){ if (escT) escHold(false); }); });
  fsHold.addEventListener("contextmenu", function(e){ e.preventDefault(); });
}
function escHold(on){
  if (escT){ cancelAnimationFrame(escT.r); escT = null; }
  fsEp(0);
  if (!on) return;
  escT = { t0: performance.now(), r: 0 };
  (function f(t){ if (!escT) return; var p = Math.min(1, (t - escT.t0) / 1500); fsEp(p);
    if (p >= 1){ escT = null; lockFinish(true); return; } escT.r = requestAnimationFrame(f); })(escT.t0);
}
document.addEventListener("keydown", function(e){
  if (!fsOpen) return;
  if (e.key === "Escape"){ e.preventDefault(); e.stopImmediatePropagation(); if (fsRun && !e.repeat && !escT) escHold(true); else if (!fsRun) lockClose(); }
}, true);
document.addEventListener("keyup", function(e){ if (fsOpen && e.key === "Escape" && escT) escHold(false); }, true);
document.getElementById("lkEnd").addEventListener("click", lockClose);
document.getElementById("lkBack").addEventListener("click", lockClose);

document.getElementById("demoStart").addEventListener("click", lockOpen);

/* ── screenshot rail ────────────────────────────────────────── */
var rail = document.getElementById("rail");
if (rail) {
function railStep(){
  var card = rail.querySelector(".shot");
  return card ? card.getBoundingClientRect().width + 18 : 300;
}
document.getElementById("railPrev").addEventListener("click", function(){
  rail.scrollBy({left:-railStep(), behavior: reduce ? "auto" : "smooth"});
});
document.getElementById("railNext").addEventListener("click", function(){
  rail.scrollBy({left: railStep(), behavior: reduce ? "auto" : "smooth"});
});
}

/* ── reveal ─────────────────────────────────────────────────── */
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
  });
}, {rootMargin:"0px 0px -8% 0px"});
document.querySelectorAll(".rise").forEach(function(n){ io.observe(n); });

if (!reduce) {
  var rangeObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      en.target.classList.add("range-in");
      rangeObserver.unobserve(en.target);
    });
  }, {threshold:.75, rootMargin:"0px 0px -5% 0px"});
  document.querySelectorAll(".ck-track").forEach(function(track){
    track.classList.add("range-ready");
    rangeObserver.observe(track);
  });
}


/* ── the live figures ──────────────────────────────
   The lock screen, the schedule and the Accountability Lock prompt are built
   from the page's own markup, so they have to be wound up by hand. Each one is
   driven only while it is actually on screen -- a countdown nobody is looking
   at is a timer running for nothing -- and none of them start at all for a
   reader who has asked for reduced motion: the markup already shows a sensible
   frozen frame, which is exactly what the old screenshots were. */
function whileVisible(el, start, stop){
  if (!el) return;
  var running = false;
  new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting === running) return;
      running = en.isIntersecting;
      running ? start() : stop();
    });
  }, {threshold:.25}).observe(el);
}

if (!reduce) {
  /* the lock screen, counting a 25-minute session down */
  var lkClock = document.getElementById("lkClock"),
      lkBar   = document.getElementById("lkBar"),
      LK_TOTAL = 1500, lkLeft = 1062, lkTimer = null;
  function lkPaint(){
    lkClock.textContent = mmss(lkLeft);
    lkBar.style.width = ((LK_TOTAL - lkLeft) / LK_TOTAL * 100) + "%";
  }
  whileVisible(document.getElementById("liveLock"), function(){
    lkPaint();
    lkTimer = setInterval(function(){
      /* it restarts rather than sitting at zero: the figure's job is to be a
         block in progress, and a spent one says nothing */
      lkLeft = lkLeft > 1 ? lkLeft - 1 : 1062;
      lkPaint();
    }, 1000);
  }, function(){ clearInterval(lkTimer); });

  /* the new-block form, filled in from one suggestion after another - the
     figure's subject here is the setting up, so the setting up is what moves */
  var NB = [
    {days:[0,1,2,3,4,5,6], from:"10:00", fromMer:"pm", to:"6:00", toMer:"am",
     span:"Every day \u00b7 blocked from 10:00 PM until 6:00 AM the next morning \u2014 8 hours."},
    {days:[0,1,2,3,4], from:"9:00", fromMer:"am", to:"12:00", toMer:"pm",
     span:"Weekdays \u00b7 blocked from 9:00 AM until 12:00 PM \u2014 3 hours."},
    {days:[5,6], from:"8:00", fromMer:"am", to:"7:00", toMer:"am",
     span:"Weekends \u00b7 blocked from 8:00 AM until 7:00 AM the next morning \u2014 23 hours."}
  ];
  var nbSugs = document.getElementById("nbSugs"),
      nbDays = document.getElementById("nbDays"),
      nbStep = 1, nbTimer = null;
  function nbPaint(){
    var p = NB[nbStep], i;
    for (i = 0; i < nbSugs.children.length; i++)
      nbSugs.children[i].classList.toggle("on", i === nbStep);
    for (i = 0; i < nbDays.children.length; i++)
      nbDays.children[i].classList.toggle("on", p.days.indexOf(i) >= 0);
    document.getElementById("nbFrom").textContent = p.from;
    document.getElementById("nbTo").textContent = p.to;
    document.getElementById("nbFromAm").classList.toggle("on", p.fromMer === "am");
    document.getElementById("nbFromPm").classList.toggle("on", p.fromMer === "pm");
    document.getElementById("nbToAm").classList.toggle("on", p.toMer === "am");
    document.getElementById("nbToPm").classList.toggle("on", p.toMer === "pm");
    document.getElementById("nbSpan").textContent = p.span;
  }
  whileVisible(document.getElementById("liveNew"), function(){
    nbPaint();
    nbTimer = setTimeout(function advancePreset(){
      nbStep = (nbStep + 1) % NB.length;
      nbPaint();
      nbTimer = setTimeout(advancePreset, 2500);
    }, 900);
  }, function(){ clearTimeout(nbTimer); });

  /* the prompt, being answered wrongly, forever. Seven dots go in, Unlock is
     pressed, the field refuses, and it clears. The loop is the argument. */
  var dlg = document.getElementById("liveDlg"),
      dots = document.getElementById("dlgDots"), dlgStep = 0, dlgTimer = null;
  function dlgTick(){
    dlgStep++;
    if (dlgStep <= 7){
      dots.appendChild(document.createElement("span"));
      dlgTimer = setTimeout(dlgTick, 150);
    } else if (dlgStep === 8){
      dlgTimer = setTimeout(dlgTick, 520);
    } else if (dlgStep === 9){
      dlg.classList.add("press");
      dlgTimer = setTimeout(dlgTick, 160);
    } else if (dlgStep === 10){
      dlg.classList.remove("press");
      dlg.classList.add("bad");
      dlgTimer = setTimeout(dlgTick, 2100);
    } else {
      dlg.classList.remove("bad");
      dots.textContent = "";
      dlgStep = 0;
      dlgTimer = setTimeout(dlgTick, 900);
    }
  }
  whileVisible(dlg, function(){ dlgTimer = setTimeout(dlgTick, 500); },
                    function(){ clearTimeout(dlgTimer); });
}

/* ── below the hero: the monthly / yearly switch on the plans ── */
document.querySelectorAll(".v-toggle").forEach(function(t){
  var host = t.closest("[data-bill]");
  t.querySelectorAll("button").forEach(function(x){
    x.addEventListener("click", function(){
      t.querySelectorAll("button").forEach(function(y){
        y.classList.toggle("v-on", y === x); y.setAttribute("aria-pressed", String(y === x)); });
      if (x.dataset.b === "o") host.setAttribute("data-once", "");
      else { host.removeAttribute("data-once"); host.setAttribute("data-bill", x.dataset.b); }
    });
  });
});

/* ── nav spy ────────────────────────────────────────────────── */
var links = {};
document.querySelectorAll(".nav-pill a[data-spy]").forEach(function(a){
  a.getAttribute("data-spy").split(" ").forEach(function(id){ links[id] = a; });
});
var spy = new IntersectionObserver(function(entries){
  entries.forEach(function(en){
    if (!en.isIntersecting) return;
    document.querySelectorAll(".nav-pill a[data-spy]")
            .forEach(function(x){ x.classList.remove("here"); });
    var a = links[en.target.id];
    if (a) a.classList.add("here");
  });
}, {rootMargin:"-45% 0px -50% 0px"});
Object.keys(links).forEach(function(id){
  var n = document.getElementById(id);
  if (n) spy.observe(n);
});

/* ── the nav tucks away going down, returns coming up ───────────
   Same behaviour as the live site. The pill is fixed now, so without this
   it would sit over the copy for the whole page.                        */
var navEl = document.querySelector(".nav"), navY = window.scrollY, navHid = false;
function paintNav(){
  var y = Math.max(0, window.scrollY), dy = y - navY;
  if (Math.abs(dy) < 7) return;            // ignore trackpad jitter and rubber-band
  navY = y;
  var hide = dy > 0 && y > 150;            // never hide over the hero
  if (hide === navHid) return;
  navHid = hide;
  navEl.classList.toggle("tucked", hide);
}
addEventListener("scroll", paintNav, {passive:true});

/* The desktop and phone wheels share one scroll-driven duration. */
var RIG = [["10 min","10 minutes"],["30 min","30 minutes"],["45 min","45 minutes"],["1 hr","1 hour"],["1½ hr","1½ hours"],["2 hr","2 hours"],["3 hr","3 hours"],["4½ hr","4½ hours"],["6 hr","6 hours"],["7½ hr","7½ hours"],["9 hr","9 hours"],["12 hr","12 hours"],["18 hr","18 hours"],["24 hr","24 hours"]];
(function(){
  var rig=document.getElementById("devRig"), win=document.getElementById("rigWin"), phone=document.getElementById("rigPhone"), read=document.getElementById("rigRead");
  if(!rig||!win||!phone||!read)return;
  function fill(d,h){var a=[];RIG.forEach(function(v){var s=document.createElement("span");s.textContent=v[0];s.style.marginTop=(-h/2)+"px";s.style.lineHeight=h+"px";s.style.height=h+"px";d.appendChild(s);a.push(s)});return {rows:a,h:h}}
  function turn(d,at){d.rows.forEach(function(s,i){var o=i-at,n=Math.abs(o);s.style.transform="translateY("+(o*d.h)+"px) scale("+(1-Math.min(.34,n*.13))+")";s.style.opacity=n>2.6?0:String(1-Math.min(.72,n*.3));var c=n<.5?"on":"";if(s.className!==c)s.className=c})}
  var dw=fill(win,38),dp=fill(phone,22),queued=false,near=true;
  new IntersectionObserver(function(e){near=e[e.length-1].isIntersecting;if(near)frame()},{rootMargin:"200px 0px"}).observe(rig);
  function frame(){queued=false;if(!near)return;var r=rig.getBoundingClientRect(),p=((innerHeight-r.top)/(innerHeight+r.height)-.12)/.72;p=Math.max(0,Math.min(1,p));turn(dw,p*(RIG.length-1));turn(dp,p*(RIG.length-1));read.textContent=RIG[Math.round(p*(RIG.length-1))][1]}
  addEventListener("scroll",function(){if(queued)return;queued=true;requestAnimationFrame(frame)},{passive:true});addEventListener("resize",frame,{passive:true});frame();
})();
})();
}catch(e){console.error(e)}
try{
window.hsGo=function(i){var w=document.querySelector('.wheel');try{w.focus({preventScroll:true})}catch(_){}
var v=[10,60,300,600,900,1200,1500,1800,2700,3600,5400,7200,10800],c=v.indexOf(+w.getAttribute('aria-valuenow'));if(c<0)c=3;
for(var n=Math.abs(i-c),k=i>c?'ArrowDown':'ArrowUp';n--;)w.dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true}));
setTimeout(function(){document.getElementById('demoStart').click()},40)};
function hsPad(n){return(n<10?'0':'')+n}function hsAt(s){var d=new Date(Date.now()+s*1000);return hsPad(d.getHours())+':'+hsPad(d.getMinutes())}
}catch(e){console.error(e)}
try{
/* hero: aim each drifting notification at the lit flame in the window */
(function(){const hd=document.querySelector('.hd'),fl=hd&&hd.querySelector('.hd-fl');if(!fl)return;
function aim(){const b=hd.getBoundingClientRect(),f=fl.getBoundingClientRect(),fx=f.left+f.width/2,fy=f.top+f.height*.62;
 hd.querySelectorAll('.hm b').forEach(m=>{const l=b.left+m.offsetLeft,t=b.top+m.offsetTop;
  m.style.setProperty('--dx',(fx-l)+'px');m.style.setProperty('--dy',(fy-t)+'px')})}
addEventListener('load',aim);addEventListener('resize',aim);aim()})();
}catch(e){console.error(e)}
try{
/* pricing on phones: one plan at a time behind three tabs */
(function(){var w=document.querySelector('.v2 .v-plans');if(!w)return;var ps=[].slice.call(w.querySelectorAll(':scope>.v-plan')),t=document.createElement('div');t.className='ptabs';t.setAttribute('role','tablist');
var once=document.querySelector('.v2 .v-once');
function show(i){ps.forEach(function(p,j){p.classList.toggle('shown',i==j)});if(once){once.classList.toggle('shown',i==3);var hb=once.closest('[data-bill]');if(i==3)hb.setAttribute('data-once','');else hb.removeAttribute('data-once')}[].forEach.call(t.children,function(b,j){b.classList.toggle('on',i==j);b.setAttribute('aria-selected',i==j)})}
['Free','Pro','Lifetime','One-off'].forEach(function(n,i){var b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.textContent=n;b.onclick=function(){show(i)};t.appendChild(b)});
w.parentNode.insertBefore(t,w);w.classList.add('tabbed');show(1)})();
}catch(e){console.error(e)}
try{
/* why do I need this: count the numbers up as they arrive, and the two-question reckoner */
(()=>{
const calm=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!calm&&"IntersectionObserver" in window){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);const el=e.target,to=el.dataset.to,
  parts=to.match(/\d+|\D+/g),nums=parts.map(p=>/\d/.test(p)?+p:null),t0=performance.now(),D=1300;
  const tick=t=>{const k=Math.min(1,(t-t0)/D),f=1-Math.pow(1-k,3);
   el.innerHTML=parts.map((p,i)=>nums[i]==null?(p==="s"?"<small>sec</small>":p):Math.round(nums[i]*f)).join("");if(k<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick)}),{threshold:.6});
 document.querySelectorAll("#why .w-n[data-to]").forEach(el=>io.observe(el))}
const $=id=>document.getElementById(id),card=$("qc");if(!card)return;
const hr=$("qHr"),ar=$("qAr"),steps=[...card.querySelectorAll(".q-step")],dots=[...card.querySelectorAll(".q-dots i")];
const hrs=()=>hr.value/4,hm=h=>{const H=Math.floor(h),M=Math.round((h-H)*60);return [H,M]};
const words=h=>{const [H,M]=hm(h);return [H?H+(H==1?" hour":" hours"):"",M?M+" minutes":""].filter(Boolean).join(" ")};
const yrs=y=>y<1?Math.round(y*12)+" months":(y<10?y.toFixed(1):Math.round(y))+(y==1?" year":" years");
const fill=r=>r.style.setProperty("--p",(r.value-r.min)/(r.max-r.min)*100+"%");
function show(){const h=hrs(),[H,M]=hm(h);
 $("qH").innerHTML=(H?H+"<small>h</small>":"")+(M?(H?" ":"")+M+"<small>m</small>":"");hr.setAttribute("aria-valuetext",words(h));
 $("qA").textContent=ar.value;fill(hr);fill(ar)}
function result(){const h=hrs(),left=Math.max(1,80-ar.value);
 $("qRh").textContent=words(h);$("qY").textContent=yrs(h/24*left);
 const d=Math.round(h*365/24);$("qD").textContent=d+(d==1?" day":" days");
 $("qP").textContent=Math.round(h/16*100)+"%";$("qB").textContent=Math.round(h*365/6);
 $("qW").textContent=yrs(Math.min(1,h)/24*left)}
function go(n){if(n==2)result();steps.forEach((s,i)=>s.classList.toggle("on",i==n));dots.forEach((d,i)=>d.classList.toggle("on",i<=n))}
hr.addEventListener("input",show);ar.addEventListener("input",show);
card.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)go(+b.dataset.go)});
show()})();
}catch(e){console.error(e)}
try{
(function(){if(!matchMedia('(max-width:700px)').matches)return;var g=document.querySelector('#app .v-g4');if(g){var p=document.createElement('p');p.className='fx-soon';p.textContent='macOS and iOS: coming soon';g.after(p)}
var t=document.querySelector('#pricing .v-toggle'),pro=document.querySelector('#pricing .v-plan.v-pick');
if(t&&pro){var c=t.cloneNode(true);c.classList.add('fx-bill');var co=c.querySelector('[data-b="o"]');if(co)co.remove();pro.insertBefore(c,pro.querySelector('.v-price'));
 var host=t.closest('[data-bill]');c.querySelectorAll('button').forEach(function(x){x.addEventListener('click',function(){
  [t,c].forEach(function(T){T.querySelectorAll('button').forEach(function(y){var o=y.dataset.b==x.dataset.b;y.classList.toggle('v-on',o);y.setAttribute('aria-pressed',String(o))})});
  host.removeAttribute('data-once');host.setAttribute('data-bill',x.dataset.b)})})}

})();
}catch(e){console.error(e)}
try{
(function(){var r=document.documentElement,u=navigator.userAgent;
 var and=/Android/i.test(u),win=!and&&/Windows/i.test(u);if(and)r.classList.add('is-android');if(win)r.classList.add('is-win');
 /* nav Download: one tap for this device; anywhere else it goes to the hero's four keys */
 })()
}catch(e){console.error(e)}
try{
(function(){var A=[["instagram", "linear-gradient(45deg,#f9a03f,#e4405f 45%,#9b3fd1)", "Instagram", ["maya.k liked your reel", "jordan_23 started following you", "sam.r replied to your story", "You have 3 new follow requests"], "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"], ["tiktok", "#111", "TikTok", ["ellie sent you a video", "3 friends posted new videos", "Your video has 120 new views"], "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"], ["youtube", "#ff0000", "YouTube", ["Recommended: 50 facts you never knew", "A channel you watch is live now", "sam.r replied to your comment", "New Shorts from channels you watch"], "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"], ["snapchat", "#fffc00", "Snapchat", ["Josh is typing…"], "M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"], ["whatsapp", "#25d366", "WhatsApp", ["Jake: you coming tonight?", "Ellie: did you see this??", "Jake: wake up", "Football lads: 112 new messages"], "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"], ["discord", "#5865f2", "Discord", ["Josh is now online"], "M5.83 5.14C9.26 3.43 14.74 3.43 18.17 5.14C21.60 9.26 22.97 14.06 22.63 18.17C20.23 20.23 17.83 20.91 16.46 20.91L14.74 18.51C13.03 19.20 10.97 19.20 9.26 18.51L7.54 20.91C6.17 20.91 3.77 20.23 1.37 18.17C1.03 14.06 2.40 9.26 5.83 5.14ZM6.51 13.03a1.89 2.40 0 1 0 3.77 0a1.89 2.40 0 1 0 -3.77 0ZM13.71 13.03a1.89 2.40 0 1 0 3.77 0a1.89 2.40 0 1 0 -3.77 0Z"], ["netflix", "#0a0a0a", "Netflix", ["New episode of a show you watch"], "M5.14 1.03H9.94L14.06 10.97V1.03H18.86V22.97H14.06L9.94 13.03V22.97H5.14Z", "#e50914"]],O=[["t", "Live now"]],ST=["You averaged 9h 14m a day this week.", "Up 23% on last week: 7h 48m a day.", "You picked up your phone 142 times today.", "63 hours on your phone this week.", "6h on your phone today, and it's 3pm.", "You picked up your phone 38 times before 9am.", "Most used: TikTok, 3h 22m a day."],r=document.documentElement,fx=document.querySelector('.pl-fx');if(!fx)return;
var fl=fx.querySelector('.pl-flare'),mode='1',tm=0,live=0,k=0,off=false,rm=matchMedia('(prefers-reduced-motion: reduce)');
var bag=[],last='';
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function ico(a){return '<span class="fx-a" style="background:'+a[1]+'"><svg viewBox="0 0 24 24" style="fill:'+(a[5]||(a[0]==='snapchat'?'#111':'#fff'))+'"><path d="'+a[4]+'"/></svg></span>'}
function make(m){var e=document.createElement('div'),a=pick(A);if(m==='5'){if(!bag.length){bag=['1','1','2','4','6'].sort(function(){return Math.random()-.5});if(bag[0]===last)bag.push(bag.shift())}m=last=bag.shift()}
 if(m==='6'){e.className='fx-n fx-st';e.innerHTML='<span class="fx-a" style="background:linear-gradient(160deg,#8e6cf0,#5b3fd1)"><svg viewBox="0 0 24 24" style="fill:#fff"><path d="M6 2h12v2h-1v3l-4 5 4 5v3h1v2H6v-2h1v-3l4-5-4-5V4H6z"/></svg></span><span><b>Screen Time</b>'+pick(ST)+'</span>';return e}
 if(m==='1'){e.className='fx-n';e.innerHTML=ico(a)+'<span><b>'+a[2]+'</b>'+pick(a[3])+'</span>'}
 else if(m==='2'){e.innerHTML=ico(a)}
 else{var o=pick(O);if(o[0]==='o'){e.className='fx-o';e.innerHTML='<svg viewBox="0 0 24 24">'+o[1]+'</svg>'}else{e.className='fx-t';e.textContent=o[1]}}
 return e}
var F='brightness(1) sepia(0) saturate(1) hue-rotate(0deg) blur(0px)',H='brightness(1.5) sepia(1) saturate(5) hue-rotate(-12deg) blur(1px)',T='translate(-50%,-50%) translate(';
function spawn(){var ph=innerWidth<=560;if(document.hidden||off||live>(ph?2:5))return;var sm=innerWidth<=800?.45:1,side=(k++%3===2)?1:-1,
 x0=ph?side*(150+Math.random()*30):side*(side<0?140+Math.random()*220:120+Math.random()*80)*sm,y0=ph?-50+Math.random()*130:(-90+Math.random()*440)*sm,mx=ph?.5:.32,rt=Math.random()*30-15,e=make(mode);fx.appendChild(e);live++;
 var an=e.animate([{transform:T+x0+'px,'+y0+'px) rotate('+rt+'deg) scale(.96)',opacity:0,filter:F},{offset:.14,opacity:1},
  {offset:.62,transform:T+(x0*mx)+'px,'+(y0*.3-40*sm)+'px) rotate('+rt/2+'deg) scale(.8)',opacity:1,filter:F},
  {offset:.88,transform:T+'0px,-4px) rotate(0deg) scale(.32)',opacity:.85,filter:H},
  {transform:T+'0px,-18px) rotate(0deg) scale(.08)',opacity:0,filter:H}],{duration:3800+Math.random()*900,easing:'cubic-bezier(.45,0,.6,1)'});
 an.onfinish=function(){e.remove();live--;fl.animate([{opacity:0,transform:'scale(.7)'},{opacity:1,transform:'scale(1.15)',offset:.3},{opacity:0,transform:'scale(1.3)'}],{duration:700,easing:'ease-out'})}}
function setF(v){mode=v;
 clearInterval(tm);[].forEach.call(fx.querySelectorAll(':scope>:not(.pl-flare)'),function(e){e.remove()});live=0;
 if(v!=='0'&&!rm.matches){spawn();tm=setInterval(spawn,v==='5'?900:1400)}}
setF('5');if(window.IntersectionObserver)new IntersectionObserver(function(e){off=!e[e.length-1].isIntersecting}).observe(fx)})()
}catch(e){console.error(e)}
try{
(function(){var r=document.getElementById("costR");if(!r)return;function f(h){var m=Math.round(h*60);return Math.floor(m/60)+"h"+(m%60?" "+m%60+"m":"")}function u(){var h=+r.value,d=Math.round(h*365/24),y=h*50/24;r.style.setProperty("--p",((h-1)/11*100)+"%");document.getElementById("costH").textContent=f(h);document.getElementById("costY").textContent=d+" days";document.getElementById("costL").textContent=(y<10?y.toFixed(1):Math.round(y))+" years";document.getElementById("costW").textContent=Math.round(h/16*100)+"%"}r.addEventListener("input",u);u();var g=document.querySelector(".pl-cost-go"),n=document.querySelector(".nav-cta");if(g&&n)g.href=n.getAttribute("href");var e=document.querySelector(".pl-end-go");if(e&&n)e.href=n.getAttribute("href")})()
}catch(e){console.error(e)}
try{
/* flame bars: each row's share of the day, grown when the card scrolls in */
(function(){var sec=document.getElementById('how');if(!sec)return;
sec.querySelectorAll('.r4 [data-h]').forEach(function(b,i){b.style.setProperty('--f',b.dataset.h/24);b.style.setProperty('--i',i)});
if(!('IntersectionObserver' in window)){sec.classList.add('lit');return}
var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){sec.classList.add('lit');io.disconnect()}},{threshold:.35});io.observe(sec)})()
}catch(e){console.error(e)}
try{
/* Be honest: tap your hours, see the years split, the button counts them up */
(function(){var sec=document.querySelector('#how.nn');if(!sec)return;
var o=sec.querySelector('.r8-btn [data-o="wkr"]'),shown=0,raf=0,still=matchMedia('(prefers-reduced-motion: reduce)');
function put(k,v){sec.querySelectorAll('[data-o="'+k+'"]').forEach(function(x){x.textContent=v})}
function pick(h){if(!h){sec.classList.remove('done');return}
 var w=Math.round(h*50/16*10)/10,p=w/50,to=Math.round(w),from=shown;
 put('wk',String(w));put('left',String(Math.round((50-w)*10)/10));
 sec.querySelectorAll('.r10 .p').forEach(function(x){x.style.flexGrow=w});
 sec.querySelectorAll('.r10 .e').forEach(function(x){x.style.flexGrow=50-w});
 var st=sec.style;st.setProperty('--p',p);st.setProperty('--q',1-p);st.setProperty('--sp',Math.sqrt(p));st.setProperty('--sq',Math.sqrt(1-p));
 sec.classList.add('done');cancelAnimationFrame(raf);shown=to;
 if(still.matches){o.textContent=to;return}
 var t0=performance.now();(function f(t){var k=Math.min(1,(t-t0)/800);o.textContent=String(Math.round(from+(to-from)*(1-Math.pow(1-k,3))));if(k<1)raf=requestAnimationFrame(f)})(t0);
}
o.textContent='0';
/* the scales: one tap for each hour a day on the phone, against the rest of a sixteen-hour waking day */
var s=sec.querySelector('svg.bal'),n=sec.querySelector('.bal-n'),u=sec.querySelector('.bal-u');if(!s)return;
var v=0,cur=18*Math.PI/180,af=0;
function draw(){var ex=165*Math.cos(cur),ey=165*Math.sin(cur),
 g='<line class="st" x1="0" y1="-30" x2="0" y2="178"/><line class="st" x1="-64" y1="178" x2="64" y2="178"/>';
 [[-ex,-30-ey,v,'wp','Your phone',' p'],[ex,-30+ey,16-v,'we','Everything else','']].forEach(function(a){var x=a[0],y=a[1],c=a[2],py=y+86,lx=Math.max(-150,Math.min(150,x)),k;
  g+='<line class="str" x1="'+x+'" y1="'+y+'" x2="'+(x-62)+'" y2="'+py+'"/><line class="str" x1="'+x+'" y1="'+y+'" x2="'+(x+62)+'" y2="'+py+'"/>';
  for(k=0;k<c;k++)g+='<circle class="'+a[3]+'" r="8" cx="'+(x-36+(k%4)*24)+'" cy="'+(py-9-Math.floor(k/4)*17)+'"/>';
  g+='<path class="pan" d="M'+(x-62)+' '+py+'Q'+x+' '+(py+32)+' '+(x+62)+' '+py+'Z"/><text x="'+lx+'" y="'+(py+46)+'">'+a[4]+'</text><text class="h'+a[5]+'" x="'+lx+'" y="'+(py+76)+'">'+c+'h</text>'});
 s.innerHTML=g+'<line class="st" x1="'+(-ex)+'" y1="'+(-30-ey)+'" x2="'+ex+'" y2="'+(-30+ey)+'"/><circle r="7" cy="-30" fill="currentColor"/>'}
function tip(){var t=(16-2*v)/16*18*Math.PI/180;cancelAnimationFrame(af);if(still.matches){cur=t;return draw()}
 (function f(){cur+=(t-cur)*.12;if(Math.abs(t-cur)<.0005)cur=t;draw();if(cur!==t)af=requestAnimationFrame(f)})()}
function setH(k){v=Math.max(0,Math.min(12,k));u.hidden=!v;n.textContent=v?v+(v===1?' hour a day':' hours a day'):'No hours yet';
 s.setAttribute('aria-label',v<12?'Put another hour on the phone side. Now '+v+' of 12.':'Twelve hours, the most it holds');tip();pick(v)}
s.addEventListener('click',function(){setH(v+1)});
s.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();setH(v+1)}});
u.addEventListener('click',function(){setH(v-1)});
draw();
})();
}catch(e){console.error(e)}
try{
/* the hero candle: the app's dim candle (ui/lock.html), drawn on a canvas */
(function(){
var cs=[].slice.call(document.querySelectorAll('canvas.pl-dim'));if(!cs.length)return;
var rm=matchMedia('(prefers-reduced-motion: reduce)'),vis=new Set();
function draw(cv,sc,reduce){
  var W=cv.clientWidth,H=cv.clientHeight;if(!W||!H)return;
  var d=Math.min(3,Math.max(devicePixelRatio||1,1));
  if(cv.width!==Math.round(W*d)||cv.height!==Math.round(H*d)){cv.width=Math.round(W*d);cv.height=Math.round(H*d);}
  var x=cv.getContext('2d');x.setTransform(d,0,0,d,0,0);x.clearRect(0,0,W,H);
  var u=W/70,cx=W/2,ww=30*u,by=H*.36,top=by+7*u,base=H;
  var n=(Math.sin(sc*7.3)*.5+Math.sin(sc*13.1+1.7)*.3+Math.sin(sc*2.1+.4)*.6)/1.4;
  var g=Math.pow(Math.max(0,Math.sin(sc*.83+.6)),10)*Math.sin(sc*21);
  if(reduce){n=0;g=0;}
  var fl=1+.07*n+.1*g,sway=reduce?0:Math.sin(sc*1.7)*1.4+Math.sin(sc*5.3+1)*.7+g*3.2;
  var fh=36*fl*u,fw=8.5*(1.06-.06*fl)*u,tipX=cx+sway*u,tipY=by-fh;
  var gx=cx+sway*.3*u,gy=by-fh*.4,edge=Math.min(gx,W-gx,gy+H*.25);
  var gr=x.createRadialGradient(gx,gy,0,gx,gy,Math.max(40,edge));
  gr.addColorStop(0,'rgba(255,170,80,'+(.34*fl).toFixed(3)+')');gr.addColorStop(.35,'rgba(255,135,50,.12)');gr.addColorStop(.75,'rgba(255,120,40,.03)');gr.addColorStop(1,'rgba(255,120,40,0)');
  x.fillStyle=gr;x.fillRect(0,0,W,H);
  var wg=x.createLinearGradient(0,top,0,base);
  wg.addColorStop(0,'rgba(255,222,175,'+Math.min(1,.62*fl).toFixed(3)+')');wg.addColorStop(.18,'rgba(196,160,118,.64)');wg.addColorStop(.62,'rgba(150,120,90,.46)');wg.addColorStop(1,'rgba(60,48,38,0)');
  x.fillStyle=wg;x.beginPath();
  if(x.roundRect)x.roundRect(cx-ww/2,top,ww,base-top,[5*u,5*u,0,0]);else x.rect(cx-ww/2,top,ww,base-top);
  x.fill();
  var rim=x.createRadialGradient(cx,top+2*u,0,cx,top+2*u,ww*.6);rim.addColorStop(0,'rgba(255,230,188,'+Math.min(1,.55*fl).toFixed(3)+')');rim.addColorStop(1,'rgba(255,230,188,0)');
  x.fillStyle=rim;x.beginPath();x.ellipse(cx,top+2*u,ww/2,3.5*u,0,0,7);x.fill();
  x.strokeStyle='#5a4632';x.lineWidth=2*u;x.lineCap='round';x.beginPath();x.moveTo(cx,top+u);x.quadraticCurveTo(cx,top-5*u,cx+sway*.15*u,top-9*u);x.stroke();
  x.fillStyle='rgba(255,120,48,.95)';x.beginPath();x.arc(cx+sway*.15*u,top-9*u,1.3*u,0,7);x.fill();
  var fg=x.createRadialGradient(cx+sway*.2*u,by-fh*.28,0,cx+sway*.2*u,by-fh*.35,fh*.75);
  fg.addColorStop(0,'rgba(255,251,232,1)');fg.addColorStop(.3,'rgba(255,214,128,.97)');fg.addColorStop(.7,'rgba(246,140,52,.7)');fg.addColorStop(1,'rgba(210,70,24,0)');
  x.fillStyle=fg;x.beginPath();x.moveTo(cx,by+2*u);
  x.bezierCurveTo(cx-fw*1.35,by-fh*.18,tipX-fw*.75+sway*.2*u,by-fh*.68,tipX,tipY);
  x.bezierCurveTo(tipX+fw*.75+sway*.2*u,by-fh*.68,cx+fw*1.35,by-fh*.18,cx,by+2*u);x.fill();
}
var raf=0;
function frame(t){raf=0;var k=t/1000;vis.forEach(function(cv){draw(cv,k,rm.matches);});if(vis.size&&!rm.matches)raf=requestAnimationFrame(frame);}
function kick(){if(!raf)raf=requestAnimationFrame(frame);}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)vis.add(e.target);else vis.delete(e.target);});kick();});
cs.forEach(function(cv){io.observe(cv);draw(cv,0,true);});
addEventListener('resize',function(){cs.forEach(function(cv){draw(cv,performance.now()/1000,true);});kick();});
})();
}catch(e){console.error(e)}
try{
/* pause looping animations in sections that are off screen */
(function(){if(!window.IntersectionObserver)return;var o=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("zz-off",!e.isIntersecting)})},{rootMargin:"150px 0px"});document.querySelectorAll("body>header,section,footer").forEach(function(el){o.observe(el)})})()
}catch(e){console.error(e)}
try{
/* mountain drift on scroll */
(function(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var r=document.documentElement,b=document.querySelector('.bgv'),t=false;if(!b)return;
function f(){t=false;var m=Math.max(1,r.scrollHeight-innerHeight),p=Math.min(1,Math.max(0,scrollY/m));
b.style.transform='translate3d(0,'+(-p*innerHeight*.06).toFixed(1)+'px,0)'}
addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(f)}},{passive:true});addEventListener('resize',f);f()})()
}catch(e){console.error(e)}
try{
/* photo candle: flicker and sway, the same rhythm as the app's drawn candle */
(function(){
var f=document.querySelector('.pl-ph-flame'),g=document.querySelector('.pl-ph-glow'),l=document.querySelector('.pl-ph-lit');if(!f)return;
var rm=matchMedia('(prefers-reduced-motion: reduce)'),on=true,raf=0;
function fr(t){raf=0;var s=t/1000;
 var n=(Math.sin(s*7.3)*.5+Math.sin(s*13.1+1.7)*.3+Math.sin(s*2.1+.4)*.6)/1.4;
 var k=Math.pow(Math.max(0,Math.sin(s*.83+.6)),10)*Math.sin(s*21);
 var fl=1+.045*n+.07*k,sw=Math.sin(s*1.7)*1.1+Math.sin(s*5.3+1)*.55+k*2.4;
 f.style.transform='skewX('+(-sw*1.1).toFixed(2)+'deg) scale('+(1.035-.035*fl).toFixed(4)+','+fl.toFixed(4)+')';
 f.style.filter='brightness('+(1+.07*n+.08*k).toFixed(3)+')';
 g.style.opacity=(.82+.14*n+.1*k).toFixed(3);l.style.opacity=(.55+.18*n+.15*k).toFixed(3);
 if(on&&!rm.matches)raf=requestAnimationFrame(fr)}
new IntersectionObserver(function(e){on=e[0].isIntersecting;if(on&&!raf&&!rm.matches)raf=requestAnimationFrame(fr)}).observe(f.parentNode);
})();
}catch(e){console.error(e)}
try{
/* waiting list ends where the last coming-soon circle ends */
(function(){var f=document.getElementById('wl'),r=document.querySelector('.pl-dl8');if(!f||!r)return;
function fit(){var c=r.querySelectorAll('.ci i'),l=c[c.length-1];f.style.maxWidth=f.style.width='';
if(!l||innerWidth<=800)return;function x(e){for(var v=0;e;e=e.offsetParent)v+=e.offsetLeft;return v}var w=x(l)+l.offsetWidth-x(f);if(w>200){f.style.maxWidth='none';f.style.width=Math.round(w)+'px'}}
fit();addEventListener('resize',fit);document.fonts&&document.fonts.ready.then(fit)})();
}catch(e){console.error(e)}
try{
/* hero waiting list -> Supabase join_waitlist() (insert-only; the list itself can't be read from here) */
(function(){
 var f=document.getElementById('wl');if(!f)return;
 var SUPA="https://jkssypznppzqmdndmssz.supabase.co",ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6" +
             "Imprc3N5cHpucHB6cW1kbmRtc3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMDcw" +
             "NjYsImV4cCI6MjEwMjc4MzA2Nn0.ujK9-FfekXhQ_6F2nep47u4K5KU2_Pwyax3Xww-YMMw";
 var e=document.getElementById('wl-e'),m=document.getElementById('wl-m'),b=f.querySelector('button'),u=navigator.userAgent;
 var plat=/Android/i.test(u)?'android':/iPhone|iPad/i.test(u)?'ios':/Macintosh/i.test(u)?'mac':/Windows/i.test(u)?'windows':'';
 var row=f.querySelector('.wl-row'),asked='';
 var ask=document.getElementById('wl-ask'),go=document.getElementById('wl-go'),ln=document.getElementById('wl-launch'),nw=document.getElementById('wl-news');
 function open(v){document.getElementById('wl-who').textContent='('+v+')';ask.hidden=false;f.classList.add('ask');say('');ln.focus()}
 function shut(){ask.hidden=true;f.classList.remove('ask');say('');e.focus()}
 document.getElementById('wl-back').addEventListener('click',shut);
 ask.addEventListener('keydown',function(k){if(k.key==='Escape')shut()});
 function pick(){go.disabled=!ln.checked&&!nw.checked;if(go.disabled)say('Tick at least one, or change your email.');else say('')}
 ln.addEventListener('change',pick);nw.addEventListener('change',pick);
 function say(t,bad){m.textContent=t;m.classList.toggle('bad',!!bad);row.classList.toggle('bad',!!bad);if(bad)e.setAttribute('aria-invalid','true');else e.removeAttribute('aria-invalid')}
 /* the address itself: one @, no spaces, a real-looking name and domain */
 function wrong(v){
  if(!v)return 'Enter your email address.';
  if(/\s/.test(v))return 'Remove the space from your email address.';
  var at=v.split('@');
  if(at.length<2)return 'Add the @ to your email address.';
  if(at.length>2)return 'An email address has only one @.';
  var n=at[0],d=at[1].toLowerCase();
  if(!n)return 'Add the part before the @.';
  if(!d)return 'Finish the address after the @, like gmail.com.';
  if(v.length>254||n.length>64)return 'That address is too long.';
  if(!/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+$/i.test(n)||/^\.|\.$|\.\./.test(n))return 'Check the part before the @ for typos.';
  if(d.indexOf('.')<0)return 'Finish the address after the @, like gmail.com.';
  if(!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/.test(d))return 'Check the part after the @ for typos.';
  return '';
 }
 /* common slips in the big providers' names */
 var TYPO={'gmial.com':'gmail.com','gmai.com':'gmail.com','gmal.com':'gmail.com','gnail.com':'gmail.com','gamil.com':'gmail.com','gmaill.com':'gmail.com','gmail.co':'gmail.com','gmail.con':'gmail.com','gmail.cm':'gmail.com','gmail.om':'gmail.com','googlemail.co':'googlemail.com',
  'hotmial.com':'hotmail.com','hotmai.com':'hotmail.com','hotmal.com':'hotmail.com','hotmail.co':'hotmail.com','hotmail.con':'hotmail.com','hotmail.co.k':'hotmail.co.uk',
  'yaho.com':'yahoo.com','yahooo.com':'yahoo.com','yahoo.co':'yahoo.com','yahoo.con':'yahoo.com','yahoo.co.k':'yahoo.co.uk',
  'outlok.com':'outlook.com','outllok.com':'outlook.com','outlook.co':'outlook.com','outlook.con':'outlook.com',
  'iclod.com':'icloud.com','icoud.com':'icloud.com','icloud.co':'icloud.com','icloud.con':'icloud.com',
  'protonmial.com':'protonmail.com','protonmail.co':'protonmail.com','proton.me.com':'proton.me','live.co':'live.com','aol.co':'aol.com'};
 function typo(v){var i=v.lastIndexOf('@'),d=v.slice(i+1).toLowerCase(),t=TYPO[d]||(/\.(con|cmo|ocm|vom|xom|coma|comm|cim|cpm|cok)$/.test(d)?d.replace(/\.[a-z]+$/,'.com'):'');return t?v.slice(0,i+1)+t:''}
 e.addEventListener('input',function(){if(m.classList.contains('bad'))say('')});
 var rt;
 function reset(){f.classList.remove('done');ask.hidden=true;f.classList.remove('ask');e.value='';say('')}
 function done(k){f.classList.add('done');clearTimeout(rt);rt=setTimeout(reset,6000);say(k==='a'?"You're already signed up. Thank you.":k==='u'?"Thank you for your support. We'll keep you posted on new features and updates.":"Thank you for your support. You'll be the first to know when it's out.")}
 /* the form shows on every visit; addresses that signed up in this browser are remembered so a repeat gets "already signed up" */
 function joined(){try{return JSON.parse(localStorage.getItem('ab-wl-joined')||'[]')}catch(x){return []}}
 try{localStorage.removeItem('ab-waitlist')}catch(x){}
 var nav=document.getElementById('wl-nav');
 if(nav)nav.addEventListener('click',function(){if(!f.classList.contains('done'))setTimeout(function(){e.focus({preventScroll:true})},450)});
 f.addEventListener('submit',function(ev){
  ev.preventDefault();var v=e.value.trim();
  e.value=v;if(wrong(v)){say('Please enter a valid email.',1);e.focus();return}
  if(joined().indexOf(v.toLowerCase())>=0){done('a');return}
  var t=typo(v);
  if(t&&asked!==v){asked=v;say('Did you mean ',1);var fx=document.createElement('button');fx.type='button';fx.className='wl-fix';fx.textContent=t;
   fx.onclick=function(){e.value=t;say('');e.focus()};m.appendChild(fx);m.appendChild(document.createTextNode('?'));return}
  if(ask.hidden){open(v);return}
  if(!ln.checked&&!nw.checked)return;
  b.disabled=go.disabled=true;
  fetch(SUPA+'/rest/v1/rpc/join_waitlist',{method:'POST',headers:{apikey:ANON,Authorization:'Bearer '+ANON,'Content-Type':'application/json'},
   body:JSON.stringify({p_email:v,p_platform:plat,p_launch:ln.checked,p_updates:nw.checked})})
  .then(function(r){return r.ok?r.json():Promise.reject('server')})
  .then(function(r){
   if(r==='ok'){done(ln.checked?'1':'u');try{var j=joined();j.push(v.toLowerCase());localStorage.setItem('ab-wl-joined',JSON.stringify(j.slice(-20)))}catch(x){}}
   else if(r==='already'){done('a');try{var j=joined();j.push(v.toLowerCase());localStorage.setItem('ab-wl-joined',JSON.stringify(j.slice(-20)))}catch(x){}}
   else if(r==='slow')say('Too many sign-ups from this connection. Try again in an hour.',1);
   else{shut();say('Please enter a valid email.',1)}})
  .catch(function(x){say(x==='server'?"Something went wrong on our side. Your email wasn't saved. Please try again later.":'No internet connection. Check it and try again.',1)})
  .then(function(){b.disabled=go.disabled=false});
 });
})();
}catch(e){console.error(e)}
document.querySelectorAll('[data-hs]').forEach(function(b){b.addEventListener('click',function(){hsGo(+b.dataset.hs)})});
