function buyFixedMoney(){
    event.preventDefault();
    var content = {
        userId:localStorage.getItem("UserId"),
        type:3,
        account:$("#account-f").val()
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
function buyStock(){
    event.preventDefault();
    var content = {
        userId:localStorage.getItem("UserId"),
        type:5,
        account:$("#account-s").val()
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
function buyFund(){
    event.preventDefault();
    var content = {
        userId:localStorage.getItem("UserId"),
        type:4,
        account:$("#account-fund").val()
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