(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{157:function(t,n,e){"use strict";e.r(n);var r=e(218),a=e.n(r),o=(e(183),e(188),e(220)),i=e.n(o),c=(e(95),e(8)),u=e.n(c),l=e(0),s=e.n(l),d=e(221),p=e(170),f=e(174),g=e(172),m=e(242),h=e.n(m),v=e(243),y=e.n(v),x=e(166),b=(e(180),e(99),e(100),"&key="+{}.GATSBY_GOOGLE_API_KEY),E=function(t){try{var n=function(t){return t.trim().split(/,(?=(?:(?:[^"]*(?:")){2})*[^"]*$)/).map(function(t){return(t=t.trim()).startsWith('"')&&t.endsWith('"')?t.slice(1,-1):t})}(t),e={name:n[0],city:n[1],state:n[2],tags:n[4].split(",").map(function(t){return t.trim()}),comments:n[5],latitude:parseFloat(n[8],10),longitude:parseFloat(n[9],10),url:n[10]};return console.log(e),e.name&&e.city&&e.state?e:void console.log("ERR: failed to parse\n",t,"\n",e,"\n")}catch(r){console.log("ERR: failed to parse "+t)}},w=function(t,n){return fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+t+b).then(function(t){return t.json()}).then(function(e){try{var r=e.results[0].geometry.location,a=r.lat,o=r.lng;n(a,o)}catch(i){throw console.log("ERR:",i),new Error("Could not geocode location: "+t)}})},k=e(162);e.d(n,"default",function(){return F});var F=function(t){function n(n){var e;return(e=t.call(this,n)||this).state={},e}u()(n,t);var e=n.prototype;return e.reset=function(){this.setState({searchType:void 0,locationA:void 0,locationB:void 0,results:void 0})},e.checkLocation=function(){"geolocation"in navigator&&navigator.geolocation.getCurrentPosition(function(t){var n=t.coords,e=n.latitude,r=n.longitude;console.log(e,r)},function(t){return console.log(t)},{timeout:5e3})},e.componentDidMount=function(){var t=this;this.checkLocation(),fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSba72Al-RA3rUkBruesaJpLe8A5pIm-EJ8ZvY5SeSIzJWi8sebSnNqBTckypxCCyEhk2UaWvD_6Kfe/pub?output=csv").then(function(t){return t.text()}).then(function(n){var e=n.split("\n").map(E).filter(function(t){return t}).slice(1);t.setState({locations:e})})},e.findNearLocation=function(){var t=i()(a.a.mark(function t(n,e){var r=this;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:w(n[0],function(t,n){var a=r.state.locations.map(function(e){return{location:e,distance:d.getDistance({latitude:e.latitude,longitude:e.longitude},{latitude:t,longitude:n})/1609.344}}).filter(function(t){return t.distance<25}).sort(function(t,n){return parseFloat(t.distance)-parseFloat(n.distance)}).slice(0,30);e(a)});case 1:case"end":return t.stop()}},t)}));return function(n,e){return t.apply(this,arguments)}}(),e.findAlongRoute=function(){var t=i()(a.a.mark(function t(n,e){var r=this;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:w(n[0],function(t,a){return w(n[1],function(n,o){var i=r.state.locations.map(function(e){return{location:e,distance:d.getDistanceFromLine({latitude:e.latitude,longitude:e.longitude},{latitude:t,longitude:a},{latitude:n,longitude:o})/1609.344}}).filter(function(t){return t.distance<25}).map(function(e){var r=e.location;return{location:r,distance:e.distance,minimumDistanceFromLocation:Math.min(d.getDistance({latitude:r.latitude,longitude:r.longitude},{latitude:t,longitude:a})/1609.344,d.getDistance({latitude:r.latitude,longitude:r.longitude},{latitude:n,longitude:o})/1609.344)}}).filter(function(t){return t.minimumDistanceFromLocation>10}).sort(function(t,n){return parseFloat(t.distance)-parseFloat(n.distance)}).slice(0,30);e(i)})});case 1:case"end":return t.stop()}},t)}));return function(n,e){return t.apply(this,arguments)}}(),e.render=function(){var t=this,n=this.state,e=n.searchType,r=n.locationA,a=n.locationB,o=(n.results,n.locations),i="destination"===e,c="route"===e,u=s.a.createElement(x.e,{color:k.a.blue},"search nearby"),l=s.a.createElement(x.e,{color:k.a.orange},"search by route"),d=s.a.createElement(x.c,null,s.a.createElement("div",{style:{margin:"40px 0"}},i?u:l),s.a.createElement("div",{style:{margin:"20px 0"}},s.a.createElement(x.g,{spellCheck:!1,onChange:function(n){return t.setState({locationA:n.target.value})},value:r||"",type:"value",autoFocus:!0,placeholder:i?"Location...":"From..."}),s.a.createElement(x.d,null)),"route"===e&&s.a.createElement("div",{style:{margin:"20px 0"}},s.a.createElement(x.g,{spellCheck:!1,onChange:function(n){return t.setState({locationB:n.target.value})},value:a||"",type:"value",placeholder:"To..."}),s.a.createElement(x.d,null)),s.a.createElement(x.j,{onClick:function(n){n.preventDefault(),(i?t.findNearLocation.bind(t):t.findAlongRoute.bind(t))([r,a],function(t){var n="";t.length>0&&(n+=t.length+" result",t.length>1&&(n+="s"),c&&(n+=" from "+r+" to "+a),i&&(n+=" nearby "+r)),Object(p.b)("/results",{state:{description:n,results:t,locations:o}})})},type:"submit",value:"search",color:i?k.a.blue:k.a.orange})),m=s.a.createElement(x.i,null,s.a.createElement(x.h,{style:{marginBottom:"15px"},onClick:function(){return t.setState({searchType:"route"})}},s.a.createElement(x.f,{style:{backgroundImage:'url("'+h.a+'")'}}),l),s.a.createElement(x.h,{onClick:function(){return t.setState({searchType:"destination"})}},s.a.createElement(x.f,{style:{backgroundImage:'url("'+y.a+'")'}}),u),s.a.createElement("div",{onClick:function(){return Object(p.b)("/results",{state:{results:[],locations:o}})},style:{cursor:"pointer",flex:1,marginTop:"15px"}},s.a.createElement(x.k,null,"View All")));return s.a.createElement(x.a,null,s.a.createElement(f.a,{title:"Home"}),s.a.createElement(g.a,{reset:this.reset.bind(this),siteTitle:"Tour Food"}),e?d:m)},n}(s.a.Component)},162:function(t,n,e){"use strict";n.a={blue:"#157EFB",orange:"#FB6320",gray:"#696969",lightGray:"#ccc"}},164:function(t,n,e){var r;t.exports=(r=e(171))&&r.default||r},166:function(t,n,e){"use strict";e.d(n,"b",function(){return y}),e.d(n,"k",function(){return x}),e.d(n,"a",function(){return b}),e.d(n,"e",function(){return E}),e.d(n,"i",function(){return w}),e.d(n,"h",function(){return k}),e.d(n,"f",function(){return F}),e.d(n,"g",function(){return S}),e.d(n,"d",function(){return C}),e.d(n,"j",function(){return O}),e.d(n,"c",function(){return R});e(181);var r=e(165),a=e.n(r),o=e(167),i=e(162);function c(){var t=a()(["\n  text-align: center;\n  max-width: 300px;\n  margin: 0 auto;\n"]);return c=function(){return t},t}function u(){var t=a()(["\n  -webkit-appearance: none;\n  background-color: ",";\n  color: white;\n  text-transform: uppercase;\n  text-align: center;\n  cursor: pointer;\n  outline: 0;\n  border: 0;\n  border-radius: 10px;\n  padding: 8px 0;\n  font-size: 1.5em;\n  letter-spacing: 1px;\n  margin: 0 auto;\n  width: 100%;\n  display: block;\n"]);return u=function(){return t},t}function l(){var t=a()(["\n  background-color: ",";\n  height: 4px;\n  border-radius: 5px;\n  width: 100%;\n"]);return l=function(){return t},t}function s(){var t=a()(["\n  outline: 0;\n  margin: 0 auto;\n  border: 0;\n  ::placeholder {\n    color: ",";\n  }\n  font-size: 1.5em;\n  letter-spacing: 1px;\n  display: block;\n"]);return s=function(){return t},t}function d(){var t=a()(["\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n  flex: 1;\n"]);return d=function(){return t},t}function p(){var t=a()(["\n  flex: 7;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n"]);return p=function(){return t},t}function f(){var t=a()(["\n  height: calc(100% - 150px);\n  text-align: center;\n  padding: 20px 0 0 0;\n  display: flex;\n  flex-direction: column;\n  object-fit: contain;\n  box-sizing: border-box;\n"]);return f=function(){return t},t}function g(){var t=a()(["\n  color: ",";\n  text-transform: uppercase;\n  margin: 10px 5px;\n"]);return g=function(){return t},t}function m(){var t=a()(["\n  height: 100vh;\n  width: 100vw;\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n"]);return m=function(){return t},t}function h(){var t=a()(["\n  margin: 0;\n  color: ",";\n  font-size: ","em;\n"]);return h=function(){return t},t}function v(){var t=a()(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);return v=function(){return t},t}var y=o.a.div(v()),x=o.a.p(h(),function(t){return t.color||i.a.gray},function(t){return t.large?1.4:t.small?1:t.extraSmall?.8:1.2}),b=o.a.div(m()),E=o.a.h2(g(),function(t){return t.color}),w=o.a.div(f()),k=o.a.div(p()),F=o.a.div(d()),S=o.a.input(s(),i.a.gray),C=o.a.div(l(),i.a.gray),O=o.a.input(u(),function(t){return t.color}),R=o.a.form(c())},170:function(t,n,e){"use strict";e.d(n,"a",function(){return s});var r=e(0),a=e.n(r),o=e(5),i=e.n(o),c=e(40);e.d(n,"b",function(){return c.navigate});e(164);var u=a.a.createContext({});function l(t){var n=t.staticQueryData,e=t.data,r=t.query,o=t.render,i=e?e.data:n[r]&&n[r].data;return a.a.createElement(a.a.Fragment,null,i&&o(i),!i&&a.a.createElement("div",null,"Loading (StaticQuery)"))}var s=function(t){var n=t.data,e=t.query,r=t.render,o=t.children;return a.a.createElement(u.Consumer,null,function(t){return a.a.createElement(l,{data:n,query:e,render:r||o,staticQueryData:t})})};s.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},171:function(t,n,e){"use strict";e.r(n);e(41);var r=e(0),a=e.n(r),o=e(5),i=e.n(o),c=e(64),u=function(t){var n=t.location,e=t.pageResources;return e?a.a.createElement(c.a,Object.assign({location:n,pageResources:e},e.json)):null};u.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},n.default=u},172:function(t,n,e){"use strict";e.d(n,"a",function(){return x});var r=e(165),a=e.n(r),o=e(8),i=e.n(o),c=e(0),u=e.n(c),l=e(167),s=e(166),d=e(173),p=e.n(d),f=e(162);function g(){var t=a()(["\n  position: absolute;\n  background-color: white;\n  padding: 10px;\n  box-sizing: border-box;\n  border: 3px solid ",";\n  font-weight: 400;\n  top: 50px;\n  left: 0;\n  width: 100%;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, 90px);\n  grid-gap: 4px 15px;\n  z-index: 100;\n  @media (max-width: 600px) {\n    padding: 0px;\n    grid-template-columns: 1fr;\n    overflow: scroll;\n    max-height: calc(100% - 50px);\n    border-width: 3px 0;\n    width: 100vw;\n    left: 0;\n  }\n"]);return g=function(){return t},t}function m(){var t=a()(["\n  @media (max-width: 600px) {\n    border-bottom: 0.5px solid ",";\n    padding: 10px;\n    cursor: pointer;\n  }\n"]);return m=function(){return t},t}function h(){var t=a()(["\n  justify-content: center;\n  flex-grow: 1;\n  cursor: pointer;\n  position: relative;\n  height: 100%;\n  @media (max-width: 600px) {\n    position: static;\n  }\n"]);return h=function(){return t},t}function v(){var t=a()(["\n  border-color: "," transparent;\n  border-style: solid;\n  border-width: 10px 8px 0px 8px;\n  height: 0px;\n  width: 0px;\n"]);return v=function(){return t},t}function y(){var t=a()(["\n  height: 50px;\n  width: 100%;\n  border-bottom: 3px solid ",";\n  display: flex;\n  align-items: center;\n"]);return y=function(){return t},t}var x=function(t){function n(n){var e;return(e=t.call(this,n)||this).state={},e}return i()(n,t),n.prototype.render=function(){var t=this,n=this.props,e=n.showFilters,r=n.filterOptions,a=n.filterBy,o=this.state.displayOptionsFor,i=function(t){return o===t||a[t]?f.a.orange:f.a.blue},c=function(n){return u.a.createElement(F,null,r[n].map(function(e,r){return u.a.createElement(k,{key:r,onClick:function(){t.setState({displayOptionsFor:void 0}),t.props.filter(n,e)}},u.a.createElement(s.k,{color:"black",extraSmall:!0},e))}))};return u.a.createElement(b,null,u.a.createElement(s.b,{onClick:this.props.reset.bind(this),style:{width:"50px",height:"50px",borderRight:"3px solid "+f.a.blue}},u.a.createElement("img",{alt:"tour food",style:{width:"100%",height:"auto",cursor:"pointer"},src:p.a})),e&&u.a.createElement(s.b,{style:{flexGrow:1,justifyContent:"space-around",height:"100%"}},u.a.createElement(w,{onMouseOver:function(){return t.setState({displayOptionsFor:"state"})},onMouseLeave:function(){return t.setState({displayOptionsFor:void 0})}},u.a.createElement(s.k,{style:{marginRight:"5px"},color:i("state")},a.state||"State"),u.a.createElement(E,{color:i("state")}),"state"===o&&c("state")),u.a.createElement(w,{onMouseOver:function(){return t.setState({displayOptionsFor:"city"})},onMouseLeave:function(){return t.setState({displayOptionsFor:void 0})},style:{borderRight:"1px solid "+f.a.gray,borderLeft:"1px solid "+f.a.gray}},u.a.createElement(s.k,{style:{marginRight:"5px"},color:i("city")},a.city||"City"),u.a.createElement(E,{color:i("city")}),"city"===o&&c("city")),u.a.createElement(w,{onMouseOver:function(){return t.setState({displayOptionsFor:"tag"})},onMouseLeave:function(){return t.setState({displayOptionsFor:void 0})}},u.a.createElement(s.k,{style:{marginRight:"5px"},color:i("tag")},a.tag||"Tag"),u.a.createElement(E,{color:i("tag")}),"tag"===o&&c("tag"))))},n}(u.a.Component),b=l.a.header(y(),f.a.blue),E=l.a.div(v(),function(t){return t.color}),w=Object(l.a)(s.b)(h()),k=l.a.div(m(),f.a.lightGray),F=l.a.div(g(),f.a.blue)},173:function(t,n,e){t.exports=e.p+"static/icon-049aeb0a5ee5652f7294bca1dd91a9de.png"},174:function(t,n,e){"use strict";var r=e(175),a=e(0),o=e.n(a),i=e(5),c=e.n(i),u=e(182),l=e.n(u);function s(t){var n=t.description,e=t.lang,a=t.meta,i=t.title,c=r.data.site,u=n||c.siteMetadata.description;return o.a.createElement(l.a,{htmlAttributes:{lang:e},title:i,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:u},{property:"og:title",content:i},{property:"og:description",content:u},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:u}].concat(a)})}s.defaultProps={lang:"en",meta:[],description:""},s.propTypes={description:c.a.string,lang:c.a.string,meta:c.a.arrayOf(c.a.object),title:c.a.string.isRequired},n.a=s},175:function(t){t.exports={data:{site:{siteMetadata:{title:"Tour Food",description:"Good places for food and drink on tour!",author:"Oliver Plunkett"}}}}},242:function(t,n,e){t.exports=e.p+"static/search-by-route-03f61146f65020abf969ed545b1405fc.png"},243:function(t,n,e){t.exports=e.p+"static/search-nearby-77a2153a28fb8b710b0376a2de3109a8.png"}}]);
//# sourceMappingURL=component---src-pages-index-js-c8ea6d70bd7224addfc0.js.map