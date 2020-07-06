class Store {
  private static data: any = sessionStorage.getItem("data")
    ? JSON.parse(sessionStorage.getItem("data"))
    : null;

  public static store(data: any) {
    this.data = data;
    sessionStorage.setItem("data", JSON.stringify(data));
  }
  public static get() {
    return this.data;
  }
}

export default Store;
