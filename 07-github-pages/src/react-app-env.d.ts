/// <reference types="react-scripts" />

declare module '../server/db' {
  const getEndpoints: () => { data: { greeting: string } };
  export default getEndpoints;
}

declare module '*/server/db' {
  const getEndpoints: () => { data: { greeting: string } };
  export default getEndpoints;
}
