var t;!function(t){t.landscape="landscape",t.portrait="portrait"}(t||(t={}));class s{get size(){return this.current.size}constructor(){this.elements=new Map,this.current={width:document.body.clientWidth,orientation:t.landscape,size:"md",sizing:{}},this.sizes=["xs","sm","md","lg","xl"],this.styles="\n    :root {\n      --screen-xs: 576px;\n      --screen-sm: 768px;\n      --screen-md: 992px;\n      --screen-lg: 1140px;\n      --screen-xl: 99999px;\n    }\n    [hidden] { display: none !important }\n    .screen-xs [hidden-xs], .screen-xs[hidden-xs] { display: none !important }\n    .screen-sm [hidden-sm], .screen-sm[hidden-sm] { display: none !important }\n    .screen-md [hidden-md], .screen-md[hidden-md] { display: none !important }\n    .screen-lg [hidden-lg], .screen-lg[hidden-lg] { display: none !important }\n    .screen-xl [hidden-xl], .screen-xl[hidden-xl] { display: none !important }\n    .no-pad { padding: 0 }\n    .no-margin { margin: 0 }\n    .no-border { border: 0 }\n    .no-scroll, .no-scroll *:not(.yes-scroll) {\n      overscroll-behavior: none !important;\n      overflow: hidden !important;\n    }\n  ",window.addEventListener("resize",(()=>{this.trackWidth(),this.update()})),window.screen.orientation.addEventListener("change",(()=>{this.trackOrientation(),this.update()}))}init(){this.initializeSizing(),this.trackWidth(),this.trackOrientation()}initializeSizing(){for(const t of this.sizes)this.current.sizing[t]=this.getSizeFromCss(t)}getSizeFromCss(t){return parseInt(getComputedStyle(document.body).getPropertyValue(`--screen-${t}`).replace("px",""))}trackWidth(){this.current.width=document.body.clientWidth;for(const t of this.sizes)if(this.current.width<this.current.sizing[t]){this.current.size=t;break}}trackOrientation(){if(["landscape","landscape-primary","landscape-secondary"].indexOf(window.screen.orientation.type)>-1)return void(this.current.orientation=t.landscape);["portrait","portrait-primary","portrait-secondary"].indexOf(window.screen.orientation.type)>-1?this.current.orientation=t.portrait:this.current.orientation=void 0}isSize(t){return this.current.size===t}sync(t,s={width:!0}){this.elements.has(t)||(this.elements.set(t,s),this.updateElement(t))}unsync(t){this.elements.delete(t),this.clearElement(t)}clear(){for(const t of this.elements.keys())this.updateElement(t)}clearElement(s){for(const t of this.sizes)this.removeClass(s,`screen-${t}`);this.removeClass(s,t.landscape),this.removeClass(s,t.portrait)}update(){for(const t of this.elements.keys())this.updateElement(t)}updateElement(s){const e=this.elements.get(s);if(e?.width)for(const t of this.sizes)this.current.size===t?this.addClass(s,`screen-${t}`):this.removeClass(s,`screen-${t}`);if(e?.orientation)switch(this.current.orientation){case t.landscape:this.addClass(s,t.landscape),this.removeClass(s,t.portrait);break;case t.portrait:this.addClass(s,t.portrait),this.removeClass(s,t.landscape);break;default:this.removeClass(s,t.portrait),this.removeClass(s,t.landscape)}}lockScroll(t){return(t=t||document.body)&&this.addClass(t,"no-scroll"),()=>{this.removeClass(document.body,"no-scroll"),t&&this.removeClass(t,"no-scroll")}}addAttribute(t,s,e=""){t.setAttribute(s,e)}removeAttribute(t,s){t.removeAttribute(s)}toggleAttribute(t,s,e,i=""){void 0===e&&(e=t.hasAttribute(s)),e?this.addAttribute(t,s,i):this.removeAttribute(t,s)}addClass(t,s){t.classList.contains(s)||t.classList.add(s)}removeClass(t,s){for(;t.classList.contains(s);)t.classList.remove(s)}async wait(t=1){return await new Promise((s=>setTimeout((()=>s(void 0)),t)))}}let e=window?.$screen;if(!e){e=new s,window.$screen=e;const t=document.createElement("style");t.setAttribute("mo-screen",""),t.innerHTML=e.styles,document.head.appendChild(t),e.init()}const i=function(){if("undefined"!=typeof globalThis)return globalThis;if("undefined"!=typeof global)return global;if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;try{return new Function("return this")()}catch(t){return{}}}();void 0===i.trustedTypes&&(i.trustedTypes={createPolicy:(t,s)=>s});const o={configurable:!1,enumerable:!1,writable:!1};void 0===i.FAST&&Reflect.defineProperty(i,"FAST",Object.assign({value:Object.create(null)},o));const n=i.FAST;if(void 0===n.getById){const t=Object.create(null);Reflect.defineProperty(n,"getById",Object.assign({value(s,e){let i=t[s];return void 0===i&&(i=e?t[s]=e():null),i}},o))}const r=Object.freeze([]);function l(){const t=new WeakMap;return function(s){let e=t.get(s);if(void 0===e){let i=Reflect.getPrototypeOf(s);for(;void 0===e&&null!==i;)e=t.get(i),i=Reflect.getPrototypeOf(i);e=void 0===e?[]:e.slice(0),t.set(s,e)}return e}}const a=i.FAST.getById(1,(()=>{const t=[],s=[];function e(){if(s.length)throw s.shift()}function o(t){try{t.call()}catch(t){s.push(t),setTimeout(e,0)}}function n(){let s=0;for(;s<t.length;)if(o(t[s]),s++,s>1024){for(let e=0,i=t.length-s;e<i;e++)t[e]=t[e+s];t.length-=s,s=0}t.length=0}return Object.freeze({enqueue:function(s){t.length<1&&i.requestAnimationFrame(n),t.push(s)},process:n})})),h=i.trustedTypes.createPolicy("fast-html",{createHTML:t=>t});let c=h;const d=`fast-${Math.random().toString(36).substring(2,8)}`,u=`${d}{`,f=`}${d}`,v=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(t){if(c!==h)throw new Error("The HTML policy can only be set once.");c=t},createHTML:t=>c.createHTML(t),isMarker:t=>t&&8===t.nodeType&&t.data.startsWith(d),extractDirectiveIndexFromMarker:t=>parseInt(t.data.replace(`${d}:`,"")),createInterpolationPlaceholder:t=>`${u}${t}${f}`,createCustomAttributePlaceholder(t,s){return`${t}="${this.createInterpolationPlaceholder(s)}"`},createBlockPlaceholder:t=>`\x3c!--${d}:${t}--\x3e`,queueUpdate:a.enqueue,processUpdates:a.process,nextUpdate:()=>new Promise(a.enqueue),setAttribute(t,s,e){null==e?t.removeAttribute(s):t.setAttribute(s,e)},setBooleanAttribute(t,s,e){e?t.setAttribute(s,""):t.removeAttribute(s)},removeChildNodes(t){for(let s=t.firstChild;null!==s;s=t.firstChild)t.removeChild(s)},createTemplateWalker:t=>document.createTreeWalker(t,133,null,!1)});class m{constructor(t,s){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=s}has(t){return void 0===this.spillover?this.sub1===t||this.sub2===t:-1!==this.spillover.indexOf(t)}subscribe(t){const s=this.spillover;if(void 0===s){if(this.has(t))return;if(void 0===this.sub1)return void(this.sub1=t);if(void 0===this.sub2)return void(this.sub2=t);this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else{-1===s.indexOf(t)&&s.push(t)}}unsubscribe(t){const s=this.spillover;if(void 0===s)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const e=s.indexOf(t);-1!==e&&s.splice(e,1)}}notify(t){const s=this.spillover,e=this.source;if(void 0===s){const s=this.sub1,i=this.sub2;void 0!==s&&s.handleChange(e,t),void 0!==i&&i.handleChange(e,t)}else for(let i=0,o=s.length;i<o;++i)s[i].handleChange(e,t)}}class b{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var s;const e=this.subscribers[t];void 0!==e&&e.notify(t),null===(s=this.sourceSubscribers)||void 0===s||s.notify(t)}subscribe(t,s){var e;if(s){let e=this.subscribers[s];void 0===e&&(this.subscribers[s]=e=new m(this.source)),e.subscribe(t)}else this.sourceSubscribers=null!==(e=this.sourceSubscribers)&&void 0!==e?e:new m(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,s){var e;if(s){const e=this.subscribers[s];void 0!==e&&e.unsubscribe(t)}else null===(e=this.sourceSubscribers)||void 0===e||e.unsubscribe(t)}}const p=n.getById(2,(()=>{const t=/(:|&&|\|\||if)/,s=new WeakMap,e=v.queueUpdate;let i,o=t=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function n(t){let e=t.$fastController||s.get(t);return void 0===e&&(Array.isArray(t)?e=o(t):s.set(t,e=new b(t))),e}const r=l();class a{constructor(t){this.name=t,this.field=`_${t}`,this.callback=`${t}Changed`}getValue(t){return void 0!==i&&i.watch(t,this.name),t[this.field]}setValue(t,s){const e=this.field,i=t[e];if(i!==s){t[e]=s;const o=t[this.callback];"function"==typeof o&&o.call(t,i,s),n(t).notify(this.name)}}}class h extends m{constructor(t,s,e=!1){super(t,s),this.binding=t,this.isVolatileBinding=e,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(t,s){this.needsRefresh&&null!==this.last&&this.disconnect();const e=i;i=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const o=this.binding(t,s);return i=e,o}disconnect(){if(null!==this.last){let t=this.first;for(;void 0!==t;)t.notifier.unsubscribe(this,t.propertyName),t=t.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(t,s){const e=this.last,o=n(t),r=null===e?this.first:{};if(r.propertySource=t,r.propertyName=s,r.notifier=o,o.subscribe(this,s),null!==e){if(!this.needsRefresh){let s;i=void 0,s=e.propertySource[e.propertyName],i=this,t===s&&(this.needsRefresh=!0)}e.next=r}this.last=r}handleChange(){this.needsQueue&&(this.needsQueue=!1,e(this))}call(){null!==this.last&&(this.needsQueue=!0,this.notify(this))}records(){let t=this.first;return{next:()=>{const s=t;return void 0===s?{value:void 0,done:!0}:(t=t.next,{value:s,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(t){o=t},getNotifier:n,track(t,s){void 0!==i&&i.watch(t,s)},trackVolatile(){void 0!==i&&(i.needsRefresh=!0)},notify(t,s){n(t).notify(s)},defineProperty(t,s){"string"==typeof s&&(s=new a(s)),r(t).push(s),Reflect.defineProperty(t,s.name,{enumerable:!0,get:function(){return s.getValue(this)},set:function(t){s.setValue(this,t)}})},getAccessors:r,binding(t,s,e=this.isVolatileBinding(t)){return new h(t,s,e)},isVolatileBinding:s=>t.test(s.toString())})}));function g(t,s){p.defineProperty(t,s)}const x=n.getById(3,(()=>{let t=null;return{get:()=>t,set(s){t=s}}}));class w{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return x.get()}get isEven(){return this.index%2==0}get isOdd(){return this.index%2!=0}get isFirst(){return 0===this.index}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){x.set(t)}}p.defineProperty(w.prototype,"index"),p.defineProperty(w.prototype,"length");const y=Object.seal(new w);class k{constructor(){this.targetIndex=0}}class $ extends k{constructor(){super(...arguments),this.createPlaceholder=v.createInterpolationPlaceholder}}class C extends k{constructor(t,s,e){super(),this.name=t,this.behavior=s,this.options=e}createPlaceholder(t){return v.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function z(t,s){this.source=t,this.context=s,null===this.bindingObserver&&(this.bindingObserver=p.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(t,s))}function O(t,s){this.source=t,this.context=s,this.target.addEventListener(this.targetName,this)}function j(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function R(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const t=this.target.$fastView;void 0!==t&&t.isComposed&&(t.unbind(),t.needsBindOnly=!0)}function S(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function T(t){v.setAttribute(this.target,this.targetName,t)}function E(t){v.setBooleanAttribute(this.target,this.targetName,t)}function A(t){if(null==t&&(t=""),t.create){this.target.textContent="";let s=this.target.$fastView;void 0===s?s=t.create():this.target.$fastTemplate!==t&&(s.isComposed&&(s.remove(),s.unbind()),s=t.create()),s.isComposed?s.needsBindOnly&&(s.needsBindOnly=!1,s.bind(this.source,this.context)):(s.isComposed=!0,s.bind(this.source,this.context),s.insertBefore(this.target),this.target.$fastView=s,this.target.$fastTemplate=t)}else{const s=this.target.$fastView;void 0!==s&&s.isComposed&&(s.isComposed=!1,s.remove(),s.needsBindOnly?s.needsBindOnly=!1:s.unbind()),this.target.textContent=t}}function M(t){this.target[this.targetName]=t}function F(t){const s=this.classVersions||Object.create(null),e=this.target;let i=this.version||0;if(null!=t&&t.length){const o=t.split(/\s+/);for(let t=0,n=o.length;t<n;++t){const n=o[t];""!==n&&(s[n]=i,e.classList.add(n))}}if(this.classVersions=s,this.version=i+1,0!==i){i-=1;for(const t in s)s[t]===i&&e.classList.remove(t)}}class B extends ${constructor(t){super(),this.binding=t,this.bind=z,this.unbind=j,this.updateTarget=T,this.isBindingVolatile=p.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,void 0!==t)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=M,"innerHTML"===this.cleanedTargetName){const t=this.binding;this.binding=(s,e)=>v.createHTML(t(s,e))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=E;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=O,this.unbind=S;break;default:this.cleanedTargetName=t,"class"===t&&(this.updateTarget=F)}}targetAtContent(){this.updateTarget=A,this.unbind=R}createBehavior(t){return new P(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class P{constructor(t,s,e,i,o,n,r){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=s,this.isBindingVolatile=e,this.bind=i,this.unbind=o,this.updateTarget=n,this.targetName=r}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){w.setEvent(t);const s=this.binding(this.source,this.context);w.setEvent(null),!0!==s&&t.preventDefault()}}let I=null;class V{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){I=this}static borrow(t){const s=I||new V;return s.directives=t,s.reset(),I=null,s}}function H(t){if(1===t.length)return t[0];let s;const e=t.length,i=t.map((t=>"string"==typeof t?()=>t:(s=t.targetName||s,t.binding))),o=new B(((t,s)=>{let o="";for(let n=0;n<e;++n)o+=i[n](t,s);return o}));return o.targetName=s,o}const L=f.length;function N(t,s){const e=s.split(u);if(1===e.length)return null;const i=[];for(let s=0,o=e.length;s<o;++s){const o=e[s],n=o.indexOf(f);let r;if(-1===n)r=o;else{const s=parseInt(o.substring(0,n));i.push(t.directives[s]),r=o.substring(n+L)}""!==r&&i.push(r)}return i}function W(t,s,e=!1){const i=s.attributes;for(let o=0,n=i.length;o<n;++o){const r=i[o],l=r.value,a=N(t,l);let h=null;null===a?e&&(h=new B((()=>l)),h.targetName=r.name):h=H(a),null!==h&&(s.removeAttributeNode(r),o--,n--,t.addFactory(h))}}function D(t,s,e){const i=N(t,s.textContent);if(null!==i){let o=s;for(let n=0,r=i.length;n<r;++n){const r=i[n],l=0===n?s:o.parentNode.insertBefore(document.createTextNode(""),o.nextSibling);"string"==typeof r?l.textContent=r:(l.textContent=" ",t.captureContentBinding(r)),o=l,t.targetIndex++,l!==s&&e.nextNode()}t.targetIndex--}}const q=document.createRange();class U{constructor(t,s){this.fragment=t,this.behaviors=s,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const s=this.lastChild;if(t.previousSibling===s)return;const e=t.parentNode;let i,o=this.firstChild;for(;o!==s;)i=o.nextSibling,e.insertBefore(o,t),o=i;e.insertBefore(s,t)}}remove(){const t=this.fragment,s=this.lastChild;let e,i=this.firstChild;for(;i!==s;)e=i.nextSibling,t.appendChild(i),i=e;t.appendChild(s)}dispose(){const t=this.firstChild.parentNode,s=this.lastChild;let e,i=this.firstChild;for(;i!==s;)e=i.nextSibling,t.removeChild(i),i=e;t.removeChild(s);const o=this.behaviors,n=this.source;for(let t=0,s=o.length;t<s;++t)o[t].unbind(n)}bind(t,s){const e=this.behaviors;if(this.source!==t)if(null!==this.source){const i=this.source;this.source=t,this.context=s;for(let o=0,n=e.length;o<n;++o){const n=e[o];n.unbind(i),n.bind(t,s)}}else{this.source=t,this.context=s;for(let i=0,o=e.length;i<o;++i)e[i].bind(t,s)}}unbind(){if(null===this.source)return;const t=this.behaviors,s=this.source;for(let e=0,i=t.length;e<i;++e)t[e].unbind(s);this.source=null}static disposeContiguousBatch(t){if(0!==t.length){q.setStartBefore(t[0].firstChild),q.setEndAfter(t[t.length-1].lastChild),q.deleteContents();for(let s=0,e=t.length;s<e;++s){const e=t[s],i=e.behaviors,o=e.source;for(let t=0,s=i.length;t<s;++t)i[t].unbind(o)}}}}class Y{constructor(t,s){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=s}create(t){if(null===this.fragment){let t;const s=this.html;if("string"==typeof s){t=document.createElement("template"),t.innerHTML=v.createHTML(s);const e=t.content.firstElementChild;null!==e&&"TEMPLATE"===e.tagName&&(t=e)}else t=s;const e=function(t,s){const e=t.content;document.adoptNode(e);const i=V.borrow(s);W(i,t,!0);const o=i.behaviorFactories;i.reset();const n=v.createTemplateWalker(e);let r;for(;r=n.nextNode();)switch(i.targetIndex++,r.nodeType){case 1:W(i,r);break;case 3:D(i,r,n);break;case 8:v.isMarker(r)&&i.addFactory(s[v.extractDirectiveIndexFromMarker(r)])}let l=0;(v.isMarker(e.firstChild)||1===e.childNodes.length&&s.length)&&(e.insertBefore(document.createComment(""),e.firstChild),l=-1);const a=i.behaviorFactories;return i.release(),{fragment:e,viewBehaviorFactories:a,hostBehaviorFactories:o,targetOffset:l}}(t,this.directives);this.fragment=e.fragment,this.viewBehaviorFactories=e.viewBehaviorFactories,this.hostBehaviorFactories=e.hostBehaviorFactories,this.targetOffset=e.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const s=this.fragment.cloneNode(!0),e=this.viewBehaviorFactories,i=new Array(this.behaviorCount),o=v.createTemplateWalker(s);let n=0,r=this.targetOffset,l=o.nextNode();for(let t=e.length;n<t;++n){const t=e[n],s=t.targetIndex;for(;null!==l;){if(r===s){i[n]=t.createBehavior(l);break}l=o.nextNode(),r++}}if(this.hasHostBehaviors){const s=this.hostBehaviorFactories;for(let e=0,o=s.length;e<o;++e,++n)i[n]=s[e].createBehavior(t)}return new U(s,i)}render(t,s,e){"string"==typeof s&&(s=document.getElementById(s)),void 0===e&&(e=s);const i=this.create(e);return i.bind(t,y),i.appendTo(s),i}}const _=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function G(t,...s){const e=[];let i="";for(let o=0,n=t.length-1;o<n;++o){const n=t[o];let r=s[o];if(i+=n,r instanceof Y){const t=r;r=()=>t}if("function"==typeof r&&(r=new B(r)),r instanceof $){const t=_.exec(n);null!==t&&(r.targetName=t[2])}r instanceof k?(i+=r.createPlaceholder(e.length),e.push(r)):i+=r}return i+=t[t.length-1],new Y(i,e)}class X{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=null===this.behaviors?t:this.behaviors.concat(t),this}}function Z(t){return t.map((t=>t instanceof X?Z(t.styles):[t])).reduce(((t,s)=>t.concat(s)),[])}function J(t){return t.map((t=>t instanceof X?t.behaviors:null)).reduce(((t,s)=>null===s?t:(null===t&&(t=[]),t.concat(s))),null)}X.create=(()=>{if(v.supportsAdoptedStyleSheets){const t=new Map;return s=>new et(s,t)}return t=>new ot(t)})();const K=Symbol("prependToAdoptedStyleSheets");function Q(t){const s=[],e=[];return t.forEach((t=>(t[K]?s:e).push(t))),{prepend:s,append:e}}let tt=(t,s)=>{const{prepend:e,append:i}=Q(s);t.adoptedStyleSheets=[...e,...t.adoptedStyleSheets,...i]},st=(t,s)=>{t.adoptedStyleSheets=t.adoptedStyleSheets.filter((t=>-1===s.indexOf(t)))};if(v.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),tt=(t,s)=>{const{prepend:e,append:i}=Q(s);t.adoptedStyleSheets.splice(0,0,...e),t.adoptedStyleSheets.push(...i)},st=(t,s)=>{for(const e of s){const s=t.adoptedStyleSheets.indexOf(e);-1!==s&&t.adoptedStyleSheets.splice(s,1)}}}catch(t){}class et extends X{constructor(t,s){super(),this.styles=t,this.styleSheetCache=s,this._styleSheets=void 0,this.behaviors=J(t)}get styleSheets(){if(void 0===this._styleSheets){const t=this.styles,s=this.styleSheetCache;this._styleSheets=Z(t).map((t=>{if(t instanceof CSSStyleSheet)return t;let e=s.get(t);return void 0===e&&(e=new CSSStyleSheet,e.replaceSync(t),s.set(t,e)),e}))}return this._styleSheets}addStylesTo(t){tt(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){st(t,this.styleSheets),super.removeStylesFrom(t)}}let it=0;class ot extends X{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=J(t),this.styleSheets=Z(t),this.styleClass="fast-style-class-"+ ++it}addStylesTo(t){const s=this.styleSheets,e=this.styleClass;t=this.normalizeTarget(t);for(let i=0;i<s.length;i++){const o=document.createElement("style");o.innerHTML=s[i],o.className=e,t.append(o)}super.addStylesTo(t)}removeStylesFrom(t){const s=(t=this.normalizeTarget(t)).querySelectorAll(`.${this.styleClass}`);for(let e=0,i=s.length;e<i;++e)t.removeChild(s[e]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const nt=Object.freeze({locate:l()}),rt={toView:t=>t?"true":"false",fromView:t=>null!=t&&"false"!==t&&!1!==t&&0!==t};class lt{constructor(t,s,e=s.toLowerCase(),i="reflect",o){this.guards=new Set,this.Owner=t,this.name=s,this.attribute=e,this.mode=i,this.converter=o,this.fieldName=`_${s}`,this.callbackName=`${s}Changed`,this.hasCallback=this.callbackName in t.prototype,"boolean"===i&&void 0===o&&(this.converter=rt)}setValue(t,s){const e=t[this.fieldName],i=this.converter;void 0!==i&&(s=i.fromView(s)),e!==s&&(t[this.fieldName]=s,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](e,s),t.$fastController.notify(this.name))}getValue(t){return p.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,s){this.guards.has(t)||(this.guards.add(t),this.setValue(t,s),this.guards.delete(t))}tryReflectToAttribute(t){const s=this.mode,e=this.guards;e.has(t)||"fromView"===s||v.queueUpdate((()=>{e.add(t);const i=t[this.fieldName];switch(s){case"reflect":const s=this.converter;v.setAttribute(t,this.attribute,void 0!==s?s.toView(i):i);break;case"boolean":v.setBooleanAttribute(t,this.attribute,i)}e.delete(t)}))}static collect(t,...s){const e=[];s.push(nt.locate(t));for(let i=0,o=s.length;i<o;++i){const o=s[i];if(void 0!==o)for(let s=0,i=o.length;s<i;++s){const i=o[s];"string"==typeof i?e.push(new lt(t,i)):e.push(new lt(t,i.property,i.attribute,i.mode,i.converter))}}return e}}function at(t,s){let e;function i(t,s){arguments.length>1&&(e.property=s),nt.locate(t.constructor).push(e)}return arguments.length>1?(e={},void i(t,s)):(e=void 0===t?{}:t,i)}const ht={mode:"open"},ct={},dt=n.getById(4,(()=>{const t=new Map;return Object.freeze({register:s=>!t.has(s.type)&&(t.set(s.type,s),!0),getByType:s=>t.get(s)})}));class ut{constructor(t,s=t.definition){"string"==typeof s&&(s={name:s}),this.type=t,this.name=s.name,this.template=s.template;const e=lt.collect(t,s.attributes),i=new Array(e.length),o={},n={};for(let t=0,s=e.length;t<s;++t){const s=e[t];i[t]=s.attribute,o[s.name]=s,n[s.attribute]=s}this.attributes=e,this.observedAttributes=i,this.propertyLookup=o,this.attributeLookup=n,this.shadowOptions=void 0===s.shadowOptions?ht:null===s.shadowOptions?void 0:Object.assign(Object.assign({},ht),s.shadowOptions),this.elementOptions=void 0===s.elementOptions?ct:Object.assign(Object.assign({},ct),s.elementOptions),this.styles=void 0===s.styles?void 0:Array.isArray(s.styles)?X.create(s.styles):s.styles instanceof X?s.styles:X.create([s.styles])}get isDefined(){return!!dt.getByType(this.type)}define(t=customElements){const s=this.type;if(dt.register(this)){const t=this.attributes,e=s.prototype;for(let s=0,i=t.length;s<i;++s)p.defineProperty(e,t[s]);Reflect.defineProperty(s,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,s,this.elementOptions),this}}ut.forType=dt.getByType;const ft=new WeakMap,vt={bubbles:!0,composed:!0,cancelable:!0};function mt(t){return t.shadowRoot||ft.get(t)||null}class bt extends b{constructor(t,s){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=s;const e=s.shadowOptions;if(void 0!==e){const s=t.attachShadow(e);"closed"===e.mode&&ft.set(t,s)}const i=p.getAccessors(t);if(i.length>0){const s=this.boundObservables=Object.create(null);for(let e=0,o=i.length;e<o;++e){const o=i[e].name,n=t[o];void 0!==n&&(delete t[o],s[o]=n)}}}get isConnected(){return p.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,p.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(null!==this._styles&&this.removeStyles(this._styles),this._styles=t,this.needsInitialization||null===t||this.addStyles(t))}addStyles(t){const s=mt(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)s.append(t);else if(!t.isAttachedTo(s)){const e=t.behaviors;t.addStylesTo(s),null!==e&&this.addBehaviors(e)}}removeStyles(t){const s=mt(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)s.removeChild(t);else if(t.isAttachedTo(s)){const e=t.behaviors;t.removeStylesFrom(s),null!==e&&this.removeBehaviors(e)}}addBehaviors(t){const s=this.behaviors||(this.behaviors=new Map),e=t.length,i=[];for(let o=0;o<e;++o){const e=t[o];s.has(e)?s.set(e,s.get(e)+1):(s.set(e,1),i.push(e))}if(this._isConnected){const t=this.element;for(let s=0;s<i.length;++s)i[s].bind(t,y)}}removeBehaviors(t,s=!1){const e=this.behaviors;if(null===e)return;const i=t.length,o=[];for(let n=0;n<i;++n){const i=t[n];if(e.has(i)){const t=e.get(i)-1;0===t||s?e.delete(i)&&o.push(i):e.set(i,t)}}if(this._isConnected){const t=this.element;for(let s=0;s<o.length;++s)o[s].unbind(t)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():null!==this.view&&this.view.bind(t,y);const s=this.behaviors;if(null!==s)for(const[e]of s)e.bind(t,y);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;null!==t&&t.unbind();const s=this.behaviors;if(null!==s){const t=this.element;for(const[e]of s)e.unbind(t)}}onAttributeChangedCallback(t,s,e){const i=this.definition.attributeLookup[t];void 0!==i&&i.onAttributeChangedCallback(this.element,e)}emit(t,s,e){return!!this._isConnected&&this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:s},vt),e)))}finishInitialization(){const t=this.element,s=this.boundObservables;if(null!==s){const e=Object.keys(s);for(let i=0,o=e.length;i<o;++i){const o=e[i];t[o]=s[o]}this.boundObservables=null}const e=this.definition;null===this._template&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():e.template&&(this._template=e.template||null)),null!==this._template&&this.renderTemplate(this._template),null===this._styles&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():e.styles&&(this._styles=e.styles||null)),null!==this._styles&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const s=this.element,e=mt(s)||s;null!==this.view?(this.view.dispose(),this.view=null):this.needsInitialization||v.removeChildNodes(e),t&&(this.view=t.render(s,e,s))}static forCustomElement(t){const s=t.$fastController;if(void 0!==s)return s;const e=ut.forType(t.constructor);if(void 0===e)throw new Error("Missing FASTElement definition.");return t.$fastController=new bt(t,e)}}function pt(t){return class extends t{constructor(){super(),bt.forCustomElement(this)}$emit(t,s,e){return this.$fastController.emit(t,s,e)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,s,e){this.$fastController.onAttributeChangedCallback(t,s,e)}}}const gt=Object.assign(pt(HTMLElement),{from:t=>pt(t),define:(t,s)=>new ut(t,s).define().type});function xt(t){return function(s){new ut(s,t).define()}}class wt{createCSS(){return""}createBehavior(){}}function yt(t,...s){const{styles:e,behaviors:i}=function(t,s){const e=[];let i="";const o=[];for(let n=0,r=t.length-1;n<r;++n){i+=t[n];let r=s[n];if(r instanceof wt){const t=r.createBehavior();r=r.createCSS(),t&&o.push(t)}r instanceof X||r instanceof CSSStyleSheet?(""!==i.trim()&&(e.push(i),i=""),e.push(r)):i+=r}return i+=t[t.length-1],""!==i.trim()&&e.push(i),{styles:e,behaviors:o}}(t,s),o=X.create(e);return i.length&&o.withBehaviors(...i),o}function kt(t,s,e){return{index:t,removed:s,addedCount:e}}const $t=0,Ct=1,zt=2,Ot=3;function jt(t,s,e,i,o,n){let l=0,a=0;const h=Math.min(e-s,n-o);if(0===s&&0===o&&(l=function(t,s,e){for(let i=0;i<e;++i)if(t[i]!==s[i])return i;return e}(t,i,h)),e===t.length&&n===i.length&&(a=function(t,s,e){let i=t.length,o=s.length,n=0;for(;n<e&&t[--i]===s[--o];)n++;return n}(t,i,h-l)),o+=l,n-=a,(e-=a)-(s+=l)==0&&n-o==0)return r;if(s===e){const t=kt(s,[],0);for(;o<n;)t.removed.push(i[o++]);return[t]}if(o===n)return[kt(s,[],e-s)];const c=function(t){let s=t.length-1,e=t[0].length-1,i=t[s][e];const o=[];for(;s>0||e>0;){if(0===s){o.push(zt),e--;continue}if(0===e){o.push(Ot),s--;continue}const n=t[s-1][e-1],r=t[s-1][e],l=t[s][e-1];let a;a=r<l?r<n?r:n:l<n?l:n,a===n?(n===i?o.push($t):(o.push(Ct),i=n),s--,e--):a===r?(o.push(Ot),s--,i=r):(o.push(zt),e--,i=l)}return o.reverse(),o}(function(t,s,e,i,o,n){const r=n-o+1,l=e-s+1,a=new Array(r);let h,c;for(let t=0;t<r;++t)a[t]=new Array(l),a[t][0]=t;for(let t=0;t<l;++t)a[0][t]=t;for(let e=1;e<r;++e)for(let n=1;n<l;++n)t[s+n-1]===i[o+e-1]?a[e][n]=a[e-1][n-1]:(h=a[e-1][n]+1,c=a[e][n-1]+1,a[e][n]=h<c?h:c);return a}(t,s,e,i,o,n)),d=[];let u,f=s,v=o;for(let t=0;t<c.length;++t)switch(c[t]){case $t:void 0!==u&&(d.push(u),u=void 0),f++,v++;break;case Ct:void 0===u&&(u=kt(f,[],0)),u.addedCount++,f++,u.removed.push(i[v]),v++;break;case zt:void 0===u&&(u=kt(f,[],0)),u.addedCount++,f++;break;case Ot:void 0===u&&(u=kt(f,[],0)),u.removed.push(i[v]),v++}return void 0!==u&&d.push(u),d}const Rt=Array.prototype.push;function St(t,s,e,i){const o=kt(s,e,i);let n=!1,r=0;for(let s=0;s<t.length;s++){const e=t[s];if(e.index+=r,n)continue;const i=(l=o.index,a=o.index+o.removed.length,h=e.index,c=e.index+e.addedCount,a<h||c<l?-1:a===h||c===l?0:l<h?a<c?a-h:c-h:c<a?c-l:a-l);if(i>=0){t.splice(s,1),s--,r-=e.addedCount-e.removed.length,o.addedCount+=e.addedCount-i;const l=o.removed.length+e.removed.length-i;if(o.addedCount||l){let t=e.removed;if(o.index<e.index){const s=o.removed.slice(0,e.index-o.index);Rt.apply(s,t),t=s}if(o.index+o.removed.length>e.index+e.addedCount){const s=o.removed.slice(e.index+e.addedCount-o.index);Rt.apply(t,s)}o.removed=t,e.index<o.index&&(o.index=e.index)}else n=!0}else if(o.index<e.index){n=!0,t.splice(s,0,o),s++;const i=o.addedCount-o.removed.length;e.index+=i,r+=i}}var l,a,h,c;n||t.push(o)}function Tt(t,s){let e=[];const i=function(t){const s=[];for(let e=0,i=t.length;e<i;e++){const i=t[e];St(s,i.index,i.removed,i.addedCount)}return s}(s);for(let s=0,o=i.length;s<o;++s){const o=i[s];1!==o.addedCount||1!==o.removed.length?e=e.concat(jt(t,o.index,o.index+o.addedCount,o.removed,0,o.removed.length)):o.removed[0]!==t[o.index]&&e.push(o)}return e}let Et=!1;function At(t,s){let e=t.index;const i=s.length;return e>i?e=i-t.addedCount:e<0&&(e=i+t.removed.length+e-t.addedCount),e<0&&(e=0),t.index=e,t}class Mt extends m{constructor(t){super(t),this.oldCollection=void 0,this.splices=void 0,this.needsQueue=!0,this.call=this.flush,Reflect.defineProperty(t,"$fastController",{value:this,enumerable:!1})}subscribe(t){this.flush(),super.subscribe(t)}addSplice(t){void 0===this.splices?this.splices=[t]:this.splices.push(t),this.needsQueue&&(this.needsQueue=!1,v.queueUpdate(this))}reset(t){this.oldCollection=t,this.needsQueue&&(this.needsQueue=!1,v.queueUpdate(this))}flush(){const t=this.splices,s=this.oldCollection;if(void 0===t&&void 0===s)return;this.needsQueue=!0,this.splices=void 0,this.oldCollection=void 0;const e=void 0===s?Tt(this.source,t):jt(this.source,0,this.source.length,s,0,s.length);this.notify(e)}}class Ft{constructor(t,s){this.target=t,this.propertyName=s}bind(t){t[this.propertyName]=this.target}unbind(){}}function Bt(t){return new C("fast-ref",Ft,t)}const Pt=t=>"function"==typeof t,It=()=>null;function Vt(t){return void 0===t?It:Pt(t)?t:()=>t}function Ht(t,s,e){const i=Pt(t)?t:()=>t,o=Vt(s),n=Vt(e);return(t,s)=>i(t,s)?o(t,s):n(t,s)}const Lt=Object.freeze({positioning:!1,recycle:!0});function Nt(t,s,e,i){t.bind(s[e],i)}function Wt(t,s,e,i){const o=Object.create(i);o.index=e,o.length=s.length,t.bind(s[e],o)}class Dt{constructor(t,s,e,i,o,n){this.location=t,this.itemsBinding=s,this.templateBinding=i,this.options=n,this.source=null,this.views=[],this.items=null,this.itemsObserver=null,this.originalContext=void 0,this.childContext=void 0,this.bindView=Nt,this.itemsBindingObserver=p.binding(s,this,e),this.templateBindingObserver=p.binding(i,this,o),n.positioning&&(this.bindView=Wt)}bind(t,s){this.source=t,this.originalContext=s,this.childContext=Object.create(s),this.childContext.parent=t,this.childContext.parentContext=this.originalContext,this.items=this.itemsBindingObserver.observe(t,this.originalContext),this.template=this.templateBindingObserver.observe(t,this.originalContext),this.observeItems(!0),this.refreshAllViews()}unbind(){this.source=null,this.items=null,null!==this.itemsObserver&&this.itemsObserver.unsubscribe(this),this.unbindAllViews(),this.itemsBindingObserver.disconnect(),this.templateBindingObserver.disconnect()}handleChange(t,s){t===this.itemsBinding?(this.items=this.itemsBindingObserver.observe(this.source,this.originalContext),this.observeItems(),this.refreshAllViews()):t===this.templateBinding?(this.template=this.templateBindingObserver.observe(this.source,this.originalContext),this.refreshAllViews(!0)):this.updateViews(s)}observeItems(t=!1){if(!this.items)return void(this.items=r);const s=this.itemsObserver,e=this.itemsObserver=p.getNotifier(this.items),i=s!==e;i&&null!==s&&s.unsubscribe(this),(i||t)&&e.subscribe(this)}updateViews(t){const s=this.childContext,e=this.views,i=this.bindView,o=this.items,n=this.template,r=this.options.recycle,l=[];let a=0,h=0;for(let c=0,d=t.length;c<d;++c){const d=t[c],u=d.removed;let f=0,v=d.index;const m=v+d.addedCount,b=e.splice(d.index,u.length),p=h=l.length+b.length;for(;v<m;++v){const t=e[v],c=t?t.firstChild:this.location;let d;r&&h>0?(f<=p&&b.length>0?(d=b[f],f++):(d=l[a],a++),h--):d=n.create(),e.splice(v,0,d),i(d,o,v,s),d.insertBefore(c)}b[f]&&l.push(...b.slice(f))}for(let t=a,s=l.length;t<s;++t)l[t].dispose();if(this.options.positioning)for(let t=0,s=e.length;t<s;++t){const i=e[t].context;i.length=s,i.index=t}}refreshAllViews(t=!1){const s=this.items,e=this.childContext,i=this.template,o=this.location,n=this.bindView;let r=s.length,l=this.views,a=l.length;if(0!==r&&!t&&this.options.recycle||(U.disposeContiguousBatch(l),a=0),0===a){this.views=l=new Array(r);for(let t=0;t<r;++t){const r=i.create();n(r,s,t,e),l[t]=r,r.insertBefore(o)}}else{let t=0;for(;t<r;++t)if(t<a){n(l[t],s,t,e)}else{const r=i.create();n(r,s,t,e),l.push(r),r.insertBefore(o)}const h=l.splice(t,a-t);for(t=0,r=h.length;t<r;++t)h[t].dispose()}}unbindAllViews(){const t=this.views;for(let s=0,e=t.length;s<e;++s)t[s].unbind()}}class qt extends k{constructor(t,s,e){super(),this.itemsBinding=t,this.templateBinding=s,this.options=e,this.createPlaceholder=v.createBlockPlaceholder,function(){if(Et)return;Et=!0,p.setArrayObserverFactory((t=>new Mt(t)));const t=Array.prototype;if(t.$fastPatch)return;Reflect.defineProperty(t,"$fastPatch",{value:1,enumerable:!1});const s=t.pop,e=t.push,i=t.reverse,o=t.shift,n=t.sort,r=t.splice,l=t.unshift;t.pop=function(){const t=this.length>0,e=s.apply(this,arguments),i=this.$fastController;return void 0!==i&&t&&i.addSplice(kt(this.length,[e],0)),e},t.push=function(){const t=e.apply(this,arguments),s=this.$fastController;return void 0!==s&&s.addSplice(At(kt(this.length-arguments.length,[],arguments.length),this)),t},t.reverse=function(){let t;const s=this.$fastController;void 0!==s&&(s.flush(),t=this.slice());const e=i.apply(this,arguments);return void 0!==s&&s.reset(t),e},t.shift=function(){const t=this.length>0,s=o.apply(this,arguments),e=this.$fastController;return void 0!==e&&t&&e.addSplice(kt(0,[s],0)),s},t.sort=function(){let t;const s=this.$fastController;void 0!==s&&(s.flush(),t=this.slice());const e=n.apply(this,arguments);return void 0!==s&&s.reset(t),e},t.splice=function(){const t=r.apply(this,arguments),s=this.$fastController;return void 0!==s&&s.addSplice(At(kt(+arguments[0],t,arguments.length>2?arguments.length-2:0),this)),t},t.unshift=function(){const t=l.apply(this,arguments),s=this.$fastController;return void 0!==s&&s.addSplice(At(kt(0,[],arguments.length),this)),t}}(),this.isItemsBindingVolatile=p.isVolatileBinding(t),this.isTemplateBindingVolatile=p.isVolatileBinding(s)}createBehavior(t){return new Dt(t,this.itemsBinding,this.isItemsBindingVolatile,this.templateBinding,this.isTemplateBindingVolatile,this.options)}}function Ut(t,s,e=Lt){return new qt(t,"function"==typeof s?s:()=>s,Object.assign(Object.assign({},Lt),e))}class Yt{constructor(t,s){this.target=t,this.options=s,this.source=null}bind(t){const s=this.options.property;this.shouldUpdate=p.getAccessors(t).some((t=>t.name===s)),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(r),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return void 0!==this.options.filter&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class _t extends Yt{constructor(t,s){super(t,s)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function Gt(t){return"string"==typeof t&&(t={property:t}),new C("fast-slotted",_t,t)}const Xt=yt`

  :host {
    margin: var(--margin-xs);
    box-sizing: border-box;
    flex: 1 1;
    display: flex;
  }

  .icon { 
    justify-content: center;
    align-items: center;
    margin-right: var(--margin-xs);
    min-width: var(--size-md);
  }

  .icon i {
    font-size:var(--font-size-2xl)
  }

  button { 
    margin-left: var(--margin-xs);
  }

  .body ::slotted(:first-child) { 
    flex: 1 1;
  }

  .body ::slotted(*) {
    margin-left: var(--margin-xs);
  }

  .container { 
    padding: var(--padding-md);
    border: var(--border-width-sm) solid var(--default-border-color);
    border-radius: var(--border-radius-lg);
    background: var(--default-background);
    min-height: var(--size-lg);
  }

  .info { 
    border-color: var(--info-border-color);
    background: var(--info-background-color);
  }
  .info .body { color: var(--info-foreground-color) }
  .info i { color: var(--info-foreground-color) }

  .success { 
    border-color: var(--success-border-color);
    background: var(--success-background-color);
  }
  .success .body { color: var(--success-foreground-color) }
  .success i { color: var(--success-foreground-color) }

  .warning { 
    border-color: var(--warning-border-color);
    background: var(--warning-background-color);
  }
  .warning .body { color: var(--warning-foreground-color) }
  .warning i { color: var(--warning-foreground-color) }

  .error { 
    border-color: var(--error-border-color);
    background: var(--error-background-color);
  }
  .error .body { color: var(--error-foreground-color) }
  .error i { color: var(--error-foreground-color) }

`;const Zt=new class{constructor(){this.stylesheets=[]}css(t){-1===this.stylesheets.indexOf(t)&&this.stylesheets.push(t)}get html(){return Ut((()=>this.stylesheets),(()=>G`<link href="${t=>t}" rel="stylesheet">`))}clear(){this.stylesheets=[]}};document.querySelectorAll("head link[dependency]").forEach((t=>{if("stylesheet"===t.getAttribute("rel")){const s=t.getAttribute("href");s&&Zt.css(s)}}));const Jt=G`
  ${Zt.html}

  <div class="container ${t=>t.theme} flex-fill flex-row middle">

    ${Ht((t=>!!t.theme&&"neutral"!==t.theme),G`
    <div part="icon" class="icon flex">
      ${Ht((t=>"info"===t.theme),G`<i class="fa-solid fa-circle-info"></i>`)}
      ${Ht((t=>"success"===t.theme),G`<i class="fa-solid fa-circle-check"></i>`)}
      ${Ht((t=>"warning"===t.theme),G`<i class="fa-solid fa-triangle-exclamation"></i>`)}
      ${Ht((t=>"error"===t.theme),G`<i class="fa-solid fa-circle-exclamation"></i>`)}
    </div>
    `)}

    <div class="body flex-fill flex-row middle">
      <slot></slot>
    </div>

    ${Ht((t=>t.escape),G`
      <button class="neutral" @click="${t=>t.handleEscape()}">
        <i class="fa-solid fa-x"></i>
      </button>
    `)}

  </div>

`,Kt="\n\n  .border { \n    border: var(--default-border-width) solid var(--default-border-color);\n    border-radius: var(--border-radius-md);\n  }\n  \n  .shadow {\n    box-shadow: var(--shadow-md);\n  }\n  \n  .flex-fill { flex: 1 1 auto }\n  .flex { display: flex }\n  \n  .flex-row { display: flex; flex-direction: row }\n  .flex-row.top { align-items: flex-start }\n  .flex-row.middle { align-items: center }\n  .flex-row.bottom { align-items: flex-end }\n  .flex-row.left { justify-content: flex-start }\n  .flex-row.center { justify-content: center }\n  .flex-row.right { justify-content: flex-end }\n  \n  .flex-col { display: flex; flex-direction: column }\n  .flex-col.top { justify-content: flex-start }\n  .flex-col.middle { justify-content: center }\n  .flex-col.bottom { justify-content: flex-end }\n  .flex-col.left { align-items: flex-start }\n  .flex-col.center { align-items: center }\n  .flex-col.right { align-items: flex-end }\n\n",Qt="\n\n  fast-dialog::part(control) { \n    display: flex;\n    width: auto;\n    height: auto;\n    border: none;\n    box-shadow: none;\n    background: none;\n  }\n\n",ts="\n\n  h1 { font-size: var(--h1-font-size); line-height: var(--h1-line-height); margin: var(--h1-margin); }\n  h2 { font-size: var(--h2-font-size); line-height: var(--h2-line-height); margin: var(--h2-margin); }\n  h3 { font-size: var(--h3-font-size); line-height: var(--h3-line-height); margin: var(--h3-margin); }\n  h4 { font-size: var(--h4-font-size); line-height: var(--h4-line-height); margin: var(--h4-margin); }\n  h5 { font-size: var(--h5-font-size); line-height: var(--h5-line-height); margin: var(--h5-margin); }\n  h6 { font-size: var(--h6-font-size); line-height: var(--h6-line-height); margin: var(--h6-margin); }\n  sub { font-size: var(--sub-font-size); line-height: var(--sub-line-height); }\n\n  button {\n    background-color: var(--button-background-color);\n    color: var(--button-foreground-color);\n    padding: var(--button-padding);\n    border-radius: var(--button-border-radius);\n    border-color: var(--button-border-color);\n    border: 0;\n    cursor: pointer;\n  }\n  button:active {\n    transform: translateY(1px);\n  }\n  button:hover {\n    background-color: var(--button-hover-background-color);\n  }\n  button:disabled {\n    transform: none !important;\n    background-color: var(--button-disabled-background-color) !important;\n    color: var(--button-disabled-foreground-color) !important;\n    cursor: not-allowed;\n  }\n\n  button.neutral { \n    background-color: var(--button-neutral-background-color);\n    color: var(--button-neutral-foreground-color);\n  }\n  button.neutral:hover {\n    background-color: var(--button-neutral-hover-background-color);\n  }\n\n  button.primary { \n    background-color: var(--button-primary-background-color);\n    color: var(--button-primary-color);\n  }\n  button.primary:hover {\n    background-color: var(--button-primary-hover-background-color);\n  }\n\n  button.secondary { \n    background-color: var(--button-secondary-background-color);\n    color: var(--button-secondary-color);\n  }\n  button.secondary:hover {\n    background-color: var(--button-secondary-hover-background-color);\n  }\n\n  button.tertiary { \n    background-color: var(--color-tertiary-50);\n    color: var(--color-tertiary-100);\n  }\n  button.tertiary:hover {\n    background-color: var(--color-tertiary-60);\n  }\n\n",ss=document.createElement("style");ss.setAttribute("mo-layout",""),ss.innerHTML=`\n\n  body {\n    color: var(--default-foreground);\n    font-size: var(--default-font-size);\n    line-height: var(--default-line-height);\n    font-family: var(--default-font-family);\n  }\n\n  :root [fullscreen] { \n    --workspace-max-width: 100vw;\n  }\n\n  :root [center] { \n    --workspace-align-margin: 0 auto; \n  }\n\n  ${Kt}\n  ${Qt}\n  ${ts}\n\n`,document.head.append(ss);const es=yt`
  ${e.styles}
  ${Kt}
  ${Qt}
  ${ts}
`;var is=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let os=class extends gt{constructor(){super(...arguments),this.theme="neutral",this.escape=!1}handleEscape(){const t=new CustomEvent("close",{bubbles:!0});this.dispatchEvent(t)}};is([at],os.prototype,"theme",void 0),is([at({mode:"boolean"})],os.prototype,"escape",void 0),os=is([xt({name:"mo-alert",template:Jt,styles:[es,Xt]})],os);const ns=yt`

  :host { 
    display: flex;
    flex-direction: column;
    border: var(--default-border-width) solid var(--default-border-color); 
    border-radius: var(--border-width-md);
    padding: var(--padding-xs);
    margin: var(--margin-xs);
    overflow: hidden;
  }

  [part="header"] {
    background: var(--color-primary-90);
    padding: var(--padding-md) var(--padding-md) var(--padding-md) var(--padding-lg);
    border-radius: var(--border-radius-sm);
    margin-top: var(--margin-2xs);
    color: var(--color-primary-10);
  }

  [part="header"] .icon { 
    margin: var(--margin-xs);
  }

  [part="header"] .controls { 
    margin-left: var(--margin-2xs);
  }

  [part="content"] { 
    padding: var(--padding-sm) 0;
  }

  [part="actions"] { 
    border-top: var(--border-width-xs) solid var(--color-neutral-80);
    padding: var(--padding-xs) 0 0;
  }

  [part="actions"] ::slotted(*) { 
    margin-left: var(--margin-2xs);
  }

  [part="image"] { 
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: calc(-1 * var(--margin-2xs)) calc(-1 * var(--margin-2xs)) 0;
  }

  [part="controls"] { 
    margin: calc(-1 * var(--margin-xs)) calc(-1 * var(--margin-xs)) calc(-1 * var(--margin-xs)) 0;
  }

`,rs=G`

  <div part="image" ${Bt("imageRef")} class="flex" style="height: ${t=>t["image-height"]||0}">
    <slot name="image" ${Gt("image")}></slot>
  </div>

  <div part="header" class="flex-row middle" ?hidden="${t=>!t.icon?.length&&!t.header?.length&&!t.sub?.length}">
    <div class="icon flex" ?hidden="${t=>!t.icon?.length}">
      <slot name="icon" ${Gt("icon")}></slot>
    </div>
    <div class="flex-col">
      <slot name="header" ${Gt("header")}></slot>
      <slot name="sub" ${Gt("sub")}></slot>
    </div>
    <div class="flex-fill"></div>
    <div part="controls" class="controls flex" ?hidden="${t=>!t.controls?.length}">
      <slot name="controls" ${Gt("controls")}></slot>
    </div>
  </div>

  <div part="content" class="flex-fill flex-col" ?hidden="${t=>!t.hasContent}">
    <slot ${Gt("content")}></slot>
  </div>

  <div part="actions" class="flex-row middle right" ?hidden="${t=>!t.actions?.length}">
    <slot name="actions" ${Gt("actions")}></slot>
  </div>

`;var ls=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let as=class extends gt{constructor(){super(...arguments),this.icon=[],this.header=[],this.sub=[],this.controls=[],this.actions=[],this.content=[]}"image-urlChanged"(){this.imageRef&&(this["image-url"]?this.imageRef.style.backgroundImage=`url(${this["image-url"]})`:this.imageRef.style.backgroundImage="")}get hasContent(){for(const t of this.content){if(3!==t.nodeType)return!0;if(t.textContent.trim())return!0}return!1}connectedCallback(){super.connectedCallback(),this["image-urlChanged"]()}};ls([at],as.prototype,"image-url",void 0),ls([at],as.prototype,"image-height",void 0),ls([g],as.prototype,"icon",void 0),ls([g],as.prototype,"header",void 0),ls([g],as.prototype,"sub",void 0),ls([g],as.prototype,"controls",void 0),ls([g],as.prototype,"actions",void 0),ls([g],as.prototype,"content",void 0),as=ls([xt({name:"mo-card",template:rs,styles:[es,ns]})],as);const hs=yt`
  :host { 
    display: block;
    overflow: hidden;
  }
  div { 
    position: absolute;
  }
`,cs=G`
  <div ${Bt("containerRef")} class="flex-row middle center">
    <canvas part="canvas" ${Bt("canvasRef")}></canvas>
  </div>
`;const ds=new class{constructor(){this.status={}}async import(t,s=!1){const e=this.status[t];if(e?.imported)return e.lib;if(e?.importing)return void await new Promise((t=>e.pending.push((()=>t(e.lib)))));const i={imported:!1,importing:!0,pending:[],lib:void 0};this.status[t]=i,s?await this.injectScript(t):i.lib=await import(t),i.imported=!0;for(const t of i.pending)t(i.lib);return i.lib}injectScript(t){return new Promise(((s,e)=>{const i=document.createElement("script");i.src=t,i.addEventListener("load",s),i.addEventListener("error",(t=>e(t.error))),document.head.appendChild(i)}))}};var us,fs=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let vs=us=class extends gt{constructor(){super(...arguments),this.type="bar",this.legend=!1,this["x-label"]=!0,this["y-label"]=!0,this.fit=!0}typeChanged(){this.chart&&(this.chart.type=this.type)}get data(){return this.chart.data}get first(){return this.chart.data.datasets[0].data}set first(t){this.chart.data.datasets[0].data=t}get options(){return this.chart.options}async connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver((()=>this.handleResize())),this.resizeObserver.observe(this),this.handleResize(),await ds.import(us.script,!0),this.chart=new window.Chart(this.canvasRef,{type:this.type||"bar",data:{labels:["Red","Blue","Yellow","Green","Purple","Orange"],datasets:[{label:"# of Votes",data:[12,19,3,5,2,3],borderWidth:1}]},options:{plugins:{legend:{display:this.legend}},scales:{x:{display:this["x-label"]},y:{display:this["y-label"],beginAtZero:!0}}}})}disconnectedCallback(){super.disconnectedCallback()}handleResize(){this.fit&&(this.containerRef.style.width=`${this.offsetWidth}px`,this.containerRef.style.height=`${this.offsetHeight}px`)}};vs.script="https://cdn.jsdelivr.net/npm/chart.js",fs([at],vs.prototype,"type",void 0),fs([at({mode:"boolean"})],vs.prototype,"legend",void 0),fs([at({mode:"boolean"})],vs.prototype,"x-label",void 0),fs([at({mode:"boolean"})],vs.prototype,"y-label",void 0),fs([at({mode:"boolean"})],vs.prototype,"fit",void 0),vs=us=fs([xt({name:"mo-chart",template:cs,styles:[es,hs]})],vs);const ms=yt`
  :host { 
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-x: hidden;
  }
`,bs=G`
  <slot ${Gt("nodes")}></slot>
`;var ps=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let gs=class extends gt{nodesChanged(){this.handleResize?.()}get activeColumns(){const t=`columns-${e.size}`;return this.hasAttribute(t)?this[t]:this.columns||1}get activeRowHeight(){const t=`row-height-${e.size}`;return this.hasAttribute(t)?this[t]:this["row-height"]?this["row-height"]:"auto"}constructor(){super(),this.columns=1,this.nodes=[],this.handleResize=()=>{for(const t of this.nodes)1===t.nodeType&&this.setNode(t)},this.handleResize.bind(this)}connectedCallback(){super.connectedCallback(),this.handleResize(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.handleResize)}setNode(t){let s=parseInt(t.getAttribute("columns")||"1");s>this.activeColumns&&(s=this.activeColumns);const e=s/this.activeColumns*100;t.style.boxSizing="border-box",t.style.flex=`0 0 ${e}%`,t.style.height=this.activeRowHeight,t.style.overflow="hidden"}};ps([at],gs.prototype,"columns",void 0),ps([at],gs.prototype,"columns-xs",void 0),ps([at],gs.prototype,"columns-sm",void 0),ps([at],gs.prototype,"columns-md",void 0),ps([at],gs.prototype,"columns-lg",void 0),ps([at],gs.prototype,"columns-xl",void 0),ps([at],gs.prototype,"row-height",void 0),ps([at],gs.prototype,"row-height-xs",void 0),ps([at],gs.prototype,"row-height-sm",void 0),ps([at],gs.prototype,"row-height-md",void 0),ps([at],gs.prototype,"row-height-lg",void 0),ps([at],gs.prototype,"row-height-xl",void 0),ps([g],gs.prototype,"nodes",void 0),gs=ps([xt({name:"mo-columns",template:bs,styles:[es,ms]})],gs);const xs=yt`

  :host { 
    display: block;
    position: relative;
    overflow: hidden;
    transition-property: width, height;
    transition-duration: 0.25s;
    transition-timing-function: ease-out;
    box-sizing: border-box;
  }

  :host([inherit-width]) {
    width: 100% !important;
  }
  :host([inherit-height]) {
    height: 100% !important;
  }

  .expandable { 
    position: absolute;
    box-sizing: border-box;
  }

  :host([inherit-width]) .expandable { 
    width: 100%;
  }

  :host([inherit-height]) .expandable { 
    height: 100%;
  }

  .content { 
    position: relative;
    box-sizing: border-box;
  }

`,ws=G`
  <div part="expandable" ${Bt("expandableRef")} class="expandable">
    <div ${Bt("contentRef")} class="content">
      <slot></slot>
    </div>
  </div>
`,ys=new class{async waitForSize(t,s=10){t.offsetWidth||t.offsetHeight||await new Promise((e=>{let i;const o=new ResizeObserver((()=>{i&&clearTimeout(i),i=setTimeout((()=>{e(void 0),o.disconnect()}),s)}));o.observe(t)}))}async once(t,s,e){return new Promise((async i=>{const o=()=>{t.removeEventListener(s,o),i(void 0)};t.addEventListener(s,o),await(e?.())}))}async transition(t,s,i,o=10){if(s)for(const[e,i]of Object.entries(s))t.style[e]=i;await e.wait(o),i&&await ys.once(t,"transitionend",(async()=>{for(const[s,e]of Object.entries(i))t.style[s]=e}))}};var ks=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let $s=class extends gt{constructor(){super(...arguments),this.orientation="vertical",this.opened=!1,this["inherit-width"]=!1,this["inherit-height"]=!1,this.handleTransitionEnd=()=>{this.opened||this.setAttribute("hidden","")}}openedChanged(){if(!this.expandableRef)return;this.opened?this.open():this.close();const t=new CustomEvent("change",{bubbles:!0});this.dispatchEvent(t)}get isContentRendered(){return!!this.contentRef.offsetWidth||!!this.contentRef.offsetHeight}async connectedCallback(){super.connectedCallback?.(),await ys.waitForSize(this.contentRef),this.setDefaultDimensions(),this.openedChanged(),this.handleTransitionEnd.bind(this),this.addEventListener("transitionend",this.handleTransitionEnd),this.resizeObserver=new ResizeObserver((()=>{this.opened&&this.sync()})),this.resizeObserver.observe(this.expandableRef)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("transitionend",this.handleTransitionEnd),this.resizeObserver?.disconnect()}setDefaultDimensions(){"horizontal"===this.orientation&&(this.style.height=`${this.expandableRef.offsetHeight}px`),"vertical"===this.orientation&&(this.style.width=`${this.expandableRef.offsetWidth}px`)}async open(){this.opened?(this.removeAttribute("hidden"),this.sync()):this.opened=!0}sync(){switch(this.orientation){case"vertical":this.style.height=`${this.expandableRef.offsetHeight}px`;break;case"horizontal":this.style.width=`${this.expandableRef.offsetWidth}px`}}close(){if(this.opened)this.opened=!1;else switch(this.contentRef.style.position="relative",this.orientation){case"vertical":this.style.height="0";break;case"horizontal":this.style.width="0"}}toggle(){this.opened=!this.opened}};ks([at],$s.prototype,"orientation",void 0),ks([at({mode:"boolean"})],$s.prototype,"opened",void 0),ks([at({mode:"boolean"})],$s.prototype,"inherit-width",void 0),ks([at({mode:"boolean"})],$s.prototype,"inherit-height",void 0),$s=ks([xt({name:"mo-expandable",template:ws,styles:[es,xs]})],$s);const Cs=yt`
  :host { 
    pointer-events: none;
  }
  .fixed{ 
    position: fixed;
    left: inherit;
    right: inherit;
    display: flex;
    box-sizing: border-box;
    pointer-events: all;
  }
`,zs=G`
  <div class="fixed" ${Bt("fixedRef")}>
    <div class="container flex-col" ${Bt("containerRef")}>
      <slot style="pointer-events: all"></slot>
    </div>
  </div>
`,Os=yt`

  :host { 
    overflow-x: hidden;
    max-width: 100vw;
  }

  .foreground {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }

  .backdrop { 
    display: flex;
    position: relative;
  }
  
  fast-dialog.modals { 
    z-index: 4;
    position: relative;
  }

  .snackbars { 
    z-index: 5;
    bottom: var(--size-lg);
    align-items: center;
  }

  .alerts {
    z-index: 6;
    top: var(--size-lg);
    align-items: flex-end;
  }

  .snackbars,
  .alerts {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .snackbars > *,
  .alerts > * { 
    pointer-events: all;
  }

  .header.sticky {
    align-self: flex-start;
    top: 0;
  }

  .footer.sticky {
    align-self: flex-end;
    bottom: 0;
  }

  .header.sticky,
  .footer.sticky { 
    width: 100%;
    overflow-y: auto;
    position: sticky;
    z-index: 3;
  }

  .menu,
  .aside { 
    pointer-events: none;
  }

  .menu slot,
  .aside slot {
    pointer-events: all;
  }

  .backdrop,
  [overlay].aside,
  [overlay].menu 
  { 
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  [overlay].aside,
  [overlay].menu {
    z-index: 4;
    display: none;
  }

  [overlay].aside.visible,
  [overlay].menu.visible {
    display: flex;
  }

  fast-dialog > *:first-child { 
    flex: 1 1 auto;
    border: 0;
    margin: 0;
  }
  
  .backdrop ::slotted(*),
  .banner ::slotted(:first-child),
  .header ::slotted(:first-child),
  .main-header ::slotted(:first-child),
  .menu ::slotted(*),
  .aside ::slotted(*),
  .main-footer ::slotted(:first-child),
  .footer ::slotted(:first-child) {
    flex: 1 1;
  }

  .aside ::slotted(*) {
    right: 0;
  }

`,js=G`
  ${Zt.html}
  
  <div part="backdrop" class="backdrop">
    <slot name="backdrop"></slot>
  </div>

  <div part="foreground" class="foreground" ${Bt("foregroundRef")}>

    <div part="banner" class="banner" ${Bt("bannerRef")}>
      <slot name="banner"></slot>
    </div>

    <div part="header" class="header flex" ${Bt("headerRef")}>
      <slot name="header"></slot>
    </div>

    <mo-workspace class="flex-fill flex-row">
      <div part="menu" class="menu flex" ${Bt("menuRef")}>
        <div ${Bt("menuContentStartRef")} tabindex="-1"></div>
        <slot name="menu"></slot>
        <div ${Bt("menuContentEndRef")} 
          class="focus-loop" tabindex="0" 
          ?hidden-xs="${t=>!t["menu-overlay-xs"]}"
          ?hidden-sm="${t=>!t["menu-overlay-sm"]}"
          ?hidden-md="${t=>!t["menu-overlay-md"]}"
          ?hidden-lg="${t=>!t["menu-overlay-lg"]}"
          ?hidden-xl="${t=>!t["menu-overlay-xl"]}"
          @focus="${t=>t.menuContentStartRef.focus()}"></div>
      </div>
      <div class="flex-fill flex-col" style="overflow-x: hidden">
        <div part="main-header" class="main-header">
          <slot name="main-header"></slot>
        </div>
        <div ${Bt("contentRef")} tabindex="-1"></div>
        <div part="content" class="layout-content flex-fill flex-col">
          <slot></slot>
        </div>
        <div part="main-footer" class="main-footer">
          <slot name="main-footer"></slot>
        </div>
      </div>
      <div part="aside" class="aside flex" ${Bt("asideRef")}>
        <div ${Bt("asideContentStartRef")} tabindex="-1"></div>
        <slot name="aside"></slot>
        <div ${Bt("asideContentEndRef")} 
          class="focus-loop" tabindex="0" 
          ?hidden-xs="${t=>!t["aside-overlay-xs"]}"
          ?hidden-sm="${t=>!t["aside-overlay-sm"]}"
          ?hidden-md="${t=>!t["aside-overlay-md"]}"
          ?hidden-lg="${t=>!t["aside-overlay-lg"]}"
          ?hidden-xl="${t=>!t["aside-overlay-xl"]}"
          @focus="${t=>t.asideContentStartRef.focus()}"></div>
      </div>
    </mo-workspace>

    <div part="footer" class="footer flex" ${Bt("footerRef")}>
      <slot name="footer"></slot>
    </div>

  </div>

  <fast-dialog part="modals" class="modals" ${Bt("modalRef")} modal hidden>
  </fast-dialog>

  <mo-workspace part="alerts" class="alerts flex-col" ${Bt("alertRef")}>
  </mo-workspace>

  <mo-workspace part="snackbars" class="snackbars flex-col" ${Bt("snackbarRef")}>
  </mo-workspace>

`;class Rs{constructor(t){this.modalRef=t,this.ref=new Map}async open(t,s){await this.close(),t.removeAttribute("hidden"),this.modalRef.replaceChildren(t),this.modalRef.show(),!1!==s?.animate&&await this.animateShow(t),this.handleCloseEvent(t);const i={options:s,listeners:[],unlock:e.lockScroll()};return this.ref.set(t,i),new Promise((t=>{i.listeners.push((s=>t(s)))}))}handleCloseEvent(t){const s=async e=>{t.removeEventListener(Rs.closeEventName,s),await this.closeModal(t,e?.detail)};t.addEventListener(Rs.closeEventName,s)}async animateShow(t){t&&await ys.transition(t,{transition:"none",opacity:"0",position:"fixed",transform:`translate(-50%, calc(-50% + ${window.innerHeight}px)`,top:"50%",left:"50%"},{opacity:"1",transition:"transform 0.25s ease-out",transform:"translate(-50%, -50%)"})}async animateHide(t){t&&(await ys.transition(t,void 0,{transform:`translate(-50%, calc(-50% + ${window.innerHeight}px)`,transition:"transform 0.25s ease-in"}),t.style.opacity="0")}async close(){for(const t of this.ref.keys())await this.closeModal(t,{escape:!0})}async closeModal(t,s){if(!t)return;const e=this.ref.get(t);!1!==e?.options?.animate&&await this.animateHide(t),t.setAttribute("hidden",""),this.modalRef.hide(),e?.unlock();for(const t of e?.listeners||[])t(s);this.ref.delete(t)}}Rs.closeEventName="close";class Ss{get visible(){return this.panelRef.classList.contains("visible")}constructor(t){this.panelRef=t,this.animate=!0,this.animateFrom="left"}async open(){this.panelRef.classList.contains("visible")||(await(document.querySelector("mo-layout")?.close?.()),e.addClass(this.panelRef,"visible"),this.releaseScroll=e.lockScroll(),this.animate&&await this.animateShow(this.panelRef))}async close(){this.panelRef.classList.contains("visible")&&(this.animate&&await this.animateHide(this.panelRef),e.removeClass(this.panelRef,"visible"),this.releaseScroll?.())}toggle(){this.visible?this.close():this.open()}async animateShow(t){t&&await ys.transition(t,{transition:"none",opacity:"0",transform:`translate(${"left"===this.animateFrom?"-":""}150%, 0)`},{opacity:"1",transition:"transform 0.25s ease-out",transform:"translate(0, 0)"})}async animateHide(t){t&&(await ys.transition(t,void 0,{transform:`translate(${"left"===this.animateFrom?"-":""}150%, 0)`,transition:"transform 0.25s ease-in"}),t.style.opacity="0")}}class Ts{open(t,s,i){let o;return(i=i||{}).actions=i.actions||[{key:"close",label:"Close"}],new Promise((n=>{this.dialogRef={close(t){this.modalRef.hide(),this.modalRef.remove(),o(),n(t)}},G`
        <fast-dialog ${Bt("modalRef")} modal hidden style="position:relative;z-index:9999;display:flex;">
          <div tabindex="-1" ${Bt("modalRefStart")}></div>
          <mo-card part="card" class="no-border no-margin" style="flex: 1 1; min-width: var(--panel-width-sm); min-height: var(--panel-height-xs); background: var(--color-neutral-100)">
            
            ${s?G`<h2 slot="header">${s}</h2>`:""}
            ${s&&i?.escape?G`
              <button class="neutral" slot="controls" @click=${t=>t.close({escape:!0})}>
                <i class="fa-solid fa-x"></i>
              </button>
            `:""}

            <div style="display:flex;flex-direction:row">
              ${i?.theme?G`
              <div style="display:flex;align-items:center;justify-content:center;margin: var(--margin-sm) var(--margin-sm) var(--margin-sm) 0;">
                ${"info"===i?.theme?G`<i class="fa-solid fa-circle-info" style="color: var(--color-info-50);font-size:var(--font-size-3xl)"></i>`:""}
                ${"success"===i?.theme?G`<i class="fa-solid fa-circle-check" style="color: var(--color-success-50);font-size:var(--font-size-3xl)"></i>`:""}
                ${"warning"===i?.theme?G`<i class="fa-solid fa-triangle-exclamation" style="color: var(--color-warning-50);font-size:var(--font-size-3xl)"></i>`:""}
                ${"error"===i?.theme?G`<i class="fa-solid fa-circle-exclamation" style="color: var(--color-error-50);font-size:var(--font-size-3xl)"></i>`:""}
              </div>`:""}
              <div style="flex: 1 1;display:flex;align-items:center;">
                ${t}
              </div>
            </div>

            ${i?.actions?.length?Ut((()=>i?.actions||[]),(t=>G`
                <button slot="actions" 
                  @click="${s=>t.close({key:s.key||s})}" 
                  class="${t=>t.class}">
                  ${t=>t.label||t.key||t}
                </button>`)):""}
          
          </mo-card>
        </fast-dialog>
      `.render(this.dialogRef,document.body),this.dialogRef.modalRef.show(),o=e.lockScroll(),setTimeout((()=>{this.dialogRef.modalRefStart.focus()}),20)}))}close(t){this.dialogRef?.close(t)}}Ts.closeEventName="close-dialog";class Es{constructor(t){this.panelRef=t}open(t,s="neutral",i=1e4){const o={};G`
      <mo-expandable ${Bt("expandableRef")} style="margin: var(--margin-2xs);">
        <mo-alert ${Bt("alertRef")} 
          class="shadow"
          theme="${s}" 
          escape 
          @close=${t=>this.close(t.expandableRef)}
          style="margin:0; ${e.isSize("xs")?"width: 90vw;":"width: var(--panel-width-lg);"}">
          ${t}
        </mo-alert>
      </mo-expandable>
    `.render(o,this.panelRef),setTimeout((()=>o.expandableRef.open()),50),setTimeout((()=>{o.expandableRef.parentNode&&this.close(o.expandableRef)}),i)}close(t){t.close(),setTimeout((()=>t.remove()),1e3)}}class As{constructor(t){this.panelRef=t}async open(t,s){return void 0===(s=s||{}).time&&(s.time=1e4),void 0===s.theme&&(s.theme="neutral"),void 0===s.escape&&(s.escape=!0),new Promise((i=>{const o={close:t=>{this.close(o.expandableRef),i(t)}};G`
      <mo-expandable class="snackbar-item" ${Bt("expandableRef")} style="margin: var(--margin-2xs);">
        <mo-alert ${Bt("alertRef")} 
          theme="${s?.theme||""}" 
          escape="${!!s?.escape}" 
          @close=${t=>this.close(t.expandableRef)} 
          style="margin:0; ${e.isSize("xs")?"width: 90vw;":"width: var(--panel-width-lg);"}">
          
          ${t}

          ${s?.actions?.length?Ut((()=>s?.actions||[]),(t=>G`
              <button
                @click="${s=>t.close({key:s.key||s})}" 
                class="${t=>t.class}">
                ${t=>t.label||t.key||t}
              </button>`)):""}

        </mo-alert>
      </mo-expandable>
      `.render(o,this.panelRef),setTimeout((()=>o.expandableRef.open()),20),setTimeout((()=>{o.expandableRef.parentNode&&this.close(o.expandableRef)}),s?.time||1e3)}))}close(t){t.close(),setTimeout((()=>t.remove()),1e3)}}class Ms{constructor(){this.cache=[]}set(t,s){const i=!s;s=s||document.body;const o={};return G`
      <mo-lock ${Bt("lockRef")} message="${t||""}"></mo-lock>
    `.render(o,s),this.cache.push(o.lockRef),s.$lock={position:s.style.position,overflow:s.style.overflow,zIndex:s.getAttribute("zIndex")||"",releaseScroll:e.lockScroll(s)},i&&(o.lockRef.style.position="fixed",o.lockRef.style.zIndex=9999),s.style.position="relative",s.style.overflow="hidden",s.setAttribute("z-index","-1"),s.setAttribute("aria-hidden","true"),s.setAttribute("inert",""),o.lockRef}remove(t){if(!t){for(;this.cache.length;){const t=this.cache.shift();this.remove(t)}return}const s=t.parentNode;t.remove();const e=this.cache.findIndex((s=>s===t));e>-1&&this.cache.splice(e,1),s&&(s.$lock.releaseScroll(),s.style.position=s.$lock.position,s.style.overflow=s.$lock.overflow,s.$lock.zIndex?s.setAttribute("z-index",s.$lock.zIndex):s.removeAttribute("z-index"),s.removeAttribute("aria-hidden"),s.removeAttribute("inert"))}}const Fs=new Ms;var Bs=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let Ps,Is=class extends gt{constructor(){super(...arguments),this.center=!1,this.fullscreen=!1,this["sticky-header"]=!1,this["sticky-footer"]=!1,this["menu-overlay-xs"]=!1,this["menu-overlay-sm"]=!1,this["menu-overlay-md"]=!1,this["menu-overlay-lg"]=!1,this["menu-overlay-xl"]=!1,this["aside-overlay-xs"]=!1,this["aside-overlay-sm"]=!1,this["aside-overlay-md"]=!1,this["aside-overlay-lg"]=!1,this["aside-overlay-xl"]=!1,this.handleResize=()=>{for(const t of e.sizes)e.isSize(t)&&(e.toggleAttribute(this.menuRef,"overlay",this[`menu-overlay-${t}`]),e.toggleAttribute(this.asideRef,"overlay",this[`aside-overlay-${t}`]))}}"sticky-headerChanged"(){this.headerRef&&(this["sticky-header"]?e.addClass(this.headerRef,"sticky"):e.removeClass(this.headerRef,"sticky"))}"sticky-footerChanged"(){this.footerRef&&(this["sticky-footer"]?e.addClass(this.footerRef,"sticky"):e.removeClass(this.footerRef,"sticky"))}get router(){return this.querySelector("mo-router")}static get styles(){return es}connectedCallback(){super.connectedCallback?.(),Ps||(Ps=this),this.modal=new Rs(this.modalRef),this.aside=new Ss(this.asideRef),this.aside.animateFrom="right",this.menu=new Ss(this.menuRef),this.dialog=new Ts,this.alert=new Es(this.alertRef),this.snackbar=new As(this.snackbarRef),this.lock=Fs,this["sticky-headerChanged"](),this["sticky-footerChanged"](),e.sync(this.foregroundRef),this.handleResize.bind(this),this.handleResize(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){super.disconnectedCallback?.(),e.unsync(this.foregroundRef),window.removeEventListener("resize",this.handleResize)}async close(){await this.modal.close(),await this.menu.close(),await this.aside.close()}};Bs([at({mode:"boolean"})],Is.prototype,"center",void 0),Bs([at({mode:"boolean"})],Is.prototype,"fullscreen",void 0),Bs([at({mode:"boolean"})],Is.prototype,"sticky-header",void 0),Bs([at({mode:"boolean"})],Is.prototype,"sticky-footer",void 0),Bs([at({mode:"boolean"})],Is.prototype,"menu-overlay-xs",void 0),Bs([at({mode:"boolean"})],Is.prototype,"menu-overlay-sm",void 0),Bs([at({mode:"boolean"})],Is.prototype,"menu-overlay-md",void 0),Bs([at({mode:"boolean"})],Is.prototype,"menu-overlay-lg",void 0),Bs([at({mode:"boolean"})],Is.prototype,"menu-overlay-xl",void 0),Bs([at({mode:"boolean"})],Is.prototype,"aside-overlay-xs",void 0),Bs([at({mode:"boolean"})],Is.prototype,"aside-overlay-sm",void 0),Bs([at({mode:"boolean"})],Is.prototype,"aside-overlay-md",void 0),Bs([at({mode:"boolean"})],Is.prototype,"aside-overlay-lg",void 0),Bs([at({mode:"boolean"})],Is.prototype,"aside-overlay-xl",void 0),Is=Bs([xt({name:"mo-layout",template:js,styles:[es,Os]})],Is);var Vs=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let Hs=class extends gt{constructor(){super(...arguments),this.handleViewChange=()=>{const t=this.getTop();this.fixedRef.style.top=`${t}px`,this.fixedRef.style.height=this.getBottom()-t+"px"},this.handleChildChange=()=>{this.containerRef.offsetWidth&&(this.style.width=`${this.containerRef.offsetWidth}px`,this.fixedRef.style.width=`${this.containerRef.offsetWidth}px`)}}connectedCallback(){super.connectedCallback?.(),window.addEventListener("scroll",this.handleViewChange),this.resizeObserver=new ResizeObserver((()=>this.handleViewChange())),this.resizeObserver.observe(document.body),this.resizeObserver.observe(Ps.bannerRef),this.resizeObserver.observe(Ps.headerRef),this.resizeObserver.observe(Ps.footerRef),this.resizeObserver.observe(this),this.containerResizeObserver=new ResizeObserver((()=>this.handleChildChange())),this.containerResizeObserver.observe(this.containerRef),setTimeout((()=>{this.handleViewChange(),this.handleChildChange()}))}disconnectedCallback(){super.disconnectedCallback?.(),window.removeEventListener("scroll",this.handleViewChange),this.resizeObserver.disconnect()}getTop(){const t=Ps.bannerRef.getBoundingClientRect().bottom,s=Ps.headerRef.getBoundingClientRect().bottom;return Math.max(0,t,s)}getBottom(){const t=Ps.footerRef.getBoundingClientRect().top;return Math.min(window.innerHeight,t)}};Hs=Vs([xt({name:"mo-fixed-content",template:zs,styles:[es,Cs]})],Hs);const Ls=yt`

  :host {
    flex: 1 1;
    background: var(--footer-background-color);
    color: var(--footer-foreground-color);
  }

  mo-workspace {
    justify-content: space-between;
    background: var(--footer-background-color);
    padding: var(--padding-lg);
  }

  .app-name { 
    color: var(--footer-foreground-color);
    font-size: var(--font-size-3xl);
  }

  ::slotted(*) { 
    color: var(--footer-foreground-color);
  }

`,Ns=G`
  <mo-workspace class="flex-row middle">
    <slot></slot>
  </mo-workspace>
`;var Ws=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let Ds=class extends gt{};Ds=Ws([xt({name:"mo-footer",template:Ns,styles:[es,Ls]})],Ds);const qs=yt`
  :host { 
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  [part="actions"] {
    padding: var(--padding-md) 0 var(--padding-xs);
    margin-top: var(--margin-sm);
    border-top: var(--default-border-width) solid var(--default-border-color);
  }
  [part="actions"] ::slotted(*) {
    margin-left: var(--margin-2xs);
  }
`,Us=G`
  <div class="flex-fill flex-col">
    <slot></slot>
  </div>
  <div class="flex-row right" part="actions" ?hidden="${t=>!t.actionNodes?.length}">
    <slot name="actions" ${Gt("actionNodes")}></slot>
  </div>
`;var Ys=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let _s=class extends gt{constructor(){super(...arguments),this.context={},this.actionNodes=[]}get validators(){return this.querySelectorAll("mo-form-validator")}get controls(){return this.querySelectorAll("[form-field],[form-check-field]")}get valid(){const t=this.validators;for(const s of t){if(!s.valid)return!1}return!0}get value(){const t=this.controls,s={};for(const e of t){let t=e.getAttribute("form-field");t&&(s[t]=e.value),t=e.getAttribute("form-check-field"),t&&(s[t]=e.checked)}return s}async cancel(){this.dispatchEvent(new CustomEvent("cancel"))}lock(){for(const t of this.controls)t.setAttribute("read-only","");for(const t of this.actionNodes)t.setAttribute?.("disabled","")}unlock(){for(const t of this.controls)t.removeAttribute("read-only");for(const t of this.actionNodes)t.removeAttribute?.("disabled")}focusOnFirstError(){for(const t of this.validators)if(!t.valid){const s=t.getAttribute("for"),e=this.querySelector(`[form-field="${s}"]`);return e?.focus?.(),void Ps.alert.open(`${e?.getAttribute("placeholder")}: ${t.innerHTML}`,"error")}}async submit(){if(this.lock(),this.submitted=!0,!this.valid)return this.focusOnFirstError(),void this.unlock();this.dispatchEvent(new CustomEvent("submit"))}};Ys([at({mode:"boolean"})],_s.prototype,"submitted",void 0),Ys([g],_s.prototype,"actionNodes",void 0),_s=Ys([xt({name:"mo-form",template:Us,styles:[es,qs]})],_s);const Gs=yt`
  :host { 
    display: flex;
    flex-direction: column;
    padding: var(--padding-md) var(--padding-md);
    box-sizing: border-box;
  }
  [screen-xs] :host { 
    width: 100%;
  }
  [part="note"] { 
    color: var(--color-neutral-60);
    font-size: var(--font-size-sm);
  }
  [part="error"] { 
    color: var(--color-error-30);
    font-size: var(--font-size-sm);
  }
  [part="input"] {
    display: flex;
  }
  [part="input"] ::slotted(*) {
    flex: 1 1 auto;
  }
  [part="label"] { 
    margin: var(--margin-2xs) 0;
  }
  [part="validators"] { 
    margin: var(--margin-xs) 0 0 0;
  }
`,Xs=G`
  <div class="flex-row">
    <div class="flex-col flex-fill">
      <div part="label">
        <slot name="label"></slot>
      </div>
      <div part="input">
        <slot></slot>
      </div>
      <div part="note">
        <slot name="note"></slot>
      </div>
      <div part="error">
        <slot name="error"></slot>
      </div>
    </div>
    <div part="control">
      <slot name="control"></slot>
    </div>
  </div>
  <div part="validators">
    <slot name="validators"></slot>
  </div>
`;var Zs=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let Js=class extends gt{};Js=Zs([xt({name:"mo-form-field",template:Xs,styles:[es,Gs]})],Js);const Ks=yt`
  :host { 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    margin-bottom: var(--margin-sm);
  }
  [part="header"] { 
    background: var(--color-neutral-90);
    padding: var(--padding-md);
    border-radius: var(--border-radius-sm);
    margin: 0 var(--padding-sm);
  }
`,Qs=G`
  <div part="header" ${Bt("headerRef")}>
    <slot name="header" ${Bt("headerSlot")}></slot>
  </div>
  <slot></slot>
  <div class="flex-fill"></div>
  <div part="footer" ${Bt("footerRef")}>
    <slot name="footer" ${Bt("footerSlot")}></slot>
  </div>
`;var te=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let se=class extends gt{get hasHeader(){return!!this.headerSlot?.assignedNodes()?.length}get hasFooter(){return!!this.footerSlot?.assignedNodes()?.length}connectedCallback(){super.connectedCallback(),e.toggleAttribute(this.headerRef,"hidden",!this.hasHeader),e.toggleAttribute(this.footerRef,"hidden",!this.hasFooter)}};se=te([xt({name:"mo-form-group",template:Qs,styles:[es,Ks]})],se);const ee=yt`
  :host { 
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: var(--padding-sm) var(--padding-md);
  }
  :host([status="success"]) {
    color: var(--color-success-30);
  }
  :host([status="error"]) {
    color: var(--color-error-30);
  }
  [part="icon"] { 
    margin-right: var(--margin-sm);
  }
  :host([loading]) [part="icon"] { 
    animation: icon-blinker 0.5s linear infinite;
  }
  @keyframes icon-blinker {
    50% { opacity: 0 }
  }
`,ie=G`
  ${Zt.html}
  <div part="icon">
    <i slot="icon" class="fa-solid fa-circle" ${Bt("iconRef")}></i>
  </div>
  <div part="message">
    <slot></slot>
  </div>
`;var oe=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let ne=class extends gt{constructor(){super(...arguments),this.connected=!1,this.requestIndex=0,this.delay=0,this.status="empty",this.loading=!1,this.handleSubmit=()=>{this.updateStyles()},this.handleKeyup=()=>{this.validate&&(this.dispatch(),this.keyDelayTimeoutId&&clearTimeout(this.keyDelayTimeoutId),this.keyDelayTimeoutId=setTimeout((()=>{clearTimeout(this.keyDelayTimeoutId),delete this.keyDelayTimeoutId,this.update()}),this.delay))},this.handleChange=()=>{this.validate&&this.value!==this.lastValueChecked&&(this.dispatch(),this.keyDelayTimeoutId&&(clearTimeout(this.keyDelayTimeoutId),delete this.keyDelayTimeoutId),this.update())}}statusChanged(){this.iconRef&&this.updateStyles()}requiredChanged(){this.required&&(this.validate=t=>!!t?.toString()?.trim().length)}patternChanged(){this.pattern&&(this.validate=t=>new RegExp(this.pattern).test(t))}minChanged(){this.setLengthRule()}maxChanged(){this.setLengthRule()}lesserChanged(){this.setValueRule()}greaterChanged(){this.setValueRule()}forChanged(){this.connected&&this.bind()}get value(){return this.targetRef?.value||""}get valid(){return!this.loading&&"success"===this.status}connectedCallback(){super.connectedCallback(),this.statusChanged(),this.bind(),this.handleSubmit.bind(this),this.addEventListener("submit",this.handleSubmit)}disconnectedCallback(){super.disconnectedCallback(),this.unbind(),this.removeEventListener("submit",this.handleSubmit)}bind(){if(this.unbind(),!this.for)return;let t=this.getForm(this);t||(console.warn("Form not found",this),t=this.parentElement||this),this.targetRef=t?.querySelector(`[form-field="${this.for}"]`),this.targetRef&&(this.targetRef.addEventListener("change",this.handleChange),this.targetRef.addEventListener("keyup",this.handleKeyup))}unbind(){this.targetRef&&(this.targetRef.removeEventListener("change",this.handleChange),this.targetRef.removeEventListener("keyup",this.handleKeyup))}getForm(t){if(t.parentElement)return"MO-FORM"===t.parentElement?.nodeName?t.parentElement:this.getForm(t.parentElement)}getFormField(t){if(t.parentElement)return"MO-FORM-FIELD"===t.parentElement?.nodeName?t.parentElement:this.getForm(t.parentElement)}dispatch(t="validate"){const s=this.getFormField(this);s&&(this.valid?s.setAttribute("valid",""):s.removeAttribute("valid")),this.dispatchEvent(new CustomEvent(t,{bubbles:!0,detail:{field:this.for,element:this.targetRef}}))}async update(){const t=++this.requestIndex;if(""===this.value)return this.status="empty",void this.dispatch();this.loading=!0,this.status,this.dispatch();const s=await(this.validate?.(this.value));t===this.requestIndex&&(this.status=s?"success":"error",this.loading=!1,this.lastValueChecked=this.value),this.dispatch()}setLengthRule(){(this.min||this.max)&&(this.validate=t=>!(this.min&&t.length<this.min)&&!(this.max&&t.length>this.max))}setValueRule(){(this.lesser||this.greater)&&(this.validate=t=>!(this.lesser&&parseFloat(t)<this.lesser)&&!(this.greater&&parseFloat(t)>this.greater))}updateStyles(){const t=this.getForm(this)?.submitted;switch(this.status){case"empty":t&&this.required?(e.removeClass(this.iconRef,"fa-circle"),e.removeClass(this.iconRef,"fa-circle-check"),e.addClass(this.iconRef,"fa-circle-xmark")):(e.addClass(this.iconRef,"fa-circle"),e.removeClass(this.iconRef,"fa-circle-check"),e.removeClass(this.iconRef,"fa-circle-xmark")),this.removeAttribute("loading");break;case"success":e.removeClass(this.iconRef,"fa-circle"),e.addClass(this.iconRef,"fa-circle-check"),e.removeClass(this.iconRef,"fa-circle-xmark");break;case"error":e.removeClass(this.iconRef,"fa-circle"),e.removeClass(this.iconRef,"fa-circle-check"),e.addClass(this.iconRef,"fa-circle-xmark")}}};oe([at],ne.prototype,"delay",void 0),oe([at],ne.prototype,"status",void 0),oe([at({mode:"boolean"})],ne.prototype,"required",void 0),oe([at],ne.prototype,"pattern",void 0),oe([at],ne.prototype,"min",void 0),oe([at],ne.prototype,"max",void 0),oe([at],ne.prototype,"lesser",void 0),oe([at],ne.prototype,"greater",void 0),oe([at],ne.prototype,"for",void 0),oe([at({mode:"boolean"})],ne.prototype,"loading",void 0),ne=oe([xt({name:"mo-form-validator",template:ie,styles:[es,ee]})],ne);const re=yt`

  :host {
    flex: 1 1;
    background: var(--header-background-color);
    color: var(--header-foreground-color);
  }

  mo-workspace {
    background: var(--header-background-color);
    padding: var(--padding-md);
  }

  .menu i {
    font-size: var(--font-size-2xl);
    color: var(--header-foreground-color);
    padding: var(--padding-sm) var(--padding-2xs);
  }

  .app-name { 
    margin-left: var(--margin-sm);
    color: var(--header-foreground-color);
    font-size: var(--font-size-2xl);
  }

  .controls { 
    color: var(--header-foreground-color);
    font-size: var(--font-size-lg);
  }

`,le=G`
  ${Zt.html}
  
  <mo-workspace ${Bt("workspaceRef")} class="flex-row middle">

    <button part="menu" ${Bt("menuRef")} 
      class="menu neutral"
      ?hidden-xs="${t=>!t["menu-xs"]}"
      ?hidden-sm="${t=>!t["menu-sm"]}"
      ?hidden-md="${t=>!t["menu-md"]}"
      ?hidden-lg="${t=>!t["menu-lg"]}"
      ?hidden-xl="${t=>!t["menu-xl"]}"
      @click="${t=>t.handleMenuClick()}">
      <i class="fa-solid fa-bars"></i>
    </button>
    
    <div class="app-name flex">
      <slot name="app"></slot>
    </div>
    <div style="display: flex; flex: 1 1">
      <slot></slot>
    </div>
    <div class="controls flex">
      <slot name="controls"></slot>
    </div>
  </mo-workspace>

`;var ae=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let he=class extends gt{constructor(){super(...arguments),this.menu=!1,this["menu-xs"]=!1,this["menu-sm"]=!1,this["menu-md"]=!1,this["menu-lg"]=!1,this["menu-xl"]=!1}handleMenuClick(){const t=new CustomEvent("menu",{bubbles:!0});this.dispatchEvent(t)}connectedCallback(){super.connectedCallback?.(),e.sync(this.workspaceRef)}disconnectedCallback(){super.disconnectedCallback?.(),e.unsync(this.workspaceRef)}isMenuHidden(t){const s=`menu-${t}`;return this.hasAttribute(s)?this[s]:this.menu}};ae([at({mode:"boolean"})],he.prototype,"menu",void 0),ae([at({mode:"boolean"})],he.prototype,"menu-xs",void 0),ae([at({mode:"boolean"})],he.prototype,"menu-sm",void 0),ae([at({mode:"boolean"})],he.prototype,"menu-md",void 0),ae([at({mode:"boolean"})],he.prototype,"menu-lg",void 0),ae([at({mode:"boolean"})],he.prototype,"menu-xl",void 0),he=ae([xt({name:"mo-header",template:le,styles:[es,re]})],he);const ce=yt`
  :host {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    color: var(--menu-foreground-color);
    pointer-events: none;
  }
  mo-screen { 
    background: var(--menu-background-color);
  }
`,de=G`
  <mo-fixed-content>
    <mo-screen part="container" class="flex-fill flex-col" 
      width-xs="100vw" 
      width="${t=>t.expanded?"var(--layout-menu-maximized-width)":"var(--layout-menu-minimized-width)"}">

      <mo-scrollable class="flex-fill">
        <mo-menu ?single="${t=>t.single}">
          <slot ${Gt("slotNodes")}></slot>
        </mo-menu>
      </mo-scrollable>

    </mo-screen>
  </mo-fixed-content>
`,ue=yt`
  :host {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--menu-background-color);
    color: var(--menu-foreground-color);
  }
`,fe=G`
  <slot></slot>
`;var ve=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let me=class extends gt{constructor(){super(...arguments),this.single=!1,this.handleSelected=t=>{this.processSelected(t)},this.handleOpened=t=>{this.processOpened(t)}}connectedCallback(){super.connectedCallback?.(),this.handleSelected.bind(this),this.addEventListener("selected",this.handleSelected),this.handleOpened.bind(this),this.addEventListener("opened",this.handleOpened)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("selected",this.handleSelected),this.removeEventListener("opened",this.handleOpened)}processSelected(t){const s=this.querySelectorAll("mo-menu-item");if(s?.length&&t.target?.hasAttribute("activate"))for(const t of s)t!==this&&t.hasAttribute("active")&&t.removeAttribute("active")}processOpened(t){if(this.single)for(const s of this.children)s!==t.target&&s.hasAttribute("opened")&&s.removeAttribute("opened")}};ve([at({mode:"boolean"})],me.prototype,"single",void 0),me=ve([xt({name:"mo-menu",template:fe,styles:[es,ue]})],me);var be=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let pe=class extends me{constructor(){super(...arguments),this.slotNodes=[],this.expanded=!0}expandedChanged(){return this.expanded?this.maximize():this.minimize()}processSelected(t){super.processSelected(t);for(const t of e.sizes)e.isSize(t)&&Ps[`menu-overlay-${t}`]&&Ps.menu.close()}processOpened(t){super.processOpened(t),this.expanded||(this.expanded=!0)}maximize(){const t=this.querySelectorAll("mo-menu-item");for(const s of t)s.setAttribute("expanded","")}minimize(){const t=this.querySelectorAll("mo-menu-item");for(const s of t)s.removeAttribute("opened"),s.removeAttribute("expanded")}};be([g],pe.prototype,"slotNodes",void 0),be([at({mode:"boolean"})],pe.prototype,"expanded",void 0),pe=be([xt({name:"mo-layout-menu",template:de,styles:[es,ce]})],pe);const ge=yt`
  :host { 
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--color-neutral-100);
  }
  fast-progress {
    width: 50vw; 
    max-width: var(--panel-width-sm);
    height: var(--size-2xs);
    border: var(--border-width-md) solid var(--color-neutral-40);
    border-radius: var(--border-radius-md);
    background: var(--color-neutral-10);
  }
`,xe=G`
  <slot></slot>
  
  ${Ht((t=>"progress"===t.mode),G`
    <div>${t=>t.message}</div>
    <fast-progress appearance="neutral"></fast-progress>
  `)}

  ${Ht((t=>"progress"!==t.mode),G`
    <mo-alert theme="${t=>t.mode}" style="flex: 0 0">${t=>t.message}</mo-alert>
  `)}

`;var we=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let ye=class extends gt{constructor(){super(...arguments),this.message="",this.mode="progress"}};we([at],ye.prototype,"message",void 0),we([at],ye.prototype,"mode",void 0),ye=we([xt({name:"mo-lock",template:xe,styles:[es,ge]})],ye);const ke=yt`

  :host {
    display: flex;
    flex-direction: column;
  }

  .line { 
    padding: var(--padding-lg) var(--padding-lg) var(--padding-lg) var(--padding-sm);
    border-left: var(--border-width-lg) solid rgba(0,0,0,0);
    border-radius: 0;
  }

  .line.active {
    background: var(--menu-item-active-background);
    border-left: var(--border-width-lg) solid var(--menu-item-active-color);
  }

  .icon {
    padding-right: var(--padding-md);
    width: var(--size-md);
  }

  .expand { 
    padding-left: var(--padding-md);
  }

  .expand i { 
    transition: transform 0.25s ease-out;
  }

  .expand.open i {
    transform: rotate(-180deg);
  }

  .name { 
    font-size: var(--font-size-md);
  }

  .children { 
    background: var(--menu-item-children-background);
  }

`,$e=G`
  ${Zt.html}

  <button ${Bt("menuItemRef")} part="menu-item" class="line neutral flex-row middle" @click="${t=>t.handleClick()}">

    <div class="icon" ${Bt("iconRef")}>
      <slot name="icon" ${Bt("iconSlot")}></slot>
    </div>

    ${Ht((t=>t.expanded),G`
    <div class="name flex-fill flex-row middle left" ${Bt("nameRef")}>
      <slot></slot>
    </div>
    `)}

    ${Ht((t=>t.expanded),G`
    <div class="expand" ${Bt("expandRef")}>
      <i class="fa-solid fa-chevron-down"></i>
    </div>
    `)}

  </button>

  <mo-expandable inherit-width part="children" class="children" ${Bt("childrenRef")} @change="${t=>t.opened=t.childrenRef.opened}">
    <slot name="children" ${Bt("childrenSlot")}></slot>
  </mo-expandable>

`;var Ce=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let ze=class extends gt{constructor(){super(...arguments),this.activate=!1,this.active=!1,this.opened=!1,this.expanded=!0}activeChanged(){this.menuItemRef&&(this.active?(e.addClass(this.menuItemRef,"active"),this.dispatchEvent(new CustomEvent("selected",{bubbles:!0}))):e.removeClass(this.menuItemRef,"active"))}openedChanged(){this.menuItemRef&&(this.opened?(e.addClass(this.expandRef,"open"),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0})),this.childrenRef.opened||this.childrenRef.setAttribute("opened","")):(e.removeClass(this.expandRef,"open"),this.childrenRef.opened&&this.childrenRef.removeAttribute("opened")))}get hasChildren(){return this.childrenSlot.assignedNodes().length}get hasIcon(){return this.iconSlot?.assignedNodes().length}connectedCallback(){super.connectedCallback?.(),this.activeChanged(),this.openedChanged(),this.hasIcon||this.iconRef.setAttribute("hidden",""),this.hasChildren||this.expandRef.setAttribute("hidden",""),e.sync(this)}disconnectedCallback(){super.disconnectedCallback(),e.unsync(this)}handleClick(){this.hasChildren?this.handleResize():this.handleSelect()}handleResize(){this.childrenRef.opened?(this.childrenRef.close(),this.dispatchEvent(new CustomEvent("closed",{bubbles:!0}))):(this.childrenRef.open(),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0})))}handleSelect(){this.activate&&(this.active=!0),this.dispatchEvent(new CustomEvent("select",{bubbles:!0}))}};Ce([at({mode:"boolean"})],ze.prototype,"activate",void 0),Ce([at({mode:"boolean"})],ze.prototype,"active",void 0),Ce([at({mode:"boolean"})],ze.prototype,"opened",void 0),Ce([at({mode:"boolean"})],ze.prototype,"expanded",void 0),ze=Ce([xt({name:"mo-menu-item",template:$e,styles:[es,ke]})],ze);const Oe=yt`
  :host {
    display: flex;
    width: var(--panel-height-md);
    height: var(--panel-height-md);
    max-width: 95vw;
    max-height: 90vh;
    background: var(--color-neutral-100);
    shadow: var(--shadow);
    border-radius: var(--border-radius-md);
  }
  :host([screen-xs]) { 
    min-width: 95vw;
    width: 95vw;
  }
  mo-scrollable::part(scrollable) {
    display: flex;
  }
`,je=G`
  ${Zt.html}
  <mo-card class="no-border no-margin flex-fill">
    <slot name="header" slot="header"></slot>
    <button class="neutral" slot="controls" @click="${()=>Ps.modal.close()}">
      <i class="fa-solid fa-x"></i>
    </button>
    <mo-scrollable class="flex-fill">
      <slot></slot>
    </mo-scrollable>
    <div ?hidden="${t=>!t.actionNodes?.length}">
      <slot name="actions" slot="actions" ${Gt("actionNodes")}></slot>
    </div>
  </mo-card>
`,Re=yt`
  :host {
    display: block;
  }
`,Se=G`
  <slot></slot>
`;var Te=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let Ee=class extends gt{constructor(){super(...arguments),this.handleResize=()=>{let t,s;e.isSize("xs")?t=void 0===this["width-xs"]?this.width:this["width-xs"]:e.isSize("sm")?t=void 0===this["width-sm"]?this.width:this["width-sm"]:e.isSize("md")?t=void 0===this["width-md"]?this.width:this["width-md"]:e.isSize("lg")?t=void 0===this["width-lg"]?this.width:this["width-lg"]:e.isSize("xl")&&(t=void 0===this["width-xl"]?this.width:this["width-xl"]),this.style.width=t||"",e.isSize("xs")?s=void 0===this["height-xs"]?this.height:this["height-xs"]:e.isSize("sm")?s=void 0===this["height-sm"]?this.height:this["height-sm"]:e.isSize("md")?s=void 0===this["height-md"]?this.height:this["height-md"]:e.isSize("lg")?s=void 0===this["height-lg"]?this.height:this["height-lg"]:e.isSize("xl")&&(s=void 0===this["height-xl"]?this.height:this["height-xl"]),this.style.height=s||""}}widthChanged(){this.handleResize()}"width-xsChanged"(){this.handleResize()}"width-smChanged"(){this.handleResize()}"width-mdChanged"(){this.handleResize()}"width-lgChanged"(){this.handleResize()}"width-xlChanged"(){this.handleResize()}heightChanged(){this.handleResize()}"height-xsChanged"(){this.handleResize()}"height-smChanged"(){this.handleResize()}"height-mdChanged"(){this.handleResize()}"height-lgChanged"(){this.handleResize()}"height-xlChanged"(){this.handleResize()}connectedCallback(){super.connectedCallback?.(),this.handleResize.bind(this),this.handleResize(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){super.disconnectedCallback?.(),window.removeEventListener("resize",this.handleResize)}};Te([at],Ee.prototype,"width",void 0),Te([at],Ee.prototype,"width-xs",void 0),Te([at],Ee.prototype,"width-sm",void 0),Te([at],Ee.prototype,"width-md",void 0),Te([at],Ee.prototype,"width-lg",void 0),Te([at],Ee.prototype,"width-xl",void 0),Te([at],Ee.prototype,"height",void 0),Te([at],Ee.prototype,"height-xs",void 0),Te([at],Ee.prototype,"height-sm",void 0),Te([at],Ee.prototype,"height-md",void 0),Te([at],Ee.prototype,"height-lg",void 0),Te([at],Ee.prototype,"height-xl",void 0),Ee=Te([xt({name:"mo-screen",template:Se,styles:[Re]})],Ee);var Ae=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let Me=class extends Ee{connectedCallback(){super.connectedCallback(),e.sync(this)}disconnectedCallback(){super.disconnectedCallback(),e.unsync(this)}};Me=Ae([xt({name:"mo-modal-panel",template:je,styles:[es,Oe]})],Me);const Fe=yt`

  :host { 
    flex: 1 1;
    display: flex;
    position: relative;
  }

  .visual {
    border: var(--border-width-md) dashed var(--color-neutral-60);
    border-radius: var(--border-radius-lg);
    margin: var(--margin-2xs);
    box-sizing: border-box;
    background: var(--color-neutral-100);
    padding: var(--padding-lg);
    flex-direction: inherit;
    color: var(--color-neutral-50);
    font-size: var(--font-size-lg);
  }

`,Be=G`
  <div class="visual flex-fill flex-col center middle">
    <slot></slot>
  </div>
`;var Pe=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let Ie=class extends gt{};Ie=Pe([xt({name:"mo-placeholder",template:Be,styles:[es,Fe]})],Ie);const Ve=yt`
  :host { 
    position: relative;
  }
  [part="scrollable"] { 
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: none;
  }
`,He=G`
  <div part="scrollable" ${Bt("scrollableRef")}>
    <slot></slot>
  </div>
`;var Le=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let Ne=class extends gt{constructor(){super(...arguments),this.scrollLocked=!1,this.lastScrollPos=0}connectedCallback(){super.connectedCallback?.(),e.addClass(this,"no-scroll"),e.addClass(this.scrollableRef,"no-scroll"),this.scrollLocked=!0,this.resizeObserver=new ResizeObserver((()=>{this.scrollableRef.style.width=`${this.offsetWidth}px`,this.scrollableRef.style.height=`${this.offsetHeight}px`,this.scrollLocked&&setTimeout((()=>this.unlock()),10)})),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback?.(),e.removeClass(this,"no-scroll"),e.removeClass(this.scrollableRef,"no-scroll"),this.scrollLocked=!0,this.lastScrollPos=this.scrollableRef.scrollTop,this.resizeObserver.disconnect()}unlock(){e.removeClass(this,"no-scroll"),e.removeClass(this.scrollableRef,"no-scroll"),this.scrollableRef.scrollTop=this.lastScrollPos,this.scrollLocked=!1}};Ne=Le([xt({name:"mo-scrollable",template:He,styles:[es,Ve]})],Ne);const We=yt`
  :host button {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -100%);
    transition: transform 0.25s ease-in-out;
    opacity: 0;
  }
  :host button:focus {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
`,De=G`
  <button @click=${t=>t.go()} class="primary">
    <slot></slot>
  </button>
`;var qe=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let Ue=class extends gt{go(){const t=document.querySelector("mo-layout");t?.contentRef.focus(),window.scrollTo(0,0)}};Ue=qe([xt({name:"mo-skip-to-content",template:De,styles:[es,We]})],Ue);const Ye=yt`
  :host { 
    box-sizing: border-box;
    width: 100vw;
    max-width: var(--workspace-max-width);
    margin: var(--workspace-align-margin);
  }
`,_e=G`<slot></slot>`;var Ge=function(t,s,e,i){for(var o,n=arguments.length,r=n<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,e):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(s,e,r):o(s,e))||r);return n>3&&r&&Object.defineProperty(s,e,r),r};let Xe=class extends gt{};Xe=Ge([xt({name:"mo-workspace",template:_e,styles:[Ye]})],Xe),e.sync(document.body,{width:!0,orientation:!0});export{Ms as LockInterface,os as MockAlertElement,as as MockCardElement,vs as MockChartElement,gs as MockColumnsElement,$s as MockExpandableElement,Hs as MockFixedContentElement,Ds as MockFooterElement,_s as MockFormElement,Js as MockFormFieldElement,se as MockFormGroupElement,ne as MockFormValidatorElement,he as MockHeaderElement,Is as MockLayoutElement,pe as MockLayoutMenuElement,Xe as MockLayoutWorkspaceElement,ye as MockLockElement,me as MockMenuElement,ze as MockMenuItemElement,Me as MockModalPanelElement,Ie as MockPlaceholderElement,Ee as MockScreenElement,Ne as MockScrollableElement,Ue as MockSkipToContentElement,yt as css,Zt as dependency,es as globalStyles,G as html,Ps as layout,Fs as lock,Bt as ref,Ut as repeat,e as screen,Gt as slotted,Ht as when};
