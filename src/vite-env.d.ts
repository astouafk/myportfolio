/// <reference types="vite/client" />
/// <reference types="vite/client" />

declare module '*.jpg' {
    const value: string
    export default value
  }
  
  declare module '*.png' {
    const value: string
    export default value
  }

  declare module '*.jpeg' {
    const value: string
    export default value
  }

  declare module '*.pdf' {
    const content: string;
    export default content;
}