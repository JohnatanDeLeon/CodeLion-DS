import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{R as a}from"./iframe-Ce8_XGRD.js";import{g as C,u as I}from"./index-BiBvD3WW.js";import{B as t,u as w}from"./Button-B-nr2Nj5.js";import{g as R}from"./colors.css-B7vlNNx7.js";import"./preload-helper-CmsKOCeN.js";import"./cn-C-2-UxfX.js";const X={title:"Components/Button",component:t,tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["primary","secondary","ghost","destructive","gradient"]},size:{control:{type:"select"},options:["sm","md","lg","xl","icon"]},fullWidth:{control:"boolean"},loading:{control:"boolean"},disabled:{control:"boolean"},className:{control:"text"},gradient:{control:"object"},children:{control:"text"},onClick:{action:"clicked"}},args:{variant:"primary",size:"md",fullWidth:!1,loading:!1,disabled:!1,children:"Button"}},c={args:{variant:"primary",children:"Primary"},play:async({canvasElement:n})=>{const o=await C(n).getByRole("button",{name:/primary/i});await I.click(o)}},u={render:n=>e.jsxs("div",{style:{display:"flex",gap:12},children:[e.jsx(t,{...n,variant:"primary",children:"Primary"}),e.jsx(t,{...n,variant:"secondary",children:"Secondary"}),e.jsx(t,{...n,variant:"ghost",children:"Ghost"}),e.jsx(t,{...n,variant:"destructive",children:"Destructive"}),e.jsx(t,{...n,variant:"gradient",children:"Gradient"})]})},p={render:n=>e.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[e.jsx(t,{...n,size:"sm",children:"SM"}),e.jsx(t,{...n,size:"md",children:"MD"}),e.jsx(t,{...n,size:"lg",children:"LG"}),e.jsx(t,{...n,size:"xl",children:"XL"}),e.jsx(t,{...n,size:"icon","aria-label":"icon-button",children:e.jsx("span",{"aria-hidden":!0,children:"×"})})]})},m={render:n=>e.jsxs("div",{style:{display:"flex",gap:12},children:[e.jsx(t,{...n,loading:!0,children:"Loading"}),e.jsx(t,{...n,disabled:!0,children:"Disabled"})]})},g={args:{fullWidth:!0,children:"Full width"},render:n=>e.jsx("div",{style:{width:320},children:e.jsx(t,{...n})})},h={args:{size:"icon",children:e.jsx("span",{"aria-hidden":!0,children:"×"}),"aria-label":"Close"},play:async({canvasElement:n})=>{(await C(n).getByRole("button",{name:/close/i})).focus()}},y={args:{variant:"gradient",gradient:{startColor:"#ff6b6b",endColor:"#ee5a52",direction:45},children:"Custom Gradient"}},v={render:n=>{const{presets:s}=w();return e.jsxs("div",{style:{display:"flex",gap:16,flexDirection:"column"},children:[e.jsxs("div",{style:{display:"flex",gap:12},children:[e.jsx(t,{...n,variant:"gradient",children:"Default Gradient"}),e.jsx(t,{...n,variant:"gradient",style:{background:R.primary},children:"Token Gradient"}),e.jsx(t,{...n,variant:"gradient",gradient:s.primary,children:"Preset Gradient"})]}),e.jsx("div",{children:e.jsxs("small",{children:["Notes: default variant uses button recipe; presets come from"," ",e.jsx("code",{children:"useGradientPresets()"}),"."]})})]})}};function W({args:n}){const{presets:s}=w(),o=Object.keys(s),[i,P]=a.useState("preset"),[f,D]=a.useState("primary"),[b,z]=a.useState("#ff6b6b"),[B,E]=a.useState("#ee5a52"),[S,T]=a.useState(135),[l,k]=a.useState(void 0),[d,L]=a.useState(void 0),G=a.useMemo(()=>{if(i==="preset")return s[f];const r={startColor:b,endColor:B,direction:S};return l&&(r.hoverStartColor=l),d&&(r.hoverEndColor=d),r},[i,f,s,b,B,S,l,d]);return e.jsxs("div",{style:{display:"flex",gap:18,alignItems:"flex-start"},children:[e.jsxs("div",{style:{minWidth:320},children:[e.jsx("h4",{children:"Gradient Playground"}),e.jsxs("div",{style:{display:"flex",gap:8,marginBottom:8},children:[e.jsxs("label",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("input",{type:"radio",name:"mode",checked:i==="preset",onChange:()=>P("preset")}),"Preset"]}),e.jsxs("label",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("input",{type:"radio",name:"mode",checked:i==="custom",onChange:()=>P("custom")}),"Custom"]})]}),i==="preset"?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:e.jsxs("label",{children:["Preset",e.jsx("select",{value:f,onChange:r=>D(r.target.value),style:{width:"100%",marginTop:6},children:o.map(r=>e.jsx("option",{value:r,children:r},r))})]})}):e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsxs("label",{children:["Start color",e.jsx("input",{"aria-label":"start-color",type:"color",value:b,onChange:r=>z(r.target.value),style:{width:"100%",height:36,marginTop:6}})]}),e.jsxs("label",{children:["End color",e.jsx("input",{"aria-label":"end-color",type:"color",value:B,onChange:r=>E(r.target.value),style:{width:"100%",height:36,marginTop:6}})]}),e.jsxs("label",{children:["Direction (deg)",e.jsx("input",{"aria-label":"direction",type:"number",value:S,onChange:r=>T(Number(r.target.value)),style:{width:"100%",marginTop:6}})]}),e.jsxs("label",{children:["Hover start color (optional)",e.jsx("input",{"aria-label":"hover-start",type:"color",value:l||"#000000",onChange:r=>k(r.target.value),style:{width:"100%",height:36,marginTop:6}})]}),e.jsxs("label",{children:["Hover end color (optional)",e.jsx("input",{"aria-label":"hover-end",type:"color",value:d||"#000000",onChange:r=>L(r.target.value),style:{width:"100%",height:36,marginTop:6}})]})]}),e.jsxs("div",{style:{marginTop:12},children:[e.jsx("strong",{children:"Preview props"}),e.jsx("pre",{style:{whiteSpace:"pre-wrap",marginTop:6},children:JSON.stringify(G,null,2)})]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-start"},children:[e.jsx("div",{children:e.jsx(t,{...n,variant:"gradient",gradient:G,children:"Live Gradient"})}),e.jsx("div",{children:e.jsx("small",{children:"Tip: use the Preset mode to test common palettes, or Custom to craft colors and direction."})})]})]})}const x={render:n=>e.jsx(W,{args:n})},j={};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "primary",
    children: "Primary"
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.getByRole("button", {
      name: /primary/i
    });
    await userEvent.click(btn);
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: "flex",
    gap: 12
  }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="gradient">
        Gradient
      </Button>
    </div>
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: "flex",
    gap: 12,
    alignItems: "center"
  }}>
      <Button {...args} size="sm">
        SM
      </Button>
      <Button {...args} size="md">
        MD
      </Button>
      <Button {...args} size="lg">
        LG
      </Button>
      <Button {...args} size="xl">
        XL
      </Button>
      <Button {...args} size="icon" aria-label="icon-button">
        <span aria-hidden>×</span>
      </Button>
    </div>
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: "flex",
    gap: 12
  }}>
      <Button {...args} loading>
        Loading
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
    </div>
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    children: "Full width"
  },
  render: args => <div style={{
    width: 320
  }}>
      <Button {...args} />
    </div>
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    size: "icon",
    children: <span aria-hidden>×</span>,
    "aria-label": "Close"
  } as any,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.getByRole("button", {
      name: /close/i
    });
    btn.focus();
  }
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "gradient",
    gradient: {
      startColor: "#ff6b6b",
      endColor: "#ee5a52",
      direction: 45
    },
    children: "Custom Gradient"
  }
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => {
    const {
      presets
    } = useGradientPresets();
    return <div style={{
      display: "flex",
      gap: 16,
      flexDirection: "column"
    }}>
        <div style={{
        display: "flex",
        gap: 12
      }}>
          {/* Default variant gradient */}
          <Button {...args} variant="gradient">
            Default Gradient
          </Button>

          {/* Tokenized gradient via inline style using tokens.gradients.primary */}
          <Button {...args} variant="gradient" style={{
          background: gradients.primary
        }}>
            Token Gradient
          </Button>

          {/* Preset from useGradientPresets (passed as gradient prop) */}
          <Button {...args} variant="gradient" gradient={presets.primary}>
            Preset Gradient
          </Button>
        </div>
        <div>
          <small>
            Notes: default variant uses button recipe; presets come from{" "}
            <code>useGradientPresets()</code>.
          </small>
        </div>
      </div>;
  }
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <GradientPlaygroundPanel args={args} />
}`,...x.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:"{}",...j.parameters?.docs?.source}}};const _=["Primary","Variants","Sizes","LoadingAndDisabled","FullWidth","IconOnly","GradientCustom","GradientShowcase","AdvancedGradientPlayground","Playground"];export{x as AdvancedGradientPlayground,g as FullWidth,y as GradientCustom,v as GradientShowcase,h as IconOnly,m as LoadingAndDisabled,j as Playground,c as Primary,p as Sizes,u as Variants,_ as __namedExportsOrder,X as default};
