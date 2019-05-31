function deposit(){
    event.preventDefault();
    var content = {
        userId:localStorage.getItem("UserId"),
        type:1,
        account:$("#account").val()
    }

    var jsonData = JSON.stringify(content);
    console.log(jsonData);
    // alert("操作成功");
    // window.location.href="./mainPage.html"; 
    $.post("/api/operation", jsonData,
        function (data) {
            if(data.result){
                alert("操作成功");
                window.location.href="./mainPage.html";   
            }
            else{
                alert("操作失败");
            }
        },
        "json"
    );
}

function withdraw(){
    event.preventDefault();
    var content = {
        userId:localStorage.getItem("UserId"),
        type:2,
        account:$("#account-w").val()
    }
    var jsonData = JSON.stringify(content);
    console.log(jsonData);
    $.post("/api/operation", jsonData,
        function (data) {
            if(data.result){
                alert("操作成功");
                window.location.href="./mainPage.html";   
            }
            else{
                alert("操作失败");
            }
        },
        "json"
    );
}