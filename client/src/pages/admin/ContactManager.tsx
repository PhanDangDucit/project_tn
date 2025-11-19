import { TContact } from "~/interfaces/types/contact";
import { useGetContactQuery } from "~/services/contact/contact.service";

export function ContactManager() {
    const {data: contactDatas, isLoading} = useGetContactQuery();

    return (
        <div className="p-20">
            <h1 className="font-bold text-3xl">Liên hệ</h1>
             {isLoading ? (
                    <div className="text-center text-gray-500 mt-4">Đang tải...</div>
                ) : (
                <div className="mt-4">
                    {!contactDatas?.data?.length ? (
                        <div className="col-span-full text-center text-gray-500">
                            Không có danh mục nào!
                        </div>
                    ) : (
                    <table className="w-full">
                        <thead className="">
                            <th>ID</th>
                            <th>Thông tin khách hàng</th>
                            <th>Chủ đề</th>
                            <th>Nội dung</th>
                            <th>Thời gian tạo</th>
                        </thead>
                        <tbody> 
                           {contactDatas?.data?.map((contact: TContact) => (
                            <tr>
                                <td className="text-center">{contact.id}</td>
                                <td className="text-center">
                                    <p>Họ tên: {contact.fullname ?? "None"}</p>
                                    <p>Email: {contact.email ?? "None"}</p>
                                    <p>Số điện thoại: {contact.phone ?? "None"}</p>
                                </td>
                                <td className="text-center">{contact.topic ?? "None"}</td>
                                <td className="text-center">{contact.content ?? "None"}</td>
                                <td className="text-center">{new Date(contact.created_at!).toLocaleString('vi-VN')}</td>
                            </tr>))}
                        </tbody>
                    </table>
                )}
                </div>
            )}
        </div>
    )
}