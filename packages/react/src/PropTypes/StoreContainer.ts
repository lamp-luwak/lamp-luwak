import { isContainer } from "../store";

const createTypeChecker = (isRequired = false) => {
  const checker = (props: any, propName: string, componentName: string) => {
    const propValue = props[propName];
    if ((isRequired && !propValue) || (propValue && !isContainer(propValue))) {
      return new Error(
        "Invalid prop `" + propName + "` supplied to"
        + " `" + componentName + "`. StoreContainer validation failed.",
      );
    }
  };

  if (!isRequired) {
    checker.isRequired = createTypeChecker(true);
  }

  return checker;
};

export const StoreContainer = createTypeChecker();
