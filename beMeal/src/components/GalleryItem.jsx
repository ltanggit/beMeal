export function GalleryItem(image, caption) {
    return (
        <div className="w-56 h-60 rounded-lg bg-[#555455] flex flex-col items-center p-4">
            {/*Image*/}
            <img
            src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            alt="Gallery item"
            className="w-48 h-40 object-cover rounded-md"
            />

            {/* Caption (if available) */}
            <div>
                <p className="text-sm">caption</p>
            </div>

        </div>
    )
}