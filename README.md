# 💌 Gửi Thiên Hà — Món quà tình yêu online

Một website "lá thư tình" cinematic, dành riêng tặng vợ yêu **Thiên Hà**.
Trải nghiệm: mở quà → ngắm ảnh Thiên Hà → lời chào → mở thư tay → xem kỷ niệm → lời nhắn cuối + ôm online.

> Dự án dùng **React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide Icons**
> (thay cho Next.js vì môi trường chạy sẵn là Vite — kiến trúc component, TypeScript và cách tách file vẫn giữ nguyên tinh thần yêu cầu, chạy `npm run build` là ra file tĩnh, deploy Vercel bình thường).

---

## 1. Cài đặt & chạy thử

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

---

## 2. Đổi ảnh của Thiên Hà

**Ảnh chính (hero – xuất hiện ở scene ảnh và scene kết):**

Đặt file ảnh vào:

```
public/images/thienha.jpg
```

Chỉ cần đúng tên file `thienha.jpg`, không cần sửa code. Nếu bạn muốn dùng định dạng khác (`.png`, `.jpeg`), sửa đường dẫn tại:

```
src/data/content.ts  →  MEDIA.heroImage
```

**Ảnh kỷ niệm (gallery):**

Đặt các ảnh vào:

```
public/images/gallery/1.jpg
public/images/gallery/2.jpg
public/images/gallery/3.jpg
public/images/gallery/4.jpg
```

Muốn thêm/bớt ảnh hoặc đổi tên file → chỉnh mảng `GALLERY.photos` trong `src/data/content.ts`.

> Nếu ảnh chưa được thêm vào đúng đường dẫn, website **không bị vỡ giao diện** —
> nó sẽ tự hiện khung placeholder sang trọng nhắc bạn thêm ảnh. Khi bạn thêm ảnh
> thật đúng tên, website tự động hiển thị ảnh thật ngay lập tức.

---

## 3. Đổi nhạc nền

Đặt file nhạc vào:

```
public/music/love.mp3
```

Muốn đổi tên/đường dẫn khác → sửa `MEDIA.music` trong `src/data/content.ts`.

Lưu ý về autoplay: hầu hết trình duyệt di động chặn tự phát nhạc khi chưa có
thao tác chạm nào từ người dùng. Website đã xử lý:

- Nhạc được thử phát ngay khi Thiên Hà bấm nút "Mở món quà dành cho vợ ❤️"
  (đây là một cử chỉ chạm hợp lệ nên hầu hết trình duyệt sẽ cho phép).
- Nếu vẫn bị chặn, một nút nổi **"🎵 Bật nhạc cho câu chuyện này"** sẽ hiện ra.
- Nút loa ở góc màn hình luôn cho phép bật/tắt nhạc bất cứ lúc nào.

---

## 4. Đổi lời thư / lời chúc / tên hiển thị

Toàn bộ chữ trong website nằm gọn trong **một file duy nhất**:

```
src/data/content.ts
```

Bao gồm:

- `SITE` — tên người nhận ("Thiên Hà"), nhãn người gửi.
- `INTRO` — dòng chờ + nút mở quà.
- `GREETING` — lời chào sau khi mở quà.
- `PHOTO_SCENE` — chú thích cạnh ảnh chính.
- `LETTER` — tiêu đề + toàn bộ nội dung thư (mảng `paragraphs`, mỗi phần tử là
  một đoạn văn, xuống dòng bằng `\n`).
- `GALLERY` — tiêu đề phần kỷ niệm + danh sách ảnh & caption.
- `FINALE` — lời nhắn kết, nút "Ôm em một cái", thông điệp khi bấm ôm.

Chỉ cần sửa chuỗi trong file này, không cần đụng tới component nào khác.

---

## 5. Thêm/bớt ảnh trong gallery kỷ niệm

Mở `src/data/content.ts`, tìm `GALLERY.photos`:

```ts
photos: [
  { src: "/images/gallery/1.jpg", caption: "Em cười đẹp nhất khi em không biết mình đang cười." },
  { src: "/images/gallery/2.jpg", caption: "" },
  // thêm dòng mới tại đây để thêm ảnh
],
```

- `src`: đường dẫn ảnh trong thư mục `public/images/gallery/`.
- `caption`: chú thích ngắn — để trống `""` nếu chưa muốn viết gì (web sẽ không
  tự bịa caption).

---

## 6. Deploy lên Vercel

Cách nhanh nhất:

1. Đẩy project lên một repository GitHub/GitLab.
2. Vào [vercel.com](https://vercel.com) → **New Project** → chọn repo.
3. Vercel tự nhận diện Vite, dùng cấu hình mặc định:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Bấm **Deploy**.

Hoặc dùng CLI:

```bash
npm i -g vercel
vercel
```

---

## 7. Cấu trúc thư mục chính

```
src/
  components/
    CosmicBackdrop.tsx     nền vũ trụ dùng chung (sao, nebula, trăng, hạt sáng)
    StarField.tsx           canvas vẽ sao lấp lánh, hiệu năng tối ưu
    CinematicOpenTransition.tsx  hiệu ứng ánh sáng khi mở quà
    IntroScene.tsx           màn hình chờ + nút mở quà
    PhotoScene.tsx           scene ảnh Thiên Hà nổi bật
    GreetingScene.tsx        lời chào hiệu ứng gõ chữ
    LetterScene.tsx          thư tình "chạm để đọc" + progress bar
    GalleryScene.tsx         gallery polaroid vuốt được
    FinaleScene.tsx          scene kết + nút ôm online
    HeartBurst.tsx           hiệu ứng tim bay khi bấm nút ôm
    MusicButton.tsx          nút bật/tắt nhạc + banner nhắc bật nhạc
    SafeImage.tsx            ảnh có fallback placeholder an toàn
  data/
    content.ts               toàn bộ nội dung/đường dẫn — sửa ở đây là đủ
  hooks/
    useBackgroundMusic.ts    quản lý phát/tạm dừng nhạc nền
    useTypewriter.ts          hiệu ứng gõ chữ từng ký tự
  App.tsx                     điều phối các scene (state machine)
public/
  images/thienha.jpg          ảnh chính (bạn tự thêm)
  images/gallery/*.jpg        ảnh kỷ niệm (bạn tự thêm)
  music/love.mp3               nhạc nền (bạn tự thêm)
```

---

## 8. Ghi chú thiết kế

- Mobile-first: tối ưu từ màn hình 360px trở lên, chữ đọc rõ, nút đủ lớn để chạm.
- Không có backend, không database, không API key — chạy hoàn toàn tĩnh.
- Toàn bộ hiệu ứng (sao, hạt sáng, nebula, glow, particle) dùng CSS animation
  + canvas nhẹ, không dùng thư viện particle nặng để giữ mượt trên điện thoại.
- Có thể replay lại toàn bộ trải nghiệm hoặc mở lại thư bất cứ lúc nào ở scene cuối.

Chúc bạn và Thiên Hà có một khoảnh khắc thật đẹp. ❤️
