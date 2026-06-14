declare module 'smiles-drawer' {
  interface DrawerOptions {
    width?: number
    height?: number
    bondThickness?: number
    [key: string]: unknown
  }

  interface DrawerInstance {
    draw(tree: unknown, canvas: HTMLCanvasElement | null, theme?: string, infoOnly?: boolean): void
  }

  const _default: {
    Drawer: new (options?: DrawerOptions) => DrawerInstance
    parse(smiles: string, success: (tree: unknown) => void, error: (message: string) => void): void
  }

  export default _default
}

declare module 'katex/contrib/mhchem' {}
