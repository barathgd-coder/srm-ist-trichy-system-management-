(function(){
var body=document.body,att=document.getElementById('att'),btns=[].slice.call(document.querySelectorAll('#mods button'));
function mod(m){body.dataset.mod=m;btns.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.mod===m)});if(window.SCMFloor)SCMFloor.pause(m==='att')}
btns.forEach(function(b){b.addEventListener('click',function(){mod(b.dataset.mod)})});
document.getElementById('ea').addEventListener('click',function(){document.getElementById('ex').click();mod('att')});
var links=[].slice.call(att.querySelectorAll('.nav a')),targets=links.map(function(a){return att.querySelector(a.getAttribute('href'))});
function on(){var t0=att.getBoundingClientRect().top,y=att.scrollTop+120,i=0;targets.forEach(function(t,k){if(t&&t.getBoundingClientRect().top-t0+att.scrollTop<=y)i=k});links.forEach(function(a,k){a.classList.toggle('on',k===i)})}
att.addEventListener('scroll',on,{passive:true});on();
})();
