var v=Object.defineProperty,C=Object.defineProperties;var S=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var b=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var h=(e,t,s)=>t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,x=(e,t)=>{for(var s in t||(t={}))b.call(t,s)&&h(e,s,t[s]);if(m)for(var s of m(t))f.call(t,s)&&h(e,s,t[s]);return e},g=(e,t)=>C(e,S(t));var w=(e,t)=>{var s={};for(var a in e)b.call(e,a)&&t.indexOf(a)<0&&(s[a]=e[a]);if(e!=null&&m)for(var a of m(e))t.indexOf(a)<0&&f.call(e,a)&&(s[a]=e[a]);return s};var y=(e,t,s)=>new Promise((a,l)=>{var i=n=>{try{d(s.next(n))}catch(o){l(o)}},p=n=>{try{d(s.throw(n))}catch(o){l(o)}},d=n=>n.done?a(n.value):Promise.resolve(n.value).then(i,p);d((s=s.apply(e,t)).next())});import{j as r,r as c,a as E,y as I}from"./index-dBLn7d2G.js";import{I as N,a as P}from"./index-k6Vii9ZT.js";import{C as j}from"./index-B20hc4J4.js";const k=l=>{var i=l,{type:e,text:t,onClick:s}=i,a=w(i,["type","text","onClick"]);return r.jsx("button",g(x({type:e,onClick:s},a),{className:"text-white w-full disabled:bg-gray-400 bg-[#0277fa] hover:bg-[#0275ef] cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-8 py-2",children:t}))},D=()=>{const[e,t]=c.useState({email:"",password:""}),[s,a]=c.useState(!1),[l,i]=c.useState(!1),p=c.useCallback(()=>{i(o=>!o)},[]),d=c.useCallback(o=>{t(u=>g(x({},u),{[o.target.id]:o.target.value}))},[]),n=o=>y(void 0,null,function*(){o.preventDefault(),a(!0);try{(yield E.post("/api/method/login",{usr:e.email,pwd:e.password})).status===200&&(window.location.pathname="/pos")}catch(u){console.error("Login error:",u),I.error("Invalid credentials. Please try again.")}finally{a(!1)}});return r.jsx("div",{className:"h-screen flex items-center justify-center",children:r.jsxs("div",{className:"bg-white w-100  rounded-lg shadow-lg p-8",children:[r.jsx("h1",{className:"text-2xl font-bold text-center text-[#080133] ",children:"Sign In"}),r.jsxs("form",{onSubmit:n,className:"mt-4",children:[r.jsxs("div",{className:"mb-4",children:[r.jsx(j,{label:"Email",id:"email",type:"email",required:!0,placeholder:"Enter your email",value:e.email,onChange:d}),r.jsx(j,{label:"Password",icon:r.jsx("button",{type:"button",onClick:p,children:l?r.jsx(N,{}):r.jsx(P,{})}),id:"password",type:l?"text":"password",required:!0,placeholder:"Enter your password",value:e.password,onChange:d})]}),r.jsx(k,{type:"submit",text:s?"Loading ...":"Sign In",disabled:s})]}),r.jsxs("p",{className:"text-[#b3b4bb] mt-4 mx-auto text-center",children:["Powerd by"," ",r.jsx("a",{href:"https://sowaanerp.com",target:"_blank",className:"text-[#0277fa]",children:"SowaanERP"})]})]})})};export{D as default};
