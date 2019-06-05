
1. Maybe I need to make checker for without parameters constructor for provided services. This checker I want make inside provide decorator.
2. I want write plugin for babel who transform `new Class(...)` construction to `__createClassInstance(Class, ...)` for possibily to make mocks for these classes in tests.
