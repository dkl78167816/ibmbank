function transfer(){
    event.preventDefault();
    var content = {
        userId:localStorage.getItem("UserId"),
        accepterId:$("#accepterId").val(),
        account:$("#account").val()
    }

    var jsonData = JSON.stringify(content);
    console.log(jsonData);
    // alert("操作成功");
    // window.location.href="./mainPage.html"; 
    $.post("/api/transfer", jsonData,
        function (data) {
            if(data.result==1){
                alert("操作成功");
                window.location.href="./mainPage.html";   
            }
            else if(data.result==2){
                alert("操作失败,余额不足");
            }
            else{
                alert("操作失败，接收方不存在");
            }
        },
        "json"
    );
}
