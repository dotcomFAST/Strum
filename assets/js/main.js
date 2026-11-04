// Strum Energy — tiny state layer for filters, tabs, accordions and forms.
// Markup declares data-c="key" (classes from state) and data-on="handler" (click handlers).
class DCLogic { constructor() { this.props = {}; this.state = {}; } setState(p) { Object.assign(this.state, p); render(); } }
class Component extends DCLogic {
renderVals() {
const s = this.state || {};
const f = s.f || 'all', v = s.v || 'grid', y = s.y || '2025', t = s.t || 'all', sent = !!s.sent;
const set = (k, val) => () => this.setState({ [k]: val });
const on = (cur, k) => cur === k ? 'on' : '';
const vis = (cur, k) => (cur === 'all' || cur === k) ? '' : 'hide';
return {
fAll: on(f,'all'), fH: on(f,'h'), fB: on(f,'b'), fI: on(f,'i'),
setFAll: set('f','all'), setFH: set('f','h'), setFB: set('f','b'), setFI: set('f','i'),
sh: vis(f,'h'), sb: vis(f,'b'), si: vis(f,'i'), filt: f === 'all' ? '' : 'filtered',
vGrid: on(v,'grid'), vTable: on(v,'table'), vMap: on(v,'map'),
setGrid: set('v','grid'), setTable: set('v','table'), setMap: set('v','map'),
showGrid: v === 'grid' ? '' : 'hide', showTable: v === 'table' ? '' : 'hide', showMap: v === 'map' ? '' : 'hide',
y25: on(y,'2025'), y24: on(y,'2024'), y23: on(y,'2023'),
setY25: set('y','2025'), setY24: set('y','2024'), setY23: set('y','2023'),
r25: y === '2025' ? '' : 'hide', r24: y === '2024' ? '' : 'hide', r23: y === '2023' ? '' : 'hide',
tAll: on(t,'all'), tH: on(t,'h'), tB: on(t,'b'), tI: on(t,'i'),
setTAll: set('t','all'), setTH: set('t','h'), setTB: set('t','b'), setTI: set('t','i'),
dh: vis(t,'h'), db: vis(t,'b'), di: vis(t,'i'),
formCls: sent ? 'hide' : '', okCls: sent ? '' : 'hide',
send: () => this.setState({ sent: true }), reset: () => this.setState({ sent: false })
};
}
}
const comp = new Component();
function render() {
  const v = comp.renderVals();
  document.querySelectorAll('[data-c]').forEach(el => {
    (el.dataset.cv || '').split(' ').filter(Boolean).forEach(c => el.classList.remove(c));
    const add = el.dataset.c.split(' ').map(k => v[k]).filter(x => typeof x === 'string' && x).join(' ').split(' ').filter(Boolean);
    add.forEach(c => el.classList.add(c));
    el.dataset.cv = add.join(' ');
    if (el.classList.contains('chip')) el.setAttribute('aria-pressed', el.classList.contains('on') ? 'true' : 'false');
  });
}
document.addEventListener('click', e => {
  const el = e.target.closest('[data-on]');
  if (!el) return;
  const fn = comp.renderVals()[el.dataset.on];
  if (typeof fn === 'function') { e.preventDefault(); fn(); }
});
render();
