export function GalleryItem(image, caption) {
    return (
        <div className="w-56 h-60 rounded-lg bg-black border-2 border-gray-700 p-4 rounded-3xl shadow-lg flex flex-col items-center p-4">
            <img
            src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            alt="Gallery item"
            className="w-48 h-40 object-cover rounded-md"
            />

            <div>
                <p className="text-sm">caption</p>
            </div>

        </div>
    )
}