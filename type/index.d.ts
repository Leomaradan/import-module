declare global {
    interface Window {
        define: any;
        module: any;
        exports: any;
    }
}
declare const importModule: (path: string) => Promise<any>;

export { importModule };
