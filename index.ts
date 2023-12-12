import { initTRPC } from '@trpc/server';
import { z } from 'zod';

import { createHTTPServer } from '@trpc/server/adapters/standalone';


export const t = initTRPC.create();

export const appRouter = t.router({
    hello: t.procedure.query(() => {
        return 'hi';
        }),
  getUser: t.procedure.input(z.string()).query((opts) => {
    return { id: opts.input, name: 'Bilbo' };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (opts) => {
      // use your ORM of choice
      console.log(opts.input.name);
      return { id: '1', name: opts.input.name };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

createHTTPServer({
  router: appRouter,
  createContext() {
    console.log('context 3');
    return {};
  },
}).listen(2022);