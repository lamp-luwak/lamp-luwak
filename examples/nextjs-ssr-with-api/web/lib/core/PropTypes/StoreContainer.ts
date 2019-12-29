import { isStoreContainer } from "../store/lib";

const createTypeChecker = (isRequired = false) => {
  const checker = (props: any, propName: string, componentName: string) => {
    const propValue = props[propName];
    if ((isRequired && !propValue) || (propValue && !isStoreContainer(propValue))) {
      return new Error(
        "Invalid prop `" + propName + "` supplied to" +
        " `" + componentName + "`. StoreContainer validation failed.",
      );
    }
  };

  if (!isRequired) {
    checker.isRequired = createTypeChecker(true);
  }

  return checker;
};

export const StoreContainer = createTypeChecker();
