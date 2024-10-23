import Cookies from "js-cookie";

class ApiManager {
  private token?: string | null = null;
  public checkIfIsAuthenticated(): void {
    this.token = Cookies.get("token");
    // console.log("TOKEN", this.token);

    if (!this.token) {
      this.redirectIntoSignIn();
    }
  }
  public redirectIntoSignIn(): void {
    window.location.href = "/signin";
  }

  public readonly tokenGetter = () => {
    return this.token;
  };
}

export default new ApiManager();
