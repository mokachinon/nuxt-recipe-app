export default function (context) {
    if (!context.store.getters.isAuth) {
        context.redirect("/user/login")
    }
}