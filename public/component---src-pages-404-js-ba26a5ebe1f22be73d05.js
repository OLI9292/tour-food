(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{156:function(t,n,e){"use strict";e.r(n);var r=e(0),a=e.n(r),i=e(203),o=e(5),u=e.n(o),c=e(170),l=e(172),s=(e(212),function(t){var n=t.children;return a.a.createElement(c.a,{query:"755544856",render:function(t){var e=t.site.siteMetadata.title,r="/"===window.location.pathname?{height:"100vh",width:"100vw",position:"fixed",display:"flex",flexDirection:"column"}:{};return a.a.createElement("div",{style:r},a.a.createElement(l.a,{siteTitle:e}),n)},data:i})});s.propTypes={children:u.a.node.isRequired};var d=s,p=e(174);n.default=function(){return a.a.createElement(d,null,a.a.createElement(p.a,{title:"404: Not found"}),a.a.createElement("h1",null,"NOT FOUND"),a.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))}},162:function(t,n,e){"use strict";n.a={blue:"#157EFB",orange:"#FB6320",gray:"#696969",lightGray:"#ccc"}},164:function(t,n,e){var r;t.exports=(r=e(171))&&r.default||r},166:function(t,n,e){"use strict";e.d(n,"b",function(){return v}),e.d(n,"k",function(){return y}),e.d(n,"a",function(){return b}),e.d(n,"e",function(){return w}),e.d(n,"i",function(){return E}),e.d(n,"h",function(){return k}),e.d(n,"f",function(){return O}),e.d(n,"g",function(){return F}),e.d(n,"d",function(){return M}),e.d(n,"j",function(){return R}),e.d(n,"c",function(){return j});e(181);var r=e(165),a=e.n(r),i=e(167),o=e(162);function u(){var t=a()(["\n  text-align: center;\n  max-width: 300px;\n  margin: 0 auto;\n"]);return u=function(){return t},t}function c(){var t=a()(["\n  -webkit-appearance: none;\n  background-color: ",";\n  color: white;\n  text-transform: uppercase;\n  text-align: center;\n  cursor: pointer;\n  outline: 0;\n  border: 0;\n  border-radius: 10px;\n  padding: 8px 0;\n  font-size: 1.5em;\n  letter-spacing: 1px;\n  margin: 0 auto;\n  width: 100%;\n  display: block;\n"]);return c=function(){return t},t}function l(){var t=a()(["\n  background-color: ",";\n  height: 4px;\n  border-radius: 5px;\n  width: 100%;\n"]);return l=function(){return t},t}function s(){var t=a()(["\n  outline: 0;\n  margin: 0 auto;\n  border: 0;\n  ::placeholder {\n    color: ",";\n  }\n  font-size: 1.5em;\n  letter-spacing: 1px;\n  display: block;\n"]);return s=function(){return t},t}function d(){var t=a()(["\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n  flex: 1;\n"]);return d=function(){return t},t}function p(){var t=a()(["\n  flex: 7;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n"]);return p=function(){return t},t}function f(){var t=a()(["\n  height: calc(100% - 150px);\n  text-align: center;\n  padding: 20px 0 0 0;\n  display: flex;\n  flex-direction: column;\n  object-fit: contain;\n  box-sizing: border-box;\n"]);return f=function(){return t},t}function g(){var t=a()(["\n  color: ",";\n  text-transform: uppercase;\n  margin: 10px 5px;\n"]);return g=function(){return t},t}function m(){var t=a()(["\n  height: 100vh;\n  width: 100vw;\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n"]);return m=function(){return t},t}function x(){var t=a()(["\n  margin: 0;\n  color: ",";\n  font-size: ","em;\n"]);return x=function(){return t},t}function h(){var t=a()(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"]);return h=function(){return t},t}var v=i.a.div(h()),y=i.a.p(x(),function(t){return t.color||o.a.gray},function(t){return t.large?1.4:t.small?1:t.extraSmall?.8:1.2}),b=i.a.div(m()),w=i.a.h2(g(),function(t){return t.color}),E=i.a.div(f()),k=i.a.div(p()),O=i.a.div(d()),F=i.a.input(s(),o.a.gray),M=i.a.div(l(),o.a.gray),R=i.a.input(c(),function(t){return t.color}),j=i.a.form(u())},170:function(t,n,e){"use strict";e.d(n,"a",function(){return s});var r=e(0),a=e.n(r),i=e(5),o=e.n(i),u=e(40);e.d(n,"b",function(){return u.navigate});e(164);var c=a.a.createContext({});function l(t){var n=t.staticQueryData,e=t.data,r=t.query,i=t.render,o=e?e.data:n[r]&&n[r].data;return a.a.createElement(a.a.Fragment,null,o&&i(o),!o&&a.a.createElement("div",null,"Loading (StaticQuery)"))}var s=function(t){var n=t.data,e=t.query,r=t.render,i=t.children;return a.a.createElement(c.Consumer,null,function(t){return a.a.createElement(l,{data:n,query:e,render:r||i,staticQueryData:t})})};s.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},171:function(t,n,e){"use strict";e.r(n);e(41);var r=e(0),a=e.n(r),i=e(5),o=e.n(i),u=e(64),c=function(t){var n=t.location,e=t.pageResources;return e?a.a.createElement(u.a,Object.assign({location:n,pageResources:e},e.json)):null};c.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},n.default=c},172:function(t,n,e){"use strict";e.d(n,"a",function(){return y});var r=e(165),a=e.n(r),i=e(8),o=e.n(i),u=e(0),c=e.n(u),l=e(167),s=e(166),d=e(173),p=e.n(d),f=e(162);function g(){var t=a()(["\n  position: absolute;\n  background-color: white;\n  padding: 10px;\n  box-sizing: border-box;\n  border: 3px solid ",";\n  font-weight: 400;\n  top: 50px;\n  left: 0;\n  width: 100%;\n  display: grid;\n  grid-template-columns: repeat(auto-fill, 90px);\n  grid-gap: 4px 15px;\n  z-index: 100;\n  @media (max-width: 600px) {\n    padding: 0px;\n    grid-template-columns: 1fr;\n    overflow: scroll;\n    max-height: calc(100% - 50px);\n    border-width: 3px 0;\n    width: 100vw;\n    left: 0;\n  }\n"]);return g=function(){return t},t}function m(){var t=a()(["\n  @media (max-width: 600px) {\n    border-bottom: 0.5px solid ",";\n    padding: 10px;\n    cursor: pointer;\n  }\n"]);return m=function(){return t},t}function x(){var t=a()(["\n  justify-content: center;\n  flex-grow: 1;\n  cursor: pointer;\n  position: relative;\n  height: 100%;\n  @media (max-width: 600px) {\n    position: static;\n  }\n"]);return x=function(){return t},t}function h(){var t=a()(["\n  border-color: "," transparent;\n  border-style: solid;\n  border-width: 10px 8px 0px 8px;\n  height: 0px;\n  width: 0px;\n"]);return h=function(){return t},t}function v(){var t=a()(["\n  height: 50px;\n  width: 100%;\n  border-bottom: 3px solid ",";\n  display: flex;\n  align-items: center;\n"]);return v=function(){return t},t}var y=function(t){function n(n){var e;return(e=t.call(this,n)||this).state={},e}return o()(n,t),n.prototype.render=function(){var t=this,n=this.props,e=n.showFilters,r=n.filterOptions,a=n.filterBy,i=this.state.displayOptionsFor,o=function(t){return i===t||a[t]?f.a.orange:f.a.blue},u=function(n){return c.a.createElement(O,null,r[n].map(function(e,r){return c.a.createElement(k,{onClick:function(){t.setState({displayOptionsFor:void 0}),t.props.filter(n,e)}},c.a.createElement(s.k,{color:"black",extraSmall:!0,key:r},e))}))};return c.a.createElement(b,null,c.a.createElement(s.b,{onClick:this.props.reset.bind(this),style:{width:"50px",height:"50px",borderRight:"3px solid "+f.a.blue}},c.a.createElement("img",{alt:"tour food",style:{width:"100%",height:"auto",cursor:"pointer"},src:p.a})),e&&c.a.createElement(s.b,{style:{flexGrow:1,justifyContent:"space-around",height:"100%"}},c.a.createElement(E,{onMouseOver:function(){return t.setState({displayOptionsFor:"state"})},onMouseLeave:function(){return t.setState({displayOptionsFor:void 0})}},c.a.createElement(s.k,{style:{marginRight:"5px"},color:o("state")},a.state||"State"),c.a.createElement(w,{color:o("state")}),"state"===i&&u("state")),c.a.createElement(E,{onMouseOver:function(){return t.setState({displayOptionsFor:"city"})},onMouseLeave:function(){return t.setState({displayOptionsFor:void 0})},style:{borderRight:"1px solid "+f.a.gray,borderLeft:"1px solid "+f.a.gray}},c.a.createElement(s.k,{style:{marginRight:"5px"},color:o("city")},a.city||"City"),c.a.createElement(w,{color:o("city")}),"city"===i&&u("city")),c.a.createElement(E,{onMouseOver:function(){return t.setState({displayOptionsFor:"tag"})},onMouseLeave:function(){return t.setState({displayOptionsFor:void 0})}},c.a.createElement(s.k,{style:{marginRight:"5px"},color:o("tag")},a.tag||"Tag"),c.a.createElement(w,{color:o("tag")}),"tag"===i&&u("tag"))))},n}(c.a.Component),b=l.a.header(v(),f.a.blue),w=l.a.div(h(),function(t){return t.color}),E=Object(l.a)(s.b)(x()),k=l.a.div(m(),f.a.lightGray),O=l.a.div(g(),f.a.blue)},173:function(t,n,e){t.exports=e.p+"static/icon-049aeb0a5ee5652f7294bca1dd91a9de.png"},174:function(t,n,e){"use strict";var r=e(175),a=e(0),i=e.n(a),o=e(5),u=e.n(o),c=e(182),l=e.n(c);function s(t){var n=t.description,e=t.lang,a=t.meta,o=t.title,u=r.data.site,c=n||u.siteMetadata.description;return i.a.createElement(l.a,{htmlAttributes:{lang:e},title:o,titleTemplate:"%s | "+u.siteMetadata.title,meta:[{name:"description",content:c},{property:"og:title",content:o},{property:"og:description",content:c},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:u.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:c}].concat(a)})}s.defaultProps={lang:"en",meta:[],description:""},s.propTypes={description:u.a.string,lang:u.a.string,meta:u.a.arrayOf(u.a.object),title:u.a.string.isRequired},n.a=s},175:function(t){t.exports={data:{site:{siteMetadata:{title:"Tour Food",description:"Good places for food and drink on tour!",author:"Oliver Plunkett"}}}}},203:function(t){t.exports={data:{site:{siteMetadata:{title:"Tour Food"}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-ba26a5ebe1f22be73d05.js.map