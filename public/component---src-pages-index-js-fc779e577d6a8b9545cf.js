(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{295:function(t,e,o){"use strict";o.r(e),o.d(e,"default",(function(){return h}));o(39),o(29);var n=o(0),a=o.n(n),i=o(32),c=o(33),r=o(288),s=o(289),u=o(179),l=o(4),p=o(72),d=o(5);var m=o(308),g=o(309),f=o(310),b=o(290),h=function(t){var e,n;function h(e){var o;return(o=t.call(this,e)||this).state={autocompleteOptions:[],autocompleteResults:[],dataLoaded:!1,locations:[],isLoading:!0},o}n=t,(e=h).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n;var A=h.prototype;return A.componentDidMount=function(){document.body.style.overflow="hidden",window.locationResults=void 0,window.searchProps=void 0,this.requestLocation(),this.setState({isLoading:!1}),window.locations?this.setData(window.locations):this.loadData()},A.componentWillUnmount=function(){document.body.style.overflow="visible"},A.loadData=function(){var t=this;fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vSba72Al-RA3rUkBruesaJpLe8A5pIm-EJ8ZvY5SeSIzJWi8sebSnNqBTckypxCCyEhk2UaWvD_6Kfe/pub?output=csv").then((function(t){return t.text()})).then((function(e){var o=Object(c.uniqBy)(e.split("\n").slice(1).map(p.h).filter((function(t){return t})),(function(t){return t.name+" "+t.latitude+" "+t.longitude}));window.locations=o,t.setData(o)}))},A.setData=function(t){console.log("Data loaded: "+t.length+" locations.");var e=Object(c.uniq)(t.map((function(t){return t.city+", "+t.state})));this.setState({locations:t,autocompleteOptions:e,dataLoaded:!0})},A.requestLocation=function(){var t=this;if(!navigator)return console.log("Navigator is undefined");var e=void 0!==navigator.permissions;console.log("Has permissions: "+e);var o={enableHighAccuracy:!0,timeout:5e3,maximumAge:0},n=function(e){if(e&&e.coords){var o=e.coords,n=o.latitude,a=o.longitude;console.log("Position: "+n+", "+a),Object(p.i)(n+","+a,(function(e){e&&!t.state.locationA&&t.setState({myLocation:"My Location - "+e,myLocationCoordinates:[n,a]})}))}},a=function(){console.log("Getting position"),navigator.geolocation.getCurrentPosition(n,(function(t){return console.log("ERR: "+t.message)}),o)};e?navigator.permissions.query({name:"geolocation"}).then((function(t){"denied"!==t.state&&a()})):a()},A.reset=function(){this.setState({autocompleteResults:[],results:void 0,searchType:void 0})},A.render=function(){var t=this,e=this.state,n=e.autocompleteOptions,c=e.dataLoaded,p=e.locations,h=e.myLocation,A=e.myLocationCoordinates,v=e.searchType,y=a.a.createElement(l.t,null,a.a.createElement(l.s,null,a.a.createElement(l.r,{onClick:function(){return t.setState({searchType:"route"})}},a.a.createElement(l.j,{src:m}),a.a.createElement(l.i,{style:{margin:0,lineHeight:"35px"},color:"white"},"search by route")),a.a.createElement(l.r,{onClick:function(){return t.setState({searchType:"destination"})}},a.a.createElement(l.j,{src:g}),a.a.createElement(l.i,{style:{margin:0,lineHeight:"35px"},color:"white"},"search by location"))),a.a.createElement(l.v,{onClick:function(){if(p.length){var t={state:void 0,city:void 0,tag:void 0};Object(i.navigate)("/results",{state:{results:[],locations:p,filterBy:t}})}},color:"white",style:{textAlign:"center",lineHeight:"40px",letterSpacing:"1.5px",boxSizing:"border-box",width:"100%",cursor:"pointer",margin:0,opacity:c?1:0,transition:"opacity 0.5s"}},"VIEW ALL"));if(this.state.isLoading)return a.a.createElement("div",{style:{width:"100vw",height:"100vh",position:"fixed",top:0,left:0,backgroundColor:d.a.orange}});var w=v?"url("+o(311)("./"+v+".png")+")":void 0;return a.a.createElement(l.f,{style:{backgroundColor:v?"white":d.a.orange,backgroundImage:w,backgroundPositionY:"100%"}},a.a.createElement(r.a,{title:"Home"}),a.a.createElement(s.a,{searchProps:{},reset:this.reset.bind(this),siteTitle:"Tour Food"}),v?a.a.createElement(u.a,{autocompleteOptions:n,locations:p,miniature:!1,myLocation:h,myLocationCoordinates:A,searchType:v}):y,a.a.createElement("a",{target:"_blank",href:"https://www.instagram.com/tourfood.us"},a.a.createElement(l.e,{src:v?b:f})))},h}(a.a.Component)},297:function(t,e,o){t.exports=o.p+"static/about-6e08b9ea9ea8f048d2a66e08e78f153c.png"},298:function(t,e,o){t.exports=o.p+"static/contact-b34ca2d8bff9abc5a762bbae92e07fbf.png"},299:function(t,e,o){t.exports=o.p+"static/faq-7876d0d96155aeac5636dca2c595b39d.png"},308:function(t,e,o){t.exports=o.p+"static/search-by-route-b06728f0c61d271df5962decc1f415c1.png"},309:function(t,e,o){t.exports=o.p+"static/search-nearby-ba5444a805504845e5185b5e9fcfac14.png"},310:function(t,e){t.exports="data:image/png;base64,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"},311:function(t,e,o){var n={"./about.png":297,"./contact.png":298,"./destination.png":312,"./faq.png":299,"./route.png":313};function a(t){var e=i(t);return o(e)}function i(t){if(!o.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}a.keys=function(){return Object.keys(n)},a.resolve=i,t.exports=a,a.id=311},312:function(t,e,o){t.exports=o.p+"static/destination-c00c844e5d0680ebc1900c8fdf98cedc.png"},313:function(t,e,o){t.exports=o.p+"static/route-0f57d1890d8c046a73a2a2ac5f34cb22.png"}}]);
//# sourceMappingURL=component---src-pages-index-js-fc779e577d6a8b9545cf.js.map