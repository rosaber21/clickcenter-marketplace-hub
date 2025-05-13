
import React from "react";
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link 
      to="/" 
      className="flex items-center text-3xl font-bold"
    >
      <span className="text-primary">Click</span>
      <span className="text-secondary">Center</span>
    </Link>
  );
}
