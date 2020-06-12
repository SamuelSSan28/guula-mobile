import React, { createContext } from "react";

const FavoriteContext = createContext({ recipes: [] });
export const FavoriteProvider = FavoriteContext.Provider;
export const FavoriteConsumer = FavoriteContext.Consumer;
export default FavoriteContext;