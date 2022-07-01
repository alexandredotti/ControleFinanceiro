import React from "react";
import {
  render,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Cadastro } from "./Cadastro";

import { BrowserRouter } from 'react-router-dom';

describe("Cadastro", () => {
  const getCadastro = () => {
    return (<BrowserRouter><Cadastro /></BrowserRouter>);
  }
    it("has input for display name", () => {
      const { queryByPlaceholderText } = render(getCadastro());
      const nomeInput = queryByPlaceholderText("Informe o seu nome");
      expect(nomeInput).toBeInTheDocument();
    });

    it("has input for username", () => {
      const { queryByPlaceholderText } = render(getCadastro());
      const emailInput = queryByPlaceholderText("Informe o seu email");
      expect(emailInput).toBeInTheDocument();
    });
    it("has input for password", () => {
      const { queryByPlaceholderText } = render(getCadastro());
      const senhaInput = queryByPlaceholderText("Informe sua senha");
      expect(senhaInput).toBeInTheDocument();
    });
    it("has input for password repeat", () => {
      const { queryByPlaceholderText } = render(getCadastro());
      const senhaRepeat = queryByPlaceholderText("Confirme sua senha");
      expect(senhaRepeat).toBeInTheDocument();
    });
    it("has password type for password repeat input", () => {
      const { queryByPlaceholderText } = render(getCadastro());
      const senhaRepeat = queryByPlaceholderText("Confirme sua senha");
      expect(senhaRepeat.type).toBe("password");
    });
    it("has submit button", () => {
      const { container } = render(getCadastro());
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });
    
console.error = () => {};
