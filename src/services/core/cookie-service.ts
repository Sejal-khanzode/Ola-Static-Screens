interface CookieOptions {
  expires?: string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  sessionOnly?: boolean; // If true, cookie will be cleared when browser closes
}

class CookieService {
  setValue(name: string, value: string, options: CookieOptions | undefined) {
    let cookieString = `${name}=${value}`;
    if (options) {
      // Only set expires if not sessionOnly
      if (options.expires && !options.sessionOnly) {
        cookieString += `; expires=${options.expires}`;
      }
      if (options.path) {
        cookieString += `; path=${options.path}`;
      }
      if (options.domain) {
        cookieString += `; domain=${options.domain}`;
      }
      if (options.secure) {
        cookieString += `; secure`;
      }
      if (options.sameSite) {
        cookieString += `; sameSite=${options.sameSite}`;
      }
    }
    document.cookie = cookieString;
  }

  getValue(name: string) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length);
      }
    }
    return null;
  }

  removeValue(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  isItemAvailable(name: string) {
    return Boolean(this.getValue(name));
  }

  clearCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const equalsIndex = cookie.indexOf("=");
      const name = cookie.substring(0, equalsIndex);
      this.removeValue(name);
    }
  }
}

const cookieService = new CookieService();

Object.freeze(cookieService);

export default cookieService;
