var t;!function(t){t.landscape="landscape",t.portrait="portrait"}(t||(t={}));class e{get size(){return this.current.size}constructor(){this.elements=new Map,this.current={width:document.body.clientWidth,orientation:t.landscape,size:"md",sizing:{}},this.sizes=["xs","sm","md","lg","xl"],this.styles="\n    :root {\n      --screen-xs: 576px;\n      --screen-sm: 768px;\n      --screen-md: 992px;\n      --screen-lg: 1140px;\n      --screen-xl: 99999px;\n    }\n    [hidden] { display: none !important }\n    .screen-xs [hidden-xs], .screen-xs[hidden-xs] { display: none !important }\n    .screen-sm [hidden-sm], .screen-sm[hidden-sm] { display: none !important }\n    .screen-md [hidden-md], .screen-md[hidden-md] { display: none !important }\n    .screen-lg [hidden-lg], .screen-lg[hidden-lg] { display: none !important }\n    .screen-xl [hidden-xl], .screen-xl[hidden-xl] { display: none !important }\n    .no-pad { padding: 0 }\n    .no-margin { margin: 0 }\n    .no-border { border: 0 }\n    .no-scroll, .no-scroll *:not(.yes-scroll) {\n      overscroll-behavior: none !important;\n      overflow: hidden !important;\n    }\n  ",window.addEventListener("resize",(()=>{this.trackWidth(),this.update()})),window.screen.orientation.addEventListener("change",(()=>{this.trackOrientation(),this.update()}))}init(){this.initializeSizing(),this.trackWidth(),this.trackOrientation()}initializeSizing(){for(const t of this.sizes)this.current.sizing[t]=this.getSizeFromCss(t)}getSizeFromCss(t){return parseInt(getComputedStyle(document.body).getPropertyValue(`--screen-${t}`).replace("px",""))}trackWidth(){this.current.width=document.body.clientWidth;for(const t of this.sizes)if(this.current.width<this.current.sizing[t]){this.current.size=t;break}}trackOrientation(){if(["landscape","landscape-primary","landscape-secondary"].indexOf(window.screen.orientation.type)>-1)return void(this.current.orientation=t.landscape);["portrait","portrait-primary","portrait-secondary"].indexOf(window.screen.orientation.type)>-1?this.current.orientation=t.portrait:this.current.orientation=void 0}isSize(t){return this.current.size===t}sync(t,e={width:!0}){this.elements.has(t)||(this.elements.set(t,e),this.updateElement(t))}unsync(t){this.elements.delete(t),this.clearElement(t)}clear(){for(const t of this.elements.keys())this.updateElement(t)}clearElement(e){for(const t of this.sizes)this.removeClass(e,`screen-${t}`);this.removeClass(e,t.landscape),this.removeClass(e,t.portrait)}update(){for(const t of this.elements.keys())this.updateElement(t)}updateElement(e){const i=this.elements.get(e);if(i?.width)for(const t of this.sizes)this.current.size===t?this.addClass(e,`screen-${t}`):this.removeClass(e,`screen-${t}`);if(i?.orientation)switch(this.current.orientation){case t.landscape:this.addClass(e,t.landscape),this.removeClass(e,t.portrait);break;case t.portrait:this.addClass(e,t.portrait),this.removeClass(e,t.landscape);break;default:this.removeClass(e,t.portrait),this.removeClass(e,t.landscape)}}lockScroll(t){return(t=t||document.body)&&this.addClass(t,"no-scroll"),()=>{this.removeClass(document.body,"no-scroll"),t&&this.removeClass(t,"no-scroll")}}addAttribute(t,e,i=""){t.setAttribute(e,i)}removeAttribute(t,e){t.removeAttribute(e)}toggleAttribute(t,e,i,s=""){void 0===i&&(i=t.hasAttribute(e)),i?this.addAttribute(t,e,s):this.removeAttribute(t,e)}addClass(t,e){t.classList.contains(e)||t.classList.add(e)}removeClass(t,e){for(;t.classList.contains(e);)t.classList.remove(e)}async wait(t=1){return await new Promise((e=>setTimeout((()=>e(void 0)),t)))}}let i=window?.$screen;if(!i){i=new e,window.$screen=i;const t=document.createElement("style");t.setAttribute("mo-screen",""),t.innerHTML=i.styles,document.head.appendChild(t),i.init()}const s=function(){if("undefined"!=typeof globalThis)return globalThis;if("undefined"!=typeof global)return global;if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;try{return new Function("return this")()}catch(t){return{}}}();void 0===s.trustedTypes&&(s.trustedTypes={createPolicy:(t,e)=>e});const o={configurable:!1,enumerable:!1,writable:!1};void 0===s.FAST&&Reflect.defineProperty(s,"FAST",Object.assign({value:Object.create(null)},o));const n=s.FAST;if(void 0===n.getById){const t=Object.create(null);Reflect.defineProperty(n,"getById",Object.assign({value(e,i){let s=t[e];return void 0===s&&(s=i?t[e]=i():null),s}},o))}const r=Object.freeze([]);function l(){const t=new WeakMap;return function(e){let i=t.get(e);if(void 0===i){let s=Reflect.getPrototypeOf(e);for(;void 0===i&&null!==s;)i=t.get(s),s=Reflect.getPrototypeOf(s);i=void 0===i?[]:i.slice(0),t.set(e,i)}return i}}const a=s.FAST.getById(1,(()=>{const t=[],e=[];function i(){if(e.length)throw e.shift()}function o(t){try{t.call()}catch(t){e.push(t),setTimeout(i,0)}}function n(){let e=0;for(;e<t.length;)if(o(t[e]),e++,e>1024){for(let i=0,s=t.length-e;i<s;i++)t[i]=t[i+e];t.length-=e,e=0}t.length=0}return Object.freeze({enqueue:function(e){t.length<1&&s.requestAnimationFrame(n),t.push(e)},process:n})})),c=s.trustedTypes.createPolicy("fast-html",{createHTML:t=>t});let h=c;const d=`fast-${Math.random().toString(36).substring(2,8)}`,u=`${d}{`,f=`}${d}`,v=Object.freeze({supportsAdoptedStyleSheets:Array.isArray(document.adoptedStyleSheets)&&"replace"in CSSStyleSheet.prototype,setHTMLPolicy(t){if(h!==c)throw new Error("The HTML policy can only be set once.");h=t},createHTML:t=>h.createHTML(t),isMarker:t=>t&&8===t.nodeType&&t.data.startsWith(d),extractDirectiveIndexFromMarker:t=>parseInt(t.data.replace(`${d}:`,"")),createInterpolationPlaceholder:t=>`${u}${t}${f}`,createCustomAttributePlaceholder(t,e){return`${t}="${this.createInterpolationPlaceholder(e)}"`},createBlockPlaceholder:t=>`\x3c!--${d}:${t}--\x3e`,queueUpdate:a.enqueue,processUpdates:a.process,nextUpdate:()=>new Promise(a.enqueue),setAttribute(t,e,i){null==i?t.removeAttribute(e):t.setAttribute(e,i)},setBooleanAttribute(t,e,i){i?t.setAttribute(e,""):t.removeAttribute(e)},removeChildNodes(t){for(let e=t.firstChild;null!==e;e=t.firstChild)t.removeChild(e)},createTemplateWalker:t=>document.createTreeWalker(t,133,null,!1)});class m{constructor(t,e){this.sub1=void 0,this.sub2=void 0,this.spillover=void 0,this.source=t,this.sub1=e}has(t){return void 0===this.spillover?this.sub1===t||this.sub2===t:-1!==this.spillover.indexOf(t)}subscribe(t){const e=this.spillover;if(void 0===e){if(this.has(t))return;if(void 0===this.sub1)return void(this.sub1=t);if(void 0===this.sub2)return void(this.sub2=t);this.spillover=[this.sub1,this.sub2,t],this.sub1=void 0,this.sub2=void 0}else{-1===e.indexOf(t)&&e.push(t)}}unsubscribe(t){const e=this.spillover;if(void 0===e)this.sub1===t?this.sub1=void 0:this.sub2===t&&(this.sub2=void 0);else{const i=e.indexOf(t);-1!==i&&e.splice(i,1)}}notify(t){const e=this.spillover,i=this.source;if(void 0===e){const e=this.sub1,s=this.sub2;void 0!==e&&e.handleChange(i,t),void 0!==s&&s.handleChange(i,t)}else for(let s=0,o=e.length;s<o;++s)e[s].handleChange(i,t)}}class p{constructor(t){this.subscribers={},this.sourceSubscribers=null,this.source=t}notify(t){var e;const i=this.subscribers[t];void 0!==i&&i.notify(t),null===(e=this.sourceSubscribers)||void 0===e||e.notify(t)}subscribe(t,e){var i;if(e){let i=this.subscribers[e];void 0===i&&(this.subscribers[e]=i=new m(this.source)),i.subscribe(t)}else this.sourceSubscribers=null!==(i=this.sourceSubscribers)&&void 0!==i?i:new m(this.source),this.sourceSubscribers.subscribe(t)}unsubscribe(t,e){var i;if(e){const i=this.subscribers[e];void 0!==i&&i.unsubscribe(t)}else null===(i=this.sourceSubscribers)||void 0===i||i.unsubscribe(t)}}const b=n.getById(2,(()=>{const t=/(:|&&|\|\||if)/,e=new WeakMap,i=v.queueUpdate;let s,o=t=>{throw new Error("Must call enableArrayObservation before observing arrays.")};function n(t){let i=t.$fastController||e.get(t);return void 0===i&&(Array.isArray(t)?i=o(t):e.set(t,i=new p(t))),i}const r=l();class a{constructor(t){this.name=t,this.field=`_${t}`,this.callback=`${t}Changed`}getValue(t){return void 0!==s&&s.watch(t,this.name),t[this.field]}setValue(t,e){const i=this.field,s=t[i];if(s!==e){t[i]=e;const o=t[this.callback];"function"==typeof o&&o.call(t,s,e),n(t).notify(this.name)}}}class c extends m{constructor(t,e,i=!1){super(t,e),this.binding=t,this.isVolatileBinding=i,this.needsRefresh=!0,this.needsQueue=!0,this.first=this,this.last=null,this.propertySource=void 0,this.propertyName=void 0,this.notifier=void 0,this.next=void 0}observe(t,e){this.needsRefresh&&null!==this.last&&this.disconnect();const i=s;s=this.needsRefresh?this:void 0,this.needsRefresh=this.isVolatileBinding;const o=this.binding(t,e);return s=i,o}disconnect(){if(null!==this.last){let t=this.first;for(;void 0!==t;)t.notifier.unsubscribe(this,t.propertyName),t=t.next;this.last=null,this.needsRefresh=this.needsQueue=!0}}watch(t,e){const i=this.last,o=n(t),r=null===i?this.first:{};if(r.propertySource=t,r.propertyName=e,r.notifier=o,o.subscribe(this,e),null!==i){if(!this.needsRefresh){let e;s=void 0,e=i.propertySource[i.propertyName],s=this,t===e&&(this.needsRefresh=!0)}i.next=r}this.last=r}handleChange(){this.needsQueue&&(this.needsQueue=!1,i(this))}call(){null!==this.last&&(this.needsQueue=!0,this.notify(this))}records(){let t=this.first;return{next:()=>{const e=t;return void 0===e?{value:void 0,done:!0}:(t=t.next,{value:e,done:!1})},[Symbol.iterator]:function(){return this}}}}return Object.freeze({setArrayObserverFactory(t){o=t},getNotifier:n,track(t,e){void 0!==s&&s.watch(t,e)},trackVolatile(){void 0!==s&&(s.needsRefresh=!0)},notify(t,e){n(t).notify(e)},defineProperty(t,e){"string"==typeof e&&(e=new a(e)),r(t).push(e),Reflect.defineProperty(t,e.name,{enumerable:!0,get:function(){return e.getValue(this)},set:function(t){e.setValue(this,t)}})},getAccessors:r,binding(t,e,i=this.isVolatileBinding(t)){return new c(t,e,i)},isVolatileBinding:e=>t.test(e.toString())})}));function g(t,e){b.defineProperty(t,e)}const x=n.getById(3,(()=>{let t=null;return{get:()=>t,set(e){t=e}}}));class w{constructor(){this.index=0,this.length=0,this.parent=null,this.parentContext=null}get event(){return x.get()}get isEven(){return this.index%2==0}get isOdd(){return this.index%2!=0}get isFirst(){return 0===this.index}get isInMiddle(){return!this.isFirst&&!this.isLast}get isLast(){return this.index===this.length-1}static setEvent(t){x.set(t)}}b.defineProperty(w.prototype,"index"),b.defineProperty(w.prototype,"length");const y=Object.seal(new w);class k{constructor(){this.targetIndex=0}}class $ extends k{constructor(){super(...arguments),this.createPlaceholder=v.createInterpolationPlaceholder}}class C extends k{constructor(t,e,i){super(),this.name=t,this.behavior=e,this.options=i}createPlaceholder(t){return v.createCustomAttributePlaceholder(this.name,t)}createBehavior(t){return new this.behavior(t,this.options)}}function O(t,e){this.source=t,this.context=e,null===this.bindingObserver&&(this.bindingObserver=b.binding(this.binding,this,this.isBindingVolatile)),this.updateTarget(this.bindingObserver.observe(t,e))}function z(t,e){this.source=t,this.context=e,this.target.addEventListener(this.targetName,this)}function j(){this.bindingObserver.disconnect(),this.source=null,this.context=null}function S(){this.bindingObserver.disconnect(),this.source=null,this.context=null;const t=this.target.$fastView;void 0!==t&&t.isComposed&&(t.unbind(),t.needsBindOnly=!0)}function R(){this.target.removeEventListener(this.targetName,this),this.source=null,this.context=null}function T(t){v.setAttribute(this.target,this.targetName,t)}function E(t){v.setBooleanAttribute(this.target,this.targetName,t)}function A(t){if(null==t&&(t=""),t.create){this.target.textContent="";let e=this.target.$fastView;void 0===e?e=t.create():this.target.$fastTemplate!==t&&(e.isComposed&&(e.remove(),e.unbind()),e=t.create()),e.isComposed?e.needsBindOnly&&(e.needsBindOnly=!1,e.bind(this.source,this.context)):(e.isComposed=!0,e.bind(this.source,this.context),e.insertBefore(this.target),this.target.$fastView=e,this.target.$fastTemplate=t)}else{const e=this.target.$fastView;void 0!==e&&e.isComposed&&(e.isComposed=!1,e.remove(),e.needsBindOnly?e.needsBindOnly=!1:e.unbind()),this.target.textContent=t}}function M(t){this.target[this.targetName]=t}function P(t){const e=this.classVersions||Object.create(null),i=this.target;let s=this.version||0;if(null!=t&&t.length){const o=t.split(/\s+/);for(let t=0,n=o.length;t<n;++t){const n=o[t];""!==n&&(e[n]=s,i.classList.add(n))}}if(this.classVersions=e,this.version=s+1,0!==s){s-=1;for(const t in e)e[t]===s&&i.classList.remove(t)}}class B extends ${constructor(t){super(),this.binding=t,this.bind=O,this.unbind=j,this.updateTarget=T,this.isBindingVolatile=b.isVolatileBinding(this.binding)}get targetName(){return this.originalTargetName}set targetName(t){if(this.originalTargetName=t,void 0!==t)switch(t[0]){case":":if(this.cleanedTargetName=t.substr(1),this.updateTarget=M,"innerHTML"===this.cleanedTargetName){const t=this.binding;this.binding=(e,i)=>v.createHTML(t(e,i))}break;case"?":this.cleanedTargetName=t.substr(1),this.updateTarget=E;break;case"@":this.cleanedTargetName=t.substr(1),this.bind=z,this.unbind=R;break;default:this.cleanedTargetName=t,"class"===t&&(this.updateTarget=P)}}targetAtContent(){this.updateTarget=A,this.unbind=S}createBehavior(t){return new I(t,this.binding,this.isBindingVolatile,this.bind,this.unbind,this.updateTarget,this.cleanedTargetName)}}class I{constructor(t,e,i,s,o,n,r){this.source=null,this.context=null,this.bindingObserver=null,this.target=t,this.binding=e,this.isBindingVolatile=i,this.bind=s,this.unbind=o,this.updateTarget=n,this.targetName=r}handleChange(){this.updateTarget(this.bindingObserver.observe(this.source,this.context))}handleEvent(t){w.setEvent(t);const e=this.binding(this.source,this.context);w.setEvent(null),!0!==e&&t.preventDefault()}}let H=null;class F{addFactory(t){t.targetIndex=this.targetIndex,this.behaviorFactories.push(t)}captureContentBinding(t){t.targetAtContent(),this.addFactory(t)}reset(){this.behaviorFactories=[],this.targetIndex=-1}release(){H=this}static borrow(t){const e=H||new F;return e.directives=t,e.reset(),H=null,e}}function L(t){if(1===t.length)return t[0];let e;const i=t.length,s=t.map((t=>"string"==typeof t?()=>t:(e=t.targetName||e,t.binding))),o=new B(((t,e)=>{let o="";for(let n=0;n<i;++n)o+=s[n](t,e);return o}));return o.targetName=e,o}const N=f.length;function U(t,e){const i=e.split(u);if(1===i.length)return null;const s=[];for(let e=0,o=i.length;e<o;++e){const o=i[e],n=o.indexOf(f);let r;if(-1===n)r=o;else{const e=parseInt(o.substring(0,n));s.push(t.directives[e]),r=o.substring(n+N)}""!==r&&s.push(r)}return s}function V(t,e,i=!1){const s=e.attributes;for(let o=0,n=s.length;o<n;++o){const r=s[o],l=r.value,a=U(t,l);let c=null;null===a?i&&(c=new B((()=>l)),c.targetName=r.name):c=L(a),null!==c&&(e.removeAttributeNode(r),o--,n--,t.addFactory(c))}}function W(t,e,i){const s=U(t,e.textContent);if(null!==s){let o=e;for(let n=0,r=s.length;n<r;++n){const r=s[n],l=0===n?e:o.parentNode.insertBefore(document.createTextNode(""),o.nextSibling);"string"==typeof r?l.textContent=r:(l.textContent=" ",t.captureContentBinding(r)),o=l,t.targetIndex++,l!==e&&i.nextNode()}t.targetIndex--}}const _=document.createRange();class q{constructor(t,e){this.fragment=t,this.behaviors=e,this.source=null,this.context=null,this.firstChild=t.firstChild,this.lastChild=t.lastChild}appendTo(t){t.appendChild(this.fragment)}insertBefore(t){if(this.fragment.hasChildNodes())t.parentNode.insertBefore(this.fragment,t);else{const e=this.lastChild;if(t.previousSibling===e)return;const i=t.parentNode;let s,o=this.firstChild;for(;o!==e;)s=o.nextSibling,i.insertBefore(o,t),o=s;i.insertBefore(e,t)}}remove(){const t=this.fragment,e=this.lastChild;let i,s=this.firstChild;for(;s!==e;)i=s.nextSibling,t.appendChild(s),s=i;t.appendChild(e)}dispose(){const t=this.firstChild.parentNode,e=this.lastChild;let i,s=this.firstChild;for(;s!==e;)i=s.nextSibling,t.removeChild(s),s=i;t.removeChild(e);const o=this.behaviors,n=this.source;for(let t=0,e=o.length;t<e;++t)o[t].unbind(n)}bind(t,e){const i=this.behaviors;if(this.source!==t)if(null!==this.source){const s=this.source;this.source=t,this.context=e;for(let o=0,n=i.length;o<n;++o){const n=i[o];n.unbind(s),n.bind(t,e)}}else{this.source=t,this.context=e;for(let s=0,o=i.length;s<o;++s)i[s].bind(t,e)}}unbind(){if(null===this.source)return;const t=this.behaviors,e=this.source;for(let i=0,s=t.length;i<s;++i)t[i].unbind(e);this.source=null}static disposeContiguousBatch(t){if(0!==t.length){_.setStartBefore(t[0].firstChild),_.setEndAfter(t[t.length-1].lastChild),_.deleteContents();for(let e=0,i=t.length;e<i;++e){const i=t[e],s=i.behaviors,o=i.source;for(let t=0,e=s.length;t<e;++t)s[t].unbind(o)}}}}class D{constructor(t,e){this.behaviorCount=0,this.hasHostBehaviors=!1,this.fragment=null,this.targetOffset=0,this.viewBehaviorFactories=null,this.hostBehaviorFactories=null,this.html=t,this.directives=e}create(t){if(null===this.fragment){let t;const e=this.html;if("string"==typeof e){t=document.createElement("template"),t.innerHTML=v.createHTML(e);const i=t.content.firstElementChild;null!==i&&"TEMPLATE"===i.tagName&&(t=i)}else t=e;const i=function(t,e){const i=t.content;document.adoptNode(i);const s=F.borrow(e);V(s,t,!0);const o=s.behaviorFactories;s.reset();const n=v.createTemplateWalker(i);let r;for(;r=n.nextNode();)switch(s.targetIndex++,r.nodeType){case 1:V(s,r);break;case 3:W(s,r,n);break;case 8:v.isMarker(r)&&s.addFactory(e[v.extractDirectiveIndexFromMarker(r)])}let l=0;(v.isMarker(i.firstChild)||1===i.childNodes.length&&e.length)&&(i.insertBefore(document.createComment(""),i.firstChild),l=-1);const a=s.behaviorFactories;return s.release(),{fragment:i,viewBehaviorFactories:a,hostBehaviorFactories:o,targetOffset:l}}(t,this.directives);this.fragment=i.fragment,this.viewBehaviorFactories=i.viewBehaviorFactories,this.hostBehaviorFactories=i.hostBehaviorFactories,this.targetOffset=i.targetOffset,this.behaviorCount=this.viewBehaviorFactories.length+this.hostBehaviorFactories.length,this.hasHostBehaviors=this.hostBehaviorFactories.length>0}const e=this.fragment.cloneNode(!0),i=this.viewBehaviorFactories,s=new Array(this.behaviorCount),o=v.createTemplateWalker(e);let n=0,r=this.targetOffset,l=o.nextNode();for(let t=i.length;n<t;++n){const t=i[n],e=t.targetIndex;for(;null!==l;){if(r===e){s[n]=t.createBehavior(l);break}l=o.nextNode(),r++}}if(this.hasHostBehaviors){const e=this.hostBehaviorFactories;for(let i=0,o=e.length;i<o;++i,++n)s[n]=e[i].createBehavior(t)}return new q(e,s)}render(t,e,i){"string"==typeof e&&(e=document.getElementById(e)),void 0===i&&(i=e);const s=this.create(i);return s.bind(t,y),s.appendTo(e),s}}const Y=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function G(t,...e){const i=[];let s="";for(let o=0,n=t.length-1;o<n;++o){const n=t[o];let r=e[o];if(s+=n,r instanceof D){const t=r;r=()=>t}if("function"==typeof r&&(r=new B(r)),r instanceof $){const t=Y.exec(n);null!==t&&(r.targetName=t[2])}r instanceof k?(s+=r.createPlaceholder(i.length),i.push(r)):s+=r}return s+=t[t.length-1],new D(s,i)}class X{constructor(){this.targets=new WeakSet}addStylesTo(t){this.targets.add(t)}removeStylesFrom(t){this.targets.delete(t)}isAttachedTo(t){return this.targets.has(t)}withBehaviors(...t){return this.behaviors=null===this.behaviors?t:this.behaviors.concat(t),this}}function Z(t){return t.map((t=>t instanceof X?Z(t.styles):[t])).reduce(((t,e)=>t.concat(e)),[])}function J(t){return t.map((t=>t instanceof X?t.behaviors:null)).reduce(((t,e)=>null===e?t:(null===t&&(t=[]),t.concat(e))),null)}X.create=(()=>{if(v.supportsAdoptedStyleSheets){const t=new Map;return e=>new it(e,t)}return t=>new ot(t)})();const K=Symbol("prependToAdoptedStyleSheets");function Q(t){const e=[],i=[];return t.forEach((t=>(t[K]?e:i).push(t))),{prepend:e,append:i}}let tt=(t,e)=>{const{prepend:i,append:s}=Q(e);t.adoptedStyleSheets=[...i,...t.adoptedStyleSheets,...s]},et=(t,e)=>{t.adoptedStyleSheets=t.adoptedStyleSheets.filter((t=>-1===e.indexOf(t)))};if(v.supportsAdoptedStyleSheets)try{document.adoptedStyleSheets.push(),document.adoptedStyleSheets.splice(),tt=(t,e)=>{const{prepend:i,append:s}=Q(e);t.adoptedStyleSheets.splice(0,0,...i),t.adoptedStyleSheets.push(...s)},et=(t,e)=>{for(const i of e){const e=t.adoptedStyleSheets.indexOf(i);-1!==e&&t.adoptedStyleSheets.splice(e,1)}}}catch(t){}class it extends X{constructor(t,e){super(),this.styles=t,this.styleSheetCache=e,this._styleSheets=void 0,this.behaviors=J(t)}get styleSheets(){if(void 0===this._styleSheets){const t=this.styles,e=this.styleSheetCache;this._styleSheets=Z(t).map((t=>{if(t instanceof CSSStyleSheet)return t;let i=e.get(t);return void 0===i&&(i=new CSSStyleSheet,i.replaceSync(t),e.set(t,i)),i}))}return this._styleSheets}addStylesTo(t){tt(t,this.styleSheets),super.addStylesTo(t)}removeStylesFrom(t){et(t,this.styleSheets),super.removeStylesFrom(t)}}let st=0;class ot extends X{constructor(t){super(),this.styles=t,this.behaviors=null,this.behaviors=J(t),this.styleSheets=Z(t),this.styleClass="fast-style-class-"+ ++st}addStylesTo(t){const e=this.styleSheets,i=this.styleClass;t=this.normalizeTarget(t);for(let s=0;s<e.length;s++){const o=document.createElement("style");o.innerHTML=e[s],o.className=i,t.append(o)}super.addStylesTo(t)}removeStylesFrom(t){const e=(t=this.normalizeTarget(t)).querySelectorAll(`.${this.styleClass}`);for(let i=0,s=e.length;i<s;++i)t.removeChild(e[i]);super.removeStylesFrom(t)}isAttachedTo(t){return super.isAttachedTo(this.normalizeTarget(t))}normalizeTarget(t){return t===document?document.body:t}}const nt=Object.freeze({locate:l()}),rt={toView:t=>t?"true":"false",fromView:t=>null!=t&&"false"!==t&&!1!==t&&0!==t};class lt{constructor(t,e,i=e.toLowerCase(),s="reflect",o){this.guards=new Set,this.Owner=t,this.name=e,this.attribute=i,this.mode=s,this.converter=o,this.fieldName=`_${e}`,this.callbackName=`${e}Changed`,this.hasCallback=this.callbackName in t.prototype,"boolean"===s&&void 0===o&&(this.converter=rt)}setValue(t,e){const i=t[this.fieldName],s=this.converter;void 0!==s&&(e=s.fromView(e)),i!==e&&(t[this.fieldName]=e,this.tryReflectToAttribute(t),this.hasCallback&&t[this.callbackName](i,e),t.$fastController.notify(this.name))}getValue(t){return b.track(t,this.name),t[this.fieldName]}onAttributeChangedCallback(t,e){this.guards.has(t)||(this.guards.add(t),this.setValue(t,e),this.guards.delete(t))}tryReflectToAttribute(t){const e=this.mode,i=this.guards;i.has(t)||"fromView"===e||v.queueUpdate((()=>{i.add(t);const s=t[this.fieldName];switch(e){case"reflect":const e=this.converter;v.setAttribute(t,this.attribute,void 0!==e?e.toView(s):s);break;case"boolean":v.setBooleanAttribute(t,this.attribute,s)}i.delete(t)}))}static collect(t,...e){const i=[];e.push(nt.locate(t));for(let s=0,o=e.length;s<o;++s){const o=e[s];if(void 0!==o)for(let e=0,s=o.length;e<s;++e){const s=o[e];"string"==typeof s?i.push(new lt(t,s)):i.push(new lt(t,s.property,s.attribute,s.mode,s.converter))}}return i}}function at(t,e){let i;function s(t,e){arguments.length>1&&(i.property=e),nt.locate(t.constructor).push(i)}return arguments.length>1?(i={},void s(t,e)):(i=void 0===t?{}:t,s)}const ct={mode:"open"},ht={},dt=n.getById(4,(()=>{const t=new Map;return Object.freeze({register:e=>!t.has(e.type)&&(t.set(e.type,e),!0),getByType:e=>t.get(e)})}));class ut{constructor(t,e=t.definition){"string"==typeof e&&(e={name:e}),this.type=t,this.name=e.name,this.template=e.template;const i=lt.collect(t,e.attributes),s=new Array(i.length),o={},n={};for(let t=0,e=i.length;t<e;++t){const e=i[t];s[t]=e.attribute,o[e.name]=e,n[e.attribute]=e}this.attributes=i,this.observedAttributes=s,this.propertyLookup=o,this.attributeLookup=n,this.shadowOptions=void 0===e.shadowOptions?ct:null===e.shadowOptions?void 0:Object.assign(Object.assign({},ct),e.shadowOptions),this.elementOptions=void 0===e.elementOptions?ht:Object.assign(Object.assign({},ht),e.elementOptions),this.styles=void 0===e.styles?void 0:Array.isArray(e.styles)?X.create(e.styles):e.styles instanceof X?e.styles:X.create([e.styles])}get isDefined(){return!!dt.getByType(this.type)}define(t=customElements){const e=this.type;if(dt.register(this)){const t=this.attributes,i=e.prototype;for(let e=0,s=t.length;e<s;++e)b.defineProperty(i,t[e]);Reflect.defineProperty(e,"observedAttributes",{value:this.observedAttributes,enumerable:!0})}return t.get(this.name)||t.define(this.name,e,this.elementOptions),this}}ut.forType=dt.getByType;const ft=new WeakMap,vt={bubbles:!0,composed:!0,cancelable:!0};function mt(t){return t.shadowRoot||ft.get(t)||null}class pt extends p{constructor(t,e){super(t),this.boundObservables=null,this.behaviors=null,this.needsInitialization=!0,this._template=null,this._styles=null,this._isConnected=!1,this.$fastController=this,this.view=null,this.element=t,this.definition=e;const i=e.shadowOptions;if(void 0!==i){const e=t.attachShadow(i);"closed"===i.mode&&ft.set(t,e)}const s=b.getAccessors(t);if(s.length>0){const e=this.boundObservables=Object.create(null);for(let i=0,o=s.length;i<o;++i){const o=s[i].name,n=t[o];void 0!==n&&(delete t[o],e[o]=n)}}}get isConnected(){return b.track(this,"isConnected"),this._isConnected}setIsConnected(t){this._isConnected=t,b.notify(this,"isConnected")}get template(){return this._template}set template(t){this._template!==t&&(this._template=t,this.needsInitialization||this.renderTemplate(t))}get styles(){return this._styles}set styles(t){this._styles!==t&&(null!==this._styles&&this.removeStyles(this._styles),this._styles=t,this.needsInitialization||null===t||this.addStyles(t))}addStyles(t){const e=mt(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.append(t);else if(!t.isAttachedTo(e)){const i=t.behaviors;t.addStylesTo(e),null!==i&&this.addBehaviors(i)}}removeStyles(t){const e=mt(this.element)||this.element.getRootNode();if(t instanceof HTMLStyleElement)e.removeChild(t);else if(t.isAttachedTo(e)){const i=t.behaviors;t.removeStylesFrom(e),null!==i&&this.removeBehaviors(i)}}addBehaviors(t){const e=this.behaviors||(this.behaviors=new Map),i=t.length,s=[];for(let o=0;o<i;++o){const i=t[o];e.has(i)?e.set(i,e.get(i)+1):(e.set(i,1),s.push(i))}if(this._isConnected){const t=this.element;for(let e=0;e<s.length;++e)s[e].bind(t,y)}}removeBehaviors(t,e=!1){const i=this.behaviors;if(null===i)return;const s=t.length,o=[];for(let n=0;n<s;++n){const s=t[n];if(i.has(s)){const t=i.get(s)-1;0===t||e?i.delete(s)&&o.push(s):i.set(s,t)}}if(this._isConnected){const t=this.element;for(let e=0;e<o.length;++e)o[e].unbind(t)}}onConnectedCallback(){if(this._isConnected)return;const t=this.element;this.needsInitialization?this.finishInitialization():null!==this.view&&this.view.bind(t,y);const e=this.behaviors;if(null!==e)for(const[i]of e)i.bind(t,y);this.setIsConnected(!0)}onDisconnectedCallback(){if(!this._isConnected)return;this.setIsConnected(!1);const t=this.view;null!==t&&t.unbind();const e=this.behaviors;if(null!==e){const t=this.element;for(const[i]of e)i.unbind(t)}}onAttributeChangedCallback(t,e,i){const s=this.definition.attributeLookup[t];void 0!==s&&s.onAttributeChangedCallback(this.element,i)}emit(t,e,i){return!!this._isConnected&&this.element.dispatchEvent(new CustomEvent(t,Object.assign(Object.assign({detail:e},vt),i)))}finishInitialization(){const t=this.element,e=this.boundObservables;if(null!==e){const i=Object.keys(e);for(let s=0,o=i.length;s<o;++s){const o=i[s];t[o]=e[o]}this.boundObservables=null}const i=this.definition;null===this._template&&(this.element.resolveTemplate?this._template=this.element.resolveTemplate():i.template&&(this._template=i.template||null)),null!==this._template&&this.renderTemplate(this._template),null===this._styles&&(this.element.resolveStyles?this._styles=this.element.resolveStyles():i.styles&&(this._styles=i.styles||null)),null!==this._styles&&this.addStyles(this._styles),this.needsInitialization=!1}renderTemplate(t){const e=this.element,i=mt(e)||e;null!==this.view?(this.view.dispose(),this.view=null):this.needsInitialization||v.removeChildNodes(i),t&&(this.view=t.render(e,i,e))}static forCustomElement(t){const e=t.$fastController;if(void 0!==e)return e;const i=ut.forType(t.constructor);if(void 0===i)throw new Error("Missing FASTElement definition.");return t.$fastController=new pt(t,i)}}function bt(t){return class extends t{constructor(){super(),pt.forCustomElement(this)}$emit(t,e,i){return this.$fastController.emit(t,e,i)}connectedCallback(){this.$fastController.onConnectedCallback()}disconnectedCallback(){this.$fastController.onDisconnectedCallback()}attributeChangedCallback(t,e,i){this.$fastController.onAttributeChangedCallback(t,e,i)}}}const gt=Object.assign(bt(HTMLElement),{from:t=>bt(t),define:(t,e)=>new ut(t,e).define().type});function xt(t){return function(e){new ut(e,t).define()}}class wt{createCSS(){return""}createBehavior(){}}function yt(t,...e){const{styles:i,behaviors:s}=function(t,e){const i=[];let s="";const o=[];for(let n=0,r=t.length-1;n<r;++n){s+=t[n];let r=e[n];if(r instanceof wt){const t=r.createBehavior();r=r.createCSS(),t&&o.push(t)}r instanceof X||r instanceof CSSStyleSheet?(""!==s.trim()&&(i.push(s),s=""),i.push(r)):s+=r}return s+=t[t.length-1],""!==s.trim()&&i.push(s),{styles:i,behaviors:o}}(t,e),o=X.create(i);return s.length&&o.withBehaviors(...s),o}function kt(t,e,i){return{index:t,removed:e,addedCount:i}}const $t=0,Ct=1,Ot=2,zt=3;function jt(t,e,i,s,o,n){let l=0,a=0;const c=Math.min(i-e,n-o);if(0===e&&0===o&&(l=function(t,e,i){for(let s=0;s<i;++s)if(t[s]!==e[s])return s;return i}(t,s,c)),i===t.length&&n===s.length&&(a=function(t,e,i){let s=t.length,o=e.length,n=0;for(;n<i&&t[--s]===e[--o];)n++;return n}(t,s,c-l)),o+=l,n-=a,(i-=a)-(e+=l)==0&&n-o==0)return r;if(e===i){const t=kt(e,[],0);for(;o<n;)t.removed.push(s[o++]);return[t]}if(o===n)return[kt(e,[],i-e)];const h=function(t){let e=t.length-1,i=t[0].length-1,s=t[e][i];const o=[];for(;e>0||i>0;){if(0===e){o.push(Ot),i--;continue}if(0===i){o.push(zt),e--;continue}const n=t[e-1][i-1],r=t[e-1][i],l=t[e][i-1];let a;a=r<l?r<n?r:n:l<n?l:n,a===n?(n===s?o.push($t):(o.push(Ct),s=n),e--,i--):a===r?(o.push(zt),e--,s=r):(o.push(Ot),i--,s=l)}return o.reverse(),o}(function(t,e,i,s,o,n){const r=n-o+1,l=i-e+1,a=new Array(r);let c,h;for(let t=0;t<r;++t)a[t]=new Array(l),a[t][0]=t;for(let t=0;t<l;++t)a[0][t]=t;for(let i=1;i<r;++i)for(let n=1;n<l;++n)t[e+n-1]===s[o+i-1]?a[i][n]=a[i-1][n-1]:(c=a[i-1][n]+1,h=a[i][n-1]+1,a[i][n]=c<h?c:h);return a}(t,e,i,s,o,n)),d=[];let u,f=e,v=o;for(let t=0;t<h.length;++t)switch(h[t]){case $t:void 0!==u&&(d.push(u),u=void 0),f++,v++;break;case Ct:void 0===u&&(u=kt(f,[],0)),u.addedCount++,f++,u.removed.push(s[v]),v++;break;case Ot:void 0===u&&(u=kt(f,[],0)),u.addedCount++,f++;break;case zt:void 0===u&&(u=kt(f,[],0)),u.removed.push(s[v]),v++}return void 0!==u&&d.push(u),d}const St=Array.prototype.push;function Rt(t,e,i,s){const o=kt(e,i,s);let n=!1,r=0;for(let e=0;e<t.length;e++){const i=t[e];if(i.index+=r,n)continue;const s=(l=o.index,a=o.index+o.removed.length,c=i.index,h=i.index+i.addedCount,a<c||h<l?-1:a===c||h===l?0:l<c?a<h?a-c:h-c:h<a?h-l:a-l);if(s>=0){t.splice(e,1),e--,r-=i.addedCount-i.removed.length,o.addedCount+=i.addedCount-s;const l=o.removed.length+i.removed.length-s;if(o.addedCount||l){let t=i.removed;if(o.index<i.index){const e=o.removed.slice(0,i.index-o.index);St.apply(e,t),t=e}if(o.index+o.removed.length>i.index+i.addedCount){const e=o.removed.slice(i.index+i.addedCount-o.index);St.apply(t,e)}o.removed=t,i.index<o.index&&(o.index=i.index)}else n=!0}else if(o.index<i.index){n=!0,t.splice(e,0,o),e++;const s=o.addedCount-o.removed.length;i.index+=s,r+=s}}var l,a,c,h;n||t.push(o)}function Tt(t,e){let i=[];const s=function(t){const e=[];for(let i=0,s=t.length;i<s;i++){const s=t[i];Rt(e,s.index,s.removed,s.addedCount)}return e}(e);for(let e=0,o=s.length;e<o;++e){const o=s[e];1!==o.addedCount||1!==o.removed.length?i=i.concat(jt(t,o.index,o.index+o.addedCount,o.removed,0,o.removed.length)):o.removed[0]!==t[o.index]&&i.push(o)}return i}let Et=!1;function At(t,e){let i=t.index;const s=e.length;return i>s?i=s-t.addedCount:i<0&&(i=s+t.removed.length+i-t.addedCount),i<0&&(i=0),t.index=i,t}class Mt extends m{constructor(t){super(t),this.oldCollection=void 0,this.splices=void 0,this.needsQueue=!0,this.call=this.flush,Reflect.defineProperty(t,"$fastController",{value:this,enumerable:!1})}subscribe(t){this.flush(),super.subscribe(t)}addSplice(t){void 0===this.splices?this.splices=[t]:this.splices.push(t),this.needsQueue&&(this.needsQueue=!1,v.queueUpdate(this))}reset(t){this.oldCollection=t,this.needsQueue&&(this.needsQueue=!1,v.queueUpdate(this))}flush(){const t=this.splices,e=this.oldCollection;if(void 0===t&&void 0===e)return;this.needsQueue=!0,this.splices=void 0,this.oldCollection=void 0;const i=void 0===e?Tt(this.source,t):jt(this.source,0,this.source.length,e,0,e.length);this.notify(i)}}class Pt{constructor(t,e){this.target=t,this.propertyName=e}bind(t){t[this.propertyName]=this.target}unbind(){}}function Bt(t){return new C("fast-ref",Pt,t)}const It=t=>"function"==typeof t,Ht=()=>null;function Ft(t){return void 0===t?Ht:It(t)?t:()=>t}function Lt(t,e,i){const s=It(t)?t:()=>t,o=Ft(e),n=Ft(i);return(t,e)=>s(t,e)?o(t,e):n(t,e)}const Nt=Object.freeze({positioning:!1,recycle:!0});function Ut(t,e,i,s){t.bind(e[i],s)}function Vt(t,e,i,s){const o=Object.create(s);o.index=i,o.length=e.length,t.bind(e[i],o)}class Wt{constructor(t,e,i,s,o,n){this.location=t,this.itemsBinding=e,this.templateBinding=s,this.options=n,this.source=null,this.views=[],this.items=null,this.itemsObserver=null,this.originalContext=void 0,this.childContext=void 0,this.bindView=Ut,this.itemsBindingObserver=b.binding(e,this,i),this.templateBindingObserver=b.binding(s,this,o),n.positioning&&(this.bindView=Vt)}bind(t,e){this.source=t,this.originalContext=e,this.childContext=Object.create(e),this.childContext.parent=t,this.childContext.parentContext=this.originalContext,this.items=this.itemsBindingObserver.observe(t,this.originalContext),this.template=this.templateBindingObserver.observe(t,this.originalContext),this.observeItems(!0),this.refreshAllViews()}unbind(){this.source=null,this.items=null,null!==this.itemsObserver&&this.itemsObserver.unsubscribe(this),this.unbindAllViews(),this.itemsBindingObserver.disconnect(),this.templateBindingObserver.disconnect()}handleChange(t,e){t===this.itemsBinding?(this.items=this.itemsBindingObserver.observe(this.source,this.originalContext),this.observeItems(),this.refreshAllViews()):t===this.templateBinding?(this.template=this.templateBindingObserver.observe(this.source,this.originalContext),this.refreshAllViews(!0)):this.updateViews(e)}observeItems(t=!1){if(!this.items)return void(this.items=r);const e=this.itemsObserver,i=this.itemsObserver=b.getNotifier(this.items),s=e!==i;s&&null!==e&&e.unsubscribe(this),(s||t)&&i.subscribe(this)}updateViews(t){const e=this.childContext,i=this.views,s=this.bindView,o=this.items,n=this.template,r=this.options.recycle,l=[];let a=0,c=0;for(let h=0,d=t.length;h<d;++h){const d=t[h],u=d.removed;let f=0,v=d.index;const m=v+d.addedCount,p=i.splice(d.index,u.length),b=c=l.length+p.length;for(;v<m;++v){const t=i[v],h=t?t.firstChild:this.location;let d;r&&c>0?(f<=b&&p.length>0?(d=p[f],f++):(d=l[a],a++),c--):d=n.create(),i.splice(v,0,d),s(d,o,v,e),d.insertBefore(h)}p[f]&&l.push(...p.slice(f))}for(let t=a,e=l.length;t<e;++t)l[t].dispose();if(this.options.positioning)for(let t=0,e=i.length;t<e;++t){const s=i[t].context;s.length=e,s.index=t}}refreshAllViews(t=!1){const e=this.items,i=this.childContext,s=this.template,o=this.location,n=this.bindView;let r=e.length,l=this.views,a=l.length;if(0!==r&&!t&&this.options.recycle||(q.disposeContiguousBatch(l),a=0),0===a){this.views=l=new Array(r);for(let t=0;t<r;++t){const r=s.create();n(r,e,t,i),l[t]=r,r.insertBefore(o)}}else{let t=0;for(;t<r;++t)if(t<a){n(l[t],e,t,i)}else{const r=s.create();n(r,e,t,i),l.push(r),r.insertBefore(o)}const c=l.splice(t,a-t);for(t=0,r=c.length;t<r;++t)c[t].dispose()}}unbindAllViews(){const t=this.views;for(let e=0,i=t.length;e<i;++e)t[e].unbind()}}class _t extends k{constructor(t,e,i){super(),this.itemsBinding=t,this.templateBinding=e,this.options=i,this.createPlaceholder=v.createBlockPlaceholder,function(){if(Et)return;Et=!0,b.setArrayObserverFactory((t=>new Mt(t)));const t=Array.prototype;if(t.$fastPatch)return;Reflect.defineProperty(t,"$fastPatch",{value:1,enumerable:!1});const e=t.pop,i=t.push,s=t.reverse,o=t.shift,n=t.sort,r=t.splice,l=t.unshift;t.pop=function(){const t=this.length>0,i=e.apply(this,arguments),s=this.$fastController;return void 0!==s&&t&&s.addSplice(kt(this.length,[i],0)),i},t.push=function(){const t=i.apply(this,arguments),e=this.$fastController;return void 0!==e&&e.addSplice(At(kt(this.length-arguments.length,[],arguments.length),this)),t},t.reverse=function(){let t;const e=this.$fastController;void 0!==e&&(e.flush(),t=this.slice());const i=s.apply(this,arguments);return void 0!==e&&e.reset(t),i},t.shift=function(){const t=this.length>0,e=o.apply(this,arguments),i=this.$fastController;return void 0!==i&&t&&i.addSplice(kt(0,[e],0)),e},t.sort=function(){let t;const e=this.$fastController;void 0!==e&&(e.flush(),t=this.slice());const i=n.apply(this,arguments);return void 0!==e&&e.reset(t),i},t.splice=function(){const t=r.apply(this,arguments),e=this.$fastController;return void 0!==e&&e.addSplice(At(kt(+arguments[0],t,arguments.length>2?arguments.length-2:0),this)),t},t.unshift=function(){const t=l.apply(this,arguments),e=this.$fastController;return void 0!==e&&e.addSplice(At(kt(0,[],arguments.length),this)),t}}(),this.isItemsBindingVolatile=b.isVolatileBinding(t),this.isTemplateBindingVolatile=b.isVolatileBinding(e)}createBehavior(t){return new Wt(t,this.itemsBinding,this.isItemsBindingVolatile,this.templateBinding,this.isTemplateBindingVolatile,this.options)}}function qt(t,e,i=Nt){return new _t(t,"function"==typeof e?e:()=>e,Object.assign(Object.assign({},Nt),i))}class Dt{constructor(t,e){this.target=t,this.options=e,this.source=null}bind(t){const e=this.options.property;this.shouldUpdate=b.getAccessors(t).some((t=>t.name===e)),this.source=t,this.updateTarget(this.computeNodes()),this.shouldUpdate&&this.observe()}unbind(){this.updateTarget(r),this.source=null,this.shouldUpdate&&this.disconnect()}handleEvent(){this.updateTarget(this.computeNodes())}computeNodes(){let t=this.getNodes();return void 0!==this.options.filter&&(t=t.filter(this.options.filter)),t}updateTarget(t){this.source[this.options.property]=t}}class Yt extends Dt{constructor(t,e){super(t,e)}observe(){this.target.addEventListener("slotchange",this)}disconnect(){this.target.removeEventListener("slotchange",this)}getNodes(){return this.target.assignedNodes(this.options)}}function Gt(t){return"string"==typeof t&&(t={property:t}),new C("fast-slotted",Yt,t)}const Xt=yt`

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

    ${Lt((t=>!!t.theme&&"neutral"!==t.theme),G`
    <div part="icon" class="icon flex">
      ${Lt((t=>"info"===t.theme),G`<i class="fa-solid fa-circle-info"></i>`)}
      ${Lt((t=>"success"===t.theme),G`<i class="fa-solid fa-circle-check"></i>`)}
      ${Lt((t=>"warning"===t.theme),G`<i class="fa-solid fa-triangle-exclamation"></i>`)}
      ${Lt((t=>"error"===t.theme),G`<i class="fa-solid fa-circle-exclamation"></i>`)}
    </div>
    `)}

    <div class="body flex-fill flex-row middle">
      <slot></slot>
    </div>

    ${Lt((t=>t.escape),G`
      <button class="neutral" @click="${t=>t.handleEscape()}">
        <i class="fa-solid fa-x"></i>
      </button>
    `)}

  </div>

`,Kt="\n\n  .border { \n    border: var(--default-border-width) solid var(--default-border-color);\n    border-radius: var(--border-radius-md);\n  }\n  \n  .shadow {\n    box-shadow: var(--shadow-md);\n  }\n  \n  .flex-fill { flex: 1 1 auto }\n  .flex { display: flex }\n  \n  .flex-row { display: flex; flex-direction: row }\n  .flex-row.top { align-items: flex-start }\n  .flex-row.middle { align-items: center }\n  .flex-row.bottom { align-items: flex-end }\n  .flex-row.left { justify-content: flex-start }\n  .flex-row.center { justify-content: center }\n  .flex-row.right { justify-content: flex-end }\n  \n  .flex-col { display: flex; flex-direction: column }\n  .flex-col.top { justify-content: flex-start }\n  .flex-col.middle { justify-content: center }\n  .flex-col.bottom { justify-content: flex-end }\n  .flex-col.left { align-items: flex-start }\n  .flex-col.center { align-items: center }\n  .flex-col.right { align-items: flex-end }\n\n",Qt="\n\n  fast-dialog::part(control) { \n    display: flex;\n    width: auto;\n    height: auto;\n    border: none;\n    box-shadow: none;\n    background: none;\n  }\n\n",te="\n\n  h1 { font-size: var(--h1-font-size); line-height: var(--h1-line-height); margin: var(--h1-margin); }\n  h2 { font-size: var(--h2-font-size); line-height: var(--h2-line-height); margin: var(--h2-margin); }\n  h3 { font-size: var(--h3-font-size); line-height: var(--h3-line-height); margin: var(--h3-margin); }\n  h4 { font-size: var(--h4-font-size); line-height: var(--h4-line-height); margin: var(--h4-margin); }\n  h5 { font-size: var(--h5-font-size); line-height: var(--h5-line-height); margin: var(--h5-margin); }\n  h6 { font-size: var(--h6-font-size); line-height: var(--h6-line-height); margin: var(--h6-margin); }\n  sub { font-size: var(--sub-font-size); line-height: var(--sub-line-height); }\n\n  button {\n    background-color: var(--button-background-color);\n    color: var(--button-foreground-color);\n    padding: var(--button-padding);\n    border-radius: var(--button-border-radius);\n    border-color: var(--button-border-color);\n    border: 0;\n    cursor: pointer;\n  }\n  button:active {\n    transform: translateY(1px);\n  }\n  button:hover {\n    background-color: var(--button-hover-background-color);\n  }\n  button:disabled {\n    transform: none !important;\n    background-color: var(--button-disabled-background-color) !important;\n    color: var(--button-disabled-foreground-color) !important;\n    cursor: not-allowed;\n  }\n\n  button.neutral { \n    background-color: var(--button-neutral-background-color);\n    color: var(--button-neutral-foreground-color);\n  }\n  button.neutral:hover {\n    background-color: var(--button-neutral-hover-background-color);\n  }\n\n  button.primary { \n    background-color: var(--button-primary-background-color);\n    color: var(--button-primary-color);\n  }\n  button.primary:hover {\n    background-color: var(--button-primary-hover-background-color);\n  }\n\n  button.secondary { \n    background-color: var(--button-secondary-background-color);\n    color: var(--button-secondary-color);\n  }\n  button.secondary:hover {\n    background-color: var(--button-secondary-hover-background-color);\n  }\n\n  button.tertiary { \n    background-color: var(--color-tertiary-50);\n    color: var(--color-tertiary-100);\n  }\n  button.tertiary:hover {\n    background-color: var(--color-tertiary-60);\n  }\n\n",ee=document.createElement("style");ee.setAttribute("mo-layout",""),ee.innerHTML=`\n\n  body {\n    color: var(--default-foreground);\n    font-size: var(--default-font-size);\n    line-height: var(--default-line-height);\n    font-family: var(--default-font-family);\n  }\n\n  :root [fullscreen] { \n    --workspace-max-width: 100vw;\n  }\n\n  :root [center] { \n    --workspace-align-margin: 0 auto; \n  }\n\n  ${Kt}\n  ${Qt}\n  ${te}\n\n`,document.head.append(ee);const ie=yt`
  ${i.styles}
  ${Kt}
  ${Qt}
  ${te}
`;var se=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let oe=class extends gt{constructor(){super(...arguments),this.theme="neutral",this.escape=!1}handleEscape(){const t=new CustomEvent("close",{bubbles:!0});this.dispatchEvent(t)}};se([at],oe.prototype,"theme",void 0),se([at({mode:"boolean"})],oe.prototype,"escape",void 0),oe=se([xt({name:"mo-alert",template:Jt,styles:[ie,Xt]})],oe);const ne=yt`

  :host { 
    display: flex;
    flex-direction: column;
    border: var(--border-width-xs) solid var(--default-border-color); 
    border-radius: var(--border-width-sm);
    padding: var(--padding-md);
    margin: var(--margin-xs);
  }

  [part="header"] {
    background: var(--color-primary-90);
    padding: var(--padding-xs) var(--padding-md);
    border-radius: var(--border-radius-md);
  }

  [part="header"] .icon { 
    margin: var(--margin-xs);
  }

  [part="header"] .controls { 
    margin-left: var(--margin-2xs);
  }

  [part="content"] { 
    padding: var(--padding-md) 0;
  }

  [part="actions"] { 
    border-top: var(--border-width-xs) solid var(--color-neutral-80);
    padding: var(--padding-md) 0 0;
  }

  [part="actions"] ::slotted(*) { 
    margin-left: var(--margin-2xs);
  }

`,re=G`

  <div part="header" class="flex-row middle" ?hidden="${t=>!(t.icon?.length||t.header?.length||t.sub?.length||t.actions?.length)}">
    <div class="icon flex" ?hidden="${t=>!t.icon?.length}">
      <slot name="icon" ${Gt("icon")}></slot>
    </div>
    <div class="flex-col">
      <slot name="header" ${Gt("header")}></slot>
      <slot name="sub" ${Gt("sub")}></slot>
    </div>
    <div class="flex-fill"></div>
    <div class="controls flex" ?hidden="${t=>!t.controls?.length}">
      <slot name="controls" ${Gt("controls")}></slot>
    </div>
  </div>

  <div part="content" class="flex-fill flex-col">
    <slot></slot>
  </div>

  <div part="actions" class="flex-row middle right" ?hidden="${t=>!t.actions?.length}">
    <slot name="actions" ${Gt("actions")}></slot>
  </div>

`;var le=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let ae=class extends gt{constructor(){super(...arguments),this.icon=[],this.header=[],this.sub=[],this.controls=[],this.actions=[]}};le([g],ae.prototype,"icon",void 0),le([g],ae.prototype,"header",void 0),le([g],ae.prototype,"sub",void 0),le([g],ae.prototype,"controls",void 0),le([g],ae.prototype,"actions",void 0),ae=le([xt({name:"mo-card",template:re,styles:[ie,ne]})],ae);const ce=yt`
  :host { 
    display: block;
    overflow: hidden;
  }
  div { 
    position: absolute;
  }
`,he=G`
  <div ${Bt("containerRef")} class="flex-row middle center">
    <canvas part="canvas" ${Bt("canvasRef")}></canvas>
  </div>
`;const de=new class{constructor(){this.status={}}async import(t,e=!1){const i=this.status[t];if(i?.imported)return i.lib;if(i?.importing)return void await new Promise((t=>i.pending.push((()=>t(i.lib)))));const s={imported:!1,importing:!0,pending:[],lib:void 0};this.status[t]=s,e?await this.injectScript(t):s.lib=await import(t),s.imported=!0;for(const t of s.pending)t(s.lib);return s.lib}injectScript(t){return new Promise(((e,i)=>{const s=document.createElement("script");s.src=t,s.addEventListener("load",e),s.addEventListener("error",(t=>i(t.error))),document.head.appendChild(s)}))}};var ue,fe=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let ve=ue=class extends gt{constructor(){super(...arguments),this.type="bar",this.legend=!1,this["x-label"]=!0,this["y-label"]=!0,this.fit=!0}typeChanged(){this.chart&&(this.chart.type=this.type)}get data(){return this.chart.data}get first(){return this.chart.data.datasets[0].data}set first(t){this.chart.data.datasets[0].data=t}get options(){return this.chart.options}async connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver((()=>this.handleResize())),this.resizeObserver.observe(this),this.handleResize(),await de.import(ue.script,!0),this.chart=new window.Chart(this.canvasRef,{type:this.type||"bar",data:{labels:["Red","Blue","Yellow","Green","Purple","Orange"],datasets:[{label:"# of Votes",data:[12,19,3,5,2,3],borderWidth:1}]},options:{plugins:{legend:{display:this.legend}},scales:{x:{display:this["x-label"]},y:{display:this["y-label"],beginAtZero:!0}}}})}disconnectedCallback(){super.disconnectedCallback()}handleResize(){this.fit&&(this.containerRef.style.width=`${this.offsetWidth}px`,this.containerRef.style.height=`${this.offsetHeight}px`)}};ve.script="https://cdn.jsdelivr.net/npm/chart.js",fe([at],ve.prototype,"type",void 0),fe([at({mode:"boolean"})],ve.prototype,"legend",void 0),fe([at({mode:"boolean"})],ve.prototype,"x-label",void 0),fe([at({mode:"boolean"})],ve.prototype,"y-label",void 0),fe([at({mode:"boolean"})],ve.prototype,"fit",void 0),ve=ue=fe([xt({name:"mo-chart",template:he,styles:[ie,ce]})],ve);const me=yt`
  :host { 
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-x: hidden;
  }
`,pe=G`
  <slot ${Gt("nodes")}></slot>
`;var be=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let ge=class extends gt{nodesChanged(){this.handleResize?.()}get activeColumns(){const t=`columns-${i.size}`;return this.hasAttribute(t)?this[t]:this.columns||1}get activeRowHeight(){const t=`row-height-${i.size}`;return this.hasAttribute(t)?this[t]:this["row-height"]?this["row-height"]:"auto"}constructor(){super(),this.columns=1,this.nodes=[],this.handleResize=()=>{for(const t of this.nodes)1===t.nodeType&&this.setNode(t)},this.handleResize.bind(this)}connectedCallback(){super.connectedCallback(),this.handleResize(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.handleResize)}setNode(t){let e=parseInt(t.getAttribute("columns")||"1");e>this.activeColumns&&(e=this.activeColumns);const i=e/this.activeColumns*100;t.style.boxSizing="border-box",t.style.flex=`0 0 ${i}%`,t.style.height=this.activeRowHeight,t.style.overflow="hidden"}};be([at],ge.prototype,"columns",void 0),be([at],ge.prototype,"columns-xs",void 0),be([at],ge.prototype,"columns-sm",void 0),be([at],ge.prototype,"columns-md",void 0),be([at],ge.prototype,"columns-lg",void 0),be([at],ge.prototype,"columns-xl",void 0),be([at],ge.prototype,"row-height",void 0),be([at],ge.prototype,"row-height-xs",void 0),be([at],ge.prototype,"row-height-sm",void 0),be([at],ge.prototype,"row-height-md",void 0),be([at],ge.prototype,"row-height-lg",void 0),be([at],ge.prototype,"row-height-xl",void 0),be([g],ge.prototype,"nodes",void 0),ge=be([xt({name:"mo-columns",template:pe,styles:[ie,me]})],ge);const xe=yt`

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
  <div part="expandable" ${Bt("expandableRef")} class="expandable">
    <div ${Bt("contentRef")} class="content">
      <slot></slot>
    </div>
  </div>
`,ye=new class{async waitForSize(t,e=10){t.offsetWidth||t.offsetHeight||await new Promise((i=>{let s;const o=new ResizeObserver((()=>{s&&clearTimeout(s),s=setTimeout((()=>{i(void 0),o.disconnect()}),e)}));o.observe(t)}))}async once(t,e,i){return new Promise((async s=>{const o=()=>{t.removeEventListener(e,o),s(void 0)};t.addEventListener(e,o),await(i?.())}))}async transition(t,e,s,o=10){if(e)for(const i of Object.entries(e))t.style[i[0]]=i[1];await i.wait(o),s&&await ye.once(t,"transitionend",(async()=>{for(const e of Object.entries(s))t.style[e[0]]=e[1]}))}};var ke=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let $e=class extends gt{constructor(){super(...arguments),this.orientation="vertical",this.opened=!1,this["inherit-width"]=!1,this["inherit-height"]=!1,this.handleTransitionEnd=()=>{this.opened||this.setAttribute("hidden","")}}openedChanged(){if(!this.expandableRef)return;this.opened?this.open():this.close();const t=new CustomEvent("change",{bubbles:!0});this.dispatchEvent(t)}get isContentRendered(){return!!this.contentRef.offsetWidth||!!this.contentRef.offsetHeight}async connectedCallback(){super.connectedCallback?.(),await ye.waitForSize(this.contentRef),this.setDefaultDimensions(),this.openedChanged(),this.handleTransitionEnd.bind(this),this.addEventListener("transitionend",this.handleTransitionEnd)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("transitionend",this.handleTransitionEnd)}setDefaultDimensions(){"horizontal"===this.orientation&&(this.style.height=`${this.expandableRef.offsetHeight}px`),"vertical"===this.orientation&&(this.style.width=`${this.expandableRef.offsetWidth}px`)}async open(){if(this.opened)switch(this.removeAttribute("hidden"),this.orientation){case"vertical":this.style.height=`${this.expandableRef.offsetHeight}px`;break;case"horizontal":this.style.width=`${this.expandableRef.offsetWidth}px`}else this.opened=!0}close(){if(this.opened)this.opened=!1;else switch(this.contentRef.style.position="relative",this.orientation){case"vertical":this.style.height="0";break;case"horizontal":this.style.width="0"}}toggle(){this.opened=!this.opened}};ke([at],$e.prototype,"orientation",void 0),ke([at({mode:"boolean"})],$e.prototype,"opened",void 0),ke([at({mode:"boolean"})],$e.prototype,"inherit-width",void 0),ke([at({mode:"boolean"})],$e.prototype,"inherit-height",void 0),$e=ke([xt({name:"mo-expandable",template:we,styles:[ie,xe]})],$e);const Ce=yt`
  :host { 
    pointer-events: none;
  }
  .fixed{ 
    position: fixed;
    display: flex;
    box-sizing: border-box;
    pointer-events: all;
  }
`,Oe=G`
  <div class="fixed" ${Bt("fixedRef")}>
    <div class="container flex-col" ${Bt("containerRef")}>
      <slot style="pointer-events: all"></slot>
    </div>
  </div>
`,ze=yt`

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

`,je=G`
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

`;class Se{constructor(t){this.modalRef=t,this.ref=new Map}async open(t,e){await this.close(),t.removeAttribute("hidden"),this.modalRef.replaceChildren(t),this.modalRef.show(),!1!==e?.animate&&await this.animateShow(t),this.handleCloseEvent(t);const s={options:e,listeners:[],unlock:i.lockScroll()};return this.ref.set(t,s),new Promise((t=>{s.listeners.push((e=>t(e)))}))}handleCloseEvent(t){const e=async i=>{t.removeEventListener(Se.closeEventName,e),await this.closeModal(t,i?.detail)};t.addEventListener(Se.closeEventName,e)}async animateShow(t){t&&await ye.transition(t,{transition:"none",opacity:"0",position:"fixed",transform:`translate(-50%, calc(-50% + ${window.innerHeight}px)`,top:"50%",left:"50%"},{opacity:"1",transition:"transform 0.1s ease-out",transform:"translate(-50%, -50%)"})}async animateHide(t){t&&(await ye.transition(t,void 0,{transform:`translate(-50%, calc(-50% + ${window.innerHeight}px)`,transition:"transform 0.1s ease-in"}),t.style.opacity="0")}async close(){for(const t of this.ref.keys())await this.closeModal(t,{escape:!0})}async closeModal(t,e){const i=this.ref.get(t);!1!==i?.options?.animate&&await this.animateHide(t),t.setAttribute("hidden",""),this.modalRef.hide(),i?.unlock();for(const t of i?.listeners||[])t(e);this.ref.delete(t)}}Se.closeEventName="close";class Re{get visible(){return this.panelRef.classList.contains("visible")}constructor(t){this.panelRef=t,this.animate=!0,this.animateFrom="left"}async open(){this.panelRef.classList.contains("visible")||(await(document.querySelector("mo-layout")?.close?.()),i.addClass(this.panelRef,"visible"),this.releaseScroll=i.lockScroll(),this.animate&&await this.animateShow(this.panelRef))}async close(){this.panelRef.classList.contains("visible")&&(this.animate&&await this.animateHide(this.panelRef),i.removeClass(this.panelRef,"visible"),this.releaseScroll?.())}toggle(){this.visible?this.close():this.open()}async animateShow(t){t&&await ye.transition(t,{transition:"none",opacity:"0",transform:`translate(${"left"===this.animateFrom?"-":""}150%, 0)`},{opacity:"1",transition:"transform 0.1s ease-out",transform:"translate(0, 0)"})}async animateHide(t){t&&(await ye.transition(t,void 0,{transform:`translate(${"left"===this.animateFrom?"-":""}150%, 0)`,transition:"transform 0.1s ease-in"}),t.style.opacity="0")}}class Te{open(t,e,s){let o;return(s=s||{}).actions=s.actions||[{key:"close",label:"Close"}],new Promise((n=>{this.dialogRef={close(t){this.modalRef.hide(),this.modalRef.remove(),o(),n(t)}},G`
        <fast-dialog ${Bt("modalRef")} modal hidden style="position:relative;z-index:9999;display:flex;">
          <div tabindex="-1" ${Bt("modalRefStart")}></div>
          <mo-card class="no-border no-margin" style="flex: 1 1; min-width: var(--panel-width-sm); min-height: var(--panel-height-xs)">
            
            ${e?G`<h2 slot="header">${e}</h2>`:""}
            ${e&&s?.escape?G`
              <button class="neutral" slot="controls" @click=${t=>t.close({escape:!0})}>
                <i class="fa-solid fa-x"></i>
              </button>
            `:""}

            <div style="display:flex;flex-direction:row">
              ${s?.theme?G`
              <div style="display:flex;align-items:center;justify-content:center;margin: var(--margin-sm) var(--margin-sm) var(--margin-sm) 0;">
                ${"info"===s?.theme?G`<i class="fa-solid fa-circle-info" style="color: var(--color-info-50);font-size:var(--font-size-3xl)"></i>`:""}
                ${"success"===s?.theme?G`<i class="fa-solid fa-circle-check" style="color: var(--color-success-50);font-size:var(--font-size-3xl)"></i>`:""}
                ${"warning"===s?.theme?G`<i class="fa-solid fa-triangle-exclamation" style="color: var(--color-warning-50);font-size:var(--font-size-3xl)"></i>`:""}
                ${"error"===s?.theme?G`<i class="fa-solid fa-circle-exclamation" style="color: var(--color-error-50);font-size:var(--font-size-3xl)"></i>`:""}
              </div>`:""}
              <div style="flex: 1 1;display:flex;align-items:center;">
                ${t}
              </div>
            </div>

            ${s?.actions?.length?qt((()=>s?.actions||[]),(t=>G`
                <button slot="actions" 
                  @click="${e=>t.close({key:e.key||e})}" 
                  class="${t=>t.class}">
                  ${t=>t.label||t.key||t}
                </button>`)):""}
          
          </mo-card>
        </fast-dialog>
      `.render(this.dialogRef,document.body),this.dialogRef.modalRef.show(),o=i.lockScroll(),setTimeout((()=>{this.dialogRef.modalRefStart.focus()}),20)}))}close(t){this.dialogRef?.close(t)}}Te.closeEventName="close-dialog";class Ee{constructor(t){this.panelRef=t}open(t,e="neutral",s=1e4){const o={};G`
      <mo-expandable ${Bt("expandableRef")} style="margin: var(--margin-2xs);">
        <mo-alert ${Bt("alertRef")} 
          class="shadow"
          theme="${e}" 
          escape 
          @close=${t=>this.close(t.expandableRef)}
          style="margin:0; ${i.isSize("xs")?"width: 90vw;":"width: var(--panel-width-lg);"}">
          ${t}
        </mo-alert>
      </mo-expandable>
    `.render(o,this.panelRef),setTimeout((()=>o.expandableRef.open()),50),setTimeout((()=>{o.expandableRef.parentNode&&this.close(o.expandableRef)}),s)}close(t){t.close(),setTimeout((()=>t.remove()),1e3)}}class Ae{constructor(t){this.panelRef=t}async open(t,e){return void 0===(e=e||{}).time&&(e.time=1e4),void 0===e.theme&&(e.theme="neutral"),void 0===e.escape&&(e.escape=!0),new Promise((s=>{const o={close:t=>{this.close(o.expandableRef),s(t)}};G`
      <mo-expandable class="snackbar-item" ${Bt("expandableRef")} style="margin: var(--margin-2xs);">
        <mo-alert ${Bt("alertRef")} 
          theme="${e?.theme||""}" 
          escape="${!!e?.escape}" 
          @close=${t=>this.close(t.expandableRef)} 
          style="margin:0; ${i.isSize("xs")?"width: 90vw;":"width: var(--panel-width-lg);"}">
          
          ${t}

          ${e?.actions?.length?qt((()=>e?.actions||[]),(t=>G`
              <button
                @click="${e=>t.close({key:e.key||e})}" 
                class="${t=>t.class}">
                ${t=>t.label||t.key||t}
              </button>`)):""}

        </mo-alert>
      </mo-expandable>
      `.render(o,this.panelRef),setTimeout((()=>o.expandableRef.open()),20),setTimeout((()=>{o.expandableRef.parentNode&&this.close(o.expandableRef)}),e?.time||1e3)}))}close(t){t.close(),setTimeout((()=>t.remove()),1e3)}}class Me{constructor(){this.cache=[]}set(t,e){const s=!e;e=e||document.body;const o={};G`
      <mo-lock ${Bt("lockRef")}>${t||""}</mo-lock>
    `.render(o,e),this.cache.push(o.lockRef),e.$lock={position:e.style.position,overflow:e.style.overflow,zIndex:e.getAttribute("zIndex")||"",releaseScroll:i.lockScroll(e)},s&&(o.lockRef.style.position="fixed",o.lockRef.style.zIndex=9999),e.style.position="relative",e.style.overflow="hidden",e.setAttribute("z-index","-1"),e.setAttribute("aria-hidden","true"),e.setAttribute("inert","")}remove(t){if(!t){for(;this.cache.length;){const t=this.cache.shift();this.remove(t)}return}const e=t.parentNode;t.remove();const i=this.cache.findIndex((e=>e===t));i>-1&&this.cache.splice(i,1),e&&(e.$lock.releaseScroll(),e.style.position=e.$lock.position,e.style.overflow=e.$lock.overflow,e.$lock.zIndex?e.setAttribute("z-index",e.$lock.zIndex):e.removeAttribute("z-index"),e.removeAttribute("aria-hidden"),e.removeAttribute("inert"))}}const Pe=new Me;var Be=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Ie,He=class extends gt{constructor(){super(...arguments),this.center=!1,this.fullscreen=!1,this["sticky-header"]=!1,this["sticky-footer"]=!1,this["menu-overlay-xs"]=!1,this["menu-overlay-sm"]=!1,this["menu-overlay-md"]=!1,this["menu-overlay-lg"]=!1,this["menu-overlay-xl"]=!1,this["aside-overlay-xs"]=!1,this["aside-overlay-sm"]=!1,this["aside-overlay-md"]=!1,this["aside-overlay-lg"]=!1,this["aside-overlay-xl"]=!1,this.handleResize=()=>{for(const t of i.sizes)i.isSize(t)&&(i.toggleAttribute(this.menuRef,"overlay",this[`menu-overlay-${t}`]),i.toggleAttribute(this.asideRef,"overlay",this[`aside-overlay-${t}`]))}}"sticky-headerChanged"(){this.headerRef&&(this["sticky-header"]?i.addClass(this.headerRef,"sticky"):i.removeClass(this.headerRef,"sticky"))}"sticky-footerChanged"(){this.footerRef&&(this["sticky-footer"]?i.addClass(this.footerRef,"sticky"):i.removeClass(this.footerRef,"sticky"))}get router(){return this.querySelector("mo-router")}static get styles(){return ie}connectedCallback(){super.connectedCallback?.(),Ie||(Ie=this),this.modal=new Se(this.modalRef),this.aside=new Re(this.asideRef),this.aside.animateFrom="right",this.menu=new Re(this.menuRef),this.dialog=new Te,this.alert=new Ee(this.alertRef),this.snackbar=new Ae(this.snackbarRef),this.lock=Pe,this["sticky-headerChanged"](),this["sticky-footerChanged"](),i.sync(this.foregroundRef),this.handleResize.bind(this),this.handleResize(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){super.disconnectedCallback?.(),i.unsync(this.foregroundRef),window.removeEventListener("resize",this.handleResize)}async close(){await this.modal.close(),await this.menu.close(),await this.aside.close()}};Be([at({mode:"boolean"})],He.prototype,"center",void 0),Be([at({mode:"boolean"})],He.prototype,"fullscreen",void 0),Be([at({mode:"boolean"})],He.prototype,"sticky-header",void 0),Be([at({mode:"boolean"})],He.prototype,"sticky-footer",void 0),Be([at({mode:"boolean"})],He.prototype,"menu-overlay-xs",void 0),Be([at({mode:"boolean"})],He.prototype,"menu-overlay-sm",void 0),Be([at({mode:"boolean"})],He.prototype,"menu-overlay-md",void 0),Be([at({mode:"boolean"})],He.prototype,"menu-overlay-lg",void 0),Be([at({mode:"boolean"})],He.prototype,"menu-overlay-xl",void 0),Be([at({mode:"boolean"})],He.prototype,"aside-overlay-xs",void 0),Be([at({mode:"boolean"})],He.prototype,"aside-overlay-sm",void 0),Be([at({mode:"boolean"})],He.prototype,"aside-overlay-md",void 0),Be([at({mode:"boolean"})],He.prototype,"aside-overlay-lg",void 0),Be([at({mode:"boolean"})],He.prototype,"aside-overlay-xl",void 0),He=Be([xt({name:"mo-layout",template:je,styles:[ie,ze]})],He);var Fe=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Le=class extends gt{constructor(){super(...arguments),this.handleViewChange=()=>{const t=this.getTop();this.fixedRef.style.top=`${t}px`,this.fixedRef.style.height=this.getBottom()-t+"px"},this.handleChildChange=()=>{this.style.width=`${this.containerRef.offsetWidth}px`,this.fixedRef.style.width=`${this.containerRef.offsetWidth}px`}}connectedCallback(){super.connectedCallback?.(),window.addEventListener("scroll",this.handleViewChange),this.resizeObserver=new ResizeObserver((()=>this.handleViewChange())),this.resizeObserver.observe(document.body),this.resizeObserver.observe(Ie.bannerRef),this.resizeObserver.observe(Ie.headerRef),this.resizeObserver.observe(Ie.footerRef),this.resizeObserver.observe(this),setTimeout((()=>{this.handleViewChange(),this.handleChildChange()}))}disconnectedCallback(){super.disconnectedCallback?.(),window.removeEventListener("scroll",this.handleViewChange),this.resizeObserver.disconnect()}getTop(){const t=Ie.bannerRef.getBoundingClientRect().bottom,e=Ie.headerRef.getBoundingClientRect().bottom;return Math.max(0,t,e)}getBottom(){const t=Ie.footerRef.getBoundingClientRect().top;return Math.min(window.innerHeight,t)}};Le=Fe([xt({name:"mo-fixed-content",template:Oe,styles:[ie,Ce]})],Le);const Ne=yt`

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

`,Ue=G`
  <mo-workspace class="flex-row middle">
    <slot></slot>
  </mo-workspace>
`;var Ve=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let We=class extends gt{};We=Ve([xt({name:"mo-footer",template:Ue,styles:[ie,Ne]})],We);const _e=yt`
  :host { 
    display: flex;
    box-sizing: border-box;
  }

  :host(:not([column-count])) {
    flex-direction: column;
  }

  :host([column-count]) { 
    flex-direction: row;
    flex-wrap: wrap;
  }

  :host([column-count="1"]) ::slotted(mo-form-field),
  :host([column-count="1"]) ::slotted(mo-form-group) {
    flex: 0 0 100%;
  }

  :host([column-count="2"]) ::slotted(mo-form-field),
  :host([column-count="2"]) ::slotted(mo-form-group) {
    flex: 0 0 calc(100% / 2);
  }

  :host([column-count="3"]) ::slotted(mo-form-field),
  :host([column-count="3"]) ::slotted(mo-form-group) {
    flex: 0 0 calc(100% / 3);
  }

  :host([column-count="4"]) ::slotted(mo-form-field),
  :host([column-count="4"]) ::slotted(mo-form-group) {
    flex: 0 0 calc(100% / 4);
  }

`,qe=G`
  <slot></slot>
`;var De=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Ye=class extends gt{constructor(){super(...arguments),this.columns=1,this.handleResize=()=>{let t=0;i.isSize("xs")?t=void 0===this["columns-xs"]?this.columns:this["columns-xs"]:i.isSize("sm")?t=void 0===this["columns-sm"]?this.columns:this["columns-sm"]:i.isSize("md")?t=void 0===this["columns-md"]?this.columns:this["columns-md"]:i.isSize("lg")?t=void 0===this["columns-lg"]?this.columns:this["columns-lg"]:i.isSize("xl")&&(t=void 0===this["columns-xl"]?this.columns:this["columns-xl"]),t<=1?this.removeAttribute("column-count"):this.setAttribute("column-count",t.toString())}}connectedCallback(){super.connectedCallback(),this.handleResize.bind(this),this.handleResize(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.handleResize)}};De([at],Ye.prototype,"columns",void 0),De([at],Ye.prototype,"columns-xs",void 0),De([at],Ye.prototype,"columns-sm",void 0),De([at],Ye.prototype,"columns-md",void 0),De([at],Ye.prototype,"columns-lg",void 0),De([at],Ye.prototype,"columns-xl",void 0),Ye=De([xt({name:"mo-form",template:qe,styles:[ie,_e]})],Ye);const Ge=yt`
  :host { 
    display: flex;
    flex-direction: column;
    padding: var(--padding-sm) var(--padding-md);
    box-sizing: border-box;
  }
  [screen-xs] :host { 
    width: 100%;
  }
  slot[name="note"] { 
    color: var(--color-neutral-60);
    font-size: var(--font-size-sm);
  }
  slot[name="error"] { 
    color: var(--color-error-30);
    font-size: var(--font-size-sm);
  }
  .control-slot::slotted(:first-child) { 
    display: flex;
  }
`,Xe=G`
  <div class="flex-row">
    <div class="flex-col flex-fill">
      <slot class="control-slot"></slot>
      <slot name="note"></slot>
      <slot name="error"></slot>
    </div>
    <div>
      <slot name="action"></slot>
    </div>
  </div>
`;var Ze=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Je=class extends gt{};Je=Ze([xt({name:"mo-form-field",template:Xe,styles:[ie,Ge]})],Je);const Ke=yt`
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
`,Qe=G`
  <div part="header" ${Bt("headerRef")}>
    <slot name="header" ${Bt("headerSlot")}></slot>
  </div>
  <slot></slot>
  <div class="flex-fill"></div>
  <div part="footer" ${Bt("footerRef")}>
    <slot name="footer" ${Bt("footerSlot")}></slot>
  </div>
`;var ti=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let ei=class extends gt{get hasHeader(){return!!this.headerSlot?.assignedNodes()?.length}get hasFooter(){return!!this.footerSlot?.assignedNodes()?.length}connectedCallback(){super.connectedCallback(),i.toggleAttribute(this.headerRef,"hidden",!this.hasHeader),i.toggleAttribute(this.footerRef,"hidden",!this.hasFooter)}};ei=ti([xt({name:"mo-form-group",template:Qe,styles:[ie,Ke]})],ei);const ii=yt`

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

`,si=G`
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

`;var oi=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let ni=class extends gt{constructor(){super(...arguments),this.menu=!1,this["menu-xs"]=!1,this["menu-sm"]=!1,this["menu-md"]=!1,this["menu-lg"]=!1,this["menu-xl"]=!1}handleMenuClick(){const t=new CustomEvent("menu",{bubbles:!0});this.dispatchEvent(t)}connectedCallback(){super.connectedCallback?.(),i.sync(this.workspaceRef)}disconnectedCallback(){super.disconnectedCallback?.(),i.unsync(this.workspaceRef)}isMenuHidden(t){const e=`menu-${t}`;return this.hasAttribute(e)?this[e]:this.menu}};oi([at({mode:"boolean"})],ni.prototype,"menu",void 0),oi([at({mode:"boolean"})],ni.prototype,"menu-xs",void 0),oi([at({mode:"boolean"})],ni.prototype,"menu-sm",void 0),oi([at({mode:"boolean"})],ni.prototype,"menu-md",void 0),oi([at({mode:"boolean"})],ni.prototype,"menu-lg",void 0),oi([at({mode:"boolean"})],ni.prototype,"menu-xl",void 0),ni=oi([xt({name:"mo-header",template:si,styles:[ie,ii]})],ni);const ri=yt`
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
`,li=G`
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
`,ai=yt`
  :host {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--menu-background-color);
    color: var(--menu-foreground-color);
  }
`,ci=G`
  <slot></slot>
`;var hi=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let di=class extends gt{constructor(){super(...arguments),this.single=!1,this.handleSelected=t=>{this.processSelected(t)},this.handleOpened=t=>{this.processOpened(t)}}connectedCallback(){super.connectedCallback?.(),this.handleSelected.bind(this),this.addEventListener("selected",this.handleSelected),this.handleOpened.bind(this),this.addEventListener("opened",this.handleOpened)}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEventListener("selected",this.handleSelected),this.removeEventListener("opened",this.handleOpened)}processSelected(t){const e=this.querySelectorAll("mo-menu-item");if(e?.length&&t.target?.hasAttribute("activate"))for(const t of e)t!==this&&t.hasAttribute("active")&&t.removeAttribute("active")}processOpened(t){if(this.single)for(const e of this.children)e!==t.target&&e.hasAttribute("opened")&&e.removeAttribute("opened")}};hi([at({mode:"boolean"})],di.prototype,"single",void 0),di=hi([xt({name:"mo-menu",template:ci,styles:[ie,ai]})],di);var ui=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let fi=class extends di{constructor(){super(...arguments),this.slotNodes=[],this.expanded=!0}expandedChanged(){return this.expanded?this.maximize():this.minimize()}processSelected(t){super.processSelected(t);for(const t of i.sizes)i.isSize(t)&&Ie[`menu-overlay-${t}`]&&Ie.menu.close()}processOpened(t){super.processOpened(t),this.expanded||(this.expanded=!0)}maximize(){const t=this.querySelectorAll("mo-menu-item");for(const e of t)e.setAttribute("expanded","")}minimize(){const t=this.querySelectorAll("mo-menu-item");for(const e of t)e.removeAttribute("opened"),e.removeAttribute("expanded")}};ui([g],fi.prototype,"slotNodes",void 0),ui([at({mode:"boolean"})],fi.prototype,"expanded",void 0),fi=ui([xt({name:"mo-layout-menu",template:li,styles:[ie,ri]})],fi);const vi=yt`
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
`,mi=G`
  <slot></slot>
  <fast-progress appearance="neutral"></fast-progress>
`;var pi=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let bi=class extends gt{};bi=pi([xt({name:"mo-lock",template:mi,styles:[ie,vi]})],bi);const gi=yt`

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

`,xi=G`
  ${Zt.html}

  <button ${Bt("menuItemRef")} part="menu-item" class="line neutral flex-row middle" @click="${t=>t.handleClick()}">

    <div class="icon" ${Bt("iconRef")}>
      <slot name="icon" ${Bt("iconSlot")}></slot>
    </div>

    ${Lt((t=>t.expanded),G`
    <div class="name flex-fill flex-row middle left" ${Bt("nameRef")}>
      <slot></slot>
    </div>
    `)}

    ${Lt((t=>t.expanded),G`
    <div class="expand" ${Bt("expandRef")}>
      <i class="fa-solid fa-chevron-down"></i>
    </div>
    `)}

  </button>

  <mo-expandable inherit-width part="children" class="children" ${Bt("childrenRef")} @change="${t=>t.opened=t.childrenRef.opened}">
    <slot name="children" ${Bt("childrenSlot")}></slot>
  </mo-expandable>

`;var wi=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let yi=class extends gt{constructor(){super(...arguments),this.activate=!1,this.active=!1,this.opened=!1,this.expanded=!0}activeChanged(){this.menuItemRef&&(this.active?(i.addClass(this.menuItemRef,"active"),this.dispatchEvent(new CustomEvent("selected",{bubbles:!0}))):i.removeClass(this.menuItemRef,"active"))}openedChanged(){this.menuItemRef&&(this.opened?(i.addClass(this.expandRef,"open"),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0})),this.childrenRef.opened||this.childrenRef.setAttribute("opened","")):(i.removeClass(this.expandRef,"open"),this.childrenRef.opened&&this.childrenRef.removeAttribute("opened")))}get hasChildren(){return this.childrenSlot.assignedNodes().length}get hasIcon(){return this.iconSlot?.assignedNodes().length}connectedCallback(){super.connectedCallback?.(),this.activeChanged(),this.openedChanged(),this.hasIcon||this.iconRef.setAttribute("hidden",""),this.hasChildren||this.expandRef.setAttribute("hidden",""),i.sync(this)}disconnectedCallback(){super.disconnectedCallback(),i.unsync(this)}handleClick(){this.hasChildren?this.handleResize():this.handleSelect()}handleResize(){this.childrenRef.opened?(this.childrenRef.close(),this.dispatchEvent(new CustomEvent("closed",{bubbles:!0}))):(this.childrenRef.open(),this.dispatchEvent(new CustomEvent("opened",{bubbles:!0})))}handleSelect(){this.activate&&(this.active=!0),this.dispatchEvent(new CustomEvent("select",{bubbles:!0}))}};wi([at({mode:"boolean"})],yi.prototype,"activate",void 0),wi([at({mode:"boolean"})],yi.prototype,"active",void 0),wi([at({mode:"boolean"})],yi.prototype,"opened",void 0),wi([at({mode:"boolean"})],yi.prototype,"expanded",void 0),yi=wi([xt({name:"mo-menu-item",template:xi,styles:[ie,gi]})],yi);const ki=yt`
  :host { 
    font-family: 'Reenie Beanie', cursive; 
    font-size: 120px; 
    line-height: 120px; 
    color: var(--color-neutral-50); 
    margin: var(--margin-md) 0;
  }
`,$i=G`
  Mock.One
`;var Ci=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Oi=class extends gt{};Oi=Ci([xt({name:"mo-mock-one",template:$i,styles:[ki]})],Oi);const zi=yt`
  :host {
    display: flex;
    width: var(--panel-height-md);
    height: var(--panel-height-md);
    max-width: 95vw;
    max-height: 90vh;
    background: var(--color-neutral-100);
    shadow: var(--shadow);
  }
  :host([screen-xs]) { 
    min-width: 95vw;
    width: 95vw;
  }
`,ji=G`
  ${Zt.html}
  <mo-card class="no-border no-margin flex-fill">
    <slot name="header" slot="header"></slot>
    <button class="neutral" slot="controls" @click="${t=>t.dispatchEvent(new CustomEvent("close"))}">
      <i class="fa-solid fa-x"></i>
    </button>
    <mo-scrollable class="flex-fill">
      <slot></slot>
    </mo-scrollable>
    <slot name="actions" slot="actions"></slot>
  </mo-card>
`,Si=yt`
  :host {
    display: block;
  }
`,Ri=G`
  <slot></slot>
`;var Ti=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Ei=class extends gt{constructor(){super(...arguments),this.handleResize=()=>{let t,e;i.isSize("xs")?t=void 0===this["width-xs"]?this.width:this["width-xs"]:i.isSize("sm")?t=void 0===this["width-sm"]?this.width:this["width-sm"]:i.isSize("md")?t=void 0===this["width-md"]?this.width:this["width-md"]:i.isSize("lg")?t=void 0===this["width-lg"]?this.width:this["width-lg"]:i.isSize("xl")&&(t=void 0===this["width-xl"]?this.width:this["width-xl"]),this.style.width=t||"",i.isSize("xs")?e=void 0===this["height-xs"]?this.height:this["height-xs"]:i.isSize("sm")?e=void 0===this["height-sm"]?this.height:this["height-sm"]:i.isSize("md")?e=void 0===this["height-md"]?this.height:this["height-md"]:i.isSize("lg")?e=void 0===this["height-lg"]?this.height:this["height-lg"]:i.isSize("xl")&&(e=void 0===this["height-xl"]?this.height:this["height-xl"]),this.style.height=e||""}}widthChanged(){this.handleResize()}"width-xsChanged"(){this.handleResize()}"width-smChanged"(){this.handleResize()}"width-mdChanged"(){this.handleResize()}"width-lgChanged"(){this.handleResize()}"width-xlChanged"(){this.handleResize()}heightChanged(){this.handleResize()}"height-xsChanged"(){this.handleResize()}"height-smChanged"(){this.handleResize()}"height-mdChanged"(){this.handleResize()}"height-lgChanged"(){this.handleResize()}"height-xlChanged"(){this.handleResize()}connectedCallback(){super.connectedCallback?.(),this.handleResize.bind(this),this.handleResize(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){super.disconnectedCallback?.(),window.removeEventListener("resize",this.handleResize)}};Ti([at],Ei.prototype,"width",void 0),Ti([at],Ei.prototype,"width-xs",void 0),Ti([at],Ei.prototype,"width-sm",void 0),Ti([at],Ei.prototype,"width-md",void 0),Ti([at],Ei.prototype,"width-lg",void 0),Ti([at],Ei.prototype,"width-xl",void 0),Ti([at],Ei.prototype,"height",void 0),Ti([at],Ei.prototype,"height-xs",void 0),Ti([at],Ei.prototype,"height-sm",void 0),Ti([at],Ei.prototype,"height-md",void 0),Ti([at],Ei.prototype,"height-lg",void 0),Ti([at],Ei.prototype,"height-xl",void 0),Ei=Ti([xt({name:"mo-screen",template:Ri,styles:[Si]})],Ei);var Ai=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Mi=class extends Ei{connectedCallback(){super.connectedCallback(),i.sync(this)}disconnectedCallback(){super.disconnectedCallback(),i.unsync(this)}};Mi=Ai([xt({name:"mo-modal-panel",template:ji,styles:[ie,zi]})],Mi);const Pi=yt`

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

`,Bi=G`
  <div class="visual flex-fill flex-col center middle">
    <slot></slot>
  </div>
`;var Ii=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Hi=class extends gt{};Hi=Ii([xt({name:"mo-placeholder",template:Bi,styles:[ie,Pi]})],Hi);var Fi=/([:*])(\w+)/g,Li="([^/]+)",Ni=/\*/g,Ui="?(?:.*)",Vi=/\/\?/g,Wi="/?([^/]+|)",_i="(?:/^|^)",qi="";function Di(t){return void 0===t&&(t="/"),es()?location.pathname+location.search+location.hash:t}function Yi(t){return t.replace(/\/+$/,"").replace(/^\/+/,"")}function Gi(t){return"string"==typeof t}function Xi(t){return t&&t.indexOf("#")>=0&&t.split("#").pop()||""}function Zi(t){var e=Yi(t).split(/\?(.*)?$/);return[Yi(e[0]),e.slice(1).join("")]}function Ji(t){for(var e={},i=t.split("&"),s=0;s<i.length;s++){var o=i[s].split("=");if(""!==o[0]){var n=decodeURIComponent(o[0]);e[n]?(Array.isArray(e[n])||(e[n]=[e[n]]),e[n].push(decodeURIComponent(o[1]||""))):e[n]=decodeURIComponent(o[1]||"")}}return e}function Ki(t,e){var i,s=Zi(Yi(t.currentLocationPath)),o=s[0],n=s[1],r=""===n?null:Ji(n),l=[];if(Gi(e.path)){if(i=_i+Yi(e.path).replace(Fi,(function(t,e,i){return l.push(i),Li})).replace(Ni,Ui).replace(Vi,Wi)+"$",""===Yi(e.path)&&""===Yi(o))return{url:o,queryString:n,hashString:Xi(t.to),route:e,data:null,params:r}}else i=e.path;var a=new RegExp(i,qi),c=o.match(a);if(c){var h=Gi(e.path)?function(t,e){return 0===e.length?null:t?t.slice(1,t.length).reduce((function(t,i,s){return null===t&&(t={}),t[e[s]]=decodeURIComponent(i),t}),null):null}(c,l):c.groups?c.groups:c.slice(1);return{url:Yi(o.replace(new RegExp("^"+t.instance.root),"")),queryString:n,hashString:Xi(t.to),route:e,data:h,params:r}}return!1}function Qi(){return!("undefined"==typeof window||!window.history||!window.history.pushState)}function ts(t,e){return void 0===t[e]||!0===t[e]}function es(){return"undefined"!=typeof window}function is(t,e){return void 0===t&&(t=[]),void 0===e&&(e={}),t.filter((function(t){return t})).forEach((function(t){["before","after","already","leave"].forEach((function(i){t[i]&&(e[i]||(e[i]=[]),e[i].push(t[i]))}))})),e}function ss(t,e,i){var s=e||{},o=0;!function e(){t[o]?Array.isArray(t[o])?(t.splice.apply(t,[o,1].concat(t[o][0](s)?t[o][1]:t[o][2])),e()):t[o](s,(function(t){void 0===t||!0===t?(o+=1,e()):i&&i(s)})):i&&i(s)}()}function os(t,e){void 0===t.currentLocationPath&&(t.currentLocationPath=t.to=Di(t.instance.root)),t.currentLocationPath=t.instance._checkForAHash(t.currentLocationPath),e()}function ns(t,e){for(var i=0;i<t.instance.routes.length;i++){var s=Ki(t,t.instance.routes[i]);if(s&&(t.matches||(t.matches=[]),t.matches.push(s),"ONE"===t.resolveOptions.strategy))return void e()}e()}function rs(t,e){t.navigateOptions&&(void 0!==t.navigateOptions.shouldResolve&&console.warn('"shouldResolve" is deprecated. Please check the documentation.'),void 0!==t.navigateOptions.silent&&console.warn('"silent" is deprecated. Please check the documentation.')),e()}function ls(t,e){!0===t.navigateOptions.force?(t.instance._setCurrent([t.instance._pathToMatchObject(t.to)]),e(!1)):e()}ss.if=function(t,e,i){return Array.isArray(e)||(e=[e]),Array.isArray(i)||(i=[i]),[t,e,i]};var as=es(),cs=Qi();function hs(t,e){if(ts(t.navigateOptions,"updateBrowserURL")){var i=("/"+t.to).replace(/\/\//g,"/"),s=as&&t.resolveOptions&&!0===t.resolveOptions.hash;cs?(history[t.navigateOptions.historyAPIMethod||"pushState"](t.navigateOptions.stateObj||{},t.navigateOptions.title||"",s?"#"+i:i),location&&location.hash&&(t.instance.t=!0,setTimeout((function(){if(!s){var e=location.hash;location.hash="",location.hash=e}t.instance.t=!1}),1))):as&&(window.location.href=t.to)}e()}function ds(t,e){var i=t.instance;i.lastResolved()?ss(i.lastResolved().map((function(e){return function(i,s){if(e.route.hooks&&e.route.hooks.leave){var o=!1,n=t.instance.matchLocation(e.route.path,t.currentLocationPath,!1);if("*"!==e.route.path)o=!n;else o=!(!!t.matches&&t.matches.find((function(t){return e.route.path===t.route.path})));ts(t.navigateOptions,"callHooks")&&o?ss(e.route.hooks.leave.map((function(e){return function(i,s){return e((function(e){!1===e?t.instance.i(t):s()}),t.matches&&t.matches.length>0?1===t.matches.length?t.matches[0]:t.matches:void 0)}})).concat([function(){return s()}])):s()}else s()}})),{},(function(){return e()})):e()}function us(t,e){ts(t.navigateOptions,"updateState")&&t.instance._setCurrent(t.matches),e()}var fs=[function(t,e){var i=t.instance.lastResolved();if(i&&i[0]&&i[0].route===t.match.route&&i[0].url===t.match.url&&i[0].queryString===t.match.queryString)return i.forEach((function(e){e.route.hooks&&e.route.hooks.already&&ts(t.navigateOptions,"callHooks")&&e.route.hooks.already.forEach((function(e){return e(t.match)}))})),void e(!1);e()},function(t,e){t.match.route.hooks&&t.match.route.hooks.before&&ts(t.navigateOptions,"callHooks")?ss(t.match.route.hooks.before.map((function(e){return function(i,s){return e((function(e){!1===e?t.instance.i(t):s()}),t.match)}})).concat([function(){return e()}])):e()},function(t,e){ts(t.navigateOptions,"callHandler")&&t.match.route.handler(t.match),t.instance.updatePageLinks(),e()},function(t,e){t.match.route.hooks&&t.match.route.hooks.after&&ts(t.navigateOptions,"callHooks")&&t.match.route.hooks.after.forEach((function(e){return e(t.match)})),e()}],vs=[ds,function(t,e){var i=t.instance._notFoundRoute;if(i){t.notFoundHandled=!0;var s=Zi(t.currentLocationPath),o=s[0],n=s[1],r=Xi(t.to);i.path=Yi(o);var l={url:i.path,queryString:n,hashString:r,data:null,route:i,params:""!==n?Ji(n):null};t.matches=[l],t.match=l}e()},ss.if((function(t){return t.notFoundHandled}),fs.concat([us]),[function(t,e){t.resolveOptions&&!1!==t.resolveOptions.noMatchWarning&&void 0!==t.resolveOptions.noMatchWarning||console.warn('Navigo: "'+t.currentLocationPath+"\" didn't match any of the registered routes."),e()},function(t,e){t.instance._setCurrent(null),e()}])];function ms(){return ms=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t},ms.apply(this,arguments)}function ps(t,e){var i=0;ds(t,(function s(){i!==t.matches.length?ss(fs,ms({},t,{match:t.matches[i]}),(function(){i+=1,s()})):us(t,e)}))}function bs(t){t.instance.i(t)}function gs(){return gs=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t},gs.apply(this,arguments)}var xs="[data-navigo]";function ws(t,e){var i,s=e||{strategy:"ONE",hash:!1,noMatchWarning:!1,linksSelector:xs},o=this,n="/",r=null,l=[],a=!1,c=Qi(),h=es();function d(t){return t.indexOf("#")>=0&&(t=!0===s.hash?t.split("#")[1]||"/":t.split("#")[0]),t}function u(t){return Yi(n+"/"+Yi(t))}function f(t,e,i,s){return t=Gi(t)?u(t):t,{name:s||Yi(String(t)),path:t,handler:e,hooks:is(i)}}function v(t,e){if(!o.o){o.o=!0,t=t?Yi(n)+"/"+Yi(t):void 0;var i={instance:o,to:t,currentLocationPath:t,navigateOptions:{},resolveOptions:gs({},s,e)};return ss([os,ns,ss.if((function(t){var e=t.matches;return e&&e.length>0}),ps,vs)],i,bs),!!i.matches&&i.matches}o.l.push((function(){return o.resolve(t,e)}))}function m(t,e){if(o.o)o.l.push((function(){return o.navigate(t,e)}));else{o.o=!0,t=Yi(n)+"/"+Yi(t);var i={instance:o,to:t,navigateOptions:e||{},resolveOptions:e&&e.resolveOptions?e.resolveOptions:s,currentLocationPath:d(t)};ss([rs,ls,ns,ss.if((function(t){var e=t.matches;return e&&e.length>0}),ps,vs),hs,bs],i,bs)}}function p(){if(h)return function(){if(h)return[].slice.call(document.querySelectorAll(s.linksSelector||xs));return[]}().forEach((function(t){"false"!==t.getAttribute("data-navigo")&&"_blank"!==t.getAttribute("target")?t.hasListenerAttached||(t.hasListenerAttached=!0,t.navigoHandler=function(e){if((e.ctrlKey||e.metaKey)&&"a"===e.target.tagName.toLowerCase())return!1;var i=t.getAttribute("href");if(null==i)return!1;if(i.match(/^(http|https)/)&&"undefined"!=typeof URL)try{var s=new URL(i);i=s.pathname+s.search}catch(t){}var n=function(t){if(!t)return{};var e,i=t.split(","),s={};return i.forEach((function(t){var i=t.split(":").map((function(t){return t.replace(/(^ +| +$)/g,"")}));switch(i[0]){case"historyAPIMethod":s.historyAPIMethod=i[1];break;case"resolveOptionsStrategy":e||(e={}),e.strategy=i[1];break;case"resolveOptionsHash":e||(e={}),e.hash="true"===i[1];break;case"updateBrowserURL":case"callHandler":case"updateState":case"force":s[i[0]]="true"===i[1]}})),e&&(s.resolveOptions=e),s}(t.getAttribute("data-navigo-options"));a||(e.preventDefault(),e.stopPropagation(),o.navigate(Yi(i),n))},t.addEventListener("click",t.navigoHandler)):t.hasListenerAttached&&t.removeEventListener("click",t.navigoHandler)})),o}function b(t,e,i){var s=l.find((function(e){return e.name===t})),o=null;if(s){if(o=s.path,e)for(var r in e)o=o.replace(":"+r,e[r]);o=o.match(/^\//)?o:"/"+o}return o&&i&&!i.includeRoot&&(o=o.replace(new RegExp("^/"+n),"")),o}function g(t){var e=Zi(Yi(t)),s=e[0],o=e[1],n=""===o?null:Ji(o);return{url:s,queryString:o,hashString:Xi(t),route:f(s,(function(){}),[i],s),data:null,params:n}}function x(t,e,i){return"string"==typeof e&&(e=w(e)),e?(e.hooks[t]||(e.hooks[t]=[]),e.hooks[t].push(i),function(){e.hooks[t]=e.hooks[t].filter((function(t){return t!==i}))}):(console.warn("Route doesn't exists: "+e),function(){})}function w(t){return"string"==typeof t?l.find((function(e){return e.name===u(t)})):l.find((function(e){return e.handler===t}))}t?n=Yi(t):console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.'),this.root=n,this.routes=l,this.destroyed=a,this.current=r,this.t=!1,this.l=[],this.o=!1,this.i=function(t){t.instance.o=!1,t.instance.l.length>0&&t.instance.l.shift()()},this.on=function(t,e,s){var o=this;return"object"!=typeof t||t instanceof RegExp?("function"==typeof t&&(s=e,e=t,t=n),l.push(f(t,e,[i,s])),this):(Object.keys(t).forEach((function(e){if("function"==typeof t[e])o.on(e,t[e]);else{var s=t[e],n=s.uses,r=s.as,a=s.hooks;l.push(f(e,n,[i,a],r))}})),this)},this.off=function(t){return this.routes=l=l.filter((function(e){return Gi(t)?Yi(e.path)!==Yi(t):"function"==typeof t?t!==e.handler:String(e.path)!==String(t)})),this},this.resolve=v,this.navigate=m,this.navigateByName=function(t,e,i){var s=b(t,e);return null!==s&&(m(s.replace(new RegExp("^/?"+n),""),i),!0)},this.destroy=function(){this.routes=l=[],c&&window.removeEventListener("popstate",this.h),this.destroyed=a=!0},this.notFound=function(t,e){return o._notFoundRoute=f("*",t,[i,e],"__NOT_FOUND__"),this},this.updatePageLinks=p,this.link=function(t){return"/"+n+"/"+Yi(t)},this.hooks=function(t){return i=t,this},this.extractGETParameters=function(t){return Zi(d(t))},this.lastResolved=function(){return r},this.generate=b,this.getLinkPath=function(t){return t.getAttribute("href")},this.match=function(t){var e={instance:o,currentLocationPath:t,to:t,navigateOptions:{},resolveOptions:s};return ns(e,(function(){})),!!e.matches&&e.matches},this.matchLocation=function(t,e,i){void 0===e||void 0!==i&&!i||(e=u(e));var s={instance:o,to:e,currentLocationPath:e};os(s,(function(){})),"string"==typeof t&&(t=void 0===i||i?u(t):t);var n=Ki(s,{name:String(t),path:t,handler:function(){},hooks:{}});return n||!1},this.getCurrentLocation=function(){return g(Yi(Di(n)).replace(new RegExp("^"+n),""))},this.addBeforeHook=x.bind(this,"before"),this.addAfterHook=x.bind(this,"after"),this.addAlreadyHook=x.bind(this,"already"),this.addLeaveHook=x.bind(this,"leave"),this.getRoute=w,this._pathToMatchObject=g,this._clean=Yi,this._checkForAHash=d,this._setCurrent=function(t){return r=o.current=t},function(){c&&(this.h=function(){o.t||v()},window.addEventListener("popstate",this.h))}.call(this),p.call(this)}var ys=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let ks=class extends gt{constructor(){super(...arguments),this.root="/",this.routeNodeName="MO-ROUTE",this.initial=!1,this.handleSlotChange=()=>{this.destroy(),this.init(),this.initial||(this.initial=!1,this.router.resolve())},this.handlePopState=t=>{this.queue&&clearTimeout(this.queue),this.queue=setTimeout((()=>{this.router.resolve(),this.queue=void 0}),10)}}connectedCallback(){super.connectedCallback?.(),this.handleSlotChange.bind(this),this.rootSlot.addEventListener("slotchange",this.handleSlotChange),window.addEventListener("popstate",this.handlePopState),this.router=new ws(this.root),this.router.notFound((()=>{this.navigate(this.fallback?.path||"/")}))}disconnectedCallback(){super.disconnectedCallback?.(),this.rootSlot.removeEventListener("slotchange",this.handleSlotChange),window.removeEventListener("popstate",this.handlePopState),this.destroy()}init(){const t=this.rootSlot.assignedNodes();for(const e of t)e.nodeName===this.routeNodeName&&this.configure(e)}destroy(){this.router.destroy()}navigate(t,e){this.router.navigate(t,e)}configure(t){t.fallback&&(this.fallback=t),t.path&&this.router.on(t.path,(()=>{this.load(t)}))}async load(t){this.active&&await this.unload(this.active),t.active=!0,this.active=t,this.dispatchEvent(new CustomEvent("load",{bubbles:!0,detail:{route:t}}))}unload(t){this.active===t&&(this.active=void 0),t.active=!1}};ys([at],ks.prototype,"root",void 0),ys([at],ks.prototype,"routeNodeName",void 0),ks=ys([xt({name:"mo-router",styles:[yt`
    :host { 
      flex: 1 1;
      display: flex;
    }
  `],template:G`
    <slot ${Bt("rootSlot")}></slot>
  `})],ks);const $s=new class{async render(t,e,i){let s;if(i&&(s=await import(i)),e){const i=document.createElement(e);t?.replaceChildren(i)}else if(s?.render)return t?.replaceChildren(),void s?.render(t)}match(t,e,i=!1){const s=t.split("/"),o=e.split("/");for(;s.length;){let t=s.shift();for(;!t&&s.length;)t=s.shift();let e=o.shift();for(;!e&&o.length;)e=o.shift();if(t&&!e)return!1;if(!t&&e)return!i;if(!t.startsWith(":")&&t!==e)return!1}return!0}};var Cs=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Os=class extends gt{constructor(){super(...arguments),this.path="",this.fallback=!1,this.active=!1}activeChanged(){this.active?$s.render(this,this.component,this.import):(this.import||this.component)&&this.replaceChildren()}};Cs([at],Os.prototype,"path",void 0),Cs([at],Os.prototype,"import",void 0),Cs([at],Os.prototype,"component",void 0),Cs([at({mode:"boolean"})],Os.prototype,"fallback",void 0),Cs([at({mode:"boolean"})],Os.prototype,"active",void 0),Os=Cs([xt({name:"mo-route",styles:[yt`
    :host(:not([active])) {
      display: none !important;
    }
    :host { flex: 1 1; display: flex; }
  `],template:G`<slot></slot>`})],Os);var zs=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let js=class extends gt{constructor(){super(...arguments),this.path="",this.active=!1,this.full=!1,this.handleOnLoad=()=>{!this.active&&this.isMatch?(this.active=!0,this.load()):this.active&&!this.isMatch&&(this.active=!1)}}get router(){return document.querySelector("mo-router")}get isMatch(){return $s.match(this.path,this.router?.active?.path||"",this.full)}connectedCallback(){super.connectedCallback?.(),this.handleOnLoad.bind(this),this.router?.addEventListener("load",this.handleOnLoad)}disconnectedCallback(){super.disconnectedCallback?.(),this.router?.removeEventListener("load",this.handleOnLoad)}async load(){await $s.render(this,this.component,this.import)}};zs([at],js.prototype,"path",void 0),zs([at],js.prototype,"import",void 0),zs([at],js.prototype,"component",void 0),zs([at({mode:"boolean"})],js.prototype,"active",void 0),zs([at({mode:"boolean"})],js.prototype,"full",void 0),js=zs([xt({name:"mo-route-match",styles:[yt`
    :host(:not([active])) {
      display: none !important;
    }
  `],template:G`<slot></slot>`})],js);const Ss=yt`
  :host { 
    position: relative;
  }
  .scrollable { 
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: none;
  }
`,Rs=G`
  <div ${Bt("scrollableRef")} class="scrollable">
    <slot></slot>
  </div>
`;var Ts=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Es=class extends gt{constructor(){super(...arguments),this.scrollLocked=!1,this.lastScrollPos=0}connectedCallback(){super.connectedCallback?.(),i.addClass(this,"no-scroll"),i.addClass(this.scrollableRef,"no-scroll"),this.scrollLocked=!0,this.resizeObserver=new ResizeObserver((()=>{this.scrollableRef.style.width=`${this.offsetWidth}px`,this.scrollableRef.style.height=`${this.offsetHeight}px`,this.scrollLocked&&setTimeout((()=>this.unlock()),10)})),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback?.(),i.removeClass(this,"no-scroll"),i.removeClass(this.scrollableRef,"no-scroll"),this.scrollLocked=!0,this.lastScrollPos=this.scrollableRef.scrollTop,this.resizeObserver.disconnect()}unlock(){i.removeClass(this,"no-scroll"),i.removeClass(this.scrollableRef,"no-scroll"),this.scrollableRef.scrollTop=this.lastScrollPos,this.scrollLocked=!1}};Es=Ts([xt({name:"mo-scrollable",template:Rs,styles:[ie,Ss]})],Es);const As=yt`
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
`,Ms=G`
  <button @click=${t=>t.go()} class="primary">
    <slot></slot>
  </button>
`;var Ps=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Bs=class extends gt{go(){const t=document.querySelector("mo-layout");t?.contentRef.focus(),window.scrollTo(0,0)}};Bs=Ps([xt({name:"mo-skip-to-content",template:Ms,styles:[ie,As]})],Bs);const Is=yt`
  :host { 
    box-sizing: border-box;
    width: 100vw;
    max-width: var(--workspace-max-width);
    margin: var(--workspace-align-margin);
  }
`,Hs=G`<slot></slot>`;var Fs=function(t,e,i,s){for(var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s,l=t.length-1;l>=0;l--)(o=t[l])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Ls=class extends gt{};Ls=Fs([xt({name:"mo-workspace",template:Hs,styles:[Is]})],Ls),i.sync(document.body,{width:!0,orientation:!0});export{Me as LockInterface,oe as MockAlertElement,ae as MockCardElement,ve as MockChartElement,ge as MockColumnsElement,$e as MockExpandableElement,Le as MockFixedContentElement,We as MockFooterElement,Ye as MockFormElement,Je as MockFormFieldElement,ei as MockFormGroupElement,ni as MockHeaderElement,He as MockLayoutElement,fi as MockLayoutMenuElement,Ls as MockLayoutWorkspaceElement,bi as MockLockElement,di as MockMenuElement,yi as MockMenuItemElement,Oi as MockMockOneElement,Mi as MockModalPanelElement,Hi as MockPlaceholderElement,Os as MockRouteElement,js as MockRouteMatchElement,ks as MockRouterElement,Ei as MockScreenElement,Es as MockScrollableElement,Bs as MockSkipToContentElement,yt as css,xt as customElement,Zt as dependency,ie as globalStyles,G as html,Ie as layout,Pe as lock,Bt as ref,qt as repeat,i as screen,Gt as slotted,Lt as when};
