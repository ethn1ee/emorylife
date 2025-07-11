import { api } from "@/trpc/server";
import CategoryThumbnails from "./_sections/category-thumbnails";
import HotPosts from "./_sections/hot-posts";
import RecentPhotos from "./_sections/recent-photos";

export default async function Page() {
  const categoryStats = await api.category.getStats();

  return (
    <>
      <CategoryThumbnails stats={categoryStats} />

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-3 h-min">
        <RecentPhotos />
        <HotPosts />
      </div>
    </>
  );
}
