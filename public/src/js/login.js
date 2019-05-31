function login(){
    event.preventDefault();
    var content = {
        userId:$("#username").val(),
        password:$("#password").val()
    }

    var jsonData = JSON.stringify(content);
    console.log(jsonData);
    localStorage.setItem("UserId",jsonData);
    //window.location.href="./mainPage.html"; 
    $.post("/api/login", jsonData,
        function (data) {
            if(data.result){
                alert("登陆成功");
                window.location.href="./mainPage.html";   
            }
            else{
                alert("登陆失败");
            }
        },
        "json"
    );
}