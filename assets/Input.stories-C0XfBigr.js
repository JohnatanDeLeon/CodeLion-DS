import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{R as o}from"./iframe-DQWWel9s.js";import{g as C,u as M}from"./index-CcgoTVS6.js";import{I as a}from"./Input-DvD-SK2Q.js";import"./preload-helper-CmsKOCeN.js";import"./cn-C-2-UxfX.js";const B={title:"Components/Input",component:a,tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:[void 0,"search","password"]},size:{control:{type:"select"},options:["sm","md","lg","xl"]},state:{control:{type:"select"},options:["default","error","success","warning"]},fullWidth:{control:"boolean"},required:{control:"boolean"},disabled:{control:"boolean"},loading:{control:"boolean"},iconPosition:{control:{type:"select"},options:["left","right"]},type:{control:{type:"select"},options:["text","password","number","tel","url"]},label:{control:"text"},placeholder:{control:"text"},helperText:{control:"text"},errorMessage:{control:"text"},successMessage:{control:"text"},warningMessage:{control:"text"},className:{control:"text"},onChange:{action:"changed"},onFocus:{action:"focused"},onBlur:{action:"blurred"}},args:{size:"lg",state:"default",fullWidth:!1,required:!1,disabled:!1,loading:!1,iconPosition:"right",type:"text",label:"Label",placeholder:"Enter text..."}},c={args:{label:"Default Input",placeholder:"Enter text..."},play:async({canvasElement:r})=>{const t=await C(r).getByLabelText(/default input/i);await M.click(t),await M.type(t,"Hello World")}},p={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(a,{label:"Default Input (no variant)",placeholder:"Enter text..."}),e.jsx(a,{variant:"search",label:"Search Variant",placeholder:"Search..."})]})},u={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(a,{variant:"search",label:"Search with Default Size",placeholder:"Search users...",size:"lg"}),e.jsx(a,{variant:"search",label:"Small Search Input",placeholder:"Search...",size:"sm"}),e.jsx(a,{variant:"search",label:"Medium Search Input",placeholder:"Search products...",size:"md"}),e.jsx(a,{variant:"search",label:"Large Search Input",placeholder:"Search documents...",size:"xl"}),e.jsx(a,{variant:"search",label:"Search with Custom Right Icon",placeholder:"Search with filter...",iconPosition:"right",icon:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"})})})]})},h={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(a,{size:"sm",label:"Small (sm)",placeholder:"Enter text..."}),e.jsx(a,{size:"md",label:"Medium (md)",placeholder:"Enter text..."}),e.jsx(a,{size:"lg",label:"Large (lg)",placeholder:"Enter text..."}),e.jsx(a,{size:"xl",label:"Extra Large (xl)",placeholder:"Enter text..."})]})},g={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(a,{state:"default",label:"Default State",helperText:"This is helper text",placeholder:"Enter text..."}),e.jsx(a,{state:"error",label:"Error State",errorMessage:"This field has an error",placeholder:"Enter text..."}),e.jsx(a,{state:"success",label:"Success State",successMessage:"This field is valid",placeholder:"Enter text..."}),e.jsx(a,{state:"warning",label:"Warning State",warningMessage:"This field has a warning",placeholder:"Enter text..."})]})},m={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(a,{label:"Left Icon",iconPosition:"left",placeholder:"Enter text...",icon:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"m21 21-4.35-4.35"})]})}),e.jsx(a,{label:"Right Icon",iconPosition:"right",placeholder:"Enter text...",icon:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}),e.jsx("rect",{x:"8",y:"2",width:"8",height:"4",rx:"1",ry:"1"})]})})]})},x={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(a,{loading:!0,label:"Loading State",placeholder:"Enter text..."}),e.jsx(a,{disabled:!0,label:"Disabled State",placeholder:"Enter text..."}),e.jsx(a,{loading:!0,iconPosition:"left",label:"Loading with Left Position",placeholder:"Enter text..."})]})},w={render:()=>e.jsx("div",{style:{width:"100%",maxWidth:400},children:e.jsx(a,{fullWidth:!0,label:"Full Width Input",placeholder:"This input takes full width"})})},f={args:{required:!0,label:"Required Field",placeholder:"This field is required"},play:async({canvasElement:r})=>{(await C(r).getByLabelText(/required field/i)).focus()}},v={render:()=>{const[r,s]=o.useState(""),[t,n]=o.useState("");return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(a,{label:"Phone Number",placeholder:"Enter phone number",mask:{id:"phone"},value:r,onValueChange:({formatted:l})=>s(l)}),e.jsx(a,{label:"Currency Amount",placeholder:"Enter amount",mask:{id:"currency"},value:t,onValueChange:({formatted:l})=>n(l)})]})}},y={render:r=>{const[s,t]=o.useState("none"),[n,l]=o.useState(""),[I,d]=o.useState(""),i=j=>{t(j.target.value),l(""),d("")},k=()=>{if(s!=="none")return{id:s}},V=({raw:j,formatted:D})=>{l(D),d(j)};return e.jsxs("div",{style:{display:"flex",gap:24,alignItems:"flex-start"},children:[e.jsxs("div",{style:{minWidth:320},children:[e.jsx("h4",{children:"Mask Playground"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("label",{children:["Select Mask Type",e.jsxs("select",{value:s,onChange:i,style:{width:"100%",marginTop:6,padding:8},children:[e.jsx("option",{value:"none",children:"No Mask"}),e.jsx("option",{value:"phone",children:"Phone"}),e.jsx("option",{value:"currency",children:"Currency"})]})]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Current Values:"}),e.jsxs("div",{style:{marginTop:8,fontSize:"0.875rem"},children:[e.jsxs("div",{children:[e.jsx("strong",{children:"Formatted:"})," ",n||"(empty)"]}),e.jsxs("div",{children:[e.jsx("strong",{children:"Raw:"})," ",I||"(empty)"]})]})]})]})]}),e.jsx("div",{style:{flex:1},children:e.jsx(a,{...r,label:`Input with ${s==="none"?"No":s.charAt(0).toUpperCase()+s.slice(1)} Mask`,placeholder:s==="phone"?"Enter phone number":s==="currency"?"Enter amount":"Enter text",mask:k(),value:n,onValueChange:V})})]})}},b={render:r=>{const[s,t]=o.useState(""),[n,l]=o.useState(""),I=()=>s?s.length<8?"error":s.length<12?"warning":"success":"default",d=()=>n?n===s?"success":"error":"default";return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:400},children:[e.jsx(a,{...r,type:"password",label:"Password",placeholder:"Enter your password",value:s,onChange:i=>t(i.target.value),state:I(),errorMessage:"Password must be at least 8 characters",warningMessage:"Consider using a longer password for better security",successMessage:"Password strength is good"}),e.jsx(a,{...r,type:"password",label:"Confirm Password",placeholder:"Confirm your password",value:n,onChange:i=>l(i.target.value),state:d(),errorMessage:"Passwords do not match",successMessage:"Passwords match"})]})}},S={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(a,{variant:"password",label:"Small Password Input",placeholder:"Enter password",size:"sm"}),e.jsx(a,{variant:"password",label:"Medium Password Input",placeholder:"Enter password",size:"md"}),e.jsx(a,{variant:"password",label:"Large Password Input",placeholder:"Enter password",size:"lg"}),e.jsx(a,{variant:"password",label:"Extra Large Password Input",placeholder:"Enter password",size:"xl"})]})},E={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsx(a,{variant:"password",label:"Default Password",placeholder:"Enter password",state:"default"}),e.jsx(a,{variant:"password",label:"Error Password",placeholder:"Enter password",state:"error",errorMessage:"Password is required"}),e.jsx(a,{variant:"password",label:"Success Password",placeholder:"Enter password",state:"success",successMessage:"Password is valid"}),e.jsx(a,{variant:"password",label:"Warning Password",placeholder:"Enter password",state:"warning",warningMessage:"Consider using a stronger password"}),e.jsx(a,{variant:"password",label:"Disabled Password",placeholder:"Enter password",disabled:!0})]})},P={};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Default Input",
    placeholder: "Enter text..."
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByLabelText(/default input/i);
    await userEvent.click(input);
    await userEvent.type(input, "Hello World");
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>
      <Input label="Default Input (no variant)" placeholder="Enter text..." />
      <Input variant="search" label="Search Variant" placeholder="Search..." />
    </div>
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>
      <Input variant="search" label="Search with Default Size" placeholder="Search users..." size="lg" />
      <Input variant="search" label="Small Search Input" placeholder="Search..." size="sm" />
      <Input variant="search" label="Medium Search Input" placeholder="Search products..." size="md" />
      <Input variant="search" label="Large Search Input" placeholder="Search documents..." size="xl" />
      <Input variant="search" label="Search with Custom Right Icon" placeholder="Search with filter..." iconPosition="right" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>} />
    </div>
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>
      <Input size="sm" label="Small (sm)" placeholder="Enter text..." />
      <Input size="md" label="Medium (md)" placeholder="Enter text..." />
      <Input size="lg" label="Large (lg)" placeholder="Enter text..." />
      <Input size="xl" label="Extra Large (xl)" placeholder="Enter text..." />
    </div>
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>
      <Input state="default" label="Default State" helperText="This is helper text" placeholder="Enter text..." />
      <Input state="error" label="Error State" errorMessage="This field has an error" placeholder="Enter text..." />
      <Input state="success" label="Success State" successMessage="This field is valid" placeholder="Enter text..." />
      <Input state="warning" label="Warning State" warningMessage="This field has a warning" placeholder="Enter text..." />
    </div>
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>
      <Input label="Left Icon" iconPosition="left" placeholder="Enter text..." icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>} />
      <Input label="Right Icon" iconPosition="right" placeholder="Enter text..." icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>} />
    </div>
}`,...m.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>
      <Input loading label="Loading State" placeholder="Enter text..." />
      <Input disabled label="Disabled State" placeholder="Enter text..." />
      <Input loading iconPosition="left" label="Loading with Left Position" placeholder="Enter text..." />
    </div>
}`,...x.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: "100%",
    maxWidth: 400
  }}>
      <Input fullWidth label="Full Width Input" placeholder="This input takes full width" />
    </div>
}`,...w.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    required: true,
    label: "Required Field",
    placeholder: "This field is required"
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByLabelText(/required field/i);
    input.focus();
  }
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [phoneValue, setPhoneValue] = React.useState("");
    const [currencyValue, setCurrencyValue] = React.useState("");
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 16
    }}>
        <Input label="Phone Number" placeholder="Enter phone number" mask={{
        id: "phone"
      }} value={phoneValue} onValueChange={({
        formatted
      }) => setPhoneValue(formatted)} />
        <Input label="Currency Amount" placeholder="Enter amount" mask={{
        id: "currency"
      }} value={currencyValue} onValueChange={({
        formatted
      }) => setCurrencyValue(formatted)} />
      </div>;
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [selectedMask, setSelectedMask] = React.useState<string>("none");
    const [inputValue, setInputValue] = React.useState("");
    const [rawValue, setRawValue] = React.useState("");
    const handleMaskChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedMask(event.target.value);
      setInputValue("");
      setRawValue("");
    };
    const getMaskConfig = () => {
      if (selectedMask === "none") return undefined;
      return {
        id: selectedMask
      };
    };
    const handleValueChange = ({
      raw,
      formatted
    }: {
      raw: string;
      formatted: string;
    }) => {
      setInputValue(formatted);
      setRawValue(raw);
    };
    return <div style={{
      display: "flex",
      gap: 24,
      alignItems: "flex-start"
    }}>
        <div style={{
        minWidth: 320
      }}>
          <h4>Mask Playground</h4>
          <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12
        }}>
            <label>
              Select Mask Type
              <select value={selectedMask} onChange={handleMaskChange} style={{
              width: "100%",
              marginTop: 6,
              padding: 8
            }}>
                <option value="none">No Mask</option>
                <option value="phone">Phone</option>
                <option value="currency">Currency</option>
              </select>
            </label>

            <div>
              <strong>Current Values:</strong>
              <div style={{
              marginTop: 8,
              fontSize: "0.875rem"
            }}>
                <div>
                  <strong>Formatted:</strong> {inputValue || "(empty)"}
                </div>
                <div>
                  <strong>Raw:</strong> {rawValue || "(empty)"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{
        flex: 1
      }}>
          <Input {...args} label={\`Input with \${selectedMask === "none" ? "No" : selectedMask.charAt(0).toUpperCase() + selectedMask.slice(1)} Mask\`} placeholder={selectedMask === "phone" ? "Enter phone number" : selectedMask === "currency" ? "Enter amount" : "Enter text"} mask={getMaskConfig()} value={inputValue} onValueChange={handleValueChange} />
        </div>
      </div>;
  }
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const getPasswordState = () => {
      if (!password) return "default";
      if (password.length < 8) return "error";
      if (password.length < 12) return "warning";
      return "success";
    };
    const getConfirmPasswordState = () => {
      if (!confirmPassword) return "default";
      return confirmPassword === password ? "success" : "error";
    };
    return <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
      maxWidth: 400
    }}>
        <Input {...args} type="password" label="Password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} state={getPasswordState()} errorMessage="Password must be at least 8 characters" warningMessage="Consider using a longer password for better security" successMessage="Password strength is good" />

        <Input {...args} type="password" label="Confirm Password" placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} state={getConfirmPasswordState()} errorMessage="Passwords do not match" successMessage="Passwords match" />
      </div>;
  }
}`,...b.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>
      <Input variant="password" label="Small Password Input" placeholder="Enter password" size="sm" />
      <Input variant="password" label="Medium Password Input" placeholder="Enter password" size="md" />
      <Input variant="password" label="Large Password Input" placeholder="Enter password" size="lg" />
      <Input variant="password" label="Extra Large Password Input" placeholder="Enter password" size="xl" />
    </div>
}`,...S.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: 16
  }}>
      <Input variant="password" label="Default Password" placeholder="Enter password" state="default" />
      <Input variant="password" label="Error Password" placeholder="Enter password" state="error" errorMessage="Password is required" />
      <Input variant="password" label="Success Password" placeholder="Enter password" state="success" successMessage="Password is valid" />
      <Input variant="password" label="Warning Password" placeholder="Enter password" state="warning" warningMessage="Consider using a stronger password" />
      <Input variant="password" label="Disabled Password" placeholder="Enter password" disabled />
    </div>
}`,...E.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:"{}",...P.parameters?.docs?.source}}};const F=["Default","Variants","SearchInputs","Sizes","States","WithIcons","LoadingAndDisabled","FullWidth","Required","WithMasks","MaskPlayground","ValidationShowcase","PasswordVariant","PasswordStates","Playground"];export{c as Default,w as FullWidth,x as LoadingAndDisabled,y as MaskPlayground,E as PasswordStates,S as PasswordVariant,P as Playground,f as Required,u as SearchInputs,h as Sizes,g as States,b as ValidationShowcase,p as Variants,m as WithIcons,v as WithMasks,F as __namedExportsOrder,B as default};
