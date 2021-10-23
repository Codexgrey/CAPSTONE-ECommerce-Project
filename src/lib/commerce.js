import Commerce from '@chec/commerce.js';

// true: signifies that this is going to create a new commerce store
export const commerce = new Commerce(process.env.REACT_APP_CHECPublickey, true);  