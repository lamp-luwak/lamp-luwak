
const createTypeChecker = (isRequired = false) => {
  const checker = (props, propName, componentName) => {
    const propValue = props[propName];
    if ((isRequired && !propValue) || (propValue && !propValue.__mutSubscribe)) {
      return new Error(
        "Invalid prop `" + propName + "` supplied to" +
        " `" + componentName + "`. Subject validation failed.",
      );
    }
  };

  if (!isRequired) {
    checker.isRequired = createTypeChecker(true);
  }

  return checker;
};

export const Subject = createTypeChecker();
