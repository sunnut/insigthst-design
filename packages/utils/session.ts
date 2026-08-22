const SESSION_STOR = typeof window !== 'undefined' ? window.sessionStorage : null;
const LOCAL_STOR = typeof window !== 'undefined' ? window.localStorage : null;

const USER_INFO_KEY = 'userInfo';

class SessionManager {
  put(key: string, value: string, isLocal?: boolean) {
    if (!key || !SESSION_STOR || !LOCAL_STOR) {
      return;
    }

    try {
      const sessionValue = typeof value === 'string' ? value : JSON.stringify(value);
      isLocal ? LOCAL_STOR.setItem(key, sessionValue) : SESSION_STOR.setItem(key, sessionValue);
    } catch (e) {
      console.warn('json parse error');
    }
  }

  get(key: string, isLocal?: boolean) {
    if (!key || !SESSION_STOR || !LOCAL_STOR) {
      return '';
    }
    
    const storageResult = isLocal ? LOCAL_STOR.getItem(key) : SESSION_STOR.getItem(key);
    return storageResult ?? '';
  }

  remove(key: string, isLocal?: boolean) {
    if (!SESSION_STOR || !LOCAL_STOR) return;
    isLocal ? LOCAL_STOR.removeItem(key) : SESSION_STOR.removeItem(key);
  }
  
  clear(isLocal?: boolean) {
    if (!SESSION_STOR || !LOCAL_STOR) return;
    isLocal ? LOCAL_STOR.clear() : SESSION_STOR.clear();
  }
}

const session = new SessionManager();
export default session;

export interface StoredUserInfo {
  username: string;
  nickname?: string;
  email?: string;
  created_at?: string;
  bio?: string;
  uuid?: string;
}

export const getUserInfoStorage = (): StoredUserInfo | null => {
  let userInfoStr = session.get(USER_INFO_KEY, true);
  if (!userInfoStr) {
    userInfoStr = session.get(USER_INFO_KEY);
    if (userInfoStr) {
      session.put(USER_INFO_KEY, userInfoStr, true);
      session.remove(USER_INFO_KEY);
    }
  }

  try {
    return userInfoStr ? JSON.parse(userInfoStr) : null;
  } catch {
    return null;
  }
};

export const setUserInfoStorage = (userInfo: StoredUserInfo) => {
  session.put(USER_INFO_KEY, JSON.stringify(userInfo), true);
  setUserName(userInfo.username);
};

export const clearUserSession = () => {
  session.remove(USER_INFO_KEY, true);
  session.remove(USER_INFO_KEY);
  session.remove('user_token', true);
  session.remove('user-access-key');
  setUserName('');
};

export let userName: string = getUserInfoStorage()?.username ?? '';

export const setUserName = (uname: string) => {
  userName = uname;
};
