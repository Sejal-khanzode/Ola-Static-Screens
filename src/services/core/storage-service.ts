import CryptoJS from 'crypto-js';
import { EXPIRY_KEY, REFRESH_TOKEN_KEY, ROLES_KEY, SECRET_KEY, TOKEN_KEY } from '../../config'; 
import cookieService from './cookie-service';

class StorageService {
  setToken(token: string, options?: object) {
    this.setItem(TOKEN_KEY, token, options);
  }

  getToken() {
    return this.getItem(TOKEN_KEY);
  }

  setRefreshToken(token: string, options?: object) {
    this.setItem(REFRESH_TOKEN_KEY, token, options);
  }

  getRefreshToken() {
    return this.getItem(REFRESH_TOKEN_KEY);
  }

  setRoles(role: string, options: object) {
    this.setItem(ROLES_KEY, role, options);
  }

  getRoles() {
    return this.getItem(ROLES_KEY);
  }

  setExpiry(value: string, options: object) {
    this.setItem(EXPIRY_KEY, value, options);
  }

  getExpiry() {
    return this.getItem(EXPIRY_KEY);
  }

  private setItem(item: string, value: string, options?: object) {
    let __role = '';
    __role = CryptoJS.AES.encrypt(value, SECRET_KEY || '').toString();
    cookieService.setValue(item, __role, options);
  }

  private getItem(item: string) {
    if (cookieService.isItemAvailable(item)) {
      const encrypted_token = cookieService.getValue(item) || '';
      const byteData: CryptoJS.lib.WordArray | undefined = CryptoJS.AES.decrypt(
        encrypted_token,
        SECRET_KEY || ''
      );
      if (byteData) {
        const data = CryptoJS.enc.Utf8.stringify(byteData);
        return data;
      }
    }
    return null;
  }
}

const storageService = new StorageService();

Object.freeze(storageService);

export default storageService;
