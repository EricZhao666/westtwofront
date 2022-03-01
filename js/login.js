
function login() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    axios.get("http://y4825r8474.zicp.vip/login?username=" + username + "&password=" + password).then(function (response) {
        if (response.data["code"] == 0) {
            window.location.href = "index.html";
        }
        else {
            document.getElementById("message").innerText = "登录失败";
        }
    }).catch(function (err) {
        document.getElementById("message").innerText = "登录失败";
    })
}

function register() {
    uname = document.getElementById("username").value;
    upass = document.getElementById("password").value;
    axios.post("http://y4825r8474.zicp.vip/register", {
        username: uname,
        password: upass
    }).then(function (response) {
        if (response.data["code"] == 0) {
            window.location.href = "index.html";
        }
        else {
            document.getElementById("message").innerText = "注册失败";
        }
    }).catch(function (err) {
        document.getElementById("message").innerText = "注册失败";
    })
}