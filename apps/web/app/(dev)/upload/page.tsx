import CloudinaryUploader from "@/components/cloudinary-uploader";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-5xl mx-auto  mt-20 font-inria">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Cloudinary Asset Uploader</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Upload your assets to Cloudinary and get shareable URLs instantly.
          </p>
        </div>

        {/* Uploader Component */}
        <CloudinaryUploader showCopyButton={true} />

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-200">
          <p>
            Files are uploaded to the{" "}
            <span className="font-mono bg-gray-100 text-black px-2 py-1 rounded">
              nitrutsav-2026
            </span>{" "}
            folder in Cloudinary
          </p>
        </div>
      </div>
    </div>
  );
}
