import { StoreSubscribe } from "../decorators/store";

const createTypeChecker = (isRequired = false) => {
  const checker = (props: any, propName: string, componentName: string) => {
    const propValue = props[propName];
    if ((isRequired && !propValue) || (propValue && !propValue[StoreSubscribe])) {
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
