/**
 * =============================================================
 *  KHU VỰC NỘI DUNG DUY NHẤT — CHỈNH SỬA Ở ĐÂY LÀ ĐỦ
 * =============================================================
 * Toàn bộ chữ nghĩa, đường dẫn ảnh, đường dẫn nhạc của website
 * đều nằm trong file này. Không cần đụng vào component nào khác.
 *
 * 1) ẢNH THIÊN HÀ:
 *    - Ảnh chính (hero): đặt file tại  public/images/thienha.jpg
 *    - Ảnh kỷ niệm (gallery): đặt các file trong public/images/gallery/
 *      rồi khai báo bên dưới trong mảng `gallery`.
 *    - Nếu chưa có ảnh, web sẽ tự hiện khung placeholder đẹp,
 *      không bị vỡ giao diện. Khi bạn thêm ảnh đúng tên file,
 *      web sẽ tự động dùng ảnh thật.
 *
 * 2) NHẠC NỀN:
 *    - Đặt file nhạc tại public/music/love.mp3
 *
 * 3) LỜI THƯ / LỜI NHẮN: sửa trực tiếp các chuỗi bên dưới.
 * =============================================================
 */

export const SITE = {
  // Tên hiển thị nổi bật — KHÔNG đổi theo yêu cầu
  recipientName: "Thiên Hà",
  senderLabel: "Chồng của em",
};

export const MEDIA = {
  heroImage: "/images/thienha.jpg",
  music: "/music/love.mp3",
};

export const INTRO = {
  waitingLine: "Người anh thương, chờ anh một chút nhé...",
  openButton: "Mở món quà dành cho vợ ❤️",
};

export const GREETING = {
  line1: "Gửi vợ yêu của anh,",
  line2: "Thiên Hà ❤️",
  line3: "Anh có một điều muốn nói với em...",
};

export const PHOTO_SCENE = {
  eyebrow: "Người anh thương nhất trên đời",
  caption: "Thiên Hà của anh",
  continueLabel: "Chạm để tiếp tục",
};

export const LETTER = {
  title: "Gửi em, người con gái anh thương nhất",
  openButton: "Chạm vào thư để đọc ❤️",
  continueButton: "Xem những kỷ niệm của chúng mình ❤️",
  // Toàn bộ nội dung thư — sửa trong biến duy nhất này.
  // Mỗi phần tử trong mảng là một đoạn văn (sẽ tự xuống dòng).
  paragraphs: [
    "Thiên Hà à,",
    "Cảm ơn em vì đã xuất hiện trong cuộc đời anh.\nCó thể anh không phải là người hoàn hảo,\ncũng không phải lúc nào anh cũng biết cách nói\nnhững lời ngọt ngào nhất.",
    "Nhưng có một điều anh luôn muốn em biết...",
    "Anh thật sự trân trọng em.",
    "Anh trân trọng những lúc em ở bên anh,\nnhững cuộc trò chuyện tưởng như rất bình thường,\nnhững câu hỏi nhỏ,\nnhững lời chúc mỗi ngày,\nvà cả những khoảnh khắc mà chỉ cần có em thôi\ncũng khiến một ngày của anh trở nên đặc biệt hơn.",
    "Anh không biết tương lai sẽ đi đến đâu,\nnhưng ở hiện tại,\nanh vẫn muốn nắm tay em,\nvẫn muốn được gọi em là vợ,\nvẫn muốn cùng em tạo thêm thật nhiều kỷ niệm.",
    "Thiên Hà,\nmong rằng em sẽ luôn vui,\nluôn được yêu thương,\nvà mỗi khi mệt mỏi,\nem vẫn nhớ rằng có một người luôn thương em rất nhiều.",
    "Anh yêu em. ❤️",
  ],
};

export const GALLERY = {
  title: "Những điều anh muốn giữ lại ❤️",
  subtitle: "Chạm hoặc vuốt để xem thêm",
  continueButton: "Đến lời nhắn cuối cùng ❤️",
  /**
   * Thêm ảnh kỷ niệm tại đây.
   * - src: đường dẫn ảnh trong public/images/gallery/
   * - caption: chú thích do bạn tự nhập (để trống "" nếu chưa muốn viết gì,
   *   web sẽ không tự bịa caption).
   */
  photos: [
    { src: "/images/gallery/1.jpg", caption: "" },
    { src: "/images/gallery/2.jpg", caption: "" },
    { src: "/images/gallery/3.jpg", caption: "" },
    { src: "/images/gallery/4.jpg", caption: "" },
  ],
};

export const FINALE = {
  name: "Thiên Hà ❤️",
  line1: "Vợ à,",
  line2: "cảm ơn em vì đã ở đây.",
  line3: "Anh yêu em.",
  line4: "Nhiều hơn những gì anh có thể viết thành lời.",
  signature: "— Chồng của em ❤️",
  hugButton: "Ôm em một cái 🤍",
  hugMessage: "Ôm online trước nhé,\ncòn ôm ngoài đời...\nanh giữ lại cho ngày gặp em ❤️",
  replayButton: "Xem lại từ đầu",
  reopenLetterButton: "Mở lại thư",
};

export const MUSIC_PROMPT_LABEL = "🎵 Bật nhạc cho câu chuyện này";
