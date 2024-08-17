export function checkEqualString(old: string, news: string) {
  return old === news;
}

export function checkEqual(old: any, news: any) {
  return JSON.stringify( old || "{}") ===  JSON.stringify(news || "{}");
}


export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}


