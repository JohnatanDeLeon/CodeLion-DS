import{j as t}from"./jsx-runtime-BjG_zV1W.js";import{r as E,R as f}from"./iframe-C37Vims9.js";import{c as K}from"./cn-BLk0pYo5.js";import"./preload-helper-CmsKOCeN.js";function J(e,r){if(typeof e!="object"||!e)return e;var a=e[Symbol.toPrimitive];if(a!==void 0){var n=a.call(e,r);if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(r==="string"?String:Number)(e)}function Q(e){var r=J(e,"string");return typeof r=="symbol"?r:String(r)}function X(e,r,a){return r=Q(r),r in e?Object.defineProperty(e,r,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[r]=a,e}function _(e,r){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),a.push.apply(a,n)}return a}function L(e){for(var r=1;r<arguments.length;r++){var a=arguments[r]!=null?arguments[r]:{};r%2?_(Object(a),!0).forEach(function(n){X(e,n,a[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):_(Object(a)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))})}return e}function F(e,r){var a={};for(var n in e)a[n]=r(e[n],n);return a}var Y=(e,r,a)=>{for(var n of Object.keys(e)){var o;if(e[n]!==((o=r[n])!==null&&o!==void 0?o:a[n]))return!1}return!0},Z=e=>{var r=a=>{var n=e.defaultClassName,o=L(L({},e.defaultVariants),a);for(var i in o){var s,l=(s=o[i])!==null&&s!==void 0?s:e.defaultVariants[i];if(l!=null){var c=l;typeof c=="boolean"&&(c=c===!0?"true":"false");var u=e.variantClassNames[i][c];u&&(n+=" "+u)}}for(var[p,m]of e.compoundVariants)Y(p,o,e.defaultVariants)&&(n+=" "+m);return n};return r.variants=()=>Object.keys(e.variantClassNames),r.classNames={get base(){return e.defaultClassName.split(" ")[0]},get variants(){return F(e.variantClassNames,a=>F(a,n=>n.split(" ")[0]))}},r},ee=Z({defaultClassName:"_1xo0nr23",variantClassNames:{variant:{primary:"_1xo0nr24",secondary:"_1xo0nr25",ghost:"_1xo0nr26",destructive:"_1xo0nr27",gradient:"_1xo0nr28"},size:{sm:"_1xo0nr29",md:"_1xo0nr2a",lg:"_1xo0nr2b",xl:"_1xo0nr2c",icon:"_1xo0nr2d"},fullWidth:{true:"_1xo0nr2e"},loading:{true:"_1xo0nr2f"}},defaultVariants:{variant:"primary",size:"md"},compoundVariants:[[{size:"icon",variant:"ghost"},"_1xo0nr2g"]]}),ne="_1xo0nr2i",te="_1xo0nr2j";const re=e=>{const r=e.replace("#",""),a=r.length===3,n=r.length===6;if(!a&&!n)return null;let o=r;a&&(o=r.split("").map(s=>s+s).join(""));const i=parseInt(o,16);return isNaN(i)?null:{r:i>>16&255,g:i>>8&255,b:i&255}},ae=({r:e,g:r,b:a})=>{const n=o=>Math.round(Math.max(0,Math.min(255,o))).toString(16).padStart(2,"0");return`#${n(e)}${n(r)}${n(a)}`},oe=({r:e,g:r,b:a})=>{const n=e/255,o=r/255,i=a/255,s=Math.max(n,o,i),l=Math.min(n,o,i),c=s-l;let u=0;const p=(s+l)/2,m=c===0?0:c/(1-Math.abs(2*p-1));if(c!==0)switch(s){case n:u=(o-i)/c%6;break;case o:u=(i-n)/c+2;break;case i:u=(n-o)/c+4;break}return{h:Math.round(u*60),s:Math.round(m*100),l:Math.round(p*100)}},ie=({h:e,s:r,l:a})=>{const n=e/360,o=r/100,i=a/100,s=(1-Math.abs(2*i-1))*o,l=s*(1-Math.abs(n*6%2-1)),c=i-s/2;let u=0,p=0,m=0;return 0<=n&&n<1/6?(u=s,p=l,m=0):1/6<=n&&n<2/6?(u=l,p=s,m=0):2/6<=n&&n<3/6?(u=0,p=s,m=l):3/6<=n&&n<4/6?(u=0,p=l,m=s):4/6<=n&&n<5/6?(u=l,p=0,m=s):5/6<=n&&n<1&&(u=s,p=0,m=l),{r:Math.round((u+c)*255),g:Math.round((p+c)*255),b:Math.round((m+c)*255)}},h=(e,r={})=>{const{amount:a=.15}=r,n=re(e);if(!n)return e;const o=oe(n),i={...o,l:Math.max(0,o.l-a*100)},s=ie(i);return ae(s)},se=e=>e!=null&&typeof e=="object"&&"startColor"in e&&"endColor"in e,le=e=>e!=null&&typeof e=="object"&&"gradient"in e,de=e=>typeof e=="number"?`${e}deg`:{"to-top":"to top","to-bottom":"to bottom","to-left":"to left","to-right":"to right","to-top-left":"to top left","to-top-right":"to top right","to-bottom-left":"to bottom left","to-bottom-right":"to bottom right"}[e]||"135deg",y=e=>{const r=de(e.direction||135),a=e.stops.map(n=>`${n.color}${n.position!==void 0?` ${n.position}%`:""}`).join(", ");return`linear-gradient(${r}, ${a})`},ce=(e,r)=>{const{startColor:a,endColor:n,direction:o=135,hoverStartColor:i,hoverEndColor:s}=e,{hoverDarkenAmount:l=.15,activeDarkenAmount:c=.25}=r,u={direction:o,stops:[{color:a,position:0},{color:n,position:100}],fallback:a},p={direction:o,stops:[{color:i||h(a,{amount:l}),position:0},{color:s||h(n,{amount:l}),position:100}],fallback:i||h(a,{amount:l})},m={direction:o,stops:[{color:h(i||a,{amount:c}),position:0},{color:h(s||n,{amount:c}),position:100}],fallback:h(i||a,{amount:c})};return{default:u,hover:p,active:m}},ue=(e,r={})=>{const{generateCustomProperties:a=!0,cssPropertyPrefix:n="gradient"}=r,o=E.useMemo(()=>e?se(e)?ce(e,r):le(e)?e.gradient:null:null,[e,r]);return E.useMemo(()=>{if(!o)return null;const s=y(o.default),l={};return a&&(o.hover&&(l[`--${n}-hover`]=y(o.hover)),o.active&&(l[`--${n}-active`]=y(o.active)),o.focus&&(l[`--${n}-focus`]=y(o.focus)),o.disabled&&(l[`--${n}-disabled`]=y(o.disabled))),{background:s,customProperties:l,className:a?`${n}-custom`:void 0}},[o,a,n])},H=()=>{const e=E.useCallback((a,n,o,i=135)=>({startColor:n,endColor:o,direction:i}),[]);return{presets:E.useMemo(()=>({primary:e("primary","#667eea","#764ba2"),secondary:e("secondary","#f093fb","#f5576c"),sunset:e("sunset","#ff9a9e","#fecfef"),ocean:e("ocean","#a8edea","#fed6e3"),forest:e("forest","#11998e","#38ef7d"),fire:e("fire","#f12711","#f5af19"),silver:e("silver","#bdc3c7","#2c3e50"),graphite:e("graphite","#232526","#414345"),success:e("success","#56ab2f","#a8e6cf"),warning:e("warning","#f7931e","#ffd200"),error:e("error","#ee5a52","#f093fb"),info:e("info","#3b82f6","#06b6d4")}),[e]),createPreset:e}},d=f.forwardRef(({variant:e="primary",size:r="md",fullWidth:a=!1,loading:n=!1,disabled:o,className:i,children:s,gradient:l,onClick:c,type:u="button",...p},m)=>{const V=f.useRef(null),v=ue(e==="gradient"?l:void 0,{cssPropertyPrefix:"gradient",generateCustomProperties:!0}),q=g=>{V.current=g,typeof m=="function"?m(g):m&&(m.current=g)},T=g=>{if(n||o){g.preventDefault();return}c?.(g)},$=f.useMemo(()=>{const g=p.style||{},U=v?{background:v.background,...v.customProperties}:{};return{...g,...U}},[p.style,v]);return t.jsxs("button",{ref:q,type:u,className:K(ee({variant:e,size:r,fullWidth:a,loading:n}),v?.className&&te,i),style:$,disabled:o||n,"aria-disabled":o||n,onClick:T,onKeyDown:g=>{g.key==="Enter"?(g.preventDefault(),!o&&!n&&V.current?.click()):g.key===" "&&g.preventDefault()},onKeyUp:g=>{g.key===" "&&(g.preventDefault(),!o&&!n&&V.current?.click())},...p,children:[n&&t.jsxs("svg",{role:"img",className:ne,width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:[t.jsx("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4",opacity:"0.25"}),t.jsx("path",{d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",fill:"currentColor"})]}),s]})});d.displayName="Button";try{d.displayName="Button",d.__docgenInfo={description:`Button Component

Versatile button component with multiple variants, sizes, and states.
Follows WCAG 2.1 AA accessibility guidelines.`,displayName:"Button",props:{variant:{defaultValue:{value:"primary"},description:"Visual style variant of the button",name:"variant",required:!1,type:{name:"enum",value:[{value:'"gradient"'},{value:'"primary"'},{value:'"secondary"'},{value:'"ghost"'},{value:'"destructive"'}]}},size:{defaultValue:{value:"md"},description:"Size of the button",name:"size",required:!1,type:{name:"enum",value:[{value:'"icon"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'}]}},fullWidth:{defaultValue:{value:"false"},description:"Whether the button should take full width of its container",name:"fullWidth",required:!1,type:{name:"boolean"}},loading:{defaultValue:{value:"false"},description:"Loading state - shows loading indicator and disables interaction",name:"loading",required:!1,type:{name:"boolean"}},children:{defaultValue:null,description:"Content to render inside the button",name:"children",required:!0,type:{name:"ReactNode"}},className:{defaultValue:null,description:"Additional CSS classes",name:"className",required:!1,type:{name:"string"}},gradient:{defaultValue:null,description:`Gradient configuration (only applies when variant="gradient")
Can be a simple object with startColor/endColor or advanced configuration
@example // Simple gradient
gradient={{ startColor: "#ff6b6b", endColor: "#ee5a52" }}
@example // Advanced gradient with full control
gradient={{
  gradient: {
    default: { direction: 135, stops: [{ color: "#ff6b6b", position: 0 }] },
    hover: { direction: 135, stops: [{ color: "#ee5a52", position: 0 }] }
  }
}}`,name:"gradient",required:!1,type:{name:"GradientProps"}},onClick:{defaultValue:null,description:"Click handler",name:"onClick",required:!1,type:{name:"((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)"}}}}}catch{}const he={title:"Components/Basic/Button",component:d,parameters:{layout:"centered",docs:{description:{component:`
The Button component is a versatile, accessible button with multiple variants and states.

## Features
- Multiple visual variants (primary, secondary, ghost, destructive, gradient)
- Various sizes (sm, md, lg, xl, icon)
- Loading states with spinner
- Full width support
- Keyboard navigation support
- WCAG 2.1 AA compliant
- TypeScript support with comprehensive prop types

## Usage
Import the Button component and use it with the desired props:

\`\`\`tsx
import { Button } from '@johnatandeleon/design-system';

function MyComponent() {
  return (
    <Button variant="primary" size="md" onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}
\`\`\`
        `}}},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","ghost","destructive","gradient"],description:"Visual style variant of the button"},size:{control:"select",options:["sm","md","lg","xl","icon"],description:"Size of the button"},fullWidth:{control:"boolean",description:"Whether the button should take full width"},loading:{control:"boolean",description:"Shows loading spinner and disables interaction"},disabled:{control:"boolean",description:"Disables the button"},children:{control:"text",description:"Button content"},gradient:{control:"object",description:"Gradient configuration object (only applies when variant='gradient')",if:{arg:"variant",eq:"gradient"},table:{type:{summary:"GradientProps",detail:`Simple: { startColor: string, endColor: string }
Advanced: { gradient: { default: GradientConfig, hover?: GradientConfig } }`}}},onClick:{action:"clicked",description:"Click event handler"}}},x={args:{children:"Button"}},b={args:{variant:"primary",children:"Primary Button"}},C={args:{variant:"secondary",children:"Secondary Button"}},B={args:{variant:"ghost",children:"Ghost Button"}},j={args:{variant:"destructive",children:"Delete Item"}},S={args:{variant:"gradient",children:"Gradient Button",size:"xl"}},w={args:{children:"Button"},render:()=>t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem",flexWrap:"wrap"},children:[t.jsx(d,{size:"sm",children:"Small"}),t.jsx(d,{size:"md",children:"Medium"}),t.jsx(d,{size:"lg",children:"Large"}),t.jsx(d,{size:"xl",children:"Extra Large"})]}),parameters:{docs:{description:{story:"Different button sizes available in the design system."}}}},k={args:{children:"Button"},render:()=>t.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"flex-start"},children:t.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[t.jsx(d,{variant:"primary",children:"Primary"}),t.jsx(d,{variant:"secondary",children:"Secondary"}),t.jsx(d,{variant:"ghost",children:"Ghost"}),t.jsx(d,{variant:"destructive",children:"Destructive"}),t.jsx(d,{variant:"gradient",children:"Gradient"})]})}),parameters:{docs:{description:{story:"All available button variants side by side."}}}},G={args:{loading:!0,children:"Loading..."},parameters:{docs:{description:{story:"Button in loading state with spinner animation."}}}},P={args:{disabled:!0,children:"Disabled Button"},parameters:{docs:{description:{story:"Disabled button state."}}}},z={args:{fullWidth:!0,children:"Full Width Button"},parameters:{docs:{description:{story:"Button that takes the full width of its container."}}}},D={args:{size:"icon",variant:"ghost",children:t.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:t.jsx("path",{d:"M6 18L18 6M6 6l12 12"})}),"aria-label":"Close"},parameters:{docs:{description:{story:"Icon-only button. Remember to provide aria-label for accessibility."}}}},A={args:{variant:"gradient",gradient:{startColor:"#ff6b6b",endColor:"#ee5a52"},children:"Custom Gradient"},parameters:{docs:{description:{story:"Basic custom gradient with auto-generated hover states using the new gradient API."}}}},I={args:{variant:"gradient",gradient:{startColor:"#667eea",endColor:"#764ba2",hoverStartColor:"#5a67d8",hoverEndColor:"#553c9a"},children:"Precise Control"},parameters:{docs:{description:{story:"Custom gradient with manually specified hover colors for precise control."}}}},W={args:{children:"Button"},render:()=>{const{presets:e}=H();return t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:"1rem",maxWidth:"600px"},children:[t.jsx(d,{variant:"gradient",gradient:e.sunset,children:"Sunset"}),t.jsx(d,{variant:"gradient",gradient:e.ocean,children:"Ocean"}),t.jsx(d,{variant:"gradient",gradient:e.forest,children:"Forest"}),t.jsx(d,{variant:"gradient",gradient:e.fire,children:"Fire"})]})},parameters:{docs:{description:{story:"Showcase of different gradient presets using the new gradient system."}}}},M={args:{children:"+"},render:()=>{const[e,r]=f.useState(0);return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center"},children:[t.jsxs("div",{children:["Count: ",e]}),t.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[t.jsx(d,{variant:"secondary",onClick:()=>r(e-1),children:"-"}),t.jsx(d,{variant:"primary",onClick:()=>r(e+1),children:"+"})]}),t.jsx(d,{variant:"ghost",onClick:()=>r(0),children:"Reset"})]})},parameters:{docs:{description:{story:"Interactive example showing button click handlers."}}}},R={args:{children:"Button"},render:()=>{const[e,r]=f.useState("#ff6b6b"),[a,n]=f.useState("#ee5a52"),[o,i]=f.useState(135),s=f.useMemo(()=>({startColor:e,endColor:a,direction:o}),[e,a,o]);return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",alignItems:"center",padding:"2rem",border:"1px solid #e2e8f0",borderRadius:"8px",backgroundColor:"#fafafa"},children:[t.jsx("h4",{style:{margin:0,color:"#334155"},children:"🎨 Advanced Gradient Builder"}),t.jsxs("div",{style:{display:"flex",gap:"1rem",alignItems:"center",flexWrap:"wrap"},children:[t.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:["Start Color:",t.jsx("input",{type:"color",value:e,onChange:l=>r(l.target.value)})]}),t.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:["End Color:",t.jsx("input",{type:"color",value:a,onChange:l=>n(l.target.value)})]}),t.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:["Direction:",t.jsx("input",{type:"range",min:"0",max:"360",value:o,onChange:l=>i(Number(l.target.value))}),t.jsxs("span",{style:{minWidth:"40px",fontSize:"0.8rem"},children:[o,"°"]})]})]}),t.jsx(d,{variant:"gradient",gradient:s,size:"lg",children:"Live Preview"}),t.jsxs("div",{style:{fontFamily:"monospace",fontSize:"0.8rem",color:"#64748b",textAlign:"center",background:"#f8fafc",padding:"0.5rem",borderRadius:"4px",border:"1px solid #e2e8f0",maxWidth:"400px"},children:[t.jsx("strong",{children:"New API:"}),t.jsx("br",{}),"gradient={{",t.jsx("br",{}),'  startColor: "',e,'",',t.jsx("br",{}),'  endColor: "',a,'",',t.jsx("br",{}),"  direction: ",o,t.jsx("br",{}),"}}"]})]})},parameters:{docs:{description:{story:"Interactive example showing the new gradient API with real-time customization including direction control."}}}},N={args:{children:"Button"},render:()=>{const e={gradient:{default:{direction:135,stops:[{color:"#667eea",position:0},{color:"#764ba2",position:100}],fallback:"#667eea"},hover:{direction:135,stops:[{color:"#5a67d8",position:0},{color:"#553c9a",position:100}]},active:{direction:135,stops:[{color:"#4c51bf",position:0},{color:"#44337a",position:100}]}}};return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem",alignItems:"center",padding:"2rem"},children:[t.jsxs("div",{children:[t.jsx("h4",{style:{margin:"0 0 1rem 0",color:"#334155"},children:"⚡ Advanced Gradient Configuration"}),t.jsx(d,{variant:"gradient",gradient:e,size:"lg",children:"Hover & Click me!"})]}),t.jsxs("div",{style:{fontFamily:"monospace",fontSize:"0.75rem",color:"#475569",background:"#f8fafc",padding:"1rem",borderRadius:"6px",border:"1px solid #e2e8f0",maxWidth:"500px",lineHeight:1.5},children:[t.jsx("strong",{children:"Full Configuration Example:"}),t.jsx("br",{}),t.jsx("pre",{style:{margin:0,whiteSpace:"pre-wrap"},children:`gradient={{
  gradient: {
    default: {
      direction: 135,
      stops: [
        { color: "#667eea", position: 0 },
        { color: "#764ba2", position: 100 }
      ]
    },
    hover: {
      direction: 135,
      stops: [
        { color: "#5a67d8", position: 0 },
        { color: "#553c9a", position: 100 }
      ]
    },
    active: { /* custom active state */ }
  }
}}`})]})]})},parameters:{docs:{description:{story:"Advanced gradient configuration showing full control over all interaction states with multi-stop gradients."}}}},O={args:{children:"Button"},render:()=>{const{presets:e}=H();return t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"2rem",padding:"2rem"},children:[t.jsx("h4",{style:{margin:0,color:"#334155",textAlign:"center"},children:"🎨 Built-in Gradient Presets"}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:"1rem",maxWidth:"800px",margin:"0 auto"},children:Object.entries(e).map(([r,a])=>t.jsxs("div",{style:{textAlign:"center"},children:[t.jsx(d,{variant:"gradient",gradient:a,size:"sm",style:{marginBottom:"0.5rem"},children:r}),t.jsx("div",{style:{fontSize:"0.75rem",color:"#64748b"},children:r.charAt(0).toUpperCase()+r.slice(1)})]},r))}),t.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b",textAlign:"center",background:"#f8fafc",padding:"1rem",borderRadius:"4px",border:"1px solid #e2e8f0",maxWidth:"600px",margin:"0 auto"},children:[t.jsx("strong",{children:"Usage:"})," Import presets with"," ",t.jsx("code",{children:"useGradientPresets()"})," hook",t.jsx("br",{}),t.jsx("code",{children:"const { presets } = useGradientPresets();"}),t.jsx("br",{}),t.jsx("code",{children:"<Button gradient={presets.sunset} />"})]})]})},parameters:{docs:{description:{story:"Gallery of all built-in gradient presets available in the design system."}}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Button"
  }
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    children: "Primary Button"
  }
}`,...b.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "secondary",
    children: "Secondary Button"
  }
}`,...C.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "ghost",
    children: "Ghost Button"
  }
}`,...B.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "destructive",
    children: "Delete Item"
  }
}`,...j.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "gradient",
    children: "Gradient Button",
    size: "xl"
  }
}`,...S.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Button"
  },
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap"
  }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "Different button sizes available in the design system."
      }
    }
  }
}`,...w.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Button"
  },
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "flex-start"
  }}>
      <div style={{
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap"
    }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="gradient">Gradient</Button>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: "All available button variants side by side."
      }
    }
  }
}`,...k.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: "Loading..."
  },
  parameters: {
    docs: {
      description: {
        story: "Button in loading state with spinner animation."
      }
    }
  }
}`,...G.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: "Disabled Button"
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled button state."
      }
    }
  }
}`,...P.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    children: "Full Width Button"
  },
  parameters: {
    docs: {
      description: {
        story: "Button that takes the full width of its container."
      }
    }
  }
}`,...z.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    size: "icon",
    variant: "ghost",
    children: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>,
    "aria-label": "Close"
  },
  parameters: {
    docs: {
      description: {
        story: "Icon-only button. Remember to provide aria-label for accessibility."
      }
    }
  }
}`,...D.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "gradient",
    gradient: {
      startColor: "#ff6b6b",
      endColor: "#ee5a52"
    },
    children: "Custom Gradient"
  },
  parameters: {
    docs: {
      description: {
        story: "Basic custom gradient with auto-generated hover states using the new gradient API."
      }
    }
  }
}`,...A.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "gradient",
    gradient: {
      startColor: "#667eea",
      endColor: "#764ba2",
      hoverStartColor: "#5a67d8",
      hoverEndColor: "#553c9a"
    },
    children: "Precise Control"
  },
  parameters: {
    docs: {
      description: {
        story: "Custom gradient with manually specified hover colors for precise control."
      }
    }
  }
}`,...I.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Button"
  },
  render: () => {
    const {
      presets
    } = useGradientPresets();
    return <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "1rem",
      maxWidth: "600px"
    }}>
        <Button variant="gradient" gradient={presets.sunset}>
          Sunset
        </Button>
        <Button variant="gradient" gradient={presets.ocean}>
          Ocean
        </Button>
        <Button variant="gradient" gradient={presets.forest}>
          Forest
        </Button>
        <Button variant="gradient" gradient={presets.fire}>
          Fire
        </Button>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "Showcase of different gradient presets using the new gradient system."
      }
    }
  }
}`,...W.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    children: "+"
  },
  render: () => {
    const [count, setCount] = React.useState(0);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      alignItems: "center"
    }}>
        <div>Count: {count}</div>
        <div style={{
        display: "flex",
        gap: "0.5rem"
      }}>
          <Button variant="secondary" onClick={() => setCount(count - 1)}>
            -
          </Button>
          <Button variant="primary" onClick={() => setCount(count + 1)}>
            +
          </Button>
        </div>
        <Button variant="ghost" onClick={() => setCount(0)}>
          Reset
        </Button>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example showing button click handlers."
      }
    }
  }
}`,...M.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Button"
  },
  render: () => {
    const [startColor, setStartColor] = React.useState("#ff6b6b");
    const [endColor, setEndColor] = React.useState("#ee5a52");
    const [direction, setDirection] = React.useState<number>(135);
    const gradientConfig = React.useMemo(() => ({
      startColor,
      endColor,
      direction
    }), [startColor, endColor, direction]);
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      alignItems: "center",
      padding: "2rem",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      backgroundColor: "#fafafa"
    }}>
        <h4 style={{
        margin: 0,
        color: "#334155"
      }}>
          🎨 Advanced Gradient Builder
        </h4>
        <div style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        flexWrap: "wrap"
      }}>
          <label style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
            Start Color:
            <input type="color" value={startColor} onChange={e => setStartColor(e.target.value)} />
          </label>
          <label style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
            End Color:
            <input type="color" value={endColor} onChange={e => setEndColor(e.target.value)} />
          </label>
          <label style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
            Direction:
            <input type="range" min="0" max="360" value={direction} onChange={e => setDirection(Number(e.target.value))} />
            <span style={{
            minWidth: "40px",
            fontSize: "0.8rem"
          }}>
              {direction}°
            </span>
          </label>
        </div>
        <Button variant="gradient" gradient={gradientConfig} size="lg">
          Live Preview
        </Button>
        <div style={{
        fontFamily: "monospace",
        fontSize: "0.8rem",
        color: "#64748b",
        textAlign: "center",
        background: "#f8fafc",
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #e2e8f0",
        maxWidth: "400px"
      }}>
          <strong>New API:</strong>
          <br />
          gradient=&#123;&#123;
          <br />
          &nbsp;&nbsp;startColor: &quot;{startColor}&quot;,
          <br />
          &nbsp;&nbsp;endColor: &quot;{endColor}&quot;,
          <br />
          &nbsp;&nbsp;direction: {direction}
          <br />
          &#125;&#125;
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example showing the new gradient API with real-time customization including direction control."
      }
    }
  }
}`,...R.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Button"
  },
  render: () => {
    // Example of advanced gradient with full state control
    const advancedGradient = {
      gradient: {
        default: {
          direction: 135,
          stops: [{
            color: "#667eea",
            position: 0
          }, {
            color: "#764ba2",
            position: 100
          }],
          fallback: "#667eea"
        },
        hover: {
          direction: 135,
          stops: [{
            color: "#5a67d8",
            position: 0
          }, {
            color: "#553c9a",
            position: 100
          }]
        },
        active: {
          direction: 135,
          stops: [{
            color: "#4c51bf",
            position: 0
          }, {
            color: "#44337a",
            position: 100
          }]
        }
      }
    };
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      alignItems: "center",
      padding: "2rem"
    }}>
        <div>
          <h4 style={{
          margin: "0 0 1rem 0",
          color: "#334155"
        }}>
            ⚡ Advanced Gradient Configuration
          </h4>
          <Button variant="gradient" gradient={advancedGradient} size="lg">
            Hover & Click me!
          </Button>
        </div>

        <div style={{
        fontFamily: "monospace",
        fontSize: "0.75rem",
        color: "#475569",
        background: "#f8fafc",
        padding: "1rem",
        borderRadius: "6px",
        border: "1px solid #e2e8f0",
        maxWidth: "500px",
        lineHeight: 1.5
      }}>
          <strong>Full Configuration Example:</strong>
          <br />
          <pre style={{
          margin: 0,
          whiteSpace: "pre-wrap"
        }}>
            {\`gradient={{
  gradient: {
    default: {
      direction: 135,
      stops: [
        { color: "#667eea", position: 0 },
        { color: "#764ba2", position: 100 }
      ]
    },
    hover: {
      direction: 135,
      stops: [
        { color: "#5a67d8", position: 0 },
        { color: "#553c9a", position: 100 }
      ]
    },
    active: { /* custom active state */ }
  }
}}\`}
          </pre>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "Advanced gradient configuration showing full control over all interaction states with multi-stop gradients."
      }
    }
  }
}`,...N.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Button"
  },
  render: () => {
    const {
      presets
    } = useGradientPresets();
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      padding: "2rem"
    }}>
        <h4 style={{
        margin: 0,
        color: "#334155",
        textAlign: "center"
      }}>
          🎨 Built-in Gradient Presets
        </h4>

        <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "1rem",
        maxWidth: "800px",
        margin: "0 auto"
      }}>
          {Object.entries(presets).map(([name, preset]) => <div key={name} style={{
          textAlign: "center"
        }}>
              <Button variant="gradient" gradient={preset} size="sm" style={{
            marginBottom: "0.5rem"
          }}>
                {name}
              </Button>
              <div style={{
            fontSize: "0.75rem",
            color: "#64748b"
          }}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </div>
            </div>)}
        </div>

        <div style={{
        fontSize: "0.8rem",
        color: "#64748b",
        textAlign: "center",
        background: "#f8fafc",
        padding: "1rem",
        borderRadius: "4px",
        border: "1px solid #e2e8f0",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
          <strong>Usage:</strong> Import presets with{" "}
          <code>useGradientPresets()</code> hook
          <br />
          <code>const &#123; presets &#125; = useGradientPresets();</code>
          <br />
          <code>&lt;Button gradient=&#123;presets.sunset&#125; /&gt;</code>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: "Gallery of all built-in gradient presets available in the design system."
      }
    }
  }
}`,...O.parameters?.docs?.source}}};const ve=["Default","Primary","Secondary","Ghost","Destructive","Gradient","Sizes","AllVariants","Loading","Disabled","FullWidth","IconButton","CustomGradientBasic","CustomGradientWithHover","CustomGradientShowcase","Interactive","InteractiveGradientPicker","AdvancedGradientConfiguration","GradientPresetsGallery"];export{N as AdvancedGradientConfiguration,k as AllVariants,A as CustomGradientBasic,W as CustomGradientShowcase,I as CustomGradientWithHover,x as Default,j as Destructive,P as Disabled,z as FullWidth,B as Ghost,S as Gradient,O as GradientPresetsGallery,D as IconButton,M as Interactive,R as InteractiveGradientPicker,G as Loading,b as Primary,C as Secondary,w as Sizes,ve as __namedExportsOrder,he as default};
