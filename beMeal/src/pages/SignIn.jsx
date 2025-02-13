import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Example from "../components/example";


export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p> Sign In Page </p>
      <Example />
    </div>
  );
}
