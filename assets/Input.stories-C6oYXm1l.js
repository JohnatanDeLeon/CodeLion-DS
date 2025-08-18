import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{R as h}from"./iframe-C37Vims9.js";import{c as y}from"./cn-BLk0pYo5.js";import"./preload-helper-CmsKOCeN.js";const oe={button:r=>{const n={role:"button"};return r.disabled?n.tabIndex=-1:n.tabIndex=0,r.pressed!==void 0&&(n["aria-pressed"]=r.pressed),r.expanded!==void 0&&(n["aria-expanded"]=r.expanded),r.disabled&&(n["aria-disabled"]=!0),r.describedBy&&(n["aria-describedby"]=r.describedBy),r.labelledBy&&(n["aria-labelledby"]=r.labelledBy),n},input:r=>{const n={};return r.required&&(n["aria-required"]=!0),r.invalid&&(n["aria-invalid"]=!0),r.describedBy&&(n["aria-describedby"]=r.describedBy),r.labelledBy&&(n["aria-labelledby"]=r.labelledBy),n},menu:r=>{const n={role:"menu"};return r.expanded!==void 0&&(n["aria-expanded"]=r.expanded),r.hasPopup&&(n["aria-haspopup"]=!0),r.controls&&(n["aria-controls"]=r.controls),r.activeDescendant&&(n["aria-activedescendant"]=r.activeDescendant),n},dialog:r=>{const n={role:"dialog"};return r.labelledBy&&(n["aria-labelledby"]=r.labelledBy),r.describedBy&&(n["aria-describedby"]=r.describedBy),r.modal&&(n["aria-modal"]=!0),n}};var le="cm2x1x0",de="cm2x1x1",ce="cm2x1x2",pe="cm2x1x3",me="cm2x1x4",ue="cm2x1x5",he="cm2x1x6",ge="cm2x1x7",fe="cm2x1x8",xe="cm2x1x9",ve="cm2x1xa",be="cm2x1xb",ye="cm2x1xc",we="cm2x1xd",Se="cm2x1xe",Ie="cm2x1xf",je="cm2x1xg",Ee="cm2x1xh",ke="cm2x1xi",Ce="cm2x1xj",Me="cm2x1xl",Le="cm2x1xm",Te="cm2x1xn",Fe="cm2x1xo",De="cm2x1xp",Pe="cm2x1xq",ze="cm2x1xr";const a=h.forwardRef(({size:r="md",state:n="default",label:o,helperText:m,errorMessage:u,successMessage:d,warningMessage:c,required:t=!1,icon:i,iconPosition:p="right",loading:l=!1,containerClassName:g,labelClassName:f,helperClassName:q,id:H,className:U,disabled:x,type:_="text",onChange:Y,onFocus:G,onBlur:$,...X},Z)=>{const J=h.useId(),R=H??J,V=`${R}-helper`,O=p==="left"&&(i||l),v=p==="right"&&(i||l),K=n==="error",W=n==="error"||n==="success"||n==="warning",b=(()=>{switch(n){case"error":return u;case"success":return d;case"warning":return c;default:return m}})(),Q={...oe.input({required:t,invalid:n==="error",describedBy:b?V:void 0}),"aria-describedby":b?V:void 0},ee=s=>{x||l||Y?.(s)},re=s=>{x||l||G?.(s)},ne=s=>{x||l||$?.(s)},ae=()=>{const s=[me];return r==="sm"&&s.push(Le),r==="lg"&&s.push(Te),n==="error"?s.push(xe):n==="success"?s.push(ve):n==="warning"&&s.push(be),O&&v?s.push(ge):O?r==="sm"?s.push(Fe):r==="lg"?s.push(Pe):s.push(ue):(v||W)&&(K&&v?s.push(fe):r==="sm"?s.push(De):r==="lg"?s.push(ze):s.push(he)),y(...s,U)},te=()=>e.jsxs("svg",{className:Me,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",role:"img",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"2",opacity:.25}),e.jsx("path",{d:"M22 12a10 10 0 0 1-10 10",stroke:"currentColor",strokeWidth:"2"})]}),N=()=>l?te():i||null,se=()=>n==="error"?e.jsx("div",{className:Ee,"aria-hidden":"true",children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10"}),e.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),e.jsx("circle",{cx:"12",cy:"16",r:"1"})]})}):n==="success"?e.jsx("div",{className:ke,"aria-hidden":"true",children:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})})}):n==="warning"?e.jsx("div",{className:Ce,"aria-hidden":"true",children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94A2 2 0 0 0 22.18 18L13.71 3.86a2 2 0 0 0-3.42 0z"}),e.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),e.jsx("line",{x1:"12",y1:"17",x2:"12",y2:"17"})]})}):null,ie=()=>{const s=[ye];return t&&s.push(we),n==="error"&&s.push(Se),y(...s,f)};return e.jsxs("div",{className:y(le,g),children:[o&&e.jsx("label",{htmlFor:R,className:ie(),children:o}),e.jsxs("div",{className:de,children:[O&&e.jsx("div",{className:ce,"aria-hidden":"true",children:N()}),e.jsx("input",{ref:Z,id:R,type:_,disabled:x||l,className:ae(),...X,...Q,onChange:ee,onFocus:re,onBlur:ne}),v&&!W&&e.jsx("div",{className:pe,"aria-hidden":"true",children:N()}),W&&se()]}),b&&e.jsx("div",{id:V,className:y(n==="error"?je:Ie,q),role:n==="error"?"alert":void 0,children:b})]})});a.displayName="Input";try{a.displayName="Input",a.__docgenInfo={description:"",displayName:"Input",props:{variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"email"'},{value:'"search"'}]}},size:{defaultValue:{value:"md"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},state:{defaultValue:{value:"default"},description:"",name:"state",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"error"'},{value:'"success"'},{value:'"warning"'}]}},fullWidth:{defaultValue:null,description:"",name:"fullWidth",required:!1,type:{name:"boolean"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},helperText:{defaultValue:null,description:"",name:"helperText",required:!1,type:{name:"string"}},errorMessage:{defaultValue:null,description:"",name:"errorMessage",required:!1,type:{name:"string"}},successMessage:{defaultValue:null,description:"",name:"successMessage",required:!1,type:{name:"string"}},warningMessage:{defaultValue:null,description:"",name:"warningMessage",required:!1,type:{name:"string"}},required:{defaultValue:{value:"false"},description:"",name:"required",required:!1,type:{name:"boolean"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactNode"}},iconPosition:{defaultValue:{value:"right"},description:"",name:"iconPosition",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'}]}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}},containerClassName:{defaultValue:null,description:"",name:"containerClassName",required:!1,type:{name:"string"}},labelClassName:{defaultValue:null,description:"",name:"labelClassName",required:!1,type:{name:"string"}},helperClassName:{defaultValue:null,description:"",name:"helperClassName",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string"}}}}}catch{}const We={title:"Components/Forms/Input",component:a,parameters:{layout:"centered",docs:{description:{component:`
The Input component is a versatile, accessible input field with multiple variants, states, and validation support.

## Features
- Multiple visual variants (default, search, email)
- Various sizes (sm, md, lg)
- Validation states with visual feedback (error, success, warning)
- Icon support with flexible positioning
- Loading states with spinner
- Full accessibility support (WCAG 2.1 AA)
- Labels, helper text, and error messages
- TypeScript support with comprehensive prop types

## Usage
Import the Input component and use it with the desired props:

\`\`\`tsx
import { Input } from '@johnatandeleon/design-system';

function MyForm() {
  return (
    <Input
      label="Email Address"
      type="email"
      placeholder="tu@empresa.com"
      required
      helperText="We'll use this to send you important updates"
    />
  );
}
\`\`\`
        `}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["default","search","email"],description:"Visual style variant of the input"},size:{control:"select",options:["sm","md","lg"],description:"Size of the input"},state:{control:"select",options:["default","error","success","warning"],description:"Visual state for validation feedback"},fullWidth:{control:"boolean",description:"Whether the input should take full width"},loading:{control:"boolean",description:"Shows loading spinner and disables interaction"},disabled:{control:"boolean",description:"Disables the input"},required:{control:"boolean",description:"Marks the field as required"},label:{control:"text",description:"Label text for the input"},helperText:{control:"text",description:"Helper text displayed below the input"},errorMessage:{control:"text",description:"Error message (overrides helperText when state is error)"},placeholder:{control:"text",description:"Placeholder text"},type:{control:"select",options:["text","email","password","search","tel","url","number"],description:"HTML input type"},iconPosition:{control:"select",options:["left","right"],description:"Position of the icon",if:{arg:"icon",truthy:!0}},onChange:{action:"changed",description:"Change event handler"},onFocus:{action:"focused",description:"Focus event handler"},onBlur:{action:"blurred",description:"Blur event handler"}}},w={args:{placeholder:"Enter text..."}},S={args:{label:"Full Name",placeholder:"Enter your full name",helperText:"This will be displayed on your profile"}},I={args:{label:"Email Address",type:"email",placeholder:"you@example.com",required:!0,helperText:"Required field"}},j={args:{label:"Email Corporativo",type:"email",placeholder:"tu@empresa.com",helperText:"Usaremos tu email para enviarte actualizaciones importantes"},parameters:{docs:{description:{story:"Corporate email input example matching the design from the provided image."}}}},E={args:{label:"IMPROVED IDLE STATE - Better Visual Hierarchy"},render:()=>{const r=e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),e.jsx("polyline",{points:"22,6 12,13 2,6"})]});return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"3rem",minWidth:"500px",padding:"2rem",backgroundColor:"#fafafa",borderRadius:"8px",border:"1px solid #e2e8f0",color:"#0f172a"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("h3",{style:{margin:"0 0 0.5rem 0",color:"#064e3b",fontSize:"1.25rem"},children:"🔦 IDLE STATE DRAMATICALLY IMPROVED"}),e.jsx("p",{style:{margin:0,color:"#475569",fontSize:"0.875rem"},children:'Better visual hierarchy: "OFF" → Hover → "ON" states with clear transitions'})]}),e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#f8fafc",borderRadius:"8px",border:"1px solid #cbd5e1"},children:[e.jsx("h4",{style:{margin:"0 0 1rem 0",fontSize:"1rem",color:"#1e293b"},children:"📱 Estado Base (IDLE) - Ahora Más Perceptible"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(a,{label:"Email Address",type:"email",placeholder:"Now more visible when idle",icon:r,iconPosition:"left",helperText:"✅ Border: neutral-300, Background: neutral-25, Icon: neutral-500"}),e.jsx(a,{label:"Username",placeholder:"Better contrast in idle state",helperText:"✅ Subtle shadows and improved typography contrast"})]}),e.jsxs("div",{style:{fontSize:"0.75rem",color:"#475569",marginTop:"1rem",padding:"0.75rem",backgroundColor:"#e2e8f0",borderRadius:"4px",fontFamily:"monospace"},children:[e.jsx("strong",{children:"CHANGES:"}),e.jsx("br",{}),"• Border: neutral[200] → neutral[300] (more visible)",e.jsx("br",{}),"• Background: white → neutral[25] (subtle tint)",e.jsx("br",{}),"• Icons: neutral[400] → neutral[500] (better contrast)",e.jsx("br",{}),"• Labels: neutral[700] → neutral[800] (stronger hierarchy)"]})]}),e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#eff6ff",borderRadius:"8px",border:"1px solid #bfdbfe",color:"#0f172a"},children:[e.jsx("h4",{style:{margin:"0 0 1rem 0",fontSize:"1rem",color:"#1e40af"},children:'⚡ Interactive States - "OFF" to "ON" Effect'}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(a,{label:"Try hovering and focusing these inputs",placeholder:"Hover me to see intermediate state",icon:r,iconPosition:"left",helperText:"🎯 Hover: elevation + border darkens → Focus: dramatic glow + elevation"}),e.jsx(a,{label:"Focus State Demo",placeholder:"Click/tab here for 'ON' effect",helperText:"✨ Focus creates dramatic lighting effect with glow and shadow"})]}),e.jsxs("div",{style:{fontSize:"0.75rem",color:"#1e40af",marginTop:"1rem",padding:"0.75rem",backgroundColor:"#dbeafe",borderRadius:"4px",fontFamily:"monospace"},children:[e.jsx("strong",{children:"FOCUS EFFECTS:"}),e.jsx("br",{}),"• Border: primary[600] (more intense)",e.jsx("br",{}),"• Glow: 30px spread + multiple shadows",e.jsx("br",{}),"• Transform: translateY(-2px) elevation",e.jsx("br",{}),"• Icons: scale(1.1) + glow effect"]})]}),e.jsxs("div",{style:{padding:"1.5rem",backgroundColor:"#fef2f2",borderRadius:"8px",border:"1px solid #fecaca",color:"#0f172a"},children:[e.jsx("h4",{style:{margin:"0 0 1rem 0",fontSize:"1rem",color:"#b91c1c"},children:'🎨 Validation States - Consistent "OFF/ON" Pattern'}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(a,{label:"Error State",placeholder:"Error state with improved contrast",state:"error",errorMessage:"Better visual hierarchy in error state",icon:r,iconPosition:"left"}),e.jsx(a,{label:"Success State",placeholder:"Success state maintains pattern",state:"success",successMessage:"Same 'OFF/ON' effect for all states"}),e.jsx(a,{label:"Warning State",placeholder:"Warning follows same principles",state:"warning",warningMessage:"Consistent interaction patterns"})]})]}),e.jsxs("div",{style:{fontSize:"0.875rem",color:"#064e3b",textAlign:"center",padding:"1.5rem",backgroundColor:"#d1fae5",borderRadius:"8px",border:"2px solid #a7f3d0",fontWeight:"600"},children:[e.jsx("div",{style:{fontSize:"2rem",marginBottom:"0.5rem"},children:"🎉"}),e.jsx("strong",{children:"IDLE STATE PROBLEM SOLVED"}),e.jsxs("div",{style:{fontSize:"0.75rem",marginTop:"1rem",fontWeight:"normal",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",textAlign:"left"},children:[e.jsxs("div",{children:[e.jsx("strong",{children:"❌ Before:"}),e.jsx("br",{}),"• Barely visible in idle state",e.jsx("br",{}),"• Poor visual hierarchy",e.jsx("br",{}),"• Hard to identify as interactive"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"✅ After:"}),e.jsx("br",{}),'• Clear "OFF" state with contrast',e.jsx("br",{}),'• Smooth "OFF → ON" transitions',e.jsx("br",{}),"• Obvious interactive element"]})]})]})]})},parameters:{docs:{description:{story:"DRAMATIC IMPROVEMENT: Demonstrates the enhanced idle state that makes inputs clearly perceivable as interactive elements, with smooth transitions from 'OFF' to 'ON' states."}}}},k={args:{label:"DEFINITIVELY FIXED - Icon Spacing"},render:()=>{const r=e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),n=e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),e.jsx("polyline",{points:"22,6 12,13 2,6"})]});return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem",minWidth:"450px",padding:"2rem",backgroundColor:"#fafafa",borderRadius:"8px",border:"1px solid #e2e8f0"},children:[e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("h3",{style:{margin:"0 0 0.5rem 0",color:"#064e3b",fontSize:"1.125rem"},children:"✅ PROBLEM DEFINITIVELY SOLVED"}),e.jsx("p",{style:{margin:0,color:"#475569",fontSize:"0.875rem"},children:"CSS directo implementado: .has-left-icon → padding-left: 2.75rem (44px)"})]}),e.jsxs("div",{style:{padding:"1rem",backgroundColor:"#ecfdf5",borderRadius:"6px",border:"1px solid #a7f3d0"},children:[e.jsx("h4",{style:{margin:"0 0 1rem 0",fontSize:"0.875rem",color:"#047857"},children:"📧 Email con Ícono Izquierdo - SIN SOLAPAMIENTO"}),e.jsx(a,{label:"Email Address",type:"email",placeholder:"your.very.long.email@company.domain.com",icon:n,iconPosition:"left",helperText:"✅ Ícono a 16px del borde, placeholder inicia a 44px"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"#047857",marginTop:"0.5rem",fontFamily:"monospace"},children:"left: 1rem (16px) + width: 1rem (16px) + gap: 12px = 44px total"})]}),e.jsxs("div",{style:{padding:"1rem",backgroundColor:"#eff6ff",borderRadius:"6px",border:"1px solid #bfdbfe"},children:[e.jsx("h4",{style:{margin:"0 0 1rem 0",fontSize:"0.875rem",color:"#1d4ed8"},children:"👤 Username con Ícono Izquierdo - ESPACIADO PERFECTO"}),e.jsx(a,{label:"Username",placeholder:"enter.your.very.long.username.here",icon:r,iconPosition:"left",helperText:"✅ 44px de padding-left evita completamente el solapamiento"})]}),e.jsxs("div",{children:[e.jsx("h4",{style:{margin:"0 0 1rem 0",fontSize:"0.875rem",color:"#7c2d12"},children:"📏 Todos los Tamaños - Responsive Spacing"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.75rem",color:"#a16207",marginBottom:"0.25rem"},children:"Small: padding-left: 2.5rem (40px)"}),e.jsx(a,{size:"sm",placeholder:"Small input with icon - no overlap",icon:n,iconPosition:"left"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.75rem",color:"#a16207",marginBottom:"0.25rem"},children:"Medium: padding-left: 2.75rem (44px)"}),e.jsx(a,{size:"md",placeholder:"Medium input with icon - perfect spacing",icon:n,iconPosition:"left"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.75rem",color:"#a16207",marginBottom:"0.25rem"},children:"Large: padding-left: 3rem (48px)"}),e.jsx(a,{size:"lg",placeholder:"Large input with icon - excellent spacing",icon:n,iconPosition:"left"})]})]})]}),e.jsxs("div",{style:{fontSize:"0.875rem",color:"#064e3b",textAlign:"center",padding:"1rem",backgroundColor:"#d1fae5",borderRadius:"6px",border:"2px solid #a7f3d0",fontWeight:"600"},children:[e.jsx("div",{style:{fontSize:"1.5rem",marginBottom:"0.5rem"},children:"🎉"}),e.jsx("strong",{style:{color:"#0f172a"},children:"SOLAPAMIENTO COMPLETAMENTE ELIMINADO"}),e.jsx("div",{style:{fontSize:"0.75rem",marginTop:"0.5rem",fontWeight:"normal",color:"#0f172a"},children:"Implementación CSS directa siguiendo especificaciones exactas del usuario"})]})]})},parameters:{docs:{description:{story:"DEFINITIVE SOLUTION: Demonstrates the completely fixed icon and placeholder spacing using direct CSS classes that eliminate overlap issues entirely."}}}},C={args:{variant:"search",placeholder:"Buscar en la librería...",icon:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"m21 21-4.35-4.35"})]}),iconPosition:"right"},parameters:{docs:{description:{story:"Search input with icon matching the design from the provided image."}}}},M={args:{label:"Campo con Validación Mejorada",placeholder:"Introduce un valor válido",state:"error",errorMessage:"Este campo es requerido y debe contener al menos 8 caracteres con una mayúscula"},parameters:{docs:{description:{story:"Input with validation error matching the design from the provided image."}}}},L={args:{placeholder:"Size comparison"},render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",minWidth:"300px"},children:[e.jsx(a,{size:"sm",label:"Small",placeholder:"Small input"}),e.jsx(a,{size:"md",label:"Medium",placeholder:"Medium input"}),e.jsx(a,{size:"lg",label:"Large",placeholder:"Large input"})]}),parameters:{docs:{description:{story:"Different input sizes available in the design system."}}}},T={args:{label:"State Examples"},render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem",minWidth:"400px"},children:[e.jsx(a,{label:"Default State",placeholder:"Normal input",helperText:"This is a helpful message"}),e.jsx(a,{label:"Error State",placeholder:"Enter valid data",state:"error",errorMessage:"This field is required"}),e.jsx(a,{label:"Success State",placeholder:"All good!",state:"success",successMessage:"Valid input format"}),e.jsx(a,{label:"Warning State",placeholder:"Check this carefully",state:"warning",warningMessage:"Please double-check this value"})]}),parameters:{docs:{description:{story:"All available input states with corresponding visual feedback."}}}},F={args:{label:"Icon Examples"},render:()=>{const r=e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"m21 21-4.35-4.35"})]}),n=e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),e.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),o=e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),e.jsx("polyline",{points:"22,6 12,13 2,6"})]});return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem",minWidth:"400px"},children:[e.jsx(a,{label:"Search",placeholder:"Search for items...",icon:r,iconPosition:"right"}),e.jsx(a,{label:"Username",placeholder:"Enter username",icon:n,iconPosition:"left"}),e.jsx(a,{label:"Email",type:"email",placeholder:"your@email.com",icon:o,iconPosition:"left"})]})},parameters:{docs:{description:{story:"Examples of inputs with icons in different positions."}}}},D={args:{label:"Loading State",placeholder:"Processing...",loading:!0},parameters:{docs:{description:{story:"Input in loading state with spinner animation."}}}},P={args:{label:"Disabled Input",placeholder:"Cannot edit this",disabled:!0,helperText:"This field is currently disabled"},parameters:{docs:{description:{story:"Disabled input state."}}}},z={args:{label:"Input Types"},render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem",minWidth:"400px"},children:[e.jsx(a,{label:"Text",type:"text",placeholder:"Enter text"}),e.jsx(a,{label:"Email",type:"email",placeholder:"user@example.com"}),e.jsx(a,{label:"Password",type:"password",placeholder:"Enter password"}),e.jsx(a,{label:"Search",type:"search",placeholder:"Search..."}),e.jsx(a,{label:"Telephone",type:"tel",placeholder:"+1 (555) 123-4567"}),e.jsx(a,{label:"URL",type:"url",placeholder:"https://example.com"}),e.jsx(a,{label:"Number",type:"number",placeholder:"Enter number",min:"0",max:"100"})]}),parameters:{docs:{description:{story:"Different HTML input types supported by the component."}}}},B={args:{label:"Interactive Form"},render:()=>{const[r,n]=h.useState({name:"",email:"",message:""}),[o,m]=h.useState({}),u=t=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t),d=t=>i=>{const p=i.target.value;n(l=>({...l,[t]:p})),o[t]&&m(l=>({...l,[t]:""}))},c=t=>{t.preventDefault();const i={};r.name.trim()||(i.name="Name is required"),r.email.trim()?u(r.email)||(i.email="Please enter a valid email address"):i.email="Email is required",m(i),Object.keys(i).length===0&&alert("Form submitted successfully!")};return e.jsxs("form",{onSubmit:c,style:{display:"flex",flexDirection:"column",gap:"1.5rem",minWidth:"400px",padding:"2rem",border:"1px solid #e2e8f0",borderRadius:"8px",backgroundColor:"#fafafa"},children:[e.jsx("h3",{style:{margin:"0 0 1rem 0",color:"#334155"},children:"📝 Contact Form"}),e.jsx(a,{label:"Full Name",placeholder:"Enter your full name",value:r.name,onChange:d("name"),state:o.name?"error":"default",errorMessage:o.name,required:!0}),e.jsx(a,{label:"Email Address",type:"email",placeholder:"you@example.com",value:r.email,onChange:d("email"),state:o.email?"error":r.email&&u(r.email)?"success":"default",errorMessage:o.email,successMessage:r.email&&u(r.email)?"Valid email format":void 0,icon:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),e.jsx("polyline",{points:"22,6 12,13 2,6"})]}),iconPosition:"left",required:!0}),e.jsx("button",{type:"submit",style:{padding:"0.75rem 1.5rem",backgroundColor:"#0369a1",color:"white",border:"none",borderRadius:"6px",fontSize:"0.875rem",fontWeight:"600",cursor:"pointer",transition:"background-color 200ms ease"},onMouseEnter:t=>{t.currentTarget.style.backgroundColor="#014f86"},onMouseLeave:t=>{t.currentTarget.style.backgroundColor="#0369a1"},children:"Submit Form"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"#475569",textAlign:"center",marginTop:"0.5rem"},children:"Interact with the form to see validation in action"})]})},parameters:{docs:{description:{story:"Interactive example showing real-time validation and form handling."}}}},A={args:{label:"Advanced Validation"},render:()=>{const[r,n]=h.useState(""),[o,m]=h.useState(""),d=(t=>{const i=t.length>=8,p=/[A-Z]/.test(t),l=/[a-z]/.test(t),g=/\d/.test(t),f=/[!@#$%^&*(),.?":{}|<>]/.test(t);return{isValid:i&&p&&l&&g&&f,requirements:[{met:i,text:"At least 8 characters"},{met:p,text:"One uppercase letter"},{met:l,text:"One lowercase letter"},{met:g,text:"One number"},{met:f,text:"One special character"}]}})(r),c=r&&o&&r===o;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1.5rem",minWidth:"450px",padding:"2rem",border:"1px solid #e2e8f0",borderRadius:"8px",backgroundColor:"#fafafa"},children:[e.jsx("h3",{style:{margin:"0 0 1rem 0",color:"#334155"},children:"🔒 Password Validation"}),e.jsx(a,{label:"Password",type:"password",placeholder:"Enter a strong password",value:r,onChange:t=>n(t.target.value),state:r?d.isValid?"success":"error":"default",errorMessage:r&&!d.isValid?"Password does not meet requirements":void 0,successMessage:d.isValid?"Strong password!":void 0}),r&&e.jsxs("div",{style:{padding:"1rem",backgroundColor:"white",border:"1px solid #e2e8f0",borderRadius:"6px",fontSize:"0.75rem"},children:[e.jsx("div",{style:{fontWeight:"600",marginBottom:"0.5rem",color:"#374151"},children:"Password Requirements:"}),d.requirements.map((t,i)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem",color:t.met?"#064e3b":"#dc2626",marginBottom:"0.25rem"},children:[e.jsx("span",{children:t.met?"✓":"✗"}),e.jsx("span",{children:t.text})]},i))]}),e.jsx(a,{label:"Confirm Password",type:"password",placeholder:"Confirm your password",value:o,onChange:t=>m(t.target.value),state:o?c?"success":"error":"default",errorMessage:o&&!c?"Passwords do not match":void 0,successMessage:c?"Passwords match!":void 0})]})},parameters:{docs:{description:{story:"Advanced validation example with real-time password strength checking."}}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Enter text..."
  }
}`,...w.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    helperText: "This will be displayed on your profile"
  }
}`,...S.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    required: true,
    helperText: "Required field"
  }
}`,...I.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Email Corporativo",
    type: "email",
    placeholder: "tu@empresa.com",
    helperText: "Usaremos tu email para enviarte actualizaciones importantes"
  },
  parameters: {
    docs: {
      description: {
        story: "Corporate email input example matching the design from the provided image."
      }
    }
  }
}`,...j.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    label: "IMPROVED IDLE STATE - Better Visual Hierarchy"
  },
  render: () => {
    const MailIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>;
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "3rem",
      minWidth: "500px",
      padding: "2rem",
      backgroundColor: "#fafafa",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      color: "#0f172a" // stronger base text color to meet contrast
    }}>
        <div style={{
        textAlign: "center"
      }}>
          <h3 style={{
          margin: "0 0 0.5rem 0",
          color: "#064e3b",
          fontSize: "1.25rem"
        }}>
            🔦 IDLE STATE DRAMATICALLY IMPROVED
          </h3>
          <p style={{
          margin: 0,
          color: "#475569",
          fontSize: "0.875rem"
        }}>
            Better visual hierarchy: "OFF" → Hover → "ON" states with clear
            transitions
          </p>
        </div>

        {/* Estado Base Mejorado */}
        <div style={{
        padding: "1.5rem",
        backgroundColor: "#f8fafc",
        borderRadius: "8px",
        border: "1px solid #cbd5e1"
      }}>
          <h4 style={{
          margin: "0 0 1rem 0",
          fontSize: "1rem",
          color: "#1e293b"
        }}>
            📱 Estado Base (IDLE) - Ahora Más Perceptible
          </h4>
          <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
            <Input label="Email Address" type="email" placeholder="Now more visible when idle" icon={MailIcon} iconPosition="left" helperText="✅ Border: neutral-300, Background: neutral-25, Icon: neutral-500" />
            <Input label="Username" placeholder="Better contrast in idle state" helperText="✅ Subtle shadows and improved typography contrast" />
          </div>
          <div style={{
          fontSize: "0.75rem",
          color: "#475569",
          marginTop: "1rem",
          padding: "0.75rem",
          backgroundColor: "#e2e8f0",
          borderRadius: "4px",
          fontFamily: "monospace"
        }}>
            <strong>CHANGES:</strong>
            <br />
            • Border: neutral[200] → neutral[300] (more visible)
            <br />
            • Background: white → neutral[25] (subtle tint)
            <br />
            • Icons: neutral[400] → neutral[500] (better contrast)
            <br />• Labels: neutral[700] → neutral[800] (stronger hierarchy)
          </div>
        </div>

        {/* Demostración de Estados Interactivos */}
        <div style={{
        padding: "1.5rem",
        backgroundColor: "#eff6ff",
        borderRadius: "8px",
        border: "1px solid #bfdbfe",
        color: "#0f172a"
      }}>
          <h4 style={{
          margin: "0 0 1rem 0",
          fontSize: "1rem",
          color: "#1e40af"
        }}>
            ⚡ Interactive States - "OFF" to "ON" Effect
          </h4>
          <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
            <Input label="Try hovering and focusing these inputs" placeholder="Hover me to see intermediate state" icon={MailIcon} iconPosition="left" helperText="🎯 Hover: elevation + border darkens → Focus: dramatic glow + elevation" />
            <Input label="Focus State Demo" placeholder="Click/tab here for 'ON' effect" helperText="✨ Focus creates dramatic lighting effect with glow and shadow" />
          </div>
          <div style={{
          fontSize: "0.75rem",
          color: "#1e40af",
          marginTop: "1rem",
          padding: "0.75rem",
          backgroundColor: "#dbeafe",
          borderRadius: "4px",
          fontFamily: "monospace"
        }}>
            <strong>FOCUS EFFECTS:</strong>
            <br />
            • Border: primary[600] (more intense)
            <br />
            • Glow: 30px spread + multiple shadows
            <br />
            • Transform: translateY(-2px) elevation
            <br />• Icons: scale(1.1) + glow effect
          </div>
        </div>

        {/* Estados de Validación Mejorados */}
        <div style={{
        padding: "1.5rem",
        backgroundColor: "#fef2f2",
        borderRadius: "8px",
        border: "1px solid #fecaca",
        color: "#0f172a"
      }}>
          <h4 style={{
          margin: "0 0 1rem 0",
          fontSize: "1rem",
          color: "#b91c1c"
        }}>
            🎨 Validation States - Consistent "OFF/ON" Pattern
          </h4>
          <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
            <Input label="Error State" placeholder="Error state with improved contrast" state="error" errorMessage="Better visual hierarchy in error state" icon={MailIcon} iconPosition="left" />
            <Input label="Success State" placeholder="Success state maintains pattern" state="success" successMessage="Same 'OFF/ON' effect for all states" />
            <Input label="Warning State" placeholder="Warning follows same principles" state="warning" warningMessage="Consistent interaction patterns" />
          </div>
        </div>

        {/* Comparación Antes/Después */}
        <div style={{
        fontSize: "0.875rem",
        color: "#064e3b",
        textAlign: "center",
        padding: "1.5rem",
        backgroundColor: "#d1fae5",
        borderRadius: "8px",
        border: "2px solid #a7f3d0",
        fontWeight: "600"
      }}>
          <div style={{
          fontSize: "2rem",
          marginBottom: "0.5rem"
        }}>🎉</div>
          <strong>IDLE STATE PROBLEM SOLVED</strong>
          <div style={{
          fontSize: "0.75rem",
          marginTop: "1rem",
          fontWeight: "normal",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          textAlign: "left"
        }}>
            <div>
              <strong>❌ Before:</strong>
              <br />
              • Barely visible in idle state
              <br />
              • Poor visual hierarchy
              <br />• Hard to identify as interactive
            </div>
            <div>
              <strong>✅ After:</strong>
              <br />
              • Clear "OFF" state with contrast
              <br />
              • Smooth "OFF → ON" transitions
              <br />• Obvious interactive element
            </div>
          </div>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "DRAMATIC IMPROVEMENT: Demonstrates the enhanced idle state that makes inputs clearly perceivable as interactive elements, with smooth transitions from 'OFF' to 'ON' states."
      }
    }
  }
}`,...E.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    label: "DEFINITIVELY FIXED - Icon Spacing"
  },
  render: () => {
    const UserIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>;
    const MailIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>;
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      minWidth: "450px",
      padding: "2rem",
      backgroundColor: "#fafafa",
      borderRadius: "8px",
      border: "1px solid #e2e8f0"
    }}>
        <div style={{
        textAlign: "center"
      }}>
          <h3 style={{
          margin: "0 0 0.5rem 0",
          color: "#064e3b",
          fontSize: "1.125rem"
        }}>
            ✅ PROBLEM DEFINITIVELY SOLVED
          </h3>
          <p style={{
          margin: 0,
          color: "#475569",
          fontSize: "0.875rem"
        }}>
            CSS directo implementado: .has-left-icon → padding-left: 2.75rem
            (44px)
          </p>
        </div>

        <div style={{
        padding: "1rem",
        backgroundColor: "#ecfdf5",
        borderRadius: "6px",
        border: "1px solid #a7f3d0"
      }}>
          <h4 style={{
          margin: "0 0 1rem 0",
          fontSize: "0.875rem",
          color: "#047857"
        }}>
            📧 Email con Ícono Izquierdo - SIN SOLAPAMIENTO
          </h4>
          <Input label="Email Address" type="email" placeholder="your.very.long.email@company.domain.com" icon={MailIcon} iconPosition="left" helperText="✅ Ícono a 16px del borde, placeholder inicia a 44px" />
          <div style={{
          fontSize: "0.75rem",
          color: "#047857",
          marginTop: "0.5rem",
          fontFamily: "monospace"
        }}>
            left: 1rem (16px) + width: 1rem (16px) + gap: 12px = 44px total
          </div>
        </div>

        <div style={{
        padding: "1rem",
        backgroundColor: "#eff6ff",
        borderRadius: "6px",
        border: "1px solid #bfdbfe"
      }}>
          <h4 style={{
          margin: "0 0 1rem 0",
          fontSize: "0.875rem",
          color: "#1d4ed8"
        }}>
            👤 Username con Ícono Izquierdo - ESPACIADO PERFECTO
          </h4>
          <Input label="Username" placeholder="enter.your.very.long.username.here" icon={UserIcon} iconPosition="left" helperText="✅ 44px de padding-left evita completamente el solapamiento" />
        </div>

        <div>
          <h4 style={{
          margin: "0 0 1rem 0",
          fontSize: "0.875rem",
          color: "#7c2d12"
        }}>
            📏 Todos los Tamaños - Responsive Spacing
          </h4>
          <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
            <div>
              <div style={{
              fontSize: "0.75rem",
              color: "#a16207",
              marginBottom: "0.25rem"
            }}>
                Small: padding-left: 2.5rem (40px)
              </div>
              <Input size="sm" placeholder="Small input with icon - no overlap" icon={MailIcon} iconPosition="left" />
            </div>
            <div>
              <div style={{
              fontSize: "0.75rem",
              color: "#a16207",
              marginBottom: "0.25rem"
            }}>
                Medium: padding-left: 2.75rem (44px)
              </div>
              <Input size="md" placeholder="Medium input with icon - perfect spacing" icon={MailIcon} iconPosition="left" />
            </div>
            <div>
              <div style={{
              fontSize: "0.75rem",
              color: "#a16207",
              marginBottom: "0.25rem"
            }}>
                Large: padding-left: 3rem (48px)
              </div>
              <Input size="lg" placeholder="Large input with icon - excellent spacing" icon={MailIcon} iconPosition="left" />
            </div>
          </div>
        </div>

        <div style={{
        fontSize: "0.875rem",
        color: "#064e3b",
        textAlign: "center",
        padding: "1rem",
        backgroundColor: "#d1fae5",
        borderRadius: "6px",
        border: "2px solid #a7f3d0",
        fontWeight: "600"
      }}>
          <div style={{
          fontSize: "1.5rem",
          marginBottom: "0.5rem"
        }}>🎉</div>
          <strong style={{
          color: "#0f172a"
        }}>
            SOLAPAMIENTO COMPLETAMENTE ELIMINADO
          </strong>
          <div style={{
          fontSize: "0.75rem",
          marginTop: "0.5rem",
          fontWeight: "normal",
          color: "#0f172a"
        }}>
            Implementación CSS directa siguiendo especificaciones exactas del
            usuario
          </div>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "DEFINITIVE SOLUTION: Demonstrates the completely fixed icon and placeholder spacing using direct CSS classes that eliminate overlap issues entirely."
      }
    }
  }
}`,...k.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "search",
    placeholder: "Buscar en la librería...",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>,
    iconPosition: "right"
  },
  parameters: {
    docs: {
      description: {
        story: "Search input with icon matching the design from the provided image."
      }
    }
  }
}`,...C.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Campo con Validación Mejorada",
    placeholder: "Introduce un valor válido",
    state: "error",
    errorMessage: "Este campo es requerido y debe contener al menos 8 caracteres con una mayúscula"
  },
  parameters: {
    docs: {
      description: {
        story: "Input with validation error matching the design from the provided image."
      }
    }
  }
}`,...M.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: "Size comparison"
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    minWidth: "300px"
  }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Different input sizes available in the design system."
      }
    }
  }
}`,...L.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    label: "State Examples"
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    minWidth: "400px"
  }}>
      <Input label="Default State" placeholder="Normal input" helperText="This is a helpful message" />
      <Input label="Error State" placeholder="Enter valid data" state="error" errorMessage="This field is required" />
      <Input label="Success State" placeholder="All good!" state="success" successMessage="Valid input format" />
      <Input label="Warning State" placeholder="Check this carefully" state="warning" warningMessage="Please double-check this value" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: "All available input states with corresponding visual feedback."
      }
    }
  }
}`,...T.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Icon Examples"
  },
  render: () => {
    const SearchIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>;
    const UserIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>;
    const MailIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>;
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      minWidth: "400px"
    }}>
        <Input label="Search" placeholder="Search for items..." icon={SearchIcon} iconPosition="right" />
        <Input label="Username" placeholder="Enter username" icon={UserIcon} iconPosition="left" />
        <Input label="Email" type="email" placeholder="your@email.com" icon={MailIcon} iconPosition="left" />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "Examples of inputs with icons in different positions."
      }
    }
  }
}`,...F.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Loading State",
    placeholder: "Processing...",
    loading: true
  },
  parameters: {
    docs: {
      description: {
        story: "Input in loading state with spinner animation."
      }
    }
  }
}`,...D.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit this",
    disabled: true,
    helperText: "This field is currently disabled"
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled input state."
      }
    }
  }
}`,...P.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Input Types"
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    minWidth: "400px"
  }}>
      <Input label="Text" type="text" placeholder="Enter text" />
      <Input label="Email" type="email" placeholder="user@example.com" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Search" type="search" placeholder="Search..." />
      <Input label="Telephone" type="tel" placeholder="+1 (555) 123-4567" />
      <Input label="URL" type="url" placeholder="https://example.com" />
      <Input label="Number" type="number" placeholder="Enter number" min="0" max="100" />
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Different HTML input types supported by the component."
      }
    }
  }
}`,...z.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Interactive Form"
  },
  render: () => {
    const [formData, setFormData] = React.useState({
      name: "",
      email: "",
      message: ""
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      return emailRegex.test(email);
    };
    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: ""
        }));
      }
    };
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      const newErrors: Record<string, string> = {};
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        alert("Form submitted successfully!");
      }
    };
    return <form onSubmit={handleSubmit} style={{
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      minWidth: "400px",
      padding: "2rem",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
        <h3 style={{
        margin: "0 0 1rem 0",
        color: "#334155"
      }}>
          📝 Contact Form
        </h3>

        <Input label="Full Name" placeholder="Enter your full name" value={formData.name} onChange={handleChange("name")} state={errors.name ? "error" : "default"} errorMessage={errors.name} required />

        <Input label="Email Address" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange("email")} state={errors.email ? "error" : formData.email && validateEmail(formData.email) ? "success" : "default"} errorMessage={errors.email} successMessage={formData.email && validateEmail(formData.email) ? "Valid email format" : undefined} icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>} iconPosition="left" required />

        <button type="submit" style={{
        padding: "0.75rem 1.5rem",
        backgroundColor: "#0369a1",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "0.875rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background-color 200ms ease"
      }} onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = "#014f86";
      }} onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = "#0369a1";
      }}>
          Submit Form
        </button>

        <div style={{
        fontSize: "0.75rem",
        color: "#475569",
        textAlign: "center",
        marginTop: "0.5rem"
      }}>
          Interact with the form to see validation in action
        </div>
      </form>;
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example showing real-time validation and form handling."
      }
    }
  }
}`,...B.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Advanced Validation"
  },
  render: () => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const validatePassword = (pwd: string) => {
      const hasLength = pwd.length >= 8;
      const hasUppercase = /[A-Z]/.test(pwd);
      const hasLowercase = /[a-z]/.test(pwd);
      const hasNumber = /\\d/.test(pwd);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
      return {
        isValid: hasLength && hasUppercase && hasLowercase && hasNumber && hasSpecial,
        requirements: [{
          met: hasLength,
          text: "At least 8 characters"
        }, {
          met: hasUppercase,
          text: "One uppercase letter"
        }, {
          met: hasLowercase,
          text: "One lowercase letter"
        }, {
          met: hasNumber,
          text: "One number"
        }, {
          met: hasSpecial,
          text: "One special character"
        }]
      };
    };
    const passwordValidation = validatePassword(password);
    const passwordsMatch = password && confirmPassword && password === confirmPassword;
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      minWidth: "450px",
      padding: "2rem",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
        <h3 style={{
        margin: "0 0 1rem 0",
        color: "#334155"
      }}>
          🔒 Password Validation
        </h3>

        <Input label="Password" type="password" placeholder="Enter a strong password" value={password} onChange={e => setPassword(e.target.value)} state={!password ? "default" : passwordValidation.isValid ? "success" : "error"} errorMessage={password && !passwordValidation.isValid ? "Password does not meet requirements" : undefined} successMessage={passwordValidation.isValid ? "Strong password!" : undefined} />

        {password && <div style={{
        padding: "1rem",
        backgroundColor: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "6px",
        fontSize: "0.75rem"
      }}>
            <div style={{
          fontWeight: "600",
          marginBottom: "0.5rem",
          color: "#374151"
        }}>
              Password Requirements:
            </div>
            {passwordValidation.requirements.map((req, index) => <div key={index} style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: req.met ? "#064e3b" : "#dc2626",
          marginBottom: "0.25rem"
        }}>
                <span>{req.met ? "✓" : "✗"}</span>
                <span>{req.text}</span>
              </div>)}
          </div>}

        <Input label="Confirm Password" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} state={!confirmPassword ? "default" : passwordsMatch ? "success" : "error"} errorMessage={confirmPassword && !passwordsMatch ? "Passwords do not match" : undefined} successMessage={passwordsMatch ? "Passwords match!" : undefined} />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "Advanced validation example with real-time password strength checking."
      }
    }
  }
}`,...A.parameters?.docs?.source}}};const Ne=["Default","WithLabel","Required","CorporateEmail","ImprovedIdleState","IconSpacingFixed","SearchInput","ValidationError","Sizes","States","WithIcons","Loading","Disabled","InputTypes","InteractiveForm","AdvancedValidation"];export{A as AdvancedValidation,j as CorporateEmail,w as Default,P as Disabled,k as IconSpacingFixed,E as ImprovedIdleState,z as InputTypes,B as InteractiveForm,D as Loading,I as Required,C as SearchInput,L as Sizes,T as States,M as ValidationError,F as WithIcons,S as WithLabel,Ne as __namedExportsOrder,We as default};
