export default{
    init(){
        localStorage.removeItem("jwtToken");
        localStorage.clear();
        location.href = "/";
    }
};