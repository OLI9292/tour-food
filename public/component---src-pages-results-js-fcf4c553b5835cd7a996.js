(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{158:function(t,n,e){"use strict";e.r(n);var r=e(165),a=e.n(r),i=(e(180),e(244),e(8)),o=e.n(i),c=(e(101),e(66),e(42),e(103),e(102),e(246),e(183),e(0)),l=e.n(c),u=e(167),s=e(248),d=e.n(s),p=e(170),f=e(174),g=e(172),m=e(166),x=function(t){function n(){return t.apply(this,arguments)||this}return o()(n,t),n.prototype.render=function(){var t=this.props.name;return l.a.createElement("div",null,t)},n}(c.Component),y=e(162),h=e(268),v=e.n(h);function b(){var t=a()(["\n  max-width: 750px;\n  margin: 0 auto;\n  margin-top: 40px;\n  margin-bottom: 40px;\n"]);return b=function(){return t},t}function w(){var t=a()(["\n  height: calc(100% - 53px);\n  text-align: center;\n  display: flex;\n  padding: 0 10px;\n  flex-direction: column;\n  object-fit: contain;\n"]);return w=function(){return t},t}function E(){var t=a()(["\n  width: 100%;\n  margin: 0 auto;\n  overflow: scroll;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"]);return E=function(){return t},t}e.d(n,"default",function(){return O});var k=function(t,n){return Array.from(new Set(t.map(function(t){return t[n]}).flat())).filter(function(t){return t}).sort()},O=function(t){function n(n){var e,r=(e=t.call(this,n)||this).props.location.state,a=r.results,i=r.description,o=r.locations;return e.state={displayMap:!1,results:a,locations:o,filterOptions:{state:k(o,"state"),city:k(o,"city"),tag:k(o,"tags")},filterBy:{state:void 0,city:void 0,tag:void 0},description:i},e}o()(n,t);var e=n.prototype;return e.filter=function(t,n){var e=this.state.locations,r={};r[t]=n;var a=e.filter(function(t){return Object.keys(r).every(function(n){return!r[n]||("tag"===n?t.tags.indexOf(r[n])>-1:r[n]===t[n])})}).map(function(t){return{location:t}}),i=a.length+" result"+(1===a.length?"":"s")+" ";r.tag&&(i+="for "+r.tag),r.state&&(i+="in "+r.state),r.city&&(i+="in "+r.city),this.setState({description:i,results:a,filterBy:r})},e.render=function(){var t,n=this,e=this.state,r=e.results,a=e.description,i=e.displayMap,o=e.filterOptions,c=e.filterBy,u=r.length?l.a.createElement(m.b,{style:{borderBottom:"3px solid "+y.a.blue,padding:"8px 0",width:"100vw",marginLeft:"-10px",cursor:"pointer"},onClick:function(){return n.setState({displayMap:!0})}},l.a.createElement("img",{style:{height:"40px",width:"40px",marginRight:"5px"},src:v.a,alt:"search by route"}),l.a.createElement(m.k,null,"View on Map")):null,s=r.length?l.a.createElement("div",{style:{height:"50%",width:"100vw",marginLeft:"-10px"}},l.a.createElement(d.a,((t={disableDefaultUI:!0,bootstrapURLKeys:{key:{}.GATSBY_GOOGLE_API_KEY},defaultCenter:{lat:r[0].location.latitude,lng:r[0].location.longitude},defaultZoom:1}).disableDefaultUI=!0,t),r.map(function(t){return l.a.createElement(x,{key:t.location.name,lat:t.location.latitude,lng:t.location.longitude,name:t.location.name})}))):null;return l.a.createElement(m.a,null,l.a.createElement(g.a,{reset:function(){return Object(p.b)("/")},showFilters:!0,filterBy:c,filter:this.filter.bind(this),filterOptions:o,siteTitle:"Tour Food"}),l.a.createElement(f.a,{title:"Home"}),l.a.createElement(j,null,i?s:u,l.a.createElement(m.k,{style:{textAlign:"center",marginTop:"25px"}},a),l.a.createElement(S,null,(r||[]).map(function(t,n){return l.a.createElement(F,{key:n},l.a.createElement(m.b,{style:{justifyContent:"space-between",alignItems:"flex-start"}},l.a.createElement("div",{style:{textAlign:"left"}},l.a.createElement(m.k,{color:y.a.blue,large:!0,style:{display:"inline-block",marginRight:"10px"}},t.location.name),l.a.createElement(m.k,{extraSmall:!0,style:{display:"inline-block"}},t.location.city,", ",t.location.state)),void 0!==t.distance&&l.a.createElement(m.k,{style:{marginLeft:"20px"},color:y.a.orange},Math.round(10*t.distance)/10,"m")),t.location.tags.length&&l.a.createElement(m.k,{color:y.a.orange,extraSmall:!0,style:{textAlign:"left"}},t.location.tags.sort().join(", ")),t.location.comments&&l.a.createElement(m.k,{color:y.a.orange,style:{textAlign:"left"}},t.location.comments))}))))},n}(l.a.Component),S=u.a.div(E()),j=u.a.div(w()),F=u.a.div(b())},162:function(t,n,e){"use strict";n.a={blue:"#157EFB",orange:"#FB6320",gray:"#696969",lightGray:"#ccc"}},164:function(t,n,e){var r;t.exports=(r=e(171))&&r.default||r},166:function(t,n,e){"use strict";e.d(n,"b",function(){return h}),e.d(n,"k",function(){return v}),e.d(n,"a",function(){return b}),e.d(n,"e",function(){return w}),e.d(n,"i",function(){return E}),e.d(n,"h",function(){return k}),e.d(n,"f",function(){return O}),e.d(n,"g",function(){return S}),e.d(n,"d",function(){return j}),e.d(n,"j",function(){return F}),e.d(n,"c",function(){return M});e(181);var r=e(165),a=e.n(r),i=e(167),o=e(162);function c(){var t=a()(["\n  text-align: center;\n  max-width: 300px;\n  margin: 0 auto;\n"]);return c=function(){return t},t}function l(){var t=a()(["\n  -webkit-appearance: none;\n  background-color: ",";\n  color: white;\n  text-transform: uppercase;\n  text-align: center;\n  cursor: pointer;\n  outline: 0;\n  border: 0;\n  border-radius: 10px;\n  padding: 8px 0;\n  font-size: 1.5em;\n  letter-spacing: 1px;\n  margin: 0 auto;\n  width: 100%;\n  display: block;\n"]);return l=function(){return t},t}function u(){var t=a()(["\n  background-color: ",";\n  height: 4px;\n  border-radius: 5px;\n  width: 100%;\n"]);return u=function(){return t},t}function s(){var t=a()(["\n  outline: 0;\n  margin: 0 auto;\n  border: 0;\n  ::placeholder {\n    color: ",";\n  }\n  font-size: 1.5em;\n  letter-spacing: 1px;\n  display: block;\n"]);return s=function(){return t},t}function d(){var t=a()(["\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n  flex: 1;\n"]);return d=function(){return t},t}function p(){var t=a()(["\n  flex: 7;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n"]);return p=function(){return t},t}function f(){var t=a()(["\n  height: calc(100% - 150px);\n  text-align: center;\n  padding: 20px 0 0 0;\n  display: flex;\n  flex-direction: column;\n  object-fit: contain;\n  box-sizing: border-box;\n"]);return f=function(){return t},t}function g(){var t=a()(["\n  color: ",";\n  text-transform: uppercase;\n  margin: 10px 5px;\n"]);return g=function(){return t},t}function m(){var t=a()(["\n  height: 100vh;\n  width: 100vw;\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n"]);return m=function(){return t},t}function x(){var t=a()(["\n  margin: 0;\n  color: ",";\n  font-size: ","em;\n"]);return x=function(){return t},t}function y(){var t=a()(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);return y=function(){return t},t}var h=i.a.div(y()),v=i.a.p(x(),function(t){return t.color||o.a.gray},function(t){return t.large?1.4:t.small?1:t.extraSmall?.8:1.2}),b=i.a.div(m()),w=i.a.h2(g(),function(t){return t.color}),E=i.a.div(f()),k=i.a.div(p()),O=i.a.div(d()),S=i.a.input(s(),o.a.gray),j=i.a.div(u(),o.a.gray),F=i.a.input(l(),function(t){return t.color}),M=i.a.form(c())},170:function(t,n,e){"use strict";e.d(n,"a",function(){return s});var r=e(0),a=e.n(r),i=e(5),o=e.n(i),c=e(40);e.d(n,"b",function(){return c.navigate});e(164);var l=a.a.createContext({});function u(t){var n=t.staticQueryData,e=t.data,r=t.query,i=t.render,o=e?e.data:n[r]&&n[r].data;return a.a.createElement(a.a.Fragment,null,o&&i(o),!o&&a.a.createElement("div",null,"Loading (StaticQuery)"))}var s=function(t){var n=t.data,e=t.query,r=t.render,i=t.children;return a.a.createElement(l.Consumer,null,function(t){return a.a.createElement(u,{data:n,query:e,render:r||i,staticQueryData:t})})};s.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},171:function(t,n,e){"use strict";e.r(n);e(41);var r=e(0),a=e.n(r),i=e(5),o=e.n(i),c=e(64),l=function(t){var n=t.location,e=t.pageResources;return e?a.a.createElement(c.a,Object.assign({location:n,pageResources:e},e.json)):null};l.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},n.default=l},172:function(t,n,e){"use strict";e.d(n,"a",function(){return v});var r=e(165),a=e.n(r),i=e(8),o=e.n(i),c=e(0),l=e.n(c),u=e(167),s=e(166),d=e(173),p=e.n(d),f=e(162);function g(){var t=a()(["\n  position: absolute;\n  background-color: white;\n  padding: 10px;\n  box-sizing: border-box;\n  border: 3px solid ",";\n  font-weight: 400;\n  top: 50px;\n  left: 0;\n  width: 100%;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, 90px);\n  grid-gap: 4px 15px;\n  z-index: 100;\n  @media (max-width: 600px) {\n    padding: 0px;\n    grid-template-columns: 1fr;\n    overflow: scroll;\n    max-height: calc(100% - 50px);\n    border-width: 3px 0;\n    width: 100vw;\n    left: 0;\n  }\n"]);return g=function(){return t},t}function m(){var t=a()(["\n  @media (max-width: 600px) {\n    border-bottom: 0.5px solid ",";\n    padding: 10px;\n    cursor: pointer;\n  }\n"]);return m=function(){return t},t}function x(){var t=a()(["\n  justify-content: center;\n  flex-grow: 1;\n  cursor: pointer;\n  position: relative;\n  height: 100%;\n  @media (max-width: 600px) {\n    position: static;\n  }\n"]);return x=function(){return t},t}function y(){var t=a()(["\n  border-color: "," transparent;\n  border-style: solid;\n  border-width: 10px 8px 0px 8px;\n  height: 0px;\n  width: 0px;\n"]);return y=function(){return t},t}function h(){var t=a()(["\n  height: 50px;\n  width: 100%;\n  border-bottom: 3px solid ",";\n  display: flex;\n  align-items: center;\n"]);return h=function(){return t},t}var v=function(t){function n(n){var e;return(e=t.call(this,n)||this).state={},e}return o()(n,t),n.prototype.render=function(){var t=this,n=this.props,e=n.showFilters,r=n.filterOptions,a=n.filterBy,i=this.state.displayOptionsFor,o=function(t){return i===t||a[t]?f.a.orange:f.a.blue},c=function(n){return l.a.createElement(O,null,r[n].map(function(e,r){return l.a.createElement(k,{onClick:function(){t.setState({displayOptionsFor:void 0}),t.props.filter(n,e)}},l.a.createElement(s.k,{color:"black",extraSmall:!0,key:r},e))}))};return l.a.createElement(b,null,l.a.createElement(s.b,{onClick:this.props.reset.bind(this),style:{width:"50px",height:"50px",borderRight:"3px solid "+f.a.blue}},l.a.createElement("img",{alt:"tour food",style:{width:"100%",height:"auto",cursor:"pointer"},src:p.a})),e&&l.a.createElement(s.b,{style:{flexGrow:1,justifyContent:"space-around",height:"100%"}},l.a.createElement(E,{onMouseOver:function(){return t.setState({displayOptionsFor:"state"})},onMouseLeave:function(){return t.setState({displayOptionsFor:void 0})}},l.a.createElement(s.k,{style:{marginRight:"5px"},color:o("state")},a.state||"State"),l.a.createElement(w,{color:o("state")}),"state"===i&&c("state")),l.a.createElement(E,{onMouseOver:function(){return t.setState({displayOptionsFor:"city"})},onMouseLeave:function(){return t.setState({displayOptionsFor:void 0})},style:{borderRight:"1px solid "+f.a.gray,borderLeft:"1px solid "+f.a.gray}},l.a.createElement(s.k,{style:{marginRight:"5px"},color:o("city")},a.city||"City"),l.a.createElement(w,{color:o("city")}),"city"===i&&c("city")),l.a.createElement(E,{onMouseOver:function(){return t.setState({displayOptionsFor:"tag"})},onMouseLeave:function(){return t.setState({displayOptionsFor:void 0})}},l.a.createElement(s.k,{style:{marginRight:"5px"},color:o("tag")},a.tag||"Tag"),l.a.createElement(w,{color:o("tag")}),"tag"===i&&c("tag"))))},n}(l.a.Component),b=u.a.header(h(),f.a.blue),w=u.a.div(y(),function(t){return t.color}),E=Object(u.a)(s.b)(x()),k=u.a.div(m(),f.a.lightGray),O=u.a.div(g(),f.a.blue)},173:function(t,n,e){t.exports=e.p+"static/icon-049aeb0a5ee5652f7294bca1dd91a9de.png"},174:function(t,n,e){"use strict";var r=e(175),a=e(0),i=e.n(a),o=e(5),c=e.n(o),l=e(182),u=e.n(l);function s(t){var n=t.description,e=t.lang,a=t.meta,o=t.title,c=r.data.site,l=n||c.siteMetadata.description;return i.a.createElement(u.a,{htmlAttributes:{lang:e},title:o,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:l},{property:"og:title",content:o},{property:"og:description",content:l},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:l}].concat(a)})}s.defaultProps={lang:"en",meta:[],description:""},s.propTypes={description:c.a.string,lang:c.a.string,meta:c.a.arrayOf(c.a.object),title:c.a.string.isRequired},n.a=s},175:function(t){t.exports={data:{site:{siteMetadata:{title:"Tour Food",description:"Good places for food and drink on tour!",author:"Oliver Plunkett"}}}}},268:function(t,n,e){t.exports=e.p+"static/search-by-route-square-9b6ed76a947dbebcb1f4cff57ebbd941.png"}}]);
//# sourceMappingURL=component---src-pages-results-js-fcf4c553b5835cd7a996.js.map