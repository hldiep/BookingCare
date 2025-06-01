export const upload = async (file) => {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("/api/v1/sh/upload-file", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Gửi ảnh về server thất bại");
        }

        const result = await response.json();
        // alert("Upload thành công!");
        console.log("Server đã lưu ảnh:", result);
        console.log("Link ảnh trong data:", result.data);

        return result.data;
    } catch (error) {
        console.error(error);
        alert("Đã xảy ra lỗi khi upload");
        throw error;
    }
};
