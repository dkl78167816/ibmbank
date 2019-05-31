function information(){
    var content = {
        userId:localStorage.getItem("UserId"),
    }
    var jsonData = JSON.stringify(content);
    console.log(jsonData);

    // $("#user").html("htmlString");
    $.post("/api/information", jsonData,
        function (data) {
            var username = data.userName;
            $("#user").html(username);
            var money = data.userBalance;
            $("#money").html(money);
            var fixed = data.fixedTimeDeposit;
            $("#fixedMoney").html(fixed);
            var fund = data.fund;
            $("#fund").html(fund);
            var stock = data.stock;
            $("#stock").html(stock);
        },
        "json"
    );
}
information();