
let vueInstance: Record<string, any> = {};

export function initAppInstance(vue: any): void {
  vueInstance = vue;
}

export function getStore() {
  return vueInstance.$store;
}

export function getAppInstance() {
  return vueInstance._instance.ctx.$root;
}