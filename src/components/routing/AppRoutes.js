export const AppRoutes = {
    MAIN: "/",
    DASHBOARD: "/dashboard",
    // IHOR: "/:username/*",
    IHOR: "/ihor",
    FRIENDS: "/friends",
    SIGN_IN: "/signIn",
    SIGN_UP: "/signUP",
   PHOTOS: "/photos",
   NOT_FOUND_PAGE: "/404",
}

export const redirectRoutes = {
    MAIN: "/",
    DASHBOARD: "/dashboard",
    IHOR: "/:username",
    PHOTOS: "/:username/photos",
}