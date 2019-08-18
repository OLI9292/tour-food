(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{160:function(t,n,e){"use strict";e.r(n),e.d(n,"default",function(){return k});e(229),e(195),e(102),e(106),e(107);var r=e(234),o=e.n(r),i=(e(184),e(196),e(237)),a=e.n(i),c=(e(95),e(96),e(43)),u=e.n(c),s=e(8),l=e.n(s),f=e(0),p=e.n(f),d=e(166),h=e(178),g=e(171),m=e(177),v=e(238),y=e.n(v),x=e(239),b=e.n(x),w=e(163),A=e(190),E=e(162),k=function(t){function n(n){var e;return(e=t.call(this,n)||this).state={seconds:0,locations:[],autocompleteOptions:[],autocompleteResults:[]},e.handleKeyDown=e.handleKeyDown.bind(u()(e)),e}l()(n,t);var e=n.prototype;return e.componentDidMount=function(){var t=this;this.requestLocation(),document.addEventListener("keydown",this.handleKeyDown,!1);var n=setInterval(function(){var n=t.state.seconds;n=3===n?1:n+1,t.setState({seconds:n})},1e3);fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSba72Al-RA3rUkBruesaJpLe8A5pIm-EJ8ZvY5SeSIzJWi8sebSnNqBTckypxCCyEhk2UaWvD_6Kfe/pub?output=csv").then(function(t){return t.text()}).then(function(e){var r=Object(h.uniqBy)(e.split("\n").map(A.g).filter(function(t){return t}).slice(1),function(t){return t.latitude+" - "+t.longitude});console.log("Data loaded.");var o=Object(h.uniq)(r.map(function(t){return t.city+", "+t.state}));t.setState({locations:r,autocompleteOptions:o,timeout:n})})},e.componentWillUnmount=function(){clearInterval(this.state.timeout),document.removeEventListener("keydown",this.handleKeyDown,!1)},e.autocomplete=function(t,n){var e=(t=t.toLowerCase()).length?this.state.autocompleteOptions.filter(function(n){return n.toLowerCase().startsWith(t)&&n.toLowerCase()!==t}).slice(0,4):[];this.setState({autocompleteResults:e,inputLetter:n})},e.findAlongRoute=function(){var t=a()(o.a.mark(function t(n,e){var r=this;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:console.log("Find along route:",n),Object(A.a)(n[0],n[1],function(t,n,o,i,a){if(t){console.log("Computing "+t.length+" steps.");var c=r.state.locations.map(function(n){var e=n.latitude,r=n.longitude;return{location:n,distanceFromRoute:Math.min.apply(Math,t.map(function(t){var n=t.start,o=t.end;return Object(A.b)(e,r,n.lat,n.lng,o.lat,o.lng)}))}}).filter(function(t){return t.distanceFromRoute<30}).sort(function(t,n){return parseFloat(t.distanceFromRoute)-parseFloat(n.distanceFromRoute)}).slice(0,75).map(function(t){var n=t.location;t.distanceFromRoute;return{location:n,distance:Object(A.c)(n.latitude,n.longitude,i.lat,i.lng)}}).sort(function(t,n){return parseFloat(t.distance)-parseFloat(n.distance)});e(c,n,o)}});case 2:case"end":return t.stop()}},t)}));return function(n,e){return t.apply(this,arguments)}}(),e.findNearLocation=function(){var t=a()(o.a.mark(function t(n,e){var r=this;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:console.log("Find nearby:",n[0]),Object(A.d)(n[0],function(t,n,o,i){if(i)return r.setState({error:i});var a=r.state.locations.map(function(e){return{location:e,distance:Object(A.c)(e.latitude,e.longitude,t,n)}}).filter(function(t){return t.distance<25}).sort(function(t,n){return parseFloat(t.distance)-parseFloat(n.distance)}).slice(0,75);e(a,o)});case 2:case"end":return t.stop()}},t)}));return function(n,e){return t.apply(this,arguments)}}(),e.glowInput=function(t){var n=this;if(!this.state.glow){var e="Please enter a "+(t.includes("A")?"location":"destination")+".";this.setState({glow:t,error:e}),setTimeout(function(){return n.setState({glow:void 0})},1e3)}},e.handleKeyDown=function(t){var n,e=this.state,r=e.autocompleteResults,o=e.inputLetter,i=e.selectedAutocomplete,a=t.key.toLowerCase().includes("up"),c=t.key.toLowerCase().includes("down");if(0!==r.length&&(a||c)&&(c?n=Object(h.isNumber)(i)?Math.min(r.length-1,i+1):0:i&&(n=Math.max(0,i-1)),Object(h.isNumber)(n))){var u={selectedAutocomplete:n},s=r[n];u["A"===o?"locationA":"locationB"]=s,this.setState(u)}},e.requestLocation=function(){var t=this;if(navigator){var n=void 0!==navigator.permissions,e={enableHighAccuracy:!0,timeout:5e3,maximumAge:0},r=function(n){if(n&&n.coords){var e=n.coords,r=e.latitude,o=e.longitude;Object(A.h)(r+","+o,function(n){n&&t.setState({locationA:n})})}};n?navigator.permissions.query({name:"geolocation"}).then(function(t){"denied"!==t.state&&navigator.geolocation.getCurrentPosition(r,function(t){return console.log("ERR: "+t.message)},e)}):navigator.geolocation.getCurrentPosition(r,function(t){return console.log("ERR: "+t.message)},e)}},e.reset=function(){this.setState({autocompleteResults:[],error:void 0,locationA:void 0,locationB:void 0,results:void 0,searchType:void 0,selectedAutocomplete:void 0})},e.search=function(t,n,e,r){var o=this;return t?r&&!n?this.glowInput("locationB"):(this.setState({isNetworking:!0,error:void 0}),void(r?this.findAlongRoute.bind(this):this.findNearLocation.bind(this))([t,n],function(n,i,a){console.log("Found "+n.length+" locations."),o.setState({isNetworking:!1});var c=r?" from "+i+" to "+a:" near "+i;if(0===n.length)return o.setState({error:"0 results"+c});var u=n.length+" result";n.length>1&&(u+="s"),u+=c;var s={state:void 0,city:void 0,tag:void 0};if(!r){var l=e.find(function(n){return n.city+", "+n.state===t});l&&(s.city=l.city,s.state=l.state)}console.log(s);var f={description:u,results:n,locations:e,filterBy:s};Object(d.b)("/results",{state:f})})):this.glowInput("locationA")},e.render=function(){var t=this,n=this.state,e=n.autocompleteResults,r=n.error,o=n.glow,i=n.inputLetter,a=n.isNetworking,c=n.locationA,u=n.locationB,s=n.locations,l=n.searchType,f=n.seconds,v=n.selectedAutocomplete,x="destination"===l,A="route"===l,k=p.a.createElement(w.f,{color:l?E.a.orange:"white"},"search by location"),O=p.a.createElement(w.f,{color:l?E.a.blue:"white"},"search by route"),L=p.a.createElement(w.d,null,p.a.createElement("div",{style:{margin:"40px 0"}},x?k:O),p.a.createElement("div",{style:{margin:"20px 0",position:"relative"}},p.a.createElement(w.h,{spellCheck:!1,onChange:function(n){var e=n.target.value;t.setState({locationA:e},function(){return t.autocomplete(e,"A")})},value:c||"",type:"value",autoFocus:!0,placeholder:x?"Location (venue, city, etc.)":"From (venue, city, etc.)"}),"A"===i&&e.length>0&&p.a.createElement(w.a,null,e.map(function(n,e){return p.a.createElement(w.m,{key:e,color:e===v?E.a.orange:"black",onClick:function(){return t.setState({locationA:n,autocompleteResults:[]})},style:{margin:"8px 0",cursor:"pointer"},small:!0},n)})),p.a.createElement(w.e,{glow:"locationA"===o})),"route"===l&&p.a.createElement("div",{style:{margin:"20px 0",position:"relative"}},p.a.createElement(w.h,{spellCheck:!1,onChange:function(n){var e=n.target.value;t.setState({locationB:e},function(){return t.autocomplete(e,"B")})},value:u||"",type:"value",placeholder:"To..."}),"B"===i&&e.length>0&&p.a.createElement(w.a,null,e.map(function(n,e){return p.a.createElement(w.m,{key:e,onClick:function(){return t.setState({locationB:n,autocompleteResults:[]})},color:e===v?E.a.orange:"black",style:{margin:"8px 0",cursor:"pointer"},small:!0},n)})),p.a.createElement(w.e,{glow:"locationB"===o})),a?p.a.createElement(w.m,{color:E.a.gray},"Searching",".".repeat(f)):p.a.createElement(w.l,{onClick:function(n){if(n.preventDefault(),e.length&&Object(h.isNumber)(v)){var r={autocompleteResults:[],selectedAutocomplete:void 0};r["location"+i]=e[v],t.setState(r)}else t.search(c,u,s,A)},type:"submit",value:"search",color:x?E.a.orange:E.a.blue}),r&&p.a.createElement(w.m,{small:!0,color:E.a.red,style:{marginTop:"15px"}},r)),j=p.a.createElement(w.k,null,p.a.createElement(w.j,{style:{marginBottom:"15px"},onClick:function(){return t.setState({searchType:"route"})}},p.a.createElement(w.g,{style:{backgroundImage:'url("'+y.a+'")'}}),O),p.a.createElement(w.j,{onClick:function(){return t.setState({searchType:"destination"})}},p.a.createElement(w.g,{style:{backgroundImage:'url("'+b.a+'")'}}),k),p.a.createElement("div",{onClick:function(){if(s.length){var t={state:void 0,city:void 0,tag:void 0};Object(d.b)("/results",{state:{results:[],locations:s,filterBy:t}})}},style:{cursor:"pointer",flex:1,marginTop:"10px"}},p.a.createElement(w.f,{style:{color:"white",margin:0}},"VIEW ALL")));return p.a.createElement(w.b,{style:{backgroundColor:l?"white":E.a.orange}},p.a.createElement(g.a,{title:"Home"}),p.a.createElement(m.a,{reset:this.reset.bind(this),siteTitle:"Tour Food"}),l?L:j)},n}(p.a.Component)},162:function(t,n,e){"use strict";n.a={blue:"#157EFB",lightBlue:"#abd1fe",orange:"#FB6320",gray:"#808080",lightGray:"#ccc",lightestGray:"#f0f0f0",darkGray:"#484848",red:"#C80004"}},163:function(t,n,e){"use strict";e.d(n,"c",function(){return b}),e.d(n,"m",function(){return w}),e.d(n,"b",function(){return A}),e.d(n,"f",function(){return E}),e.d(n,"k",function(){return k}),e.d(n,"j",function(){return O}),e.d(n,"g",function(){return L}),e.d(n,"h",function(){return j}),e.d(n,"e",function(){return C}),e.d(n,"l",function(){return S}),e.d(n,"d",function(){return F}),e.d(n,"i",function(){return R}),e.d(n,"a",function(){return B});e(183);var r=e(164),o=e.n(r),i=e(165),a=e(162);function c(){var t=o()(["\n  position: absolute;\n  width: 100%;\n  background-color: white;\n  font-family: BrandonGrotesqueLight;\n  border: 3px solid ",";\n  border-radius: 0 0 5px 5px;\n  text-align: left;\n  padding: 0 10px;\n  z-index: 500;\n  box-sizing: border-box;\n"]);return c=function(){return t},t}function u(){var t=o()(["\n  width: ","px;\n  margin-left: ","px;\n  margin-top: ","px;\n  height: auto;\n  opacity: ",";\n  cursor: pointer;\n"]);return u=function(){return t},t}function s(){var t=o()(["\n  text-align: center;\n  width: 320px;\n  margin: 0 auto;\n"]);return s=function(){return t},t}function l(){var t=o()(["\n  -webkit-appearance: none;\n  background-color: ",";\n  color: white;\n  text-transform: uppercase;\n  text-align: center;\n  cursor: pointer;\n  outline: 0;\n  border: 0;\n  border-radius: 10px;\n  padding: 10px 0;\n  font-size: 1.2em;\n  letter-spacing: 1px;\n  font-weight: 700;\n  margin: 0 auto;\n  width: 100%;\n  display: block;\n  margin-top: 25px;\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.13), 0 3px 3px rgba(0, 0, 0, 0.17);\n"]);return l=function(){return t},t}function f(){var t=o()(["\n  background-color: ",";\n  transition: background-color 0.15s ease;\n  height: 4px;\n  border-radius: 5px;\n  width: 100%;\n"]);return f=function(){return t},t}function p(){var t=o()(["\n  outline: 0;\n  text-align: left;\n  width: 100%;\n  border: 0;\n  ::placeholder {\n    color: ",";\n  }\n  font-weight: 600;\n  font-size: 1.2em;\n  display: block;\n"]);return p=function(){return t},t}function d(){var t=o()(["\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n  flex: 1;\n"]);return d=function(){return t},t}function h(){var t=o()(["\n  flex: 7;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n"]);return h=function(){return t},t}function g(){var t=o()(["\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  object-fit: contain;\n  position: fixed;\n  top: 80px;\n  bottom: 5px;\n  left: 10px;\n  right: 10px;\n"]);return g=function(){return t},t}function m(){var t=o()(["\n  color: ",";\n  text-transform: uppercase;\n  font-family: BrandonGrotesqueBold;\n  letter-spacing: 1.5px;\n  margin: 10px 5px;\n"]);return m=function(){return t},t}function v(){var t=o()(["\n  height: 100vh;\n  width: 100vw;\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n"]);return v=function(){return t},t}function y(){var t=o()(["\n  margin: 0;\n  color: ",";\n  font-size: ","em;\n"]);return y=function(){return t},t}function x(){var t=o()(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);return x=function(){return t},t}var b=i.a.div(x()),w=i.a.p(y(),function(t){return t.color||"black"},function(t){return t.large?1.4:t.small?1:t.extraSmall?.8:1.2}),A=i.a.div(v()),E=i.a.h2(m(),function(t){return t.color}),k=i.a.div(g()),O=i.a.div(h()),L=i.a.div(d()),j=i.a.input(p(),a.a.gray),C=i.a.div(f(),function(t){return t.glow?a.a.red:a.a.gray}),S=i.a.input(l(),function(t){return t.color}),F=i.a.form(s()),R=i.a.img(u(),function(t){return t.highlight?50:45},function(t){return t.highlight?-25:-22.5},function(t){return t.highlight?-50:-45},function(t){return t.highlight?1:.5}),B=i.a.div(c(),a.a.blue)},166:function(t,n,e){"use strict";var r=e(0),o=e.n(r),i=e(5),a=e.n(i),c=e(40),u=e.n(c);e.d(n,"a",function(){return u.a}),e.d(n,"b",function(){return c.navigate});e(168),o.a.createContext({});a.a.object,a.a.string.isRequired,a.a.func,a.a.func},168:function(t,n,e){var r;t.exports=(r=e(173))&&r.default||r},171:function(t,n,e){"use strict";var r=e(172),o=e(0),i=e.n(o),a=e(5),c=e.n(a),u=e(181),s=e.n(u);function l(t){var n=t.description,e=t.lang,o=t.meta,a=t.title,c=r.data.site,u=n||c.siteMetadata.description;return i.a.createElement(s.a,{htmlAttributes:{lang:e},title:a,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:u},{property:"og:title",content:a},{property:"og:description",content:u},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:a},{name:"twitter:description",content:u}].concat(o)})}l.defaultProps={lang:"en",meta:[],description:""},l.propTypes={description:c.a.string,lang:c.a.string,meta:c.a.arrayOf(c.a.object),title:c.a.string.isRequired},n.a=l},172:function(t){t.exports={data:{site:{siteMetadata:{title:"Tour Food",description:"Good places for food and drink on tour!",author:"Oliver Plunkett"}}}}},173:function(t,n,e){"use strict";e.r(n);e(41);var r=e(0),o=e.n(r),i=e(5),a=e.n(i),c=e(64),u=function(t){var n=t.location,e=t.pageResources;return e?o.a.createElement(c.a,Object.assign({location:n,pageResources:e},e.json)):null};u.propTypes={location:a.a.shape({pathname:a.a.string.isRequired}).isRequired},n.default=u},174:function(t,n,e){t.exports=e.p+"static/icon-non-transparent-ce25ee245fee89e5e6ae91bb1192d2fb.jpg"},175:function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAAuUlEQVR42u3ZLQ4CMRgE0A0ONEUQLskFdvcMsAROCRgwNClt8JCu4Ce8l4ysGfFVTNMAAAAAAAAA8DnLPs1CF3ehvZ1zkjzNKbRxWK3TtLroRRsPCqxL6ayu5T5N8sOr8qpzKd0p+uuKdjpGZd7FffWNLoc9f4bbx6FX4osc82e4GfUZAgAAAAD8OeOscdY4K8ZZ46xx1jhrnAUAAAAAeAPjrHHWOCvGWeOscdY4a5wFAAAAAAAA+DV3Fg75up5QTbAAAAAASUVORK5CYII="},177:function(t,n,e){"use strict";var r=e(164),o=e.n(r),i=e(8),a=e.n(i),c=e(0),u=e.n(c),s=e(165),l=e(166),f=(e(182),e(178)),p=e(163),d=e(162);function h(){var t=o()(["\n  cursor: pointer;\n  &:hover {\n    color: ",";\n    transition: color 0.15s ease;\n  }\n"]);return h=function(){return t},t}function g(){var t=o()(["\n  line-height: 40px;\n  min-width: 150px;\n  letter-spacing: 1px;\n  border: 4px solid #157efb;\n  background-color: white;\n  position: absolute;\n  font-family: BrandonGrotesqueLight;\n  padding: 10px;\n  box-sizing: border-box;\n  right: -4px;\n  top: 62px;\n  z-index: 600;\n  border: 2px solid ",";\n  @media (max-width: 600px) {\n    top: 47px;\n  }\n"]);return g=function(){return t},t}var m=function(t){function n(){return t.apply(this,arguments)||this}return a()(n,t),n.prototype.render=function(){return u.a.createElement(v,{onMouseLeave:this.props.onMouseLeave.bind(this)},u.a.createElement(l.a,{style:{textDecoration:"none"},to:"/about"},u.a.createElement(y,null,"About")),u.a.createElement(l.a,{style:{textDecoration:"none"},to:"/faq"},u.a.createElement(y,null,"FAQ")),u.a.createElement(l.a,{style:{textDecoration:"none"},to:"/contact"},u.a.createElement(y,null,"Contact")))},n}(c.Component),v=s.a.div(g(),d.a.blue),y=Object(s.a)(p.m)(h(),d.a.orange),x=e(174),b=e.n(x),w=e(175),A=e.n(w);function E(){var t=o()(["\n  width: auto;\n  height: 80%;\n  cursor: pointer;\n  position: absolute;\n  right: 5px;\n  z-index: 500;\n"]);return E=function(){return t},t}function k(){var t=o()(["\n  width: auto;\n  height: 80%;\n  cursor: pointer;\n  position: absolute;\n  left: 5px;\n  z-index: 500;\n"]);return k=function(){return t},t}function O(){var t=o()(["\n  background-color: white;\n  padding: 10px;\n  box-sizing: border-box;\n  border: 3px solid ",";\n  font-weight: 400;\n  width: 100%;\n  z-index: 100;\n  position: absolute;\n  top: 62px;\n  left: 0;\n  max-height: 500px;\n  overflow: scroll;\n  -webkit-overflow-scrolling: touch;\n  border-top-width: 0px;\n  @media (max-width: 600px) {\n    padding: 0px;\n    top: 47px;\n    grid-template-columns: 1fr;\n    overflow: scroll;\n    border-width: 0 0 3px 0;\n    width: 100vw;\n    left: 0;\n    max-height: none;\n    bottom: 0;\n    position: fixed;\n  }\n"]);return O=function(){return t},t}function L(){var t=o()(["\n  text-transform: capitalize;\n  &:hover {\n    color: ",";\n  }\n  transition: color 0.15s ease;\n  font-family: BrandonGrotesqueLight;\n"]);return L=function(){return t},t}function j(){var t=o()(["\n  padding: 2px;\n  @media (max-width: 600px) {\n    border-bottom: 0.5px solid ",";\n    padding: 10px;\n    cursor: pointer;\n  }\n"]);return j=function(){return t},t}function C(){var t=o()(["\n  justify-content: center;\n  flex-grow: 1;\n  cursor: pointer;\n  position: relative;\n  height: 100%;\n  @media (max-width: 600px) {\n    position: static;\n  }\n  z-index: 1000;\n"]);return C=function(){return t},t}function S(){var t=o()(["\n  border-color: "," transparent;\n  transition: border-color 0.15s ease;\n  border-style: solid;\n  border-width: 10px 8px 0px 8px;\n  height: 0px;\n  width: 0px;\n  @media (max-width: 600px) {\n    border-width: 9px 7px 0px 7px;\n  }\n"]);return S=function(){return t},t}function F(){var t=o()(["\n  text-transform: capitalize;\n  margin-right: 5px;\n  transition: color 0.15s ease;\n  @media (max-width: 600px) {\n    margin-right: 3px;\n    font-size: 0.95em;\n  }\n"]);return F=function(){return t},t}function R(){var t=o()(["\n  position: absolute;\n  width: 100%;\n  left: 0;\n  height: 3px;\n  z-index: 5000;\n  bottom: 0;\n  background-color: ",";\n"]);return R=function(){return t},t}function B(){var t=o()(["\n  height: 65px;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  position: relative;\n  @media (max-width: 600px) {\n    height: 50px;\n  }\n"]);return B=function(){return t},t}function M(){var t=o()(["\n  flex-grow: 1;\n  justify-content: space-around;\n  margin: 0 80px;\n  border-left: 3px solid rgb(21, 126, 251);\n  border-right: 3px solid rgb(21, 126, 251);\n  position: absolute;\n  left: 4px;\n  right: 0;\n  top: 0;\n  height: 100%;\n  @media (max-width: 600px) {\n    margin: 0 52px 0 60px;\n  }\n"]);return M=function(){return t},t}e.d(n,"a",function(){return G});var G=function(t){function n(n){var e;return(e=t.call(this,n)||this).state={displayMenu:!1},e}return a()(n,t),n.prototype.render=function(){var t=this,n=this.props,e=n.showFilters,r=n.filterOptions,o=n.filterBy,i=n.reset,a=this.state,c=a.displayMenu,s=a.displayOptionsFor,p=function(t){return s===t||o[t]?d.a.orange:d.a.blue},h=function(n,e){return u.a.createElement(U,null,Object(f.sortBy)(e||r[n],function(t){return t.toLowerCase()}).map(function(e,r){return u.a.createElement(I,{key:r,onClick:function(r){r.stopPropagation(),t.setState({displayOptionsFor:void 0}),t.props.filter(n,e)}},u.a.createElement(D,{color:"black",extraSmall:!0},e))}))};return u.a.createElement(N,{style:{backgroundColor:"white"}},u.a.createElement(P,null),u.a.createElement(l.a,{style:{height:"75%"},to:"/"},u.a.createElement(K,{onClick:function(){i&&i()},alt:"tour food",src:b.a})),e&&o&&u.a.createElement(T,null,u.a.createElement(q,{onMouseOver:function(){o.state||t.setState({displayOptionsFor:"state"})},onClick:function(){t.setState({displayOptionsFor:void 0}),o.state&&t.props.filter("state",void 0)}},u.a.createElement(_,{color:p("state")},o.state||"State"),u.a.createElement(z,{color:p("state")}),"state"===s&&h("state")),u.a.createElement(q,{onMouseOver:function(){o.city||t.setState({displayOptionsFor:"city"})},onClick:function(){t.setState({displayOptionsFor:void 0}),o.city&&t.props.filter("city",void 0)},style:{borderRight:"1px solid "+d.a.gray,borderLeft:"1px solid "+d.a.gray}},u.a.createElement(_,{color:p("city")},o.city||"City"),u.a.createElement(z,{color:p("city")}),"city"===s&&h("city",r.cities)),u.a.createElement(q,{onMouseOver:function(){o.tag||t.setState({displayOptionsFor:"tag"})},onClick:function(){t.setState({displayOptionsFor:void 0}),o.tag&&t.props.filter("tag",void 0)}},u.a.createElement(_,{color:p("tag")},o.tag||"Tag"),u.a.createElement(z,{color:p("tag")}),"tag"===s&&h("tag"))),u.a.createElement(W,{onClick:function(){return t.setState({displayMenu:!c})},onMouseOver:function(){return t.setState({displayMenu:!0})},alt:"menu",src:A.a}),c&&u.a.createElement(m,{onMouseLeave:function(){return t.setState({displayMenu:!1})}}))},n}(u.a.Component),T=Object(s.a)(p.c)(M()),N=s.a.header(B()),P=s.a.div(R(),d.a.blue),_=Object(s.a)(p.m)(F()),z=s.a.div(S(),function(t){return t.color}),q=Object(s.a)(p.c)(C()),I=s.a.div(j(),d.a.lightGray),D=Object(s.a)(p.m)(L(),d.a.orange),U=s.a.div(O(),d.a.blue),K=s.a.img(k()),W=s.a.img(E())},190:function(t,n,e){"use strict";e.d(n,"g",function(){return a}),e.d(n,"d",function(){return c}),e.d(n,"h",function(){return u}),e.d(n,"a",function(){return s}),e.d(n,"e",function(){return l}),e.d(n,"c",function(){return p}),e.d(n,"b",function(){return d}),e.d(n,"f",function(){return h});e(197),e(191),e(97),e(65),e(42),e(100),e(99),e(198),e(184),e(66),e(185),e(98),e(95),e(96);var r=e(199),o=e(178),i="&key=AIzaSyBdXkVtyeTG0wf51sEXEEZLyMqvFkoyEqE",a=function(t,n){void 0===n&&(n=!1);try{var e=function(t){return t.trim().split(/,(?=(?:(?:[^"]*(?:")){2})*[^"]*$)/).map(function(t){return(t=t.trim()).startsWith('"')&&t.endsWith('"')?t.slice(1,-1):t})}(t),r={name:e[0],city:e[1],state:e[2],tags:e[4].split(",").map(function(t){return t.trim()}).filter(function(t){return t}),comments:e[5],latitude:parseFloat(e[8],10),longitude:parseFloat(e[9],10),url:e[10]};return r.name&&r.city&&r.state&&r.latitude&&r.longitude?r:void(!0===n&&console.log("ERR: missing field\n",t,"\n",r,"\n"))}catch(o){!0===n&&console.log("ERR: failed to parse "+t)}},c=function(t,n){var e="https://maps.googleapis.com/maps/api/geocode/json?address="+t+i;console.log("Fetching "+e+"."),fetch(e).then(function(t){return t.json()}).then(function(e){console.log("Google API geocoding received.");try{var r=e.results[0],o=r.geometry.location,i=o.lat,a=o.lng,c=r.formatted_address.replace(", USA","");n(i,a,c)}catch(u){n(null,null,null,"Could not find "+t+".")}})},u=function(t,n){var e="https://maps.googleapis.com/maps/api/geocode/json?latlng="+t+i;console.log("Fetching "+e+"."),fetch(e).then(function(t){return t.json()}).then(function(e){console.log("Google API reverse geocoding received.");try{var r=e.results[0],o=r.geometry.location,i=(o.lat,o.lng,r.formatted_address.replace(", USA",""));n(i)}catch(a){n(null,"Could not find "+t+".")}})},s=function(t,n,e){fetch("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin="+t+"&destination="+n+i).then(function(t){return t.json()}).then(function(r){console.log("Google API directions received.");try{var o=r.routes[0].legs[0],i=o.steps,a=o.start_address,c=o.start_location,u=o.end_address;i=i.filter(function(t){return t.distance.value>1e3}).map(function(t){return{start:t.start_location,end:t.end_location}}),e(i,a.replace(", USA",""),u.replace(", USA",""),c)}catch(s){e(null,null,null,"Could not find directions from "+t+" to "+n+".")}}).catch(function(t){return console.log(t)})},l=function(t){if(1===t.length){var n=t[0].location,e=n.latitude,r=n.longitude;return{nw:{lat:e+.1,lng:r-.1},se:{lat:e-.1,lng:r+.1}}}var o=t.map(function(t){return t.location.latitude}),i=t.map(function(t){return t.location.longitude}),a=Math.max.apply(Math,o),c=Math.min.apply(Math,o),u=Math.max.apply(Math,i);return{nw:{lat:a,lng:Math.min.apply(Math,i)},se:{lat:c,lng:u}}},f=function(t,n){var e,r="tags"===n?(e=[]).concat.apply(e,t.map(function(t){return t[n]})):t.map(function(t){return t[n]});return Array.from(new Set(r)).filter(function(t){return t}).sort()},p=function(t,n,e,o){return r.getDistance({latitude:t,longitude:n},{latitude:e,longitude:o})/1609.344},d=function(t,n,e,o,i,a){return r.getDistanceFromLine({latitude:t,longitude:n},{latitude:e,longitude:o},{latitude:i,longitude:a})/1609.344},h=function(t,n,e){var r;console.log("Getting filter options for "+t.length+" locations.");var i=Object(o.countBy)((r=[]).concat.apply(r,t.map(function(t){return t.tags}))),a=Object(o.sortBy)(Object.keys(i),function(t){return i[t]}).reverse().sort(),c=new Map(a.map(function(t){return[t.toLowerCase(),t]}));a=Array.from(c.values());var u=f(t,"city"),s=Object(o.groupBy)(t,"city"),l=Object(o.sortBy)(u,function(t){return s[t].length}).reverse().slice(0,e).sort();return{filterOptions:{state:f(t,"state"),city:f(t,"city"),topCities:l,tag:a},filterBy:n}}},196:function(t,n){!function(n){"use strict";var e,r=Object.prototype,o=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag",s="object"==typeof t,l=n.regeneratorRuntime;if(l)s&&(t.exports=l);else{(l=n.regeneratorRuntime=s?t.exports:{}).wrap=b;var f="suspendedStart",p="suspendedYield",d="executing",h="completed",g={},m={};m[a]=function(){return this};var v=Object.getPrototypeOf,y=v&&v(v(R([])));y&&y!==r&&o.call(y,a)&&(m=y);var x=k.prototype=A.prototype=Object.create(m);E.prototype=x.constructor=k,k.constructor=E,k[u]=E.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===E||"GeneratorFunction"===(n.displayName||n.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,k):(t.__proto__=k,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(x),t},l.awrap=function(t){return{__await:t}},O(L.prototype),L.prototype[c]=function(){return this},l.AsyncIterator=L,l.async=function(t,n,e,r){var o=new L(b(t,n,e,r));return l.isGeneratorFunction(n)?o:o.next().then(function(t){return t.done?t.value:o.next()})},O(x),x[u]="Generator",x[a]=function(){return this},x.toString=function(){return"[object Generator]"},l.keys=function(t){var n=[];for(var e in t)n.push(e);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},l.values=R,F.prototype={constructor:F,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(S),!t)for(var n in this)"t"===n.charAt(0)&&o.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function r(r,o){return c.type="throw",c.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),s=o.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,n){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=n&&n<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=n,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),g},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),S(e),g}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var o=r.arg;S(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:R(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),g}}}function b(t,n,e,r){var o=n&&n.prototype instanceof A?n:A,i=Object.create(o.prototype),a=new F(r||[]);return i._invoke=function(t,n,e){var r=f;return function(o,i){if(r===d)throw new Error("Generator is already running");if(r===h){if("throw"===o)throw i;return B()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var c=j(a,e);if(c){if(c===g)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(r===f)throw r=h,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);r=d;var u=w(t,n,e);if("normal"===u.type){if(r=e.done?h:p,u.arg===g)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(r=h,e.method="throw",e.arg=u.arg)}}}(t,e,a),i}function w(t,n,e){try{return{type:"normal",arg:t.call(n,e)}}catch(r){return{type:"throw",arg:r}}}function A(){}function E(){}function k(){}function O(t){["next","throw","return"].forEach(function(n){t[n]=function(t){return this._invoke(n,t)}})}function L(t){var n;this._invoke=function(e,r){function i(){return new Promise(function(n,i){!function n(e,r,i,a){var c=w(t[e],t,r);if("throw"!==c.type){var u=c.arg,s=u.value;return s&&"object"==typeof s&&o.call(s,"__await")?Promise.resolve(s.__await).then(function(t){n("next",t,i,a)},function(t){n("throw",t,i,a)}):Promise.resolve(s).then(function(t){u.value=t,i(u)},function(t){return n("throw",t,i,a)})}a(c.arg)}(e,r,n,i)})}return n=n?n.then(i,i):i()}}function j(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,j(t,n),"throw"===n.method))return g;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var o=w(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,g;var i=o.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,g):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function C(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function S(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function F(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function R(t){if(t){var n=t[a];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,i=function n(){for(;++r<t.length;)if(o.call(t,r))return n.value=t[r],n.done=!1,n;return n.value=e,n.done=!0,n};return i.next=i}}return{next:B}}function B(){return{value:e,done:!0}}}(function(){return this||"object"==typeof self&&self}()||Function("return this")())},229:function(t,n,e){var r=e(9);r(r.P,"String",{repeat:e(230)})},230:function(t,n,e){"use strict";var r=e(34),o=e(25);t.exports=function(t){var n=String(o(this)),e="",i=r(t);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(n+=n))1&i&&(e+=n);return e}},234:function(t,n,e){t.exports=e(235)},235:function(t,n,e){var r=function(){return this||"object"==typeof self&&self}()||Function("return this")(),o=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,i=o&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,t.exports=e(196),o)r.regeneratorRuntime=i;else try{delete r.regeneratorRuntime}catch(a){r.regeneratorRuntime=void 0}},237:function(t,n){function e(t,n,e,r,o,i,a){try{var c=t[i](a),u=c.value}catch(s){return void e(s)}c.done?n(u):Promise.resolve(u).then(r,o)}t.exports=function(t){return function(){var n=this,r=arguments;return new Promise(function(o,i){var a=t.apply(n,r);function c(t){e(a,o,i,c,u,"next",t)}function u(t){e(a,o,i,c,u,"throw",t)}c(void 0)})}}},238:function(t,n,e){t.exports=e.p+"static/search-by-route-c2ae71bb509501aa7262c7695f1a839b.jpg"},239:function(t,n,e){t.exports=e.p+"static/search-nearby-55f3be6631884f02048a2ca8e6d3678e.jpg"}}]);
//# sourceMappingURL=component---src-pages-index-js-21824b3082ed1283fc92.js.map