const todos = [
  {
    label: "Label 1",
    completed: false
  },
  {
    label: "Label 2",
    completed: true
  },
  {
    label: "Label 3",
    completed: false
  },
];

export default (_req: any, res: any) => {
  res.status(200).json(todos);
};
