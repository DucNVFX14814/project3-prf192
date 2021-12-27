$(document).ready(function() {

    //khởi tạo biến global i để làm STT mỗi khi thêm hàng vào bảng
    var i = 0;
    //hàm thêm các giá trị được nhập ở input vào bảng khi click vào button#btn1
    $("#btn1").click(function() {
        let mshs = $("#mshs").val();
        let lop = $("#class").val();
        let ten = $("#name").val();
        let toan = $("#math").val();
        let ly = $("#physical").val();
        let hoa = $("#chemistry").val();
        let diemTB = "?"
        let ketQua = "?";
        var error = 0;

        //hàm validateForm
        function validateForm() {
            var textError = "*Dữ liệu không được phép bỏ trống";
            var textPoint = "*Điểm phải có giá trị từ 0 đến 10";
            if (mshs.trim() == "") {
                $("#mshs-error").text(textError);
                $("#mshs-error").css("display", "block");
                error = 1;
            } else if (isNaN(mshs) || mshs.trim().length != 5) {
                $("#mshs-error").text("*Mã Số HS phải là số có 5 chữ số");
                $("#mshs-error").css("display", "block");
                error = 1;
            } else {
                $("#mshs-error").css("display", "none");
            }

            if (lop.trim() == "") {
                $("#class-error").text(textError);
                $("#class-error").css("display", "block");
                error = 1;
            } else if (lop.trim().length < 2 || lop.trim().length > 5) {
                $("#class-error").text("*Lớp phải có từ 2 đến 5 kí tự");
                $("#class-error").css("display", "block");
                error = 1;
            } else {
                $("#class-error").css("display", "none");
            }

            if (ten.trim() == "") {
                $("#name-error").text(textError);
                $("#name-error").css("display", "block");
                error = 1;
            } else if (ten.trim().length < 2 || ten.trim().length > 50) {
                $("#name-error").text("*Họ Tên phải có từ 2 đến 50 kí tự");
                $("#name-error").css("display", "block");
                error = 1;
            } else {
                $("#name-error").css("display", "none");
            }

            //điểm toan ly hoa đã được đặt kiểu number ở input
            if (toan.trim() == "") {
                $("#math-error").text(textError);
                $("#math-error").css("display", "block");
                error = 1;
            } else if (toan < 0 || toan > 10) {
                $("#math-error").text(textPoint);
                $("#math-error").css("display", "block");
                error = 1;
            } else {
                $("#math-error").css("display", "none");
            }

            if (ly.trim() == "") {
                $("#physical-error").text(textError);
                $("#physical-error").css("display", "block");
                error = 1;
            } else if (ly < 0 || ly > 10) {
                $("#physical-error").text(textPoint);
                $("#physical-error").css("display", "block");
                error = 1;
            } else {
                $("#physical-error").css("display", "none");
            }

            if (hoa.trim() == "") {
                $("#chemistry-error").text(textError);
                $("#chemistry-error").css("display", "block");
                error = 1;
            } else if (hoa < 0 || hoa > 10) {
                $("#chemistry-error").text(textPoint);
                $("#chemistry-error").css("display", "block");
                error = 1;
            } else {
                $("#chemistry-error").css("display", "none");
            }
        }
        validateForm();

        //kiểm tra điều kiện, nếu error == 0, tức là các điều kiện trong validateForm đã thỏa mãn, thì mới thêm các giá trị đã nhập trong input vào bảng
        if (error == 0) {
            var addRow = "<tr><td>" + ++i + "</td><td>" + mshs + "</td><td>" + lop + "</td><td>" + ten + "</td><td>" + toan + "</td><td>" + ly + "</td><td>" + hoa + "</td><td>" + diemTB + "</td><td>" + ketQua + "</td><td>" + "<input class = 'delete' type = 'submit' value = 'X'>" + "</td > < /tr>";
            $("#table").append(addRow);
            //clear input
            $("#form input").val("");
        }

    });

    //hàm tính điểm TB khi click vào button#btn2
    $("#btn2").click(function() {

        //dùng hàm each() để duyệt qua từng hàng trong table
        $("#table tr").each(function() {
            //lấy giá trị con (là thẻ td) của hàng đang duyệt, gán vào biến td
            let td = $(this).children("td");
            //lấy giá trị theo chỉ mục của eq(), chuyển về dạng số thực và gán vào biến tương ứng
            let toan = parseFloat(td.eq(4).text());
            let ly = parseFloat(td.eq(5).text());
            let hoa = parseFloat(td.eq(6).text());

            //tính điểm TB, lấy 2 chữ số thập phân sau dấu phẩy
            let diemTB = ((toan * 2 + ly + hoa) / 4).toFixed(2);
            td.eq(7).text(diemTB);
        })

    });

    //hàm xác định HSG cũng như kết quả khi click vào button#btn2
    $("#btn3").click(function() {

        //dùng hàm each() để duyệt qua từng hàng trong table
        $("#table tr").each(function() {
            //khởi tạo các biến toan ly hoa diem TB tương ứng với các td của hàng đang duyệt
            let td = $(this).children("td");
            let toan = parseFloat(td.eq(4).text());
            let ly = parseFloat(td.eq(5).text());
            let hoa = parseFloat(td.eq(6).text());
            let diemTB = parseFloat(td.eq(7).text());

            //kiểm tra các điều kiện, rồi trả về các kết quả tương ứng
            if (isNaN(diemTB)) {
                td.eq(8).text("?");
            } else if (toan < 3 || ly < 3 || hoa < 3 || diemTB < 4) {
                td.eq(8).text("Trượt");
                td.css({ "color": "white", "background": "violet" });
            } else if (diemTB >= 8 && toan >= 8 && ly >= 6.5 && hoa >= 6.5) {
                td.eq(8).text("HSG");
                td.css({ "color": "red", "fontStyle": "italic" });
            } else if (diemTB >= 6.5 && toan >= 6.5 && ly >= 5 && hoa >= 5) {
                td.eq(8).text("HSTT");
                td.css("color", "blue");
            } else {
                td.eq(8).text("Đạt");
            }
        })

    });

    //hàm khi click vào nút X thì sẽ xóa hàng đó, thiết lập lại STT và biến i
    $("#table").on("click", ".delete", function() {
        //hàm xóa hàng 
        $(this).closest("tr").remove();
        //trừ i đi 1 sau mỗi lần xóa hàng để sau đó, ta thêm hàng mới thì STT vẫn đúng
        i--;
        //sau khi xóa hàng, ta lặp qua các hàng, và gắn STT là index của các hàng đó
        $("#table tr").each(function() {
            let rowCount = $(this).index();
            let td = $(this).children("td");
            td.eq(0).text(rowCount);
        });
    });
});