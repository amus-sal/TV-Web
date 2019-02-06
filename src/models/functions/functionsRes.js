const search = {
    Query: {
        search: async (_, args, context, info)=>{
            const articles =  await context.prisma.query.articles({
                where:{
                    name_contains: args.keyword,
                }
            },info)
            const sportsArticles =  await context.prisma.query.sportsArticles({
                where:{
                    name_contains: args.keyword
                }
            },info)
            articles.forEach(element => {
                element.type = 0
                sportsArticles.push(element)
            });


            return sportsArticles

        },
        getSpecialBanners: async (_, args, context, info) => {
            const programs = await context.prisma.query.programs({
                where:{
                    isShown: true
                }
            }, info)
            const events = await context.prisma.query.events({
                where:{
                    isShown: true
                }
            }, info)
            events.forEach(element => {
                programs.push(element)
            });
            
            return programs
        }
    }
}

module.exports= search;