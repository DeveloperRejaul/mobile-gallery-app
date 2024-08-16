export function checkEqualString(old: string, news: string) {
  return old === news;
}

export function checkEqual(old: any, news: any) {
  return JSON.stringify( old || "{}") ===  JSON.stringify(news || "{}");
}