import { Ctx, Query, Resolver } from 'type-graphql';
import { GraphqlContext } from '../../lib/types';
import Users from '../../models/Users';

@Resolver()
export default class currentUserResolver {
  @Query(() => Users, { nullable: true })
  currentUser(@Ctx() ctx: GraphqlContext) {
    return ctx.user;
  }
}
