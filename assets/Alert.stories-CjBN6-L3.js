import{j as r}from"./jsx-runtime-BjG_zV1W.js";import{R as u}from"./iframe-LJxsNaI9.js";import{c as g,a as v}from"./cn-C-2-UxfX.js";import"./preload-helper-CmsKOCeN.js";var f=g({defaultClassName:"_1pxm4lw0",variantClassNames:{variant:{info:"_1pxm4lw1",success:"_1pxm4lw2",warning:"_1pxm4lw3",error:"_1pxm4lw4"}},defaultVariants:{variant:"info"},compoundVariants:[]}),h="_1pxm4lw5",x="_1pxm4lw6";const A=a=>a==="error"||a==="warning"?"alert":"status",e=u.forwardRef(({variant:a="info",title:c,children:l,className:d,...m},p)=>r.jsxs("div",{ref:p,role:A(a),className:v(f({variant:a}),d),...m,children:[c&&r.jsx("p",{className:h,children:c}),r.jsx("div",{className:x,children:l})]}));e.displayName="Alert";try{e.displayName="Alert",e.__docgenInfo={description:`A message about the page or the last action, not about a single field:
the form failed for a reason no input caused, or an action succeeded.`,displayName:"Alert",props:{variant:{defaultValue:{value:"info"},description:"Tone of the message. Also decides how it is announced.",name:"variant",required:!1,type:{name:"enum",value:[{value:'"info"'},{value:'"success"'},{value:'"warning"'},{value:'"error"'}]}},title:{defaultValue:null,description:"Optional short heading above the message.",name:"title",required:!1,type:{name:"string"}}}}}catch{}const j={title:"Components/Alert",component:e,parameters:{layout:"padded",docs:{description:{component:'Page-level message. Errors and warnings use role="alert" and interrupt the reader; information and confirmations use role="status".'}}},argTypes:{variant:{control:"select",options:["info","success","warning","error"]}},args:{variant:"info",children:"Los cambios se guardan al enviar el formulario."},tags:["autodocs"]},n={},o={args:{variant:"success",children:"Producto creado."}},s={args:{variant:"warning",title:"Borrado permanente",children:"Eliminar un producto borra la fila; no se puede deshacer."}},t={args:{variant:"error",title:"No se pudo guardar",children:"El proveedor respondió 500. Probá de nuevo en un momento."}},i={render:()=>r.jsxs("div",{style:{display:"grid",gap:"0.75rem",maxWidth:"36rem"},children:[r.jsx(e,{variant:"info",children:"Información"}),r.jsx(e,{variant:"success",children:"Confirmación"}),r.jsx(e,{variant:"warning",children:"Advertencia"}),r.jsx(e,{variant:"error",children:"Error"})]})};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "success",
    children: "Producto creado."
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "warning",
    title: "Borrado permanente",
    children: "Eliminar un producto borra la fila; no se puede deshacer."
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "error",
    title: "No se pudo guardar",
    children: "El proveedor respondió 500. Probá de nuevo en un momento."
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gap: "0.75rem",
    maxWidth: "36rem"
  }}>
      <Alert variant="info">Información</Alert>
      <Alert variant="success">Confirmación</Alert>
      <Alert variant="warning">Advertencia</Alert>
      <Alert variant="error">Error</Alert>
    </div>
}`,...i.parameters?.docs?.source}}};const N=["Info","Success","Warning","Error","AllTones"];export{i as AllTones,t as Error,n as Info,o as Success,s as Warning,N as __namedExportsOrder,j as default};
