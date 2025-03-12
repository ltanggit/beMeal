export function GalleryItem({image, caption, likes}) {
    return (
        <div className="w-56 h-70 rounded-lg bg-black border-2 border-gray-700 p-4 rounded-3xl shadow-lg flex flex-col items-center p-4">
            <div className="rounded-3xl">
                <img
                src={image || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
                alt="post"
                className="w-48 h-40 object-cover rounded-md"
                />
            </div>

            <div className="flex justify-start w-full mt-2">
                <div className="text-sm">
                    <p>♥️ {likes}</p>
                </div>
            </div>
            <div>
                <p className="text-sm">{caption}</p>
            </div>

        </div>
    )
}