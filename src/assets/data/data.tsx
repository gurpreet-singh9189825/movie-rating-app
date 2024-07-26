export const inputs = [
  {
    label: "email",
    type: "email",
    name: "email",
    id: "username",
    placeholder: "Name",
    className: "flex-child1",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    id: "password",
    placeholder: "Password",
    className: "flex-child2",
  },
  {
    label: "Age",
    type: "number",
    name: "age",
    id: "age",
    placeholder: "Age",
    className: "flex-child3",
  },
  {
    label: "Mobile No",
    type: "number",
    name: "mobileNo",
    id: "mobile",
    placeholder: "Mobile",
    className: "flex-child4",
  },
];

export const radios = [
  {
    label: "Male",
    type: "radio",
    name: "gender",
    htmlFor: "male",
    id: "male",
    value: "male",
    key: 1,
  },
  {
    label: "Female",
    type: "radio",
    name: "gender",
    htmlFor: "female",
    id: "female",
    value: "female",
    key: 2,
  },
];

export const optionsValues = [
  { value: "", text: "Select your Country" },
  { value: "India", text: "India" },
  { value: "South Africa", text: "South Africa" },
  { value: "Canada", text: "Canada" },
  { value: "Australia", text: "Australia" },
  { value: "New Zealand", text: "New Zealand" },
  { value: "other", text: "other" },
];
