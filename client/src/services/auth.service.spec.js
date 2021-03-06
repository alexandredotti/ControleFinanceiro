import axios from "axios";
import AuthService from "./auth.service";

describe("apiCalls", () => {
  describe("signup", () => {
    it("calls /usuarios", () => {
      const mockSignup = jest.fn().mockResolvedValue({});
      axios.post = mockSignup;
      AuthService.cadastro();
      const path = mockSignup.mock.calls[0][0];
      expect(path).toBe("/usuarios");
    });
  });

  describe("login", () => {
    it("calls /login", () => {
      const mockLogin = jest.fn().mockResolvedValue({});
      axios.post = mockLogin;
      AuthService.login();
      const path = mockLogin.mock.calls[0][0];
      expect(path).toBe("/login");
    });
  });
});
