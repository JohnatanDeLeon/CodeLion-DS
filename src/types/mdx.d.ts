declare module "*.mdx" {
  // MDX components accept arbitrary props; use a generic record to avoid `any`
  let MDXComponent: (props: Record<string, unknown>) => JSX.Element;
  export default MDXComponent;
}
