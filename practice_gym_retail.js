// 1. Khai báo hằng số bảng giá và trang trí
const PRICE_SHAKER = 120000;
const PRICE_GLOVES = 180000;
const PRICE_STRAP = 150000;
const BORDER = "-".repeat(40);

// Các biến lưu trạng thái đơn hàng
let rawCode = "";
let cleanCode = "";
let isValid = false;
let choice = 0;

// Vòng lặp do-while điều khiển menu
do {
  console.log("\n" + BORDER);
  console.log("   PHÂN HỆ BÁN LẺ PHỤ KIỆN GYM");
  console.log(BORDER);
  console.log("1. Nhập và chuẩn hóa mã đơn hàng");
  console.log("2. Tính tiền và in hóa đơn phụ kiện");
  console.log("3. Thoát chương trình");
  console.log(BORDER);

  choice = Number(prompt("Chọn chức năng (1-3):"));

  switch (choice) {
    case 1: {
      // Cho phép người dùng nhập từ bàn phím
      rawCode = prompt("Nhập mã đơn hàng (ví dụ: gym-shaker-vip):") || "";
      console.log(`[Nhập liệu] Chuỗi nhận vào: "${rawCode}"`);

      cleanCode = rawCode.trim().toUpperCase();

      // Kiểm tra định dạng bắt đầu bằng GYM- và độ dài tối thiểu 8 ký tự
      if (cleanCode.startsWith("GYM-") && cleanCode.length >= 8) {
        isValid = true;
        console.log(`=> Chuẩn hóa thành công: ${cleanCode}`);
      } else {
        isValid = false;
        console.log("=> LỖI: Mã đơn hàng không hợp lệ (cần bắt đầu bằng GYM- và từ 8 ký tự)!");
      }
      break;
    }

    case 2: {
      if (!isValid) {
        console.log("\n[CẢNH BÁO] Chưa có mã hợp lệ! Vui lòng chọn 1 để nhập mã trước.");
        break;
      }

      // Tách chuỗi bằng split("-") thay vì duyệt vòng lặp tìm dấu gạch ngang
      // Cấu trúc mong đợi: ["GYM", "SHAKER"] hoặc ["GYM", "SHAKER", "VIP"]
      const parts = cleanCode.split("-");
      const itemCode = parts[1] || "";
      const isVip = parts[2] === "VIP"; // Gán trực tiếp giá trị boolean

      // Tra giá theo bảng giá
      let itemName = "";
      let price = 0;

      if (itemCode === "SHAKER") {
        itemName = "Binh lac Gym";
        price = PRICE_SHAKER;
      } else if (itemCode === "GLOVES") {
        itemName = "Gang tay tap ta";
        price = PRICE_GLOVES;
      } else if (itemCode === "STRAP") {
        itemName = "Day keo lung";
        price = PRICE_STRAP;
      } else {
        console.log("\n[CẢNH BÁO] Không tìm thấy phụ kiện phù hợp trong bảng giá!");
        break;
      }

      // Tính tiền và ưu đãi VIP (giảm 10%)
      const discount = isVip ? price * 0.1 : 0;
      const total = price - discount;

      // In hóa đơn
      console.log("\n" + BORDER);
      console.log("          BIEN LAI BAN LE");
      console.log(BORDER);
      console.log(`Ma don hang : ${cleanCode}`);
      console.log(`Uu dai      : ${isVip ? "The VIP (-10%)" : "Khach thuong"}`);
      console.log(BORDER);

      const priceStr = price.toLocaleString("vi-VN") + " VND";
      const discountStr = (discount > 0 ? "-" : "") + discount.toLocaleString("vi-VN") + " VND";
      const totalStr = total.toLocaleString("vi-VN") + " VND";

      // Căn chỉnh 2 cột bằng padStart
      console.log("Mat hang:           " + itemName.padStart(20));
      console.log("Don gia:            " + priceStr.padStart(20));
      console.log("Giam gia VIP:       " + discountStr.padStart(20));
      console.log(BORDER);
      console.log("TONG THANH TOAN:    " + totalStr.padStart(20));
      console.log(BORDER);
      break;
    }

    case 3:
      console.log("\n[THÔNG BÁO] Đã thoát chương trình. Tạm biệt!");
      break;

    default:
      console.log("\n[LỖI] Lựa chọn không hợp lệ, vui lòng chọn lại (1 - 3)!");
      break;
  }
} while (choice !== 3);