Setup tsconfig là các rules trong nó tự được apply
Setup tailwind v3, next.config, partial rendering
Setup eslint, prettier, husky, commitlint, lint-staged.
Setup css reset, font-size

Dùng font
Set i18n
Set multiple middleware
Dùng view transition api
Connect với db postgre của supabase, dùng drizzle orm để tương tác với db
Dùng file env
Dùng server actions
Dùng redirect, rewrites (đổi page mà url giữ nguyên), đổi url mà k đổi page, prefetch
Dùng dynamic import
Dùng permanentRedirect
Dùng layout, template, default, slots, loading, twitter-image.png, opengraph-image.alt.txt, opengraph-image.tsx
Dùng react compiler
Dùng Form, useActionState
Dùng route handler
Dùng instrumentation, after
Dùng group route, dynamic routes, private route
Export metadata
Dùng intercept route
draftMode

Dùng dialog popover
Dùng Docker
Custom authentication
Dùng feature flag, vercel flag sdk
Dùng vercel kv lib
Handle error
react-query streaming prefetch server



-> Note các bước code UI portfolio:
Chia router. Chia config ra file riêng. Chia theo chức năng / module.s
Component dài viết quá 1 lần hoặc component ngắn viết nhiều lần thì tách riêng ra, hoặc component nested quá sâu, hoặc ảnh icon thì chia. 
Chia thư mục component chuẩn. Component và css var chỉ dùng trong portfolio thì k để leak ra ngoài.
Màu và kích thước đều dùng css var. Mỗi file để css var gom 1 nơi duy nhất thôi.
K nested css selector quá 2 cấp. Dùng đúng senmatic tag, khi đó css selector viết rõ tag ra nếu k là div. Chủ động viết nested class nếu chúng liên quan tới nhau.
main chỉ có 1, section có thể lồng nhau, text thì dùng h1-h6 p.
Tự quy ước cách dòng, dùng tailwind @apply. Css line quá dài cũng tách xuống.
BEM đặt đúng tên a__b--c-d max 4 level. Nếu chia component thì coi là độc lập.
Relative liên tục chú ý các component phụ thuộc vị trí lẫn nhau thì phải relative nhau. VD 1 tag line và 1 tag dot mà vị trí phụ thuộc vào nhau, k được làm kiểu dịch đi 1 tí vì sang browser khác và kích thước màn hình khác, việc dịch 1 tí mang ý nghĩa rất khác.
Đảm bảo chạy trên cả safari và chrome và phone. Dùng styles tương thích mọi browser.
File css global import vào global, css quá ít thì viết inline nếu thích, k thì dùng file module.css riêng import styles.
Mọi kích thước là relative và dùng rem theo css var. Dùng clamp khi cần thiết. Responsive min width là 340px;
Chuẩn SEO cho pages.
Thêm a11y.



-> Tailwind lỗi css cú pháp mới và @apply của tailwind, phải fix với postcss mới bundle được:
Cài 2 package thêm: npm install -D postcss-preset-env postcss-flexbugs-fixes



-> Lỗi css bundle không dùng được các feature mới:
- Bỏ --turbopack. Nó có tốc độ build cực nhanh, nhưng bundle size k giảm, thường chỉ dùng cho development. Đôi khi lỗi phải bỏ đi mới dùng được => k nên
- Dùng <style jsx> thì chạy được.

-> Lỗi dialog: thẻ dialog 100% sẽ theo màn hình, thẻ div ngay trong dialog 100% sẽ theo content trong khi đáng lẽ nó phải theo thẻ cha nó.
Lỗi safari: word-spacing k hoạt động; phải thêm cho grid là grid-auto-rows: min-content;



-> Dùng docker minimize nhất có thể cho development:
Chạy "make up-d" thấy chưa có image sẽ build image
Build image sẽ tạo ra 1 image trống, copy package.json vào image, chạy "npm install" trong image. Vậy là trong image có package.json và node_modules.
Chưa có container sẽ tạo container từ image
Tạo volumn dùng thư mục . ở host cho /app, trong container vẫn giữ nguyên chỉ có package.json, còn node_modules là anonymous volumn k bị ảnh hưởng.
Chạy container mới mở ports và chạy lệnh trong CMD
Dừng container sẽ ngừng bind và k ánh xạ port nữa. Trong toàn bộ quá trình, container chỉ có package.json và node_modules



-> Custom authentication: Chú ý middleware không dùng được nodejs runtime crypto. Nên nếu muốn dùng data login ở middleware thì k được mã hoá hay gì cả, phải tạo file riêng cho node module và edge module.



-> Setup i18n trong dự án:
- Dùng @replexica/react tự dịch i18n bằng AI.
- Language lưu trong cookie chỉ đổi được ở server, client muốn đổi phải call server function. Dùng debounce tự tạo optimistics tối ưu.
- Client truy cập langs qua useParams. Server thì await params, nhưng component con nested sâu thì truyền từ Page phức tạp.
Giải pháp là server component lấy từ cookies, đảm bảo cookies và params luôn update cùng giá trị là được.
- Đảm bảo i18n gọi ở middleware edge runtime thì k dùng fs, list languages fix cứng ở 1 file và import vào thôi. File chỉ import ở server comp mới được dùng fs.
- i18n data lấy ở cả server và client comp. Client k được import file i18n.json vì quá nặng, server cũng phải viết rất dài.
Giải pháp là dùng dynamic import như bth cho server component.
Client component truyền dictionaries qua props từ server hoặc dynamic import nhưng bị phức tạp. Tốt nhất là dùng Context global tạo 1 hook useTranslation cho client comp.
- Khi set cookies, phải set vào response.cookies thì mới set vào browser, chứ request.cookies set k có tác dụng.
Điều đb là middleware chạy xong hết, cả NextResponse.next() rồi return xong thì server component mới được xử lý render. Nên đổi response.cookie trong middleware sẽ đảm bảo server component lấy cookies luôn có trường đó.
- html có thuộc tính lang giúp cho SEO. Chú ý file layout có ở cả cha và con dùng để set giá trị chung cho tag html head body.
head ở con sẽ được append vào cha, body ở con nest trong cha, nhưng tag <html> k ổn. Bất cứ page nào cũng phải có 1 tag <html>, con và cha nếu cùng có <html> thì phải giống nhau, nếu khác nhau sẽ bị lỗi hydrate. Do đó buộc set lang cho html, ta lấy từ cookie và set ngay từ cha


