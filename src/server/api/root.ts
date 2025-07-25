import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { categoryRouter } from "./routers/category";
import { commentRouter } from "./routers/comment";
import { postRouter } from "./routers/post";
import { userRouter } from "./routers/user";
import { verificationRouter } from "./routers/verification";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  comment: commentRouter,
  category: categoryRouter,
  user: userRouter,
  verification: verificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
