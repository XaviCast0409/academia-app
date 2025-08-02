import { createRef } from 'react';

export const navigationRef = createRef();

export function navigate(name, params) {
  if (navigationRef.current?.navigate) {
    navigationRef.current.navigate(name, params);
  }
}

export function resetNavigation(name = 'Login') {
  if (navigationRef.current?.resetRoot) {
    navigationRef.current.resetRoot({
      index: 0,
      routes: [{ name }],
    });
  }
}
