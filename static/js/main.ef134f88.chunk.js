(this.webpackJsonpdegreely=this.webpackJsonpdegreely||[]).push([[0],{45:function(e,a,t){e.exports=t.p+"static/media/landing.6a73e9e9.svg"},49:function(e,a,t){e.exports=t.p+"static/media/logo.eb47fbc3.svg"},53:function(e,a,t){e.exports=t(72)},58:function(e,a,t){},59:function(e,a,t){},64:function(e,a,t){},65:function(e,a,t){},71:function(e,a,t){},72:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(13),l=t.n(c),o=(t(58),t(19)),m=t(5),s=function(){return r.a.createElement("h1",null,"This is the about page")},i=function(){return r.a.createElement("h1",null,"This is the support page")},d=t(32),u=t(25),p=t(26),E=t(27),g=t(85),b=t(45),v=t.n(b),f=t(21),h=t(36),O=t(37),j=t(46),y=t(47),N=t(51),S=t(50),k=t(7),C=t(20),x=t(23);t(59);var w=function(e){var a=e.modData;return r.a.createElement(C.b,{draggableId:a.code,index:e.index,key:a.code},(function(e,t){return r.a.createElement("div",Object.assign({className:"mod",ref:e.innerRef},e.draggableProps,e.dragHandleProps),r.a.createElement(x.a,{style:Object(k.a)({backgroundColor:t.isDragging?"lightgrey":"white"},e.dragHandleProps.style)},r.a.createElement(x.a.Body,null,r.a.createElement(x.a.Title,{className:"mod-code"},a.code),r.a.createElement(x.a.Subtitle,{className:"mod-mcs mb-2 text-muted"},a.mcs," MCs"),r.a.createElement(x.a.Text,{className:"mod-name"},a.name))))}))};t(64);var D=function(e){var a=e.semData;return r.a.createElement("div",{className:"sem"},r.a.createElement("h2",{className:"sem-name"},a.name),r.a.createElement(C.c,{droppableId:a.name},(function(e,t){return r.a.createElement("div",Object.assign({className:"sem-droppable"},e.droppableProps,{ref:e.innerRef}),r.a.createElement("div",{style:{backgroundColor:t.isDraggingOver?"lightblue":"white"}},a.mods.map((function(e,a){return r.a.createElement(w,{key:a,index:a,modData:e})})),e.placeholder))})))},I={Y1S1:{name:"Y1S1",mods:[]},Y1S2:{name:"Y1S2",mods:[]}},L={sems:Object(k.a)(Object(k.a)({},I),{},{Y1S1:Object(k.a)(Object(k.a)({},I.Y1S1),{},{mods:[{code:"CS1101S",name:"Programming Methodology",mcs:4},{code:"CS1231",name:"Discrete Structures",mcs:4},{code:"GEQ1000",name:"Asking Questions",mcs:4},{code:"MA1101R",name:"Linear Algebra I",mcs:4},{code:"GEH1002",name:"Economic Issues in Dev World",mcs:4}]})})},T=function(e){Object(N.a)(t,e);var a=Object(S.a)(t);function t(e){var n;return Object(j.a)(this,t),(n=a.call(this,e)).onDragEnd=function(e){var a=n.state.sems,t=e.source,r=e.destination;if(null!==r)if(t.droppableId===r.droppableId){var c=a[t.droppableId],l=Object(O.a)(c.mods),o=l.splice(t.index,1),m=Object(h.a)(o,1)[0];l.splice(r.index,0,m),n.setState({sems:Object(k.a)(Object(k.a)({},a),{},Object(f.a)({},c.name,Object(k.a)(Object(k.a)({},c),{},{mods:l})))})}else{var s,i=a[t.droppableId],d=Object(O.a)(i.mods),u=a[r.droppableId],p=Object(O.a)(u.mods),E=d.splice(t.index,1),g=Object(h.a)(E,1)[0];p.splice(r.index,0,g),n.setState({sems:Object(k.a)(Object(k.a)({},a),{},(s={},Object(f.a)(s,i.name,Object(k.a)(Object(k.a)({},i),{},{mods:d})),Object(f.a)(s,u.name,Object(k.a)(Object(k.a)({},u),{},{mods:p})),s))})}},n.state=L,n}return Object(y.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(C.a,{onDragEnd:function(a){return e.onDragEnd(a)}},r.a.createElement(d.a,null,r.a.createElement(u.a,null,Object.entries(this.state.sems).map((function(e){var a=Object(h.a)(e,2),t=a[0],n=a[1];return r.a.createElement(p.a,{key:t},r.a.createElement(D,{semData:n}))})))))}}]),t}(r.a.Component),B=function(){return r.a.createElement(d.a,{fluid:!0,className:"my-2"},r.a.createElement(u.a,null,r.a.createElement(p.a,null,r.a.createElement(g.a,{variant:"h2",align:"left"},"Supercharge your degree planning with us today"),r.a.createElement(E.a,{variant:"primary",size:"lg"},"Sign in with SSO")),r.a.createElement(p.a,null,r.a.createElement("img",{src:v.a,className:"landing-art",alt:"landing-art"}))),r.a.createElement(u.a,null,r.a.createElement(T,null)))},F=t(28),Y=t(22);var A={backgroundColor:"#5E60CE",borderColor:"#5E60CE",paddingTop:12,paddingBottom:12,paddingLeft:18,paddingRight:18},P={backgroundColor:"#FFFFFF",color:"#5E60CE",borderColor:"#5E60CE",paddingTop:12,paddingBottom:12,paddingLeft:18,paddingRight:18},R=function(e){return"primary"===e.type?r.a.createElement(E.a,{style:A},e.title):"secondary"===e.type?r.a.createElement(E.a,{style:P},e.title):void 0},H=t(49),M=t.n(H);t(65);var W=function(){return r.a.createElement("div",{className:"Landing-header"},r.a.createElement(F.a,{expand:"lg"},r.a.createElement("div",{className:"order-1 mr-auto"},r.a.createElement(F.a.Brand,null,r.a.createElement(Y.a.Link,{as:o.b,to:"/"},r.a.createElement("img",{src:M.a,className:"App-logo",alt:"logo"})))),r.a.createElement("div",{className:"order-2 mx-auto"},r.a.createElement(F.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(F.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(Y.a,{className:"mr-auto"},r.a.createElement(Y.a.Link,{as:o.b,to:"/",className:"ml-4 mr-4"},r.a.createElement("div",{className:"Nav-link"},"Home")),r.a.createElement(Y.a.Link,{as:o.b,to:"/about",className:"ml-4 mr-4"},r.a.createElement("div",{className:"Nav-link"},"About")),r.a.createElement(Y.a.Link,{as:o.b,to:"/support",className:"ml-4 mr-4"},r.a.createElement("div",{className:"Nav-link"},"Support"))))),r.a.createElement("div",{className:"order-3 ml-auto"},r.a.createElement(R,{title:"Sign in with SSO",type:"primary"}))))},G=(t(70),t(71),function(){return r.a.createElement(o.a,{basename:"/degreely"},r.a.createElement(W,null),r.a.createElement(m.c,null,r.a.createElement(m.a,{path:"/",component:B}),r.a.createElement(m.a,{path:"/about",component:s}),r.a.createElement(m.a,{path:"/support",component:i})))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(G,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[53,1,2]]]);
//# sourceMappingURL=main.ef134f88.chunk.js.map