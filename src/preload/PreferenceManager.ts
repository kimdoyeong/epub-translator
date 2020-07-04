class PreferenceManager {
  public static get(key: string) {
    return localStorage.getItem(key) || undefined;
  }
  public static set(key: string, value: string) {
    return localStorage.setItem(key, value);
  }
}

export default PreferenceManager;
