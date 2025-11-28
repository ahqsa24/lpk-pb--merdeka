import React from "react";
import { Label } from "../atoms/Label";
import { Input } from "../atoms/Input";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
}
export const FormField: React.FC<FormFieldProps> = ({ label, id, type = "text", placeholder }) => (
  <div className="mb-4">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} placeholder={placeholder} />
  </div>
);