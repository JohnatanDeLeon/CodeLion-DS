import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{R as v}from"./iframe-LJxsNaI9.js";import{r as M,s as S,o as j,n as R,e as C,t as E,u as I}from"./input.css-zOi6gH-E.js";import{c as L,a as p}from"./cn-C-2-UxfX.js";import"./preload-helper-CmsKOCeN.js";var W=L({defaultClassName:"_16u65rv1 _16u65rv0 cm2x1x2",variantClassNames:{size:{sm:"_16u65rv2",md:"_16u65rv3",lg:"_16u65rv4"},state:{default:"_16u65rv5",error:"_16u65rv6 cm2x1xe"},fullWidth:{false:"_16u65rv7",true:"_16u65rv8"}},defaultVariants:{size:"md",state:"default",fullWidth:!1},compoundVariants:[]});const r=v.forwardRef(({label:a,helperText:x,errorMessage:b,state:f="default",size:y="md",fullWidth:h=!1,required:u=!1,containerClassName:q,className:_,id:V,rows:z=4,...T},w)=>{const N=v.useId(),c=V??N,g=`${c}-helper`,s=f==="error",m=s?b:x;return e.jsxs("div",{className:p(I,h&&E,q),children:[a&&e.jsx("label",{htmlFor:c,className:p(C,u&&R,s&&j),children:a}),e.jsx("textarea",{ref:w,id:c,rows:z,required:u,"aria-required":u||void 0,"aria-invalid":s||void 0,"aria-describedby":m?g:void 0,className:p(W({size:y,state:f,fullWidth:h}),_),...T}),m&&e.jsx("div",{id:g,className:s?M:S,role:s?"alert":void 0,children:m})]})});r.displayName="Textarea";try{r.displayName="Textarea",r.__docgenInfo={description:`Multi-line text field with the same anatomy as Input: label, field and a
message that is announced when it is an error.`,displayName:"Textarea",props:{label:{defaultValue:null,description:"Visible label, associated with the field.",name:"label",required:!1,type:{name:"string"}},helperText:{defaultValue:null,description:"Hint shown under the field while there is no error.",name:"helperText",required:!1,type:{name:"string"}},errorMessage:{defaultValue:null,description:'Message shown under the field when `state` is "error".',name:"errorMessage",required:!1,type:{name:"string"}},state:{defaultValue:{value:"default"},description:'Validation state. "error" marks the field invalid for assistive tech.',name:"state",required:!1,type:{name:"enum",value:[{value:'"error"'},{value:'"default"'}]}},size:{defaultValue:{value:"md"},description:"Padding and font size, matching the Input sizes.",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},fullWidth:{defaultValue:{value:"false"},description:"Stretch to the width of the container.",name:"fullWidth",required:!1,type:{name:"boolean"}},required:{defaultValue:{value:"false"},description:"Marks the field as required, visually and for assistive tech.",name:"required",required:!1,type:{name:"boolean"}},containerClassName:{defaultValue:null,description:"Class for the outer container.",name:"containerClassName",required:!1,type:{name:"string"}}}}}catch{}const O={title:"Components/Textarea",component:r,parameters:{layout:"centered",docs:{description:{component:"Multi-line text field with the same anatomy and styles as Input: label, field, and a helper or error message linked with aria-describedby."}}},argTypes:{size:{control:"select",options:["sm","md","lg"]},state:{control:"select",options:["default","error"]},required:{control:"boolean"},fullWidth:{control:"boolean"},disabled:{control:"boolean"}},args:{label:"Descripción",name:"description",placeholder:"Qué es, para quién, en qué se diferencia"},tags:["autodocs"]},t={},l={args:{helperText:"Hasta 500 caracteres."}},i={args:{state:"error",errorMessage:"La descripción admite hasta 500 caracteres",defaultValue:"Un texto que se pasó del límite…"}},n={args:{required:!0}},o={render:a=>e.jsxs("div",{style:{display:"grid",gap:"1.5rem",width:"24rem"},children:[e.jsx(r,{...a,size:"sm",label:"Small"}),e.jsx(r,{...a,size:"md",label:"Medium"}),e.jsx(r,{...a,size:"lg",label:"Large"})]})},d={args:{disabled:!0,defaultValue:"No editable"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    helperText: "Hasta 500 caracteres."
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    state: "error",
    errorMessage: "La descripción admite hasta 500 caracteres",
    defaultValue: "Un texto que se pasó del límite…"
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    required: true
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: "grid",
    gap: "1.5rem",
    width: "24rem"
  }}>
      <Textarea {...args} size="sm" label="Small" />
      <Textarea {...args} size="md" label="Medium" />
      <Textarea {...args} size="lg" label="Large" />
    </div>
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: "No editable"
  }
}`,...d.parameters?.docs?.source}}};const P=["Default","WithHelperText","Error","Required","Sizes","Disabled"];export{t as Default,d as Disabled,i as Error,n as Required,o as Sizes,l as WithHelperText,P as __namedExportsOrder,O as default};
