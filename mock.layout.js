var t;!function(t){t.landscape="landscape",t.portrait="portrait"}(t||(t={}));class e{get size(){return this.current.size}constructor(){this.elements=new Map,this.current={width:document.body.clientWidth,orientation:t.landscape,size:"md",sizing:{}},this.sizes=["xs","sm","md","lg","xl"],this.styles="\n    :root {\n      --screen-xs: 576px;\n      --screen-sm: 768px;\n      --screen-md: 992px;\n      --screen-lg: 1140px;\n      --screen-xl: 99999px;\n    }\n    [hidden] { display: none !important }\n    .screen-xs [hidden-xs], .screen-xs[hidden-xs] { display: none !important }\n    .screen-sm [hidden-sm], .screen-sm[hidden-sm] { display: none !important }\n    .screen-md [hidden-md], .screen-md[hidden-md] { display: none !important }\n    .screen-lg [hidden-lg], .screen-lg[hidden-lg] { display: none !important }\n    .screen-xl [hidden-xl], .screen-xl[hidden-xl] { display: none !important }\n    .no-pad { padding: 0 }\n    .no-margin { margin: 0 }\n    .no-border { border: 0 }\n    .no-scroll, .no-scroll *:not(.yes-scroll) {\n      overscroll-behavior: none !important;\n      overflow: hidden !important;\n    }\n  ",window.addEventListener("resize",(()=>{this.trackWidth(),this.update()})),window.screen.orientation.addEventListener("change",(()=>{this.trackOrientation(),this.update()}))}init(){this.initializeSizing(),this.trackWidth(),this.trackOrientation()}initializeSizing(){for(const t of this.sizes)this.current.sizing[t]=this.getSizeFromCss(t)}getSizeFromCss(t){return parseInt(getComputedStyle(document.body).getPropertyValue(`--screen-${t}`).replace("px",""))}trackWidth(){this.current.width=document.body.clientWidth;for(const t of this.sizes)if(this.current.width<this.current.sizing[t]){this.current.size=t;break}}trackOrientation(){if(["landscape","landscape-primary","landscape-secondary"].indexOf(window.screen.orientation.type)>-1)return void(this.current.orientation=t.landscape);["portrait","portrait-primary","portrait-secondary"].indexOf(window.screen.orientation.type)>-1?this.current.orientation=t.portrait:this.current.orientation=void 0}isSize(t){return this.current.size===t}sync(t,e={width:!0}){this.elements.has(t)||(this.elements.set(t,e),this.updateElement(t))}unsync(t){this.elements.delete(t),this.clearElement(t)}clear(){for(const t of this.elements.keys())this.updateElement(t)}clearElement(e){for(const t of this.sizes)this.removeClass(e,`screen-${t}`);this.removeClass(e,t.landscape),this.removeClass(e,t.portrait)}update(){for(const t of this.elements.keys())this.updateElement(t)}updateElement(e){const s=this.elements.get(e);if(s?.width)for(const t of this.sizes)this.current.size===t?this.addClass(e,`screen-${t}`):this.removeClass(e,`screen-${t}`);if(s?.orientation)switch(this.current.orientation){case t.landscape:this.addClass(e,t.landscape),this.removeClass(e,t.portrait);break;case t.portrait:this.addClass(e,t.portrait),this.removeClass(e,t.landscape);break;default:this.removeClass(e,t.portrait),this.removeClass(e,t.landscape)}}lockScroll(t){return(t=t||document.body)&&this.addClass(t,"no-scroll"),()=>{this.removeClass(document.body,"no-scroll"),t&&this.removeClass(t,"no-scroll")}}addAttribute(t,e,s=""){t.setAttribute(e,s)}removeAttribute(t,e){t.removeAttribute(e)}toggleAttribute(t,e,s,i=""){void 0===s&&(s=t.hasAttribute(e)),s?this.addAttribute(t,e,i):this.removeAttribute(t,e)}addClass(t,e){t.classList.contains(e)||t.classList.add(e)}removeClass(t,e){for(;t.classList.contains(e);)t.classList.remove(e)}async wait(t=1){return await new Promise((e=>setTimeout((()=>e(void 0)),t)))}}let s=window?.$screen;if(!s){s=new e,window.$screen=s;const t=document.createElement("style");t.setAttribute("mo-screen",""),t.innerHTML=s.styles,document.head.appendChild(t),s.init()}const i=function(){if("undefined"!=typeof globalThis)return globalThis;if("undefined"!=typeof global)return global;if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;try{return new Function("return this")()}catch(t){return{}}}();void 0===i.trustedTypes&&(i.trustedTypes={createPolicy:(t,e)=>e});const o={configurable:!1,enumerable:!1,writable:!1};void 0===i.FAST&&Reflect.defineProperty(i,"FAST",Object.assign({value:Object.create(null)},o));const n=i.FAST;if(void 0===n.getById){const t=Object.create(null);Reflect.defineProperty(n,"getById",Object.assign({value(e,s){let i=t[e];return void 0===i&&(i=s?t[e]=s():null),i}},o))}const r=Object.freeze([]);function l(){const t=new WeakMap;return function(e){let s=t.get(e);if(void 0===s){let i=Reflect.getPrototypeOf(e);for(;void 0===s&&null!==i;)s=t.get(i),i=Reflect.getPrototypeOf(i);s=void 0===s?[]:s.slice(0),t.set(e,s)}return s}}const a=i.FAST.getById(1,(()=>{const t=[],e=[];function s(){if(e.length)throw e.shift()}function o(t){try{t.call()}catch(t){e.push(t),setTimeout(s,0)}}function n(){let e=0;for(;e<t.length;)if(o(t[e]),e++,e>1024){for(let s=0,i=t.length-e;s<i;s++)t[s]=t[s+e];t.length-=e,e=0}t.length=0}return Object.freeze({enqueue:function(e){t.length<1&&i.requestAnimationFrame(n),t.push(e)},process:n})})),h=i.trustedTypes.createPolicy("fast-html",{createHTML:t=>t});let c=h;const d=`fast-${Math.random().toString(36).substring(2,8)}`,u=`${d}{`,f=`}${d}`,v=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(t){if(c!==h)throw new Error("The HTML policy can only be set once.");c=t},createHTML:t=>c.createHTML(t),isMarker:t=>t&&8===t.nodeType&&t.data.startsWith(d),extractDirectiveIndexFromMarker:t=>parseInt(t.data.replace(`${d}:`,"")),createInterpolationPlaceholder:t=>`${u}${t}${f}`,createCustomAttributePlaceholder(t,e){return`${t}="${this.createInterpolationPlaceholder(e)}"`},createBlockPlaceholder:t=>`\x3c!--${d}:${t}--\x3e`,queueUpdate:a.enqueue,processUpdates:a.process,nextUpdate:()=>new Promise(a.enqueue),setAttribute(t,e,s){null==s?t.removeAttribute(e):t.setAttribute(e,s)},setBooleanAttribute(t,e,s){s?t.setAttribute(e,""):t.removeAttribute(e)},removeChildNodes(t){for(let e=t.firstChild;null!==e;e=t.firstChild)t.removeChild(e)},createTemplateWalker:t=>document.createTreeWalker(t,133,null,!1)});class m{constructor(t,e){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=e}has(t){return void 0===this.spillover?this.sub1===t||this.sub2===t:-1!==this.spillover.indexOf(t)}subscribe(t){const e=this.spillover;if(void 0===e){if(this.has(t))return;if(void 0===this.sub1)return void(this.sub1=t);if(void 0===this.sub2)return void(this.sub2=t);this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else{-1===e.indexOf(t)&&e.push(t)}}unsubscribe(t){const e=this.spillover;if(void 0===e)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const s=e.indexOf(t);-1!==s&&e.splice(s,1)}}notify(t){const e=this.spillover,s=this.source;if(void 0===e){const e=this.sub1,i=this.sub2;void 0!==e&&e.handleChange(s,t),void 0!==i&&i.handleChange(s,t)}else for(let i=0,o=e.length;i<o;++i)e[i].handleChange(s,t)}}class b{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var e;const s=this.subscribers[t];void 0!==s&&s.notify(t),null===(e=this.sourceSubscribers)||void 0===e||e.notify(t)}subscribe(t,e){var s;if(e){let s=this.subscribers[e];void 0===s&&(this.subscribers[e]=s=new m(this.source)),s.subscribe(t)}else this.sourceSubscribers=null!==(s=this.sourceSubscribers)&&void 0!==s?s:new m(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,e){var s;if(e){const s=this.subscribers[e];void 0!==s&&s.unsubscribe(t)}else null===(s=this.sourceSubscribers)||void 0===s||s.unsubscribe(t)}}const p=n.getById(2,(()=>{const t=/(:|&&|\|\||if)/,e=new WeakMap,s=v.queueUpdate;let i,o=t=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function n(t){let s=t.$fastController||e.get(t);return void 0===s&&(Array.isArray(t)?s=o(t):e.set(t,s=new b(t))),s}const r=l();class a{constructor(t){this.name=t,this.field=`_${t}`,this.callback=`${t}Changed`}getValue(t){return void 0!==i&&i.watch(t,this.name),t[this.field]}setValue(t,e){const s=this.field,i=t[s];if(i!==e){t[s]=e;const o=t[this.callback];"function"==typeof o&&o.call(t,i,e),n(t).notify(this.name)}}}class h extends m{constructor(t,e,s=!1){super(t,e),this.binding=t,this.isVolatileBinding=s,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(t,e){this.needsRefresh&&null!==this.last&&this.disconnect();const s=i;i=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const o=this.binding(t,e);return i=s,o}disconnect(){if(null!==this.last){let t=this.first;for(;void 0!==t;)t.notifier.unsubscribe(this,t.propertyName),t=t.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(t,e){const s=this.last,o=n(t),r=null===s?this.first:{};if(r.propertySource=t,r.propertyName=e,r.notifier=o,o.subscribe(this,e),null!==s){if(!this.needsRefresh){let e;i=void 0,e=s.propertySource[s.propertyName],i=this,t===e&&(this.needsRefresh=!0)}s.next=r}this.last=r}handleChange(){this.needsQueue&&(this.needsQueue=!1,s(this))}call(){null!==this.last&&(this.needsQueue=!0,this.notify(this))}records(){let t=this.first;return{next:()=>{const e=t;return void 0===e?{value:void 0,done:!0}:(t=t.next,{value:e,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(t){o=t},getNotifier:n,track(t,e){void 0!==i&&i.watch(t,e)},trackVolatile(){void 0!==i&&(i.needsRefresh=!0)},notify(t,e){n(t).notify(e)},defineProperty(t,e){"string"==typeof e&&(e=new a(e)),r(t).push(e),Reflect.defineProperty(t,e.name,{enumerable:!0,get:function(){return e.getValue(this)},set:function(t){e.setValue(this,t)}})},getAccessors:r,binding(t,e,s=this.isVolatileBinding(t)){return new h(t,e,s)},isVolatileBinding:e=>t.test(e.toString())})}));function g(t,e){p.defineProperty(t,e)}const x=n.getById(3,(()=>{let t=null;return{get:()=>t,set(e){t=e}}}));class w{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return x.get()}get isEven(){return this.index%2==0}get isOdd(){return this.index%2!=0}get isFirst(){return 0===this.index}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){x.set(t)}}p.defineProperty(w.prototype,"index"),p.defineProperty(w.prototype,"length");const y=Object.seal(new w);class k{constructor(){this.targetIndex=0}}class $ extends k{constructor(){super(...arguments),this.createPlaceholder=v.createInterpolationPlaceholder}}class C extends k{constructor(t,e,s){super(),this.name=t,this.behavior=e,this.options=s}createPlaceholder(t){return v.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function z(t,e){this.source=t,this.context=e,null===this.bindingObserver&&(this.bindingObserver=p.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(t,e))}function O(t,e){this.source=t,this.context=e,this.target.addEventListener(this.targetName,this)}function j(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function S(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const t=this.target.$fastView;void 0!==t&&t.isComposed&&(t.unbind(),t.needsBindOnly=!0)}function R(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function T(t){v.setAttribute(this.target,this.targetName,t)}function A(t){v.setBooleanAttribute(this.target,this.targetName,t)}function E(t){if(null==t&&(t=""),t.create){this.target.textContent="";let e=this.target.$fastView;void 0===e?e=t.create():this.target.$fastTemplate!==t&&(e.isComposed&&(e.remove(),e.unbind()),e=t.create()),e.isComposed?e.needsBindOnly&&(e.needsBindOnly=!1,e.bind(this.source,this.context)):(e.isComposed=!0,e.bind(this.source,this.context),e.insertBefore(this.target),this.target.$fastView=e,this.target.$fastTemplate=t)}else{const e=this.target.$fastView;void 0!==e&&e.isComposed&&(e.isComposed=!1,e.remove(),e.needsBindOnly?e.needsBindOnly=!1:e.unbind()),this.target.textContent=t}}function M(t){this.target[this.targetName]=t}function B(t){const e=this.classVersions||Object.create(null),s=this.target;let i=this.version||0;if(null!=t&&t.length){const o=t.split(/\s+/);for(let t=0,n=o.length;t<n;++t){const n=o[t];""!==n&&(e[n]=i,s.classList.add(n))}}if(this.classVersions=e,this.version=i+1,0!==i){i-=1;for(const t in e)e[t]===i&&s.classList.remove(t)}}class P extends ${constructor(t){super(),this.binding=t,this.bind=z,this.unbind=j,this.updateTarget=T,this.isBindingVolatile=p.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,void 0!==t)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=M,"innerHTML"===this.cleanedTargetName){const t=this.binding;this.binding=(e,s)=>v.createHTML(t(e,s))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=A;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=O,this.unbind=R;break;default:this.cleanedTargetName=t,"class"===t&&(this.updateTarget=B)}}targetAtContent(){this.updateTarget=E,this.unbind=S}createBehavior(t){return new F(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class F{constructor(t,e,s,i,o,n,r){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=e,this.isBindingVolatile=s,this.bind=i,this.unbind=o,this.updateTarget=n,this.targetName=r}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){w.setEvent(t);const e=this.binding(this.source,this.context);w.setEvent(null),!0!==e&&t.preventDefault()}}let I=null;class V{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){I=this}static borrow(t){const e=I||new V;return e.directives=t,e.reset(),I=null,e}}function H(t){if(1===t.length)return t[0];let e;const s=t.length,i=t.map((t=>"string"==typeof t?()=>t:(e=t.targetName||e,t.binding))),o=new P(((t,e)=>{let o="";for(let n=0;n<s;++n)o+=i[n](t,e);return o}));return o.targetName=e,o}const L=f.length;function N(t,e){const s=e.split(u);if(1===s.length)return null;const i=[];for(let e=0,o=s.length;e<o;++e){const o=s[e],n=o.indexOf(f);let r;if(-1===n)r=o;else{const e=parseInt(o.substring(0,n));i.push(t.directives[e]),r=o.substring(n+L)}""!==r&&i.push(r)}return i}function W(t,e,s=!1){const i=e.attributes;for(let o=0,n=i.length;o<n;++o){const r=i[o],l=r.value,a=N(t,l);let h=null;null===a?s&&(h=new P((()=>l)),h.targetName=r.name):h=H(a),null!==h&&(e.removeAttributeNode(r),o--,n--,t.addFactory(h))}}function D(t,e,s){const i=N(t,e.textContent);if(null!==i){let o=e;for(let n=0,r=i.length;n<r;++n){const r=i[n],l=0===n?e:o.parentNode.insertBefore(document.createTextNode(""),o.nextSibling);"string"==typeof r?l.textContent=r:(l.textContent=" ",t.captureContentBinding(r)),o=l,t.targetIndex++,l!==e&&s.nextNode()}t.targetIndex--}}const U=document.createRange();class q{constructor(t,e){this.fragment=t,this.behaviors=e,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const e=this.lastChild;if(t.previousSibling===e)return;const s=t.parentNode;let i,o=this.firstChild;for(;o!==e;)i=o.nextSibling,s.insertBefore(o,t),o=i;s.insertBefore(e,t)}}remove(){const t=this.fragment,e=this.lastChild;let s,i=this.firstChild;for(;i!==e;)s=i.nextSibling,t.appendChild(i),i=s;t.appendChild(e)}dispose(){const t=this.firstChild.parentNode,e=this.lastChild;let s,i=this.firstChild;for(;i!==e;)s=i.nextSibling,t.removeChild(i),i=s;t.removeChild(e);const o=this.behaviors,n=this.source;for(let t=0,e=o.length;t<e;++t)o[t].unbind(n)}bind(t,e){const s=this.behaviors;if(this.source!==t)if(null!==this.source){const i=this.source;this.source=t,this.context=e;for(let o=0,n=s.length;o<n;++o){const n=s[o];n.unbind(i),n.bind(t,e)}}else{this.source=t,this.context=e;for(let i=0,o=s.length;i<o;++i)s[i].bind(t,e)}}unbind(){if(null===this.source)return;const t=this.behaviors,e=this.source;for(let s=0,i=t.length;s<i;++s)t[s].unbind(e);this.source=null}static disposeContiguousBatch(t){if(0!==t.length){U.setStartBefore(t[0].firstChild),U.setEndAfter(t[t.length-1].lastChild),U.deleteContents();for(let e=0,s=t.length;e<s;++e){const s=t[e],i=s.behaviors,o=s.source;for(let t=0,e=i.length;t<e;++t)i[t].unbind(o)}}}}class Y{constructor(t,e){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=e}create(t){if(null===this.fragment){let t;const e=this.html;if("string"==typeof e){t=document.createElement("template"),t.innerHTML=v.createHTML(e);const s=t.content.firstElementChild;null!==s&&"TEMPLATE"===s.tagName&&(t=s)}else t=e;const s=function(t,e){const s=t.content;document.adoptNode(s);const i=V.borrow(e);W(i,t,!0);const o=i.behaviorFactories;i.reset();const n=v.createTemplateWalker(s);let r;for(;r=n.nextNode();)switch(i.targetIndex++,r.nodeType){case 1:W(i,r);break;case 3:D(i,r,n);break;case 8:v.isMarker(r)&&i.addFactory(e[v.extractDirectiveIndexFromMarker(r)])}let l=0;(v.isMarker(s.firstChild)||1===s.childNodes.length&&e.length)&&(s.insertBefore(document.createComment(""),s.firstChild),l=-1);const a=i.behaviorFactories;return i.release(),{fragment:s,viewBehaviorFactories:a,hostBehaviorFactories:o,targetOffset:l}}(t,this.directives);this.fragment=s.fragment,this.viewBehaviorFactories=s.viewBehaviorFactories,this.hostBehaviorFactories=s.hostBehaviorFactories,this.targetOffset=s.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const e=this.fragment.cloneNode(!0),s=this.viewBehaviorFactories,i=new Array(this.behaviorCount),o=v.createTemplateWalker(e);let n=0,r=this.targetOffset,l=o.nextNode();for(let t=s.length;n<t;++n){const t=s[n],e=t.targetIndex;for(;null!==l;){if(r===e){i[n]=t.createBehavior(l);break}l=o.nextNode(),r++}}if(this.hasHostBehaviors){const e=this.hostBehaviorFactories;for(let s=0,o=e.length;s<o;++s,++n)i[n]=e[s].createBehavior(t)}return new q(e,i)}render(t,e,s){"string"==typeof e&&(e=document.getElementById(e)),void 0===s&&(s=e);const i=this.create(s);return i.bind(t,y),i.appendTo(e),i}}const _=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function G(t,...e){const s=[];let i="";for(let o=0,n=t.length-1;o<n;++o){const n=t[o];let r=e[o];if(i+=n,r instanceof Y){const t=r;r=()=>t}if("function"==typeof r&&(r=new P(r)),r instanceof $){const t=_.exec(n);null!==t&&(r.targetName=t[2])}r instanceof k?(i+=r.createPlaceholder(s.length),s.push(r)):i+=r}return i+=t[t.length-1],new Y(i,s)}class X{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=null===this.behaviors?t:this.behaviors.concat(t),this}}function Z(t){return t.map((t=>t instanceof X?Z(t.styles):[t])).reduce(((t,e)=>t.concat(e)),[])}function J(t){return t.map((t=>t instanceof X?t.behaviors:null)).reduce(((t,e)=>null===e?t:(null===t&&(t=[]),t.concat(e))),null)}X.create=(()=>{if(v.supportsAdoptedStyleSheets){const t=new Map;return e=>new st(e,t)}return t=>new ot(t)})();const K=Symbol("prependToAdoptedStyleSheets");function Q(t){const e=[],s=[];return t.forEach((t=>(t[K]?e:s).push(t))),{prepend:e,append:s}}let tt=(t,e)=>{const{prepend:s,append:i}=Q(e);t.adoptedStyleSheets=[...s,...t.adoptedStyleSheets,...i]},et=(t,e)=>{t.adoptedStyleSheets=t.adoptedStyleSheets.filter((t=>-1===e.indexOf(t)))};if(v.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),tt=(t,e)=>{const{prepend:s,append:i}=Q(e);t.adoptedStyleSheets.splice(0,0,...s),t.adoptedStyleSheets.push(...i)},et=(t,e)=>{for(const s of e){const e=t.adoptedStyleSheets.indexOf(s);-1!==e&&t.adoptedStyleSheets.splice(e,1)}}}catch(t){}class st extends X{constructor(t,e){super(),this.styles=t,this.styleSheetCache=e,this._styleSheets=void 0,this.behaviors=J(t)}get styleSheets(){if(void 0===this._styleSheets){const t=this.styles,e=this.styleSheetCache;this._styleSheets=Z(t).map((t=>{if(t instanceof CSSStyleSheet)return t;let s=e.get(t);return void 0===s&&(s=new CSSStyleSheet,s.replaceSync(t),e.set(t,s)),s}))}return this._styleSheets}addStylesTo(t){tt(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){et(t,this.styleSheets),super.removeStylesFrom(t)}}let it=0;class ot extends X{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=J(t),this.styleSheets=Z(t),this.styleClass="fast-style-class-"+ ++it}addStylesTo(t){const e=this.styleSheets,s=this.styleClass;t=this.normalizeTarget(t);for(let i=0;i<e.length;i++){const o=document.createElement("style");o.innerHTML=e[i],o.className=s,t.append(o)}super.addStylesTo(t)}removeStylesFrom(t){const e=(t=this.normalizeTarget(t)).querySelectorAll(`.${this.styleClass}`);for(let s=0,i=e.length;s<i;++s)t.removeChild(e[s]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const nt=Object.freeze({locate:l()}),rt={toView:t=>t?"true":"false",fromView:t=>null!=t&&"false"!==t&&!1!==t&&0!==t};class lt{constructor(t,e,s=e.toLowerCase(),i="reflect",o){this.guards=new Set,this.Owner=t,this.name=e,this.attribute=s,this.mode=i,this.converter=o,this.fieldName=`_${e}`,this.callbackName=`${e}Changed`,this.hasCallback=this.callbackName in t.prototype,"boolean"===i&&void 0===o&&(this.converter=rt)}setValue(t,e){const s=t[this.fieldName],i=this.converter;void 0!==i&&(e=i.fromView(e)),s!==e&&(t[this.fieldName]=e,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](s,e),t.$fastController.notify(this.name))}getValue(t){return p.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,e){this.guards.has(t)||(this.guards.add(t),this.setValue(t,e),this.guards.delete(t))}tryReflectToAttribute(t){const e=this.mode,s=this.guards;s.has(t)||"fromView"===e||v.queueUpdate((()=>{s.add(t);const i=t[this.fieldName];switch(e){case"reflect":const e=this.converter;v.setAttribute(t,this.attribute,void 0!==e?e.toView(i):i);break;case"boolean":v.setBooleanAttribute(t,this.attribute,i)}s.delete(t)}))}static collect(t,...e){const s=[];e.push(nt.locate(t));for(let i=0,o=e.length;i<o;++i){const o=e[i];if(void 0!==o)for(let e=0,i=o.length;e<i;++e){const i=o[e];"string"==typeof i?s.push(new lt(t,i)):s.push(new lt(t,i.property,i.attribute,i.mode,i.converter))}}return s}}function at(t,e){let s;function i(t,e){arguments.length>1&&(s.property=e),nt.locate(t.constructor).push(s)}return arguments.length>1?(s={},void i(t,e)):(s=void 0===t?{}:t,i)}const ht={mode:"open"},ct={},dt=n.getById(4,(()=>{const t=new Map;return Object.freeze({register:e=>!t.has(e.type)&&(t.set(e.type,e),!0),getByType:e=>t.get(e)})}));class ut{constructor(t,e=t.definition){"string"==typeof e&&(e={name:e}),this.type=t,this.name=e.name,this.template=e.template;const s=lt.collect(t,e.attributes),i=new Array(s.length),o={},n={};for(let t=0,e=s.length;t<e;++t){const e=s[t];i[t]=e.attribute,o[e.name]=e,n[e.attribute]=e}this.attributes=s,this.observedAttributes=i,this.propertyLookup=o,this.attributeLookup=n,this.shadowOptions=void 0===e.shadowOptions?ht:null===e.shadowOptions?void 0:Object.assign(Object.assign({},ht),e.shadowOptions),this.elementOptions=void 0===e.elementOptions?ct:Object.assign(Object.assign({},ct),e.elementOptions),this.styles=void 0===e.styles?void 0:Array.isArray(e.styles)?X.create(e.styles):e.styles instanceof X?e.styles:X.create([e.styles])}get isDefined(){return!!dt.getByType(this.type)}define(t=customElements){const e=this.type;if(dt.register(this)){const t=this.attributes,s=e.prototype;for(let e=0,i=t.length;e<i;++e)p.defineProperty(s,t[e]);Reflect.defineProperty(e,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,e,this.elementOptions),this}}ut.forType=dt.getByType;const ft=new WeakMap,vt={bubbles:!0,composed:!0,cancelable:!0};function mt(t){return t.shadowRoot||ft.get(t)||null}class bt extends b{constructor(t,e){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=e;const s=e.shadowOptions;if(void 0!==s){const e=t.attachShadow(s);"closed"===s.mode&&ft.set(t,e)}const i=p.getAccessors(t);if(i.length>0){const e=this.boundObservables=Object.create(null);for(let s=0,o=i.length;s<o;++s){const o=i[s].name,n=t[o];void 0!==n&&(delete t[o],e[o]=n)}}}get isConnected(){return p.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,p.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(null!==this._styles&&this.removeStyles(this._styles),this._styles=t,this.needsInitialization||null===t||this.addStyles(t))}addStyles(t){const e=mt(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.append(t);else if(!t.isAttachedTo(e)){const s=t.behaviors;t.addStylesTo(e),null!==s&&this.addBehaviors(s)}}removeStyles(t){const e=mt(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.removeChild(t);else if(t.isAttachedTo(e)){const s=t.behaviors;t.removeStylesFrom(e),null!==s&&this.removeBehaviors(s)}}addBehaviors(t){const e=this.behaviors||(this.behaviors=new Map),s=t.length,i=[];for(let o=0;o<s;++o){const s=t[o];e.has(s)?e.set(s,e.get(s)+1):(e.set(s,1),i.push(s))}if(this._isConnected){const t=this.element;for(let e=0;e<i.length;++e)i[e].bind(t,y)}}removeBehaviors(t,e=!1){const s=this.behaviors;if(null===s)return;const i=t.length,o=[];for(let n=0;n<i;++n){const i=t[n];if(s.has(i)){const t=s.get(i)-1;0===t||e?s.delete(i)&&o.push(i):s.set(i,t)}}if(this._isConnected){const t=this.element;for(let e=0;e<o.length;++e)o[e].unbind(t)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():null!==this.view&&this.view.bind(t,y);const e=this.behaviors;if(null!==e)for(const[s]of e)s.bind(t,y);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;null!==t&&t.unbind();const e=this.behaviors;if(null!==e){const t=this.element;for(const[s]of e)s.unbind(t)}}onAttributeChangedCallback(t,e,s){const i=this.definition.attributeLookup[t];void 0!==i&&i.onAttributeChangedCallback(this.element,s)}emit(t,e,s){return!!this._isConnected&&this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:e},vt),s)))}finishInitialization(){const t=this.element,e=this.boundObservables;if(null!==e){const s=Object.keys(e);for(let i=0,o=s.length;i<o;++i){const o=s[i];t[o]=e[o]}this.boundObservables=null}const s=this.definition;null===this._template&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():s.template&&(this._template=s.template||null)),null!==this._template&&this.renderTemplate(this._template),null===this._styles&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():s.styles&&(this._styles=s.styles||null)),null!==this._styles&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const e=this.element,s=mt(e)||e;null!==this.view?(this.view.dispose(),this.view=null):this.needsInitialization||v.removeChildNodes(s),t&&(this.view=t.render(e,s,e))}static forCustomElement(t){const e=t.$fastController;if(void 0!==e)return e;const s=ut.forType(t.constructor);if(void 0===s)throw new Error("Missing FASTElement definition.");return t.$fastController=new bt(t,s)}}function pt(t){return class extends t{constructor(){super(),bt.forCustomElement(this)}$emit(t,e,s){return this.$fastController.emit(t,e,s)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,e,s){this.$fastController.onAttributeChangedCallback(t,e,s)}}}const gt=Object.assign(pt(HTMLElement),{from:t=>pt(t),define:(t,e)=>new ut(t,e).define().type});function xt(t){return function(e){new ut(e,t).define()}}class wt{createCSS(){return""}createBehavior(){}}function yt(t,...e){const{styles:s,behaviors:i}=function(t,e){const s=[];let i="";const o=[];for(let n=0,r=t.length-1;n<r;++n){i+=t[n];let r=e[n];if(r instanceof wt){const t=r.createBehavior();r=r.createCSS(),t&&o.push(t)}r instanceof X||r instanceof CSSStyleSheet?(""!==i.trim()&&(s.push(i),i=""),s.push(r)):i+=r}return i+=t[t.length-1],""!==i.trim()&&s.push(i),{styles:s,behaviors:o}}(t,e),o=X.create(s);return i.length&&o.withBehaviors(...i),o}function kt(t,e,s){return{index:t,removed:e,addedCount:s}}const $t=0,Ct=1,zt=2,Ot=3;function jt(t,e,s,i,o,n){let l=0,a=0;const h=Math.min(s-e,n-o);if(0===e&&0===o&&(l=function(t,e,s){for(let i=0;i<s;++i)if(t[i]!==e[i])return i;return s}(t,i,h)),s===t.length&&n===i.length&&(a=function(t,e,s){let i=t.length,o=e.length,n=0;for(;n<s&&t[--i]===e[--o];)n++;return n}(t,i,h-l)),o+=l,n-=a,(s-=a)-(e+=l)==0&&n-o==0)return r;if(e===s){const t=kt(e,[],0);for(;o<n;)t.removed.push(i[o++]);return[t]}if(o===n)return[kt(e,[],s-e)];const c=function(t){let e=t.length-1,s=t[0].length-1,i=t[e][s];const o=[];for(;e>0||s>0;){if(0===e){o.push(zt),s--;continue}if(0===s){o.push(Ot),e--;continue}const n=t[e-1][s-1],r=t[e-1][s],l=t[e][s-1];let a;a=r<l?r<n?r:n:l<n?l:n,a===n?(n===i?o.push($t):(o.push(Ct),i=n),e--,s--):a===r?(o.push(Ot),e--,i=r):(o.push(zt),s--,i=l)}return o.reverse(),o}(function(t,e,s,i,o,n){const r=n-o+1,l=s-e+1,a=new Array(r);let h,c;for(let t=0;t<r;++t)a[t]=new Array(l),a[t][0]=t;for(let t=0;t<l;++t)a[0][t]=t;for(let s=1;s<r;++s)for(let n=1;n<l;++n)t[e+n-1]===i[o+s-1]?a[s][n]=a[s-1][n-1]:(h=a[s-1][n]+1,c=a[s][n-1]+1,a[s][n]=h<c?h:c);return a}(t,e,s,i,o,n)),d=[];let u,f=e,v=o;for(let t=0;t<c.length;++t)switch(c[t]){case $t:void 0!==u&&(d.push(u),u=void 0),f++,v++;break;case Ct:void 0===u&&(u=kt(f,[],0)),u.addedCount++,f++,u.removed.push(i[v]),v++;break;case zt:void 0===u&&(u=kt(f,[],0)),u.addedCount++,f++;break;case Ot:void 0===u&&(u=kt(f,[],0)),u.removed.push(i[v]),v++}return void 0!==u&&d.push(u),d}const St=Array.prototype.push;function Rt(t,e,s,i){const o=kt(e,s,i);let n=!1,r=0;for(let e=0;e<t.length;e++){const s=t[e];if(s.index+=r,n)continue;const i=(l=o.index,a=o.index+o.removed.length,h=s.index,c=s.index+s.addedCount,a<h||c<l?-1:a===h||c===l?0:l<h?a<c?a-h:c-h:c<a?c-l:a-l);if(i>=0){t.splice(e,1),e--,r-=s.addedCount-s.removed.length,o.addedCount+=s.addedCount-i;const l=o.removed.length+s.removed.length-i;if(o.addedCount||l){let t=s.removed;if(o.index<s.index){const e=o.removed.slice(0,s.index-o.index);St.apply(e,t),t=e}if(o.index+o.removed.length>s.index+s.addedCount){const e=o.removed.slice(s.index+s.addedCount-o.index);St.apply(t,e)}o.removed=t,s.index<o.index&&(o.index=s.index)}else n=!0}else if(o.index<s.index){n=!0,t.splice(e,0,o),e++;const i=o.addedCount-o.removed.length;s.index+=i,r+=i}}var l,a,h,c;n||t.push(o)}function Tt(t,e){let s=[];const i=function(t){const e=[];for(let s=0,i=t.length;s<i;s++){const i=t[s];Rt(e,i.index,i.removed,i.addedCount)}return e}(e);for(let e=0,o=i.length;e<o;++e){const o=i[e];1!==o.addedCount||1!==o.removed.length?s=s.concat(jt(t,o.index,o.index+o.addedCount,o.removed,0,o.removed.length)):o.removed[0]!==t[o.index]&&s.push(o)}return s}let At=!1;function Et(t,e){let s=t.index;const i=e.length;return s>i?s=i-t.addedCount:s<0&&(s=i+t.removed.length+s-t.addedCount),s<0&&(s=0),t.index=s,t}class Mt extends m{constructor(t){super(t),this.oldCollection=void 0,this.splices=void 0,this.needsQueue=!0,this.call=this.flush,Reflect.defineProperty(t,"$fastController",{value:this,enumerable:!1})}subscribe(t){this.flush(),super.subscribe(t)}addSplice(t){void 0===this.splices?this.splices=[t]:this.splices.push(t),this.needsQueue&&(this.needsQueue=!1,v.queueUpdate(this))}reset(t){this.oldCollection=t,this.needsQueue&&(this.needsQueue=!1,v.queueUpdate(this))}flush(){const t=this.splices,e=this.oldCollection;if(void 0===t&&void 0===e)return;this.needsQueue=!0,this.splices=void 0,this.oldCollection=void 0;const s=void 0===e?Tt(this.source,t):jt(this.source,0,this.source.length,e,0,e.length);this.notify(s)}}class Bt{constructor(t,e){this.target=t,this.propertyName=e}bind(t){t[this.propertyName]=this.target}unbind(){}}function Pt(t){return new C("fast-ref",Bt,t)}const Ft=t=>"function"==typeof t,It=()=>null;function Vt(t){return void 0===t?It:Ft(t)?t:()=>t}function Ht(t,e,s){const i=Ft(t)?t:()=>t,o=Vt(e),n=Vt(s);return(t,e)=>i(t,e)?o(t,e):n(t,e)}const Lt=Object.freeze({positioning:!1,recycle:!0});function Nt(t,e,s,i){t.bind(e[s],i)}function Wt(t,e,s,i){const o=Object.create(i);o.index=s,o.length=e.length,t.bind(e[s],o)}class Dt{constructor(t,e,s,i,o,n){this.location=t,this.itemsBinding=e,this.templateBinding=i,this.options=n,this.source=null,this.views=[],this.items=null,this.itemsObserver=null,this.originalContext=void 0,this.childContext=void 0,this.bindView=Nt,this.itemsBindingObserver=p.binding(e,this,s),this.templateBindingObserver=p.binding(i,this,o),n.positioning&&(this.bindView=Wt)}bind(t,e){this.source=t,this.originalContext=e,this.childContext=Object.create(e),this.childContext.parent=t,this.childContext.parentContext=this.originalContext,this.items=this.itemsBindingObserver.observe(t,this.originalContext),this.template=this.templateBindingObserver.observe(t,this.originalContext),this.observeItems(!0),this.refreshAllViews()}unbind(){this.source=null,this.items=null,null!==this.itemsObserver&&this.itemsObserver.unsubscribe(this),this.unbindAllViews(),this.itemsBindingObserver.disconnect(),this.templateBindingObserver.disconnect()}handleChange(t,e){t===this.itemsBinding?(this.items=this.itemsBindingObserver.observe(this.source,this.originalContext),this.observeItems(),this.refreshAllViews()):t===this.templateBinding?(this.template=this.templateBindingObserver.observe(this.source,this.originalContext),this.refreshAllViews(!0)):this.updateViews(e)}observeItems(t=!1){if(!this.items)return void(this.items=r);const e=this.itemsObserver,s=this.itemsObserver=p.getNotifier(this.items),i=e!==s;i&&null!==e&&e.unsubscribe(this),(i||t)&&s.subscribe(this)}updateViews(t){const e=this.childContext,s=this.views,i=this.bindView,o=this.items,n=this.template,r=this.options.recycle,l=[];let a=0,h=0;for(let c=0,d=t.length;c<d;++c){const d=t[c],u=d.removed;let f=0,v=d.index;const m=v+d.addedCount,b=s.splice(d.index,u.length),p=h=l.length+b.length;for(;v<m;++v){const t=s[v],c=t?t.firstChild:this.location;let d;r&&h>0?(f<=p&&b.length>0?(d=b[f],f++):(d=l[a],a++),h--):d=n.create(),s.splice(v,0,d),i(d,o,v,e),d.insertBefore(c)}b[f]&&l.push(...b.slice(f))}for(let t=a,e=l.length;t<e;++t)l[t].dispose();if(this.options.positioning)for(let t=0,e=s.length;t<e;++t){const i=s[t].context;i.length=e,i.index=t}}refreshAllViews(t=!1){const e=this.items,s=this.childContext,i=this.template,o=this.location,n=this.bindView;let r=e.length,l=this.views,a=l.length;if(0!==r&&!t&&this.options.recycle||(q.disposeContiguousBatch(l),a=0),0===a){this.views=l=new Array(r);for(let t=0;t<r;++t){const r=i.create();n(r,e,t,s),l[t]=r,r.insertBefore(o)}}else{let t=0;for(;t<r;++t)if(t<a){n(l[t],e,t,s)}else{const r=i.create();n(r,e,t,s),l.push(r),r.insertBefore(o)}const h=l.splice(t,a-t);for(t=0,r=h.length;t<r;++t)h[t].dispose()}}unbindAllViews(){const t=this.views;for(let e=0,s=t.length;e<s;++e)t[e].unbind()}}class Ut extends k{constructor(t,e,s){super(),this.itemsBinding=t,this.templateBinding=e,this.options=s,this.createPlaceholder=v.createBlockPlaceholder,function(){if(At)return;At=!0,p.setArrayObserverFactory((t=>new Mt(t)));const t=Array.prototype;if(t.$fastPatch)return;Reflect.defineProperty(t,"$fastPatch",{value:1,enumerable:!1});const e=t.pop,s=t.push,i=t.reverse,o=t.shift,n=t.sort,r=t.splice,l=t.unshift;t.pop=function(){const t=this.length>0,s=e.apply(this,arguments),i=this.$fastController;return void 0!==i&&t&&i.addSplice(kt(this.length,[s],0)),s},t.push=function(){const t=s.apply(this,arguments),e=this.$fastController;return void 0!==e&&e.addSplice(Et(kt(this.length-arguments.length,[],arguments.length),this)),t},t.reverse=function(){let t;const e=this.$fastController;void 0!==e&&(e.flush(),t=this.slice());const s=i.apply(this,arguments);return void 0!==e&&e.reset(t),s},t.shift=function(){const t=this.length>0,e=o.apply(this,arguments),s=this.$fastController;return void 0!==s&&t&&s.addSplice(kt(0,[e],0)),e},t.sort=function(){let t;const e=this.$fastController;void 0!==e&&(e.flush(),t=this.slice());const s=n.apply(this,arguments);return void 0!==e&&e.reset(t),s},t.splice=function(){const t=r.apply(this,arguments),e=this.$fastController;return void 0!==e&&e.addSplice(Et(kt(+arguments[0],t,arguments.length>2?arguments.length-2:0),this)),t},t.unshift=function(){const t=l.apply(this,arguments),e=this.$fastController;return void 0!==e&&e.addSplice(Et(kt(0,[],arguments.length),this)),t}}(),this.isItemsBindingVolatile=p.isVolatileBinding(t),this.isTemplateBindingVolatile=p.isVolatileBinding(e)}createBehavior(t){return new Dt(t,this.itemsBinding,this.isItemsBindingVolatile,this.templateBinding,this.isTemplateBindingVolatile,this.options)}}function qt(t,e,s=Lt){return new Ut(t,"function"==typeof e?e:()=>e,Object.assign(Object.assign({},Lt),s))}class Yt{constructor(t,e){this.target=t,this.options=e,this.source=null}bind(t){const e=this.options.property;this.shouldUpdate=p.getAccessors(t).some((t=>t.name===e)),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(r),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return void 0!==this.options.filter&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class _t extends Yt{constructor(t,e){super(t,e)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function Gt(t){return"string"==typeof t&&(t={property:t}),new C("fast-slotted",_t,t)}const Xt=yt`

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

`;const Zt=new class{constructor(){this.stylesheets=[]}css(t){-1===this.stylesheets.indexOf(t)&&this.stylesheets.push(t)}get html(){return qt((()=>this.stylesheets),(()=>G`<link href="${t=>t}" rel="stylesheet">`))}clear(){this.stylesheets=[]}};document.querySelectorAll("head link[dependency]").forEach((t=>{if("stylesheet"===t.getAttribute("rel")){const e=t.getAttribute("href");e&&Zt.css(e)}}));const Jt=G`
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

`,Kt="\n\n  .border { \n    border: var(--default-border-width) solid var(--default-border-color);\n    border-radius: var(--border-radius-md);\n  }\n  \n  .shadow {\n    box-shadow: var(--shadow-md);\n  }\n  \n  .flex-fill { flex: 1 1 auto }\n  .flex { display: flex }\n  \n  .flex-row { display: flex; flex-direction: row }\n  .flex-row.top { align-items: flex-start }\n  .flex-row.middle { align-items: center }\n  .flex-row.bottom { align-items: flex-end }\n  .flex-row.left { justify-content: flex-start }\n  .flex-row.center { justify-content: center }\n  .flex-row.right { justify-content: flex-end }\n  \n  .flex-col { display: flex; flex-direction: column }\n  .flex-col.top { justify-content: flex-start }\n  .flex-col.middle { justify-content: center }\n  .flex-col.bottom { justify-content: flex-end }\n  .flex-col.left { align-items: flex-start }\n  .flex-col.center { align-items: center }\n  .flex-col.right { align-items: flex-end }\n\n",Qt="\n\n  fast-dialog::part(control) { \n    display: flex;\n    width: auto;\n    height: auto;\n    border: none;\n    box-shadow: none;\n    background: none;\n  }\n\n",te="\n\n  h1 { font-size: var(--h1-font-size); line-height: var(--h1-line-height); margin: var(--h1-margin); }\n  h2 { font-size: var(--h2-font-size); line-height: var(--h2-line-height); margin: var(--h2-margin); }\n  h3 { font-size: var(--h3-font-size); line-height: var(--h3-line-height); margin: var(--h3-margin); }\n  h4 { font-size: var(--h4-font-size); line-height: var(--h4-line-height); margin: var(--h4-margin); }\n  h5 { font-size: var(--h5-font-size); line-height: var(--h5-line-height); margin: var(--h5-margin); }\n  h6 { font-size: var(--h6-font-size); line-height: var(--h6-line-height); margin: var(--h6-margin); }\n  sub { font-size: var(--sub-font-size); line-height: var(--sub-line-height); }\n\n  button {\n    background-color: var(--button-background-color);\n    color: var(--button-foreground-color);\n    padding: var(--button-padding);\n    border-radius: var(--button-border-radius);\n    border-color: var(--button-border-color);\n    border: 0;\n    cursor: pointer;\n  }\n  button:active {\n    transform: translateY(1px);\n  }\n  button:hover {\n    background-color: var(--button-hover-background-color);\n  }\n  button:disabled {\n    transform: none !important;\n    background-color: var(--button-disabled-background-color) !important;\n    color: var(--button-disabled-foreground-color) !important;\n    cursor: not-allowed;\n  }\n\n  button.neutral { \n    background-color: var(--button-neutral-background-color);\n    color: var(--button-neutral-foreground-color);\n  }\n  button.neutral:hover {\n    background-color: var(--button-neutral-hover-background-color);\n  }\n\n  button.primary { \n    background-color: var(--button-primary-background-color);\n    color: var(--button-primary-color);\n  }\n  button.primary:hover {\n    background-color: var(--button-primary-hover-background-color);\n  }\n\n  button.secondary { \n    background-color: var(--button-secondary-background-color);\n    color: var(--button-secondary-color);\n  }\n  button.secondary:hover {\n    background-color: var(--button-secondary-hover-background-color);\n  }\n\n  button.tertiary { \n    background-color: var(--color-tertiary-50);\n    color: var(--color-tertiary-100);\n  }\n  button.tertiary:hover {\n    background-color: var(--color-tertiary-60);\n  }\n\n",ee=document.createElement("style");ee.setAttribute("mo-layout",""),ee.innerHTML=`\n\n  body {\n    color: var(--default-foreground);\n    font-size: var(--default-font-size);\n    line-height: var(--default-line-height);\n    font-family: var(--default-font-family);\n  }\n\n  :root [fullscreen] { \n    --workspace-max-width: 100vw;\n  }\n\n  :root [center] { \n    --workspace-align-margin: 0 auto; \n  }\n\n  ${Kt}\n  ${Qt}\n  ${te}\n\n`,document.head.append(ee);const se=yt`
  ${s.styles}
  ${Kt}
  ${Qt}
  ${te}
`;var ie=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let oe=class extends gt{constructor(){super(...arguments),this.theme="neutral",this.escape=!1}handleEscape(){const t=new CustomEvent("close",{bubbles:!0});this.dispatchEvent(t)}};ie([at],oe.prototype,"theme",void 0),ie([at({mode:"boolean"})],oe.prototype,"escape",void 0),oe=ie([xt({name:"mo-alert",template:Jt,styles:[se,Xt]})],oe);const ne=yt`

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

`,re=G`

  <div part="image" ${Pt("imageRef")} class="flex" style="height: ${t=>t["image-height"]||0}">
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

`;var le=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let ae=class extends gt{constructor(){super(...arguments),this.icon=[],this.header=[],this.sub=[],this.controls=[],this.actions=[],this.content=[]}"image-urlChanged"(){this.imageRef&&(this["image-url"]?this.imageRef.style.backgroundImage=`url(${this["image-url"]})`:this.imageRef.style.backgroundImage="")}get hasContent(){for(const t of this.content){if(3!==t.nodeType)return!0;if(t.textContent.trim())return!0}return!1}connectedCallback(){super.connectedCallback(),this["image-urlChanged"]()}};le([at],ae.prototype,"image-url",void 0),le([at],ae.prototype,"image-height",void 0),le([g],ae.prototype,"icon",void 0),le([g],ae.prototype,"header",void 0),le([g],ae.prototype,"sub",void 0),le([g],ae.prototype,"controls",void 0),le([g],ae.prototype,"actions",void 0),le([g],ae.prototype,"content",void 0),ae=le([xt({name:"mo-card",template:re,styles:[se,ne]})],ae);const he=yt`
  :host { 
    display: block;
    overflow: hidden;
  }
  div { 
    position: absolute;
  }
`,ce=G`
  <div ${Pt("containerRef")} class="flex-row middle center">
    <canvas part="canvas" ${Pt("canvasRef")}></canvas>
  </div>
`;const de=new class{constructor(){this.status={}}async import(t,e=!1){const s=this.status[t];if(s?.imported)return s.lib;if(s?.importing)return void await new Promise((t=>s.pending.push((()=>t(s.lib)))));const i={imported:!1,importing:!0,pending:[],lib:void 0};this.status[t]=i,e?await this.injectScript(t):i.lib=await import(t),i.imported=!0;for(const t of i.pending)t(i.lib);return i.lib}injectScript(t){return new Promise(((e,s)=>{const i=document.createElement("script");i.src=t,i.addEventListener("load",e),i.addEventListener("error",(t=>s(t.error))),document.head.appendChild(i)}))}};var ue,fe=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let ve=ue=class extends gt{constructor(){super(...arguments),this.type="bar",this.legend=!1,this["x-label"]=!0,this["y-label"]=!0,this.fit=!0}typeChanged(){this.chart&&(this.chart.type=this.type)}get data(){return this.chart.data}get first(){return this.chart.data.datasets[0].data}set first(t){this.chart.data.datasets[0].data=t}get options(){return this.chart.options}async connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver((()=>this.handleResize())),this.resizeObserver.observe(this),this.handleResize(),await de.import(ue.script,!0),this.chart=new window.Chart(this.canvasRef,{type:this.type||"bar",data:{labels:["Red","Blue","Yellow","Green","Purple","Orange"],datasets:[{label:"# of Votes",data:[12,19,3,5,2,3],borderWidth:1}]},options:{plugins:{legend:{display:this.legend}},scales:{x:{display:this["x-label"]},y:{display:this["y-label"],beginAtZero:!0}}}})}disconnectedCallback(){super.disconnectedCallback()}handleResize(){this.fit&&(this.containerRef.style.width=`${this.offsetWidth}px`,this.containerRef.style.height=`${this.offsetHeight}px`)}};ve.script="https://cdn.jsdelivr.net/npm/chart.js",fe([at],ve.prototype,"type",void 0),fe([at({mode:"boolean"})],ve.prototype,"legend",void 0),fe([at({mode:"boolean"})],ve.prototype,"x-label",void 0),fe([at({mode:"boolean"})],ve.prototype,"y-label",void 0),fe([at({mode:"boolean"})],ve.prototype,"fit",void 0),ve=ue=fe([xt({name:"mo-chart",template:ce,styles:[se,he]})],ve);const me=yt`
  :host { 
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-x: hidden;
  }
`,be=G`
  <slot ${Gt("nodes")}></slot>
`;var pe=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let ge=class extends gt{nodesChanged(){this.handleResize?.()}get activeColumns(){const t=`columns-${s.size}`;return this.hasAttribute(t)?this[t]:this.columns||1}get activeRowHeight(){const t=`row-height-${s.size}`;return this.hasAttribute(t)?this[t]:this["row-height"]?this["row-height"]:"auto"}constructor(){super(),this.columns=1,this.nodes=[],this.handleResize=()=>{for(const t of this.nodes)1===t.nodeType&&this.setNode(t)},this.handleResize.bind(this)}connectedCallback(){super.connectedCallback(),this.handleResize(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.handleResize)}setNode(t){let e=parseInt(t.getAttribute("columns")||"1");e>this.activeColumns&&(e=this.activeColumns);const s=e/this.activeColumns*100;t.style.boxSizing="border-box",t.style.flex=`0 0 ${s}%`,t.style.height=this.activeRowHeight,t.style.overflow="hidden"}};pe([at],ge.prototype,"columns",void 0),pe([at],ge.prototype,"columns-xs",void 0),pe([at],ge.prototype,"columns-sm",void 0),pe([at],ge.prototype,"columns-md",void 0),pe([at],ge.prototype,"columns-lg",void 0),pe([at],ge.prototype,"columns-xl",void 0),pe([at],ge.prototype,"row-height",void 0),pe([at],ge.prototype,"row-height-xs",void 0),pe([at],ge.prototype,"row-height-sm",void 0),pe([at],ge.prototype,"row-height-md",void 0),pe([at],ge.prototype,"row-height-lg",void 0),pe([at],ge.prototype,"row-height-xl",void 0),pe([g],ge.prototype,"nodes",void 0),ge=pe([xt({name:"mo-columns",template:be,styles:[se,me]})],ge);const xe=yt`

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

`,we=G`
  <div part="expandable" ${Pt("expandableRef")} class="expandable">
    <div ${Pt("contentRef")} class="content">
      <slot></slot>
    </div>
  </div>
`,ye=new class{async waitForSize(t,e=10){t.offsetWidth||t.offsetHeight||await new Promise((s=>{let i;const o=new ResizeObserver((()=>{i&&clearTimeout(i),i=setTimeout((()=>{s(void 0),o.disconnect()}),e)}));o.observe(t)}))}async once(t,e,s){return new Promise((async i=>{const o=()=>{t.removeEventListener(e,o),i(void 0)};t.addEventListener(e,o),await(s?.())}))}async transition(t,e,i,o=10){if(e)for(const[s,i]of Object.entries(e))t.style[s]=i;await s.wait(o),i&&await ye.once(t,"transitionend",(async()=>{for(const[e,s]of Object.entries(i))t.style[e]=s}))}};var ke=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let $e=class extends gt{constructor(){super(...arguments),this.orientation="vertical",this.opened=!1,this["inherit-width"]=!1,this["inherit-height"]=!1,this.handleTransitionEnd=()=>{this.opened||this.setAttribute("hidden","")}}openedChanged(){if(!this.expandableRef)return;this.opened?this.open():this.close();const t=new CustomEvent("change",{bubbles:!0});this.dispatchEvent(t)}get isContentRendered(){return!!this.contentRef.offsetWidth||!!this.contentRef.offsetHeight}async connectedCallback(){super.connectedCallback?.(),await ye.waitForSize(this.contentRef),this.setDefaultDimensions(),this.openedChanged(),this.handleTransitionEnd.bind(this),this.addEventListener("transitionend",this.handleTransitionEnd),this.resizeObserver=new ResizeObserver((()=>{this.opened&&this.sync()})),this.resizeObserver.observe(this.expandableRef)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("transitionend",this.handleTransitionEnd),this.resizeObserver?.disconnect()}setDefaultDimensions(){"horizontal"===this.orientation&&(this.style.height=`${this.expandableRef.offsetHeight}px`),"vertical"===this.orientation&&(this.style.width=`${this.expandableRef.offsetWidth}px`)}async open(){this.opened?(this.removeAttribute("hidden"),this.sync()):this.opened=!0}sync(){switch(this.orientation){case"vertical":this.style.height=`${this.expandableRef.offsetHeight}px`;break;case"horizontal":this.style.width=`${this.expandableRef.offsetWidth}px`}}close(){if(this.opened)this.opened=!1;else switch(this.contentRef.style.position="relative",this.orientation){case"vertical":this.style.height="0";break;case"horizontal":this.style.width="0"}}toggle(){this.opened=!this.opened}};ke([at],$e.prototype,"orientation",void 0),ke([at({mode:"boolean"})],$e.prototype,"opened",void 0),ke([at({mode:"boolean"})],$e.prototype,"inherit-width",void 0),ke([at({mode:"boolean"})],$e.prototype,"inherit-height",void 0),$e=ke([xt({name:"mo-expandable",template:we,styles:[se,xe]})],$e);const Ce=yt`
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
`,ze=G`
  <div class="fixed" ${Pt("fixedRef")}>
    <div class="container flex-col" ${Pt("containerRef")}>
      <slot style="pointer-events: all"></slot>
    </div>
  </div>
`,Oe=yt`

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

`,je=G`
  ${Zt.html}
  
  <div part="backdrop" class="backdrop">
    <slot name="backdrop"></slot>
  </div>

  <div part="foreground" class="foreground" ${Pt("foregroundRef")}>

    <div part="banner" class="banner" ${Pt("bannerRef")}>
      <slot name="banner"></slot>
    </div>

    <div part="header" class="header flex" ${Pt("headerRef")}>
      <slot name="header"></slot>
    </div>

    <mo-workspace class="flex-fill flex-row">
      <div part="menu" class="menu flex" ${Pt("menuRef")}>
        <div ${Pt("menuContentStartRef")} tabindex="-1"></div>
        <slot name="menu"></slot>
        <div ${Pt("menuContentEndRef")} 
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
        <div ${Pt("contentRef")} tabindex="-1"></div>
        <div part="content" class="layout-content flex-fill flex-col">
          <slot></slot>
        </div>
        <div part="main-footer" class="main-footer">
          <slot name="main-footer"></slot>
        </div>
      </div>
      <div part="aside" class="aside flex" ${Pt("asideRef")}>
        <div ${Pt("asideContentStartRef")} tabindex="-1"></div>
        <slot name="aside"></slot>
        <div ${Pt("asideContentEndRef")} 
          class="focus-loop" tabindex="0" 
          ?hidden-xs="${t=>!t["aside-overlay-xs"]}"
          ?hidden-sm="${t=>!t["aside-overlay-sm"]}"
          ?hidden-md="${t=>!t["aside-overlay-md"]}"
          ?hidden-lg="${t=>!t["aside-overlay-lg"]}"
          ?hidden-xl="${t=>!t["aside-overlay-xl"]}"
          @focus="${t=>t.asideContentStartRef.focus()}"></div>
      </div>
    </mo-workspace>

    <div part="footer" class="footer flex" ${Pt("footerRef")}>
      <slot name="footer"></slot>
    </div>

  </div>

  <fast-dialog part="modals" class="modals" ${Pt("modalRef")} modal hidden>
  </fast-dialog>

  <mo-workspace part="alerts" class="alerts flex-col" ${Pt("alertRef")}>
  </mo-workspace>

  <mo-workspace part="snackbars" class="snackbars flex-col" ${Pt("snackbarRef")}>
  </mo-workspace>

`;class Se{constructor(t){this.modalRef=t,this.ref=new Map}async open(t,e){await this.close(),t.removeAttribute("hidden"),this.modalRef.replaceChildren(t),this.modalRef.show(),!1!==e?.animate&&await this.animateShow(t),this.handleCloseEvent(t);const i={options:e,listeners:[],unlock:s.lockScroll()};return this.ref.set(t,i),new Promise((t=>{i.listeners.push((e=>t(e)))}))}handleCloseEvent(t){const e=async s=>{t.removeEventListener(Se.closeEventName,e),await this.closeModal(t,s?.detail)};t.addEventListener(Se.closeEventName,e)}async animateShow(t){t&&await ye.transition(t,{transition:"none",opacity:"0",position:"fixed",transform:`translate(-50%, calc(-50% + ${window.innerHeight}px)`,top:"50%",left:"50%"},{opacity:"1",transition:"transform 0.25s ease-out",transform:"translate(-50%, -50%)"})}async animateHide(t){t&&(await ye.transition(t,void 0,{transform:`translate(-50%, calc(-50% + ${window.innerHeight}px)`,transition:"transform 0.25s ease-in"}),t.style.opacity="0")}async close(){for(const t of this.ref.keys())await this.closeModal(t,{escape:!0})}async closeModal(t,e){if(!t)return;const s=this.ref.get(t);!1!==s?.options?.animate&&await this.animateHide(t),t.setAttribute("hidden",""),this.modalRef.hide(),s?.unlock();for(const t of s?.listeners||[])t(e);this.ref.delete(t)}}Se.closeEventName="close";class Re{get visible(){return this.panelRef.classList.contains("visible")}constructor(t){this.panelRef=t,this.animate=!0,this.animateFrom="left"}async open(){this.panelRef.classList.contains("visible")||(await(document.querySelector("mo-layout")?.close?.()),s.addClass(this.panelRef,"visible"),this.releaseScroll=s.lockScroll(),this.animate&&await this.animateShow(this.panelRef))}async close(){this.panelRef.classList.contains("visible")&&(this.animate&&await this.animateHide(this.panelRef),s.removeClass(this.panelRef,"visible"),this.releaseScroll?.())}toggle(){this.visible?this.close():this.open()}async animateShow(t){t&&await ye.transition(t,{transition:"none",opacity:"0",transform:`translate(${"left"===this.animateFrom?"-":""}150%, 0)`},{opacity:"1",transition:"transform 0.25s ease-out",transform:"translate(0, 0)"})}async animateHide(t){t&&(await ye.transition(t,void 0,{transform:`translate(${"left"===this.animateFrom?"-":""}150%, 0)`,transition:"transform 0.25s ease-in"}),t.style.opacity="0")}}class Te{open(t,e,i){let o;return(i=i||{}).actions=i.actions||[{key:"close",label:"Close"}],new Promise((n=>{this.dialogRef={close(t){this.modalRef.hide(),this.modalRef.remove(),o(),n(t)}},G`
        <fast-dialog ${Pt("modalRef")} modal hidden style="position:relative;z-index:9999;display:flex;">
          <div tabindex="-1" ${Pt("modalRefStart")}></div>
          <mo-card part="card" class="no-border no-margin" style="flex: 1 1; min-width: var(--panel-width-sm); min-height: var(--panel-height-xs); background: var(--color-neutral-100)">
            
            ${e?G`<h2 slot="header">${e}</h2>`:""}
            ${e&&i?.escape?G`
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

            ${i?.actions?.length?qt((()=>i?.actions||[]),(t=>G`
                <button slot="actions" 
                  @click="${e=>t.close({key:e.key||e})}" 
                  class="${t=>t.class}">
                  ${t=>t.label||t.key||t}
                </button>`)):""}
          
          </mo-card>
        </fast-dialog>
      `.render(this.dialogRef,document.body),this.dialogRef.modalRef.show(),o=s.lockScroll(),setTimeout((()=>{this.dialogRef.modalRefStart.focus()}),20)}))}close(t){this.dialogRef?.close(t)}}Te.closeEventName="close-dialog";class Ae{constructor(t){this.panelRef=t}open(t,e="neutral",i=1e4){const o={};G`
      <mo-expandable ${Pt("expandableRef")} style="margin: var(--margin-2xs);">
        <mo-alert ${Pt("alertRef")} 
          class="shadow"
          theme="${e}" 
          escape 
          @close=${t=>this.close(t.expandableRef)}
          style="margin:0; ${s.isSize("xs")?"width: 90vw;":"width: var(--panel-width-lg);"}">
          ${t}
        </mo-alert>
      </mo-expandable>
    `.render(o,this.panelRef),setTimeout((()=>o.expandableRef.open()),50),setTimeout((()=>{o.expandableRef.parentNode&&this.close(o.expandableRef)}),i)}close(t){t.close(),setTimeout((()=>t.remove()),1e3)}}class Ee{constructor(t){this.panelRef=t}async open(t,e){return void 0===(e=e||{}).time&&(e.time=1e4),void 0===e.theme&&(e.theme="neutral"),void 0===e.escape&&(e.escape=!0),new Promise((i=>{const o={close:t=>{this.close(o.expandableRef),i(t)}};G`
      <mo-expandable class="snackbar-item" ${Pt("expandableRef")} style="margin: var(--margin-2xs);">
        <mo-alert ${Pt("alertRef")} 
          theme="${e?.theme||""}" 
          escape="${!!e?.escape}" 
          @close=${t=>this.close(t.expandableRef)} 
          style="margin:0; ${s.isSize("xs")?"width: 90vw;":"width: var(--panel-width-lg);"}">
          
          ${t}

          ${e?.actions?.length?qt((()=>e?.actions||[]),(t=>G`
              <button
                @click="${e=>t.close({key:e.key||e})}" 
                class="${t=>t.class}">
                ${t=>t.label||t.key||t}
              </button>`)):""}

        </mo-alert>
      </mo-expandable>
      `.render(o,this.panelRef),setTimeout((()=>o.expandableRef.open()),20),setTimeout((()=>{o.expandableRef.parentNode&&this.close(o.expandableRef)}),e?.time||1e3)}))}close(t){t.close(),setTimeout((()=>t.remove()),1e3)}}class Me{constructor(){this.cache=[]}set(t,e){const i=!e;e=e||document.body;const o={};return G`
      <mo-lock ${Pt("lockRef")} message="${t||""}"></mo-lock>
    `.render(o,e),this.cache.push(o.lockRef),e.$lock={position:e.style.position,overflow:e.style.overflow,zIndex:e.getAttribute("zIndex")||"",releaseScroll:s.lockScroll(e)},i&&(o.lockRef.style.position="fixed",o.lockRef.style.zIndex=9999),e.style.position="relative",e.style.overflow="hidden",e.setAttribute("z-index","-1"),e.setAttribute("aria-hidden","true"),e.setAttribute("inert",""),o.lockRef}remove(t){if(!t){for(;this.cache.length;){const t=this.cache.shift();this.remove(t)}return}const e=t.parentNode;t.remove();const s=this.cache.findIndex((e=>e===t));s>-1&&this.cache.splice(s,1),e&&(e.$lock.releaseScroll(),e.style.position=e.$lock.position,e.style.overflow=e.$lock.overflow,e.$lock.zIndex?e.setAttribute("z-index",e.$lock.zIndex):e.removeAttribute("z-index"),e.removeAttribute("aria-hidden"),e.removeAttribute("inert"))}}const Be=new Me;var Pe=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Fe,Ie=class extends gt{constructor(){super(...arguments),this.center=!1,this.fullscreen=!1,this["sticky-header"]=!1,this["sticky-footer"]=!1,this["menu-overlay-xs"]=!1,this["menu-overlay-sm"]=!1,this["menu-overlay-md"]=!1,this["menu-overlay-lg"]=!1,this["menu-overlay-xl"]=!1,this["aside-overlay-xs"]=!1,this["aside-overlay-sm"]=!1,this["aside-overlay-md"]=!1,this["aside-overlay-lg"]=!1,this["aside-overlay-xl"]=!1,this.handleResize=()=>{for(const t of s.sizes)s.isSize(t)&&(s.toggleAttribute(this.menuRef,"overlay",this[`menu-overlay-${t}`]),s.toggleAttribute(this.asideRef,"overlay",this[`aside-overlay-${t}`]))}}"sticky-headerChanged"(){this.headerRef&&(this["sticky-header"]?s.addClass(this.headerRef,"sticky"):s.removeClass(this.headerRef,"sticky"))}"sticky-footerChanged"(){this.footerRef&&(this["sticky-footer"]?s.addClass(this.footerRef,"sticky"):s.removeClass(this.footerRef,"sticky"))}get router(){return this.querySelector("mo-router")}static get styles(){return se}connectedCallback(){super.connectedCallback?.(),Fe||(Fe=this),this.modal=new Se(this.modalRef),this.aside=new Re(this.asideRef),this.aside.animateFrom="right",this.menu=new Re(this.menuRef),this.dialog=new Te,this.alert=new Ae(this.alertRef),this.snackbar=new Ee(this.snackbarRef),this.lock=Be,this["sticky-headerChanged"](),this["sticky-footerChanged"](),s.sync(this.foregroundRef),this.handleResize.bind(this),this.handleResize(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){super.disconnectedCallback?.(),s.unsync(this.foregroundRef),window.removeEventListener("resize",this.handleResize)}async close(){await this.modal.close(),await this.menu.close(),await this.aside.close()}};Pe([at({mode:"boolean"})],Ie.prototype,"center",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"fullscreen",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"sticky-header",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"sticky-footer",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"menu-overlay-xs",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"menu-overlay-sm",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"menu-overlay-md",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"menu-overlay-lg",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"menu-overlay-xl",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"aside-overlay-xs",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"aside-overlay-sm",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"aside-overlay-md",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"aside-overlay-lg",void 0),Pe([at({mode:"boolean"})],Ie.prototype,"aside-overlay-xl",void 0),Ie=Pe([xt({name:"mo-layout",template:je,styles:[se,Oe]})],Ie);var Ve=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let He=class extends gt{constructor(){super(...arguments),this.handleViewChange=()=>{const t=this.getTop();this.fixedRef.style.top=`${t}px`,this.fixedRef.style.height=this.getBottom()-t+"px"},this.handleChildChange=()=>{this.containerRef.offsetWidth&&(this.style.width=`${this.containerRef.offsetWidth}px`,this.fixedRef.style.width=`${this.containerRef.offsetWidth}px`)}}connectedCallback(){super.connectedCallback?.(),window.addEventListener("scroll",this.handleViewChange),this.resizeObserver=new ResizeObserver((()=>this.handleViewChange())),this.resizeObserver.observe(document.body),this.resizeObserver.observe(Fe.bannerRef),this.resizeObserver.observe(Fe.headerRef),this.resizeObserver.observe(Fe.footerRef),this.resizeObserver.observe(this),this.containerResizeObserver=new ResizeObserver((()=>this.handleChildChange())),this.containerResizeObserver.observe(this.containerRef),setTimeout((()=>{this.handleViewChange(),this.handleChildChange()}))}disconnectedCallback(){super.disconnectedCallback?.(),window.removeEventListener("scroll",this.handleViewChange),this.resizeObserver.disconnect()}getTop(){const t=Fe.bannerRef.getBoundingClientRect().bottom,e=Fe.headerRef.getBoundingClientRect().bottom;return Math.max(0,t,e)}getBottom(){const t=Fe.footerRef.getBoundingClientRect().top;return Math.min(window.innerHeight,t)}};He=Ve([xt({name:"mo-fixed-content",template:ze,styles:[se,Ce]})],He);const Le=yt`

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

`,Ne=G`
  <mo-workspace class="flex-row middle">
    <slot></slot>
  </mo-workspace>
`;var We=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let De=class extends gt{};De=We([xt({name:"mo-footer",template:Ne,styles:[se,Le]})],De);const Ue=yt`

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

`,qe=G`
  ${Zt.html}
  
  <mo-workspace ${Pt("workspaceRef")} class="flex-row middle">

    <button part="menu" ${Pt("menuRef")} 
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

`;var Ye=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let _e=class extends gt{constructor(){super(...arguments),this.menu=!1,this["menu-xs"]=!1,this["menu-sm"]=!1,this["menu-md"]=!1,this["menu-lg"]=!1,this["menu-xl"]=!1}handleMenuClick(){const t=new CustomEvent("menu",{bubbles:!0});this.dispatchEvent(t)}connectedCallback(){super.connectedCallback?.(),s.sync(this.workspaceRef)}disconnectedCallback(){super.disconnectedCallback?.(),s.unsync(this.workspaceRef)}isMenuHidden(t){const e=`menu-${t}`;return this.hasAttribute(e)?this[e]:this.menu}};Ye([at({mode:"boolean"})],_e.prototype,"menu",void 0),Ye([at({mode:"boolean"})],_e.prototype,"menu-xs",void 0),Ye([at({mode:"boolean"})],_e.prototype,"menu-sm",void 0),Ye([at({mode:"boolean"})],_e.prototype,"menu-md",void 0),Ye([at({mode:"boolean"})],_e.prototype,"menu-lg",void 0),Ye([at({mode:"boolean"})],_e.prototype,"menu-xl",void 0),_e=Ye([xt({name:"mo-header",template:qe,styles:[se,Ue]})],_e);const Ge=yt`
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
`,Xe=G`
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
`,Ze=yt`
  :host {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--menu-background-color);
    color: var(--menu-foreground-color);
  }
`,Je=G`
  <slot></slot>
`;var Ke=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Qe=class extends gt{constructor(){super(...arguments),this.single=!1,this.handleSelected=t=>{this.processSelected(t)},this.handleOpened=t=>{this.processOpened(t)}}connectedCallback(){super.connectedCallback?.(),this.handleSelected.bind(this),this.addEventListener("selected",this.handleSelected),this.handleOpened.bind(this),this.addEventListener("opened",this.handleOpened)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("selected",this.handleSelected),this.removeEventListener("opened",this.handleOpened)}processSelected(t){const e=this.querySelectorAll("mo-menu-item");if(e?.length&&t.target?.hasAttribute("activate"))for(const t of e)t!==this&&t.hasAttribute("active")&&t.removeAttribute("active")}processOpened(t){if(this.single)for(const e of this.querySelectorAll(":not(mo-menu-item) mo-menu-item"))e!==t.target&&e.hasAttribute("opened")&&e.removeAttribute("opened")}};Ke([at({mode:"boolean"})],Qe.prototype,"single",void 0),Qe=Ke([xt({name:"mo-menu",template:Je,styles:[se,Ze]})],Qe);var ts=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let es=class extends Qe{constructor(){super(...arguments),this.slotNodes=[],this.expanded=!0}expandedChanged(){return this.expanded?this.maximize():this.minimize()}processSelected(t){super.processSelected(t);for(const t of s.sizes)s.isSize(t)&&Fe[`menu-overlay-${t}`]&&Fe.menu.close()}processOpened(t){super.processOpened(t),this.expanded||(this.expanded=!0)}maximize(){const t=this.querySelectorAll("mo-menu-item");for(const e of t)e.setAttribute("expanded","")}minimize(){const t=this.querySelectorAll("mo-menu-item");for(const e of t)e.removeAttribute("opened"),e.removeAttribute("expanded")}};ts([g],es.prototype,"slotNodes",void 0),ts([at({mode:"boolean"})],es.prototype,"expanded",void 0),es=ts([xt({name:"mo-layout-menu",template:Xe,styles:[se,Ge]})],es);const ss=yt`
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
`,is=G`
  <slot></slot>
  
  ${Ht((t=>"progress"===t.mode),G`
    <div>${t=>t.message}</div>
    <fast-progress appearance="neutral"></fast-progress>
  `)}

  ${Ht((t=>"progress"!==t.mode),G`
    <mo-alert theme="${t=>t.mode}" style="flex: 0 0">${t=>t.message}</mo-alert>
  `)}

`;var os=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let ns=class extends gt{constructor(){super(...arguments),this.message="",this.mode="progress"}};os([at],ns.prototype,"message",void 0),os([at],ns.prototype,"mode",void 0),ns=os([xt({name:"mo-lock",template:is,styles:[se,ss]})],ns);const rs=yt`

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

`,ls=G`
  ${Zt.html}

  <button ${Pt("menuItemRef")} part="menu-item" class="line neutral flex-row middle" @click="${t=>t.handleClick()}">

    <div class="icon" ${Pt("iconRef")}>
      <slot name="icon" ${Pt("iconSlot")}></slot>
    </div>

    ${Ht((t=>t.expanded),G`
    <div class="name flex-fill flex-row middle left" ${Pt("nameRef")}>
      <slot></slot>
    </div>
    `)}

    ${Ht((t=>t.expanded),G`
    <div class="expand" ${Pt("expandRef")}>
      <i class="fa-solid fa-chevron-down"></i>
    </div>
    `)}

  </button>

  <mo-expandable inherit-width part="children" class="children" ${Pt("childrenRef")} @change="${t=>t.opened=t.childrenRef.opened}">
    <slot name="children" ${Pt("childrenSlot")}></slot>
  </mo-expandable>

`;var as=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let hs=class extends gt{constructor(){super(...arguments),this.activate=!1,this.active=!1,this.opened=!1,this.expanded=!0}activeChanged(){this.menuItemRef&&(this.active?(s.addClass(this.menuItemRef,"active"),this.dispatchEvent(new CustomEvent("selected",{bubbles:!0}))):s.removeClass(this.menuItemRef,"active"))}openedChanged(){this.menuItemRef&&(this.opened?(s.addClass(this.expandRef,"open"),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0})),this.childrenRef.opened||this.childrenRef.setAttribute("opened","")):(s.removeClass(this.expandRef,"open"),this.childrenRef.opened&&this.childrenRef.removeAttribute("opened")))}get hasChildren(){return this.childrenSlot.assignedNodes().length}get hasIcon(){return this.iconSlot?.assignedNodes().length}connectedCallback(){super.connectedCallback?.(),this.activeChanged(),this.openedChanged(),this.hasIcon||this.iconRef.setAttribute("hidden",""),this.hasChildren||this.expandRef.setAttribute("hidden",""),s.sync(this)}disconnectedCallback(){super.disconnectedCallback(),s.unsync(this)}handleClick(){this.hasChildren?this.handleResize():this.handleSelect()}handleResize(){this.childrenRef.opened?(this.childrenRef.close(),this.dispatchEvent(new CustomEvent("closed",{bubbles:!0}))):(this.childrenRef.open(),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0})))}handleSelect(){this.activate&&(this.active=!0),this.dispatchEvent(new CustomEvent("select",{bubbles:!0}))}};as([at({mode:"boolean"})],hs.prototype,"activate",void 0),as([at({mode:"boolean"})],hs.prototype,"active",void 0),as([at({mode:"boolean"})],hs.prototype,"opened",void 0),as([at({mode:"boolean"})],hs.prototype,"expanded",void 0),hs=as([xt({name:"mo-menu-item",template:ls,styles:[se,rs]})],hs);const cs=yt`
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
`,ds=G`
  ${Zt.html}
  <mo-card class="no-border no-margin flex-fill">
    <slot name="header" slot="header"></slot>
    <button class="neutral" slot="controls" @click="${()=>Fe.modal.close()}">
      <i class="fa-solid fa-x"></i>
    </button>
    <mo-scrollable class="flex-fill">
      <slot></slot>
    </mo-scrollable>
    <div ?hidden="${t=>!t.actionNodes?.length}">
      <slot name="actions" slot="actions" ${Gt("actionNodes")}></slot>
    </div>
  </mo-card>
`,us=yt`
  :host {
    display: block;
  }
`,fs=G`
  <slot></slot>
`;var vs=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let ms=class extends gt{constructor(){super(...arguments),this.handleResize=()=>{let t,e;s.isSize("xs")?t=void 0===this["width-xs"]?this.width:this["width-xs"]:s.isSize("sm")?t=void 0===this["width-sm"]?this.width:this["width-sm"]:s.isSize("md")?t=void 0===this["width-md"]?this.width:this["width-md"]:s.isSize("lg")?t=void 0===this["width-lg"]?this.width:this["width-lg"]:s.isSize("xl")&&(t=void 0===this["width-xl"]?this.width:this["width-xl"]),this.style.width=t||"",s.isSize("xs")?e=void 0===this["height-xs"]?this.height:this["height-xs"]:s.isSize("sm")?e=void 0===this["height-sm"]?this.height:this["height-sm"]:s.isSize("md")?e=void 0===this["height-md"]?this.height:this["height-md"]:s.isSize("lg")?e=void 0===this["height-lg"]?this.height:this["height-lg"]:s.isSize("xl")&&(e=void 0===this["height-xl"]?this.height:this["height-xl"]),this.style.height=e||""}}widthChanged(){this.handleResize()}"width-xsChanged"(){this.handleResize()}"width-smChanged"(){this.handleResize()}"width-mdChanged"(){this.handleResize()}"width-lgChanged"(){this.handleResize()}"width-xlChanged"(){this.handleResize()}heightChanged(){this.handleResize()}"height-xsChanged"(){this.handleResize()}"height-smChanged"(){this.handleResize()}"height-mdChanged"(){this.handleResize()}"height-lgChanged"(){this.handleResize()}"height-xlChanged"(){this.handleResize()}connectedCallback(){super.connectedCallback?.(),this.handleResize.bind(this),this.handleResize(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){super.disconnectedCallback?.(),window.removeEventListener("resize",this.handleResize)}};vs([at],ms.prototype,"width",void 0),vs([at],ms.prototype,"width-xs",void 0),vs([at],ms.prototype,"width-sm",void 0),vs([at],ms.prototype,"width-md",void 0),vs([at],ms.prototype,"width-lg",void 0),vs([at],ms.prototype,"width-xl",void 0),vs([at],ms.prototype,"height",void 0),vs([at],ms.prototype,"height-xs",void 0),vs([at],ms.prototype,"height-sm",void 0),vs([at],ms.prototype,"height-md",void 0),vs([at],ms.prototype,"height-lg",void 0),vs([at],ms.prototype,"height-xl",void 0),ms=vs([xt({name:"mo-screen",template:fs,styles:[us]})],ms);var bs=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let ps=class extends ms{connectedCallback(){super.connectedCallback(),s.sync(this)}disconnectedCallback(){super.disconnectedCallback(),s.unsync(this)}};ps=bs([xt({name:"mo-modal-panel",template:ds,styles:[se,cs]})],ps);const gs=yt`

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

`,xs=G`
  <div class="visual flex-fill flex-col center middle">
    <slot></slot>
  </div>
`;var ws=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let ys=class extends gt{};ys=ws([xt({name:"mo-placeholder",template:xs,styles:[se,gs]})],ys);const ks=yt`
  :host { 
    position: relative;
  }
  [part="scrollable"] { 
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: none;
  }
`,$s=G`
  <div part="scrollable" ${Pt("scrollableRef")}>
    <slot></slot>
  </div>
`;var Cs=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let zs=class extends gt{constructor(){super(...arguments),this.scrollLocked=!1,this.lastScrollPos=0}connectedCallback(){super.connectedCallback?.(),s.addClass(this,"no-scroll"),s.addClass(this.scrollableRef,"no-scroll"),this.scrollLocked=!0,this.resizeObserver=new ResizeObserver((()=>{this.scrollableRef.style.width=`${this.offsetWidth}px`,this.scrollableRef.style.height=`${this.offsetHeight}px`,this.scrollLocked&&setTimeout((()=>this.unlock()),10)})),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback?.(),s.removeClass(this,"no-scroll"),s.removeClass(this.scrollableRef,"no-scroll"),this.scrollLocked=!0,this.lastScrollPos=this.scrollableRef.scrollTop,this.resizeObserver.disconnect()}unlock(){s.removeClass(this,"no-scroll"),s.removeClass(this.scrollableRef,"no-scroll"),this.scrollableRef.scrollTop=this.lastScrollPos,this.scrollLocked=!1}};zs=Cs([xt({name:"mo-scrollable",template:$s,styles:[se,ks]})],zs);const Os=yt`
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
`,js=G`
  <button @click=${t=>t.go()} class="primary">
    <slot></slot>
  </button>
`;var Ss=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Rs=class extends gt{go(){const t=document.querySelector("mo-layout");t?.contentRef.focus(),window.scrollTo(0,0)}};Rs=Ss([xt({name:"mo-skip-to-content",template:js,styles:[se,Os]})],Rs);const Ts=yt`
  :host { 
    box-sizing: border-box;
    width: 100vw;
    max-width: var(--workspace-max-width);
    margin: var(--workspace-align-margin);
  }
`,As=G`<slot></slot>`;var Es=function(t,e,s,i){for(var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Ms=class extends gt{};Ms=Es([xt({name:"mo-workspace",template:As,styles:[Ts]})],Ms),s.sync(document.body,{width:!0,orientation:!0});export{Me as LockInterface,oe as MockAlertElement,ae as MockCardElement,ve as MockChartElement,ge as MockColumnsElement,$e as MockExpandableElement,He as MockFixedContentElement,De as MockFooterElement,_e as MockHeaderElement,Ie as MockLayoutElement,es as MockLayoutMenuElement,Ms as MockLayoutWorkspaceElement,ns as MockLockElement,Qe as MockMenuElement,hs as MockMenuItemElement,ps as MockModalPanelElement,ys as MockPlaceholderElement,ms as MockScreenElement,zs as MockScrollableElement,Rs as MockSkipToContentElement,yt as css,Zt as dependency,se as globalStyles,G as html,Fe as layout,Be as lock,Pt as ref,qt as repeat,s as screen,Gt as slotted,Ht as when};
