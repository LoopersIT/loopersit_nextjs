import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "@/lib/session";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // General image uploader for admin panel (services, members, portfolio, etc.)
    imageUploader: f({
        image: {
            maxFileSize: "8MB",
            maxFileCount: 1,
        },
    })
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            console.log("UploadThing middleware called");

            try {
                const session = await getServerSession();
                console.log("Session check:", session ? "authenticated" : "no session");

                // If you throw, the user will not be able to upload
                if (!session) {
                    console.log("Upload rejected: No session");
                    throw new UploadThingError("Unauthorized - Please log in first");
                }

                // Whatever is returned here is accessible in onUploadComplete as `metadata`
                return { userId: session.user?.email || "admin" };
            } catch (error) {
                console.error("UploadThing middleware error:", error);
                throw error;
            }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);
            console.log("File URL:", file.ufsUrl);

            // Return the file URL to the client
            return { url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
