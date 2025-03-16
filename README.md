Setup tsconfig là các rules trong nó tự được apply
Setup tailwind v3, next.config, partial rendering
Setup eslint, prettier, husky, commitlint, lint-staged.
Setup css reset, font-size

Dùng font
Set i18n, ta cho vào cookie để server lấy thay local storage, dùng debounce kết hợp useOptimistic
Set multiple middleware
Dùng view transition api
Connect với db supabase, dùng drizzle orm để tương tác với db
Dùng file env
Dùng server actions
Dùng redirect, rewrites (đổi page mà url giữ nguyên), đổi url mà k đổi page, prefetch
Dùng dynamic import
Dùng permanentRedirect
Dùng layout, template, default, slots, loading



-> Tailwind:
--> darkmode
Browser dùng dark mode sẽ tự apply mọi thứ trong @media (prefers-color-scheme: dark), prefix dark: của tailwind cũng tự được nhét vào @media (prefers-color-scheme: dark)
Mặc định bg là white, text là dark, dù browser ở mode nào. Khi dùng tailwind, mặc định cũng thế. text-black mặc định là black, text-white mặc định là white, tương tự với bg-white, border-white.
Sửa foreground và background chỉ ảnh hưởng màu kiểu bg-foreground, bg-background của tailwind thôi chứ k ảnh hưởng text-white hay border-black các kiểu, các kiểu đó fix cứng.

Các cách tạo darkmode:
- Viết text-black và dark:text-white, tương tự với các styles khác để áp dụng cho từng mode
Prefix dark: có thể custom k còn theo prefers-color-scheme. VD dùng @custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *)); rồi nhét <html data-theme="dark"> là xong.
- Config màu cho tailwind như foreground, background phụ thuộc vào css variables và đổi css variables đó theo prefers-color-scheme trong css, thì dùng nó là tự đổi màu theo mode r.
- Darkmode như css thuần. Nếu có checkbox thì theo check box đổi css var ghi đè prefers-color-scheme, nếu k có thì đổi css var trong prefers-color-scheme là ok.

=> Tailwind dùng styles nhanh trong vài TH, chứ thực tế dùng file css chia module và định nghĩa custom variables ra.

--> Lỗi css cú pháp mới và @apply của tailwind, phải fix với postcss mới bundle được:
Cài 2 package thêm: npm install -D postcss-preset-env postcss-flexbugs-fixes



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



-> Dùng drizzle connect supabase cho postgreSQL.
Để update db, cứ viết schema r generate sẽ đè lên. DB k có trong schema sẽ bị xoá, nếu có data lost sẽ đưa ra cảnh báo. 
Nếu muốn tạo db test các thứ migration thì phải tạo 1 db riêng và sửa connection string cho vào env.development thôi.

npx drizzle-kit generate => sinh lệnh đổi db, vào custom.
npx drizzle-kit migrate => chạy migrate trên drizzle
npx drizzle-kit push => update migrate từ drizzle lên cloud. Đổi url từ 6543 thành 5432 nếu lỗi
npx drizzle-kit studio => chạy studio cho bất cứ db nào. Dùng kèm loadEnvConfig vì dùng process.env.DBURL ngoài nextjs runtime.
URL: https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase
URL master drizzle: https://www.youtube.com/watch?v=7-NZ0MlPpJA&t=523s

Lưu ý là client gọi hàm trực tiếp từ server thì hàm đó phải k được dùng các package phía server, vì nếu dùng sẽ k thể import vào client trực tiếp, vì client k thể import package nodejs server.
Drizzle cần dùng postgre và fs là package phía server, phải viết trong file "server only" và k thể import từ client. Buộc phải nhét vào server actions thì mới độc lập gọi được ở client.
Khi update db xong, gọi revalidatePath, nó sẽ apply changes mà k reload pages, nó có re-render lại toàn bộ server component liên quan hoặc có khả năng liên quan thôi.



->*** Bản chất debounce trong react:
- debounce nhét 1 hàm thực hiện vào setTimeout nên await nó sẽ kết thúc luôn chứ k chờ thực hiện. Logic update giá trị trả về phải viết trong hàm debounce.
- Hàm debounce phải tồn tại mãi mãi chứ re-render tạo mới sẽ luôn thực hiện lại mà k clearTimeout cho debounce cũ nên phải thêm useMemo.
K dùng useCallback vì useCallback k nhận các hàm ở ngoài do k rõ ràng dependencies.

--> Lưu ý dùng useOptimistics:
- Phải kẹp trong startTransition, khi ra ngoài startTransition, nó sẽ compare và update expected result với actual state theo hàm đối số 2.
- Mọi nơi phải dùng optimisticsValue để tránh sai.
- useOptimistic k thể dùng với debounce vì gọi hàm debounce trong startTransition thì ra ngoài sẽ k thực hiện ngay, debounce nó chờ timeout mà, thành ra optimisticsValue k compare và update.
Nhưng ta có thể tự implement optimistic debounce được mà: dùng 1 biến state lưu giá trị, khi gọi hàm thì update state local luôn, thực hiện side effect xong sẽ update lần nữa, nếu fail thì viết update state trong catch quay lại giá trị cũ thôi. K cần dùng useOptimistics.

->*** Bản chất luồng re-render trong nextjs:
- Client có thể tương tác với server qua api route handler, qua server actions từ form, hoặc gọi trực tiếp hàm của server cũng được kìa (coi nó cũng là server actions)
- Khi gọi trực tiếp hàm của server hoặc dùng server actions, mà đổi data trong cookies dù có liên quan hay không cũng sẽ render lại pages, kể cả khi component k đọc cookie gì. Còn nếu chỉ get cookie hay call external api, db thì sẽ k render lại.
Nếu chủ động luôn muốn re-render lại thì dùng revalidatePath. Nếu chủ động tương tác server mà k muốn re-render lại thì phải gọi fetch route handler thử.
- Chú ý khi gọi revalidatePath để invalidate cache thì nó ảnh hưởng mọi client chứ k chỉ client hiện tại, vì cache ở server dùng cho mọi client mà.
Khi đó client hiện tại sẽ re-render luôn, các client khác sẽ bị hết cache chứ các client k trigger re-render của nhau trực tiếp.
- Giả sử client gọi hàm server đổi cookies khiến page render lại, thì hàm đó vẫn vẫn trả về giá trị cho FE xử lý xong, ổn định r mới re-render chứ k phải gọi revalidatePath là re-render ngay. Ktg này rất ngắn. Do đó giá trị trả về của hàm vẫn có thể dùng để update state chứ kp cứ đổi cookies rồi dừng luôn vì biết chắc sẽ re-render lại.



opengraph-image.png


