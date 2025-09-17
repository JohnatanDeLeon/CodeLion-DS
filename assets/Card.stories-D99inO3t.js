import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{R as y}from"./iframe-Ce8_XGRD.js";import{c as S,a as f}from"./cn-C-2-UxfX.js";import{I as x}from"./Input-BMNWlS1i.js";import{B as w}from"./Button-B-nr2Nj5.js";import"./preload-helper-CmsKOCeN.js";var z=S({defaultClassName:"_9mb0c71 _9mb0c70",variantClassNames:{size:{sm:"_9mb0c72",md:"_9mb0c73",lg:"_9mb0c74",xl:"_9mb0c75"},elevation:{flat:"_9mb0c76",low:"_9mb0c77",medium:"_9mb0c78",high:"_9mb0c79"},variant:{default:"_9mb0c7a",outlined:"_9mb0c7b",filled:"_9mb0c7c",gradient:"_9mb0c7d"},interactive:{true:"_9mb0c7e",false:"_9mb0c7f"}},defaultVariants:{size:"md",elevation:"low",variant:"default",interactive:!1},compoundVariants:[]}),B="_9mb0c7g",_="_9mb0c7h",k="_9mb0c7i";const r=y.forwardRef(({children:n,size:a,elevation:d,variant:o,interactive:b,className:v,...C},j)=>e.jsx("div",{ref:j,className:f(z({size:a,elevation:d,variant:o,interactive:b}),v),...C,children:n}));r.displayName="Card";const i=y.forwardRef(({children:n,className:a,...d},o)=>e.jsx("div",{ref:o,className:f(B,a),...d,children:n}));i.displayName="CardHeader";const t=y.forwardRef(({children:n,className:a,...d},o)=>e.jsx("div",{ref:o,className:f(_,a),...d,children:n}));t.displayName="CardBody";const s=y.forwardRef(({children:n,className:a,...d},o)=>e.jsx("div",{ref:o,className:f(k,a),...d,children:n}));s.displayName="CardFooter";try{r.displayName="Card",r.__docgenInfo={description:"",displayName:"Card",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'}]}},elevation:{defaultValue:null,description:"",name:"elevation",required:!1,type:{name:"enum",value:[{value:'"flat"'},{value:'"low"'},{value:'"medium"'},{value:'"high"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"gradient"'},{value:'"default"'},{value:'"outlined"'},{value:'"filled"'}]}},interactive:{defaultValue:null,description:"",name:"interactive",required:!1,type:{name:"boolean"}}}}}catch{}try{i.displayName="CardHeader",i.__docgenInfo={description:"",displayName:"CardHeader",props:{}}}catch{}try{t.displayName="CardBody",t.__docgenInfo={description:"",displayName:"CardBody",props:{}}}catch{}try{s.displayName="CardFooter",s.__docgenInfo={description:"",displayName:"CardFooter",props:{}}}catch{}const N={title:"Components/Card",component:r,parameters:{layout:"centered",docs:{description:{component:"A flexible card component with multiple variants and interactive states. Perfect for displaying content in an organized, visually appealing manner."}}},argTypes:{variant:{control:"select",options:["default","outlined","filled","gradient"],description:"Visual style variant of the card"},size:{control:"select",options:["sm","md","lg","xl"],description:"Size of the card padding"},elevation:{control:"select",options:["flat","low","medium","high"],description:"Shadow elevation level"},interactive:{control:"boolean",description:"Whether the card is interactive with hover effects"}},tags:["autodocs"]},l={args:{variant:"default",size:"md",elevation:"low"},render:n=>e.jsxs(r,{...n,style:{width:"320px"},children:[e.jsxs(i,{children:[e.jsx("h3",{style:{margin:0,fontSize:"1.25rem",fontWeight:"bold"},children:"Card Title"}),e.jsx("p",{style:{margin:"0.5rem 0 0",color:"#6b7280",fontSize:"0.875rem"},children:"This is a description of the card content. It provides context about what the card contains."})]}),e.jsx(t,{children:e.jsx("p",{style:{margin:0,lineHeight:"1.5"},children:"This is the main content of the card. You can put any content here including text, images, or other components."})}),e.jsx(s,{children:e.jsx("small",{style:{color:"#6b7280"},children:"Created: 2 hours ago • Updated: 1 hour ago"})})]})},c={render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"1rem",width:"100%"},children:[e.jsxs(r,{variant:"default",style:{width:"280px"},children:[e.jsxs(i,{children:[e.jsx("h3",{style:{margin:0,fontSize:"1.125rem",fontWeight:"600"},children:"Default Card"}),e.jsx("p",{style:{margin:"0.25rem 0 0",color:"#6b7280",fontSize:"0.875rem"},children:"Basic card with subtle shadow"})]}),e.jsx(t,{children:e.jsx("p",{style:{margin:0},children:"Standard card design with clean borders and subtle elevation."})})]}),e.jsxs(r,{variant:"outlined",style:{width:"280px"},children:[e.jsxs(i,{children:[e.jsx("h3",{style:{margin:0,fontSize:"1.125rem",fontWeight:"600"},children:"Outlined Card"}),e.jsx("p",{style:{margin:"0.25rem 0 0",color:"#6b7280",fontSize:"0.875rem"},children:"Card with prominent border"})]}),e.jsx(t,{children:e.jsx("p",{style:{margin:0},children:"Clear boundaries with a more defined border style."})})]}),e.jsxs(r,{variant:"filled",style:{width:"280px"},children:[e.jsxs(i,{children:[e.jsx("h3",{style:{margin:0,fontSize:"1.125rem",fontWeight:"600"},children:"Filled Card"}),e.jsx("p",{style:{margin:"0.25rem 0 0",color:"#6b7280",fontSize:"0.875rem"},children:"Card with background fill"})]}),e.jsx(t,{children:e.jsx("p",{style:{margin:0},children:"Subtle background color for visual distinction."})})]}),e.jsxs(r,{variant:"gradient",style:{width:"280px"},children:[e.jsxs(i,{children:[e.jsx("h3",{style:{margin:0,fontSize:"1.125rem",fontWeight:"600"},children:"Gradient Card"}),e.jsx("p",{style:{margin:"0.25rem 0 0",color:"#6b7280",fontSize:"0.875rem"},children:"Card with gradient background"})]}),e.jsx(t,{children:e.jsx("p",{style:{margin:0},children:"Subtle gradient background for visual interest."})})]})]})},m={args:{variant:"default",interactive:!0},render:n=>e.jsxs(r,{...n,style:{width:"320px"},onClick:()=>{},children:[e.jsxs(i,{children:[e.jsx("h3",{style:{margin:0,fontSize:"1.25rem",fontWeight:"bold"},children:"Interactive Card"}),e.jsx("p",{style:{margin:"0.5rem 0 0",color:"#6b7280",fontSize:"0.875rem"},children:"Click me to see the interaction!"})]}),e.jsx(t,{children:e.jsx("p",{style:{margin:0,lineHeight:"1.5"},children:"This card responds to clicks and has hover effects. Try hovering over it to see the elevation change."})})]})},h={render:()=>e.jsxs("div",{style:{display:"flex",gap:"1rem",alignItems:"flex-start"},children:[e.jsx(r,{size:"sm",style:{width:"200px"},children:e.jsxs(t,{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"1rem"},children:"Small"}),e.jsx("p",{style:{margin:0,fontSize:"0.875rem"},children:"Compact card with minimal padding"})]})}),e.jsx(r,{size:"md",style:{width:"240px"},children:e.jsxs(t,{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"1rem"},children:"Medium"}),e.jsx("p",{style:{margin:0,fontSize:"0.875rem"},children:"Standard card with comfortable padding"})]})}),e.jsx(r,{size:"lg",style:{width:"280px"},children:e.jsxs(t,{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"1rem"},children:"Large"}),e.jsx("p",{style:{margin:0,fontSize:"0.875rem"},children:"Spacious card with generous padding"})]})}),e.jsx(r,{size:"xl",style:{width:"320px"},children:e.jsxs(t,{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"1rem"},children:"Extra Large"}),e.jsx("p",{style:{margin:0,fontSize:"0.875rem"},children:"Very spacious card with extra generous padding"})]})})]})},p={render:()=>e.jsxs("div",{style:{display:"flex",gap:"1rem",alignItems:"flex-start"},children:[e.jsx(r,{elevation:"flat",style:{width:"200px"},children:e.jsxs(t,{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"1rem"},children:"Flat"}),e.jsx("p",{style:{margin:0,fontSize:"0.875rem"},children:"No shadow"})]})}),e.jsx(r,{elevation:"low",style:{width:"200px"},children:e.jsxs(t,{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"1rem"},children:"Low"}),e.jsx("p",{style:{margin:0,fontSize:"0.875rem"},children:"Subtle shadow"})]})}),e.jsx(r,{elevation:"medium",style:{width:"200px"},children:e.jsxs(t,{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"1rem"},children:"Medium"}),e.jsx("p",{style:{margin:0,fontSize:"0.875rem"},children:"Moderate shadow"})]})}),e.jsx(r,{elevation:"high",style:{width:"200px"},children:e.jsxs(t,{children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"1rem"},children:"High"}),e.jsx("p",{style:{margin:0,fontSize:"0.875rem"},children:"Strong shadow"})]})})]})},g={render:()=>e.jsxs(r,{variant:"default",elevation:"medium",style:{width:"360px"},children:[e.jsx(i,{children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"1rem"},children:[e.jsx("div",{style:{width:"48px",height:"48px",borderRadius:"12px",background:"linear-gradient(135deg, #3b82f6, #1d4ed8)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"1.5rem"},children:"📊"}),e.jsxs("div",{style:{flex:1},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.25rem",fontWeight:"bold"},children:"Q4 Analytics Report"}),e.jsx("p",{style:{margin:"0.25rem 0 0",color:"#6b7280",fontSize:"0.875rem"},children:"Performance Dashboard"})]}),e.jsx("button",{style:{padding:"0.5rem 1rem",border:"1px solid #e5e7eb",borderRadius:"0.5rem",background:"white",cursor:"pointer",fontSize:"0.875rem"},children:"Edit"})]})}),e.jsxs(t,{children:[e.jsxs("div",{style:{marginBottom:"1rem"},children:[e.jsx("h4",{style:{margin:"0 0 0.5rem",fontSize:"0.875rem",fontWeight:"600"},children:"Key Highlights"}),e.jsxs("ul",{style:{margin:0,paddingLeft:"1rem",fontSize:"0.875rem",lineHeight:"1.5"},children:[e.jsx("li",{children:"Revenue increased by 23%"}),e.jsx("li",{children:"User engagement up 15%"}),e.jsx("li",{children:"New customer acquisition: 1,247"})]})]}),e.jsxs("div",{style:{padding:"1rem",background:"#f9fafb",borderRadius:"0.5rem",fontSize:"0.875rem"},children:[e.jsx("strong",{children:"Overall Score:"})," 8.5/10"]})]}),e.jsx(s,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("small",{style:{color:"#6b7280"},children:"Generated: Dec 15, 2023 • Next update: Jan 15, 2024"}),e.jsxs("div",{style:{display:"flex",gap:"0.5rem"},children:[e.jsx("button",{style:{padding:"0.5rem 1rem",border:"1px solid #1d4ed8",borderRadius:"0.5rem",background:"#1d4ed8",color:"white",cursor:"pointer",fontSize:"0.875rem"},children:"Download"}),e.jsx("button",{style:{padding:"0.5rem 1rem",border:"1px solid #e5e7eb",borderRadius:"0.5rem",background:"white",cursor:"pointer",fontSize:"0.875rem"},children:"Share"})]})]})})]})},u={render:()=>e.jsxs(r,{variant:"default",elevation:"medium",style:{width:"400px"},children:[e.jsx(i,{children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("h2",{style:{margin:0,fontSize:"1.5rem",fontWeight:"bold",color:"#1f2937"},children:"Iniciar Sesión"}),e.jsx("p",{style:{margin:"0.5rem 0 0",color:"#6b7280",fontSize:"0.875rem"},children:"Ingresa tus credenciales para acceder a tu cuenta"})]})}),e.jsx(t,{children:e.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"1.5rem"},children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"username",style:{display:"block",marginBottom:"0.5rem",fontSize:"0.875rem",fontWeight:"500",color:"#374151"},children:"Usuario"}),e.jsx(x,{id:"username",type:"text",placeholder:"Ingresa tu usuario",style:{width:"100%"}})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",style:{display:"block",marginBottom:"0.5rem",fontSize:"0.875rem",fontWeight:"500",color:"#374151"},children:"Contraseña"}),e.jsx(x,{id:"password",type:"password",variant:"password",placeholder:"Ingresa tu contraseña",style:{width:"100%"}})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"0.875rem"},children:[e.jsx("input",{type:"checkbox",style:{width:"1rem",height:"1rem",accentColor:"#3b82f6"}}),"Recordarme"]}),e.jsx("button",{type:"button",style:{fontSize:"0.875rem",color:"#1d4ed8",background:"none",border:"none",cursor:"pointer",textDecoration:"none",padding:0},onMouseOver:n=>{n.currentTarget.style.textDecoration="underline"},onMouseOut:n=>{n.currentTarget.style.textDecoration="none"},onFocus:n=>{n.currentTarget.style.textDecoration="underline"},onBlur:n=>{n.currentTarget.style.textDecoration="none"},onClick:()=>{},children:"¿Olvidaste tu contraseña?"})]})]})}),e.jsx(s,{children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"1rem",width:"100%"},children:[e.jsx(w,{variant:"gradient",size:"lg",fullWidth:!0,gradient:{startColor:"#3b82f6",endColor:"#1d4ed8"},onClick:()=>{},children:"Iniciar Sesión"}),e.jsx("div",{style:{textAlign:"center"},children:e.jsxs("span",{style:{fontSize:"0.875rem",color:"#6b7280"},children:["¿No tienes una cuenta?"," ",e.jsx("button",{type:"button",style:{color:"#1d4ed8",background:"none",border:"none",cursor:"pointer",textDecoration:"none",fontWeight:"500",fontSize:"inherit",padding:0},onMouseOver:n=>{n.currentTarget.style.textDecoration="underline"},onMouseOut:n=>{n.currentTarget.style.textDecoration="none"},onFocus:n=>{n.currentTarget.style.textDecoration="underline"},onBlur:n=>{n.currentTarget.style.textDecoration="none"},onClick:()=>{},children:"Regístrate aquí"})]})})]})})]})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "default",
    size: "md",
    elevation: "low"
  },
  render: args => <Card {...args} style={{
    width: "320px"
  }}>
      <CardHeader>
        <h3 style={{
        margin: 0,
        fontSize: "1.25rem",
        fontWeight: "bold"
      }}>
          Card Title
        </h3>
        <p style={{
        margin: "0.5rem 0 0",
        color: "#6b7280",
        fontSize: "0.875rem"
      }}>
          This is a description of the card content. It provides context about
          what the card contains.
        </p>
      </CardHeader>
      <CardBody>
        <p style={{
        margin: 0,
        lineHeight: "1.5"
      }}>
          This is the main content of the card. You can put any content here
          including text, images, or other components.
        </p>
      </CardBody>
      <CardFooter>
        <small style={{
        color: "#6b7280"
      }}>
          Created: 2 hours ago • Updated: 1 hour ago
        </small>
      </CardFooter>
    </Card>
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
    width: "100%"
  }}>
      <Card variant="default" style={{
      width: "280px"
    }}>
        <CardHeader>
          <h3 style={{
          margin: 0,
          fontSize: "1.125rem",
          fontWeight: "600"
        }}>
            Default Card
          </h3>
          <p style={{
          margin: "0.25rem 0 0",
          color: "#6b7280",
          fontSize: "0.875rem"
        }}>
            Basic card with subtle shadow
          </p>
        </CardHeader>
        <CardBody>
          <p style={{
          margin: 0
        }}>
            Standard card design with clean borders and subtle elevation.
          </p>
        </CardBody>
      </Card>

      <Card variant="outlined" style={{
      width: "280px"
    }}>
        <CardHeader>
          <h3 style={{
          margin: 0,
          fontSize: "1.125rem",
          fontWeight: "600"
        }}>
            Outlined Card
          </h3>
          <p style={{
          margin: "0.25rem 0 0",
          color: "#6b7280",
          fontSize: "0.875rem"
        }}>
            Card with prominent border
          </p>
        </CardHeader>
        <CardBody>
          <p style={{
          margin: 0
        }}>
            Clear boundaries with a more defined border style.
          </p>
        </CardBody>
      </Card>

      <Card variant="filled" style={{
      width: "280px"
    }}>
        <CardHeader>
          <h3 style={{
          margin: 0,
          fontSize: "1.125rem",
          fontWeight: "600"
        }}>
            Filled Card
          </h3>
          <p style={{
          margin: "0.25rem 0 0",
          color: "#6b7280",
          fontSize: "0.875rem"
        }}>
            Card with background fill
          </p>
        </CardHeader>
        <CardBody>
          <p style={{
          margin: 0
        }}>
            Subtle background color for visual distinction.
          </p>
        </CardBody>
      </Card>

      <Card variant="gradient" style={{
      width: "280px"
    }}>
        <CardHeader>
          <h3 style={{
          margin: 0,
          fontSize: "1.125rem",
          fontWeight: "600"
        }}>
            Gradient Card
          </h3>
          <p style={{
          margin: "0.25rem 0 0",
          color: "#6b7280",
          fontSize: "0.875rem"
        }}>
            Card with gradient background
          </p>
        </CardHeader>
        <CardBody>
          <p style={{
          margin: 0
        }}>
            Subtle gradient background for visual interest.
          </p>
        </CardBody>
      </Card>
    </div>
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "default",
    interactive: true
  },
  render: args => <Card {...args} style={{
    width: "320px"
  }} onClick={() => {
    // Handle card click - in a real app, this would navigate or update state
  }}>
      <CardHeader>
        <h3 style={{
        margin: 0,
        fontSize: "1.25rem",
        fontWeight: "bold"
      }}>
          Interactive Card
        </h3>
        <p style={{
        margin: "0.5rem 0 0",
        color: "#6b7280",
        fontSize: "0.875rem"
      }}>
          Click me to see the interaction!
        </p>
      </CardHeader>
      <CardBody>
        <p style={{
        margin: 0,
        lineHeight: "1.5"
      }}>
          This card responds to clicks and has hover effects. Try hovering over
          it to see the elevation change.
        </p>
      </CardBody>
    </Card>
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start"
  }}>
      <Card size="sm" style={{
      width: "200px"
    }}>
        <CardBody>
          <h4 style={{
          margin: "0 0 0.5rem",
          fontSize: "1rem"
        }}>Small</h4>
          <p style={{
          margin: 0,
          fontSize: "0.875rem"
        }}>
            Compact card with minimal padding
          </p>
        </CardBody>
      </Card>

      <Card size="md" style={{
      width: "240px"
    }}>
        <CardBody>
          <h4 style={{
          margin: "0 0 0.5rem",
          fontSize: "1rem"
        }}>Medium</h4>
          <p style={{
          margin: 0,
          fontSize: "0.875rem"
        }}>
            Standard card with comfortable padding
          </p>
        </CardBody>
      </Card>

      <Card size="lg" style={{
      width: "280px"
    }}>
        <CardBody>
          <h4 style={{
          margin: "0 0 0.5rem",
          fontSize: "1rem"
        }}>Large</h4>
          <p style={{
          margin: 0,
          fontSize: "0.875rem"
        }}>
            Spacious card with generous padding
          </p>
        </CardBody>
      </Card>

      <Card size="xl" style={{
      width: "320px"
    }}>
        <CardBody>
          <h4 style={{
          margin: "0 0 0.5rem",
          fontSize: "1rem"
        }}>
            Extra Large
          </h4>
          <p style={{
          margin: 0,
          fontSize: "0.875rem"
        }}>
            Very spacious card with extra generous padding
          </p>
        </CardBody>
      </Card>
    </div>
}`,...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start"
  }}>
      <Card elevation="flat" style={{
      width: "200px"
    }}>
        <CardBody>
          <h4 style={{
          margin: "0 0 0.5rem",
          fontSize: "1rem"
        }}>Flat</h4>
          <p style={{
          margin: 0,
          fontSize: "0.875rem"
        }}>No shadow</p>
        </CardBody>
      </Card>

      <Card elevation="low" style={{
      width: "200px"
    }}>
        <CardBody>
          <h4 style={{
          margin: "0 0 0.5rem",
          fontSize: "1rem"
        }}>Low</h4>
          <p style={{
          margin: 0,
          fontSize: "0.875rem"
        }}>Subtle shadow</p>
        </CardBody>
      </Card>

      <Card elevation="medium" style={{
      width: "200px"
    }}>
        <CardBody>
          <h4 style={{
          margin: "0 0 0.5rem",
          fontSize: "1rem"
        }}>Medium</h4>
          <p style={{
          margin: 0,
          fontSize: "0.875rem"
        }}>Moderate shadow</p>
        </CardBody>
      </Card>

      <Card elevation="high" style={{
      width: "200px"
    }}>
        <CardBody>
          <h4 style={{
          margin: "0 0 0.5rem",
          fontSize: "1rem"
        }}>High</h4>
          <p style={{
          margin: 0,
          fontSize: "0.875rem"
        }}>Strong shadow</p>
        </CardBody>
      </Card>
    </div>
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Card variant="default" elevation="medium" style={{
    width: "360px"
  }}>
      <CardHeader>
        <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem"
      }}>
          <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "1.5rem"
        }}>
            📊
          </div>
          <div style={{
          flex: 1
        }}>
            <h3 style={{
            margin: 0,
            fontSize: "1.25rem",
            fontWeight: "bold"
          }}>
              Q4 Analytics Report
            </h3>
            <p style={{
            margin: "0.25rem 0 0",
            color: "#6b7280",
            fontSize: "0.875rem"
          }}>
              Performance Dashboard
            </p>
          </div>
          <button style={{
          padding: "0.5rem 1rem",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          background: "white",
          cursor: "pointer",
          fontSize: "0.875rem"
        }}>
            Edit
          </button>
        </div>
      </CardHeader>

      <CardBody>
        <div style={{
        marginBottom: "1rem"
      }}>
          <h4 style={{
          margin: "0 0 0.5rem",
          fontSize: "0.875rem",
          fontWeight: "600"
        }}>
            Key Highlights
          </h4>
          <ul style={{
          margin: 0,
          paddingLeft: "1rem",
          fontSize: "0.875rem",
          lineHeight: "1.5"
        }}>
            <li>Revenue increased by 23%</li>
            <li>User engagement up 15%</li>
            <li>New customer acquisition: 1,247</li>
          </ul>
        </div>

        <div style={{
        padding: "1rem",
        background: "#f9fafb",
        borderRadius: "0.5rem",
        fontSize: "0.875rem"
      }}>
          <strong>Overall Score:</strong> 8.5/10
        </div>
      </CardBody>

      <CardFooter>
        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }}>
          <small style={{
          color: "#6b7280"
        }}>
            Generated: Dec 15, 2023 • Next update: Jan 15, 2024
          </small>
          <div style={{
          display: "flex",
          gap: "0.5rem"
        }}>
            <button style={{
            padding: "0.5rem 1rem",
            border: "1px solid #1d4ed8",
            borderRadius: "0.5rem",
            background: "#1d4ed8",
            color: "white",
            cursor: "pointer",
            fontSize: "0.875rem"
          }}>
              Download
            </button>
            <button style={{
            padding: "0.5rem 1rem",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            background: "white",
            cursor: "pointer",
            fontSize: "0.875rem"
          }}>
              Share
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Card variant="default" elevation="medium" style={{
    width: "400px"
  }}>
      <CardHeader>
        <div style={{
        textAlign: "center"
      }}>
          <h2 style={{
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#1f2937"
        }}>
            Iniciar Sesión
          </h2>
          <p style={{
          margin: "0.5rem 0 0",
          color: "#6b7280",
          fontSize: "0.875rem"
        }}>
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>
      </CardHeader>

      <CardBody>
        <form style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}>
          <div>
            <label htmlFor="username" style={{
            display: "block",
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#374151"
          }}>
              Usuario
            </label>
            <Input id="username" type="text" placeholder="Ingresa tu usuario" style={{
            width: "100%"
          }} />
          </div>

          <div>
            <label htmlFor="password" style={{
            display: "block",
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#374151"
          }}>
              Contraseña
            </label>
            <Input id="password" type="password" variant="password" placeholder="Ingresa tu contraseña" style={{
            width: "100%"
          }} />
          </div>

          <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
            <label style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem"
          }}>
              <input type="checkbox" style={{
              width: "1rem",
              height: "1rem",
              accentColor: "#3b82f6"
            }} />
              Recordarme
            </label>
            <button type="button" style={{
            fontSize: "0.875rem",
            color: "#1d4ed8",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "none",
            padding: 0
          }} onMouseOver={e => {
            e.currentTarget.style.textDecoration = "underline";
          }} onMouseOut={e => {
            e.currentTarget.style.textDecoration = "none";
          }} onFocus={e => {
            e.currentTarget.style.textDecoration = "underline";
          }} onBlur={e => {
            e.currentTarget.style.textDecoration = "none";
          }} onClick={() => {
            // Handle forgot password click
          }}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>
      </CardBody>

      <CardFooter>
        <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%"
      }}>
          <Button variant="gradient" size="lg" fullWidth gradient={{
          startColor: "#3b82f6",
          endColor: "#1d4ed8"
        }} onClick={() => {
          // Handle login submission
        }}>
            Iniciar Sesión
          </Button>

          <div style={{
          textAlign: "center"
        }}>
            <span style={{
            fontSize: "0.875rem",
            color: "#6b7280"
          }}>
              ¿No tienes una cuenta?{" "}
              <button type="button" style={{
              color: "#1d4ed8",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "inherit",
              padding: 0
            }} onMouseOver={e => {
              e.currentTarget.style.textDecoration = "underline";
            }} onMouseOut={e => {
              e.currentTarget.style.textDecoration = "none";
            }} onFocus={e => {
              e.currentTarget.style.textDecoration = "underline";
            }} onBlur={e => {
              e.currentTarget.style.textDecoration = "none";
            }} onClick={() => {
              // Handle register click
            }}>
                Regístrate aquí
              </button>
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
}`,...u.parameters?.docs?.source}}};const R=["Default","Variants","Interactive","Sizes","Elevations","FullExample","LoginForm"];export{l as Default,p as Elevations,g as FullExample,m as Interactive,u as LoginForm,h as Sizes,c as Variants,R as __namedExportsOrder,N as default};
