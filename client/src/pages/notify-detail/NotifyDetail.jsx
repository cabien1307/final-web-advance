function NotifyDetail() {
    return (
        <div className="col-span-9 2xl:col-span-9 xl:col-span-9 lg:col-span-10 md:col-span-10 sm:col-span-10 px-5 py-3 border-r-2">
            <div className="wrapper space-y-5">
                {/* Heading */}
                <div className="py-5">
                    <h1 className="text-center font-bold text-3xl sm:text-2xl text-heading">NHẮC LẠI: Về việc đăng ký môn Dự án CNTT 1, Dự án CNTT 2 và Kiến tập công nghiệp</h1>
                </div>
                {/* Faculty - Date craete */}
                <div className="flex justify-end">
                    <span className="text-sm italic underline text-paragraph sm:text-xs">Faculty of Infomation of technology | Date created: 14/09/2021</span>
                </div>

                {/* Content */}
                <div className="space-y-5">
                    <p className="text-base text-paragraph px-2 sm:text-sm">
                        Ngày 23/3/2021, khoa CNTT có đăng thông báo về việc triển khai học phần nghề nghiệp, tập sự nghề nghiệp, khóa luận tốt nghiệp, môn thay thế KLTN cho khóa TS 2018
                        <br /> <br />
                        Tuy nhiên, rất nhiều SV vẫn không theo dõi dẫn tới việc chưa nắm được thông tin. Nay, khoa thông báo lại lần nữa để SV lưu ý. SV xem file thông báo đính kèm.
                        <br /> <br />
                        Để tránh mất thời gian, đề nghị SV đọc kĩ thông báo để nắm thông tin, khoa sẽ không giải đáp những nội dung đã có trên thông báo.
                        <br /> <br />
                        Ngoài ra, SV cũng lưu ý một số nội dung sau:
                        <br /> <br />
                        *** KHOA CÓ CẬP NHẬT LẠI FILE THÔNG BÁO MỚI: BỎ DANH SÁCH MÔN RÀNG BUỘC, KHÔNG PHÂN CHIA NHÓM NGÀNH VÀ ĐIỀU CHỈNH LẠI SỐ TÍN CHỈ PHÙ HỢP HƠN
                    </p>

                    <h1 className="text-sm text-tertiary">Trường hợp không đọc được file đính kèm, vui lòng liên hệ nhóm kỹ thuật qua fanpage TDTU Software Engineering
                        <a href="https://www.facebook.com/tdtsoftware/" target="_blank" rel="noreferrer" className="ml-1 text-blue-500">(tại đây)</a>
                    </h1>
                </div>

                {/* Attachment */}
                <div className="space-y-1">
                    <h1 className="text-md font-bold sm:text-sm">Attachments:</h1>
                    <ul className="list-decimal px-10 border-2 border-stroke py-3 bg-card-bg rounded-sm">
                        <li className="text-base sm:text-sm italic text-card-paragraph hover:text-tertiary">
                            <a href="#/">tb---tsnn--tttn--ktn-k2018---cap-nhat-24-3-2021(20210917_082552_315)_.pdf</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NotifyDetail